# Storybook — single Live hub (host)

Storybook **10** is the **only live interactive hub** for operators on `design.cyberskill.world`. It is still **not** part of the portable consumer contract.

## URL

| Context | Path |
|---|---|
| Production Live | `https://design.cyberskill.world/playground/` |
| Local packaged site | `/playground/` after `npm run build:site` |
| Local dev | `npm run storybook` → http://localhost:6006 |

## What it includes

- Full component CSF with **Default + deep control matrices** (`Matrix` / `AllVariants`)
- **CSF bar (not full cartesian product):**
  - `AllSizes` whenever `argTypes.size` exists (token ramp or representative numeric sizes)
  - `States` (or a Matrix subsection) covering `disabled` / `loading` / `error` / `busy` when those argTypes exist
  - Explicit non-goal: the full N-dimensional enum product of every prop combination is **not** required
- Toolbar globals: Theme × Element × Language (same axes as templates)
- **Live/** stories for non-component portable surfaces (Motion, Identity Lab, template playground, kitchen-sink, image slots, AI cluster, RTL, Atomic View iframe)
- Same `styles.css` as production
- Addons: `@storybook/addon-docs` + `@storybook/addon-a11y` (essentials folded into core in SB10)

## Config

- `.storybook/main.js` — ESM Storybook 10 config, Vite + `@cs` → `components/` alias
- Autodocs via `tags: ['autodocs']` on CSF meta (no `docs.autodocs` in main)

## What consumers still use (unchanged)

| Audience | Consume |
|---|---|
| Static / any framework | `styles.css` + `.cs-*` |
| React production | `styles.css` + `_ds_bundle.js` |
| ESM | `_esm/cs.mjs` |
| Tokens | `tokens/*` |
| Claude Design | `templates/**/*.dc.html` |

## Commands

```bash
npm install
npm run storybook
npm run build:storybook    # → storybook-static/
npm run build:site         # packages Live hub under .vercel-static/playground/
npm run test:storybook-contract
```

## Map

Portable HTML surfaces iframed from Live/* are listed in `docs/live-hub.md`.
