# The CyberSkill Global Design System

## Part 17 — Component Lifecycle & Maturity Model

*The doctrine for the lifecycle of every artefact in the design system: components, patterns, templates, themes, microcopy strings, tokens, tools. Status badges (alpha / beta / GA / deprecated / sunset). The RFC-to-GA pipeline. Readiness criteria per phase. Deprecation timelines. Sunset protocol. Lifecycle telemetry. Inherits versioning from [Part 7](part-7-engineering-operations.md) §8; RFC governance from [Part 8](part-8-governance-legal-commerce.md) §2; tooling from [Part 15](part-15-tooling.md).*

---

## Introduction — what lifecycle owes the system

Every artefact in the design system has a life. It is born from an RFC, matures through alpha and beta, becomes generally available, eventually deprecates, and finally sunsets. Without an explicit lifecycle, three failure modes appear:

1. **Premature use** — product teams adopt unproven components, then fight regressions when those components change.
2. **Stagnation** — components ship and never improve; "v1 forever" syndrome.
3. **Quiet death** — components fall out of favour but linger in code, accumulating technical debt for everyone.

A formal lifecycle prevents all three by making **status visible everywhere**: in Figma, in the IDE, in Storybook, in the docs site, in runtime telemetry. A developer reaching for a deprecated component sees the warning at every step. A team adopting a beta component knows the contract: it might change.

This part defines:

1. The five lifecycle stages and their criteria.
2. The status badge system.
3. The promotion process (alpha → beta → GA).
4. The deprecation process (GA → deprecated → sunset).
5. Lifecycle telemetry and dashboards.
6. Special cases: forks, reverts, breaking changes.

Three commitments anchor the doctrine:

1. **Status is honest.** A component does not skip stages; promotion is earned, not gifted.
2. **Status is everywhere.** Designer, developer, and consumer surfaces all show status; users are never surprised.
3. **Sunset is graceful.** No component disappears without warning, replacement, and migration support.

---

## 1. The five lifecycle stages

### 1.1 Stages

| Stage | Symbol | Definition |
|---|---|---|
| **Alpha** | 🟠 | Public-experimental. May change without notice. Use only with awareness. |
| **Beta** | 🟡 | Public-stable in shape, may have small API changes. Suitable for new product code. |
| **GA** (Generally Available) | 🟢 | Stable; semver-protected; eligible for use anywhere. |
| **Deprecated** | 🔴 | Functional but discouraged. Replacement exists. Sunset date set. |
| **Sunset** | ⚫ | Removed from codebase. Retained in docs as historical reference. |

### 1.2 Stage decision matrix

A new artefact starts at **Alpha**. Promotion requires explicit gate satisfaction (§3). Deprecation requires explicit RFC and replacement (§4).

```
RFC accepted
     │
     ▼
   Alpha ──── (gate §3.1) ────▶ Beta ──── (gate §3.2) ────▶ GA
                                                              │
                                                              │ (deprecation RFC; §4)
                                                              ▼
                                                          Deprecated
                                                              │
                                                              │ (sunset date passes)
                                                              ▼
                                                            Sunset
```

### 1.3 Stage durations (typical, not mandatory)

| Stage | Typical duration | Min duration | Max before re-evaluation |
|---|---|---|---|
| Alpha | 4–12 weeks | 2 weeks | 26 weeks (then forced re-RFC) |
| Beta | 8–16 weeks | 4 weeks | 52 weeks |
| GA | indefinite | n/a | n/a |
| Deprecated | 6 months | 90 days | 18 months |
| Sunset | n/a | n/a | n/a |

Components that linger in Alpha or Beta beyond max are auto-flagged for review; either promote, demote, or remove.

---

## 2. Status badges — visible everywhere

### 2.1 In code

Every package exports its status:

```ts
// packages/primitives/Button/index.ts
import { type Lifecycle } from '@cyberskill/lifecycle'

export const __status: Lifecycle = {
  stage: 'ga',
  since: '2025-04-15',
  version: '4.2.0',
  rfc: 'RFC-2024-018',
  contributors: ['linh', 'tuan', 'hai'],
}

export { Button } from './Button'
```

### 2.2 In TypeScript hover

The IDE extension ([Part 15](part-15-tooling.md) §5.2.2) reads `__status` and surfaces in hover:

```
Button — GA, since 2025-04-15
v4.2.0 — RFC-2024-018
```

For deprecated:

```
OldThing — DEPRECATED on 2026-04-15
Sunset on 2026-12-31
Replacement: NewThing
Migration: pnpm dlx @cyberskill/create migrate replace-old-thing
```

### 2.3 In Figma

Per [Part 15](part-15-tooling.md) §3.6 status overlay. Each instance shows badge in corner; component-set name carries badge.

### 2.4 In Storybook

Component story toolbar shows badge. Click for changelog and RFC.

### 2.5 In docs site

Per [Part 18](part-18-docs-site.md) — every component page header carries:

- Status badge (large, prominent).
- Since date.
- Version.
- RFC link.
- (For deprecated) Sunset date + replacement link.

### 2.6 In runtime telemetry

Per [Part 7](part-7-engineering-operations.md) §11.2:

- Component emits `mount` event with `stage`.
- DesignOps dashboard shows aggregated usage by stage:
  - "Product X is using 12 alpha components" (informational).
  - "Product Y is using 5 deprecated components" (warning).
  - "Product Z is using 1 sunset component" (error — should not happen).

### 2.7 In linter

`@cyberskill/lifecycle-lint` warns on:

- Alpha imports without explicit opt-in comment (`// alpha-ok: justification`).
- Deprecated imports.
- Sunset imports (build failure).

---

## 3. Promotion gates

### 3.1 Alpha → Beta

A component leaves Alpha for Beta when it satisfies all of:

| Gate | Description |
|---|---|
| **API stability** | No breaking API changes in last 4 weeks. |
| **Storybook** | Stories cover all variants × states (per [Part 7](part-7-engineering-operations.md) §5.4). |
| **Tests** | Unit + integration + a11y tests passing; coverage ≥ 80%. |
| **A11y** | axe-core passes; manual SR test passed ([Part 5](part-5-accessibility-localization.md) §5). |
| **Docs** | Full 1.20-style spec (Part 3 convention) published. |
| **Microcopy** | Microcopy keys defined and translated to VN ([Part 14](part-14-content-design.md)). |
| **Adoption** | At least 1 product using in non-trivial way. |
| **Owner** | Named maintainer for the component. |
| **RFC** | Original RFC closed and approved. |

Gate evaluated by DS Lead + Engineering Lead in Beta-promotion review.

### 3.2 Beta → GA

A component leaves Beta for GA when it satisfies all of:

| Gate | Description |
|---|---|
| **All Beta gates** still met. |
| **API stability** | No breaking API changes in last 8 weeks. |
| **Adoption** | At least 2 products using; at least one with > 1k users. |
| **Performance** | Meets bundle-size budget ([Part 12](part-12-advanced-components.md) §13.9) and render-perf budget. |
| **Visual regression** | Chromatic baselines stable for 8 weeks. |
| **Theming** | Tested in light, dark, HC, sepia; density modes supported ([Part 13](part-13-theming-whitelabel-embed.md)). |
| **i18n** | RTL tested; long-language tested; CJK tested. |
| **Code Connect** | Figma ↔ Code Connect mapping published ([Part 15](part-15-tooling.md) §7). |
| **Migration** | Codemod from Alpha → Beta API published (if API changed). |
| **Telemetry** | Component emits standard telemetry events. |
| **Sign-off** | DS Lead, Engineering Lead, Accessibility Lead, Brand Owner. |

GA-promotion review is monthly; promotions batched into the next minor release.

### 3.3 Demotion (Beta → Alpha or GA → Beta)

If a component regresses:

- Demotion possible (rare; reserved for substantive issues).
- Demotion RFC required.
- Comms per [Part 16](part-16-adoption-designops.md) §4.

### 3.4 The Beta-to-GA pre-flight

Two weeks before promotion:

- DS team announces intent.
- Final API review window: contributors / users can object.
- Final visual-regression freeze.
- Final docs review.
- Final adoption check.

If objections raise material issues, GA postponed; otherwise promotion proceeds.

---

## 4. Deprecation process

### 4.1 Reasons to deprecate

| Reason | Example |
|---|---|
| **Better alternative** | New component supersedes; old component lingers without need |
| **Architectural** | API doesn't fit modern patterns (e.g., uncontrolled → controlled migration) |
| **Security** | Component has unresolvable security issue |
| **Performance** | Component cannot meet current performance budget |
| **A11y** | Component fundamentally fails a11y; rewrite required |
| **Maintenance** | Component is unmaintained and underused |

### 4.2 The deprecation RFC

Required for any deprecation:

- **Why** — reason from §4.1.
- **What's replacing it** — link to replacement (must be GA).
- **Migration plan** — codemod, manual steps, time estimate.
- **Sunset date** — proposed (typically 6 months out).
- **Affected products** — telemetry-derived list.
- **Comms plan** — per [Part 16](part-16-adoption-designops.md) §4.

RFC review window: 14 days (extended for high-impact components).

### 4.3 Deprecation marking

On RFC approval, the deprecation lands in a release:

- `__status.stage` set to `'deprecated'`.
- `__status.deprecated.since` and `__status.deprecated.sunset` set.
- TypeScript hover, Figma plugin, Storybook, docs all auto-update.
- Codemod published.
- IDE lint switches from "warning" to "error" for new imports.

### 4.4 Deprecation timeline

```
Day 0:   Deprecation marked. First announcement sent. Codemod published.
Day 30:  First reminder email to users (telemetry-derived list).
Day 60:  Second reminder.
Day 90:  Third reminder. 1:1 outreach offered to laggards.
Day 120: Final email; office-hours dedicated to migrations this week.
Day 150: Stragglers list shared with their team leads.
Day 180: Sunset (component removed from package).
Day 180+30: 30-day grace; old version published as `legacy@*` for emergency rollback.
Day 210: `legacy@*` package archived (read-only).
```

### 4.5 Deprecation reasons in the IDE

Hovering a deprecated import shows:

```
ButtonOld — DEPRECATED on 2026-04-15
Sunset on 2026-10-15 (in 124 days)

Reason: Superseded by Button which adds size="xs" and variant="link" support.

Migration: pnpm dlx @cyberskill/create migrate replace-button-old
Docs: https://design.cyberskill.io/components/button
RFC: RFC-2026-031
Office hours: Tue 10am VN
```

### 4.6 Sunset

When sunset date arrives:

- Component removed from main package in next minor release.
- `legacy@*` channel publishes the last version for 30-day emergency.
- Build failure for any consumer still importing.
- Slack-announce removal.
- Post-mortem on adoption (did we communicate well?).

### 4.7 Anti-patterns we avoid

- Silent deprecation (no warning).
- Removal without replacement (orphaning users).
- Sunset earlier than announced.
- Aggressive deprecation messages that shame users.
- Deprecating without a codemod when one is feasible.

---

## 5. Special lifecycle cases

### 5.1 Forks

A product team forks a component — typically as escape hatch for an immediate need.

Process:

- Fork lives in product repo, not the design system.
- Marked with `@cyberskill-fork-of: Button` comment for telemetry detection.
- Fork status logged.
- DS team reaches out to understand reason within 30 days.
- Fork either:
  - Promoted to a contribution (back-merge into DS).
  - Replaced when DS adds the missing capability.
  - Documented as permanent custom (rare; logged).

### 5.2 Reverts

If a release introduces a regression:

- Patch release rolls back the change.
- Reverted component returns to prior stage.
- Post-mortem published.
- RFC updated with new constraints.

### 5.3 Breaking changes within GA

Once GA, breaking changes require:

- Major version bump.
- 90-day pre-announcement.
- Codemod.
- Migration guide.
- Office-hours support.

Per [Part 7](part-7-engineering-operations.md) §8.3 lockstep majors.

### 5.4 Component splits and merges

- **Split** (one component → two): both children start at Alpha; parent component deprecated.
- **Merge** (two components → one): merged component starts at Alpha; both parents deprecated.

### 5.5 Renames

A pure rename (no behaviour change) is handled via:

- New name published.
- Old name aliased (re-exports new from old name).
- Old name marked deprecated with rename note.
- Codemod updates references.
- Sunset on standard timeline.

### 5.6 Token deprecation

Token deprecation has lighter ceremony but same lifecycle:

- Old token retained as alias to new token for the deprecation window.
- Codemod rewrites references.
- Sunset removes the alias.

### 5.7 Pattern and template lifecycle

Patterns (T3) and templates (T4) follow the same lifecycle. Promotion criteria adjusted:

- Patterns require ≥ 2 product uses for GA.
- Templates require ≥ 1 product use for GA (templates are larger and rarer).

### 5.8 Theme lifecycle

Themes ([Part 13](part-13-theming-whitelabel-embed.md)) follow lifecycle:

- New theme starts Alpha.
- Beta when contrast / a11y validated.
- GA when used in production by ≥ 1 product or customer.
- White-label customer themes follow accelerated path with automated validation.

### 5.9 Microcopy string lifecycle

Per [Part 14](part-14-content-design.md) §1.4:

- New string starts at v1; if substantive change, v2 (new key, old preserved during deprecation).
- Translations not lagging by more than 30 days (lint).
- Strings unused for 6+ months are candidates for removal ([Part 14](part-14-content-design.md) §11.3 drift detection).

### 5.10 Tool lifecycle

Tools (Figma plugin, IDE extension, CLI subcommands) follow same five stages:

- Alpha: internal testing only.
- Beta: opt-in across product teams.
- GA: default-installed; minimum-version enforced.
- Deprecated: replaced by a successor.
- Sunset: removed from distribution.

---

## 6. Lifecycle telemetry

### 6.1 What we track

| Metric | Purpose |
|---|---|
| **Components per stage** | Health of the library |
| **Time-in-stage** | Are components stalling? |
| **Adoption per stage** | Are people using betas / alphas? |
| **Deprecated-component usage** | Burn-down progress |
| **Sunset-component usage** | Should be zero; investigates anomalies |
| **Promotion velocity** | Alpha → Beta → GA throughput per quarter |

### 6.2 Dashboard view

DesignOps dashboard ([Part 15](part-15-tooling.md) §11) shows:

```
┌──────────────────────────────────────┐
│ Components by stage                   │
│  GA:        58                        │
│  Beta:      12                        │
│  Alpha:      7                        │
│  Deprecated: 4                        │
│  Sunset:     2 (in last 12 months)    │
├──────────────────────────────────────┤
│ Stalling                              │
│  - SuperPicker — Alpha for 18 weeks   │
│  - HeavyChart — Beta for 32 weeks     │
├──────────────────────────────────────┤
│ Deprecation burn-down                 │
│  ButtonOld:  18 → 5 instances (-72%)  │
│  TableOld:    9 → 7 instances (-22%)  │
├──────────────────────────────────────┤
│ Sunset risk                           │
│  ButtonOld sunsets in 14 days;        │
│  5 instances remain in:               │
│    - product-a (3 instances)          │
│    - product-c (2 instances)          │
└──────────────────────────────────────┘
```

### 6.3 Promotion velocity targets

| Quarter | Promotions GA | Deprecations |
|---|---|---|
| 2026 Q3 | 6 | 1 |
| 2026 Q4 | 6 | 1 |
| 2027 Q1+ | 4 quarterly steady | 1–2 quarterly |

Promotion velocity is a health indicator; too slow signals stagnation; too fast signals weak gates.

---

## 7. The lifecycle dashboard for product teams

Each product team has a per-product view:

```
┌──────────────────────────────────────┐
│ {Product name}                        │
│                                       │
│ Components in use: 47                 │
│  GA:         42 ✓                     │
│  Beta:        3  (acceptable for new) │
│  Alpha:       0  (none used)          │
│  Deprecated:  2  (action required)    │
│    - ButtonOld (5 instances)          │
│      sunsets in 14 days; migrate now  │
│    - TableOld (2 instances)           │
│      sunsets in 60 days               │
│  Sunset:      0  (good)               │
│                                       │
│ Maturity score: 3.4 / 5               │
│ → Level 3 (Aligned)                   │
│                                       │
│ Next steps:                           │
│  1. Migrate ButtonOld (codemod ready) │
│  2. Migrate TableOld                  │
│  3. Adopt new ChartV2 (Beta)          │
└──────────────────────────────────────┘
```

Auto-emailed to product team leads weekly.

---

## 8. Lifecycle and external customers

### 8.1 White-label customers (Part 13 §5)

Customer themes follow lifecycle:

- New theme: Alpha.
- After validation: Beta.
- After production deployment: GA.
- Customer-owned theme deprecation rare; documented per customer.

### 8.2 Public OSS components (future)

If CyberSkill open-sources components:

- Public lifecycle communicated via SemVer + npm dist-tags (`alpha`, `beta`, `latest`).
- Public deprecation notices via npm `deprecate`.
- Sunset via npm `unpublish` (rare; usually replaced).

---

## 9. Lifecycle audit

### 9.1 Quarterly audit by DesignOps

Each quarter:

- All components reviewed.
- Stage decisions revisited.
- Stalling components flagged.
- Promotion candidates queued.
- Deprecation candidates RFC'd.

### 9.2 Annual audit

Annual cycle adds:

- Cohort analysis: promotion velocity, deprecation cadence.
- Library size health: too many alphas? too few?
- Documentation coverage.
- Telemetry completeness.

---

## 10. Lifecycle of the lifecycle itself

This part is itself a lifecycle artefact, owned by the Engineering Lead seat ([Part 16](part-16-adoption-designops.md) §7.2). Reviewed quarterly. Substantive changes through [Part 8](part-8-governance-legal-commerce.md) §2 RFC.

---

## 11. The lifecycle pledge

> Every artefact in the CyberSkill design system has a known status, a named owner, and a documented life. We do not ship surprises. We do not abandon what we've shipped. We do not break trust.
>
> When we promote, we earn it.
>
> When we deprecate, we explain why and provide a path.
>
> When we sunset, we say goodbye honestly.
>
> — DS Lead, on behalf of the design system team.

---

## 12. Cross-references

- **[Part 7](part-7-engineering-operations.md) §5** — Storybook stories show lifecycle status
- **[Part 7](part-7-engineering-operations.md) §8** — versioning policy (lockstep majors, deprecation policy)
- **[Part 7](part-7-engineering-operations.md) §9** — codemods (the migration tooling)
- **[Part 7](part-7-engineering-operations.md) §11.2** — telemetry foundation
- **[Part 8](part-8-governance-legal-commerce.md) §2** — RFC process (extended here for promotion / deprecation RFCs)
- **[Part 10](part-10-measurement-research-appendix.md) §1** — adoption KPIs
- **[Part 11](part-11-enterprise-patterns.md) §1.3** — documentation contract per tier
- **[Part 12](part-12-advanced-components.md) §13.5** — Tier-2 components carry `__status`
- **[Part 13](part-13-theming-whitelabel-embed.md)** — theme lifecycle
- **[Part 14](part-14-content-design.md) §1.4** — microcopy versioning
- **[Part 15](part-15-tooling.md)** — tooling reflects lifecycle (badges in Figma, IDE, Storybook, dashboard)
- **[Part 16](part-16-adoption-designops.md)** — adoption (deprecation comms, ambassador role)
- **[Part 18](part-18-docs-site.md)** — docs site shows lifecycle prominently

---

## 13. References

| Source | Year | Use |
|---|---|---|
| Carbon Design System — component status | continuous | Reference (alpha/beta/stable model) |
| Atlassian DS — component status | continuous | Reference |
| Material Design 3 — component release tiers | continuous | Reference |
| Adobe Spectrum — release stages | continuous | Reference |
| GitHub Primer — deprecation playbook | continuous | Reference |
| SemVer 2.0 | continuous | Versioning model |
| npm dist-tags | continuous | Distribution-tag model |
| Brad Frost — *Atomic Design* — life of a component | 2016 | Conceptual basis |
| Nathan Curtis — *Versioning a Design System* | continuous | Lifecycle model reference |

---

*End of Part 17. Next: [Part 18](part-18-docs-site.md) — Documentation Site & Component Catalog Spec.*
