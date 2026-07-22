# Backlog — deferred work (pre-launch)

Work that is approved in direction but not built yet. Version stays pinned at **1.0.0** until LAUNCH — when an item ships, delete it here and describe it in the PR (no changelog).

## Not yet implemented

- App Store / Play Store packaging of native samples (samples only until product need)
- Exhaustive combinatorial CSF cells for every prop combination (matrix bar is argTypes + multi-variant/state stories, not full product of all enums)

## Decided / closed (not active work)

- Whole-set audits on every PR — **B enabled**
- Pixel CI auto-fail — **A advisory only**
- Figma — **A non-Enterprise** for now; Tokens Studio / hand-sync; REST soft-skip
- **Live hub = Storybook only** (no separate Live View page) — `docs/live-hub.md`
- Dual token JSON (`tokens.json` + `tokens.dtcg.json`) — intentional

## Shipped recently (removed from active list)

- Storybook as single Live hub; Live/Surfaces map; `live-view.html` removed from tree
- Deep CSF control matrices (argTypes + Matrix/AllVariants/States) for all public primaries
- Storybook CSF for every public React component (99 primaries) + completeness gate
- Full multi-screen native samples under `examples/native/{swiftui,compose,flutter}`
- Figma colour variables push (Enterprise soft-skip)
- Form field-array helpers + FormWizard
- DataGrid virtualization + column-order persistence
- Atomic View template iframe virtualization
- RTL locale surfaces
- Motion foundation embed
- Sidebar IA grouping

## Process

- New items land here when approved but not built.
- When an item ships, delete it from here in the same change and note it in the PR body.
- Credential blockers point at `docs/decisions-pending.md`.
