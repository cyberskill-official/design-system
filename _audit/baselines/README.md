# `_audit/baselines/` — visual-regression reference captures

Reference captures (909×540, `dashboard`/`dashboard-dark`/`slide-deck` at 1280) of representative surfaces, captured at the release noted in the changelog. Diff a fresh capture against these after any token / base-CSS change to catch unintended visual shifts — `_audit/visual-diff.html` renders live-vs-baseline side-by-side or as a difference overlay, and the gate runner carries an **advisory** freshness row (every declared baseline exists + its live source resolves).

## Set (v4.3.0) — per-tier
**Templates (archetypes)**
- `dashboard.png` — product screen (auto-fit KPI grid, tabs, Stat components) · native 1280
- `dashboard-dark.png` — same, forced dark — the APCA-derived dark elemental packs (v4.0.0) regression anchor · native 1280
- `bod-report.png` — Letter document (Stat row + DataTable, sheet chrome) · native 1000
- `slide-deck.png` — 16:9 deck (title / content / quote / close layouts) · native 1280
- `vn-labor-contract.png` — VN legal instrument (bilingual sheet) · native 909
- `email.png` — send-path email · native 909
- `marketing-page.png` — marketing/landing archetype · native 909
- `auth.png` — auth/sign-in flow archetype · native 909
- `tech-incident-report.png` — incident-report document archetype (timeline + root-cause layout, distinct from `bod-report`) · native 909

**Composite (Atoms→Organisms in one sheet)**
- `kitchen-sink.png` — `templates/kitchen-sink.html`, the full `.cs-*` class catalog · native 909

**Pages (UI kits)**
- `status-hub.png` — portfolio dashboard kit home · native 909
- `website.png` — bilingual marketing site home · native 909

They anchor the archetypes, not every template. Declare each in `BASE` inside `visual-diff.html` (slug → `{w, src?}`). `guidelines/atomic-view.html` was tried as a full-catalog sentinel but its nested-iframe composition breaks the capture tool — `kitchen-sink` remains the composite anchor instead.

## Regenerate
Open the target file, let it settle, and screenshot to `_audit/baselines/<name>.png` at the same width. Re-shoot a baseline **intentionally** when a change is meant to alter appearance, and note it in the changelog.

Not compiled or shipped — dev-only, like the rest of `_audit/`.
