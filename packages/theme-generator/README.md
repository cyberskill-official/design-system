# @cyberskill/theme-generator

Generate a contrast-validated DTCG theme overlay from a logo or primary brand colour. Per **RFC 2026-004**.

## What it does

1. **Extract** — read the primary brand colour from a logo (SVG fill scan) or accept it directly.
2. **Validate** — check WCAG 2.2 AA contrast (text 4.5:1, UI 3:1) against the doctrine's text + surface anchors.
3. **Expand** — generate a 12-step ramp + complementary accent at the same OKLCH chroma.
4. **Emit** — write a DTCG 2025.10–conformant `.tokens.json` overlay.

## Usage

### CLI

```bash
# From a colour:
pnpm dlx @cyberskill/theme-generator --primary "#1d4ed8" --tenant acme --output acme.tokens.json

# From a logo:
pnpm dlx @cyberskill/theme-generator --logo customer.svg --tenant acme --output acme.tokens.json

# Strict (fail on contrast warning):
pnpm dlx @cyberskill/theme-generator --primary "#FFD400" --strict
```

### Programmatic

```js
import { generateTheme } from '@cyberskill/theme-generator';

const result = generateTheme({
  primary: '#1d4ed8',
  tenant: 'acme',
});

console.log(result.passed);     // true / false
console.log(result.warnings);   // string[]
console.log(result.tokens);     // DTCG-conformant tokens object
```

## Hard guarantees (per RFC 2026-004 § Hard non-goals)

- Anchor immutables (Umber + Ochre) are **never** overridden — the generator produces tenant overlays only.
- The generator **never** silently changes microcopy.
- The generator **never** produces themes that fail WCAG 2.2 AA. If `--strict`, it exits 1; otherwise it warns and emits the closest reachable theme.

## Doctrine references

- RFC 2026-004 — `Design System/docs/RFCs/2026-004-generative-theming.md`
- `Design System/docs/part-13-theming-whitelabel-embed.md` §6 — white-label themes (host)
- `Design System/docs/part-2-design-language.md` §1 — OKLCH foundation (math)
