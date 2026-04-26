/**
 * @cyberskill/web-components — styled custom elements (top-12 primitives).
 *
 * Per RFC 2026-003. Universal — works in any framework or none.
 *
 * Wave 1 — shipped 2026-04-26: cs-button.
 * Wave 2 — shipped 2026-04-26: cs-input, cs-checkbox, cs-radio, cs-toggle,
 *   cs-card, cs-modal, cs-toast, cs-tabs (+ cs-tab, cs-tab-panel),
 *   cs-table, cs-nav (+ cs-nav-item), cs-select. Full top-12 coverage.
 */

export { CSButton } from './cs-button.mjs';
export { CSInput } from './cs-input.mjs';
export { CSCheckbox } from './cs-checkbox.mjs';
export { CSRadio } from './cs-radio.mjs';
export { CSToggle } from './cs-toggle.mjs';
export { CSCard } from './cs-card.mjs';
export { CSModal } from './cs-modal.mjs';
export { CSToast } from './cs-toast.mjs';
export { CSTabs, CSTab, CSTabPanel } from './cs-tabs.mjs';
export { CSTable } from './cs-table.mjs';
export { CSNav, CSNavItem } from './cs-nav.mjs';
export { CSSelect } from './cs-select.mjs';

import { CSButton } from './cs-button.mjs';
import { CSInput } from './cs-input.mjs';
import { CSCheckbox } from './cs-checkbox.mjs';
import { CSRadio } from './cs-radio.mjs';
import { CSToggle } from './cs-toggle.mjs';
import { CSCard } from './cs-card.mjs';
import { CSModal } from './cs-modal.mjs';
import { CSToast } from './cs-toast.mjs';
import { CSTabs, CSTab, CSTabPanel } from './cs-tabs.mjs';
import { CSTable } from './cs-table.mjs';
import { CSNav, CSNavItem } from './cs-nav.mjs';
import { CSSelect } from './cs-select.mjs';

const REGISTRY = [
  ['cs-button', CSButton],
  ['cs-input', CSInput],
  ['cs-checkbox', CSCheckbox],
  ['cs-radio', CSRadio],
  ['cs-toggle', CSToggle],
  ['cs-card', CSCard],
  ['cs-modal', CSModal],
  ['cs-toast', CSToast],
  ['cs-tabs', CSTabs],
  ['cs-tab', CSTab],
  ['cs-tab-panel', CSTabPanel],
  ['cs-table', CSTable],
  ['cs-nav', CSNav],
  ['cs-nav-item', CSNavItem],
  ['cs-select', CSSelect],
];

export function registerAll() {
  if (typeof customElements === 'undefined') return;
  for (const [tag, ctor] of REGISTRY) {
    if (!customElements.get(tag)) customElements.define(tag, ctor);
  }
}

export const webComponents = {
  __version: '1.0.0',
  __rfc: '2026-003',
  __wave: 2,
  __registered: REGISTRY.map(([tag]) => tag),
};
