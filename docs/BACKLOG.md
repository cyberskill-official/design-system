# Backlog — deferred work (pre-launch)

Work that is approved in direction but not built yet. Version stays pinned at **1.0.0** until LAUNCH — when an item ships, delete it here and describe it in the PR (no changelog).

## Not yet implemented (needs owner decision or secrets)

- Full Playwright pixel-threshold CI on every PR — scaffold exists; choose fail threshold % and accept GH Actions screenshot time (see `docs/decisions-pending.md`)
- Whole-set audits on every PR — nightly already runs; enabling on push/PR is a CI time budget decision (see `docs/decisions-pending.md`)
- Figma / Tokens Studio automated push pipeline — needs API credentials (see `docs/decisions-pending.md`)
- Deeper native sample host apps (SwiftUI / Compose / Flutter UI shells beyond token constants) — multi-week product shells

## Shipped recently (removed from active list)

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
- Items blocked on secrets or cost policy stay listed with a pointer to `docs/decisions-pending.md`.
