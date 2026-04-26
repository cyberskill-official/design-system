# The CyberSkill Global Design System

## Part 10 — Measurement, Research, Appendix

*The system as evidence. This Part documents how CyberSkill measures what it ships — adoption KPIs, telemetry, research cadence, methodology — and provides the appendix material the system depends on: the 20-system competitive benchmark matrix, the glossary of 200+ terms, the authoritative references list, the evidence log, and the change log.*

---

## Introduction — what measurement owes the system

A design system without measurement is a style magazine. It can be admired; it cannot be improved. CyberSkill commits to measurement at five levels:

1. **Adoption** — how widely the system's tokens, components, and patterns are used.
2. **Quality** — accessibility violations, performance regressions, carbon overshoots.
3. **Outcomes** — task completion, error rate, satisfaction, NPS, retention.
4. **Inclusion** — coverage across cohorts that conventional product analytics under-represents (screen-reader users, low-bandwidth users, elderly users, non-dominant-language users).
5. **Compliance** — PDPL DSR SLA, AI calibration drift, EU AI Act logging completeness.

Each level has a defined metric, a target, a collection method, and a dashboard. Measurement is operational, not retrospective.

Governing references for this Part: **PDPL Art. 14** (data subject rights drive telemetry constraints); **PDPL Art. 21** (DPIA-driven retention); **EU AI Act Art. 12** (record-keeping for high-risk systems; applicable from 2 August 2026); **WCAG 2.2** (accessibility metric basis); **SWDM v4** (carbon measurement); **Microsoft Inclusive Design Toolkit** (cohort definition); **NIST SP 800-63B** (authentication metric basis where applicable).

---

## 1. Adoption KPIs

The system's adoption is measured by six KPIs published quarterly on the public CyberSkill dashboard:

| KPI | Definition | Target | Collection |
|---|---|---|---|
| **Token adherence** | % of components consuming design tokens vs hard-coded values | ≥ 95 % | Static-analysis bot over consumer codebases that opt into reporting |
| **Component adoption** | % of surfaces using `@cyberskill/react` (or platform equivalents) primary components | ≥ 80 % per priority surface | Component-usage telemetry |
| **A11y score** | 0 critical / 0 serious axe-core violations across Storybook stories AND consumer surfaces | 0 / 0 | CI + production RUM |
| **Core Web Vitals** | LCP p75 / INP p75 / CLS p75 against the budgets in [Part 7](part-7-engineering-operations.md) §10 | LCP < 2.5 s; INP < 200 ms; CLS < 0.1 | RUM via web-vitals + OpenTelemetry |
| **Carbon per surface** | gCO₂ per page view per surface vs SWDM v4 budgets | ≤ budget per [Part 6](part-6-ai-ethics-sustainability.md) §13 | CO2.js v0.18+ RUM |
| **Localisation coverage** | % of UI strings translated to each supported locale | 100 % for vi, en; ≥ 95 % for tier-1; ≥ 80 % for tier-2 | Translation-memory diff |

A KPI in red triggers a remediation backlog item with an assigned owner and due date.

---

## 2. Telemetry schema

### 2.1 Event shape

```json
{
  "event": "component.used",
  "component": "Button",
  "variant": "primary",
  "size": "md",
  "locale": "vi-VN",
  "app_version": "1.12.0",
  "system_version": "2026.04",
  "a11y_mode": false,
  "reduced_motion": false,
  "session_id_hashed": "8f4e2a…",
  "timestamp": "2026-04-25T09:15:30Z"
}
```

### 2.2 PII exclusions per PDPL Art. 14

The schema **explicitly excludes**:

- **No user identifier.** No user id, email, phone, CCCD, or any direct identifier at rest.
- **No content.** No prompt text, no form values, no chat messages, no document content.
- **No IP address at rest.** IP is used only for routing during the request lifetime; never persisted alongside the event.
- **Hashed session identifier only.** SHA-256 of (session token + system salt) retained ≤ 30 days.

### 2.3 PDPL access right

Per PDPL Art. 14, the user can request **their own telemetry** via `/privacy` self-service. The system retrieves entries matching the user's hashed session id (when the user is logged in, the session id is reversibly mapped server-side; the mapping is destroyed at 30 days).

### 2.4 Opt-in default

Telemetry is **opt-in** at first use. The opt-in surface uses the system's consent components ([Part 3b](part-3b-inputs.md) §12 Checkbox + [Part 3e](part-3e-feedback.md) §11 ConfirmationDialog consent variant) — explicit, unbundled, never pre-checked.

### 2.5 Scope of collection

| Category | Collected | Notes |
|---|---|---|
| Component usage | Yes (opt-in) | `component.used` event |
| Core Web Vitals | Yes | LCP / INP / CLS via web-vitals |
| Errors | Yes | Hashed; redacted; no content |
| Carbon | Yes | CO2.js per page view |
| Personal data | **No** | Never |
| Health, financial, biometric | **No** | Never |

---

## 3. Research cadence

### 3.1 Weekly — guerilla

- **5 users × 30 minutes** per surface in active development.
- Synchronous, recorded with consent.
- Prototype-tested before code freeze.

### 3.2 Quarterly — deep

- **12–20 participants**.
- Structured tasks with think-aloud.
- Eye-tracking where relevant (and where ethically sound — eye-tracking is used only with explicit consent and never collects gaze for non-research purposes).
- Synthesised into a research memo + JTBD updates.

### 3.3 Annual — benchmark

- Full benchmark vs the reference set (§10).
- Regulatory check vs current PDPL, EU AI Act, EAA status.
- Public transparency report with key findings.

### 3.4 Continuous — production telemetry

- Real-User Measurement of CWV + carbon + a11y.
- Component-usage analytics (opt-in).
- DSR SLA monitoring.

---

## 4. Inclusive research cohorts

The system's research deliberately includes cohorts that conventional product analytics under-represents:

- **Screen-reader users** — NVDA, JAWS, VoiceOver, TalkBack — recruited via accessibility-community partners and compensated at parity.
- **Cognitive-disability users** — recruited via partner organisations; sessions designed to respect cognitive load (longer breaks; written + verbal task descriptions; flexible scheduling).
- **Low-bandwidth users** — recruited from rural Vietnamese provinces (Hà Giang, Lào Cai, Sơn La, Đắk Lắk) and from migrant-worker communities; sessions conducted on mid-range Android devices over 3G / 4G.
- **Elderly users** — 60+ years old; sessions accommodate slower reading pace and larger type sizes.
- **Non-dominant-language users** — Vietnamese regional dialects (Northern, Central, Southern); migrant communities working in Vietnamese; non-Vietnamese speakers of supported locales.
- **Motor-disability users** — switch users; voice-control users; one-handed users.

Cohort recruitment is documented per study; compensation parity verified.

---

## 5. Usability testing methodology

### 5.1 Task-based testing

- Define **scenarios** (not feature lists) representing real user goals.
- Define **success criteria** per scenario (binary completion + soft signals).
- Recruit **representative participants**.
- Conduct **think-aloud** sessions.

### 5.2 Metrics collected

- **Task-completion rate** — binary success.
- **Time-on-task** — for benchmarking only; **never** as a goal metric ([Part 6](part-6-ai-ethics-sustainability.md) §11 humane-design).
- **Error rate** — number of recoverable + non-recoverable errors per task.
- **Satisfaction** — SUS + UMUX-Lite + qualitative feedback.

### 5.3 Reporting

A research memo per study with: scenario list, metrics, findings, recommendations, and **counter-findings** (results that disconfirm the hypothesis). Counter-findings are explicit; researchers are evaluated on the quality of their thinking, not the comfort of their conclusions.

---

## 6. Survey instruments

The system uses standard, validated instruments:

- **SUS — System Usability Scale** — 10 items; widely benchmarked.
- **UMUX-Lite** — 2 items; correlates well with SUS.
- **NPS — Net Promoter Score** — sampled with privacy-respecting cohort selection (no over-weighting active users).
- **NASA-TLX** — for cognitive-load assessment of complex surfaces.
- **Trust scale** — adapted from Hoffman et al. for AI-surface trust.

Vietnamese translations of all instruments verified by locale stewards ([Part 1](part-1-foundations.md) §13.9).

---

## 7. Analytics taxonomy

### 7.1 Naming conventions

Events follow **noun-verb-qualifier**, lower-camelCase, dot-separated:

- `form.submitted.success`
- `form.submitted.failure`
- `modal.opened.destructive`
- `ai.response.accepted.highConfidence`
- `consent.changed.granted`
- `consent.changed.revoked`

### 7.2 Reserved global events

The system reserves event names with namespaces:

- `page.viewed`
- `error.shown`
- `ai.disclosed`
- `consent.changed`
- `audit.access`
- `dsr.requested`

### 7.3 Field types

Fields are **typed at compile time** via `@cyberskill/analytics`:

```ts
import { csTrack, type CsAnalyticsEvent } from '@cyberskill/analytics';

const event: CsAnalyticsEvent<'component.used'> = {
  event: 'component.used',
  component: 'Button',
  variant: 'primary',
  size: 'md',
  locale: 'vi-VN',
  // …
};
csTrack(event);
```

### 7.4 PII screening

A pre-emit hook scans every event payload for PII signatures (CCCD regex, phone-number regex, email regex, payment-card Luhn) and **drops the event** with a logged exception if any match. This is a defence-in-depth measure on top of the schema-level exclusions.

---

## 8. Event naming conventions

Beyond §7.1, names follow these rules:

- **Verbs in past tense** for completed actions (`submitted`, `opened`, `accepted`).
- **Verbs in present** for state changes still in flight (`opening`, `streaming`).
- **Object-of-action** as the subject (`form` not `user`; `modal` not `screen`).
- **Qualifier** as the suffix when meaningful (`success`, `failure`, `low`, `high`, `destructive`).
- **No PII in event names** — events refer to component classes, not specific instances.

---

## 9. Dashboards

### 9.1 Public sustainability dashboard

`https://cyberskill.com/sustainability` — shows per-surface carbon vs SWDM v4 budgets; updated daily.

### 9.2 Public AI transparency dashboard

`https://cyberskill.com/ai-transparency` — shows confidence calibration error per prompt; citation verification rate; HumanReviewGate throughput.

### 9.3 Public accessibility dashboard

`https://cyberskill.com/accessibility` — shows axe-core violation counts (0 critical / 0 serious target); SC 87-mapping conformance.

### 9.4 Internal product dashboards

Per-product dashboards in **Grafana + Prometheus** (metrics) and **Metabase** (product-usage queries); custom **D3** dashboards for component adoption.

### 9.5 PDPL DSR dashboard

DSR throughput; SLA compliance (≤ 72 hours); breakdown by right type. Required by [Part 8](part-8-governance-legal-commerce.md) §5.5 for operational accountability.

---

## 10. Benchmarking matrix — 20 systems

The full benchmark matrix compares CyberSkill against the reference set across 11 dimensions. Cells are summarised; the full data is in `docs/benchmark-2026.csv`.

| System | Tokens | DTCG 2025.10 | VN-first | WCAG 2.2 | EU AI Act | PDPL | Open-source | MCP-native | RFC 9457 | SWDM v4 | C2PA 2.2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **CyberSkill** | ✓ | **✓** | **✓** | **2.2 AA+** | **✓** | **✓** | ✓ | **✓** | **✓** | **✓** | **✓** |
| IBM Carbon | ✓ | partial | ✗ | AA | partial | ✗ | ✓ | ✗ | partial | partial | ✗ |
| Material 3 / Expressive | ✓ | partial | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Microsoft Fluent 2 | ✓ | partial | ✗ | AA | partial | ✗ | partial | ✗ | partial | ✗ | ✗ |
| Adobe Spectrum | ✓ | partial | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | partial |
| Shopify Polaris | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| GitHub Primer | ✓ | partial | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Salesforce SLDS | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | partial | ✗ |
| Ant Design | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Pinterest Gestalt | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Uber Base Web | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Nord / Redwood | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| SAP Fiori | ✓ | partial | ✗ | AA | partial | ✗ | ✗ | ✗ | partial | ✗ | ✗ |
| Workday Canvas | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Intuit Design System | ✓ | ✗ | ✗ | AA | ✗ | ✗ | partial | ✗ | ✗ | partial | ✗ |
| Mantine | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Chakra UI v3 | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Radix Themes | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| HeroUI (NextUI) | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Zendesk Garden | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Twilio Paste | ✓ | ✗ | ✗ | AA | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |

**Reading:** every major enterprise system covers tokens and WCAG 2.2 AA. CyberSkill's distinctive position is the **simultaneous** adoption of **DTCG 2025.10**, **Vietnamese-first**, **EU AI Act + PDPL compliance**, **MCP-native**, **RFC 9457**, **SWDM v4-measured**, and **C2PA 2.2-signed** — the combination is not matched.

---

## 11. Glossary — 200+ terms

A representative selection is given here; the complete glossary ships as `docs/glossary.csv` with a Vietnamese translation column and a citation column. The entries below are organised by domain.

### 11.1 Standards and regulation

- **APG** — ARIA Authoring Practices Guide (W3C).
- **ARIA** — Accessible Rich Internet Applications (W3C).
- **APCA** — Advanced Perceptual Contrast Algorithm.
- **C2PA** — Coalition for Content Provenance and Authenticity.
- **CCCD** — Căn cước công dân — Vietnam 12-digit citizen ID.
- **CCPA / CPRA** — California Consumer Privacy Act / Privacy Rights Act.
- **CLDR** — Common Locale Data Repository (Unicode Consortium).
- **CTIA** — Cross-border Transfer Impact Assessment (PDPL Art. 20).
- **DPDPA** — Digital Personal Data Protection Act (India, 2023).
- **DPIA** — Data Protection Impact Assessment.
- **DPO** — Data Protection Officer.
- **DSR** — Data Subject Request.
- **DTCG** — Design Tokens Community Group (W3C).
- **EAA** — European Accessibility Act (Directive (EU) 2019/882).
- **EN 301 549** — European accessibility standard providing presumption of conformity under EAA.
- **EU AI Act** — Regulation (EU) 2024/1689.
- **GDPR** — General Data Protection Regulation (EU).
- **GPAI** — General-Purpose AI (EU AI Act).
- **ICU** — International Components for Unicode.
- **ISO 42001** — AI Management System standard (2023).
- **JIS X 8341-3** — Japanese accessibility standard.
- **LGPD** — Lei Geral de Proteção de Dados (Brazil).
- **MCP** — Model Context Protocol.
- **MessageFormat 2.0** — Unicode CLDR message syntax (stable in CLDR 47 / ICU 77).
- **NIST SP 800-63B** — US digital-identity authentication guidelines.
- **OWASP LLM Top 10** — top LLM security risks.
- **PDPA** — Personal Data Protection Act (Singapore, Thailand).
- **PDP Law** — Indonesia personal-data protection law.
- **PDPL (Vietnam)** — Personal Data Protection Law (Law No. 91/2025/QH15).
- **PDPL (Saudi Arabia)** — Saudi Personal Data Protection Law.
- **PIPL** — Personal Information Protection Law (China).
- **PIPA** — Personal Information Protection Act (Korea).
- **PIPEDA** — Personal Information Protection and Electronic Documents Act (Canada).
- **RFC 9457** — Problem Details for HTTP APIs (IETF, July 2023).
- **SC** — Success Criterion (WCAG).
- **SLSA** — Supply-chain Levels for Software Artifacts.
- **SWDM** — Sustainable Web Design Model.
- **TIA** — Transfer Impact Assessment.
- **WCAG** — Web Content Accessibility Guidelines (W3C).
- **WebAuthn L3** — Web Authentication Level 3 (W3C).

### 11.2 Design system

- **Anchor token** — an immutable brand-defining token (Umber, Ochre).
- **Categorical palette** — discrete colour set for non-ordinal categories.
- **Container query** — CSS responsive primitive based on container size.
- **Dark mode (tonal-elevation)** — dark palette via L progression of warm hue, not inversion.
- **Display P3** — wide-gamut colour space supported in modern displays.
- **Diverging palette** — two ramps converging at a neutral midpoint.
- **DTCG 2025.10** — Design Tokens Format Module 2025.10 (W3C, 28 October 2025).
- **Endorsement lockup** — short-form product-mark co-locked with master mark.
- **Fluid typography** — `clamp(min, preferred, max)` typography scaling.
- **Logical properties** — direction-agnostic CSS (`padding-inline`, `margin-block-end`).
- **Master brand** — primary brand identity (CyberSkill).
- **Ochre** — primary brand accent `oklch(0.811 0.162 83.7)` / `#F4BA17`.
- **OKLCH** — polar form of Oklab colour space.
- **Sequential palette** — single-hue ramp for ordinal data.
- **Sub-brand** — endorsed functional domain inheriting the master contract.
- **Tonal elevation** — dark-mode strategy using surface-L progression.
- **Umber** — primary brand anchor `oklch(0.265 0.073 44.3)` / `#45210E`.
- **View Transitions API** — Web platform for cross-document and same-document route transitions.

### 11.3 Engineering

- **Biome** — Rust-based linter and formatter.
- **Changesets** — versioning + changelog tooling.
- **Chromatic** — visual-regression testing service.
- **CycloneDX** — SBOM standard format.
- **Lit 3** — modern Web Components framework.
- **MJML** — email-markup framework.
- **OpenAPI 3.1** — API specification standard.
- **OpenTelemetry** — observability standard.
- **pnpm** — strict, fast package manager.
- **Sigstore / cosign** — keyless artefact signing.
- **Style Dictionary v5** — token-build tool.
- **Tailwind v4** — utility-first CSS framework with `@theme` directive (released 22 January 2025).
- **Turborepo** — monorepo build orchestrator.
- **Vitest** — fast test runner.

### 11.4 Process

- **Acceptance rubric** — six-criterion pass/fail at delivery.
- **AGENTS.md** — open convention for AI agent instructions.
- **Decision card** — five-question gate per PR (safe / honest / usable / consistent / beautiful).
- **Job story** — *"When I … I want to … so I can …"* user-need format.
- **RFC** — Request For Comments; the system's proposal protocol.
- **Self-audit checklist** — author-side review prompts.
- **Surface brief** — one-page intent document opening every effort.

### 11.5 AI

- **AIDisclosureBadge** — universal AI-output marker.
- **AIIA** — AI Impact Assessment.
- **C2PAProvenanceBadge** — content-provenance verifier.
- **ConfidenceIndicator** — three-tier confidence display.
- **HumanReviewGate** — sensitive-output reviewer gate.
- **Prompt-to-component map** — authoritative mapping of prompts to consuming components.
- **Trust region** — content trust classification (`trusted-internal` / `trusted-customer` / `untrusted-external`).

### 11.6 Vietnamese-specific

- **Âm lịch** — Vietnamese lunar calendar.
- **Bạn** — second-person pronoun, default in product UI.
- **Be Vietnam Pro** — primary typeface (Lâm Bảo, Tony Le, ViệtAnh Nguyễn; SIL OFL 1.1).
- **CCCD** — Căn cước công dân — citizen ID.
- **Hiện Thực Hoá Ý Chí** — Vietnamese slogan; immutable form.
- **MST** — Mã số thuế — tax-ID number.
- **Stacked diacritic** — vowel carrying both quality diacritic and tone mark (*ắ*, *ễ*, *ự*).
- **Trang trọng-thân thiện** — formal-warm register; default for Vietnamese product UI.

*(The complete glossary contains 200+ entries across these and additional categories — Photography, Print, Video, Sound, Haptics, Research, Commerce, Auth, Telemetry. The full CSV ships at `docs/glossary.csv`.)*

---

## 12. Authoritative references

A representative bibliography is given here; the complete list ships as `docs/references.csv` with one row per source including URL, last-accessed date, and Part(s) where cited. The full list contains 300+ entries.

### 12.1 Standards and specifications

- W3C, *Web Content Accessibility Guidelines (WCAG) 2.2 Recommendation*, 5 October 2023. https://www.w3.org/TR/WCAG22/
- W3C, *What's New in WCAG 2.2*. https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- W3C, *ARIA Authoring Practices Guide*. https://www.w3.org/WAI/ARIA/apg/
- W3C, *WAI-ARIA 1.3*.
- W3C Design Tokens Community Group, *Format Module 2025.10*, 28 October 2025. https://www.w3.org/community/design-tokens/2025/10/28/
- W3C, *CSS Color Module Level 4*. https://www.w3.org/TR/css-color-4/
- W3C, *CSS Anchor Positioning* (draft).
- W3C, *Web Authentication Level 3*. https://www.w3.org/TR/webauthn-3/
- W3C, *View Transitions API* (Baseline Newly Available October 2025).
- IETF, *RFC 9457 — Problem Details for HTTP APIs*, July 2023. https://www.rfc-editor.org/rfc/rfc9457
- IETF, *RFC 7807 — Problem Details* (obsoleted by RFC 9457).
- IEEE, *7000-2021* (value-based system design).
- IEEE, *7001-2021* (transparency of autonomous systems).
- IEEE, *7010-2020* (wellbeing metrics).
- ISO/IEC, *ISO/IEC 42001:2023 — AI management system*. https://www.iso.org/standard/42001
- ISO/IEC, *ISO/IEC 27001:2022* (information-security management).
- C2PA, *Technical Specification v2.2*, 1 May 2025. https://c2pa.org/
- Unicode Consortium, *CLDR 47*, March 2025.
- Unicode Consortium, *MessageFormat 2.0 stable in CLDR 47 / ICU 77*. https://blog.unicode.org/
- ICU 77.
- OpenAPI Initiative, *OpenAPI 3.1*.
- SLSA, *Supply-chain Levels for Software Artifacts*. https://slsa.dev/

### 12.2 EU regulation

- European Commission, *Regulation (EU) 2024/1689 — EU AI Act*. Entered into force 1 August 2024.
- European Commission, *Directive (EU) 2019/882 — European Accessibility Act*. Enforcement 28 June 2025.
- DLA Piper, *EU AI Act penalty tiers*.
- AllAccessible, *EAA national penalties* (Germany, Italy, France).
- Davis Wright Tremaine, *EAA enforcement begins 28 June 2025*.

### 12.3 Vietnamese regulation

- LuatVietnam, *Personal Data Protection Law No. 91/2025/QH15*, passed 26 June 2025; effective 1 January 2026. https://luatvietnam.vn/
- Tilleke & Gibbins, *Decree 356/2025/ND-CP* — issued 31 December 2025; effective 1 January 2026.
- Tilleke & Gibbins; Mori Hamada & Matsumoto, *Cybersecurity Law 116/2025/QH15* — passed 10 December 2025; effective 1 July 2026.
- Acclime Vietnam, *Sensitive personal data under Decree 356/2025/ND-CP*.
- VNETWORK, *PDPL penalty summary*.
- Vietnam Law Magazine, *Resolution 57-NQ/TW* signed 22 December 2024 by General Secretary Tô Lâm.

### 12.4 Other privacy / accessibility regulation

- *PIPL* (China); *DSL*; *CSL*.
- *APPI* (Japan).
- *PIPA* (Korea).
- *PDPA* (Singapore).
- *Do-Not-Call registry* (Singapore PDPC).
- *PDPA* (Thailand).
- *PDP Law* (Indonesia).
- *DPDPA 2023* (India).
- *Saudi PDPL*.
- *UAE Federal Decree-Law 45 of 2021*.
- *LGPD* (Brazil).
- *CCPA / CPRA* (California).
- *PIPEDA* + *Quebec Law 25* (Canada).
- *Privacy Act* (Australia).
- *Privacy Protection Law 5741-1981* (Israel).
- *ADA Title III* (USA).
- *AODA* (Ontario, Canada).
- *JIS X 8341-3* (Japan).

### 12.5 Engineering ecosystem

- Tailwind CSS *v4.0 release*, 22 January 2025. https://tailwindcss.com/blog/tailwindcss-v4
- Storybook *v9 release*, June 2025. https://storybook.js.org/
- Storybook *v10 release*, November 2025 (ESM-only).
- React *19 GA*, 5 December 2024.
- Style Dictionary *v5*. https://styledictionary.com/
- Anthropic, *Model Context Protocol spec 2025-11-25*.
- Linux Foundation Agentic AI Foundation — MCP stewardship.
- agents.md, *AGENTS.md open convention*, 60,000+ repositories. https://agents.md/
- Sustainable Web Design, *SWDM v4*, 14 July 2025. https://sustainablewebdesign.org/
- The Green Web Foundation, *CO2.js v0.18+*.
- Lit 3 (Web Components framework).
- React Aria Components (Adobe).
- Radix Primitives.
- TanStack Table; react-virtuoso (virtualisation).
- Shiki (syntax highlighting).
- DOMPurify (HTML sanitisation).
- Vitest, Playwright, Chromatic, axe-core, bundlesize, Changesets, jscodeshift, Biome, pnpm, Turborepo.
- Sigstore + cosign + Rekor.
- CycloneDX.
- MapLibre + OpenMapTiles.
- @js-temporal/polyfill (Temporal API).

### 12.6 Typography

- *Be Vietnam Pro typeface* — Lâm Bảo, Tony Le, ViệtAnh Nguyễn. SIL OFL 1.1.
- *JetBrains Mono typeface* — Philipp Nurullin (project lead Konstantin Bulenkov), JetBrains. SIL OFL 1.1. https://jetbrains.com/lp/mono/

### 12.7 Reference design systems

- IBM Carbon Design System.
- Google Material Design 3 / Material 3 Expressive.
- Microsoft Fluent 2.
- Adobe Spectrum.
- Shopify Polaris.
- GitHub Primer.
- Salesforce Lightning Design System.
- Ant Design.
- Pinterest Gestalt.
- Uber Base Web.
- Nord / Redwood.
- SAP Fiori.
- Workday Canvas.
- Intuit Design System.
- Mantine.
- Chakra UI v3.
- Radix Themes.
- HeroUI (formerly NextUI).
- Zendesk Garden.
- Twilio Paste.

### 12.8 Books and frameworks

- Amber Case, *Calm Technology*, O'Reilly Media, 2015.
- Center for Humane Technology, *Humane Design Guide*.
- Microsoft, *Inclusive Design Toolkit*.
- Contributor Covenant 2.1.

### 12.9 Security frameworks

- MITRE ATLAS.
- OWASP LLM Top 10.
- NIST SP 800-63B.

*(The complete bibliography contains 300+ sources. The CSV at `docs/references.csv` carries last-accessed dates for every URL, the Part(s) citing each source, and a stable archival reference where applicable — e.g., archive.org snapshots for sources that may move.)*

---

## 13. Full evidence log

### 13.1 What the evidence log records

`docs/evidence.csv` contains one row per **factual claim** asserted in the document — Parts 1 through 10. Columns:

- **Claim id** — unique stable identifier.
- **Claim text** — the assertion.
- **Part / section** — where the claim appears.
- **Source URL** — primary reference.
- **Last fetched** — ISO date.
- **Verifier** — name of the person who verified.
- **Method** — how verification was done (read primary source / cross-reference / archival snapshot).

### 13.2 Why the evidence log

The evidence log allows future maintainers — and external auditors — to reproduce the verification of every factual claim. It is the operational substrate of the immutable-context discipline: when a regulatory date is updated by the regulator, the evidence log surfaces every claim downstream that needs to be re-verified.

### 13.3 Sample rows

| Claim id | Claim text | Part | Source URL | Last fetched | Verifier | Method |
|---|---|---|---|---|---|---|
| `pdpl-effective-date` | PDPL Law 91/2025/QH15 effective 1 January 2026 | 1 §1.5; 5; 6; 8 §5 | luatvietnam.vn | 2026-04-25 | locale-steward | primary |
| `wcag-22-rec-date` | WCAG 2.2 W3C Recommendation 5 October 2023 | 1; 5 §1 | w3.org/TR/WCAG22 | 2026-04-25 | a11y-lead | primary |
| `dtcg-2025-10` | DTCG Format 2025.10 published 28 October 2025 | 2; 7 §3 | w3.org/community/design-tokens/2025/10/28/ | 2026-04-25 | tokens-lead | primary |
| `swdm-v4-release` | SWDM v4 released 14 July 2025 | 6 §13 | sustainablewebdesign.org | 2026-04-25 | sustainability-lead | primary |
| `c2pa-22-release` | C2PA Technical Specification v2.2 published 1 May 2025 | 6 §16; 3h §12 | c2pa.org | 2026-04-25 | provenance-lead | primary |
| `mcp-spec-version` | MCP spec 2025-11-25 stewarded via Linux Foundation Agentic AI Foundation | 1 §4.8; 7 §14; 9 §11 | modelcontextprotocol.io | 2026-04-25 | agents-lead | primary |

*(The complete evidence log contains entries for every dated claim and every quoted source language across the 17 files.)*

---

## 14. Change log

### 14.1 Document-level change log

The document-level changelog tracks substantive changes to the system as a whole — versioning, scope changes, regulatory updates that ripple across multiple Parts. Stored at `CHANGELOG.md` at the repository root.

```markdown
# Changelog

## [Unreleased]

## [2026.04] — 2026-04-25
- Initial publication of the comprehensive document.
- All 10 Parts (with Part 3 split into 3a-3h) at full publication depth.
- Evidence log populated for all dated claims.

## [2026.01] — 2026-01-15 (planned cycle)
- Track PDPL effective-date entry into operational compliance.
- Verify Decree 356/2025/ND-CP cross-references.
- Update the Vietnam jurisdictional cell of the privacy matrix per first-quarter regulatory experience.
```

### 14.2 Per-package changelogs

Per-package changelogs at `packages/{name}/CHANGELOG.md`, generated from Changesets. Drives release notes.

### 14.3 Per-prompt changelog

Per-prompt changelog within the YAML's `changelog` field ([Part 9](part-9-ai-prompt-library.md) §1).

### 14.4 Per-RFC change record

Each RFC has an outcome section recording the decision, the implementer, and the merge SHA.

---


## 15. Operational metrics added by Parts 11–20

*Forward-references to metrics defined in their owning parts; consolidated here for the analytics team to wire into one dashboard.*

### 15.1 Adoption maturity metrics (forward to Part 16 §1.5)

- Per-product maturity score (0–4); [Part 16](part-16-adoption-designops.md) §1.1 levels.
- Aggregate firm-wide maturity (revenue-weighted average).
- Quarter-over-quarter level changes (number of products moving up vs down).
- Component-coverage ratio per product.
- Token-coverage ratio per product.
- Deprecated-component instance count per product.
- Office-hour attendance per product.
- Contribution rate per product.
- Internal NPS per product.

Surfaced in DesignOps dashboard ([Part 15](part-15-tooling.md) §11). Aggregated into the firm-wide trajectory in [Part 16](part-16-adoption-designops.md) §1.5.

### 15.2 Component-lifecycle metrics (forward to Part 17 §6)

- Components per stage (alpha / beta / GA / deprecated / sunset).
- Time-in-stage per component (median, p95).
- Promotion velocity (components reaching GA per quarter).
- Deprecation burn-down (deprecated-component usage decline over time).
- Sunset compliance (zero use by sunset date).
- Stalling indicator (components in alpha > 26 weeks; in beta > 52 weeks).

Surfaced in DesignOps dashboard. Per-product view also available ([Part 17](part-17-component-lifecycle.md) §7).

### 15.3 Tooling metrics (forward to Part 15 §10)

- Figma plugin install-base (number, % of designers).
- Figma plugin invocations (token-sync, content-insert, a11y-check) per week.
- IDE extension installs and weekly-actives.
- CLI scaffolder runs by subcommand.
- Code Connect coverage (% GA components with mapping).
- DocSearch query volume; zero-result-query count.
- Telemetry coverage (% products emitting standard events).

### 15.4 Theme & density telemetry (forward to Part 13 §8)

- Theme distribution across users (light / dark / HC / sepia / WL-{tenant}).
- Density distribution (compact / cozy / comfortable).
- Theme-switch frequency.
- Embedded-mode usage by mode.

### 15.5 Content metrics (forward to Part 14)

- Microcopy catalogue coverage per product.
- Translation freshness (% strings translated in past 90 days).
- Banned-phrase regressions detected per release.
- Glossary adherence score.

### 15.6 Aggregation cadence

| Metric class | Cadence | Owner |
|---|---|---|
| Adoption maturity | Quarterly | DesignOps |
| Lifecycle | Daily (telemetry); Quarterly (review) | Engineering Lead |
| Tooling | Daily | Engineering Lead |
| Theme & density | Daily | Design Lead |
| Content | Per-release | Content Designer |

### 15.7 Cross-cutting

A single DesignOps dashboard ([Part 15](part-15-tooling.md) §11) aggregates all of these. Each metric links to source-of-truth telemetry and to the part defining it.

---

## 16. Measurement & research framework consolidation

*Five sub-frameworks; one source of truth.*

The earlier sections of this Part defined the metric inventory (§7) and the dashboards (§9). This section formalises **the rituals around the metrics** — how they are chosen, paired with research, correlated to business outcomes, and validated. Without these rituals, metrics turn into wallpaper; with them, every metric has an owner, a hypothesis, and a decision attached.

### 16.1 HEART — Goals → Signals → Metrics formal map

The HEART framework (Kerry Rodden et al., Google Research, 2010) is the doctrine's macro-measurement spine. For every product cluster — and every major feature within a cluster — a **Goals-Signals-Metrics map** is filed with the feature spec.

**Map shape:**

| HEART dimension | Goal (qualitative) | Signal (observable) | Metric (countable) | Threshold |
|---|---|---|---|---|
| Happiness | "Customers feel the product respects their time" | Voluntary feedback positive sentiment | NPS quarterly | ≥ 40 |
| Engagement | "Customers return to do non-trivial work" | Sessions ≥ 10 min | Median session duration | ≥ 8 min |
| Adoption | "New customers reach first value within 3 days" | Activation event fired | % new customers activated within 3 days | ≥ 70% |
| Retention | "Active customers stay active" | Returning weekly visit | Week-2 retention | ≥ 60% |
| Task success | "Customers complete the primary task without abandoning" | Task completion event | % tasks completed | ≥ 85% |

A feature may map to all 5 HEART dimensions or to a subset — but every feature spec must declare which dimensions it intends to move and how. Filed in the spec's `## Measurement` section.

**Map filing locations:**

```
{product-repo}/specs/{feature}.md   ← per-feature map (lives with the feature)
{ds-repo}/Design System/docs/_audit/heart-maps/   ← per-product cluster aggregate (this repo)
```

**Cadence:** Maps are reviewed quarterly per §16.7 below. Map drift (signals firing but goals unmet, or metrics moving without signal causation) triggers a research investigation (§16.4).

### 16.2 Business-KPI correlation framework

Adoption and product-quality metrics are means; **business KPIs are ends**. The correlation framework links them.

**Three correlation classes:**

| Class | Relationship | Example | Validation |
|---|---|---|---|
| **Direct** | Metric x → KPI y is causal and defensible | Coverage % ↑ → time-to-ship ↓ | Pre/post measurement on a single migration |
| **Indirect** | Metric x → KPI y via mediator z | Adoption ↑ → CWV ↑ → conversion ↑ | Path analysis with mediator measured separately |
| **Correlated only** | Both move together but causation unproven | Detachment rate ↓ alongside team-NPS ↑ | Reported as observational; never actioned without RCT |

**The four anchor correlations the doctrine commits to tracking:**

1. **Adoption % × Core Web Vitals** — products with higher DS adoption %, do they also have better p75 LCP / INP / CLS? (Hypothesis: yes, because tokenised + tested components avoid common perf pitfalls.)
2. **Adoption % × time-to-ship** — does feature time decrease as a team adopts the DS? Measured A/B against the team's prior 3-month baseline.
3. **Coverage × consumer NPS** — is consumer NPS positively correlated with the share of UI built from the DS? Quarterly NPS × quarterly coverage telemetry.
4. **CWV × conversion** — does shipping a CWV-passing variant of a critical surface lift business conversion? Pre/post when a redesign migrates surface to DS.

**Methodology rules:**

- **Pre-register the hypothesis** (§16.5) before measuring.
- **Define the guardrail metrics** that, if degraded, cancel the conclusion (e.g., "adoption ↑ + CWV ↑ but conversion ↓ = null result, not win").
- **Report the null** — failed correlations are filed, not deleted.
- **Decline causation claims** without a control or a quasi-experimental design (interrupted time series, regression discontinuity).

**Reporting:** quarterly correlation snapshot in the audit history register's `_trends.md` once two audits exist.

### 16.3 Continuous discovery cadence (Teresa Torres model)

The audit scored B1.2 — Research cadence — at 3/5 because the doctrine's quarterly rhythm is too slow for product teams that ship weekly. **Continuous discovery** complements the quarterly heartbeat.

**The weekly user-touch protocol** (per the Teresa Torres *Continuous Discovery Habits* model):

| Cadence | Activity | Owner | Output |
|---|---|---|---|
| Weekly | At least 1 customer interview, 30–45 min, recorded with consent | Research Lead + product PM | Interview note in repository |
| Weekly | Opportunity-Solution Tree update | Research Lead + product PM | OST commit in product repo |
| Bi-weekly | Synthesis + theme review with product team | Research Lead | Theme update in repository |
| Monthly | Map insights → Goals (HEART, §16.1) | Research Lead + DesignOps | HEART-map adjustments |
| Quarterly | Heartbeat — full team review per existing §3 | Research Lead | Quarterly research report |

**The minimum bar:**

- **No fewer than 4 customer interviews per month** per active product (Torres' floor for "continuous").
- **Insights filed within 48 hours** of the interview, in the searchable repository (§16.6).
- **At least one decision per quarter cites a continuous-discovery insight** (decision-logging gate per §16.8).

**Tooling:** Dovetail or Condens for the repository; Loom or default Zoom for recording; consent flow per [Part 8](part-8-governance-legal-commerce.md) §5 PDPL.

**Failure mode flag:** if a product goes 14+ days without an interview, the research repository surfaces a yellow flag in the DesignOps dashboard. 30+ days = red. The flag itself is the prompt to act.

### 16.4 ResearchOps 8-pillar mapping

The audit scored B1.3 at 3/5 because the doctrine references ResearchOps but doesn't map the 8 pillars (per the ResearchOps Community framework). This sub-section closes that gap.

| # | Pillar | What it owns | Source of truth | Owner |
|---|---|---|---|---|
| 1 | **Environment** | Tools, accounts, hardware, recording infrastructure | `Design System/Templates/research-ops/` | DesignOps Lead |
| 2 | **Scope** | What research is done, what is not, why | This Part 10 | Research Lead |
| 3 | **Recruitment** | Participant sourcing, screening, panels | Recruiting playbook (§14.10 expansion) | Research Lead + DesignOps Lead |
| 4 | **Governance** | Ethics, consent, data handling, retention | [Part 8](part-8-governance-legal-commerce.md) §5 (PDPL) + [Part 6](part-6-ai-ethics-sustainability.md) §3 (AI ethics) | General Counsel |
| 5 | **Tools** | Specific tooling: Dovetail / Condens / Loom / Zoom | `Design System/Templates/research-ops/tools.md` | DesignOps Lead |
| 6 | **Knowledge** | Searchable insight repository | §16.6 below | Research Lead |
| 7 | **Advocacy** | Sharing research findings across the company | Quarterly research presentations + this repository | Research Lead |
| 8 | **Admin** | Budget, vendor contracts, compliance audits | DesignOps Lead seat | DesignOps Lead |

Each pillar has a single accountable owner (the chair seat). Cross-pillar dependencies are documented inline. The DesignOps Lead operates as the ResearchOps coordinator; the Research Lead owns the practice.

### 16.5 Pre-registered hypothesis framework

Audit B10.8 scored 3/5: A/B testing methodology exists but pre-registration discipline is not enforced. Pre-registration is the cheapest single move that elevates A/B work from "T-tests" to "research-grade rigour".

**The pre-registration template** (filed before the experiment runs, in `{product-repo}/experiments/{slug}.md`):

```markdown
# Experiment {slug}

## Hypothesis
We believe that {change} will cause {primary metric} to move by {effect size} for {audience}.

## Primary metric
{name, definition, source-of-truth telemetry, baseline, target, MDE}

## Guardrail metrics — if any of these degrade, the experiment is a null
- {guardrail 1, threshold}
- {guardrail 2, threshold}
- {guardrail 3, threshold}
  (At minimum: a11y, perf, conversion, retention)

## Audience
{segmentation, exclusion criteria, sample size, power calc}

## Analysis plan
{statistical method, sequential testing controls, alpha level, stopping rule}

## Decision rule
{what we do if it wins / null / loses}

## Authors
{Researcher + Engineer + PM names}

## Pre-registered on
{date — must be before experiment starts}
```

**Hard rules:**

1. **No retrospective hypothesis-shopping.** If the hypothesis was not in the file before the experiment ran, the result is null by default.
2. **No moving the goalposts.** Primary metric and effect-size threshold are frozen at pre-registration.
3. **Guardrails always include accessibility and performance.** No business win at the cost of a regression here.
4. **Null results are filed**, not buried. The experiment archive contains all experiments, not only the winners.

**Tooling:** GitHub / Linear issue per experiment with the template above; A/B platform (Statsig / GrowthBook / LaunchDarkly) wired to read the issue ID for traceability.

**Frequency:** any product change that hits ≥ 5% of users gets a pre-registration. Below that threshold, observational ramps with monitoring suffice.

### 16.6 Insight repository

The audit scored B1.6 at 3/5: shared drive exists, AI-queryable repo does not. The minimum-viable insight repository:

| Field | Requirement |
|---|---|
| **Storage** | Dovetail (hosted) or Condens (hosted) or Notion (with tagged database) — pick one and commit |
| **Indexing** | Every insight tagged by: product, surface, user segment, theme, source (interview / survey / analytics / ticket), date |
| **Search** | Full-text + tag faceted; AI-augmented search (semantic) — Phase 2 of `roadmap-to-l5.md` |
| **Access** | All employees read; researchers + product PMs write; no external access (PDPL Article 20 §3 cross-border) |
| **Retention** | Per [Part 8](part-8-governance-legal-commerce.md) §5: interview recordings 12 months; transcripts 36 months; tagged insights indefinite |
| **Audit trail** | Every read of a recording is logged (PDPL); insights are append-only |

**Health metrics on the repository itself:**

- **Insights per quarter** — target ≥ 40 across all active products
- **Time-to-insight** — interview to filed insight ≤ 48 hours (per §16.3)
- **Re-use rate** — % of insights cited in ≥ 1 decision (target ≥ 30%)

A repository that meets these three thresholds counts as L4 on B1.6.

### 16.7 Quarterly review ritual

The HEART maps + correlation snapshots + continuous-discovery rollups + experiment results all converge in a **single quarterly review**. One meeting, one document, four owners.

**Attendance:** Research Lead (chair), DesignOps Lead, Engineering Lead, Founder.

**Document structure** (`Design System/docs/_audit/research-quarterly/{YYYY-Q}.md`):

1. HEART scorecard — current vs target across all dimensions, all active products.
2. Correlation snapshot — the four anchor correlations from §16.2.
3. Continuous-discovery rollup — interviews per product per week; flag any red.
4. Experiment digest — every experiment that closed in the quarter; wins, nulls, losses.
5. Insight repository health — three metrics from §16.6.
6. Decisions made citing research — count + rate vs prior quarter.
7. Top 3 themes for next quarter — feeds Goals (HEART §16.1).

**Outputs:** updates to HEART maps; updates to product roadmaps; a one-page "what we learned" summary shared internally.

### 16.8 Decision-logging gate

The audit scored B1.5 at 3/5: research reports are filed but decisions don't always cite them. **The gate**: any product RFC that affects user-facing UI must include an `## Evidence` section citing at least one filed research artefact (or explicitly state "no research available — proceeding on hypothesis with measurement plan").

This is enforced by RFC template + AI pre-review (RFC 2026-005 lint #5). Without it, the loop between research and product remains open; with it, the closed loop becomes the default.

### 16.9 Audit-score impact summary

| Criterion | Before | After §16 lands | Path to 5 |
|---|---|---|---|
| B10.1 HEART framework adoption | 3 | **4** | Goals→Signals→Metrics formally mapped per active feature for ≥ 1 quarter |
| A7.6 Business KPI correlation | 2 | **3** | First quarterly correlation snapshot in `_trends.md` |
| B1.2 Research cadence | 3 | **4** | First product hits 4 interviews/month for 3 consecutive months |
| B1.3 ResearchOps practice | 3 | **4** | Five of 8 pillars have named owners + tooling live |
| B10.8 A/B testing rigor | 3 | **4** | First pre-registered experiment ships and is honoured |
| B1.5 Evidence-based decision logging | 3 | **4** | RFC template + lint gate live (RFC 2026-005) |
| B1.6 Insight repository | 3 | **4** | Tooling chosen, indexed, accessible |

Combined: ~+3 percentage points on Part B (from 73.9% baseline) once these rituals are running for a full quarter.

### 16.10 References

- Kerry Rodden, Hilary Hutchinson, Xin Fu — *Measuring the User Experience on a Large Scale: User-Centered Metrics for Web Applications* (HEART), Google Research, 2010.
- Teresa Torres — *Continuous Discovery Habits*, 2021.
- ResearchOps Community — *8 Pillars of UX Research Operations*.

---

*End of Part 10 — Measurement, Research, Appendix.*

*End of The CyberSkill Global Design System.*
