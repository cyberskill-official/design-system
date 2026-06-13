# @cyberskill/brand-assets

Official CyberSkill brand assets.

## Usage rule (doctrine)

**Whenever a product is for or owned by CyberSkill, use the exact official logo — never a recreation, retype, or "close enough" mark.** This is the company's identity (legal name: CYBERSKILL SOFTWARE SOLUTIONS CONSULTANCY AND DEVELOPMENT JOINT STOCK COMPANY) and must be reproduced from the master file. For third-party / white-label tenants, the tenant's own logo is swapped in per `DESIGN.md` Part 13 — the CyberSkill mark is not used to represent another company.

- React: `import { Logo } from "@cyberskill/react";` → `<Logo size={40} title="CyberSkill" />` (use `decorative` when the name appears adjacent in text). The component renders the exact master artwork from `logo-mark.svg` via `packages/react/src/logo-data.js`.
- Static / email / print: reference `assets/logo-primary.svg` / `assets/logo-mark.svg` (vector, 1007×1007) or `assets/logo-mark.png` (raster, 1007×1007).
- Clear space: keep padding ≥ 25% of the mark height on all sides.
- Colour: Umber `#45210E` ground, Ochre `#F4BA17` figure. Do not recolour, rotate, stretch, add effects, or place the mark on a low-contrast background.

## Assets

| File | Format | Use |
|---|---|---|
| `assets/logo-mark.svg` | SVG 1007×1007 | Primary — app icons, favicons, UI, anywhere scalable |
| `assets/logo-primary.svg` | SVG 1007×1007 | Lockup alias (same master) |
| `assets/logo-mark.png` | PNG 1007×1007 | Raster fallback — email, raster pipelines |

These are the **official master files**. The React `<Logo>` and the `logo-data.js` module are generated from `logo-mark.svg`; to update the mark, replace the SVG and regenerate `logo-data.js` (one step — see `CONTRIBUTING`/`DESIGN.md` §2.2a).
