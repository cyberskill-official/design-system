/**
 * <cs-toast> — toast notification custom element.
 *
 * Self-dismissing notification with optional action. role="status" by default
 * (polite); use tone="error" for role="alert" (assertive).
 *
 * Attributes:
 *   tone     — info (default) | success | warning | error
 *   duration — ms before auto-dismiss; 0 = sticky (default 5000)
 *   dismissible — boolean (default true)
 *
 * Slots:
 *   default — message body
 *   action  — optional action button
 *
 * Events:
 *   cs-dismiss — fires when dismissed (manually or auto). detail: {reason: 'auto'|'user'}
 */

const CSS = `
:host {
  display: block;
  font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif);
  background: var(--cs-color-surface-raised);
  color: var(--cs-color-text-default);
  border-radius: 8px;
  box-shadow: var(--cs-elevation-3);
  border-left: 4px solid var(--cs-color-semantic-info);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 480px;
}
:host([tone="success"]) { border-left-color: var(--cs-color-semantic-success); }
:host([tone="warning"]) { border-left-color: var(--cs-color-semantic-warning); }
:host([tone="error"])   { border-left-color: var(--cs-color-semantic-danger); }
.body { flex: 1; font-size: 14px; line-height: 1.4; }
.dismiss {
  all: unset;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--cs-color-text-muted);
  font-size: 16px;
  line-height: 1;
}
.dismiss:hover { background: var(--cs-color-surface-subtle); }
.dismiss:focus-visible { outline: 2px solid var(--cs-color-focus-ring); outline-offset: 1px; }
@media (prefers-reduced-motion: no-preference) {
  :host { animation: cs-toast-in 200ms cubic-bezier(0.2, 0.8, 0.2, 1); }
  @keyframes cs-toast-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
}
`;

export class CSToast extends HTMLElement {
  static get observedAttributes() { return ['tone', 'duration', 'dismissible']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    const duration = parseInt(this.getAttribute('duration') ?? '5000', 10);
    if (duration > 0) {
      this._timer = setTimeout(() => this.dismiss('auto'), duration);
    }
  }

  disconnectedCallback() {
    clearTimeout(this._timer);
  }

  attributeChangedCallback() { if (this.isConnected) this.render(); }

  dismiss(reason = 'user') {
    clearTimeout(this._timer);
    this.dispatchEvent(new CustomEvent('cs-dismiss', { detail: { reason }, bubbles: true, composed: true }));
    this.remove();
  }

  render() {
    const tone = this.getAttribute('tone') ?? 'info';
    const role = tone === 'error' ? 'alert' : 'status';
    const dismissible = this.getAttribute('dismissible') !== 'false';
    this.setAttribute('role', role);
    this.setAttribute('aria-live', role === 'alert' ? 'assertive' : 'polite');
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <div class="body"><slot></slot></div>
      <slot name="action"></slot>
      ${dismissible ? '<button class="dismiss" aria-label="Dismiss">&times;</button>' : ''}
    `;
    if (dismissible) {
      this.shadowRoot.querySelector('.dismiss').addEventListener('click', () => this.dismiss('user'));
    }
  }
}
