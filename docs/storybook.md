# Storybook — single Live hub (host)

Storybook is the **only live interactive hub** for operators on `design.cyberskill.world`. It is still **not** part of the portable consumer contract.

## URL

| Context | Path |
|---|---|
| Production Live | `https://design.cyberskill.world/playground/` |
| Local packaged site | `/playground/` after `npm run build:site` |
| Local dev | `npm run storybook` → http://localhost:6006 |

## What it includes

- Full component CSF with **Default + deep control matrices** (argTypes + multi-variant stories)
- Toolbar globals: Theme × Element × Language (same axes as templates)
- **Live/** stories for former Live View non-component tabs (Motion, Identity Lab, template playground, kitchen-sink, image slots, AI cluster, RTL, Atomic View iframe)
- Same `styles.css` as production

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

## Retired shell

`guidelines/live-view.html` redirects into this hub. Do not revive a parallel Live View shell. Map: `docs/live-view-vs-storybook.md`.
