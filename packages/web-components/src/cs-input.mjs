/**
 * <cs-input> — text input custom element.
 *
 * Wraps a native <input> in a shadow root with token-driven styling.
 * Honours WCAG 2.2 SC 1.3.5 (Identify Input Purpose) via autocomplete attr.
 *
 * Attributes:
 *   type        — text (default) | email | password | number | search | tel | url
 *   value       — current value
 *   placeholder — placeholder text
 *   label       — visible label (also becomes aria-label if no slot="label")
 *   helper      — helper text under the input
 *   error       — error text (mutually exclusive with helper visually)
 *   size        — sm | md (default) | lg
 *   disabled    — boolean
 *   readonly    — boolean
 *   required    — boolean
 *   autocomplete — passes through to native input
 *
 * Events:
 *   cs-input    — fires on every keystroke; detail: {value}
 *   cs-change   — fires on commit (blur / Enter); detail: {value}
 *
 * A11y: aria-invalid mirrors error presence; aria-describedby wires helper/error.
 */

const CSS = `
:host { display: inline-block; font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif); }
:host([size="sm"]) input { min-height: 32px; font-size: 13px; padding: 4px 8px; }
:host([size="lg"]) input { min-height: 48px; font-size: 16px; padding: 12px 16px; }
.field { display: flex; flex-direction: column; gap: 4px; }
label { font-size: 13px; font-weight: 500; color: var(--cs-color-text-default); }
input {
  font: inherit;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--cs-color-border-default);
  border-radius: 6px;
  background: var(--cs-color-surface-raised);
  color: var(--cs-color-text-default);
  outline: none;
  transition: border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
input:hover:not(:disabled) { border-color: var(--cs-color-text-muted); }
input:focus-visible { border-color: var(--cs-color-accent-default); outline: 2px solid var(--cs-color-focus-ring); outline-offset: 1px; }
input:disabled, input[readonly] { background: var(--cs-color-surface-subtle); cursor: not-allowed; opacity: 0.7; }
:host([error]) input { border-color: var(--cs-color-semantic-danger); }
.helper, .error { font-size: 12px; line-height: 1.4; }
.helper { color: var(--cs-color-text-muted); }
.error { color: var(--cs-color-semantic-danger); }
@media (prefers-reduced-motion: reduce) { input { transition: none; } }
`;

export class CSInput extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'value', 'placeholder', 'label', 'helper', 'error', 'size', 'disabled', 'readonly', 'required', 'autocomplete'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._id = `cs-input-${Math.random().toString(36).slice(2, 8)}`;
  }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  get value() { return this.shadowRoot.querySelector('input')?.value ?? this.getAttribute('value') ?? ''; }
  set value(v) { this.setAttribute('value', v); }

  render() {
    const id = this._id;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const label = this.getAttribute('label');
    const helper = this.getAttribute('helper');
    const error = this.getAttribute('error');
    const describedBy = [error ? errorId : null, helper ? helperId : null].filter(Boolean).join(' ');
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <div class="field">
        ${label ? `<label for="${id}">${label}${this.hasAttribute('required') ? ' <span aria-hidden="true">*</span>' : ''}</label>` : ''}
        <input
          id="${id}"
          type="${this.getAttribute('type') ?? 'text'}"
          ${this.hasAttribute('value') ? `value="${this.getAttribute('value')}"` : ''}
          ${this.hasAttribute('placeholder') ? `placeholder="${this.getAttribute('placeholder')}"` : ''}
          ${this.hasAttribute('disabled') ? 'disabled' : ''}
          ${this.hasAttribute('readonly') ? 'readonly' : ''}
          ${this.hasAttribute('required') ? 'required' : ''}
          ${this.hasAttribute('autocomplete') ? `autocomplete="${this.getAttribute('autocomplete')}"` : ''}
          ${error ? 'aria-invalid="true"' : ''}
          ${describedBy ? `aria-describedby="${describedBy}"` : ''}
        />
        ${error
          ? `<div id="${errorId}" class="error" role="alert">${error}</div>`
          : helper ? `<div id="${helperId}" class="helper">${helper}</div>` : ''}
      </div>
    `;
    const input = this.shadowRoot.querySelector('input');
    input.addEventListener('input', (e) => {
      this.dispatchEvent(new CustomEvent('cs-input', { detail: { value: e.target.value }, bubbles: true, composed: true }));
    });
    input.addEventListener('change', (e) => {
      this.setAttribute('value', e.target.value);
      this.dispatchEvent(new CustomEvent('cs-change', { detail: { value: e.target.value }, bubbles: true, composed: true }));
    });
  }
}
