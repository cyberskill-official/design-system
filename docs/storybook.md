# Storybook host playground

Storybook is the **hosted live playground** for operators on `design.cyberskill.world`. It is **not** part of the portable consumer contract.

**Live View is not deleted or replaced by Storybook.** See `docs/live-view-vs-storybook.md` and owner decision §4 in `docs/decisions-pending.md`.

## URL

| Context | Path |
|---|---|
| Production | `https://design.cyberskill.world/playground/` |
| Local packaged site | `/playground/` after `npm run build:site` |
| Local dev | `npm run storybook` → http://localhost:6006 |

## What Storybook uses

- The same `styles.css` token + component CSS as production
- Source components under `components/**` (thin CSF wrappers in `stories/` — **one Default story per public primary component**; completeness gated by `npm run test:storybook-contract`)
- Toolbar globals set `data-theme`, `data-cs-element` / `data-cs-variant`, and `lang` — same axes as Live View / templates

## What consumers still use (unchanged)

| Audience | Consume |
|---|---|
| Static / any framework | `styles.css` + `.cs-*` |
| React production | `styles.css` + `_ds_bundle.js` (prefix-resolve) |
| ESM | `_esm/cs.mjs` |
| Tokens / design tools | `tokens/tokens.json`, `tokens.dtcg.json`, `tokens/native/*` |
| Claude Design | `templates/**/*.dc.html` |
| Google Stitch / other tools | tokens + CSS contract, not Storybook |

See `docs/consuming.md` and `llms.txt`.

## Commands

```bash
npm install
npm run storybook          # dev server
npm run build:storybook    # → storybook-static/
npm run build:site         # Storybook + Vercel static package (.vercel-static/)
```

## Deploy

Vercel `installCommand` runs `npm install`; `buildCommand` runs `npm run build:site`, which builds Storybook then copies the portable tree and places Storybook under `.vercel-static/playground/`.
