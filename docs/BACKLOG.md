# Backlog — planned, not yet implemented

Everything the team has approved in direction but hasn't landed in source yet. Anything actually shipped moves out of here into `CHANGELOG.md` in the same change that ships it — this file only ever holds forward-looking work, so it never goes stale the way a frozen "roadmap" doc does.

- **Density default-flip / presets** — the density axis (compact/default/comfortable) works and is gated (`_audit/density-overflow.html`, 84/84), but there's no per-product *preset* (e.g. "dashboard defaults to compact, marketing defaults to comfortable") and no documented recommendation for which density a given product type should default to. Carried forward from the old v3/v4 roadmaps, still open.

## Process
- New backlog items land here the moment they're approved-but-not-built — not in a versioned "roadmap" doc, which freezes and rots.
- When an item ships, delete it from here and add the CHANGELOG entry in the same change (Expansion Rule, `CLAUDE.md`).
- Historical planning docs (old `audit-v3.md`, `v3-roadmap.md`) were removed once every item in them had shipped — their content lives on in `CHANGELOG.md`'s per-version entries, which are the permanent historical record. This file is deliberately never that: it's a to-do list, not a chronicle.
