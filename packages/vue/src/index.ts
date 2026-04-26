/**
 * @cyberskill/vue — Vue 3.5+ wrappers around @cyberskill/web-components.
 *
 * Per RFC 2026-003, this is a thin wrapper. The behaviour lives in
 * @cyberskill/primitives; the styled markup lives in @cyberskill/web-components.
 * This package adds Vue Composition-API ergonomics around them.
 *
 * Auto-registers all custom elements at module-load time (client only).
 */

import { registerAll } from '@cyberskill/web-components';

if (typeof window !== 'undefined') {
  registerAll();
}

export { default as Button } from './Button.vue';
export { useDisclosure } from './composables.ts';

// Phase 3 will add: Input, Modal, Toast, Card, Tabs, Table, Nav, Checkbox,
// Radio, Toggle, Select.
//
// For now, consumers can use the custom elements directly in templates:
//   <cs-input label="Email" type="email" />
//   <cs-modal :open="isOpen" title="Confirm">…</cs-modal>
// The composables in ./composables.ts adapt @cyberskill/primitives state
// machines to Vue's reactivity.

export const vuePackage = {
  __version: '1.0.0',
  __rfc: '2026-003',
  __wave: 2,
};
