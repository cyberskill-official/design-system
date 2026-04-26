/**
 * @cyberskill/primitives — headless behaviour layer.
 *
 * Per RFC 2026-003 (framework-agnostic architecture), this package contains
 * the headless behaviour for every CyberSkill primitive: state machines,
 * focus management, a11y wiring, keyboard handling. Framework-agnostic.
 *
 * Two surface shapes per primitive:
 *   1. `create*()` — vanilla-JS class constructor; returns an instance with
 *      `.props`, `.state`, and methods. Suitable for any rendering layer.
 *   2. `use*()` — a hook adapter that consumes the same instance under
 *      framework-idiomatic state (Phase 2 Wave 1 ships React-shaped hooks
 *      via @cyberskill/react; Phase 3 adds Vue + Svelte).
 *
 * What this package OWNS:
 *   - Behaviour: open/close, focus, keyboard navigation, ARIA wiring
 *   - State machines: disclosure, tabs, dialog, toast, combobox, etc.
 *
 * What this package does NOT own:
 *   - Styling, markup, framework-specific APIs.
 *   - That's @cyberskill/web-components and the framework wrappers.
 *
 * Wave 1 ships one demo primitive (useDisclosure / createDisclosure) proving
 * the pattern. Wave 2 fills in the rest of the top-12 list.
 */

export { createDisclosure, useDisclosure } from './use-disclosure.mjs';
export { createFocusTrap } from './use-focus-trap.mjs';
export { createTabs } from './use-tabs.mjs';

// Convention: every primitive exports both `create*` (vanilla) and a
// hook adapter named `use*` (framework wrappers re-export the hook variants).

export const primitives = {
  __version: '1.0.0',
  __rfc: '2026-003',
  __wave: 1,
};
