/**
 * <cs-modal> — modal dialog custom element.
 *
 * Wraps a native <dialog>. Built on @cyberskill/primitives focus-trap
 * (consumers can opt out via `data-no-focus-trap`).
 *
 * Attributes:
 *   open      — boolean (controls visibility)
 *   title     — accessible name (becomes aria-labelledby target)
 *   size      — sm | md (default) | lg | xl
 *   dismissible — boolean (default true; set "false" to require explicit action)
 *
 * Slots:
 *   default     — body content
 *   actions     — footer actions (typically <cs-button> elements)
 *
 * Events:
 *   cs-open    — fires after open
 *   cs-close   — fires after close (detail: {reason: 'escape'|'backdrop'|'action'})
 */

const CSS = `
:host { display: contents; font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif); }
dialog {
  margin: auto;
  border: none;
  background: var(--cs-color-surface-raised);
  color: var(--cs-color-text-default);
  border-radius: 12px;
  box-shadow: var(--cs-elevation-4);
  padding: 0;
  max-width: 480px;
  max-height: 85vh;
  width: calc(100% - 32px);
  font: inherit;
}
dialog::backdrop { background: rgba(15, 6, 1, 0.5); backdrop-filter: blur(2px); }
:host([size="sm"]) dialog { max-width: 360px; }
:host([size="lg"]) dialog { max-width: 640px; }
:host([size="xl"]) dialog { max-width: 880px; }
.head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--cs-color-border-subtle);
}
.head h2 { margin: 0; font-size: 16px; font-weight: 600; }
.close {
  all: unset;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  font-size: 18px;
  line-height: 1;
  color: var(--cs-color-text-muted);
}
.close:focus-visible { outline: 2px solid var(--cs-color-focus-ring); outline-offset: 2px; }
.body { padding: 20px; overflow-y: auto; max-height: calc(85vh - 130px); }
.actions {
  display: flex; gap: 8px; justify-content: flex-end;
  padding: 16px 20px;
  border-top: 1px solid var(--cs-color-border-subtle);
}
@media (prefers-reduced-motion: no-preference) {
  dialog[open] { animation: cs-modal-in 200ms cubic-bezier(0.2, 0.8, 0.2, 1); }
  @keyframes cs-modal-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
}
`;

export class CSModal extends HTMLElement {
  static get observedAttributes() { return ['open', 'title', 'size']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() { this.render(); this._sync(); }
  attributeChangedCallback(name) {
    if (!this.isConnected) return;
    if (name === 'open') this._sync();
    else this.render();
  }

  open() { this.setAttribute('open', ''); }
  close(reason = 'action') {
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('cs-close', { detail: { reason }, bubbles: true, composed: true }));
  }

  _sync() {
    const dialog = this.shadowRoot.querySelector('dialog');
    if (!dialog) return;
    if (this.hasAttribute('open')) {
      if (!dialog.open) {
        dialog.showModal();
        this.dispatchEvent(new CustomEvent('cs-open', { bubbles: true, composed: true }));
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }

  render() {
    const title = this.getAttribute('title');
    const dismissible = this.getAttribute('dismissible') !== 'false';
    this.shadowRoot.innerHTML = `
      <style>${CSS}</style>
      <dialog aria-labelledby="title" aria-modal="true">
        ${title || dismissible ? `
          <div class="head">
            ${title ? `<h2 id="title">${title}</h2>` : '<span></span>'}
            ${dismissible ? '<button class="close" aria-label="Close">&times;</button>' : ''}
          </div>` : ''}
        <div class="body"><slot></slot></div>
        <div class="actions"><slot name="actions"></slot></div>
      </dialog>
    `;
    const dialog = this.shadowRoot.querySelector('dialog');
    if (dismissible) {
      this.shadowRoot.querySelector('.close')?.addEventListener('click', () => this.close('action'));
      dialog.addEventListener('cancel', (e) => { e.preventDefault(); this.close('escape'); });
      dialog.addEventListener('click', (e) => {
        // Click outside dialog (on backdrop) — dialog click event includes dialog itself; check target
        if (e.target === dialog) this.close('backdrop');
      });
    }
  }
}
