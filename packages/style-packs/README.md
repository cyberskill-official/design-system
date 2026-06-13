# @cyberskill/style-packs

Style packs let one CyberSkill design system wear many visual styles — Glassmorphism, Brutalism, Bauhaus, Synthwave, and dozens more — **without ever changing the brand**. They answer the question: *"Can the design system flex into different styles while keeping the same gold + brown identity?"* Yes — through a separated, layered render system.

## The model: core stays, style packs layer on top

```
┌─────────────────────────────────────────────┐
│ Style pack  (data-cs-style="brutalism")       │  ← render surface only: fills,
│   render-surface tokens + component skin       │     blur, borders, shadows,
├─────────────────────────────────────────────┤     radii, type/motion treatment
│ Theme       (data-theme="light" | "dark")      │  ← surface/text values
├─────────────────────────────────────────────┤
│ Core tokens (@cyberskill/tokens)               │  ← IMMUTABLE anchors:
│   Umber #45210E · Ochre #F4BA17 · spacing ·    │     Umber + Ochre + APCA floors
│   type · components                            │
└─────────────────────────────────────────────┘
```

A style pack is a **separately-versioned artifact**. You ship the core design system always, and pick up a pack only when a product wants that look — exactly the "store styles separately, choose when needed" model. The catalog is open-ended: adding a 51st style is adding one manifest (and optionally one CSS file), not touching the core.

## Two hard rules (enforced by the build)

1. **Anchors are immutable.** No pack may redefine `--cs-color-brand-umber` or `--cs-color-brand-ochre`. The build fails if a pack tries. Packs *use* the anchors (as fills, accents, glows) but never replace them — so every style still reads as CyberSkill.
2. **Packs are scoped and additive.** Every pack rule is scoped under `[data-cs-style="<id>"]`, so a pack only applies when explicitly selected and never leaks into the core or another pack. Old code that ignores style packs keeps working.

Accessibility floors (APCA Lc ≥ 75, 44px touch targets, focus rings, `prefers-reduced-motion`/`prefers-reduced-transparency`) are part of the core and are **not** waived by any pack — including the deliberately "raw" ones.

## Usage

```html
<!-- Load the core, then the packs stylesheet, then opt in per subtree. -->
<link rel="stylesheet" href="@cyberskill/tokens/dist/css/tokens.css" />
<link rel="stylesheet" href="@cyberskill/react/src/styles.css" />
<link rel="stylesheet" href="@cyberskill/style-packs/dist/style-packs.css" />

<html data-theme="light" data-cs-style="glassmorphism">
  ...
</html>
```

`data-cs-style` composes with `data-theme` and can be scoped to any subtree (e.g. a marketing hero in `synthwave` inside an app that is otherwise default).

## Status tiers

Each style is one of:

- **✅ shipped** — a CSS render layer is included (`dist/css/<id>.css`).
- **🟡 implementable** — UI-viable; manifest is authored, CSS render layer not yet shipped. Drop a `src/css/<id>.css` and rebuild to promote it to *shipped*.
- **📓 vocabulary** — a mood/illustration/prompting style (e.g. Pointillism, Surrealism) captured as a manifest for briefing AI, moodboards, and illustration direction rather than as an interactive UI skin.

See [`dist/catalog.md`](dist/catalog.md) for the full 50-style table and `dist/registry.json` for machine-readable data.

## Current state

All **50 styles** from the seed vocabulary now ship a CSS render layer (`status: shipped`), and all 50 pass the per-pack verifier with **0 hard failures and 0 warnings**. See [`dist/catalog.md`](dist/catalog.md) and [`dist/verification-report.md`](dist/verification-report.md).

## Build & verify

```bash
node scripts/build.mjs     # validate manifests + hard laws → dist/registry.json, style-packs.css, catalog.md
node scripts/verify.mjs    # per-pack audit → dist/verification-report.{json,md}
# from repo root:
npm run stylepacks:build && npm run stylepacks:verify   # (also part of `npm run verify:all`)
```

`build.mjs` validates every manifest, enforces the two hard rules, and derives each pack's status from whether its CSS exists. `verify.mjs` audits each shipped pack individually — balanced CSS, correct scoping, no anchor override, focus never removed, 44px button floor, real system targeting (hard), plus on-brand reference and reduced-motion/transparency fallbacks (soft) — and writes a pass/fail report.

## Authoring a new style

The full, step-by-step guide for **humans and AI agents** — schema, the two hard laws, the accessibility floors, a checklist, and a worked example — is in **[`AUTHORING.md`](AUTHORING.md)**. In short:

1. Add an entry to `src/styles.catalog.json` (id, name, category, mood, bestFor, coreElements, **anchorMapping**, surfaceTreatment, `uiImplementable`, accessibilityNote).
2. If it's an interactive skin, add `src/css/<id>.css` — scope every rule under `[data-cs-style="<id>"]`, use the anchors via `var(--cs-color-brand-*)`, never redefine them, keep the accessibility floors.
3. Run build + verify; commit the regenerated `dist/`.

Doctrine: see `DESIGN.md` Part 22 — Style Packs.
