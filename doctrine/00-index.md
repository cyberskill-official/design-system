# The CyberSkill Global Design System — Master Index

*A unified, enterprise-grade design system for a Vietnamese-origin, globally-scoped enterprise. Twenty parts at uniform depth. Warm earth anchors. Warm approachable tech. Vietnamese first-class. PDPL- and EU AI Act-ready. DTCG 2025.10-native. MCP-native.*

> **Version 1.0.0 — locked 2026-04-25.** All twenty parts are at production publication grade. No part is a "foundation" subordinate to another; no part is a "supplement". Every part is enterprise-grade equal. Future improvements follow the v1.1+ change-management protocol defined in [00-audit-and-roadmap.md](./00-audit-and-roadmap.md) §6.

---

## Anchors (immutable)

| Anchor | Value |
|---|---|
| English slogan | Turn Your Will Into Real |
| Vietnamese slogan | Hiện Thực Hoá Ý Chí |
| Umber | `#45210E` / `oklch(0.265 0.073 44.3)` |
| Ochre | `#F4BA17` / `oklch(0.811 0.162 83.7)` |
| UI font | Be Vietnam Pro (Lâm Bảo, Tony Le, ViệtAnh Nguyễn; SIL OFL 1.1) |
| Code font | JetBrains Mono (Philipp Nurullin; 138 ligatures; SIL OFL 1.1) |
| Voice | Warm, direct, honest, respectful |
| Source-of-truth language | English; Vietnamese first-class translation; other locales follow [Part 5](part-5-accessibility-localization.md) §7 workflow |

---

## Parts — by reading purpose

The twenty parts cluster naturally by **what you reach for them**, not by hierarchy. Each cluster is a reading lens; every part is independently authoritative.

### A. Identity & visual language

The brand and the visual grammar that everything else speaks.

1. [Part 1 — Foundations](./part-1-foundations.md)
2. [Part 2 — Design Language](./part-2-design-language.md)
3. [Part 20 — Layout & Responsive System](./part-20-layout-responsive.md)

### B. Components and patterns

The library, from primitives through page templates.

4. Part 3 — Components (Tier 1 primitives)
   - [3a Actions](./part-3a-actions.md)
   - [3b Inputs](./part-3b-inputs.md)
   - [3c Containers](./part-3c-containers.md)
   - [3d Navigation](./part-3d-navigation.md)
   - [3e Feedback](./part-3e-feedback.md)
   - [3f Data Display](./part-3f-data-display.md)
   - [3g Visualization](./part-3g-visualization.md)
   - [3h AI & Chat](./part-3h-ai-chat.md)
5. [Part 12 — Advanced Component Library (Tier 2)](./part-12-advanced-components.md)
6. [Part 11 — Enterprise Patterns & Page Templates](./part-11-enterprise-patterns.md)

### C. Surfaces, customisation, content

Where the system shows up and how it adapts.

7. [Part 4 — Surfaces & Patterns](./part-4-surfaces.md)
8. [Part 13 — Theming, White-Label & Embedding](./part-13-theming-whitelabel-embed.md)
9. [Part 14 — Content Design & UX Writing at Scale](./part-14-content-design.md)

### D. Inclusion, ethics, verticals

Who we serve and the ethical floor we hold.

10. [Part 5 — Accessibility, Inclusion, Localization](./part-5-accessibility-localization.md)
11. [Part 6 — AI-Native, Ethics, Sustainability](./part-6-ai-ethics-sustainability.md)
12. [Part 19 — Industry Vertical Packs](./part-19-vertical-packs.md)

### E. Engineering, tooling, AI workflow

How the system is built, shipped, and amplified.

13. [Part 7 — Engineering & Operations](./part-7-engineering-operations.md)
14. [Part 15 — Design System Tooling](./part-15-tooling.md)
15. [Part 9 — AI Prompt Library & Workflows](./part-9-ai-prompt-library.md)

### F. Lifecycle, documentation, adoption

How the system stays alive.

16. [Part 17 — Component Lifecycle & Maturity Model](./part-17-component-lifecycle.md)
17. [Part 18 — Documentation Site & Component Catalog](./part-18-docs-site.md)
18. [Part 16 — Adoption Playbook & DesignOps](./part-16-adoption-designops.md)

### G. Governance, legal, measurement

The contracts that bind the system and the metrics that grade it.

19. [Part 8 — Governance, Legal, Commerce](./part-8-governance-legal-commerce.md)
20. [Part 10 — Measurement, Research, Appendix](./part-10-measurement-research-appendix.md)

> **Note on numbering.** File numbers (1–20) are stable identifiers — they appear in cross-references throughout the doctrine, and renumbering would invalidate every link. The clusters above (A–G) are a **reading aid**, not a hierarchy. A reader entering Cluster B does not need to have read Cluster A first; the cross-reference graph in each part directs them to whatever they actually need.

### Companion artefact

- [00-audit-and-roadmap.md](./00-audit-and-roadmap.md) — How v1.0 was assembled, how v1.1+ will be improved, and operating instructions for human and AI contributors. Read this once before proposing any change.

---

## Reading paths by role

A new joiner is not asked to read 700+ pages cover-to-cover. Each role has a defined minimum-required path for week one and a recommended path for month one.

| Role | Required week-1 | Recommended month-1 |
|---|---|---|
| Designer | 00-index, P1, P2, P3 (overview), P14, P15 | + P4, P5, P11, P12, P13, P18, P20 |
| Software engineer | 00-index, P1 (skim), P2 (tokens), P7, P9, P17 | + P3 in scope, P11–13, P15, P18, P20 |
| Product manager | 00-index, P1, P4, P11, P16, P17 | + P6, P8, P10, P14, P19 |
| Engineering manager | 00-index, P7, P8, P16, P17 | + P5, P6, P9, P15 |
| Design system contributor | 00-index, audit, P1–3, P7, P8, P16, P17, P18 | All |
| DesignOps lead | 00-index, audit, P7, P8, P15, P16, P17, P18 | All |
| Accessibility lead | 00-index, P5, P13 (HC mode), P14, P19 (Govtech) | + P3, P6, P11 |
| Security / privacy reviewer | 00-index, P6, P7, P8 | + P4, P11 |
| Vertical-pack maintainer | 00-index, P19 + own pack, P5, P14 | + P8, P11, P12, P17 |
| Customer / partner (Trust Pack) | 00-index, P1, P6, P8, P19 (relevant pack), audit | — |
| AI agent (per audit §7) | 00-index, audit (full), the part being modified, every part it cross-references | — |

---

## Ownership & cadence

Each part has a chair owner — a single accountable seat — and a defined review cadence. At our current size of ten employees, multiple chair seats may be held by the same human; the seat persists when the human changes.

| Part | Chair owner (seat) | Review cadence |
|---|---|---|
| 00-index, audit, glossary | Design System Lead | Quarterly |
| 1, 11, 13, 14 | Brand Owner + Design Lead | Quarterly |
| 2, 3, 12, 20 | Design Lead | Per RFC |
| 4, 18 | Design Lead + Engineering Lead | Quarterly |
| 5 | Accessibility Lead | Quarterly |
| 6 | AI / Ethics Lead | Quarterly |
| 7, 15, 17 | Engineering Lead | Quarterly |
| 8 | General Counsel + Design Lead | Quarterly |
| 9 | AI / Ethics Lead + Engineering Lead | Quarterly |
| 10 | Research Lead | Quarterly |
| 16 | DesignOps Lead | Quarterly |
| 19 | Vertical-pack owner per pack | As-needed |

---

## Key 2025–2026 regulatory anchors

| Instrument | Key date |
|---|---|
| WCAG 2.2 W3C Recommendation | 5 October 2023 |
| DTCG Format 2025.10 (first stable) | 28 October 2025 |
| EU AI Act — entry into force | 1 August 2024 |
| EU AI Act — prohibited + AI literacy | 2 February 2025 |
| EU AI Act — GPAI obligations | 2 August 2025 |
| EU AI Act — high-risk obligations | 2 August 2026 |
| EU AI Act — full applicability | 2 August 2027 |
| EAA enforcement | 28 June 2025 |
| PDPL Law 91/2025/QH15 effective | 1 January 2026 |
| Decree 356/2025/ND-CP effective | 1 January 2026 |
| Cybersecurity Law 116/2025/QH15 effective | 1 July 2026 |
| Sustainable Web Design Model v4 | 14 July 2025 |
| C2PA Technical Specification v2.2 | 1 May 2025 |
| MessageFormat 2.0 stable (CLDR 47 / ICU 77) | March 2025 |
| ISO/IEC 27001:2022 transition deadline | 31 October 2025 |
| ISO/IEC 42001:2023 (AI management) | In force |
| Resolution 57-NQ/TW (Tô Lâm) | 22 December 2024 |

---

## Versioning

| Version | Date | Author | Summary |
|---|---|---|---|
| 1.0.0 | 2026-04-25 | Founder + AI co-author | Locked: 20 parts at uniform enterprise grade; audit-and-roadmap published with v1.1+ improvement protocol. |

The v1.0.0 lock means: no substantive change without an RFC under the protocol in [00-audit-and-roadmap.md](./00-audit-and-roadmap.md) §6. Editorial fixes (typo, link, classification footer) ship as patch releases.

---

*Welcome to the CyberSkill Global Design System. Hiện Thực Hoá Ý Chí.*
