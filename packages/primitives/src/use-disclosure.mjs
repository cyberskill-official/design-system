/**
 * useDisclosure — primitive behaviour for any open/close pattern.
 * Used by: <Modal>, <Drawer>, <Popover>, <Dropdown>, <Accordion>, etc.
 *
 * Vanilla API:
 *   const d = createDisclosure({ defaultOpen: false });
 *   d.open(); d.close(); d.toggle();
 *   d.state.isOpen;
 *   d.props.trigger;          // {aria-expanded, aria-controls, onClick}
 *   d.props.content;          // {id, role, hidden}
 *   d.subscribe(fn);          // change listener
 *
 * Framework hook (consumed by @cyberskill/react etc.):
 *   const { isOpen, open, close, toggle, triggerProps, contentProps } = useDisclosure(opts);
 */

let __id = 0;
const nextId = () => `cs-disclosure-${++__id}`;

export function createDisclosure(options = {}) {
  const id = options.id ?? nextId();
  const contentId = `${id}-content`;
  const listeners = new Set();

  const state = {
    isOpen: !!options.defaultOpen,
  };

  function emit() {
    listeners.forEach((fn) => fn(state));
  }

  function open() {
    if (state.isOpen) return;
    state.isOpen = true;
    options.onOpen?.();
    emit();
  }

  function close() {
    if (!state.isOpen) return;
    state.isOpen = false;
    options.onClose?.();
    emit();
  }

  function toggle() {
    state.isOpen ? close() : open();
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function getProps() {
    return {
      trigger: {
        'aria-expanded': state.isOpen,
        'aria-controls': contentId,
        onClick: toggle,
        // keyboard: <Enter> / <Space> activate via native button semantics
      },
      content: {
        id: contentId,
        role: options.role ?? 'region',
        hidden: !state.isOpen,
        // 'aria-labelledby' is set by the consumer when the trigger has a stable id
      },
    };
  }

  return {
    state,
    get props() { return getProps(); },
    open, close, toggle, subscribe,
    id,
    contentId,
  };
}

/**
 * useDisclosure — framework-agnostic hook signature.
 *
 * Consumers (@cyberskill/react, @cyberskill/vue, @cyberskill/svelte) re-export
 * this with framework-idiomatic types and reactive bindings. The vanilla shape
 * below is what every wrapper resolves to.
 */
export function useDisclosure(options = {}) {
  const d = createDisclosure(options);
  // For non-framework consumers, the props are computed lazily; framework
  // wrappers add reactivity by calling `d.subscribe` and re-rendering.
  return {
    isOpen: d.state.isOpen,
    open: d.open,
    close: d.close,
    toggle: d.toggle,
    subscribe: d.subscribe,
    triggerProps: d.props.trigger,
    contentProps: d.props.content,
  };
}
