/**
 * @cyberskill/react — React 19 wrappers around @cyberskill/web-components.
 *
 * Per RFC 2026-003, this is a thin wrapper. It adds:
 *   - React-idiomatic types (TypeScript)
 *   - React event-name normalisation (cs-click → onClick)
 *   - SSR safety (custom-element registration deferred to client)
 *
 * It does NOT add behaviour, styling, or a11y wiring — those live in
 * @cyberskill/primitives and @cyberskill/web-components respectively.
 */

export { Button } from './Button.tsx';
export { useDisclosure } from './hooks.ts';

// Phase 2 Wave 2 will add: Input, Modal, Toast, Card, Tabs, Table, Nav,
// Checkbox, Radio, Toggle, Select.

export const reactPackage = {
  __version: '1.0.0',
  __rfc: '2026-003',
  __wave: 1,
  __components: ['Button'],
};
