/**
 * createTabs — primitive behaviour for a tabs / segmented-control pattern.
 * ARIA pattern: WAI-ARIA Authoring Practices "Tabs with Manual Activation".
 *
 * Phase 2 Wave 1 skeleton — full implementation in Wave 2 along with the
 * @cyberskill/web-components <cs-tabs> styled element.
 */

let __id = 0;
const nextId = () => `cs-tabs-${++__id}`;

export function createTabs(options = {}) {
  const id = options.id ?? nextId();
  const tabs = options.tabs ?? []; // [{value, label, disabled?}]
  const listeners = new Set();
  const orientation = options.orientation ?? 'horizontal';
  const activation = options.activation ?? 'manual'; // 'manual' or 'automatic'

  const state = {
    selected: options.defaultValue ?? tabs[0]?.value ?? null,
  };

  function emit() {
    listeners.forEach((fn) => fn(state));
  }

  function select(value) {
    if (state.selected === value) return;
    const tab = tabs.find((t) => t.value === value);
    if (!tab || tab.disabled) return;
    state.selected = value;
    options.onChange?.(value);
    emit();
  }

  function focusByOffset(offset) {
    const enabled = tabs.filter((t) => !t.disabled);
    const i = enabled.findIndex((t) => t.value === state.selected);
    if (i < 0) return;
    const next = enabled[(i + offset + enabled.length) % enabled.length];
    if (activation === 'automatic') select(next.value);
    return `${id}-tab-${next.value}`;
  }

  function onKeyDown(e) {
    const horiz = orientation === 'horizontal';
    if ((horiz && e.key === 'ArrowRight') || (!horiz && e.key === 'ArrowDown')) {
      const focusId = focusByOffset(1);
      if (focusId) {
        e.preventDefault();
        // Phase 2 Wave 2: focus the tab DOM node directly
      }
    } else if ((horiz && e.key === 'ArrowLeft') || (!horiz && e.key === 'ArrowUp')) {
      const focusId = focusByOffset(-1);
      if (focusId) e.preventDefault();
    } else if (e.key === 'Home') {
      const first = tabs.find((t) => !t.disabled);
      if (first) select(first.value);
    } else if (e.key === 'End') {
      const last = [...tabs].reverse().find((t) => !t.disabled);
      if (last) select(last.value);
    }
  }

  function getTabProps(value) {
    const tab = tabs.find((t) => t.value === value);
    const isSelected = state.selected === value;
    return {
      id: `${id}-tab-${value}`,
      role: 'tab',
      'aria-selected': isSelected,
      'aria-controls': `${id}-panel-${value}`,
      tabIndex: isSelected ? 0 : -1,
      'aria-disabled': tab?.disabled || undefined,
      onClick: () => !tab?.disabled && select(value),
      onKeyDown,
    };
  }

  function getPanelProps(value) {
    const isSelected = state.selected === value;
    return {
      id: `${id}-panel-${value}`,
      role: 'tabpanel',
      'aria-labelledby': `${id}-tab-${value}`,
      hidden: !isSelected,
      tabIndex: 0,
    };
  }

  function getListProps() {
    return {
      role: 'tablist',
      'aria-orientation': orientation,
    };
  }

  return {
    state,
    select,
    subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    getListProps,
    getTabProps,
    getPanelProps,
    id,
  };
}
