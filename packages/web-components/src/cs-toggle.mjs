/**
 * <cs-toggle> — toggle switch custom element (an opinionated checkbox).
 *
 * Visually a switch; semantically role="switch" per WAI-ARIA.
 *
 * Attributes:
 *   checked  — boolean
 *   disabled — boolean
 *   label    — visible label
 *   size     — sm | md (default)
 *
 * Events:
 *   cs-change — detail: {checked}
 */

const CSS = `
:host { display: inline-block; font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif); }
.row { display: inline-flex; align-items: center; gap: 12px; cursor: pointer; min-height: 24px; user-select: none; }
:host([disabled]) .row { cursor: not-allowed; opacity: 0.55; }
.track {
  position: relative;
  width: 36px; height: 20px;
  background: var(--cs-color-border-default);
  border-radius: 999px;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
:host([size="sm"]) .track { width: 30px; height: 18px; }
.thumb {
  position: absolute; top: 2px; left: 2px;
  width: 16px; height: 16px;
  background: var(--cs-color-surface-raised);
  border-radius: 50%;
  box-shadow: var(--cs-elevation-1);
  transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
:host([size="sm"]) .thumb { width: 14px; height: 14px; }
:host([checked]) .track { background: var(--cs-color-accent-default); }
:host([checked]) .thumb { transform: translateX(16px); }
:host([size="sm"][checked]) .thumb { transform: translateX(12px); }
button {
  all: unset;
  width: 100%; height: 100%;
  cursor: inherit;
  border-radius: 999px;
}
button:focus-visible + .thumb { outline: 2px solid var(--cs-color-focus-ring); outline-offset: 2px; border-radius: 999px; }
.label { font-size: 14px; color: var(--cs-color-text-default); }
@media (prefers-reduced-motion: reduce) {
  .track, .thumb { transition: none; }
}
`;

export class CSToggle extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'label', 'size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  get checked() { return this.hasAttribute('checked'); }
  set checked(v) { v ? this.setAttribute('checked', '') : this.removeAttribute('checked'); }

  toggle() {
    if (this.hasAttribute('disabled')) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('cs-change', {
      detail: { checked: this.checked },
      bubbles: true, composed: true,
    }));
  }

  render() {
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <label class="row">
        <span class="track">
          <button
            type="button"
            role="switch"
            aria-checked="${checked}"
            ${disabled ? 'disabled aria-disabled="true"' : ''}
          ></button>
          <span class="thumb"></span>
        </span>
        ${this.getAttribute('label') ? `<span class="label">${this.getAttribute('label')}</span>` : '<slot></slot>'}
      </label>
    `;
    const btn = this.shadowRoot.querySelector('button');
    btn.addEventListener('click', () => this.toggle());
    btn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.toggle();
      }
    });
  }
}
