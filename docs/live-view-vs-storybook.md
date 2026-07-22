# Live View vs Storybook

## Short answer

**No — do not absorb Live View completely into Storybook and delete Live View.** Storybook is a host React playground. Live View is the portable, zero-build axis shell for the whole design-system site.

## What each owns

| Surface | Build needed? | Owns |
|---|---|---|
| **Live View** (`guidelines/live-view.html`) | No | Shared Theme × Element × Language bar; tabs into Atomic View, Motion, Identity Lab, template playground, kitchen-sink, image slots, AI cluster, RTL, Storybook iframe |
| **Atomic View** | No | Full component specimen grid + prop playgrounds (gate: `story-coverage`) |
| **Storybook** (`/playground/`) | Yes (`npm run build:site`) | Thin CSF stories over React sources; toolbar axes; a11y addon; operator prop-tweaking |

## Why full absorption fails

1. **Portable doctrine** — consumers and Claude Design open HTML with no Node. Live View and Atomic View work after clone. Storybook does not.
2. **Non-component surfaces** — Identity Lab, Motion specimens, template playground, kitchen-sink, AI cluster, RTL are not CSF components.
3. **Coverage gap** — Storybook today has a small story set; Atomic View is the complete component inventory enforced by gates.
4. **Host packaging** — Storybook ships only on the Vercel host under `/playground/`. Live View ships in the static tree always.

## Current direction (owner Jul 2026)

- Keep Live View as the dashboard **Live View** tab and primary in-tree hub.
- Grow Storybook stories for high-traffic React components (operators on the host).
- Link Storybook from Live View as a tab (already present); never claim Storybook replaces the portable tree.
- Revisit only if the project abandons HTML-first portable delivery.

## Related

- `docs/storybook.md` — host playground contract
- `docs/consuming.md` — what consumers link
- `docs/decisions-pending.md` §4
