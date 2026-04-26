/**
 * <cs-radio> — radio button custom element.
 *
 * For grouping, set the same `name` on multiple <cs-radio> in a <fieldset>
 * with role="radiogroup".
 *
 * Attributes:
 *   checked  — boolean
 *   disabled — boolean
 *   label    — visible label
 *   value    — submitted value
 *   name     — form field name (group key)
 *
 * Events:
 *   cs-change — detail: {value, name}
 */

const CSS = `
:host { display: inline-block; font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif); }
.row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  min-height: 24px;
  user-select: none;
}
:host([disabled]) .row { cursor: not-allowed; opacity: 0.55; }
input {
  width: 18px; height: 18px;
  accent-color: var(--cs-color-accent-default);
  cursor: inherit;
  margin: 0;
}
input:focus-visible { outline: 2px solid var(--cs-color-focus-ring); outline-offset: 2px; border-radius: 50%; }
.label { font-size: 14px; line-height: 1.4; color: var(--cs-color-text-default); }
`;

export class CSRadio extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'label', 'value', 'name'];
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
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <label class="row">
        <input
          type="radio"
          ${this.hasAttribute('checked') ? 'checked' : ''}
          ${this.hasAttribute('disabled') ? 'disabled' : ''}
          ${this.hasAttribute('value') ? `value="${this.getAttribute('value')}"` : ''}
          ${this.hasAttribute('name') ? `name="${this.getAttribute('name')}"` : ''}
        />
        <span class="label">${this.getAttribute('label') ?? ''}<slot></slot></span>
      </label>
    `;
    this.shadowRoot.querySelector('input').addEventListener('change', (e) => {
      this.checked = e.target.checked;
      this.dispatchEvent(new CustomEvent('cs-change', {
        detail: { value: this.getAttribute('value') ?? 'on', name: this.getAttribute('name') ?? '' },
        bubbles: true,
        composed: true,
      }));
    });
  }
}
