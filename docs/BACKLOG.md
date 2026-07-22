# Backlog — deferred work (pre-launch)

Work that is approved in direction but not built yet. Version stays pinned at **1.0.0** until LAUNCH — when an item ships, delete it here and describe it in the PR (no changelog).

## Not yet implemented

- Full multi-screen native host apps (SwiftUI / Compose / Flutter product shells) — multi-week; stub notes in `examples/native/`
- Broad Storybook CSF coverage for every React component (host-only; Atomic View remains the complete portable inventory)

## Decided / closed (not active work)

- Whole-set audits on every PR — **B enabled**
- Pixel CI auto-fail — **A advisory only**
- Figma — **A non-Enterprise** for now; Tokens Studio / hand-sync; REST soft-skip
- Live View kept — **do not delete**; Storybook is host-only (`docs/live-view-vs-storybook.md`)
- Dual token JSON (`tokens.json` + `tokens.dtcg.json`) — intentional

## Shipped recently (removed from active list)

- Figma colour variables push (`_audit/ci/push-figma-variables.mjs` + `figma-variables-push` CI job) — secrets wired; **Variables REST API is Figma Enterprise-only**; non-Enterprise soft-skips
- Storybook host playground (`/playground/`, Theme × Element × Language toolbar) — portable contract unchanged
- Form field-array helpers (`FormFieldArray`) + multi-step wizard controller (`FormWizard`)
- DataGrid row virtualization + column-order persistence (`virtual`, `persistKey`)
- Atomic View template iframe virtualization (mount per open category)
- Additional RTL locale surfaces (Arabic / Hebrew / LTR control on `guidelines/rtl-preview.html`)
- Live View Motion surface + Foundations motion embed
- Sidebar IA: group+sort components by `grp`; HR ops + HR Suite merged under one HR template group

## Process

- New items land here when approved but not built.
- When an item ships, delete it from here in the same change and note it in the PR body.
- Credential blockers point at `docs/decisions-pending.md`.
