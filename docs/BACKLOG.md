# Backlog — deferred work (pre-launch)

Work that is approved in direction but not built yet. Version stays pinned at **1.0.0** until LAUNCH — when an item ships, delete it here and describe it in the PR (no changelog).

## Not yet implemented

- Figma / Tokens Studio automated push pipeline — **blocked on credentials** (how to create a token: `docs/decisions-pending.md` §3)
- Deeper native sample host apps (SwiftUI / Compose / Flutter UI shells beyond token constants) — multi-week product shells

## Decided / closed (not active work)

- Whole-set audits on every PR — **B enabled** in `design-system-gates.yml` (push + PR + nightly + manual)
- Pixel CI auto-fail — **A advisory only**; no PR fail-on-% (scaffold + advisory rows remain)

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
- Credential blockers point at `docs/decisions-pending.md`.
