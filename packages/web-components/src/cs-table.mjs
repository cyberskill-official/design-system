/**
 * <cs-table> — minimal data-table custom element.
 *
 * Wave 1: a styled wrapper around a native <table>. Sortable/paginated
 * variants (DataTable per Part 12) are Wave 2; this is the cs-table primitive.
 *
 * Attributes:
 *   density — compact | default | comfortable
 *   striped — boolean
 *   bordered — boolean
 *
 * Slots:
 *   default — rows; consumers compose with <table>/<thead>/<tbody>/<tr>/<th>/<td>
 */

const CSS = `
:host {
  display: block;
  font-family: var(--cs-font-family-ui, "Be Vietnam Pro", system-ui, sans-serif);
  color: var(--cs-color-text-default);
  font-size: 14px;
}
::slotted(table) {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
:host([density="compact"]) ::slotted(table) { font-size: 13px; }
:host([density="comfortable"]) ::slotted(table) { font-size: 15px; }
::slotted(table) th {
  text-align: left;
  font-weight: 600;
  padding: 8px 12px;
  border-bottom: 2px solid var(--cs-color-border-default);
  color: var(--cs-color-text-default);
}
::slotted(table) td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--cs-color-border-subtle);
  font-variant-numeric: tabular-nums;
}
:host([density="compact"]) ::slotted(table) th,
:host([density="compact"]) ::slotted(table) td { padding: 4px 8px; }
:host([density="comfortable"]) ::slotted(table) th,
:host([density="comfortable"]) ::slotted(table) td { padding: 12px 16px; }
:host([striped]) ::slotted(table) tr:nth-child(even) td { background: var(--cs-color-surface-subtle); }
:host([bordered]) ::slotted(table) th,
:host([bordered]) ::slotted(table) td { border: 1px solid var(--cs-color-border-subtle); }
::slotted(table) tr:hover td { background: var(--cs-color-surface-subtle); }
`;

export class CSTable extends HTMLElement {
  static get observedAttributes() { return ['density', 'striped', 'bordered']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<style>${CSS}</style><slot></slot>`;
    // Promote the slotted table semantics for screen readers
    if (!this.hasAttribute('role')) this.setAttribute('role', 'region');
    if (!this.getAttribute('aria-label') && !this.getAttribute('aria-labelledby')) {
      this.setAttribute('aria-label', 'Data table');
    }
  }
}
