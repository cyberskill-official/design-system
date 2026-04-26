/**
 * <cs-select> — native select custom element.
 *
 * Wraps a native <select> for token-driven styling + label/helper/error
 * pattern matching cs-input. For async / typeahead / multi-select, see the
 * Combobox primitive (Part 12 §5.x — Phase 3).
 *
 * Attributes:
 *   value, label, helper, error, size, disabled, required, name
 *
 * Children:
 *   <cs-option value="x" label="..." [disabled]>...</cs-option>
 *   (or any standard <option>)
 *
 * Events:
 *   cs-change — detail: {value}
 */

const CSS = `
:host { display: inline-block; font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif); }
:host([size="sm"]) select { min-height: 32px; font-size: 13px; padding: 4px 24px 4px 8px; }
:host([size="lg"]) select { min-height: 48px; font-size: 16px; padding: 12px 32px 12px 16px; }
.field { display: flex; flex-direction: column; gap: 4px; }
label { font-size: 13px; font-weight: 500; color: var(--cs-color-text-default); }
select {
  font: inherit;
  min-height: 40px;
  padding: 8px 28px 8px 12px;
  border: 1px solid var(--cs-color-border-default);
  border-radius: 6px;
  background: var(--cs-color-surface-raised);
  color: var(--cs-color-text-default);
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position: calc(100% - 14px) center, calc(100% - 9px) center;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  outline: none;
}
select:focus-visible { border-color: var(--cs-color-accent-default); outline: 2px solid var(--cs-color-focus-ring); outline-offset: 1px; }
select:disabled { background-color: var(--cs-color-surface-subtle); cursor: not-allowed; opacity: 0.7; }
:host([error]) select { border-color: var(--cs-color-semantic-danger); }
.helper, .error { font-size: 12px; line-height: 1.4; }
.helper { color: var(--cs-color-text-muted); }
.error { color: var(--cs-color-semantic-danger); }
`;

export class CSSelect extends HTMLElement {
  static get observedAttributes() { return ['value', 'label', 'helper', 'error', 'size', 'disabled', 'required', 'name']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._id = `cs-select-${Math.random().toString(36).slice(2, 8)}`;
  }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  get value() { return this.shadowRoot.querySelector('select')?.value ?? this.getAttribute('value') ?? ''; }
  set value(v) { this.setAttribute('value', v); }

  render() {
    const id = this._id;
    const label = this.getAttribute('label');
    const helper = this.getAttribute('helper');
    const error = this.getAttribute('error');
    // Read the user-provided <option> / <cs-option> children
    const options = Array.from(this.children).map((c) => {
      const value = c.getAttribute('value') ?? '';
      const text = c.getAttribute('label') ?? c.textContent ?? value;
      const disabled = c.hasAttribute('disabled');
      return `<option value="${value}" ${disabled ? 'disabled' : ''} ${value === this.getAttribute('value') ? 'selected' : ''}>${text}</option>`;
    }).join('');
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <div class="field">
        ${label ? `<label for="${id}">${label}</label>` : ''}
        <select
          id="${id}"
          ${this.hasAttribute('disabled') ? 'disabled' : ''}
          ${this.hasAttribute('required') ? 'required' : ''}
          ${this.hasAttribute('name') ? `name="${this.getAttribute('name')}"` : ''}
          ${error ? 'aria-invalid="true"' : ''}
        >
          ${options}
        </select>
        ${error ? `<div class="error" role="alert">${error}</div>` : helper ? `<div class="helper">${helper}</div>` : ''}
      </div>
    `;
    this.shadowRoot.querySelector('select').addEventListener('change', (e) => {
      this.setAttribute('value', e.target.value);
      this.dispatchEvent(new CustomEvent('cs-change', { detail: { value: e.target.value }, bubbles: true, composed: true }));
    });
  }
}
