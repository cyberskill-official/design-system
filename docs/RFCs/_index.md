# Doctrine RFC Archive

*Public archive of all Doctrine RFCs filed against the CyberSkill Design System. Per `00-audit-and-roadmap.md` §10.2 and §12.2, every substantive change to the doctrine passes through this folder.*

> **What lives here:** Doctrine RFCs only — proposals to change `00-audit-and-roadmap.md`, `00-index.md`, or any `part-*.md`.
> **What does not live here:** product RFCs (those live in product repos), open questions (those live under `Open-Questions/{YYYY}/{NNN}.md` per §12.5), or audit reports (those live under `_audit/{YYYY-MM-DD}/`).

## Status legend

- **Draft** — author still iterating; not yet open for review.
- **In Review** — review window is open; comments + counter-proposals welcome.
- **Approved** — chair owner has accepted; implementation lands as a normal PR.
- **Rejected** — chair owner declined; rationale captured in the RFC body.
- **Deferred** — not now; revisit at a stated future date.
- **Implemented** — merged and shipped.

## Numbering

`{YYYY}-{NNN}` where `NNN` is a zero-padded sequential number per year, never reused. Once a number is allocated it sticks even if the RFC is rejected.

## Index — 2026

| # | Title | Class | Subtype | Status | Affected parts | Audit ref |
|---|---|---|---|---|---|---|
| [2026-001](./2026-001-public-roadmap-page.md) | Public roadmap page | Substantive | lifecycle | **Approved** 2026-04-26 | 8, 16, 18 | A4.6 → 5; roadmap §3.5 |
| [2026-002](./2026-002-cdn-distribution-architecture.md) | CDN distribution architecture | Substantive | tooling | **Approved** 2026-04-26 | 7, 13, 8 | A5.6 → 3 (→ 4 in Phase 2); §14.7 |
| [2026-003](./2026-003-framework-agnostic-architecture.md) | Framework-agnostic architecture (web-components core + wrappers) | Substantive | tooling | **Approved** 2026-04-26 (Implementing — Phase 2 Wave 1) | 7, 15, 3, 17 | A9.4 → 3, A2.5 → 4; §14.7 |
| [2026-004](./2026-004-generative-theming.md) | Generative theming (theme-from-logo) | Substantive | tooling | **Approved** 2026-04-26 (Implementing — Phase 2 Wave 1) | 13, 6, 15 | A10.5 → 3; §14.13 |
| [2026-005](./2026-005-ai-assisted-contribution-review.md) | AI-assisted contribution review | Substantive | tooling | **Approved** 2026-04-26 (Implementing — Phase 2 Wave 1) | 15, 7, 8, 14 | A10.4 → 3; §14.15 |
| [2026-006](./2026-006-spatial-interaction-sketch.md) | Spatial interaction sketch (depth tokens + visionOS / Quest / Wear) | Substantive | pattern | **Approved** 2026-04-26 (Phase 4 implementation deferred) | 4, 3, 20, 2 | A6.6 / B3.7 → 3; §14.20 |

## Phase 2 Wave 1 — implementation status

Approved 2026-04-26. Wave 1 ships the foundations on top of which Wave 2 (Vue/Svelte wrappers, full MCP read+write, AI semantic search) will land.

| Implementation milestone | RFC | Status |
|---|---|---|
| pnpm workspaces foundation | 2026-003 | ✅ shipped 2026-04-26 (Wave 1) |
| `@cyberskill/tokens` package | 2026-003 | ✅ shipped 2026-04-26 (Wave 1) |
| `@cyberskill/primitives` headless layer | 2026-003 | ✅ shipped 2026-04-26 (Wave 1) |
| `@cyberskill/web-components` (`<cs-button>` only) | 2026-003 | ✅ shipped 2026-04-26 (Wave 1) |
| `@cyberskill/web-components` (full top-12: cs-button, cs-input, cs-checkbox, cs-radio, cs-toggle, cs-card, cs-modal, cs-toast, cs-tabs, cs-table, cs-nav, cs-select) | 2026-003 | ✅ shipped 2026-04-26 (Wave 2) |
| `@cyberskill/react` wrapper | 2026-003 | ✅ shipped 2026-04-26 (Wave 1) |
| `@cyberskill/vue` Composition-API wrapper (skeleton + `<Button>`) | 2026-003 | ✅ shipped 2026-04-26 (Wave 2) |
| `@cyberskill/svelte` runes wrapper (skeleton + `<Button>`) | 2026-003 | ✅ shipped 2026-04-26 (Wave 2) |
| `@cyberskill/theme-generator` CLI | 2026-004 | ✅ shipped 2026-04-26 (Wave 1) |
| `@cyberskill/mcp-server` (read-only) | 2026-002 / A10.1 path | ✅ shipped 2026-04-26 (Wave 1) |
| `scripts/pre-review.mjs` lint | 2026-005 | ✅ shipped 2026-04-26 (Wave 1) |
| `scripts/check-coverage.mjs` | migration plan A4 | ✅ shipped 2026-04-26 (Wave 1) |
| `scripts/check-bundle-size.mjs` (per-package budgets) | A9.1 path | ✅ shipped 2026-04-26 (Wave 2) |
| `scripts/check-doc-freshness.mjs` (Diátaxis quadrant + xref walk) | A3.7 path | ✅ shipped 2026-04-26 (Wave 2) |
| `scripts/build-cdn.mjs` (single-bundle loader.js + SRI manifest) | 2026-002 | ✅ shipped 2026-04-26 (Wave 2) |
| Multi-platform token build (CSS/JS/TS/Swift/Android) | 2026-003 / A5.3 | ✅ shipped 2026-04-26 (Wave 1) |
| `Templates/research-ops/` (6 templates) | B1.3 path | ✅ shipped 2026-04-26 (Wave 2) |
| CI workflows (`.github/workflows/`) | 2026-005 / A5.5 | ✅ shipped 2026-04-26 (Wave 1+2) |
| CDN endpoint **live** at cdn.cyberskill.dev | 2026-002 | Phase 4 (DNS + Cloudflare R2 provisioning) |
| Independent A11y audit report published | A8.6 / B5.1 / B5.2 | external — Q4 2026 vendor delivery |
| Storybook story coverage 36% → 100% | A2.4 / A5.4 | Phase 4 grind |
| First downstream product migrated (wiki SPA) | migration plan | Phase 4 |
| **Phase 3 — industry-leadership signals (shipped 2026-04-26):** | | |
| `@cyberskill/mcp-server` write tools (draft_rfc, propose_token_change, etc.) | A10.1 → 5 | ✅ shipped 2026-04-26 |
| `@cyberskill/react-native` skeleton (Button + ThemeProvider) | A6.3 path → 4 | ✅ shipped 2026-04-26 |
| Code Connect bindings (Button + Input + Card) | A10.2 → 5 | ✅ shipped 2026-04-26 |
| `@cyberskill/codemods` (Material / Polaris / Carbon → CyberSkill) | §14.16 | ✅ shipped 2026-04-26 |
| OSS prep — LICENSE + CONTRIBUTING + SECURITY + COC | A4.6 → 5 | ✅ shipped 2026-04-26 |
| HR Tech vertical pack (Part 19 §19) | §14.19 | ✅ shipped 2026-04-26 (sketch-class) |
| DesignOps cost/value model + adoption leaderboard + 3 conference talk abstracts | §14.16 / §14.21 | ✅ shipped 2026-04-26 |
| Open-source the doctrine + tokens to GitHub | A4.6 → 5 sustained | Phase 4 (founder action — repo creation) |
| First conference talk submitted | A4.6 → 5 sustained | Phase 4 (Founder action — Config 2027 submission) |
| **Phase 4 Wave 1 — first product migration + spatial + readiness assessments (shipped 2026-04-27):** | | |
| Wiki SPA migration A1 baseline + A2 token migration | migration plan | ✅ shipped 2026-04-27 (24.4% → 84.8% token coverage) |
| Wiki SPA migration A5 story coverage push | A2.4 / A5.4 → 5 | ✅ shipped 2026-04-27 (36% → 100%, 16 new stories) |
| `@cyberskill/spatial` skeleton (depth tokens + 6 primitive contracts + platform detection) | RFC 2026-006 / §14.20 | ✅ shipped 2026-04-27 |
| WCAG 3.0 readiness assessment | A8.6 sustained at 5 path | ✅ shipped 2026-04-27 |
| 15-locale expansion plan (4 cohorts, 24-month runway) | §14.5 | ✅ shipped 2026-04-27 |
| Sunset post-mortem template + Templates/lifecycle/ | §14.17 | ✅ shipped 2026-04-27 |
| `scripts/check-coverage.mjs` upgraded (Tailwind utility-class awareness) | A7.1 → 5 path | ✅ shipped 2026-04-27 |
| 2027 cadence pre-filled in audit history | §10.8 audit refresh | ✅ shipped 2026-04-27 |
| **Phase 4 Wave 2 + Phase 5 Wave 1 (shipped 2026-04-27):** | | |
| Wiki SPA A3 component substitution (AppHeader + AppSidebar organisms extracted) | migration plan | ✅ shipped 2026-04-27 (component coverage 0% → 33%) |
| Spatial primitive React implementations (6 components with 2D fallback) | RFC 2026-006 / Phase 5 W1 | ✅ shipped 2026-04-27 |
| Vercel deploy config + DEPLOYMENT.md runbook | A6 / B8 path | ✅ shipped 2026-04-27 (deploy is one `vercel --prod` away) |
| Cohort-1 locale microcopy stubs (Tagalog / Bengali / Urdu / Punjabi) | §14.5 | ✅ shipped 2026-04-27 (4 stubs ready for native steward translation) |
| APCA contrast helper script (`scripts/check-apca.mjs`) | A8.6 / WCAG 3.0 readiness | ✅ shipped 2026-04-27 (8/8 canonical pairings pass) |
| Annual-audit runbook (`Templates/audit/annual-audit-runbook.md`) | §10.8 | ✅ shipped 2026-04-27 |
| Synthesis re-audit at 2026-04-27 (L5 Optimised crossing logged) | §10.8 | ✅ shipped 2026-04-27 |
| Wiki SPA A6 RUM + public deploy | migration plan | Phase 4 Wave 3 (founder DNS approval gate) |
| Locale cohort 1 native review + ship | §14.5 | 2026-Q4 (locale stewards needed) |
| Open-source publication on GitHub | A4.6 → 5 sustained | Phase 4 Wave 3 (founder repo creation) |
| First conference talk submitted | A4.6 → 5 sustained | Phase 4 Wave 3 (Founder action — Config 2027 submission) |
| **First annual full audit (Mode S, with human Co-Auditor calibration)** | §10.8 | **2027-01-26** (runbook ready) |
| Spatial primitives — visionOS RealityKit / Quest WebXR / Wear OS Compose native paths | RFC 2026-006 / Phase 5 W2 | First VR/AR engagement (Q2 2028 trigger) |

## How to file an RFC

1. Pick the next number (`2026-NNN`) and reserve it by adding a row above with status `Draft`.
2. Copy the template from `00-audit-and-roadmap.md` §12.3.
3. Save as `2026-NNN-{kebab-title}.md` in this folder.
4. Open the review window (14 days for Substantive; 30 days for Breaking).
5. Set status to `In Review` in the index above.
6. Notify the chair owner of each affected part (per `00-index.md` ownership matrix).
7. Capture decisions in the RFC body. Update the index status when the chair decides.

## Recently approved (last 90 days)

_(empty — first RFCs filed 2026-04-26; check back after their review windows close.)_
