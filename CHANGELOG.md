# Changelog — CyberSkill Global Design System

All notable changes to `DESIGN.md` and the supporting artefacts (`README.md`, `tokens/`, `meta/`) are documented here.

The format is [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the system follows [Semantic Versioning 2.0.0](https://semver.org/) per `README.md` §7.

| Class | Version bump | Trigger |
|---|---|---|
| **PATCH** (`v1.0.x`) | Editorial fixes — typos, broken links, formatting, prose quality | Continuous |
| **MINOR** (`v1.x.0`) | New components, tokens, patterns, surfaces, vertical packs, themes; backward-compatible | Quarterly target |
| **MAJOR** (`v2.0.0+`) | Breaks downstream API or touches an anchor immutable | At-most every 18 months |

---

## [Unreleased]

Next-cycle items proposed but not yet accepted. Tracking is local-only — re-run the audit framework to regenerate the improvement plan.

---

## [1.2.0] — 2026-06-13

Minor, backward-compatible: new surfaces (style packs), new tokens, and a default-theme change. No anchor touched.

### Added
- **Part 22 — Style Packs (Multi-Style Adaptability).** New doctrine for re-skinning the system across visual styles via a separated render layer. New package `@cyberskill/style-packs`: a registry of all **50 styles** (seeded from the UX Planet 50-styles vocabulary) stored separately as manifests, selected at runtime with `data-cs-style`, composing with `data-theme`. **All 50 ship a CSS render layer.** Two build-enforced laws — anchors immutable (a pack may never redefine Umber/Ochre) and packs scoped + accessibility-preserving.
- **Per-style verification engine (`verify.mjs`).** Audits every pack individually (balanced CSS, scoping, no anchor override, focus never removed, 44px button floor, real system targeting; plus on-brand + reduced-motion/transparency fallbacks). Current report: **50 audited, 50 pass, 0 failures, 0 warnings**. New scripts `stylepacks:build`, `stylepacks:verify`, and a combined `verify:all` gate.
- **Authoring guide for humans + agents** (`packages/style-packs/AUTHORING.md`) and doctrine §22.7 — schema, hard laws, accessibility floors, checklist, worked example for adding new styles (the catalog is open-ended).
- **Round-2 deepening of all 50 packs** (`packages/style-packs/ENHANCEMENTS.md`) — research-grounded (glassmorphism blur/saturate + opaque text film, neubrutalism hard-offset shadows, neumorphism dual-shadow, Frutiger-Aero gloss-as-light) and broader component coverage (fields, tables, badges, review-gate, pressed states). Combined `style-packs.css` ≈ 1,040 lines; re-audited 50/50 pass, 0 warnings; anchors + accessibility floors preserved.
- **`@cyberskill/brand-assets` + `<Logo>` component.** The **exact official master mark** ships as `logo-mark.svg` / `logo-primary.svg` (vector 1007×1007) and `logo-mark.png` (raster); the React `<Logo>` renders the master artwork via the generated `logo-data.js`. New doctrine §2.2a: the exact official mark must be used whenever a product is for/owned by CyberSkill (tenant logos remain separate, per Part 13).
- **Full spacing scale + breakpoint tokens.** `cs.space.{0,5,8,10,12,16,20,24}` added (previously only 1–4, 6); `cs.breakpoint.{xs,sm,md,lg,xl,2xl}` added. Comfortable component padding tokens: `cs.component.button.{sm,md,lg}.{paddingX,paddingY,minHeight}`, `cs.component.button.gap`, `cs.component.textfield.{paddingX,paddingY,minHeight}`. New aliases `cs.color.accent.ochre`, `cs.color.text.muted`, `cs.color.surface.raised`.

### Changed
- **Default theme is now `light`** (was `system`); dark/system remain opt-in via `[data-theme]`. Tokens `:root` now declares `color-scheme: light`; the React theme layer ships the warm-dark `[data-theme="dark"]` / `system` overrides (§2.6).
- **Button padding loosened** to fix cramped downstream usage: default `md` is now 44px tall with 20px/12px padding (was 40px, 16px/~10px), driven by tokens; coarse-pointer (mobile/tablet) enforces a 44px target. Doctrine §3a.1 §1.5 updated.
- **Responsive defaults improved:** dialog goes near-fullscreen and actions stack full-width under 640px; flex-wrap on action rows; `fullWidth` Button prop wired (`.cs-button--full`).

### Unchanged (anchors — explicit no-touch)
- Umber `#45210E`, Ochre `#F4BA17`, slogans, and APCA Lc ≥ 75 body / Lc ≥ 90 interactive — unchanged and non-relaxable, including across every style pack.

---

## [1.1.0] — 2026-05-14

### Added
- **Part 21 — Liquid Glass default.** Added Part 21 covering Liquid Glass / Glassmorphism as the default surface treatment for CyberSkill products. Five material types (Whisper / Light / Standard / Heavy / Solid escape hatch). Layered depth tokens (`--depth-bg` through `--depth-toast`). Lens edge treatment. Material-aware tinting. Parallax motion patterns. Accessibility floor preserves APCA Lc ≥ 75 (body) / Lc ≥ 90 (interactive). Reduced-transparency + reduced-motion + forced-colors + print fallbacks. Dark mode equivalents. Per-component-family glass binding table (§21.9). Migration waves (additive, non-breaking). Decision log RFC `DS-RFC-2026-05-14-001`.

### Unchanged (anchors — explicit no-touch)
- Umber `#45210E` — unchanged.
- Ochre `#F4BA17` — unchanged.
- Slogan "Hiện Thực Hoá Ý Chí" — unchanged.
- APCA Lc ≥ 75 body / Lc ≥ 90 interactive — unchanged and non-relaxable on glass surfaces.
- Voice axes (warm + direct + honest + respectful) — unchanged.
- Token names (`--umber-*`, `--ochre-*`, `--bg-*`, `--border-*`) — unchanged.

Part 21 governs HOW surfaces render, not WHAT colors they use.

### Versioning
- Bumps system version `1.0.7 → 1.1.0` (MINOR — new defaults, no breaking changes; existing solid-surface components continue to work unchanged).

### Scope notes
- `DESIGN.md` only — Part 21 is documentation. The `tokens.css` glass-token block and `glass.css` material classes are Wave-2 follow-up tasks (target 2026-05-21). The CyberOS-docs site retrofit is Wave-3 (target 2026-06-12).

---

## [1.0.7] — 2026-05-04

### Changed
- **Distribution model formalised: three canonical files only.** The shipped repo is `README.md` + `DESIGN.md` + `CHANGELOG.md` at the root. Everything else is local working state, gitignored, and regenerable.
- **`.gitignore` extended** to exclude `meta/` (audit framework outputs), `.cyberos-memory/` (BRAIN protocol agent memory), `_audit/` (framework scaffolding), `.tmp.*.part` (atomic-write temps), `Thumbs.db`. The local working state never travels with the repo.
- **`README.md` §1 + §2 + §4.2 + §5.4 + §7 + §9.2 + §10 + §12.1 rewritten** to make the canonical-three-files model explicit. Audit outputs are now described as local-only / regenerable — the canonical record of what changed lands in `CHANGELOG.md`.
- **`README.md` §1 layout table split** into "ships everywhere" (3 files) and "local-only working state" (gitignored). Distribution rule is explicit: downstream projects copy only the three top-level Markdown files.

### Removed
- **`meta/` folder removed from the working tree.** Audit reports, history register, improvement plan, and research artefacts are regenerable by running the framework's SCAN/FIX prompts against the current `DESIGN.md`.

### Why
Audit framework outputs are derivative — they're a snapshot of `DESIGN.md` at a point in time, scored against the framework's 125 criteria. Carrying them in the repo confused readers about what the doctrine *is* (the spec) versus what was *measured* against the spec. The canonical record of decisions lives in `CHANGELOG.md`; the doctrine itself lives in `DESIGN.md`; the audit cycle reproduces the rest deterministically.

### Audit
- No re-audit required: this is a packaging / distribution change, not a doctrine change.
- Combined score remains **80.3%**, Tier **L3**, all 7 enterprise-grade floors pass.
- Anchor immutables untouched.

---

## [1.0.6] — 2026-05-04

### 🎯 Tier L2 → L3 — system is now Tier L3 enterprise-grade

Combined score: **79.6% → 80.3%** (Δ +0.7 pp). All 7 enterprise-grade floors hold. 0 FIXED-criterion regressions. Reached Tier L3 via **doctrine-only fixes** — no infrastructure work required.

### Added — 7 cycle-2 audit findings closed
- **F-012** (A.6.6 Spatial → 4) — Part 4 §8.bis: visionOS 26 component model (InputTargetComponent / HoverEffectComponent / CollisionComponent); spatial widgets; generative-AI scenes; shared spatial experiences with PII handling.
- **F-013** (A.10.1 MCP server → 5) — Part 9 §11.bis: MCP Apps (SEP-1865) interactive UIs + MCP Server Cards (auto-discovery via `/.well-known/`) + Agent-to-Agent (A2A) coordination patterns; enterprise-readiness mapping (audit trails, SSO, gateway, configuration portability).
- **F-014** (A.8.6 WCAG → 5) — Part 5 §3.bis: WCAG 3.0 March 2026 Working Draft (174 requirements); Bronze/Silver/Gold conformance model; coverage expansion (VR/XR/mobile/cognitive); transition roadmap 2026 Q4 → 2028+.
- **F-015** (B.9.4 Transparency — deeper) — Part 6 §3.bis: EU AI Act Code of Practice 2nd draft multi-layered marking strategy (L1 signed metadata / L2 imperceptible watermark / L3 fingerprinting fallback); refusal authority; CI gate; PDPL parallel.
- **F-016** (A.10.6 Docs MCP → 4) — Part 18 §1.bis: docs site publishes MCP Server Card at well-known path; auto-regenerated per release.
- **F-017** (A.1.8 DTCG → 5) — Part 7 §3.bis: DTCG token-resolver pattern (theme/density/locale/vertical/a11y resolver kinds); Style Dictionary v5 custom transform; living-design-data movement.
- **F-018** (A.1.7 + A.6.X reinforced) — Part 20 §2.bis + §2.ter: container-style queries (CSS state-aware components for tone/density/brand propagation) + View Transitions API (default page-transition mechanism honouring prefers-reduced-motion).

### Audit
- Cycle-2 FIX-mode audit appended §5–§9 to `meta/audits/audit-report-2026-05-04-cycle2.md`.
- Combined score: **79.6% → 80.3%** (Δ +0.7 pp).
- Tier: **L2 → L3**.
- All 7 enterprise-grade floors pass; 0 FIXED-criterion regressions.

### Standards adopted
- W3C WCAG 3.0 March 2026 Working Draft (174 requirements; Bronze/Silver/Gold).
- EU AI Act Code of Practice on Transparency 2nd draft (3 March 2026); Article 50 effective 2 August 2026.
- MCP 2026 roadmap (MCP Apps SEP-1865, Server Cards H2 2026, A2A H2 2026).
- Apple visionOS 26 (June 2025 launch; April 2026 documentation refresh).
- Modern CSS 2026 (View Transitions API; container-style queries).
- DTCG 2025.10 living-design-data movement (token resolvers).

### Anchors
- Slogan, Umber, Ochre, voice axes, Vietnamese-first commitment — **all preserved untouched**.

---

## [1.0.5] — 2026-05-04

### Audited
- **Cycle-2 SCAN audit completed** — `meta/audits/audit-report-2026-05-04-cycle2.md`. Re-scored 125 criteria against current state.
- Combined score holds at **79.6%** (Tier L2). All 7 enterprise-grade floors still pass. **0 FIXED-criterion regressions** from the v1.0.2/3/4 changes.

### Researched
- **7 new findings (F-012–F-018)** from industry-standards research since 2026-04-25 baseline. All `@Agent[fix]` (doctrine-only, no infrastructure). Projected post-fix combined: **80.3% (Tier L2 → L3)**.

| Finding | Criterion | Topic |
|---|---|---|
| F-012 | A.6.6 | visionOS 26 spatial component model |
| F-013 | A.10.1 | MCP Apps (SEP-1865) + Server Cards + A2A |
| F-014 | A.8.6 | WCAG 3.0 March 2026 174-requirement readiness |
| F-015 | B.9.4 | EU AI Act multi-layered marking strategy |
| F-016 | A.10.6 | Docs site MCP Server Card |
| F-017 | A.1.8 | DTCG token resolvers (living-design-data) |
| F-018 | A.1.7 | View Transitions API + container-style queries |

### Sources captured
- W3C WCAG 3.0 March 2026 Working Draft (174 requirements, Bronze/Silver/Gold)
- EU AI Act Code of Practice on Transparency 2nd draft (3 March 2026); Article 50 obligations enter force 2 August 2026
- MCP 2026 roadmap; MCP Apps SEP-1865 formalized early 2026
- Apple visionOS 26 (June 2025)
- Modern CSS 2026 (container queries 92% support, View Transitions API)
- DTCG 2025.10 token-resolver pattern (zeroheight)

### Pending
- FIX cycle for F-012–F-018 to push combined to **80.3% (Tier L3)** — awaits human approval per `audit-report-2026-05-04-cycle2.md` §4.

---

## [1.0.4] — 2026-05-04

### Changed
- **Decimal multi-level section numbering applied.** Every numbered H2 inside a Part now carries its part prefix: `## 1.1 Origin Story`, `## 5.7 20+ locales baseline`, `## 10.1 Adoption KPIs`, `## 3a.1 Button`, etc. 443 sections renumbered.
- **9 unnumbered "## References" sections** (one per Tier-1 component sub-part 3a–3h plus Part 4) renumbered with their Part prefix (e.g., `## 3a.8 References`).

### Fixed
- **All 12 anchor collisions resolved.** Pre: 12 distinct slugs collided across 36 H2 instances. Post: 0 real anchor collisions (the 5 nominally remaining matches are inside fenced code blocks for AGENTS.md / Diátaxis examples and don't produce real anchors when rendered).
- **All 27 in-body cross-reference anchors resolve** to a unique H2.

### Researched
- **2026 platform upload limits:** documented in `meta/audits/research-2026-05-04-size-reduction.md`. Headline finding: every major platform (Claude 30 MB / ChatGPT 512 MB / Gemini 100 MB / Notion paid 5 GB / Notion free 5 MB) accepts `DESIGN.md` natively at 1,171 KB. The "512 KB" constraint does not appear to be a current platform limit on any mainstream service.
- **Compression options measured on the actual file:** gzip-9 → 403 KB (66% reduction), zstd-22 → 322 KB (72%), DOCX → 697 KB (40%). Markdown minifiers cap at 30% reduction (~820 KB best case). No lossless approach lands a single markdown file under 512 KB without splitting.

### Audit
- No re-audit required: renumbering is a structural transform; no scoring criterion depends on the numbering scheme. Combined score remains **79.6%**, Tier L2, all 7 enterprise-grade floors pass.

---

## [1.0.3] — 2026-05-04

### Changed
- **`doctrine/` folder deleted.** All 28 redirect stubs and the original `00-audit-and-roadmap.md` removed from disk. `DESIGN.md` is now the single physical source of truth.
- **`scripts/` folder deleted.** `build-design-md.py` retired (no longer needed).
- **References scrubbed.** Every `doctrine/<part>.md` mention in `DESIGN.md` and `README.md` rewritten to point at `DESIGN.md` anchors. Every `build-design-md` mention removed.
- **`README.md` §8 rewritten.** From "Building DESIGN.md from doctrine" to "Editing DESIGN.md" — the file is now edited directly.
- **`README.md` §1 table rewritten.** Reflects the single-file model: `DESIGN.md`, `README.md`, `CHANGELOG.md` as top-level artefacts.

### Added
- **`CHANGELOG.md`** at repo root (this file). Version history extracted out of `DESIGN.md` into a dedicated artefact.

### Removed
- **`## Versioning` block** in `DESIGN.md` (was at the end of the master index). Version content moved here.
- **§14 Change log subsection** in Part 10 of `DESIGN.md` (was 4 sub-sections describing changelog structure). Replaced by a one-paragraph cross-reference to `CHANGELOG.md`.
- **§14 Appendix file inventory** in `README.md`. Obsolete since `DESIGN.md` is single-file.

---

## [1.0.2] — 2026-05-04

### Changed
- **`doctrine/` folder collapsed.** All 28 part files replaced with redirect stubs pointing at `DESIGN.md` anchors. Folder size: 1.2 MB → 116 KB. (Files later deleted in v1.0.3.)
- **`scripts/build-design-md.py` retired** with a deprecation note. Build step no longer needed. (Folder deleted in v1.0.3.)
- **Lossless compression** applied to `DESIGN.md`: trailing whitespace stripped, 3+ blank lines collapsed to 1, redundant horizontal rules removed, intra-table cell padding compacted. 0.3% byte reduction (3,187 bytes / 13 lines). Word-hash verified identical pre/post — every word preserved.

### Added — 7 audit findings closed
- **F-004** (A.5.6 CDN distribution → 3) — Part 7 §2.bis: two-channel CDN model (npm canonical + jsDelivr opt-in); SRI hashes; rationale for no in-house CDN.
- **F-005** (A.4.6 Public roadmap → 3) — Part 16 §8.bis: Now/Next/Later/Won't (yet) lanes; quarterly cadence; immutables explicitly excluded.
- **F-007** (A.7.6 Business-KPI correlation → 3) — Part 10 §1.2: 6 hypotheses (time-to-feature / conversion / defect rate / localisation cost / carbon-cost-per-session / recruitment); quarterly correlation report.
- **F-008** (A.10.5 Generative theming → 3) — Part 13 §5.5: one-prompt themes with mandatory APCA / WCAG / VN-diacritic / density / a11y-mode constraints; review gate; v1.x roadmap target.
- **F-009** (B.8.4 TTFB threshold → 3) — Part 7 §10.1: explicit TTFB ≤ 200 ms p75 + industry-leading targets for LCP/INP/CLS + mobile-parity rule.
- **F-010** (B.10.1 HEART → G/S/M → 4) — Part 10 §1.1: HEART axis ↔ KPI mapping table; quarterly gap-review by Research Lead.
- **F-011** (B.10.5 CSAT/CES instruments → 4) — Part 10 §6: CSAT 1-item Likert + CES 1-item Likert added to quarterly instrument set; "triangulate ≥ 3" rule.

### Audit
- FIX-mode re-audit appended §5–§9 to `meta/audits/audit-report-2026-05-04.md`.
- Combined score: 78.3% → **79.6%** (Δ +1.3 pp).
- Tier: L2 (0.4 pp shy of L3).
- **All 7 enterprise-grade floors now pass.** A.7 Adoption & Metrics lifted from 33.3% to 40% (the floor) thanks to F-007.
- 0 FIXED-criterion regressions; no-downgrade gate passed.

### Deferred
- **F-001** A.2.6 Visual regression testing — needs shipping component package.
- **F-002** A.5.2 npm packages distributed — needs publish.
- **F-003** A.5.4 Storybook hosted — needs hosting.
- **F-006** A.7.1–4 Adoption telemetry — needs production surfaces. **Single critical-path item to reach Tier L3.**

---

## [1.0.1] — 2026-05-04

### Added
- **`DESIGN.md`** at repo root. 1.17 MB single-file portable distribution built from the 29 doctrine source files.
- **`README.md`** at repo root. Comprehensive operating manual covering distribution, fine-tuning, RFC process, versioning, audit framework, operating cadence, roles, and AI-agent rules.
- **`scripts/build-design-md.py`** — Python builder for `DESIGN.md`.
- **`meta/audits/`** scaffolding — `audit-report-2026-05-04.md` (SCAN baseline), `_history.md`, `improvement-plan.md`.

### Changed
- **`doctrine/00-audit-and-roadmap.md`** promoted to repo-root `README.md` and replaced with a redirect note.

### Audit
- SCAN baseline run on `DESIGN.md`: combined **78.3%**, Tier **L2**.
- 6 of 7 enterprise-grade floors pass; A.7 Adoption & Metrics 33.3% < 40% (no live telemetry yet).
- 11 findings catalogued: 7 doctrine-addressable (closed in v1.0.2), 4 infrastructure-dependent (deferred).
- Build-preservation check: ✓ pass.

---

## [1.0.0] — 2026-04-25

### Added
- **Initial publication** of the comprehensive doctrine.
- **All 20 parts** at uniform publication grade (Part 3 split into 3a–3h).
- **Evidence log** populated for all dated claims.
- **Anchor immutables** locked: slogan ("Turn Your Will Into Real" / "Hiện Thực Hoá Ý Chí"), Umber `#45210E`, Ochre `#F4BA17`, voice axes (warm · direct · honest · respectful), Vietnamese-first commitment.

### Locked
- **No substantive change without an RFC** under the protocol in `README.md` §6. Editorial fixes (typo, link, classification footer) ship as patch releases.

---

## [Pre-1.0.0]

### [2026.01] — 2026-01-15 (planned cycle that became v1.0.0)
- Track PDPL effective-date entry into operational compliance.
- Verify Decree 356/2025/ND-CP cross-references.
- Update the Vietnam jurisdictional cell of the privacy matrix per first-quarter regulatory experience.

---

*Hiện Thực Hoá Ý Chí.*
