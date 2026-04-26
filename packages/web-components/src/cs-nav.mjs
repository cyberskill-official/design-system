/**
 * <cs-nav> — primary navigation bar custom element.
 *
 * Slots a row of <cs-nav-item href="..." [active]> children. Renders a
 * landmark <nav> for screen readers.
 *
 * Attributes:
 *   variant — primary (default) | secondary
 *   layout  — horizontal (default) | vertical
 *
 * Children: <cs-nav-item href label icon> or any anchor in the default slot.
 */

const NAV_CSS = `
:host {
  display: block;
  font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif);
}
nav {
  display: flex;
  gap: 4px;
  padding: 8px;
  align-items: center;
}
:host([layout="vertical"]) nav { flex-direction: column; align-items: stretch; padding: 12px 8px; }
:host([variant="primary"]) {
  background: var(--cs-color-surface-raised);
  border-bottom: 1px solid var(--cs-color-border-subtle);
}
:host([variant="primary"][layout="vertical"]) {
  border-bottom: none;
  border-right: 1px solid var(--cs-color-border-subtle);
}
`;

export class CSNav extends HTMLElement {
  static get observedAttributes() { return ['variant', 'layout']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${NAV_CSS}</style><nav role="navigation"><slot></slot></nav>`;
  }
}

const ITEM_CSS = `
:host {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--cs-color-text-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  user-select: none;
  min-height: 32px;
}
:host(:hover) { background: var(--cs-color-surface-subtle); color: var(--cs-color-text-default); }
:host(:focus-visible) { outline: 2px solid var(--cs-color-focus-ring); outline-offset: 2px; }
:host([active]) { background: var(--cs-color-accent-subtle); color: var(--cs-color-umber, var(--cs-color-text-default)); }
a {
  all: unset;
  display: contents;
  cursor: inherit;
}
`;

export class CSNavItem extends HTMLElement {
  static get observedAttributes() { return ['active', 'href']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.tabIndex = 0;
    if (!this.hasAttribute('role')) this.setAttribute('role', 'link');
    if (this.hasAttribute('active')) this.setAttribute('aria-current', 'page');
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) window.location.assign(href);
      }
    });
    this.addEventListener('click', () => {
      const href = this.getAttribute('href');
      if (href) window.location.assign(href);
    });
    this.shadowRoot.innerHTML = `<style>${ITEM_CSS}</style><slot></slot>`;
  }

  attributeChangedCallback(name) {
    if (name === 'active') {
      if (this.hasAttribute('active')) this.setAttribute('aria-current', 'page');
      else this.removeAttribute('aria-current');
    }
  }
}
