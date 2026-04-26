/**
 * <cs-checkbox> — checkbox custom element.
 *
 * Wraps a native <input type="checkbox">. Supports indeterminate state.
 *
 * Attributes:
 *   checked        — boolean
 *   indeterminate  — boolean
 *   disabled       — boolean
 *   label          — visible label
 *   value          — submitted value (default "on")
 *   name           — form field name
 *
 * Events:
 *   cs-change — detail: {checked, value}
 */

const CSS = `
:host { display: inline-block; font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif); }
.box {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  min-height: 24px;
  user-select: none;
}
:host([disabled]) .box { cursor: not-allowed; opacity: 0.55; }
input {
  width: 18px; height: 18px;
  accent-color: var(--cs-color-accent-default);
  cursor: inherit;
  margin: 0;
}
input:focus-visible { outline: 2px solid var(--cs-color-focus-ring); outline-offset: 2px; border-radius: 2px; }
.label { font-size: 14px; line-height: 1.4; color: var(--cs-color-text-default); }
`;

export class CSCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'indeterminate', 'disabled', 'label', 'value', 'name'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  get checked() { return this.hasAttribute('checked'); }
  set checked(v) { v ? this.setAttribute('checked', '') : this.removeAttribute('checked'); }

  render() {
    const isIndeterminate = this.hasAttribute('indeterminate');
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <label class="box">
        <input
          type="checkbox"
          ${this.hasAttribute('checked') ? 'checked' : ''}
          ${this.hasAttribute('disabled') ? 'disabled' : ''}
          ${this.hasAttribute('value') ? `value="${this.getAttribute('value')}"` : ''}
          ${this.hasAttribute('name') ? `name="${this.getAttribute('name')}"` : ''}
        />
        <span class="label">${this.getAttribute('label') ?? ''}<slot></slot></span>
      </label>
    `;
    const input = this.shadowRoot.querySelector('input');
    if (isIndeterminate) input.indeterminate = true;
    input.addEventListener('change', (e) => {
      this.checked = e.target.checked;
      this.dispatchEvent(new CustomEvent('cs-change', {
        detail: { checked: e.target.checked, value: this.getAttribute('value') ?? 'on' },
        bubbles: true,
        composed: true,
      }));
    });
  }
}
