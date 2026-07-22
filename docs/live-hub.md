# Live hub = Storybook

## Decision

**Storybook is the single live interactive hub** for operators on `design.cyberskill.world`. There is no separate Live View page. Dashboard **Live** opens `/playground/`.

## Surfaces

| Surface | Role |
|---|---|
| **Storybook Live** (`/playground/`) | Host interactive hub: Theme × Element × Language toolbar, full component CSF (Default + control matrices), and Live/* stories (iframes into portable HTML) |
| **Atomic View** (`guidelines/atomic-view.html`) | Portable zero-build component grid for gates and clone-and-open browsing — not the site Live hub |
| **Other guidelines / templates** | Portable specimens; opened from Storybook Live/* when exploring Motion, Identity Lab, kitchen-sink, etc. |

## Surface map (Live/* stories)

| Storybook entry | Portable HTML |
|---|---|
| Components/* CSF | React sources under `components/` |
| Live/Surfaces → Components (Atomic View) | `guidelines/atomic-view.html` |
| Live/Surfaces → Motion | `guidelines/motion.html` |
| Live/Surfaces → Identity Lab | `ui_kits/status-hub/identity-lab.html` |
| Live/Surfaces → Template Playground | `templates/playground.html` |
| Live/Surfaces → Kitchen Sink | `templates/kitchen-sink.html` |
| Live/Surfaces → Image Slots | `templates/image-slots-demo.html` |
| Live/Surfaces → AI Cluster | `templates/ai-cluster-demo.html` |
| Live/Surfaces → RTL | `guidelines/rtl-preview.html` |

## Portable consumers (unchanged)

Consumers still link `styles.css` / `_ds_bundle.js` / ESM / templates. **Do not** require Storybook in product apps. See `docs/consuming.md`.

## Local

```bash
npm run storybook          # Live hub at http://localhost:6006
npm run build:site         # packages Live hub at /playground/
```
