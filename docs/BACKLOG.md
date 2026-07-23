# Backlog — deferred work (pre-launch)

Work that is approved in direction but not built yet. Version stays pinned at **1.0.0** until LAUNCH — when an item ships, delete it here and describe it in the PR (no changelog).

## Not yet implemented

_(none)_

## Decided / closed (not active work)

- Whole-set audits on every PR — **B enabled**
- Pixel CI auto-fail — **A advisory only**
- Figma — **A non-Enterprise** for now; Tokens Studio / hand-sync; REST soft-skip
- **Live hub = Storybook only** (no separate Live View page) — `docs/live-hub.md`
- Dual token JSON (`tokens.json` + `tokens.dtcg.json`) — intentional
- Vietnamese docs track (`docs/vi/` mirror + viewer EN|VI toggle + docs-lang-parity gate)

## Shipped recently (removed from active list)

- Storybook as single Live hub; Live/Surfaces map; `live-view.html` removed from tree
- Deep CSF control matrices (argTypes + Matrix/AllVariants/States) for all public primaries
- Storybook 10 + CSF bar (`AllSizes` when `argTypes.size`; States/Matrix for disabled/loading/error/busy) — full N-dim enum product not required
- Storybook CSF for every public React component (99 primaries) + completeness gate
- Full multi-screen native samples under `examples/native/{swiftui,compose,flutter}`
- Native sample store packaging scaffolds (Fastlane + metadata; CI soft-skip without `ASC_*` / `PLAY_SERVICE_ACCOUNT_JSON`; submit disabled) — samples remain samples until product need
- Figma colour variables push (Enterprise soft-skip)
- Figma Code Connect path (`figma.config.json` + 99 `.figma.tsx` + soft-skip CI) — real node IDs still operator-filled
- npm publish path (`private: false`, `prepublishOnly`, `npm-publish` workflow soft-skip without `NPM_TOKEN`; license UNLICENSED)
- Form field-array helpers + FormWizard
- DataGrid virtualization + column-order persistence
- Atomic View template iframe virtualization
- RTL locale surfaces
- Motion foundation embed
- Sidebar IA grouping
- Shared `cx()` helper (`components/_utils/cx.js`) replacing per-file copies
- Button `xs` size tokens (`--cs-component-button-xs-*`)
- Vendored axe-core + axe smoke promoted to a hard fast-board gate
- Dark-theme contrast promoted to hard on `theme-overflow` (`REVIEWED_OK` allowlist for canvas-deck near-misses; themeable CTAs use accent-strong + accent-on)
- Vietnamese operator docs at `docs/vi/` + EN|VI toggle on `docs/viewer.html` + docs-lang-parity gate
- Real Playwright pixel compare vs `_audit/baselines/` (`pixel-diff.mjs` + advisory `drifted[]`/`maxDiff`; decision A — no PR auto-fail on %)

## Process

- New items land here when approved but not built.
- When an item ships, delete it from here in the same change and note it in the PR body.
- Credential blockers point at `docs/decisions-pending.md`.
