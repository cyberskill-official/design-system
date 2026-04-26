/**
 * <cs-tabs> — tablist custom element.
 *
 * Built on @cyberskill/primitives/tabs. WAI-ARIA Tabs pattern with manual
 * activation (Arrow keys move focus; Enter/Space activate).
 *
 * Children:
 *   <cs-tab value="x" label="..." [disabled]>
 *   <cs-tab-panel value="x">...</cs-tab-panel>
 *
 * Attributes:
 *   value         — currently selected tab value
 *   orientation   — horizontal (default) | vertical
 *
 * Events:
 *   cs-change — detail: {value}
 */

const CSS = `
:host { display: block; font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif); }
.tablist { display: flex; gap: 4px; border-bottom: 1px solid var(--cs-color-border-subtle); }
:host([orientation="vertical"]) .tablist { flex-direction: column; border-bottom: none; border-right: 1px solid var(--cs-color-border-subtle); }
::slotted(cs-tab) {
  --_pad: 8px 12px;
  --_color: var(--cs-color-text-muted);
  --_border: transparent;
}
.panels { padding-top: 12px; }
`;

export class CSTabs extends HTMLElement {
  static get observedAttributes() { return ['value', 'orientation']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() { this.render(); this._sync(); }
  attributeChangedCallback(name) {
    if (!this.isConnected) return;
    if (name === 'value') this._sync();
    else this.render();
  }

  get value() { return this.getAttribute('value'); }
  set value(v) { this.setAttribute('value', v); }

  _sync() {
    const value = this.getAttribute('value');
    for (const tab of this.querySelectorAll('cs-tab')) {
      const isSelected = tab.getAttribute('value') === value;
      if (isSelected) tab.setAttribute('selected', '');
      else tab.removeAttribute('selected');
    }
    for (const panel of this.querySelectorAll('cs-tab-panel')) {
      panel.hidden = panel.getAttribute('value') !== value;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <div class="tablist" role="tablist" aria-orientation="${this.getAttribute('orientation') ?? 'horizontal'}">
        <slot name="tabs"></slot>
      </div>
      <div class="panels">
        <slot></slot>
      </div>
    `;
    this.addEventListener('cs-tab-select', (e) => {
      this.setAttribute('value', e.detail.value);
      this.dispatchEvent(new CustomEvent('cs-change', { detail: { value: e.detail.value }, bubbles: true, composed: true }));
    });
  }
}

const TAB_CSS = `
:host {
  display: inline-block;
  padding: 8px 12px;
  cursor: pointer;
  color: var(--cs-color-text-muted);
  border-bottom: 2px solid transparent;
  font-size: 14px;
  font-weight: 500;
  user-select: none;
}
:host(:hover) { color: var(--cs-color-text-default); }
:host(:focus-visible) { outline: 2px solid var(--cs-color-focus-ring); outline-offset: 2px; border-radius: 4px; }
:host([selected]) { color: var(--cs-color-accent-default); border-bottom-color: var(--cs-color-accent-default); }
:host([disabled]) { opacity: 0.5; cursor: not-allowed; }
`;

export class CSTab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${TAB_CSS}</style><slot></slot>`;
  }

  connectedCallback() {
    this.tabIndex = 0;
    this.setAttribute('role', 'tab');
    this.setAttribute('slot', 'tabs');
    this.addEventListener('click', this._select);
    this.addEventListener('keydown', this._handleKey);
  }

  _select = () => {
    if (this.hasAttribute('disabled')) return;
    this.dispatchEvent(new CustomEvent('cs-tab-select', {
      detail: { value: this.getAttribute('value') },
      bubbles: true, composed: true,
    }));
  };

  _handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._select();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const next = this.nextElementSibling;
      if (next instanceof CSTab) next.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const prev = this.previousElementSibling;
      if (prev instanceof CSTab) prev.focus();
    }
  };
}

export class CSTabPanel extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', 'tabpanel');
    if (this.hidden) this.style.display = 'none';
  }
  static get observedAttributes() { return ['hidden']; }
  attributeChangedCallback(name, _old, val) {
    if (name === 'hidden') this.style.display = val !== null ? 'none' : '';
  }
}
