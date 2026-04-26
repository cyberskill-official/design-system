/**
 * @cyberskill/svelte — Svelte 5+ runes wrappers around @cyberskill/web-components.
 *
 * Per RFC 2026-003 § Open question 5 — Svelte 5+ runes only; Svelte 4 sunset 2026.
 * Auto-registers all custom elements at module-load time (client only).
 */

import { registerAll } from '@cyberskill/web-components';

if (typeof window !== 'undefined') {
  registerAll();
}

export { default as Button } from './Button.svelte';
export { useDisclosure } from './stores.ts';

export const sveltePackage = {
  __version: '1.0.0',
  __rfc: '2026-003',
  __wave: 2,
};
