# Live hub = Storybook

## Owner decision (Jul 2026 — supersedes keep-Live-View)

**Storybook is the single live interactive hub** for operators on `design.cyberskill.world`. The former Live View shell (`guidelines/live-view.html`) is retired (redirect only). Dashboard **Live** opens `/playground/`.

## What each surface is now

| Surface | Role |
|---|---|
| **Storybook Live** (`/playground/`) | Host interactive hub: Theme × Element × Language toolbar, full component CSF (Default + control matrices), and former Live View tabs as Live/* stories (iframes into portable HTML) |
| **Atomic View** (`guidelines/atomic-view.html`) | Portable zero-build component grid for gates and clone-and-open browsing — not the site Live hub |
| **Other guidelines / templates** | Portable specimens; opened from Storybook Live/* stories when exploring Motion, Identity Lab, kitchen-sink, etc. |

## Surface map (former Live View tabs → Storybook)

| Former Live View tab | Storybook entry |
|---|---|
| Components | Components/* CSF + Live/Components (Atomic View iframe) |
| Motion | Live/Motion |
| Identity Lab | Live/Identity Lab |
| Playground (templates) | Live/Template Playground |
| Kitchen sink | Live/Kitchen Sink |
| Image slots | Live/Image Slots |
| AI cluster | Live/AI Cluster |
| RTL | Live/RTL |
| Storybook (self) | — (this is the hub) |

## Portable consumers (unchanged)

Consumers still link `styles.css` / `_ds_bundle.js` / ESM / templates. **Do not** require Storybook in product apps. See `docs/consuming.md`.

## Local

```bash
npm run storybook          # Live hub at http://localhost:6006
npm run build:site         # packages Live hub at /playground/
```
