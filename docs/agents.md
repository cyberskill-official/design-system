# Importing CyberSkill DS as an AI agent — one page

You are (or are driving) a coding agent. This is the shortest lossless path into the system. Deeper maps: `llms.txt` (inventory), `SKILL.md` (build rules), `docs/consuming.md` (human-oriented adoption + upgrading).

## What you get
`styles.css` (500+ tokens + `.cs-*` classes + Liquid Glass surfaces, `@import`s `tokens/` + `base/`) · `_ds_bundle.js` (compiled React components, no build step) · `_esm/cs.mjs` (ESM entry re-exporting every component) · `_ds_manifest.json` (machine-readable inventory) · per-component `Name.d.ts` (API) + `Name.prompt.md` (usage brief) · `tokens/tokens.dtcg.json` (W3C DTCG) + `tokens.json`/`tokens.js`.

## Claude Code / repo checkout
Clone or copy the whole tree; everything is relative-path static. Entry points: `dashboard.html` (hub) · `guidelines/atomic-view.html` (every component live) · `templates/<slug>/` (copyable starting points). Read `SKILL.md` before authoring anything on-brand.

## Any React app (no build step)
Module path (preferred): `import { Button, TextField } from "<path>/_esm/cs.mjs"` — self-ensures React + bundle, prefix-resolved, all components re-exported (gate-checked parity). Or classic scripts:
```html
<link rel="stylesheet" href="<path>/styles.css">
<script src="<path>/_ds_bundle.js"></script>
<script>
  // Namespace suffix is compiler-assigned and CHANGES on re-import — resolve by prefix, never hardcode:
  const CS = window[Object.keys(window).find(k => /^CyberSkillDesignSystem_/.test(k))];
  const { Button, TextField, DataGrid } = CS;
</script>
```
Bilingual: components resolve strings from `lang` (`lang="vi"` on any container → full Vietnamese). Axes: set `data-theme` / `data-cs-element` (+`data-cs-variant`) / `data-cs-expression` / `data-cs-density="compact"` on a container; everything re-skins.

## Static HTML / no React
Link `styles.css` and compose with `.cs-*` classes — full catalog demonstrated in `templates/kitchen-sink.html`.

## Design-tool / native token pipelines (Stitch, Tokens Studio, Style Dictionary)
Import `tokens/tokens.dtcg.json` (W3C DTCG, grouped by category with theme/element/expression maps). `tokens/tokens.js` is the ESM mirror. Native targets are pre-generated in `tokens/native/` (SwiftUI · Compose · Flutter) with provenance in `tokens/provenance.json` — parity is gate-enforced.

## After import — prove health
Open `_audit/run.html`, let the gate board finish (every fast gate), click **Copy import report**. All green = the copy is internally consistent (contrast, docs, portability, tokens, consumer path, behavior, a11y, stories, bilingual parity).

## Rules that keep transfer lossless
- Never hardcode the bundle namespace suffix (gate-enforced).
- Never recreate/recolour the logo — use `assets/logo-mark.svg` / the `Logo` component.
- Every UI string ships EN + VN via the registry; don't inline one-language strings in components.
- Anchors (Umber/Ochre), `.cs-*` class names, `--cs-*` token names are stable contracts.
- Extending the system? Follow `CONTRIBUTING.md` (Expansion Rule: propagate to every deliverable in one change; verify via `_audit/`).
