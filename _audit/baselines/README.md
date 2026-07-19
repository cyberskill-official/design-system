# `_audit/baselines/` — visual-regression reference captures

Reference PNGs of representative surfaces, captured at the current release. Diff a fresh capture against these after any token / base-CSS change to catch unintended visual shifts.

## Seed set (this release)
- `dashboard.png` — product screen (auto-fit KPI grid, tabs, Stat components)
- `bod-report.png` — Letter document (Stat row + DataTable, sheet chrome)
- `slide-deck.png` — 16:9 deck (title / content / quote / close layouts)

These three cover the main archetypes (product · document · deck). Expand as needed — the point is a stable, diffable reference, not exhaustive coverage.

## Regenerate
Open the target file, let it settle, and screenshot to `_audit/baselines/<name>.png` at the same width. To compare, capture the current state to a temp path and eyeball against the baseline (or diff in an image tool). Re-shoot the baseline **intentionally** when a change is meant to alter appearance, and note it in the changelog.

Not compiled or shipped — dev-only, like the rest of `_audit/`.
