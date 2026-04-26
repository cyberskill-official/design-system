/**
 * <cs-card> — generic content container.
 *
 * Token-driven elevation (elevation.1 default; elevation.2 on hover when
 * `interactive`), rounded corners, surface-raised background.
 *
 * Attributes:
 *   interactive — boolean; adds hover/focus states + role="button"
 *   elevation   — 0..5 (default 1)
 *   padding     — none | sm | md (default) | lg
 *
 * Slots:
 *   default — body
 *   header  — optional header
 *   footer  — optional footer
 *
 * Events:
 *   cs-click — fires when interactive
 */

const CSS = `
:host {
  display: block;
  background: var(--cs-color-surface-raised);
  border-radius: 12px;
  border: 1px solid var(--cs-color-border-subtle);
  box-shadow: var(--cs-elevation-1);
  font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif);
  color: var(--cs-color-text-default);
  transition: box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
:host([interactive]) { cursor: pointer; }
:host([interactive]:hover) { box-shadow: var(--cs-elevation-2); transform: translateY(-1px); }
:host([interactive]:focus-visible) { outline: 2px solid var(--cs-color-focus-ring); outline-offset: 2px; }
:host([elevation="0"]) { box-shadow: var(--cs-elevation-0); }
:host([elevation="2"]) { box-shadow: var(--cs-elevation-2); }
:host([elevation="3"]) { box-shadow: var(--cs-elevation-3); }
:host([elevation="4"]) { box-shadow: var(--cs-elevation-4); }
:host([elevation="5"]) { box-shadow: var(--cs-elevation-5); }
:host([padding="none"]) .body { padding: 0; }
:host([padding="sm"]) .body { padding: 12px; }
:host([padding="lg"]) .body { padding: 24px; }
.body { padding: 16px; }
.header { padding: 16px 16px 0 16px; font-weight: 600; }
.footer { padding: 0 16px 16px 16px; color: var(--cs-color-text-muted); font-size: 13px; }
@media (prefers-reduced-motion: reduce) { :host { transition: none; } }
`;

export class CSCard extends HTMLElement {
  static get observedAttributes() { return ['interactive', 'elevation', 'padding']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    if (this.hasAttribute('interactive')) {
      this.tabIndex = 0;
      this.setAttribute('role', 'button');
      this.addEventListener('click', this._handleClick);
      this.addEventListener('keydown', this._handleKey);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKey);
  }

  _handleClick = () => {
    this.dispatchEvent(new CustomEvent('cs-click', { bubbles: true, composed: true }));
  };

  _handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick();
    }
  };

  render() {
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <slot name="header"></slot>
      <div class="body"><slot></slot></div>
      <slot name="footer"></slot>
    `;
  }
}
