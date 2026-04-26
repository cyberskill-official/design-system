# @cyberskill/tokens

DTCG 2025.10–conformant design tokens for the CyberSkill Design System.

## What's in here

| File | Purpose |
|---|---|
| `../../tokens/colour.tokens.json` | Source of truth — 4-mode-aware colour tokens (light / dark / HC / sepia) |
| `../../tokens/motion.tokens.json` | Source of truth — duration + easing + reduced-motion contract |
| `../../tokens/space.tokens.json` | Source of truth — 4-base scale + density variants |
| `../../tokens/type.tokens.json` | Source of truth — Be Vietnam Pro variable axes + JetBrains Mono |
| `../../tokens/elevation.tokens.json` | Source of truth — mode-aware elevation 0–5 + spatial reserve |
| `src/index.mjs` | Programmatic interface — read tokens at runtime |
| `dist/tokens.css` | CSS custom-properties output (built by `pnpm build:tokens`) |
| `dist/tokens.mjs` | ESM constants output |
| `dist/tokens.d.ts` | TypeScript types |
| `dist/Tokens.swift` | Swift enum stub (Phase 2 Wave 2 fills this in) |
| `dist/tokens.xml` | Android resources stub |

## Usage

### Build the multi-platform outputs

```bash
pnpm build:tokens
```

This runs `scripts/build-tokens.mjs` and produces `packages/tokens/dist/`.

### Read tokens programmatically (Node)

```js
import { colour, resolveToken } from '@cyberskill/tokens';

console.log(colour.color.semantic.danger.$value);   // "#B33B19"
console.log(resolveToken('color.surface.default')); // "#FAF6F1" (alias resolved)
```

### Consume CSS custom properties

```css
@import '@cyberskill/tokens/build/css';

.my-button {
  background: var(--cs-color-accent-default);
  padding: var(--cs-space-2) var(--cs-space-4);
  box-shadow: var(--cs-elevation-2);
}
```

## DTCG conformance

All token files declare `"$schema": "https://design-tokens.github.io/community-group/format-2025-10/schema.json"` and use `$value` / `$type` / `$description` / `$extensions` per the **DTCG 2025.10** stable specification (ratified 28 October 2025).

Custom extensions used:

- `com.cyberskill.theme` — per-mode (light / dark / high-contrast / sepia) variants
- `com.cyberskill.oklch` — OKLCH-derived value annotation
- `com.cyberskill.fluid` — `clamp()` expression for fluid scales
- `com.cyberskill.variable-axes` — variable-font axis ranges
- `com.cyberskill.opentype-features` — per-family OT feature flags
- `com.cyberskill.role` — semantic role tag (anchor, primitive, semantic)
- `com.cyberskill.spatial` — spatial-context fallback (RFC 2026-006 path)

## Versioning

`@cyberskill/tokens` follows the doctrine's semver discipline (`00-audit-and-roadmap.md` §12.1):
- **Patch** — editorial / typo / formatting
- **Minor** — additive token (new colour, new size, new mode)
- **Major** — breaking change (renamed slot, removed token)

Token removals are gated by the lifecycle in `00-audit-and-roadmap.md` §10 (deprecated → sunset over 180 days; codemod required).

## Doctrine references

- `Design System/docs/part-2-design-language.md` — full design-language spec
- `Design System/docs/part-2-design-language.md` §27 — token-layer extensions (mode-aware elevation, variable-axis annotations, P3 wide-gamut)
- `Design System/docs/00-audit-and-roadmap.md` §6 A.1 — Foundations & Tokens audit criteria
