/**
 * Loader entry — auto-registers all CyberSkill custom elements.
 * Per RFC 2026-002, this is the entry point the CDN distribution serves
 * at `cdn.cyberskill.dev/v1/loader.js` (Phase 2 Wave 2 ships the CDN).
 *
 *   <script src="https://cdn.cyberskill.dev/v1/loader.js"></script>
 *
 * Equivalent to:
 *   import { registerAll } from '@cyberskill/web-components';
 *   registerAll();
 */

import { registerAll } from './index.mjs';

if (typeof window !== 'undefined') {
  registerAll();
}

export { registerAll };
