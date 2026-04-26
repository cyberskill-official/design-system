/**
 * <cs-button> — styled custom element.
 *
 * Universal — works in any framework or none. Built on @cyberskill/primitives
 * for behaviour (none needed for a plain button) and consumes @cyberskill/tokens
 * via CSS custom properties on :host.
 *
 * Attributes:
 *   variant   — primary (default) | secondary | tertiary | ghost | danger | danger-ghost
 *   size      — sm | md (default) | lg
 *   disabled  — boolean
 *   loading   — boolean (replaces trailing icon with spinner)
 *   tone      — neutral (default) | accent
 *
 * Slots:
 *   default       — label
 *   icon-leading  — optional leading icon
 *   icon-trailing — optional trailing icon
 *
 * Events:
 *   cs-click — fires when the button activates (mouse, Enter, Space)
 *
 * A11y:
 *   - Native <button> semantics (role="button", focusable, keyboard-activatable)
 *   - aria-busy when loading
 *   - aria-disabled when disabled (instead of disabled attr to keep focusable)
 *   - WCAG 2.2 SC 2.4.7 Focus Visible — focus ring uses --cs-color-focus-ring token
 *   - WCAG 2.2 SC 2.5.8 Target Size — min-height 40px (md) / 32px (sm) / 48px (lg)
 *
 * Doctrine refs: part-3a-actions.md (Button spec); RFC 2026-003 §Implementation outline.
 */

const CSS = `
:host {
  --_bg: var(--cs-color-accent-default);
  --_fg: var(--cs-color-umber);
  --_border: transparent;
  --_pad-y: 8px;
  --_pad-x: 16px;
  --_size: 40px;
  --_radius: 8px;
  display: inline-block;
  font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif);
}
:host([size="sm"]) { --_pad-y: 4px; --_pad-x: 12px; --_size: 32px; }
:host([size="lg"]) { --_pad-y: 12px; --_pad-x: 20px; --_size: 48px; }

:host([variant="secondary"]) { --_bg: transparent; --_fg: var(--cs-color-umber); --_border: var(--cs-color-border-default); }
:host([variant="tertiary"])  { --_bg: transparent; --_fg: var(--cs-color-umber); --_border: transparent; }
:host([variant="ghost"])     { --_bg: transparent; --_fg: var(--cs-color-text-muted); --_border: transparent; }
:host([variant="danger"])    { --_bg: var(--cs-color-semantic-danger); --_fg: #ffffff; --_border: transparent; }
:host([variant="danger-ghost"]) { --_bg: transparent; --_fg: var(--cs-color-semantic-danger); --_border: transparent; }

button {
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--_bg);
  color: var(--_fg);
  border: 1px solid var(--_border);
  border-radius: var(--_radius);
  padding: var(--_pad-y) var(--_pad-x);
  min-height: var(--_size);
  min-width: var(--_size); /* WCAG 2.2 SC 2.5.8 24x24 floor; we go 32+ */
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  cursor: pointer;
  transition: filter 150ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: var(--cs-elevation-1);
}
button:hover { filter: brightness(0.96); box-shadow: var(--cs-elevation-2); }
button:active { filter: brightness(0.92); box-shadow: var(--cs-elevation-1); }
button:focus-visible { outline: 2px solid var(--cs-color-focus-ring); outline-offset: 2px; }

:host([disabled]) button,
:host([loading]) button {
  cursor: not-allowed;
  opacity: 0.55;
}

@media (prefers-reduced-motion: reduce) {
  button { transition: none; }
}

.spinner {
  width: 14px; height: 14px;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: cs-spin 0.8s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .spinner { animation: none; }
}
@keyframes cs-spin { to { transform: rotate(360deg); } }
`;

export class CSButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('button')?.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('button')?.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  handleClick = (e) => {
    if (this.hasAttribute('disabled') || this.hasAttribute('loading')) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    this.dispatchEvent(new CustomEvent('cs-click', { bubbles: true, composed: true }));
  };

  render() {
    const isLoading = this.hasAttribute('loading');
    const isDisabled = this.hasAttribute('disabled');
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <button
        type="button"
        ${isDisabled ? 'aria-disabled="true"' : ''}
        ${isLoading ? 'aria-busy="true"' : ''}
      >
        <slot name="icon-leading"></slot>
        <slot></slot>
        ${isLoading
          ? '<span class="spinner" aria-hidden="true"></span>'
          : '<slot name="icon-trailing"></slot>'}
      </button>
    `;
    this.shadowRoot.querySelector('button')?.addEventListener('click', this.handleClick);
  }
}
