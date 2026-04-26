# CyberSkill Design System — Audit Framework & Operating Guide

*The companion to the master index. Read this once before contributing to or auditing the doctrine. Re-read whenever proposing a change or running an audit. Equally addressed to humans and to AI agents — both are first-class contributors and first-class auditors.*

> **The current docs in this folder are the single source of truth.** This document does not lock a version; it describes how the doctrine is audited, how it changes, and how AI agents work with it. Where it speaks of "current state", "the doctrine", or "the system", it means whatever the docs in `Design System/docs/` say *today* — not a frozen snapshot.

---

## Table of Contents

0. About this document
1. Purpose & dual audience
2. The doctrine baseline (what's here right now)
3. Audit framework — overview
4. **Step-by-step audit playbook** (humans + AI agents)
5. Scoring methodology (0–5, FIXED/DYNAMIC, weights, maturity tiers)
6. **Part A — Design System Audit** (10 categories, mapped to doctrine parts)
7. **Part B — UX Audit** (10 categories, mapped to doctrine parts)
8. Scoring worksheet template
9. Recommendations & next-steps templates
10. **AI-Agent Audit Runbook** — executable specification
11. **DESIGN.md generator** — keeping the AI-agent rules file fresh
12. Future-improvement protocol — change pipeline
13. AI-agent operating instructions (change-pipeline contributors)
14. Per-part expansion menu
15. Cross-cutting commitments preserved across releases
16. Operating cadence — the quarterly rhythm
17. Glossary
18. Emerging trends to watch
19. Acknowledgements & references

---

## 0. About this document

This file does five jobs:

1. **Records the current baseline** — what is in the doctrine, why it is there, what it benchmarks against.
2. **Defines the audit framework** — a 0–5 scoring rubric across two parts (Design System, UX) and ten categories per part. Used both as a self-audit instrument and as a client-engagement diagnostic.
3. **Defines a step-by-step audit playbook** so anyone — human or AI agent — can pick up this doc and run the audit without reverse-engineering it.
4. **Defines the change protocol** — how humans and AI agents propose, debate, approve, and merge improvements.
5. **Defines the AI-agent operating model** — what AI agents are authorised to do (contribute, audit, translate, draft), how their work is reviewed and attributed, and how the auto-generated `DESIGN.md` rules file is kept current as the docs evolve.

If you are a **human auditor** running a self-audit or client engagement, jump to §4 (playbook), §6–§7 (criterion tables), §8 (worksheet), §9 (recommendations).

If you are a **human contributor** proposing a change, jump to §12 (change protocol) and §14 (per-part expansion menu).

If you are an **AI agent** invoked to audit the doctrine, read §10 (audit runbook) before doing anything else. If invoked to extend the doctrine, read §13 (operating instructions). If invoked to refresh the AI-agent rules file, see §11 (DESIGN.md generator).

---

## 1. Purpose & dual audience

### 1.1 An audit instrument and operating guide in one

A design system is no longer a UI kit; it is **versioned, governed, multi-platform infrastructure** that determines product velocity, consistency, accessibility, and — increasingly — how effectively AI agents can generate code from design intent. Three watershed moments shape what "good" means in this period:

- **Design Tokens Community Group (DTCG) Specification reached its first stable version (2025.10)** on 28 October 2025 — backed by Adobe, Amazon, Google, Microsoft, Salesforce, Shopify, Figma, and others. Vendor-neutral JSON for tokens.
- **Model Context Protocol (MCP)**, open-sourced by Anthropic in November 2024 and adopted across IDEs, design tools, and major design systems through 2025, has become the de facto bridge between design context and AI coding agents.
- **WCAG 2.2** became ISO/IEC 40500:2025 and is the operative standard for the European Accessibility Act, legally applicable in EU member states from 28 June 2025. WCAG 3.0 is in working draft.

This document gives CyberSkill a single, defensible instrument for auditing both **the production artefact** (Part A — the Design System) and **the practice that produces it** (Part B — UX). It is benchmarked against the gold-standard systems of IBM Carbon, Google Material 3 / Material 3 Expressive, Apple HIG (incl. visionOS and Liquid Glass), Microsoft Fluent 2, Atlassian Design System, Shopify Polaris, Salesforce Lightning, Adobe Spectrum, Vercel/Geist, GitHub Primer, Linear, Stripe, and Airbnb DLS — and against the discovery-led practices of consultancies including IDEO, frog (Capgemini Invent), Work & Co, ustwo, R/GA, and Fjord/Accenture Song.

### 1.2 Use cases

| Use case | How to apply |
|---|---|
| **Internal annual self-audit** | Run both Parts A and B in full once per year against this doctrine; share with the founding team; define an OKR-aligned roadmap. |
| **Quarterly health check** | Score only the DYNAMIC criteria + a rotating quarter of FIXED criteria. |
| **Client engagement diagnostic** | Run Part A or Part B (or both) against a client's existing system as the first 2–4 weeks of a consulting engagement; deliver scored worksheet + prioritised recommendations. |
| **Pre-sales artefact** | Share this document with prospective enterprise clients to demonstrate methodological rigor. |
| **Hiring & onboarding rubric** | Use category descriptions to define what "good" looks like for each discipline area when interviewing or onboarding. |
| **AI-agent self-audit** | A Claude / GPT / Gemini agent can read this document and produce a scored worksheet and gap analysis autonomously — see §10. |

### 1.3 Why audit before redesign

A design audit is the **first** step before redesigning a system. *"In order to put in place an effective system, you need to know where you are right now and where you're heading."* A design audit typically takes several days to four weeks of in-depth evaluation; this timeframe is sufficient to identify roughly 80% of design inconsistencies.

---

## 2. The doctrine baseline (what's here right now)

The doctrine consists of:

- **20 substantive parts** under `Design System/docs/`, each at uniform enterprise depth.
- **The master index** (`00-index.md`) — navigation, ownership matrix, regulatory anchors.
- **This document** (`00-audit-and-roadmap.md`) — audit framework, operating guide, change protocol.
- **The Templates folder** (`/0.HQ/Templates/`) — example branded artefacts.
- **The Tokens folder** (`Design System/tokens/`) — DTCG-conformant token sources (currently `colour.tokens.json`, `motion.tokens.json`, `space.tokens.json`, `type.tokens.json`).
- **The implementation skeleton** (`Design System/src/`) — atomic-design folders (`atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`, `themes/`, `lib/`, `views/`) holding the React 19 component code, plus `.storybook/` configuration.
- **The auto-generated `DESIGN.md`** at the repo root — distilled rules-for-agents file (re-built by `scripts/build-design-md.mjs`; see §11).
- **The audit history register** at `Design System/docs/_audit/_history.md` — running log of every audit since the framework was published; appended to whenever an audit is signed.

### 2.1 The 20 parts (purpose-grouped reading map)

| Cluster | Parts | What they cover |
|---|---|---|
| **A — Identity & visual language** | 1, 2, 20 | Brand, voice, OKLCH colour, type, layout primitives |
| **B — Components & patterns** | 3 (a–h), 12, 11 | Tier-1 primitives, Tier-2 advanced, page templates and patterns |
| **C — Surfaces, customisation, content** | 4, 13, 14 | Web/mobile/etc. surfaces; theming/white-label/embed; microcopy |
| **D — Inclusion, ethics, verticals** | 5, 6, 19 | A11y/L10n; AI ethics + sustainability; industry packs |
| **E — Engineering, tooling, AI workflow** | 7, 15, 9 | Build pipeline; designer/dev toolchain; prompt library |
| **F — Lifecycle, docs, adoption** | 17, 18, 16 | Component lifecycle; docs site; adoption playbook |
| **G — Governance, legal, measurement** | 8, 10 | RFC + privacy + commerce; KPIs and research |

Cluster letters are a navigation aid; numbering is the stable identifier.

### 2.2 What "uniform enterprise grade" means

Every part:

- Has a stated purpose, scope, and reading audience.
- Specifies its inheritance from other parts and what depends on it.
- Includes accessibility, internationalisation, and lifecycle considerations within its scope.
- Cross-references explicit anchors (DTCG 2025.10, WCAG 2.2, EU AI Act articles, etc.) where relevant.
- Carries a references section that supports every external claim.
- Operates under a named owner with a defined review cadence (master index ownership matrix).

No part is a "TODO". No part defers to "we'll figure it out later". Where a part identifies an open question, it is documented with a named owner and a deadline (per §12.5 below).

### 2.3 Spec vs implementation — read this before running an audit

The doctrine is a **specification**. The codebase under `Design System/src/` is an **implementation in progress**. They evolve at different rates and an audit must distinguish the two.

| Layer | Source of truth | What an audit checks |
|---|---|---|
| **Doctrine** | `Design System/docs/` | Whether the spec describes enterprise-grade practice (Mode S — see §3) |
| **Tokens** | `Design System/tokens/` | Whether the DTCG-conformant token files exist and match the spec |
| **Implementation** | `Design System/src/` + `.storybook/` + `package.json` | Whether the code ships what the doctrine specifies (Mode P — see §3) |

When the spec describes ~80 Tier-1 primitives across [Part 3a](part-3a-actions.md)–3h but `src/atoms/` + `src/molecules/` + `src/organisms/` ship a smaller subset, that is **not** a doctrine flaw — it is a tracked implementation gap. The audit notes the gap; the §12 change pipeline closes it via component-class RFCs ([Part 8](part-8-governance-legal-commerce.md) §16).

### 2.4 Benchmark coverage

Across 33 capability rows benchmarked against IBM Carbon, Atlassian Design System, Material 3, Adobe Spectrum, Shopify Polaris, GitHub Primer, Microsoft Fluent, SAP Fiori, ServiceNow Now, and Workday Canvas, the doctrine matches or exceeds every benchmark capability. Rows where it leads (Vietnamese-first localisation, MCP-native AI integration, DTCG 2025.10 conformance from day one) reflect deliberate strategic emphasis rather than coincidence.

### 2.5 Release locks

The doctrine ships in semver-tagged releases under the protocol in §12. Each release is a "release lock" — a stable target consumers can rely on. The lock is a quality device, not a freeze on improvement: editorial fixes ship as patches (`x.y.Z`), substantive improvements as minors (`x.Y.0`), breaking changes as majors (`X.0.0`). The change pipeline (§12) is the one route to substantive change.

---

## 3. Audit framework — overview

### 3.1 Two parts, ten categories each, two modes

| Part | What it audits | Source of truth |
|---|---|---|
| **Part A — Design System** | The artefact: tokens, components, docs, governance, tooling, distribution, theming, adoption metrics, accessibility, performance, AI/MCP readiness | The doctrine itself, `Design System/tokens/`, `Design System/src/`, `.storybook/`, `package.json`, and live system telemetry |
| **Part B — UX Audit** | The practice that produces and consumes the system: research, IA, interaction, visual design, accessibility, content, heuristic compliance, performance-as-UX, trust/privacy/ethics, measurement | Live products, research repository, transcripts, telemetry, surveys |

**Two modes** (do not confuse them):

| Mode | What is audited | Who runs it |
|---|---|---|
| **Doctrine self-audit** (mostly Part A) | Whether the documented system *describes and supports* enterprise-grade practice | DS team, AI agents per §10 |
| **Live-product audit** (mostly Part B + parts of A) | Whether a real product *applies* the system correctly and delivers good UX | A consultancy team (CyberSkill or otherwise) on a 2–4 week engagement |

The doctrine self-audit answers *"Does our written system specify what good looks like?"*. The live-product audit answers *"Does this product live up to it?"*.

### 3.2 Cadence

- **Annual** full audit (both parts).
- **Quarterly** light audit on DYNAMIC criteria + ¼ of FIXED criteria.
- **Ad-hoc** on a category trigger (new framework adoption, post-incident, post-acquisition, new vertical pack, regulatory shift).

This cadence is consistent with Airtable, Miro, and Notion's reported practices of running SUS and adoption surveys quarterly to track UX-quality drift.

---

## 4. Step-by-step audit playbook

This is the canonical procedure. Anyone — human or AI — should be able to follow it from a fresh checkout to a signed audit. Follow the steps in order. Side-skip notes in *italics* call out where humans and AI agents diverge.

### Step 1 — Frame the audit (½ day)

1. Decide **mode**: doctrine self-audit (Mode S) or live-product audit (Mode P)?
2. Decide **scope**: full audit (both parts) or focused (one part, or DYNAMIC criteria only for a quarterly check)?
3. Identify **stakeholders**: Lead Auditor (accountable), Co-Auditor (independent second-rater — can be a human or an AI agent paired with a human), 1–2 stakeholder interviewees (for Mode P).
4. Define **success criteria**: which §5.4 maturity tier is the target? Which §5.5 thresholds matter for the engagement?
5. Write a one-page **audit charter** capturing the above. Save to `_audit/{YYYY-MM-DD}/charter.md`.

*AI-agent skip:* the agent reads the operator's invocation (mode + scope + output dir) instead of writing a charter. The operator confirms the charter row in the §10.9 failure-mode checklist.

### Step 2 — Inventory & evidence (1–2 weeks for full; 1–3 days for quarterly)

6. Create the audit folder: `mkdir -p Design\ System/docs/_audit/{YYYY-MM-DD}/recommendations`.
7. **Inventory**:
   - List every file under `Design System/docs/` (Mode S — the doctrine).
   - List every file under `Design System/tokens/` (always — the contract).
   - List every component folder under `Design System/src/atoms|molecules|organisms|templates|pages` (Mode S optional, Mode P required).
   - Read `Design System/package.json` (toolchain claims).
   - Read `Design System/.storybook/main.ts` and `manager.ts` (Storybook configuration).
   - For Mode P only: list product repos in scope; pull telemetry exports; collect transcripts.
8. **Evidence pack**: save a README at `_audit/{YYYY-MM-DD}/evidence.md` listing every input file with its absolute path. Each criterion's score will cite from this pack.
9. **Set rater pair**: Rater 1 reads independently; Rater 2 reads independently. (If Rater 1 is an AI agent, Rater 2 must be a human Co-Auditor — see §10.7.)

*AI-agent skip:* steps 6–8 are produced as the agent's first three tool calls. The agent never invents an evidence path it has not opened.

### Step 3 — Score each criterion (3–5 days for full; 1 day for quarterly)

10. Open the worksheet template (§8) — copy it to `_audit/{YYYY-MM-DD}/audit-worksheet.csv`.
11. For each criterion in §6 (Part A) and §7 (Part B):
    - Read the **mapped doctrine parts** listed under the category. Use grep heavily; do not read every part end-to-end.
    - Decide a **score** 0–5 against the level definitions in §5.1 and the criterion's own 0/3/5 anchors.
    - Cite **evidence**: at minimum one citation (file + section/line range). Three or more aligned citations are required to award score 4 or 5.
    - Record **confidence** (Lo / Med / Hi).
    - Write a 1–3 sentence **note** justifying the score.
    - Mark Lo-confidence rows for **human review** (Step 6).
12. Apply the §10.6 hard rules: never invent evidence, never average to hit a threshold, never round up, doc evidence supports up to score 3, score 4 requires corroborating artefact (token JSON, package.json, Storybook config, real component file), score 5 only where the doctrine claims industry leadership AND that claim is substantiated by both doc and artefact.
13. **Calibration**: Rater 1 and Rater 2 compare scores. Differences ≥ 2 points trigger a calibration discussion logged at `_audit/{YYYY-MM-DD}/calibration-notes.md`. Resolve by citing additional evidence.

### Step 4 — Synthesise (3–5 days for full; 1 day for quarterly)

14. Compute **category percentages**: `Σ(scores in category) / (5 × number of criteria) × category weight`.
15. Compute **part totals** and **combined %**: roll up per §5.4 maturity tiers.
16. Check **enterprise-grade thresholds** (§5.5) — a single failed threshold disqualifies the audit's enterprise-grade claim regardless of the headline %.
17. Produce the **highest-leverage gaps** list: rank criteria by `category_weight × (5 − score)`.
18. Identify **trend deltas** vs the previous audit (read `_audit/_history.md` and the prior-date worksheet) — note any FIXED-criterion regression, which is itself an alarm per §12.4.

### Step 5 — Recommend & roadmap (2–3 days)

19. For each criterion that scored ≤ 2 below its category mean (or scored ≤ 2 absolute), generate a **Recommendation Card** per §9.2 schema. Save to `_audit/{YYYY-MM-DD}/recommendations/{criterion-id}.md`.
20. Write a **`recommendations/_index.md`** ranking the cards by leverage.
21. Draft the **90-day / 180-day / 12-month roadmap** in the audit report (§10.5.1). Each item maps to a §14 expansion entry; novel items are flagged so they can be added to §14 in the next refresh.

### Step 6 — Report, calibrate, sign (½–1 day)

22. Write the **audit report** to `_audit/{YYYY-MM-DD}/audit-report.md` per the §10.5.1 structure.
23. Emit the **JSON sibling** to `_audit/{YYYY-MM-DD}/audit-worksheet.json` per §10.5.3.
24. **Spot-check sample**: a human Co-Auditor independently scores 5+ randomly sampled criteria (especially any Lo-confidence rows). Differences ≥ 2 trigger §10.7 calibration.
25. **Sign**: the human Lead Auditor countersigns the report's signature block. Until signed, the audit is **Draft**.
26. **Append history**: add a one-line row to `_audit/_history.md` (date, mode, agent, operator, signer, summary scores) per §10.7.

### Step 7 — Refresh the AI-agent rules file (≤ 30 min)

27. Run the **DESIGN.md generator** (`scripts/build-design-md.mjs`) — see §11. This pulls the latest doctrine + tokens + manifest into a single rules file at the repo root, which Cursor / Claude Code / Copilot read as their canonical context.
28. Commit the regenerated `DESIGN.md` alongside the audit folder.

### Step 8 — Close the loop (continuous)

29. The **highest-leverage gaps** that scored ≤ 2 enter the §12 change pipeline as Doctrine RFCs.
30. The **DYNAMIC criteria** are revalidated next quarter (per §3.2 cadence).
31. The **annual full audit** is scheduled in `Design System/docs/_audit/_history.md` with a target date.

---

## 5. Scoring methodology

### 5.1 The 0–5 scale (applies to every criterion)

| Score | Level Name | Definition |
|---|---|---|
| **0** | Nonexistent | The capability is absent. No evidence found. |
| **1** | Ad-hoc | Done inconsistently by individuals; no shared definition; tribal knowledge only. |
| **2** | Emerging | Pockets of practice; partial documentation; not yet a team standard. |
| **3** | Defined | Standard exists, is documented, and is followed for new work; legacy gaps remain. |
| **4** | Managed | Standard is enforced via tooling/automation; metrics are tracked; gaps are remediated on a roadmap. |
| **5** | Optimised / Best-in-class | Continuously improved; benchmarked against industry leaders; CyberSkill (or the audited org) is a contributor to the open-source/standards community in this area. |

### 5.2 Category weighting

Within each Part, categories are weighted to reflect industry impact. A category's category-score = (sum of its criterion scores ÷ max possible) × weight.

### 5.3 FIXED vs DYNAMIC tagging — rationale

| Tag | Meaning | Why it matters for audit longevity |
|---|---|---|
| **FIXED** | Criterion reflects a durable principle that should remain valid for ≥ 5 years. | Score weight is reliable year-on-year; trend lines are meaningful. Examples: WCAG 2.x principles; semver; primitive→semantic→component token layering; Nielsen heuristics; atomic design hierarchy. |
| **DYNAMIC** | Criterion reflects a current best practice that will likely be revised within 1–3 years. | Re-validate the rubric language at each annual review. Examples: MCP server integration; specific framework support (React 19, Vue 3.5); Core Web Vitals thresholds (INP replaced FID in March 2024); cognitive accessibility guidance (WCAG 3.0 in working draft); spatial-computing patterns; agentic-UX patterns. |

### 5.4 Maturity tier mapping

Total scores roll up into five organisational maturity tiers, aligned with the CMMI tradition and consistent with the Sparkbox, USWDS, and Iress maturity models.

| Tier | % of max total score | Description | Equivalent industry stage |
|---|---|---|---|
| **Level 1 — Initial / Ad-hoc** | 0–20% | No system; styles diverge; designers reinvent components per project | Pre-system / "wild west" |
| **Level 2 — Repeatable** | 21–40% | Shared style guide / Figma kit exists; some coded components; little governance | Sparkbox Stage 1 / Iress Stage 1 |
| **Level 3 — Defined** | 41–60% | Tokens, components, docs, semver; one platform fully covered; consumer adoption underway | Sparkbox Stage 2 / Iress Stage 2 |
| **Level 4 — Managed** | 61–80% | Multi-platform; metrics tracked; contribution model active; a11y baked in; coverage > 70% | Sparkbox Stage 3 / Iress Stage 3 — comparable to Polaris circa 2022 |
| **Level 5 — Optimised / Best-in-class** | 81–100% | Federated, AI-augmented (MCP), open-sourced or thought-leadership-grade; benchmarked against Carbon/Material/Polaris/Spectrum | Sparkbox Stage 4 / Iress Stage 4 — comparable to mature enterprise systems |

### 5.5 Minimum passing thresholds for "enterprise-grade"

To claim "enterprise-grade" status (i.e., suitable for a Fortune 500 client), a system must meet **all** of the following:

| Requirement | Minimum |
|---|---|
| Total score | ≥ 65% (Tier 4) |
| Accessibility category (Part A #8 and Part B #5) | ≥ 75% each — accessibility is non-negotiable under EAA / ADA / Section 508 |
| Foundations & Tokens (Part A #1) | ≥ 70% |
| Governance & Versioning (Part A #4) | ≥ 60% |
| Documentation (Part A #3) | ≥ 65% |
| No category may score below | 40% |

---

## 6. Part A — Design System Audit

> **Part A scoring summary:** 10 categories, weights total 100%, ~63 criteria, max raw score 315.

Every category lists its criteria and identifies the **doctrine parts where evidence should be sought**. AI agents running the self-audit per §10 use this mapping as their primary read list.

### A.1 — Foundations & Design Tokens (Weight: 14%)

**Maps to doctrine parts:** [Part 1](part-1-foundations.md) (Foundations), [Part 2](part-2-design-language.md) (Design Language), [Part 20](part-20-layout-responsive.md) (Layout & Responsive), `Design System/tokens/`.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A1.1 | **Color tokens** with primitive→semantic→component layers | FIXED | Hex codes hard-coded throughout | Semantic layer ("text-primary", "background-surface") references primitives | Three-tier architecture; aliases support multi-brand and modes; values are math/HSL-derived. **Benchmark:** IBM Carbon's `interactive-01`; Material 3's role-based color tokens |
| A1.2 | **Typography scale** and type tokens | FIXED | Ad-hoc font sizes | Modular scale, line-height & weight tokenised | Variable-font axes tokenised; fluid + fixed scales (Carbon v11 model); font-feature settings for OpenType. **Benchmark:** Carbon's "fixed" vs "fluid" type sets; Geist Sans + Geist Mono |
| A1.3 | **Spacing scale** (4 / 8 px geometric) | FIXED | Pixel-pushing | 4-or-8-base scale; named tokens (`space-100` etc.) | Two-tier scale (component vs layout) with documented purpose, like Carbon's two spacing scales |
| A1.4 | **Elevation / shadow tokens** | FIXED | Inline shadows | Named elevation tokens (e.g., 0–24) | Light- and dark-mode-aware elevation; surface-blur for "Liquid Glass"-style materials |
| A1.5 | **Motion tokens** (duration, easing, springs) | FIXED | None | Productive vs expressive curves tokenised | Spring-physics-based motion supported; reduced-motion alternatives. **Benchmark:** Material 3 Expressive's spring-based motion; Carbon's `@carbon/motion` |
| A1.6 | **Iconography system** | FIXED | Mixed sources | One library, consistent grid, multiple sizes | Variable / multi-color icon system w/ SVG sprite + per-platform export. **Benchmark:** IBM `@carbon/icons` ships React, Angular, Vue, Svelte |
| A1.7 | **Grid & layout system** | FIXED | Ad-hoc | Documented columns/gutters/breakpoints | Container queries supported; breakpoint tokens consumable from CSS, iOS, Android |
| A1.8 | **Token format & DTCG conformance** | DYNAMIC | Bespoke JSON or only CSS vars | Tokens exported in a documented JSON | DTCG 2025.10–compliant `.tokens.json` files using `$value`/`$type`/`$description`; multi-file & theming support |
| A1.9 | **Modern color spaces** (OKLCH, P3) | DYNAMIC | sRGB hex only | sRGB + hand-tuned dark mode | OKLCH/P3 tokens; perceptually uniform palettes; algorithmic contrast checks |

### A.2 — Component Library (Weight: 13%)

**Maps to doctrine parts:** [Part 3a](part-3a-actions.md)–3h (Tier-1 primitives), [Part 12](part-12-advanced-components.md) (Tier-2 advanced), [Part 17](part-17-component-lifecycle.md) (lifecycle). For Mode P, also `Design System/src/{atoms,molecules,organisms,templates}/`.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A2.1 | **Coverage of "Top 20" components** (button, input, select, modal, table, nav, tabs, toast, tooltip, etc.) | FIXED | < 5 components | 15+ components shipped in code | All 50+ enterprise patterns; data viz; AI/chat surfaces. **Benchmark:** Carbon ships 50+ components; Polaris 2025 unified across Admin/Checkout/Customer Accounts |
| A2.2 | **API consistency** across components | FIXED | Each component invents its props | Shared prop names (`size`, `variant`, `tone`, `disabled`) | Documented prop taxonomy enforced by lint. **Benchmark:** Polaris web-component unified API |
| A2.3 | **Composition / slotting** | FIXED | Monolithic black-box components | Compound components with slots | Headless primitives + styled wrappers; Radix-style composition |
| A2.4 | **Variant & state coverage** | FIXED | Default + hover only | Default, hover, focus, active, disabled, error, loading | Plus selected, indeterminate, busy, read-only, success, async; each visualised in Storybook |
| A2.5 | **Headless-primitive option** | DYNAMIC | None | Some accessibility primitives wrapped from Radix/React Aria | First-class headless layer + styled layer (Adobe-style: React Aria + React Spectrum architecture) |
| A2.6 | **Visual regression testing** | DYNAMIC | None | Chromatic / Percy on PRs | Cross-browser, cross-theme, cross-density VRT; baseline approval workflow |

### A.3 — Documentation (Weight: 10%)

**Maps to doctrine parts:** [Part 18](part-18-docs-site.md) (docs site), [Part 14](part-14-content-design.md) (content design), every part's component pages, `00-index.md`.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A3.1 | **Usage guidelines per component** | FIXED | Code only | Usage + anatomy + examples | Anatomy diagrams, decision tree for variant choice, content guidance, real product screenshots |
| A3.2 | **Code examples** (live, copy-paste) | FIXED | Static screenshots | Live code blocks | Interactive sandbox + framework-specific examples (React, Vue, Web Components) |
| A3.3 | **Do's / Don'ts** | FIXED | None | Present for top components | For every component, with a11y-specific Do/Don't and content-specific Do/Don't. **Benchmark:** Polaris's 5-section structure |
| A3.4 | **Accessibility notes** per component | FIXED | None | ARIA roles + keyboard table | Plus screen-reader test results, success-criterion mapping, cognitive notes |
| A3.5 | **Contribution guide** | FIXED | None | A `CONTRIBUTING.md` exists | Step-by-step process: RFC template, design crit cadence, PR template, review SLA. **Benchmark:** Atlassian's contribution model |
| A3.6 | **Search & navigation** | FIXED | Static sidebar | Full-text search | AI-search / RAG over docs; fast (< 200ms) |
| A3.7 | **Doc freshness signals** | DYNAMIC | None | "Updated on" date | Auto-generated from code; CI fails if a component changes without a doc update; staleness dashboard |

### A.4 — Governance & Versioning (Weight: 10%)

**Maps to doctrine parts:** [Part 8](part-8-governance-legal-commerce.md) (Governance, Legal, Commerce), [Part 17](part-17-component-lifecycle.md) (Component Lifecycle), this document §12.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A4.1 | **Decision-making model** | FIXED | Ad-hoc | DRI per area | Documented decision framework (e.g., DACI: Driver, Approver, Contributor, Informed) |
| A4.2 | **RFC process** | FIXED | None | Informal proposals | Templated RFCs with publish/discuss/resolve dates; public archive |
| A4.3 | **Semver discipline** | FIXED | Untagged releases | semver MAJOR.MINOR.PATCH used | Semver enforced in CI; breaking-change RFCs required for MAJOR; changesets per package |
| A4.4 | **Deprecation policy** | FIXED | None | "Don't use this" notes | Lifecycle stages (alpha → beta → stable → deprecated → removed); minimum N-version overlap; codemods provided |
| A4.5 | **Contribution model** (closed / federated / open) | FIXED | Closed black box | Internal contribution accepted | Federated model with clear gatekeeping for major contributions, lightweight for minor ones |
| A4.6 | **Roadmap transparency** | DYNAMIC | None | Internal roadmap | Public roadmap with quarter-over-quarter progress |

### A.5 — Tooling & Distribution (Weight: 10%)

**Maps to doctrine parts:** [Part 7](part-7-engineering-operations.md) (Engineering & Operations), [Part 15](part-15-tooling.md) (Tooling), [Part 9](part-9-ai-prompt-library.md) (AI Prompt Library — for MCP/agentic tools). For Mode P, also `package.json`, `.storybook/`, `vite.config.ts`.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A5.1 | **Figma library** with components, variables, modes | FIXED | None | Figma library with components + auto-layout | Variables w/ light/dark/density modes; library analytics monitored; Code Connect mappings to repo |
| A5.2 | **Code package(s)** distributed via npm | FIXED | Copied source per project | Single npm package | Multiple platform-specific packages (e.g., `@cyberskill/react`, `@cyberskill/web-components`, `@cyberskill/tokens`) |
| A5.3 | **Token pipeline** | DYNAMIC | Hand-edited CSS | Style Dictionary build | Style Dictionary v4+ with first-class DTCG support; multi-platform outputs (CSS, Swift, XML, JS/TS) |
| A5.4 | **Storybook (or equivalent)** | FIXED | None | Storybook hosted | Storybook with a11y, viewport, theme, RTL toggles; play-functions for interaction tests |
| A5.5 | **CI/CD for the system itself** | FIXED | Manual | Automated tests + publish | Conventional commits, automated changelogs, automated visual & a11y regression, canary releases |
| A5.6 | **CDN or unified runtime distribution** | DYNAMIC | None | Versioned npm only | CDN delivery with auto-updates (Polaris-style "load from Shopify CDN" model) |

### A.6 — Cross-platform & Theming (Weight: 8%)

**Maps to doctrine parts:** [Part 4](part-4-surfaces.md) (Surfaces), [Part 13](part-13-theming-whitelabel-embed.md) (Theming, White-Label, Embedding), [Part 20](part-20-layout-responsive.md) (Layout & Responsive).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A6.1 | **Light / dark mode parity** | FIXED | Light only | Both modes shipped | Plus high-contrast mode; auto-follows OS via `prefers-color-scheme` |
| A6.2 | **Brand theming / multi-tenant** | FIXED | None | Override via CSS vars | Token-based brand layer; documented theme contract; visual demo of N brands |
| A6.3 | **Web / iOS / Android / RN parity** | FIXED | Web only | Web + one native | Tokens exported to all targets; component parity matrix tracked. **Benchmark:** Material 3 Expressive on Wear OS 2025 |
| A6.4 | **Density variants** (compact / default / spacious) | FIXED | None | One density | Token-driven density modes (Carbon-style) |
| A6.5 | **RTL & i18n** | FIXED | LTR only, English only | RTL support, ICU strings | Pseudolocalisation in CI; RTL screenshots in Storybook; tested in Arabic + Hebrew |
| A6.6 | **Spatial / immersive surface support** | DYNAMIC | None | N/A | Guidance for visionOS-like glass materials, depth tokens, and 3D safe-zones |

### A.7 — Adoption & Metrics (Weight: 9%)

**Maps to doctrine parts:** [Part 16](part-16-adoption-designops.md) (Adoption Playbook & DesignOps), [Part 10](part-10-measurement-research-appendix.md) (Measurement, Research, Appendix), [Part 17](part-17-component-lifecycle.md) (Component Lifecycle).

Adoption is "the existential challenge" in 2026; zeroheight's Design Systems Report 2026 found buy-in satisfaction dropped from 42% to 32% YoY. Figma's data science team measured a **34% efficiency boost** for designers with access to a design system.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A7.1 | **Coverage %** (production UI built from system components) | FIXED | Unknown | Measured manually | Tracked via tooling (e.g., Omlet, Supernova) per repo; trend reported quarterly |
| A7.2 | **Detachment rate** in Figma | FIXED | Unknown | Sampled | Continuously monitored; thresholds trigger investigation |
| A7.3 | **Consumer NPS / satisfaction** | FIXED | Never measured | Annual survey | Quarterly NPS, segmented by team |
| A7.4 | **Contribution rate** (PRs / issues / RFCs from outside DS team) | FIXED | None | Some contributions | Monthly contribution KPI; ≥ 30% of changes from consumers |
| A7.5 | **Time-to-ship deltas** | FIXED | Not measured | Anecdotal | A/B measured: feature time before/after DS adoption |
| A7.6 | **Business KPI correlation** | DYNAMIC | None | Light correlation | Adoption % correlated with Core Web Vitals scores and conversion lift |

### A.8 — Accessibility Baked Into the System (Weight: 12%)

**Maps to doctrine parts:** [Part 5](part-5-accessibility-localization.md) (Accessibility, Inclusion, Localization), [Part 13](part-13-theming-whitelabel-embed.md) §HC mode, [Part 14](part-14-content-design.md) (Content Design).

EU's European Accessibility Act became legally applicable on 28 June 2025; the EU's next EN 301 549 update is expected to reference WCAG 2.2.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A8.1 | **Contrast guarantees** (WCAG 2.2 AA: 4.5:1 text / 3:1 UI) | FIXED | Untested | Documented; tested at the foundation level | Guaranteed by token math; CI fails on regression. **Benchmark:** Carbon: "if difference between two values is ≥ 50, colors are accessible" |
| A8.2 | **Keyboard navigation** | FIXED | Inconsistent | Standard tab order, escape closes modals | Full keyboard parity, focus management documented per component, focus-not-obscured (WCAG 2.2 SC 2.4.11) verified |
| A8.3 | **Screen-reader testing** | FIXED | Never | Internal screen-reader tests | Recurring NVDA/VoiceOver/JAWS testing; results published per component |
| A8.4 | **Reduced-motion support** | FIXED | None | `prefers-reduced-motion` honoured | All motion tokens have an explicit reduced-motion alternative |
| A8.5 | **A11y tokens** (focus rings, error semantics, target sizes) | FIXED | None | Some named tokens | Touch-target tokens (WCAG 2.2 SC 2.5.8 minimum 24×24 CSS px) baked into all interactive components |
| A8.6 | **WCAG 2.2 / EAA conformance** | DYNAMIC | Unstated | Self-claimed AA | Independently audited AA + select AAA criteria; conformance report published; tracked toward WCAG 3.0 readiness |
| A8.7 | **Cognitive accessibility** | DYNAMIC | Not addressed | Plain-language docs, content guidelines | Findable help (SC 3.2.6), accessible authentication (SC 3.3.8), redundant entry (SC 3.3.7) — all WCAG 2.2 — surfaced as patterns |

### A.9 — Performance & Developer Experience (Weight: 8%)

**Maps to doctrine parts:** [Part 7](part-7-engineering-operations.md) (Engineering & Operations), [Part 15](part-15-tooling.md) (Tooling), [Part 6](part-6-ai-ethics-sustainability.md) §Sustainability (SWDM v4).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A9.1 | **Bundle size budgets** | FIXED | Unmonitored | Per-component KB budget | Hard CI failure on regression; size-limit reports posted to PRs |
| A9.2 | **Tree-shaking / sub-path imports** | FIXED | Monolithic | ESM + side-effect-free | Per-component package exports; zero overhead for unused components |
| A9.3 | **TypeScript support** | FIXED | None | First-party `.d.ts` | Strict types, generics, exhaustive prop unions, JSDoc rendered in IDEs |
| A9.4 | **Framework-agnosticism** | DYNAMIC | React only | React + one other | Web Components core + React/Vue/Svelte wrappers (Polaris 2025 model) or React Aria–style hooks/primitives split (Adobe) |
| A9.5 | **SSR / streaming compatibility** | DYNAMIC | Broken on SSR | Works under Next.js / Nuxt | Tested under React Server Components, Astro Islands, Remix; hydration-safe |
| A9.6 | **Zero-config dev experience** | DYNAMIC | Manual setup | npm install + import | Single CLI install; auto-config for popular frameworks; AI-assisted scaffolding |

### A.10 — AI / Emerging Tech Integration (Weight: 6%) — entirely DYNAMIC

**Maps to doctrine parts:** [Part 6](part-6-ai-ethics-sustainability.md) (AI-Native, Ethics, Sustainability), [Part 9](part-9-ai-prompt-library.md) (AI Prompt Library), [Part 15](part-15-tooling.md) (Tooling — MCP/Code Connect). Also: the auto-generated `DESIGN.md` at the repo root (see §11).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| A10.1 | **MCP server for the design system** | DYNAMIC | None | Read-only token/component MCP server | Full read+write MCP server (Figma-style "write to canvas") with documented prompts and skills |
| A10.2 | **Code Connect / design-to-code mapping** | DYNAMIC | None | Manual mapping | Code Connect or equivalent: Figma component ↔ code component bound; works in MCP context |
| A10.3 | **AI-rules / system rules file for agents** | DYNAMIC | None | A `DESIGN.md` exists | Auto-generated rules file (per §11) that scans the docs + tokens + manifest on every release; CI fails if stale |
| A10.4 | **AI-assisted contribution review** | DYNAMIC | None | AI-suggested code review | AI checks for token usage, a11y, naming conventions before human review |
| A10.5 | **Generative theming / palette tools** | DYNAMIC | None | Manual brand theming | One-prompt brand themes that respect contrast, density, motion, and a11y constraints |
| A10.6 | **Documentation conformance to MCP** | DYNAMIC | None | Docs site exposes API docs | Docs site exposes structured MCP-compatible endpoints |

---

## 7. Part B — UX Audit

> **Part B scoring summary:** 10 categories, weights total 100%, ~62 criteria, max raw score 310.

For a doctrine self-audit, Part B asks *"Does the doctrine adequately specify and support good UX practice?"* For a live-product audit, Part B asks *"Does the product live up to that practice?"*. Both readings use the same criteria.

### B.1 — User Research & Discovery (Weight: 12%)

**Maps to doctrine parts:** [Part 10](part-10-measurement-research-appendix.md) (Measurement, Research, Appendix), [Part 14](part-14-content-design.md) (Content Design — for content research).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B1.1 | **Method diversity** | FIXED | One method | Mix of qualitative + quantitative | Generative (interviews, ethnography, diary), evaluative (usability, A/B), and behavioural (analytics) blended on every project |
| B1.2 | **Research cadence** | FIXED | Project-only | Per release | Continuous "rolling" / rapid research with weekly or bi-weekly cadence |
| B1.3 | **ResearchOps practice** | DYNAMIC | None | Shared participant list | Centralised recruitment, repository, governance, ethics review (per ResearchOps 8-pillar framework) |
| B1.4 | **Participant ethics & consent** | FIXED | None | Consent forms, recordings deleted | GDPR/PDPL-compliant participant DB, withdrawal flow, privileged-data handling |
| B1.5 | **Evidence-based decision logging** | FIXED | None | Research reports filed | Decisions cite specific research artefacts; "what we already know?" is asked before a study is run |
| B1.6 | **Insight repository** | DYNAMIC | None | Shared drive | Searchable, tagged, AI-queryable repo (Dovetail / Condens / Notion) accessible to PM, Eng, Marketing |
| B1.7 | **AI-assisted synthesis** | DYNAMIC | None | Manual coding | LLM-assisted transcript coding with human-in-the-loop validation; bias controls documented |

### B.2 — Information Architecture & Navigation (Weight: 9%)

**Maps to doctrine parts:** [Part 4](part-4-surfaces.md) (Surfaces), [Part 11](part-11-enterprise-patterns.md) (Enterprise Patterns), [Part 18](part-18-docs-site.md) (Docs Site IA).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B2.1 | **Match between system and real-world / user mental model** (Nielsen heuristic 2) | FIXED | Mismatch | Familiar terminology | Validated by tree-test / card-sort with the actual audience |
| B2.2 | **Navigation consistency** across product surfaces (Nielsen 4) | FIXED | Each section reinvents nav | Shared nav component | Cross-surface nav unification (Polaris 2025 unified Admin / Checkout / Customer Accounts is the benchmark) |
| B2.3 | **Findability** | FIXED | No search | Search box | Faceted search, recent/saved, AI search; analytics close the loop on zero-results |
| B2.4 | **Wayfinding** (breadcrumbs, page titles, focus visible) | FIXED | Missing | Present | Plus visited-state, progress indicators, "you are here" pattern in deep flows |
| B2.5 | **Card sorting / tree testing** done at IA design time | FIXED | None | Once at launch | Re-validated at every major IA change |

### B.3 — Interaction Design (Weight: 11%)

**Maps to doctrine parts:** [Part 3a](part-3a-actions.md)–3h (Tier-1 components — feedback states), [Part 11](part-11-enterprise-patterns.md) (patterns), [Part 6](part-6-ai-ethics-sustainability.md) (agentic UX).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B3.1 | **Visibility of system status** (Nielsen 1) — feedback within 100ms / 1s / 10s | FIXED | None | Loading states present | Skeleton screens, optimistic UI, real-time progress, async-safe UI patterns |
| B3.2 | **Affordances & signifiers** | FIXED | Ambiguous | Standard buttons, links, fields | Strong visual affordances per platform; verified via 5-second testing |
| B3.3 | **Error prevention & recovery** (Nielsen 5 + 9) | FIXED | Errors crash flow | Validation + clear messages | Inline validation, undo (Gmail-style), structured "what happened, what to do next" error copy |
| B3.4 | **Empty states** | FIXED | Blank | Generic "no data" | Educational, action-oriented empty states with primary action and link to docs |
| B3.5 | **Loading & skeleton states** | FIXED | Spinner only | Skeletons | Variable-length skeletons matching real content; perceived performance optimised |
| B3.6 | **User control & freedom** (Nielsen 3) — undo, redo, cancel, escape | FIXED | None | Cancel buttons | Undo on destructive actions; pending-state cancellation; persistent drafts |
| B3.7 | **Spatial / 3D interaction** (visionOS-class) | DYNAMIC | N/A | Touch + keyboard only | Spatial guidance for eye tracking, hand gestures, depth, spatial audio |
| B3.8 | **Agentic-UX patterns** | DYNAMIC | None | Static AI features | Documented patterns for human-on-the-loop, human-in-the-loop, mixed initiative, confidence visualisation, source attribution, recovery |

### B.4 — Visual Design & Hierarchy (Weight: 8%)

**Maps to doctrine parts:** [Part 1](part-1-foundations.md) (Foundations — voice/anchors), [Part 2](part-2-design-language.md) (Design Language).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B4.1 | **Visual hierarchy** | FIXED | Flat or chaotic | Scale + weight + color hierarchy | Scientifically validated via eye-tracking / 5-second test; primary action obvious |
| B4.2 | **Aesthetic & minimalist design** (Nielsen 8) | FIXED | Cluttered | Clean | Every visual element justifies its presence; intentional negative space |
| B4.3 | **Brand expression** | FIXED | Generic | On-brand | Distinctive within constraints |
| B4.4 | **Emotional resonance** | DYNAMIC | Sterile | Considered tone | Intentionally evokes the desired emotion (Material 3 Expressive's research found expressive designs rated higher on "energetic", "playful", "friendly") |
| B4.5 | **Density & ergonomics** | FIXED | One density | Comfortable + compact | Density choice exposed to users; respects platform conventions (Mac vs iOS vs Watch) |

### B.5 — Accessibility & Inclusive Design (Weight: 12%)

**Maps to doctrine parts:** [Part 5](part-5-accessibility-localization.md) (Accessibility, Inclusion, Localization), [Part 13](part-13-theming-whitelabel-embed.md) (HC mode), [Part 19](part-19-vertical-packs.md) (vertical packs — Govtech).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B5.1 | **WCAG 2.2 Level A conformance** | FIXED | Untested | Self-tested | Independently audited; report public; remediation tracked |
| B5.2 | **WCAG 2.2 Level AA conformance** | FIXED | Untested | Most criteria pass | Full AA + 9 new SCs (Focus Not Obscured Min/Enh, Focus Appearance, Dragging Movements, Target Size, Findable Help, Accessible Auth, Redundant Entry) |
| B5.3 | **Selected AAA criteria** | FIXED | None | A few | Documented AAA criteria for high-stakes flows (e.g., Focus Not Obscured Enhanced for legal/medical) |
| B5.4 | **Keyboard-only support** | FIXED | Broken | Tab order works | Full keyboard parity; documented shortcuts; no traps |
| B5.5 | **Screen-reader testing** | FIXED | Never | Pre-launch test | NVDA + VoiceOver + JAWS regression with each release; rotor / landmarks audited |
| B5.6 | **Cognitive accessibility** | DYNAMIC | Not addressed | Plain language | Plain-language certified; explicit help discoverability; reading-level metric; preview of WCAG 3.0 cognitive guidance |
| B5.7 | **Inclusive design** (gender, locale, low-bandwidth, low-vision) | FIXED | None | Some considerations | Inclusive design principles applied; audited by lived-experience consultants |
| B5.8 | **EAA / regulatory readiness** | DYNAMIC | Not addressed | Self-claimed | EAA-ready conformance statement; ISO/IEC 40500:2025 referenced |

### B.6 — Content Design & UX Writing (Weight: 8%)

**Maps to doctrine parts:** [Part 14](part-14-content-design.md) (Content Design & UX Writing at Scale), [Part 1](part-1-foundations.md) §3 (voice).

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B6.1 | **Voice & tone documentation** | FIXED | None | Voice doc exists | Voice + per-context tone matrix |
| B6.2 | **Microcopy patterns** | FIXED | Ad-hoc | Standard error/empty/confirmation copy | Pattern library w/ examples per emotional state; tested with users |
| B6.3 | **Action-oriented language** | FIXED | "Click here" | Action verbs | Concise, button-first style validated through A/B tests |
| B6.4 | **Localization & i18n** | FIXED | English only | One additional locale | Pseudolocalisation in CI; gender-neutral pronouns where languages allow; expansion-aware layouts (German +30%) |
| B6.5 | **Plain language / reading level** | FIXED | Unmeasured | Spot-checked | Flesch–Kincaid or similar tracked; jargon-detection lint |
| B6.6 | **Translation memory & glossary** | DYNAMIC | None | Spreadsheet | TM + glossary integrated with design tool (Figma plugins) and CI |

### B.7 — Usability & Heuristic Compliance (Weight: 10%)

**Maps to doctrine parts:** [Part 11](part-11-enterprise-patterns.md) (Enterprise Patterns), Part 3 (component states), [Part 4](part-4-surfaces.md) (surfaces).

Anchored on Nielsen's 10 Usability Heuristics (1990, refined 1994, language updated 2024) and Shneiderman's 8 Golden Rules.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B7.1 | **Heuristic evaluation cadence** | FIXED | Never | Pre-launch | Quarterly heuristic eval per surface; documented findings tracked to closure |
| B7.2 | **Visibility of system status** (H1) | FIXED | Poor | Adequate | Excellent — feedback at 100ms, 1s, 10s thresholds |
| B7.3 | **Match real-world** (H2) | FIXED | System jargon | User language | Validated via interviews + glossary |
| B7.4 | **User control & freedom** (H3) | FIXED | None | Cancel/back | Undo, redo, draft persistence, escape |
| B7.5 | **Consistency & standards** (H4) | FIXED | Inconsistent | Consistent within product | Consistent within product *and* with platform conventions (Apple HIG / Material) |
| B7.6 | **Error prevention** (H5) | FIXED | None | Validation | Constraint-based input (date pickers, masks); confirm-destructive |
| B7.7 | **Recognition over recall** (H6) | FIXED | Memorise cmds | Persistent labels | Recently-used, autocomplete, smart defaults |
| B7.8 | **Flexibility & efficiency** (H7) | FIXED | None | Some shortcuts | Keyboard shortcuts, command palette, customisation (Linear-class) |
| B7.9 | **Aesthetic & minimalist** (H8) | FIXED | Cluttered | Reasonable | Intentional |
| B7.10 | **Help users recognize / diagnose / recover from errors** (H9) | FIXED | "Error 500" | Plain English | Plain English + suggested action + recovery link + reduce blame language |
| B7.11 | **Help & documentation** (H10) | FIXED | None | FAQ | Contextual help, in-product tours, AI-assisted help |
| B7.12 | **Shneiderman additions** (informative feedback, dialog closure, easy reversal of actions) | FIXED | Not assessed | Most present | All 8 golden rules verified |

### B.8 — Performance & Core Web Vitals as UX (Weight: 10%)

**Maps to doctrine parts:** [Part 7](part-7-engineering-operations.md) (Engineering & Operations), [Part 6](part-6-ai-ethics-sustainability.md) (Sustainability — SWDM v4).

Google's Core Web Vitals are LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, measured at the 75th percentile from real user data. INP replaced FID in March 2024.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B8.1 | **LCP** at 75th percentile | DYNAMIC | > 4s | ≤ 2.5s | ≤ 1.8s; verified by RUM/CrUX |
| B8.2 | **INP** at 75th percentile | DYNAMIC | > 500ms | ≤ 200ms | ≤ 100ms |
| B8.3 | **CLS** at 75th percentile | DYNAMIC | > 0.25 | ≤ 0.1 | ≤ 0.05 |
| B8.4 | **TTFB** | FIXED | Unmeasured | Tracked | < 200ms p75 |
| B8.5 | **Performance budgets** in CI | FIXED | None | Local checks | CI fails on regression; budget per template |
| B8.6 | **Perceived performance patterns** | FIXED | Spinner only | Skeletons | Optimistic UI, prefetching, streaming SSR |
| B8.7 | **Mobile parity** | FIXED | Desktop-first | Responsive | Mobile-first; mobile p75 hits same thresholds |

### B.9 — Trust, Privacy & Ethics (Weight: 10%)

**Maps to doctrine parts:** [Part 6](part-6-ai-ethics-sustainability.md) (AI-Native, Ethics, Sustainability), [Part 8](part-8-governance-legal-commerce.md) (Governance, Legal, Commerce — privacy jurisdictions), [Part 11](part-11-enterprise-patterns.md) (consent / paywall patterns).

The FTC's $2.5B settlement with Amazon in September 2025 for Prime sign-up and "Iliad" cancellation flows is the cautionary case study for subscription UX. The EU's DSA bans dark patterns on online platforms; a Digital Fairness Act draft is expected in 2026.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B9.1 | **No-dark-pattern guarantee** (FTC's 4 categories: false belief, concealed info, unauthorized charges, manipulated privacy choices) | FIXED | Multiple violations | None of the 4 | Documented anti-dark-pattern policy; design reviews include "deceptive design" check |
| B9.2 | **Symmetric subscribe/cancel** | FIXED | "Iliad"-style maze | One-click cancel | Cancellation explicitly easier than sign-up; verified via session recording |
| B9.3 | **Consent UX** (GDPR / CCPA / CPRA / PDPL) | FIXED | Bundled / pre-ticked | Explicit opt-in | "Reject All" equally prominent as "Accept All"; granular controls; consent reaffirmed annually |
| B9.4 | **Transparency** (data use, AI use, fees) | FIXED | Hidden | Disclosed | Layered notice + just-in-time disclosure; AI use labelled per WAI / AI Act guidance |
| B9.5 | **Privacy-by-default** | FIXED | All-public defaults | Sensible defaults | Most-private defaults; documented threat model |
| B9.6 | **Algorithmic accountability** | DYNAMIC | None | Algorithm disclosed | Personalisation explained, opt-out provided, no AI-driven hyper-nudging on vulnerable groups |
| B9.7 | **Inclusive risk review** for vulnerable users (children, elderly, low literacy, distressed states) | FIXED | None | Considered | Documented inclusive risk review per major release |

### B.10 — Measurement & UX Metrics (Weight: 10%)

**Maps to doctrine parts:** [Part 10](part-10-measurement-research-appendix.md) (Measurement, Research, Appendix), [Part 16](part-16-adoption-designops.md) (Adoption KPIs), [Part 6](part-6-ai-ethics-sustainability.md) §AI metrics.

The HEART framework (Happiness, Engagement, Adoption, Retention, Task success), paired with Goals-Signals-Metrics, is the dominant macro-measurement approach. The System Usability Scale (SUS), with industry mean of 68, is the dominant micro-measurement instrument.

| # | Criterion | Tag | 0 | 3 | 5 |
|---|---|---|---|---|---|
| B10.1 | **HEART framework adoption** | FIXED | None | Some HEART metrics | Goals→Signals→Metrics formally mapped per product/feature |
| B10.2 | **SUS administered** | FIXED | Never | Once | Quarterly; trends tracked vs the 68 industry baseline; ≥ 20–30 responses per round |
| B10.3 | **Task success / completion rate** | FIXED | Untracked | Measured in usability tests | Continuous behavioural analytics + intent inference; segmented by user type |
| B10.4 | **Behavioural analytics depth** | FIXED | Pageviews | Funnels + cohorts | Event-level instrumentation, cohort retention, drop-off causes triangulated with qual |
| B10.5 | **NPS / CSAT / CES** | FIXED | None | One score | Triangulated CSAT + NPS + CES; segmented by journey stage |
| B10.6 | **Qualitative ↔ quantitative triangulation** | FIXED | Disconnected | Reports cross-reference | Single dashboard fuses behavioural + survey + research insights |
| B10.7 | **AI-era metrics** (trust, calibration, override rate, hallucination rate, dual evaluation of human + agent) | DYNAMIC | None | Some AI feature metrics | Dual-evaluation framework: measures both user experience *and* agent effectiveness; trust calibration and override rate tracked |
| B10.8 | **A/B testing rigor** | FIXED | Eyeball | T-tests | Pre-registered hypotheses, sequential testing controls, guardrail metrics (incl. accessibility & performance) |

---

## 8. Scoring worksheet template

The worksheet is a CSV / Google Sheet / Excel file with the following columns. AI agents per §10 emit it as both `audit-worksheet.csv` and `audit-worksheet.json`.

| Col | Field | Type | Notes |
|---|---|---|---|
| A | Part | A or B | |
| B | Category | A.1–A.10 / B.1–B.10 | |
| C | Category Weight (%) | Number | Frozen per the tables in §6/§7 |
| D | Criterion ID | e.g., `A1.3` | |
| E | Criterion description | Text | |
| F | FIXED / DYNAMIC | Tag | |
| G | Mapped doctrine parts | List | Per the "Maps to" lines in §6/§7 |
| H | Score (0–5) | Rater 1 | Independent |
| I | Score (0–5) | Rater 2 | Independent |
| J | Final Score (0–5) | After calibration | |
| K | Confidence (Lo / Med / Hi) | Tag | Especially for AI-rater rows |
| L | Evidence link(s) | URL or relative path | Figma file, PR, screenshot, doc-site URL, transcript, doc anchor (e.g. `part-7-engineering-operations.md#L412`) |
| M | Notes | Text | One-paragraph justification |
| N | Recommended action | Text | Maps to §9 |
| O | Effort estimate | S/M/L/XL | |
| P | Owner | Person / seat | |
| Q | Target date | Date | |

**Roll-up rows** at the bottom of each category compute:

```
Category % = Σ(Final scores in category) / (5 × number of criteria) × Category weight
Part total = Σ(Category %)  → maps to Maturity Tier (§5.4)
```

Conditional formatting maps total % → Maturity Tier (§5.4). Cells with confidence = `Lo` are flagged for human review.

---

## 9. Recommendations & next-steps templates

### 9.1 Per-tier prescription

| Score range (per category) | Tier | Recommendation template |
|---|---|---|
| **0–20%** | L1 Initial | **Stop the bleeding.** Pick the 3 highest-traffic surfaces and standardise one foundation (color tokens) and one component (button) within 30 days. Defer everything else. Reference: Minimum Viable Design System tactic. |
| **21–40%** | L2 Repeatable | **Codify what you have.** Convert your Figma kit into a token-backed library (DTCG JSON). Stand up Storybook. Publish to a private npm. Write one-pager docs per component. Target 90 days. |
| **41–60%** | L3 Defined | **Govern & measure.** Introduce semver, RFCs, deprecation policy, and a contribution guide. Begin tracking adoption %, detachment, and consumer NPS. Add visual regression and a11y CI. Target 180 days. |
| **61–80%** | L4 Managed | **Federate & automate.** Stand up cross-platform parity (web + iOS/Android/RN). Add MCP server. Code-Connect bindings. Quarterly maturity audit. Open-source select packages. |
| **81–100%** | L5 Optimised | **Lead the industry.** Contribute to DTCG / WAI specs. Speak at design-system conferences. Publish open metrics (e.g., GitHub-style "system health" dashboard). |

### 9.2 Recommendation Card schema

For each criterion that scored ≤ 2 below its category mean (or scored ≤ 2 absolute), generate a **Recommendation Card** with the structure:

```markdown
## Recommendation: {Criterion ID} — {short title}

**Issue:** {criterion + observed score}
**Why it matters:** {business / regulatory / brand impact, citing benchmark}
**Fix:** {concrete next step}
**Effort:** S / M / L / XL
**Owner:** {role / seat}
**Acceptance criteria:** {evidence required to re-score at ≥ 4}
**Dependencies:** {any blockers}
**Audit-list reference:** §14.X expansion entry, or "novel — propose to add to §14 in next refresh"
```

Output one card per qualifying criterion to `_audit/{YYYY-MM-DD}/recommendations/{criterion-id}.md`.

---

## 10. AI-Agent Audit Runbook — executable specification

This section is the executable contract between a CyberSkill operator and an AI agent invoked to run an audit. Read it end-to-end before invoking. The agent reads it before doing any work.

### 10.1 Modes, actors, and output

Each audit session emits **one file**: `docs/_audit/audit-report-{YYYY-MM-DD}.md` (full template at `Templates/audit/audit-report-template.md`). This single file holds: baseline scores, industry-research log, findings, fix plan, fix execution, verification, re-audit scores, and sign-off.

**Two modes:**

- **`SCAN`** — score current state, research industry updates, enumerate findings. Produces a draft report. Pauses at §4 of the report for human review.
- **`FIX`** — execute the human-approved fixes from `SCAN`, verify no regression, re-score affected criteria. Produces the signed report.

**Two actors:**

| Actor | Role | Sections owned in the audit report |
|---|---|---|
| **`@Agent`** | autonomous work the agent can do (token edits, doc patches, lint runs, script execution, scoring) | §1 baseline · §2 research · §3 findings · §5 plan · §6 execution · §7 verification · §8 re-score · §10 criteria table · §11 research log |
| **`@Human`** | decisions / manual work (deploys, vendor procurement, user studies, conference talks, contracts) | §4 sign-off · §9 final approval · all `@Human[manual]` findings |

**Action tags inside findings:**
- `@Agent[fix]` — agent fixes autonomously.
- `@Agent[research]` — agent gathers evidence.
- `@Human[decide]` — human chooses among options.
- `@Human[approve]` — human gates progression.
- `@Human[manual]` — work the agent cannot do.
- `@Human[rollback]` — human-driven revert.

**Two audit scopes:**

- **Mode S — Doctrine self-audit** (default for self-audit invocations): input is the 20 parts under `docs/`, the tokens directory, and this document.
- **Mode P — Live-product audit** (per engagement): input is a target product's repo, telemetry, transcripts, plus this document.

### 10.2 Required inputs

The operator provides the agent with:

1. The path to this document (`00-audit-and-roadmap.md`) — the framework.
2. The path to the master index (`00-index.md`).
3. The paths to the parts to be audited (default: every `part-*.md` in `docs/`).
4. The path to the tokens directory (default: `tokens/`).
5. The output file path (default: `docs/_audit/audit-report-{YYYY-MM-DD}.md`).
6. The audit mode (`S` or `P`) and the audit scope (`SCAN` or `FIX`).
7. The audit date and the agent run ID.
8. A list of categories to **score** (default: all 20) and a list of categories to **stub-only** (default: none).
9. Confidence threshold below which the agent must stop and ask the operator (default: `Lo`).
10. The previous audit report path (for delta computation and no-downgrade gating).

### 10.3 Evidence collection rules

For each criterion, the agent must:

1. **Read** the mapped doctrine parts listed under each category in §6 / §7.
2. **Cite** specific evidence by file + line range (or section anchor). One citation per score is the minimum; three or more is preferred for criterion scores ≥ 4.
3. **Distinguish** documentation evidence (the doctrine *describes* the capability) from artefact evidence (the capability is *demonstrably present* in code or tokens).
   - For Mode S, documentation evidence is sufficient up to score 3 ("Defined").
   - To award score 4 or 5, artefact evidence is required: real token files, real Storybook stories, real CI configuration, real telemetry instrumentation, etc.
4. **Never invent** evidence. If a part does not document a capability, score it 0–2 and explain.
5. **Never extrapolate** across parts. If [Part 5](part-5-accessibility-localization.md) documents a11y but no other part references it, do not assume the rest of the system applies it.
6. **Distinguish spec from implementation** (per §2.3). When `src/` ships less than the doctrine specifies, note the gap as "tracked implementation gap" rather than a doctrine flaw.

### 10.4 Scoring procedure (per criterion)

```
1. Resolve mapped parts.
2. Read mapped parts; collect quotes / line refs supporting or rebutting the criterion.
3. Compare evidence against the 0 / 3 / 5 anchors in the criterion table.
4. Choose a score 0–5; record confidence.
5. Write a 1–3 sentence justification citing the evidence.
6. If score ≤ 2 below category mean (computed at the end), draft a Recommendation Card per §9.2.
7. If confidence is Lo, flag the row for human review.
```

### 10.5 Output schema — single file

The agent produces **one artefact**: `docs/_audit/audit-report-{YYYY-MM-DD}.md`. The full template is at `Templates/audit/audit-report-template.md`. The structure is fixed (sections in stable order, agents key off the headings):

| Section | Owner | Mode | Purpose |
|---|---|---|---|
| YAML frontmatter | `@Agent` | both | machine-readable metadata: audit_id, mode, status, scores, parent_audit, no_downgrade flag |
| §0 Snapshot | `@Agent` | both | one-glance summary: pre/post scores, delta, tier transition, regression count |
| §1 SCAN — Baseline | `@Agent[research]` | SCAN | re-score all 125 criteria; cite evidence; populate §10 |
| §2 SCAN — Industry research | `@Agent[research]` | SCAN | web-search for new/updated standards (WCAG 3.0, DTCG, APCA, MCP, …); decide adopt / note / defer; populate §11 |
| §3 SCAN — Findings | `@Agent[fix\|research]` `@Human[decide\|manual]` | SCAN | enumerate gaps; route each to an actor; declare rollback safety |
| §4 SCAN — Sign-off ⏸ | `@Human[approve]` | SCAN | **PAUSE** — human reviews §1–§3, approves/rejects/defers each finding, transitions mode to FIX |
| §5 FIX — Plan | `@Agent[fix]` | FIX | sequence approved fixes; declare revert command per item; pre-flight no-downgrade simulation |
| §6 FIX — Execution | `@Agent[fix]` | FIX | run each fix; log per-step result |
| §7 FIX — Verification | `@Agent[fix]` | FIX | run all `scripts/check-*.mjs`; rescore affected criteria; **no-downgrade gate**: any regression triggers automatic rollback + re-run |
| §8 RE_AUDIT — Final score | `@Agent[research]` | FIX | refresh §10 with post-fix scores; recompute combined; if lower than baseline → ROLLBACK entire batch |
| §9 SIGN-OFF | `@Human[approve]` | FIX | final approval; append row to `_audit/_history.md` |
| §10 Criteria scores | `@Agent` | both | machine-readable: 125 rows, columns `id\|category\|weight\|criterion\|tag\|pre\|post\|conf\|citations\|notes` |
| §11 Research findings | `@Agent` | SCAN | machine-readable: industry updates with source URL, summary, decision |
| §12 Open questions | `@Agent` | both | carry-over to next audit, with target date and owner |
| §13 Glossary | `@Agent` | both | terms frozen for this audit |

#### 10.5.1 Audit flow (state machine)

```
BASELINE  →  RESEARCH  →  FINDINGS  →  AWAITING_REVIEW  ⏸  →  FIXING  →  VERIFYING  →  RE_AUDIT  →  SIGNED
                                              ↑                                           │
                                              └─── ROLLBACK if any score regression ──────┘
```

#### 10.5.2 No-downgrade rule (hard gate)

Each session must end with a combined score ≥ the pre-audit combined score. Any FIXED-criterion regression triggers automatic rollback of the offending fix. The audit cannot transition to `SIGNED` while any criterion sits below its pre-audit score.

#### 10.5.3 Frontmatter contract

```yaml
audit_id: YYYY-MM-DD
mode: SCAN | FIX | SCAN_COMPLETE | RE_AUDIT
status: BASELINE | RESEARCH | AWAITING_REVIEW | FIXING | VERIFYING | RE_AUDIT | SIGNED
agent: <model-id>
operator: <name>
signer: <name>
parent_audit: YYYY-MM-DD | null
framework: docs/00-audit-and-roadmap.md
no_downgrade: true
pre_audit_score:
  part_a: 0.0
  part_b: 0.0
  combined: 0.0
  tier: L?
post_audit_score:
  part_a: 0.0
  part_b: 0.0
  combined: 0.0
  tier: L?
delta_pp: 0.0
fixed_regressions: 0
enterprise_grade: pass | fail
```

### 10.6 Runtime constraints (hard rules)

The agent operates under the same hard / soft constraints in §13.2 / §13.3, plus these audit-specific constraints:

1. **Never fabricate scores.** Every score is justified by a quote or line-ref, or it is null + `Lo` confidence + flagged for human review.
2. **Never average away missing data.** A criterion with no evidence is scored `0` with explicit "no evidence found" note, not "median of category".
3. **Never adjust scores upward to hit a threshold.** If a category scores 58%, report 58%, not 65%.
4. **Never delete prior audits.** Outputs go to a date-stamped folder; previous audits are preserved.
5. **Always cite the doctrine, not training data.** If a benchmark fact (e.g., "Carbon ships 50+ components") is asserted without a doctrine cite, mark it as "external benchmark — needs verification" rather than presenting it as audit evidence.
6. **Always preserve calibration room.** Human Co-Auditor scores any 5+ randomly-sampled criteria independently before signing off on the audit.

### 10.7 Calibration & validation

After the agent emits its `SCAN` output:

1. The operator runs a **spot-check sample**: 5+ criteria across Parts A and B, picked at random and re-scored independently. Findings are appended to §4 of the audit report under the `calibration_notes` block.
2. Differences ≥ 2 points between agent and human trigger a calibration discussion before any `FIX` cycle begins. Resolve by citing additional evidence inline in §10.
3. After `FIX` and `RE_AUDIT`, the audit is **signed** when the human reviewer fills the §9 sign-off block with their name + date. Until signed, the audit status is `AWAITING_REVIEW` or `RE_AUDIT`.
4. A signed audit is appended to the **audit history register** at `_audit/_history.md` (one row per audit: date, mode, agent, operator, signer, summary scores).

### 10.8 Re-running on a refreshed doctrine

When the doctrine ships a new release:

1. The audit is re-run in Mode S immediately after release.
2. Categories where DYNAMIC criteria language has changed (per the framework's annual review) are re-scored against the new language.
3. Trend lines for FIXED criteria are produced (`_audit/_trends.md`).
4. The DESIGN.md generator is re-run (per §11) and the regenerated rules file is committed alongside.

### 10.9 Failure modes the agent should refuse

The agent **must refuse to run** if:

1. The framework path cannot be confirmed.
2. The mapped parts are missing or empty.
3. The output directory cannot be written.
4. The operator's instructions conflict with §10.6 (e.g., "score everything 4+").
5. Confidence on more than 25% of criteria would be `Lo`.

In a refusal, the agent emits the audit-report file with `status: REFUSED` and a §3 findings block describing what is missing and what the operator should provide. No partial scores are written.

---

## 11. DESIGN.md generator — keeping the AI-agent rules file fresh

Many AI agents (Cursor, Claude Code, GitHub Copilot, custom domain agents) read a single `DESIGN.md` at the repo root as their canonical context. Hand-maintaining that file is wasteful and error-prone — when the docs change, the rules file drifts.

CyberSkill solves this with **a generator script** that distils the current docs + tokens + manifest into a single `DESIGN.md`. Re-run the script on every release, on demand, or in CI.

### 11.1 Where it lives

```
Design System/
├── docs/                          ← source of truth
├── tokens/                        ← DTCG token files
├── package.json                   ← toolchain manifest
├── scripts/
│   └── build-design-md.mjs        ← the generator (this section)
└── DESIGN.md                      ← generated output (committed)
```

### 11.2 What it does

The script:

1. Reads `Design System/docs/00-index.md` to get the canonical part list and ownership matrix.
2. Reads each `part-*.md` and extracts:
   - The H1 title.
   - The first-paragraph summary (the italicised intro).
   - The first-level section list (H2s).
3. Reads every file under `Design System/tokens/` and inlines a compact summary (token names + values, no extensions).
4. Reads `Design System/package.json` and inlines the toolchain summary (React/Vite/Storybook/TypeScript versions, scripts).
5. Reads `Design System/.storybook/main.ts` if present and notes the Storybook configuration.
6. Lists the actual implementation skeleton — the `atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/` folder contents — so agents see the real component inventory.
7. Inlines this document's §13 (AI-agent operating instructions) — hard constraints, soft constraints, tier rules.
8. Adds a header noting **when the file was generated** and **from which doctrine state** (a hash of the docs folder).
9. Writes the result to `Design System/DESIGN.md` (the conventional location agents look for).

### 11.3 How to run it

```bash
# From the Design System folder:
node scripts/build-design-md.mjs

# Or via the package.json script (preferred):
pnpm build:design-md
```

The script has zero dependencies — it uses only Node 20+ built-ins (`fs`, `path`, `crypto`). It should complete in under 2 seconds even on the full doctrine.

### 11.4 When to run it

| Trigger | Cadence |
|---|---|
| **On every release** (semver tag) | Required — commit the regenerated file alongside the release |
| **After any `docs/part-*.md` change** | Recommended — keeps agents working off latest doctrine |
| **After any `tokens/*.tokens.json` change** | Required — token drift is the most impactful staleness |
| **After any `package.json` toolchain bump** | Recommended |
| **In CI on every push** | Optional — CI can regenerate and `git diff` to fail the build if `DESIGN.md` is stale |

Add the CI guard once the team has settled on a CI provider (GitHub Actions, GitLab CI, etc.). The check is cheap.

### 11.5 What agents do with `DESIGN.md`

`DESIGN.md` is the **at-a-glance** rules file. Agents read it before any task and treat it as authoritative:

- **Cursor / Claude Code / Copilot** auto-load `DESIGN.md` when working in this repo.
- **Custom MCP agents** can fetch it via the docs-MCP endpoint (when shipped per A10.6).
- **Plain-prompt invocations** can paste the file as the leading system prompt.

When an agent contradicts `DESIGN.md`, the rule in the file wins. When the docs change, `DESIGN.md` is regenerated and the new rule is canonical.

### 11.6 Limitations of `DESIGN.md`

`DESIGN.md` is a **summary**, not a replacement for the docs. Agents doing substantive work — drafting an RFC, auditing the doctrine, extending a part — must still read the full part being modified and every part it cross-references (per §13.9 session checklist). `DESIGN.md` is the at-a-glance briefing; the docs are the source.

---

## 12. Future-improvement protocol — change pipeline

### 12.1 Versioning rules (recap from Part 17)

The doctrine follows **strict semantic versioning**:

| Bump | Trigger | Approval threshold |
|---|---|---|
| **Patch** (x.y.Z) | Editorial: typo, link, formatting, cross-reference repair | Single chair owner |
| **Minor** (x.Y.0) | Substantive: new section, new pattern / component, expansion to existing | RFC + chair owner + Founder approval |
| **Major** (X.0.0) | Breaking: structural reorganisation, removal of any documented contract, renumbering | RFC + chair owner + Founder + 30-day review window |

### 12.2 The change pipeline

Every substantive change passes through this pipeline:

```
1. PROPOSE
   Contributor (human or AI agent) drafts a Doctrine RFC
   per Part 8 §2.2 and §16 (RFC subtypes).

2. REVIEW
   Chair owner of the affected part schedules review.
   Cross-cutting changes also reviewed by adjacent owners.
   AI-agent proposals reviewed per §13.5 (additional gates).

3. DEBATE
   14-day window for substantive RFCs; 30-day for breaking.
   Comments and counter-proposals filed in the RFC document.

4. DECIDE
   Chair owner produces written decision (accept / reject / defer).
   Decision references this audit's expansion list (§14) where applicable.

5. IMPLEMENT
   Branch from main; PRs land per Part 7 §7 conventions.
   Cross-references to and from the changed part are repaired.
   Translation to Vietnamese ships in same PR (or with explicit deferral note).
   DESIGN.md is regenerated (§11) and committed.

6. RELEASE
   Version bumped per §12.1.
   Changelog entry added (Part 10 §14.1).
   Affected ambassadors notified per Part 16 §3.5.
   Audit is re-run per §10.8 if a Minor or Major release.
```

### 12.3 The doctrine RFC template

```markdown
# Doctrine RFC {YYYY}-{NNN}: {Title}

| Field | Value |
|---|---|
| Author | {name} (or `agent:{model}-{run-id}` for AI authors) |
| Affected parts | {Part NN list} |
| Class | Editorial / Substantive / Breaking |
| Subtype | (per Part 8 §16: component / pattern / template / theme / sub-brand / token / pack / tooling / content / lifecycle) |
| Status | Draft / In Review / Approved / Rejected / Deferred |
| Audit reference | (link to §14.X expansion entry, or "novel" if not in audit) |
| Review window opens | {date} |
| Review window closes | {date+14d or +30d} |

## Motivation
What problem does this solve? What evidence supports the change?

## Proposed change
{Diff narrative; full text in branch; link.}

## Alternatives considered
At least two alternatives, including "do nothing".

## Impact on dependent parts
List parts that reference the changed part; whether they need amendment.

## Backward compatibility
Any breaking surface? Codemod available? Deprecation timeline?

## Translation impact
Do Vietnamese strings need updating? Additional locales?

## A11y impact
Does this affect WCAG conformance? Accessibility-mode personas?

## Telemetry impact
New events? Changed events?

## Audit-score impact
For each affected criterion in §6 / §7, expected before/after scores.

## Tree-test / card-sort impact
Does this change move IA, navigation, naming, or surface vocabulary? If yes:
- Has a card-sort or tree-test been run with the actual audience? (link, or "no")
- If no, the RFC must include a plan for one before it ships, or explicitly waive (with rationale).
- For Editorial-class RFCs that don't touch IA, write "N/A — no IA impact".

## DESIGN.md impact
Will the regenerated `DESIGN.md` change materially? (Yes / No / minor.)

## Open questions
{...}

## Approver
Chair of affected part(s) + (Founder for breaking).
```

### 12.4 Decision criteria

A reviewer asks (in this order):

1. **Is this editorial?** If editorial, ship as patch. If substantive, continue.
2. **Does it match the audit's expansion list (§14)?** If yes, prefer accept; the work was already prioritised.
3. **Does it preserve the doctrine's voice?** Per [Part 1](part-1-foundations.md) §3 voice principles.
4. **Does it preserve cross-references?** Existing parts that reference the changed part must remain accurate.
5. **Does it preserve a11y / l10n / lifecycle commitments?** No regression.
6. **Does it preserve audit-score floor?** No FIXED criterion may regress without explicit rationale.
7. **Is the change reversible?** Two-way doors preferred; one-way doors require Founder sign-off.
8. **Is the change owner staffed?** No orphan contributions.

### 12.5 Open questions register

Every part may identify open questions during normal operation. These are tracked in `Open-Questions/{YYYY}/{NNN}.md` with:

- Question text
- Affected parts
- Hypothesis
- Owner
- Deadline for resolution
- Related RFCs (when one is filed)
- Affected audit criteria

Open questions that exceed their deadline trigger an automatic escalation to Founder.

### 12.6 Deprecation cadence (recap from Part 17)

A part-level deprecation (sunset of an entire doctrine section) is rare and follows the same lifecycle as a component deprecation: 180-day sunset window with comms milestones at 30 / 60 / 90 / 120 / 150 / 180 days.

### 12.7 Translation freshness commitment

For every minor/major release:

- English source ships as the canonical version.
- Vietnamese counterpart ships in the same PR or with explicit `vi-deferred-by: 30d` note.
- Other locales follow [Part 5](part-5-accessibility-localization.md) §7 cadence (no SLA for non-VN).

A release with `vi-deferred` open beyond 30 days reverts (the change is rolled back until VN is current).

### 12.8 Audit refresh

This audit-and-roadmap document itself ships per:

- **Annual** full audit (each year's anniversary of the most recent major).
- **On every major release** (X.0.0).
- **On regulatory shift** materially affecting privacy, AI, or accessibility scope.
- **On framework revision** when Part A or Part B criterion language is updated for DYNAMIC drift.

The chair owner of this document (Design System Lead) coordinates the refresh.

---

## 13. AI-agent operating instructions (change-pipeline contributors)

This section addresses AI agents (Claude, GPT, Gemini, custom domain agents) authorised to **change** the doctrine — distinct from §10 which addresses agents authorised to **audit** it.

### 13.1 Authorisation tiers

| Tier | What the agent may do | Approval required |
|---|---|---|
| **A0 — Read-only** | Read any part; quote in answers; reference cross-links; produce a draft audit per §10 (Draft status only); regenerate `DESIGN.md` per §11 | None — default for any user-invoked agent |
| **A1 — Editorial proposal** | Propose typo / link / formatting fixes via PR | Chair owner of affected part (5-day review) |
| **A2 — Substantive proposal** | Propose new sections, expansions per audit §14 list | Full Doctrine RFC (per §12.2) |
| **A3 — Substantive autonomous merge** | Merge editorial fixes without human review | Reserved; not currently granted |

Currently authorised: **A0 by default, A1 with PR review, A2 with full RFC**. A3 is reserved until human reviewers have observed agent quality at A2 over a meaningful sample.

### 13.2 Hard constraints (the agent must NEVER do these)

These are non-negotiable. If the agent is uncertain, it must stop and ask the human reviewer.

1. **Never modify the brand anchors** in master index §Anchors. Brand anchors are immutable per [Part 1](part-1-foundations.md) §2; a change requires founder sign-off + trademark legal review.
2. **Never delete any existing part** without an explicit Major-version RFC and Founder approval.
3. **Never renumber files**. File numbers (1–20) are stable identifiers; cross-references depend on them.
4. **Never remove the AUDIT EXTENSION markers** that document where audits appended content into a previously-existing part. Future audits reference them.
5. **Never silently translate** customer-facing or legal-binding text. All translation goes through [Part 5](part-5-accessibility-localization.md) §7 workflow with named reviewer.
6. **Never invent regulatory citations**. Cite only verified statutes; if uncertain, say "TBD — needs legal review".
7. **Never modify the Vietnamese-first commitment**. Every change ships VN counterpart or explicit deferral note.
8. **Never bypass the change pipeline** (§12.2). Even editorial fixes go through PR review.
9. **Never produce content that violates [Part 1](part-1-foundations.md) §3 voice principles** or [Part 1](part-1-foundations.md) §16 anti-patterns or [Part 14](part-14-content-design.md) §2.3 banned phrases.
10. **Never fabricate test results, telemetry data, or adoption metrics** — and never fabricate audit scores per §10.6.
11. **Never edit `DESIGN.md` by hand.** The file is generated. Edit the source docs and re-run §11.

### 13.3 Soft constraints (the agent should normally do these)

These are strong defaults; deviations require explicit reason in the PR description.

1. **Match the existing voice** per [Part 1](part-1-foundations.md) §3 (warm / direct / honest / respectful).
2. **Match the existing structure** of the part being modified.
3. **Use canonical phrases** per [Part 14](part-14-content-design.md) §2.6 glossary.
4. **Respect length budgets** per [Part 14](part-14-content-design.md) §2.4.
5. **Cross-reference, don't duplicate** — when content already exists in another part, link to it rather than restating.
6. **Carry tokens, not literals** — use `space.4` not `16px`; use `color.semantic.danger` not `#B33B19`.
7. **Carry MessageFormat 2.0** for any new microcopy keys.
8. **Add to the audit's expansion list** (§14) when proposing something not yet there.
9. **Compute audit-score impact** in the RFC's "Audit-score impact" field per §12.3.
10. **Re-run the DESIGN.md generator** after a change is merged.

### 13.4 The agent's PR template

When an AI agent files a PR (A1 or A2 tier), its PR description uses this template:

```markdown
## Doctrine PR by AI agent

| Field | Value |
|---|---|
| Agent | {model name} {model version} |
| Run ID | {unique invocation id} |
| Tier | A1 / A2 |
| Operator | {human who invoked the agent} |
| Affected parts | {Part NN list} |
| Class | Editorial / Substantive |
| Audit reference | §14.X (or "novel — see motivation below") |
| Voice rubric pass | (per Part 14 §2.2; agent self-checked) |
| Banned-phrase check | (per Part 1 §16; agent self-checked) |
| Cross-reference check | (links verified) |
| Audit-score impact | (per §13.3.9) |
| DESIGN.md regenerated | (Yes / No / N/A) |
| Translation status | (VN added / deferred to {who} by {date}) |
| Open questions | {list any uncertainties for human reviewer} |

## Motivation
{...}

## Diff summary
{...}

## How a human should review this
{Specific things the agent recommends humans focus on, e.g. tone calibration, fact verification.}

## Risks identified
{...}
```

### 13.5 Additional review gates for AI-agent PRs

Beyond the standard review (§12.2):

1. **Voice rubric verification by human.** Agent self-checks are advisory; a human verifies all eight rubric rows ([Part 14](part-14-content-design.md) §2.2).
2. **Citation verification.** Any factual claim referencing a statute, standard, or external source is independently verified.
3. **Length verification.** Agent length budgets are checked against [Part 14](part-14-content-design.md) §2.4.
4. **Banned-phrase verification.** Lint runs against [Part 1](part-1-foundations.md) §16 and [Part 14](part-14-content-design.md) §2.3; manual check of edge cases.
5. **Cross-reference verification.** Every link out is clicked; every part referenced is confirmed to exist.
6. **Translation verification.** If VN counterpart is included, native-Vietnamese reviewer checks naturalness, not just literal correctness.
7. **Audit-score impact verification.** Reviewer agrees with the predicted scoring change.
8. **DESIGN.md regeneration verification.** If the change touches docs / tokens / manifest, reviewer confirms `DESIGN.md` was regenerated and committed.

### 13.6 Agent attribution and accountability

Every agent contribution is attributed in:

- The PR (agent name, model version, run ID, operator).
- The changelog entry ([Part 10](part-10-measurement-research-appendix.md) §14.1) with format: `Author: agent:{model} (operator: {human})`.
- The contribution-credit registry (see §14.21 — to be created).
- The audit history register `_audit/_history.md` for audit-class contributions.

If a merged agent contribution is later found to contain an error, both the agent's operator and the human reviewer are accountable. This is intentional: it discourages rubber-stamp reviews of AI work.

### 13.7 Agent capabilities the doctrine encourages

These are the use cases the doctrine actively supports:

1. Drafting a new pattern or component spec in the established format from a brief description.
2. Expanding a thin section identified in §14.
3. Auditing for cross-reference drift across the full corpus.
4. Generating Vietnamese translations for English source (with native review).
5. Producing example code for the Storybook / docs site referenced from a part.
6. Drafting microcopy variants for [Part 14](part-14-content-design.md) catalogue entries.
7. Generating migration codemods for deprecated → replacement mappings.
8. Writing release notes from changelog diffs.
9. Producing pseudo-localisation passes per [Part 14](part-14-content-design.md) §9.4.
10. Drafting RFC bodies from a problem statement.
11. Running the audit per §10 and producing the four artefacts.
12. Producing recommendation cards per §9.2 from a scored worksheet.
13. Regenerating `DESIGN.md` per §11 after a change.

### 13.8 Agent capabilities the doctrine restricts

These uses require explicit human-in-loop confirmation:

1. **Modifying token values.** Tokens are structural; changes require Design Lead.
2. **Modifying voice principles.** Brand-Owner-only.
3. **Authoring new vertical packs.** Requires industry expert signoff ([Part 19](part-19-vertical-packs.md) §10.2).
4. **Modifying legal / regulatory citations.** Requires General Counsel verification.
5. **Modifying lifecycle status of a component.** Requires standard lifecycle gate ([Part 17](part-17-component-lifecycle.md) §3).
6. **Producing customer-facing legal text.** Always human-attorney drafted.
7. **Signing an audit report.** A Draft audit is countersigned only by a named human reviewer.

### 13.9 Agent operating session checklist

Before an agent begins work on the doctrine, the operator should confirm:

```
[ ] The agent has read 00-index.md.
[ ] The agent has read this 00-audit-and-roadmap.md (full).
[ ] If running an audit: §10 has been read end-to-end.
[ ] If proposing a change: the agent has read the part(s) it will modify.
[ ] The agent has read every part the modified part cross-references.
[ ] The agent's authorisation tier is set explicitly (A0 / A1 / A2).
[ ] The operator has reviewed and approved the agent's planned change scope.
[ ] The agent commits to using §13.4 PR template (if changing) or §10.5 output schema (if auditing).
[ ] The agent commits to flagging any uncertainty rather than guessing.
[ ] If the change touches docs / tokens / manifest, the agent will regenerate DESIGN.md per §11.
```

Failure of any row blocks the work.

### 13.10 What the agent should do when uncertain

The agent's default response to uncertainty is:

> "I am uncertain about {X}. I have considered {options A, B, C}. My recommendation is {Y} with confidence {Lo / Med / Hi}. A human reviewer should verify {Z} before merge."

Specifically:

- **Never guess** at a citation. If the regulation isn't certain, say so.
- **Never invent** Vietnamese where the agent is not native. Defer to a translator.
- **Never substitute opinion** for the documented voice. If the doctrine doesn't address a tone question, raise it as an open question (§12.5) rather than improvising.
- **Never extend scope** beyond the operator's brief. Surface the broader opportunity, await direction.
- **Never round up audit scores.** A 2.5 means 2 with `Med` confidence and a recommendation card, not "we'll call it 3".

### 13.11 Multi-agent workflows

When multiple agents work on the doctrine concurrently (e.g., one drafting, another reviewing):

- Each agent's tier is independent.
- Agents may not approve each other's PRs.
- Cross-agent communication uses the multi-agent protocol of [Part 9](part-9-ai-prompt-library.md) §12.
- A human is the final approver for any change.
- For audits: a separate agent may calibrate-score a sample of criteria. Disagreements ≥ 2 trigger §10.7.

---

## 14. Per-part expansion menu

Each part below has been audited and its **highest-leverage expansion** identified. These are not commitments; they are proposals for future RFC discussion. The list is exhaustive by intent — every audited expansion opportunity is recorded so contributors can pick from a known menu rather than rediscovering them. The §6 / §7 audit framework references these entries by ID where it identifies a gap.

### 14.1 Part 1 — Foundations

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Brand-application case studies** | M | Brand Owner | Concrete examples of brand usage in real customer scenarios; 3–5 short studies per market region. |
| **Voice playbook for crisis comms** | S | Brand Owner | Tone modulation for outage / breach / regulatory-action surfaces; pairs with [Part 14](part-14-content-design.md). |
| **Sub-brand visual variations** | M | Brand Owner | Once second sub-brand exists, document the realised lockup variants alongside [Part 13](part-13-theming-whitelabel-embed.md) §6. |

### 14.2 Part 2 — Design Language

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Wide-gamut (Display P3, Rec. 2020) usage detail** | M | Design Lead | Beyond [Part 2](part-2-design-language.md) §1.4 fallback — when and how to opt into wider gamut for hero imagery, dataviz. |
| **Print colour management (CMYK, spot)** | M | Brand Owner | Print pipeline detail for brand-applied collateral per [Part 19](part-19-vertical-packs.md) §X (Templates folder). |
| **Variable-font axis tokens** | S | Design Lead | Token annotation for Be Vietnam Pro variable axes (weight, optical-size). |
| **Numerals lining/old-style/tabular spec per surface** | S | Design Lead | OpenType figure-style choice rules per surface context. |

### 14.3 Part 3a–3h — Tier-1 components

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Per-component i18n examples (CJK, RTL)** | M | Design Lead | Each component gains a "i18n examples" subsection with 2–3 locale rendering captures. |
| **Per-component perf-budget capture** | S | Engineering Lead | Each component spec adds bundle-size and render-perf budgets per [Part 7](part-7-engineering-operations.md) §10. |
| **Per-component analytics events catalogue** | S | Research Lead | Standardised telemetry events emitted (per [Part 10](part-10-measurement-research-appendix.md) §7 + [Part 17](part-17-component-lifecycle.md) §6). |
| **Spec-to-implementation parity tracker** | M | Engineering Lead | Per primitive, mark which `src/atoms/*` ships and which is doc-only. Surfaces the gap noted in §2.3. |

### 14.4 Part 4 — Surfaces & Patterns

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Server-rendered (no-JS) surface profile** | M | Engineering Lead | Patterns for surfaces requiring graceful no-JS degradation. |
| **PWA-specific patterns** | M | Engineering Lead | Install banner, offline state, background sync, push permission UX. |
| **Embedded-in-Slack / Teams / Notion surfaces** | M | Engineering Lead | App-frame integration patterns within third-party shells. |
| **Watch / wearable enrichment** | S | Design Lead | Beyond [Part 4](part-4-surfaces.md) §9 (current high-level), per-watch-OS specifics. |

### 14.5 Part 5 — Accessibility, Inclusion, Localization

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Cognitive-accessibility patterns beyond WCAG** | M | Accessibility Lead | Memory-aid, reading-distraction-management, predictive-completion patterns. |
| **Trauma-informed design patterns** | M | Accessibility Lead | Pacing, control-restoration, opt-out flows for sensitive flows (medical, legal, abuse-related). |
| **Voice-control / switch-control component compliance matrix** | M | Accessibility Lead | Per-component compliance with voice navigation (iOS Voice Control, Android Voice Access, Dragon, Talon). |
| **Additional locales (15 new)** | L | Locale Stewards | Currently 20+ locales; add 15 high-priority (Tagalog, Bengali, Urdu, etc.) over 2 years. |

### 14.6 Part 6 — AI-Native, Ethics, Sustainability

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Agentic-action ethics layer** | L | AI/Ethics Lead | When agents take autonomous actions (write to DB, send messages, spend money), additional consent + audit + recovery patterns. |
| **AI-content-moderation patterns** | M | AI/Ethics Lead | UI for moderation queues, flagged-content review, appeals. |
| **Age-gating / content-rating patterns** | M | AI/Ethics Lead | For consumer surfaces with minor-protection requirements. |
| **AI bias-disclosure UI** | M | AI/Ethics Lead | In-product display of model bias evaluation results. |
| **Carbon labelling per AI request** | M | AI/Ethics Lead + Engineering Lead | Per-request carbon estimate surface (e.g., "This response cost ~3 g CO₂e"). |

### 14.7 Part 7 — Engineering & Operations

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Edge-deployment patterns** | M | Engineering Lead | Cloudflare Workers, Vercel Edge, Deno Deploy specifics for components and tokens. |
| **Server-side rendering (SSR) deeper spec** | M | Engineering Lead | RSC, streaming SSR, hydration boundaries per component class. |
| **React Native / Capacitor cross-platform compatibility** | L | Engineering Lead | Per-component RN-compatibility rating; native bridge specs. |
| **Performance instrumentation in CI** | M | Engineering Lead | Lighthouse / WebPageTest integration in PR pipeline; budget enforcement. |
| **Supply-chain attestation chain (SLSA L4)** | M | Security Officer | Move from current SLSA L2/L3 to L4 (sealed builds). |
| **CI guard for stale DESIGN.md** | S | Engineering Lead | Run `pnpm build:design-md` in CI; fail if `git diff` is non-empty. |

### 14.8 Part 8 — Governance, Legal, Commerce

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Additional Asia-Pacific privacy laws** | M | General Counsel | Indonesia PDP Law, Thailand PDPA depth, Korea PIPA. |
| **US state-level privacy** (CA + 14 other states) | M | General Counsel | CCPA covered; add Virginia, Colorado, Connecticut, Utah, etc. |
| **AI-specific terms-of-service templates** | M | General Counsel | Customer-facing TOS additions for AI features (limits, liability). |
| **Data Processing Agreement template per region** | M | General Counsel | Generators for VN / EU / US / SG / JP variants. |

### 14.9 Part 9 — AI Prompt Library & Workflows

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Multi-agent orchestration patterns** | L | AI/Ethics Lead + Engineering Lead | When multiple agents collaborate (planner + executor + reviewer); coordination protocols. |
| **Prompt-template inheritance system** | M | AI/Ethics Lead | Base-template inheritance to reduce duplication across similar prompts. |
| **Prompt-eval golden datasets** | L | Research Lead | Curated evaluation datasets per domain (customer-service, code-gen, summarisation). |
| **Cost-per-prompt instrumentation** | S | AI/Ethics Lead | Token usage and cost per prompt logged; surfaced in dashboard. |
| **Agent-to-agent communication protocol** | M | AI/Ethics Lead | Beyond MCP — direct agent-to-agent message format for orchestrated workflows. |

### 14.10 Part 10 — Measurement, Research, Appendix

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Per-product baseline KPI targets** | M | Research Lead | Quantified targets per product cluster (B2B SaaS, fintech, etc.). |
| **Research-cohort recruiting playbook** | M | Research Lead | How to recruit diverse users (per [Part 5](part-5-accessibility-localization.md) §17.2); incentive guidelines. |
| **Continuous-discovery cadence** | M | Research Lead | Weekly user-touch protocol per the Teresa Torres model. |
| **NPS-driver deep dives** | S | Research Lead | Beyond NPS aggregate, identify and track top 5 driver dimensions. |

### 14.11 Part 11 — Enterprise Patterns & Page Templates

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **BulkImportPattern** (CSV/JSON/Excel) | M | Design Lead + Product PM | Multi-step import with column mapping, validation preview, dry-run. |
| **ImpersonationBannerPattern** | S | Design Lead + Security Officer | Sticky banner shown when admin is impersonating user. |
| **BillingCheckoutPattern** | M | Design Lead + Product PM | Checkout-flow pattern for plan upgrade / paid features. |
| **BulkSchedulingPattern** | M | Design Lead + Product PM | Batch schedule across multiple resources / dates. |
| **DataExplorerPattern** (pivot + filter + chart) | L | Design Lead + Product PM | BI-style data exploration UI; composes [Part 12](part-12-advanced-components.md) §3 and [Part 3g](part-3g-visualization.md). |
| **JobsQueuePattern** | M | Design Lead | Background-job queue UI with progress, cancel, retry, requeue. |
| **NotificationPreferencesPattern** | M | Design Lead | Per-category × per-channel preferences UI. |
| **AccessReviewPattern** | M | Design Lead + Security Officer | Periodic access-review workflow per [Part 11](part-11-enterprise-patterns.md) §5.10. |
| **GenerationHistoryPattern** (AI) | M | Design Lead + AI Lead | History of AI-generated content, with regenerate / restore / fork. |
| **ExperimentBannerPattern** (A/B) | S | Design Lead | Banner for users in an experiment, with opt-out where ethical. |
| **MagicLinkSignInPattern** | S | Design Lead + Security Officer | Email-link auth flow patterns. |
| **PaywallPattern** | M | Design Lead + Product PM | Soft paywall, hard paywall, freemium-tier patterns. |
| **Shneiderman 8-rules mapping** | S | Design Lead | Add a §X subsection mapping each Shneiderman golden rule to existing patterns; closes audit B7.12. |

### 14.12 Part 12 — Advanced Component Library (Tier 2)

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **ColorPicker** (full spec) | M | Design Lead | Color palette + custom hex / OKLCH; a11y considerations. |
| **ImageEditor** (crop / rotate / annotate) | L | Design Lead | Avatar-style and rich-image editing. |
| **Map.Visualization** | L | Design Lead | Leaflet / MapLibre / Mapbox-GL integration; markers, layers, a11y alternatives. |
| **Form.Builder** | L | Design Lead + Product PM | Customer-configurable form-building UI. |
| **Survey.Builder** | L | Design Lead + Product PM | Question types, branching, response collection. |
| **PDF.Viewer + annotator** | M | Design Lead | In-product PDF view + annotation. |
| **Audio.Recorder + Player** | M | Design Lead | Voice-note recording, playback with waveform. |
| **Video.Player + chapters** | M | Design Lead | Branded video playback with transcript and chapters. |
| **Spreadsheet.Editor** | XL | Design Lead | Excel-like editing surface (most complex Tier-2). |
| **Signature.Pad** | M | Design Lead | E-signature surface with audit-trail. |
| **Diff.Viewer** (text / code) | M | Design Lead | Side-by-side and inline diffs; syntax-aware. |
| **Tour.Overlay** | M | Design Lead | Multi-step product tour overlay ([Part 11](part-11-enterprise-patterns.md) §8.2). |
| **Combobox.Async** (advanced) | M | Design Lead | Server-driven combobox with debounce, paging, multi-select. |
| **Avatar.Stack + presence** | S | Design Lead | Already in [Part 12](part-12-advanced-components.md) §5.5 conceptually; expand to full spec. |
| **Tree.Hierarchical** (folder picker) | M | Design Lead | Folder/file picker with multi-level navigation. |
| **Onboarding.Tour deeper spec** | M | Design Lead | Beyond pattern in [Part 11](part-11-enterprise-patterns.md) §8.2 — full component spec. |

### 14.13 Part 13 — Theming, White-Label & Embedding

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **AI-assisted theme generator** | M | Design Lead + AI Lead | "Generate theme from logo" — extracts palette, validates contrast, drafts white-label theme. |
| **Multi-tenant theme catalogue** | M | DesignOps Lead | Customer-facing browsable theme catalogue. |
| **Theme versioning UX in customer portal** | S | DesignOps Lead | Customer self-service rollback, scheduled publish. |
| **Per-section theme overlays** | M | Design Lead | Allow theme variation for, e.g., a single page or wizard. |

### 14.14 Part 14 — Content Design & UX Writing

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Content style guide PDF generator** | S | Content Designer | Auto-generated brand-applied style guide PDF for external sharing. |
| **Locale-specific microcopy catalogues** | L | Content Designer + Locale Stewards | Beyond bilingual EN/VN; full catalogues per active locale. |
| **AI-content review patterns** | M | Content Designer + AI Lead | Patterns for human-in-loop review of AI-drafted copy. |
| **Microcopy A/B testing framework** | M | Content Designer + Research Lead | Infrastructure for A/B testing copy variants. |

### 14.15 Part 15 — Design System Tooling

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Performance-budget tooling spec** | M | Engineering Lead | CI integration; per-component / per-page budgets. |
| **Telemetry-event registry tool** | M | Engineering Lead | Catalogue of every emitted event, with schemas. |
| **Visual-regression diff explainer** | M | Engineering Lead | Augment Chromatic with semantic diff explanations (AI-augmented). |
| **CLI plugin marketplace** | M | Engineering Lead | Third-party CLI plugins for product-specific scaffolding. |
| **VS Code DS-aware refactoring** | M | Engineering Lead | "Refactor to use Stack" / "Extract pattern" code-actions. |
| **Per-product DS audit dashboard** | M | DesignOps Lead | Per-product [Part 16](part-16-adoption-designops.md) maturity score with drill-down — integrated with §10 audit outputs. |
| **DESIGN.md generator extensions** | S | Engineering Lead | Beyond §11: support per-vertical-pack `DESIGN.md` slices, watch-mode for local dev. |

### 14.16 Part 16 — Adoption Playbook & DesignOps

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Detailed migration codemods** | L | Engineering Lead | Per-source-DS codemod libraries (one-shot transformations). |
| **Ambassador playbook templates** | S | DesignOps Lead | Templates for common ambassador activities. |
| **Year-end adoption-leaderboard format** | S | DesignOps Lead | Annual public ranking of products by adoption maturity. |
| **DesignOps cost / value model** | M | DesignOps Lead + Founder | Quantified ROI of design-system investment. |

### 14.17 Part 17 — Component Lifecycle & Maturity Model

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Telemetry schema for lifecycle events** | M | Engineering Lead | Standard event names and payloads for stage transitions. |
| **Sunset post-mortem template** | S | DesignOps Lead | Required template after every component sunset. |
| **Lifecycle dashboard widget specs** | S | DesignOps Lead | Per-product lifecycle dashboard layouts. |
| **Forking governance** | M | Engineering Lead | Tighter rules for product-team forks; convergence playbook. |

### 14.18 Part 18 — Documentation Site & Component Catalog

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Per-content-type page templates** | M | Design Lead + Engineering Lead | Templates for tutorial, how-to, reference, explanation (Diátaxis quadrants). |
| **AI-augmented search** | M | Engineering Lead + AI Lead | Semantic search beyond keyword (Algolia + LLM re-ranker). |
| **In-product docs panel** | M | Design Lead | Slide-out docs reading inside product surfaces. |
| **Personalised docs experience** | M | Engineering Lead | Per-role tailored landing; remembered context. |

### 14.19 Part 19 — Industry Vertical Packs

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **HR Tech vertical pack** | L | Vertical-pack maintainer | Recruiting, performance, payroll surfaces; OFCCP / GDPR-employees / Vietnam Labor Code. |
| **Real Estate vertical pack** | L | Vertical-pack maintainer | Listings, transactions, tenant management; RESPA / fair-housing. |
| **Energy & Utilities vertical pack** | L | Vertical-pack maintainer | Meter readings, billing, outage management; NERC / ENTSO-E. |
| **Telco vertical pack** | L | Vertical-pack maintainer | Service provisioning, CDR billing, network ops; CPNI / GDPR-telco. |
| **Hospitality vertical pack** | L | Vertical-pack maintainer | Booking, check-in, guest services; PCI-DSS for hotels. |
| **Vertical-pack composition recipes** | M | Vertical-pack maintainers | When customers operate in two verticals (e.g., fintech-for-healthcare). |

### 14.20 Part 20 — Layout & Responsive System

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **More container-query recipes** | M | Design Lead | Curated recipe book for common layout-vs-container scenarios. |
| **Mobile-specific layout patterns** | M | Design Lead | Swipe sheets, pull-to-refresh patterns at primitive level. |
| **Print-layout primitives** | M | Design Lead | `<PrintPage>`, `<Watermark>`, `<HeaderRepeat>` primitives for print surfaces. |
| **Layout primitives for AR/VR surfaces** | L | Design Lead | 3D-space layout for surfaces in [Part 4](part-4-surfaces.md) §8. |
| **Asymmetric / editorial layouts** | M | Design Lead | Magazine-style layouts for content-marketing surfaces. |

### 14.21 Cross-cutting expansions

These don't belong to one part; they touch multiple.

| Expansion | Effort | Owner | Notes |
|---|---|---|---|
| **Glossary deep expansion** (500+ terms) | M | Research Lead | Currently ~250 terms across [Part 10](part-10-measurement-research-appendix.md) §11 + audit §17. |
| **Decision log of trade-offs** | S | Founder | "Why we chose X over Y" — preserves institutional memory. |
| **Contribution-credit registry** | S | DesignOps Lead | Every contributor named and credited per part. |
| **Reference-implementation gallery** | M | Design Lead | Live demos of every pattern and template. |
| **Annual practitioner survey** | M | Research Lead | Survey internal users; track satisfaction over time. |
| **Audit history register** | S | DS Lead | `_audit/_history.md` — running log of every audit. |
| **Audit trends visualisation** | M | DS Lead | `_audit/_trends.md` — per-criterion trend lines across audits. |
| **DESIGN.md generator** | S | Engineering Lead | The script in §11 — already shipped at `scripts/build-design-md.mjs`. |

### 14.22 Effort scale

- **S** = Small: ≤ 2 weeks, single contributor.
- **M** = Medium: 2–8 weeks, single contributor or small team.
- **L** = Large: 2–6 months, multi-person.
- **XL** = Extra-large: > 6 months; warrants its own multi-RFC programme.

---

## 15. Cross-cutting commitments preserved across releases

Some commitments survive every version bump. They are the doctrine's identity.

1. **Vietnamese is first-class.** Every change ships VN counterpart or explicit deferral.
2. **Bilingual EN+VN minimum.** No customer-facing artefact ships English-only.
3. **WCAG 2.2 AA minimum.** No part regresses the accessibility floor.
4. **Brand anchors immutable.** Master-index §Anchors and slogan never change.
5. **Voice principles immutable.** [Part 1](part-1-foundations.md) §3 four pillars; [Part 1](part-1-foundations.md) §16 anti-patterns.
6. **Stable file numbering.** Parts 1–20 keep their numbers forever.
7. **DTCG-native tokens.** Token format follows DTCG specifications.
8. **Cross-references repaired on every move.** No orphan link allowed.
9. **Open contribution.** Anyone may file an RFC; reviewers are rotated.
10. **Calm tech default.** Per [Part 6](part-6-ai-ethics-sustainability.md) §10. New patterns honour the principle.
11. **Audit rigour.** Every minor/major release re-runs the §10 audit and publishes deltas.
12. **DESIGN.md is generated, not hand-edited.** The agent rules file is rebuilt from doctrine + tokens + manifest on every release.

---

## 16. Operating cadence — the quarterly rhythm

| Cadence | Activity | Owner |
|---|---|---|
| Daily | Editorial fix releases (x.y.Z) | Anyone with PR access |
| Weekly | RFC-status sync | DS Lead |
| Monthly | Adoption-metric review | DesignOps Lead |
| Monthly | Lifecycle-stage review | Engineering Lead |
| Quarterly | Doctrine review (per part); update audit's expansion list (§14) | Chairs by rotation |
| Quarterly | Translation-freshness audit | Content Designer |
| Quarterly | Public roadmap update | DS Lead |
| Quarterly | DYNAMIC-criteria re-score per §3.2 | DS Lead + AI agent |
| Per release | DESIGN.md regenerated and committed (§11) | Author of the release |
| Per release | Audit re-run for Minor / Major releases (§10.8) | DS Lead + AI agent |
| Annually | Audit refresh; major-cycle planning | DS Lead + Founder |
| Annually | Practitioner survey | Research Lead |
| Annually | Full §10 audit (Mode S) | DS Lead + AI agent |

---

## 17. Glossary

The [Part 10](part-10-measurement-research-appendix.md) §11 glossary (200+ terms) is supplemented here for terms introduced by the audit framework.

- **Audit-extension marker** — HTML comment indicating where an audit appended content into a previously-existing part.
- **Cluster (A–G)** — the seven purpose-based reading clusters in `00-index.md`. A navigation aid; not a hierarchy.
- **Confidence (Lo / Med / Hi)** — the agent's self-rating of its confidence in a score; Lo always flags for human review.
- **DESIGN.md** — the generated AI-agent rules file at the repo root; refreshed by `scripts/build-design-md.mjs` (§11).
- **Doctrine** — collective noun for the 20 parts plus `00-index` plus this document.
- **Doctrine RFC** — Request-for-Comments against the doctrine itself, as opposed to a product RFC. Subtypes per [Part 8](part-8-governance-legal-commerce.md) §16.
- **DTCG** — Design Tokens Community Group — W3C community group that publishes the design-tokens specification (2025.10 stable since 28 October 2025).
- **DYNAMIC criterion** — audit criterion expected to evolve in 1–3 years; revalidated annually.
- **Effort scale (S/M/L/XL)** — the per-expansion sizing in §14 and §14.22.
- **Enterprise-grade** — meeting the §5.5 minimum-passing thresholds.
- **FIXED criterion** — audit criterion expected to remain valid ≥ 5 years; year-over-year trend is meaningful.
- **HEART** — Google's UX metrics framework: Happiness, Engagement, Adoption, Retention, Task success.
- **Implementation gap** — when `Design System/src/` ships less than the doctrine specifies. Tracked per §2.3.
- **Mode S / Mode P** — audit mode: doctrine self-audit / live-product audit.
- **MCP** — Model Context Protocol — open standard from Anthropic (Nov 2024) for connecting AI agents to data sources/tools.
- **Maturity tier (L1–L5)** — the five organisational maturity tiers in §5.4.
- **Operator (of an agent)** — the human who invokes an AI agent against the doctrine.
- **Recommendation Card** — a structured remediation proposal per §9.2.
- **SUS** — System Usability Scale — 10-item Likert questionnaire yielding a 0–100 score (industry mean = 68).
- **Tier (A0–A3)** — agent authorisation tier per §13.1.

---

## 18. Emerging trends to watch

Trends are rapid; treat this section as living and review every 6 months.

1. **Design Tokens Specification 2025.10 (W3C DTCG) — stable.** Vendor-neutral JSON format adopted by the major DS vendors. **Action:** standardise all client deliveries on DTCG. (DYNAMIC — affects A1.8.)
2. **Model Context Protocol (MCP) as the design↔code bridge.** Released by Anthropic November 2024; adopted across IDEs through 2025; Figma's Dev Mode MCP server now writes back to canvas; Carbon, Polaris, Spectrum all ship MCP servers. **Action:** offer "MCP-readiness" as a service. (DYNAMIC — affects A10.1.)
3. **Agentic UX as a design discipline.** Microsoft Agent UX Design Principles (Apr 2025); Salesforce paradigm shift to agentic experience design; pattern libraries emerging. (DYNAMIC — affects B3.8.)
4. **Headless / primitives + styled-layer architecture.** Adobe's React Aria + React Spectrum split is the architectural reference. (DYNAMIC — affects A2.5.)
5. **Design Engineering as a recognised discipline.** zeroheight 2026 report shows hybrid roles grew from 3% to 8% YoY.
6. **Material 3 Expressive (May 2025).** Spring-physics motion, expanded shape system, variable-font typography, dynamic color across Wear OS.
7. **Apple Liquid Glass (iOS 26 / 2025–2026).** Translucency, depth, dynamic tinting. visionOS guidelines folded into HIG.
8. **WCAG 2.2 → WCAG 3.0.** WCAG 2.2 became ISO/IEC 40500:2025; WCAG 3.0 working draft updated September 2025. Plan migration paths now.
9. **Regulatory pressure on dark patterns.** EU EAA legally applicable June 2025; FTC v. Amazon $2.5B settlement Sept 2025; EU Digital Fairness Act expected 2026 draft. Dark-pattern avoidance is now a **legal compliance** issue, not just an ethical one.
10. **AI-era UX metrics.** Dual evaluation (human experience + agent effectiveness), trust calibration, override rate, hallucination rate, "time-to-good-output". (DYNAMIC — affects B10.7.)
11. **Spatial computing & wear-class form factors.** visionOS, Quest, Wear OS 6, and Pixel Watch 4 expand the platform-parity requirement (A6.3 / A6.6).

---

## 19. Acknowledgements & references

The doctrine and the audit framework reference and learn from: IBM Carbon Design System, Atlassian Design System, Material Design 3 / Material 3 Expressive, Adobe Spectrum, Shopify Polaris, GitHub Primer, Microsoft Fluent UI, SAP Fiori, ServiceNow Now, Workday Canvas, Vercel Geist, Linear, Stripe, Apple HIG (incl. visionOS / Liquid Glass), Brad Frost (Atomic Design), Heydon Pickering & Andy Bell (Every Layout), Sarah Richards (Content Design), Jakob Nielsen & NN/g (10 Usability Heuristics, HEART research), Kerry Rodden et al. (HEART framework), Jeff Sauro & James R. Lewis (SUS benchmarks), John Brooke (SUS), Diátaxis (documentation framework), Sparkbox / USWDS / Iress maturity models, the W3C / WAI / DTCG, the Unicode Consortium, Anthropic (MCP), and the broader design-systems community.

Where the doctrine departs from these references, the departures are documented in the relevant part with rationale. Where it inherits, the references are cited.

### Standards & specifications anchored in this document

- W3C DTCG Format Module 2025.10 (first stable, 28 October 2025)
- WCAG 2.2 / ISO/IEC 40500:2025
- Anthropic Model Context Protocol (Nov 2024)
- EU AI Act (entry into force 1 August 2024; full applicability 2 August 2027)
- European Accessibility Act (legally applicable 28 June 2025)
- Vietnam PDPL Law 91/2025/QH15 (effective 1 January 2026)
- Sustainable Web Design Model v4 (14 July 2025)
- C2PA Technical Specification v2.2 (1 May 2025)
- MessageFormat 2.0 (CLDR 47 / ICU 77, March 2025)
- ISO/IEC 27001:2022 (transition deadline 31 October 2025)
- ISO/IEC 42001:2023 (AI management, in force)

---

*End of audit framework, operating guide, and roadmap.*
*The current docs are the single source of truth. When in doubt, read the docs.*
*— Hiện Thực Hoá Ý Chí.*
