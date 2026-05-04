# Improvement plan (post-audit 2026-05-04)

Derived from `audit-report-2026-05-04.md` §3 Findings.

## Status

| Class | Count | Status |
|---|---|---|
| Doctrine-addressable | **7** | ✓ **closed** in `DESIGN.md` v1.0.2 (2026-05-04) |
| Infrastructure-dependent | **4** | ⏸ **deferred** — tracked here, target audits below |
| **Total** | **11** | 7 closed / 4 deferred |

---

## Closed in v1.0.2 (2026-05-04)

| ID | Criterion | Pre | Target | Where in DESIGN.md | Notes |
|---|---|---|---|---|---|
| F-004 | A.5.6 CDN distribution | 1 | 3 | Part 7 §2.bis "CDN distribution model" | Two-channel model (npm canonical + jsDelivr opt-in); SRI hashes; no in-house CDN |
| F-005 | A.4.6 Public roadmap | 2 | 3 | Part 16 §8.bis "Public roadmap" | Now/Next/Later/Won't (yet) lanes; quarterly cadence; immutables explicitly excluded |
| F-007 | A.7.6 Business-KPI correlation | 1 | 3 | Part 10 §1.2 "Business-KPI correlation" | 6 hypotheses (time-to-feature, conversion, defect rate, localisation cost, carbon-cost-per-session, recruitment); quarterly correlation report |
| F-008 | A.10.5 Generative theming | 2 | 3 | Part 13 §5.5 "Generative theming" | One-prompt themes with mandatory APCA / WCAG / VN-diacritic / density / a11y-mode constraints; review gate; v1.x roadmap target |
| F-009 | B.8.4 TTFB threshold | 2 | 3 | Part 7 §10.1 (extended) | Explicit TTFB ≤ 200 ms p75 + industry-leading targets for LCP/INP/CLS + mobile parity rule |
| F-010 | B.10.1 HEART → G/S/M | 3 | 4 | Part 10 §1.1 "HEART → Goals/Signals/Metrics mapping" | Full HEART axis ↔ KPI table; quarterly HEART-axis-without-KPI gap review by Research Lead |
| F-011 | B.10.5 CSAT/CES instruments | 3 | 4 | Part 10 §6 (extended) | CSAT 1-item Likert + CES 1-item Likert added to the quarterly instrument set; "triangulate ≥ 3" rule |

After re-audit (FIX-mode, §5–§9 of the audit report), expect Part A Adoption-related categories and Part B Measurement to lift; A.5.6, A.4.6, A.10.5, B.8.4 each move 1 score-point; A.7.6 moves 2; B.10.1 and B.10.5 each move 1.

---

## Deferred — infrastructure-dependent

These cannot be closed by doctrine work alone — they require shipped infrastructure. Target audit: **Q1 2027** (or earlier if the relevant deliverable lands sooner). Each row carries explicit acceptance criteria so the next audit knows what to look for.

| ID | Criterion | Why deferred | Acceptance criteria for next audit | Owner |
|---|---|---|---|---|
| F-001 | A.2.6 Visual regression testing | No component package has shipped yet; nothing to VRT | Chromatic / Percy on PRs against ≥ 1 component package; baseline-approval workflow documented; cross-browser + cross-theme + cross-density coverage live | Engineering Lead |
| F-002 | A.5.2 npm packages distributed | No `@cyberskill/*` packages published yet | At least `@cyberskill/tokens` + `@cyberskill/react` (or platform equivalent) live on npm with semver releases; cross-platform packages roadmapped | Engineering Lead |
| F-003 | A.5.4 Storybook hosted | No Storybook running yet | Storybook 9 hosted at a stable URL; a11y / viewport / theme / RTL toggles live; play-functions for interaction tests on ≥ 1 component | Engineering Lead |
| F-006 | A.7.1–4 Adoption telemetry | No production surfaces consume the system yet, so no telemetry to collect | Token-adherence + component-adoption + a11y-score + CWV KPIs live on the public dashboard with real numbers from ≥ 1 production surface | Engineering Lead + DesignOps Lead |

**The unblocker.** F-006 is the single critical path. Once production telemetry exists (even from one surface), A.7 lifts from 33.3% to ≥ 65%, all 7 enterprise-grade floors pass, and the system transitions from Tier L2 (78.3%) to Tier L3 (≥ 80%).

---

## Carry-over questions (audit §12)

| ID | Question | Target | Owner |
|---|---|---|---|
| Q-001 | Cadence of public-roadmap refresh in practice (the doctrine says quarterly; should we refresh more often once active development scales)? | 2027-Q1 | Design System Lead |
| Q-002 | CDN model choice — confirmed jsDelivr/unpkg in v1.0.2 (F-004); reconsider only if a vendor outage forces it | 2027-Q1 | Engineering Lead |
| Q-003 | When will adoption telemetry come online so A.7 can be measured? | 2027-Q1 | Engineering Lead + DesignOps Lead |
| Q-004 | Generative-theming tool delivery target — v1.x decided in F-008; sub-track for Figma plugin integration in v1.5 | 2027-Q1 | Design Lead |
