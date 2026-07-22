# Backlog — deferred work (pre-launch)

Work that is approved in direction but not built yet. Version stays pinned at **1.0.0** until LAUNCH — when an item ships, delete it here and describe it in the PR (no changelog).

## Not yet implemented

- App Store / Play Store packaging of native samples (samples only until product need)
- Pixel-perfect CSF control matrices for every prop on every component (Default story per primary is the bar)

## Decided / closed (not active work)

- Whole-set audits on every PR — **B enabled**
- Pixel CI auto-fail — **A advisory only**
- Figma — **A non-Enterprise** for now; Tokens Studio / hand-sync; REST soft-skip
- Live View kept — **do not delete**; Storybook is host-only (`docs/live-view-vs-storybook.md`)
- Dual token JSON (`tokens.json` + `tokens.dtcg.json`) — intentional

## Shipped recently (removed from active list)

- **Storybook CSF for every public React component** (99 primaries) + `test:storybook-contract` completeness gate
- **Full multi-screen native samples** under `examples/native/{swiftui,compose,flutter}` (Sign in · Home · Settings) + `test:native-samples` + `sync-tokens.mjs`
- Figma colour variables push (Enterprise soft-skip)
- Storybook host playground (`/playground/`)
- Form field-array helpers + FormWizard
- DataGrid virtualization + column-order persistence
- Atomic View template iframe virtualization
- RTL locale surfaces
- Live View Motion + Foundations motion
- Sidebar IA grouping

## Process

- New items land here when approved but not built.
- When an item ships, delete it from here in the same change and note it in the PR body.
- Credential blockers point at `docs/decisions-pending.md`.
