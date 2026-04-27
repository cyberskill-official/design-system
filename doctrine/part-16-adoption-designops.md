# The CyberSkill Global Design System

## Part 16 — Adoption Playbook & DesignOps

*The doctrine for getting product teams to use the system, keep using it, and contribute back. Adoption maturity model, migration guides from competitor design systems, contribution workflow at depth, deprecation comms templates, version-comms rituals, designer/developer enablement, training programme. Inherits governance from [Part 8](part-8-governance-legal-commerce.md); tooling from [Part 15](part-15-tooling.md); metrics from [Part 10](part-10-measurement-research-appendix.md).*

---

## Introduction — what adoption owes the firm

A design system that ships components no one uses is more expensive than no design system at all: it consumes engineering, design, content, and review effort while delivering nothing. Conversely, a design system used by every product team, contributed to actively, and trusted as the default produces compounding returns: every hour spent on a primitive saves dozens of hours across products, every fix to an a11y bug propagates instantly, every brand evolution ships consistently.

The difference between the two outcomes is **adoption work**. Adoption is the second job of a design-system team — equal in importance to building the system itself. Most design systems fail not from poor components but from poor adoption: components shipped without documentation, no migration path from existing code, no training, no relationship with product teams, no measured improvement loop.

This part defines:

1. The **adoption maturity model** — five levels from "ad-hoc" to "embedded".
2. **Migration playbooks** — recipes for moving from common starting points (raw Tailwind, Material-UI, Ant Design, Chakra, Mantine, custom) to CyberSkill DS.
3. **The contribution workflow** at depth — propose → RFC → alpha → beta → GA.
4. **Deprecation comms** — how we sunset things without breaking trust.
5. **Designer / developer enablement** — onboarding, training, office hours, ambassadors.
6. **The DesignOps function** — what it does, who staffs it, how it scales.

Three commitments anchor the doctrine:

1. **Adoption is measured.** Per-product maturity score, per-component coverage, per-team usage telemetry. We treat adoption as data, not vibes.
2. **Friction is the enemy.** Every step a product team takes to use the system is a friction we own and minimise.
3. **Migration is a service.** We don't ship a component and expect product teams to integrate; we provide the codemod, the docs, the office hours, and (for breaking changes) the labour.

---

## 1. The adoption maturity model

### 1.1 The five levels

| Level | Name | Definition |
|---|---|---|
| **0** | Ad-hoc | Components copy-pasted from one product to another; no shared package; tokens hard-coded |
| **1** | Aware | Team knows the DS exists; uses it for some new work; legacy untouched |
| **2** | Adopting | New work uses DS by default; designers use Figma library; developers use the npm package |
| **3** | Aligned | All UI built on DS primitives; tokens used everywhere; deprecated components actively replaced |
| **4** | Embedded | Team contributes back; participates in RFCs; advocates internally; runs design-system office hours |

A product can be at different levels for different surfaces (web vs mobile vs internal admin); we score per surface and aggregate.

### 1.2 Per-level criteria

A level is awarded when **all** criteria are met. A level is revoked when **any** criterion lapses.

#### Level 1 — Aware

- [ ] At least one product team member has read 00-index.
- [ ] DS has been demoed to the team within the last 90 days.
- [ ] Team has a named DS liaison.

#### Level 2 — Adopting

- All Level 1 criteria, plus:
- [ ] DS npm package installed in product repo.
- [ ] DS Figma library subscribed in product Figma file.
- [ ] At least 30% of new components in last 90 days use DS.
- [ ] Team attended at least one DS office hour in last 90 days.

#### Level 3 — Aligned

- All Level 2 criteria, plus:
- [ ] ≥ 80% of in-product components use DS.
- [ ] ≥ 90% of token references use DS tokens (audit per [Part 15](part-15-tooling.md) §6.2.7).
- [ ] No use of deprecated components past their sunset date.
- [ ] All visual changes go through DS first (no parallel-track design components).

#### Level 4 — Embedded

- All Level 3 criteria, plus:
- [ ] At least one component contribution merged in last 6 months.
- [ ] Team representative attends DS RFC reviews.
- [ ] Team member co-authors at least one DS doc page.
- [ ] Designer / engineer ambassadors named.

### 1.3 Measurement

Per-product maturity scored quarterly by DesignOps:

- Audit via `pnpm dlx @cyberskill/create audit` ([Part 15](part-15-tooling.md) §6.2.7).
- Telemetry from [Part 10](part-10-measurement-research-appendix.md) §1.
- Office-hours attendance log.
- Contribution log.

Score published in DesignOps dashboard ([Part 15](part-15-tooling.md) §11) and shared with product leadership.

### 1.4 Moving between levels

- **Up** — celebrated; DS team sends a "level up" note; product PM and team mentioned in monthly DS update.
- **Down** — investigated; DS team meets product team to understand; offers help; not a punishment, a signal.

### 1.5 Aggregate firm-wide score

Firm-wide adoption = weighted average of per-product levels, weighted by product revenue or strategic priority.

Target trajectory:

| Year | Aggregate target |
|---|---|
| 2026 | 1.5 (most products Aware, some Adopting) |
| 2027 | 2.5 (most products Adopting, some Aligned) |
| 2028 | 3.2 (most products Aligned, some Embedded) |
| 2029 | 3.6 |

---

## 2. Migration playbooks

For each common starting point, a step-by-step migration. Includes: time estimate, codemod availability, risks, rollback plan.

### 2.1 From "raw Tailwind + ad-hoc components"

**Common case:** product team built UI in Tailwind with one-off components per page.

**Time estimate:** 4–8 weeks for a typical mid-size app.

**Steps:**

1. **Install** — `pnpm add @cyberskill/react @cyberskill/tokens`.
2. **Wire the theme** — import `@cyberskill/tokens/css` in the global stylesheet; wrap app in `<DesignSystemProvider>`.
3. **Token codemod** — `pnpm dlx @cyberskill/create migrate token-rewrite` rewrites hard-coded colours / spacing to token references where unambiguous.
4. **Component identification** — audit identifies one-off components that have a DS equivalent (button-shaped divs → `<Button>`).
5. **Replace one component family at a time** — Buttons first (highest leverage), then Inputs, then Cards.
6. **A11y backfill** — DS components ship with a11y; replacing buttons / forms removes a11y gaps.
7. **Visual regression** — Chromatic baselines established, then snapshots checked at each step.
8. **Documentation update** — internal team docs reflect DS use.
9. **Audit** — `cyberskill audit` confirms maturity score progression.

**Risks:**

- Hard-coded values that look like one token but should be another (e.g., a custom orange that's close to but not Ochre).
- Components with custom variants not in DS (raise a contribution per §3 or use DS primitives + composition).

**Rollback:** Each step is a separate PR; revert is straightforward.

### 2.2 From Material-UI / MUI

**Time estimate:** 8–16 weeks.

**Steps:**

1. **Co-existence first** — install CyberSkill alongside MUI; new screens use CyberSkill; old MUI screens unchanged.
2. **Theme bridge** — for shared screens, a small adapter maps MUI theme tokens to CyberSkill tokens.
3. **Component-by-component** replacement, starting with newest screens.
4. **Form-stack migration** — MUI's TextField has many props; DS Input has fewer; mapping table provided.
5. **DataGrid replacement** — MUI DataGrid → CyberSkill `Table.Virtualized` ([Part 12](part-12-advanced-components.md) §9.2).
6. **Theming** — MUI `<ThemeProvider>` removed once last MUI component gone.

**Codemod:** Partial — `pnpm dlx @cyberskill/create migrate from-mui` handles common patterns.

**Risks:**

- MUI's complex Form / DataGrid have features DS may lack; raise contributions if needed.

### 2.3 From Ant Design

**Time estimate:** 8–16 weeks.

**Notes:**

- Ant Design is dense; CyberSkill compact density ([Part 13](part-13-theming-whitelabel-embed.md) §3) maps closely.
- Ant's `Form` has a sophisticated validation engine; CyberSkill recommends `react-hook-form` + DS components.
- Ant icons → CyberSkill icons (subset overlap; new icons may need addition per [Part 2](part-2-design-language.md) §15.6 icon RFC).

### 2.4 From Chakra / Mantine

**Time estimate:** 4–8 weeks (similar architecture).

**Notes:**

- Chakra and Mantine share token-based architecture similar to ours; migration is mostly mechanical.
- Replace `useColorModeValue` (Chakra) with CyberSkill's `[data-theme]` cascade.

### 2.5 From custom design system

**Time estimate:** 12–24 weeks.

**Notes:**

- Highest variability; each custom system different.
- Recommended: gap analysis first (which components match, which don't); plan additions to CyberSkill where strategic.
- Possible outcome: keep some custom components (very domain-specific) while adopting DS for everything else (hybrid).

### 2.6 Greenfield (new product)

**Time estimate:** Day 1.

**Steps:**

1. `pnpm dlx @cyberskill/create app` ([Part 15](part-15-tooling.md) §6.2.1).
2. Skip directly to Level 2 maturity.
3. Office-hours onboarding scheduled in week 1.

### 2.7 Migration support service

DesignOps offers, per request:

- **Audit** — DesignOps engineer reviews the codebase, produces a sized migration plan.
- **Pair-programming** — DesignOps engineer pairs for the first week of migration.
- **Codemod authoring** — for unique migration patterns, DesignOps writes the codemod.
- **PR review** — fast-track DS-related PRs from migrating teams.

---

## 3. The contribution workflow

### 3.1 Why contribute

We want product teams contributing back. Three reasons:

1. **Speed** — product teams know what they need; if they can ship it, the system grows faster than central capacity allows.
2. **Quality** — components shipped under real product pressure are sturdier than spec-from-the-cloud.
3. **Belonging** — contributing builds investment; investment becomes advocacy.

### 3.2 Contribution paths

| Type | Example | Workflow |
|---|---|---|
| **Bug fix** | A11y issue in `Button` | Direct PR to DS repo |
| **Token addition** | New semantic colour for "draft" status | Token RFC ([Part 8](part-8-governance-legal-commerce.md) §2 ext) |
| **Component variant** | New `Button` size `xs` | Component RFC |
| **New component** (Tier 1 / Tier 2) | A new `ColorPicker` | Component RFC + alpha lifecycle |
| **New pattern (T3)** | New `ImportWizardPattern` | Pattern RFC |
| **New page template (T4)** | New `BookingTemplate` for a vertical | Template RFC |
| **Theme** | New customer white-label | Theme submission ([Part 13](part-13-theming-whitelabel-embed.md) §5) |
| **Microcopy** | New string | Content RFC |
| **Doc improvement** | Better example, typo fix | Direct PR |
| **Codemod recipe** | Migration helper | PR + tests |

### 3.3 The contributor journey

```
1. Discover need (in product)
2. Search existing — does DS already cover this? (search docs, ask in #design-system)
3. Discuss in #design-system Slack — DS team confirms / refines
4. RFC draft — contributor writes per Part 8 §2 template
5. RFC review — 14 days (substantive) or 5 days (minor)
6. RFC approved → branch + implement
7. PR → reviews (DS Lead, Eng Lead, A11y Lead, Content Designer)
8. Alpha release → at least 2 products try it
9. Beta promotion → wider adoption tested
10. GA promotion → component lifecycle (Part 17)
11. Contributor named in changelog + docs
```

### 3.4 Office hours

DesignOps holds **weekly 1-hour office hours** + **monthly 2-hour deep-dive**:

- Weekly — drop-in Q&A; help with current product needs.
- Monthly — themed deep-dive (e.g., "Migrating tables to virtualization", "Theming for white-label").

Both recorded; notes published.

### 3.5 Slack channels

- `#design-system` — main community channel.
- `#design-system-rfcs` — RFC announcements + discussion.
- `#design-system-help` — product team Q&A.
- `#design-system-contributors` — active contributors.
- `#design-system-changelog` — auto-posted releases.

### 3.6 The DS Ambassadors programme

Per product, a designer + an engineer named as DS Ambassadors:

- Attend monthly Ambassadors meeting (60 min).
- Liaise between product team and DS team.
- Pre-flight major DS changes for their product.
- Mentor teammates.
- Recognised in performance reviews and DS-team annual recognition.

### 3.7 Recognition

- **Changelog credit** — every contribution mentions contributor by name ([Part 8](part-8-governance-legal-commerce.md) §3.4).
- **Docs credit** — component pages list authors.
- **Annual DS Awards** — at the firm's annual gathering: Top contributor, Best new component, Best migration story, Most improved adoption.
- **Conference speaking opportunities** — DesignOps sponsors contributors to speak at industry conferences about their work.

---

## 4. Deprecation comms

### 4.1 The deprecation lifecycle

Per [Part 17](part-17-component-lifecycle.md) §3 (the lifecycle model). Comms hooks:

| Stage | Comms |
|---|---|
| **Decision to deprecate** | RFC published with rationale + replacement plan; Slack announcement; email to Ambassadors |
| **Deprecation marked** (in code, Figma, docs) | Slack #design-system-changelog; release notes |
| **30-day reminder** | Email to all teams using the deprecated component (telemetry-derived list); reminder in Slack |
| **7-day reminder** | Email + 1:1 outreach to remaining users; office-hours slot offered |
| **Sunset** | Component removed; release notes; "thank you for migrating" message |

### 4.2 The deprecation announcement template

```
Subject: Deprecation notice — {Component}, sunset on {Date}

# We're deprecating {Component}

## Why
{2-3 sentences explaining the reason: better alternative shipped; security; performance; maintenance burden}

## What's replacing it
{Replacement component with link to docs}

## Migration path
{2-3 sentences + link to migration guide + codemod command if any}

## Timeline
- Today: {Component} marked deprecated; warnings in IDE.
- {Date - 30 days}: First reminder.
- {Date}: Component removed in v{N+1}; you must have migrated by then.

## Help
- Docs: {link}
- Codemod: `pnpm dlx @cyberskill/create migrate replace-{component}`
- Office hours: Tuesdays 10am VN time
- Slack: #design-system-help

— DesignOps
```

### 4.3 Sunset day

When a deprecation reaches sunset:

- Component removed from package.
- Build fails for any consumer still using.
- Slack-announce removal.
- Migration support extended for 30 more days for stragglers.
- Post-mortem on adoption: did we communicate well? What worked / didn't?

### 4.4 Anti-patterns we avoid

- Silent deprecation (no warning).
- Removal without sunset (instant breakage).
- Deprecation without replacement.
- "Use the new thing" message without showing how.
- Aggressive shaming of late migrators (we partner instead).

---

## 5. Version comms

### 5.1 Release cadence

Per [Part 7](part-7-engineering-operations.md) §8:

- **Patch** (1.0.X) — weekly or as needed.
- **Minor** (1.X.0) — every 4–6 weeks.
- **Major** (X.0.0) — annually.

### 5.2 Release-notes structure

Every release has structured notes:

```
# CyberSkill DS v{version} — {date}

## Highlights
{3-5 bullets of the most user-impacting changes}

## Added
- {New components, tokens, patterns}

## Changed
- {Changes that don't break}

## Deprecated
- {What's deprecated this release; sunset date}

## Removed
- {Sunset items}

## Fixed
- {Bug fixes; credit reporters}

## Security
- {Security fixes}

## Migration
- Codemod: {if any}
- Docs: {link to migration guide}

## Contributors
- {Names}

## Next up
- {Brief preview of what's coming next}

— Design System Team
```

### 5.3 Pre-release comms

For majors:

- 90 days out: roadmap published; RFCs solicited.
- 60 days out: beta released; Ambassadors test.
- 30 days out: release candidate; visual-regression freeze.
- Day 0: GA released; office hours doubled for 2 weeks.

### 5.4 In-product release banners

When an app updates DS major version, an in-product banner (using InfoBannerPattern, [Part 11](part-11-enterprise-patterns.md) §3.9) appears for 7 days:

> "We've updated to CyberSkill DS v4. Your interface may look slightly refreshed. Read what's new."

### 5.5 Customer-facing release notes (when applicable)

For white-label customers ([Part 13](part-13-theming-whitelabel-embed.md) §5), customer-facing release notes are filtered to user-visible changes only. Internal changes omitted.

---

## 6. Designer / developer enablement

### 6.1 Onboarding for new product team members

When a developer or designer joins a CyberSkill product team, an onboarding kit:

| Item | Owner |
|---|---|
| Welcome email with DS overview link | DesignOps |
| Figma library subscription auto-set | DesignOps |
| Slack channel auto-add | DesignOps |
| 30-min DS intro 1:1 with Ambassador | Product team |
| Curated reading list (per role, per Part 00-index reading paths) | DesignOps |
| First-PR mentorship offered | Ambassador |

### 6.2 Training programme

#### 6.2.1 New-hire DS bootcamp (4 hours)

- Hour 1: Foundations (Parts 1–2).
- Hour 2: Components (Part 3 overview); Storybook tour.
- Hour 3: Tooling ([Part 15](part-15-tooling.md) — Figma plugin, IDE extension, CLI).
- Hour 4: Hands-on: build a small page using DS.

Run quarterly. Recorded.

#### 6.2.2 Specialist tracks

- **Accessibility track** (8 hours): WCAG 2.2 deep dive; assistive-tech testing.
- **Theming track** (4 hours): Dark mode, HC, white-label.
- **Tier-2 components track** (8 hours): When to compose, when to use Tier-2.
- **Contribution track** (4 hours): RFC process, code-review expectations.

#### 6.2.3 Annual DS conference (internal)

Half-day annual event:

- Year-in-review.
- Ambassador talks.
- Vision for next year.
- Awards (§3.7).
- Hands-on workshops.

### 6.3 Office-hours catalogue

| Cadence | Topic |
|---|---|
| Weekly Mon | Tooling Q&A |
| Weekly Tue | General Q&A |
| Weekly Wed | A11y office hour |
| Weekly Thu | Contribution mentorship |
| Weekly Fri | Migration help |
| Monthly | Themed deep-dive |

### 6.4 Documentation

- Per-component docs ([Part 18](part-18-docs-site.md)).
- Per-pattern docs.
- Per-template docs.
- Migration guides (this part §2).
- Decision logs (which DS choices and why).
- Glossary ([Part 10](part-10-measurement-research-appendix.md) §11 + extensions).

### 6.5 Internal newsletter

Monthly DS newsletter sent to all designers + engineers:

- Highlights from the month.
- Adoption-leaderboard ("who levelled up").
- Spotlight on a contributor.
- Upcoming RFCs, deprecations.
- Office-hour topics.

---

## 7. The DesignOps function

### 7.1 What DesignOps does

DesignOps is the **operational engine** of the design system:

- Owns the toolchain ([Part 15](part-15-tooling.md)).
- Runs adoption (this part).
- Maintains the docs site ([Part 18](part-18-docs-site.md)).
- Coordinates contributions.
- Publishes the dashboard.
- Liaises with product teams.
- Coordinates RFC reviews.
- Plans the roadmap with Design Lead and Engineering Lead.

### 7.2 The seat

A single named **DesignOps Lead** seat owns the function. At our current size, the seat may be a Design Lead or Engineering Lead with allocated time. By Stage B (~16+ FTE), it becomes a dedicated role.

### 7.3 Staffing growth

| Stage | DesignOps headcount |
|---|---|
| A (now, 10 FTE) | 0.2 FTE (allocated time) |
| B (~16–40 FTE) | 1 dedicated DesignOps Lead |
| C (~40–100 FTE) | 1 Lead + 2 specialists (Tooling, Adoption) |
| D (~100+ FTE) | DesignOps team of 5–10 (Lead, Tooling, Adoption, Docs, Research) |

### 7.4 DesignOps weekly rituals

| Day | Ritual |
|---|---|
| Mon | Operating review (metrics, issues, week plan) |
| Tue | Office hour |
| Wed | RFC review meeting (60 min) |
| Thu | Contribution review queue (90 min) |
| Fri | Release / changelog |

### 7.5 DesignOps quarterly rituals

- Adoption maturity refresh (per product).
- Roadmap update.
- Contributor recognition.
- Tooling roadmap review.
- Customer (internal product team) NPS survey.

### 7.6 Internal NPS

DesignOps measures its own customer satisfaction:

- Quarterly survey to all developers + designers using DS.
- Single question: "How likely are you to recommend the DS to a colleague at CyberSkill?" (0–10 NPS).
- Open-ended: "What would make it better?".
- Aggregated; trends published; top issues prioritised.

Target NPS: ≥ 40 (industry benchmark for internal tooling).

---

## 8. Adoption telemetry

Per [Part 10](part-10-measurement-research-appendix.md) §1 + [Part 15](part-15-tooling.md) §10:

| Metric | Source | Cadence |
|---|---|---|
| **Per-product maturity score** | Audit + telemetry | Quarterly |
| **Component coverage** | Telemetry (component mounts) | Daily |
| **Token coverage** | Audit (hardcoded value detection) | Per commit |
| **Deprecation burn-down** | Telemetry on deprecated imports | Daily |
| **Figma library subscription** | Figma API | Monthly |
| **CLI adoption** | CLI telemetry | Daily |
| **IDE extension installs** | IDE marketplace | Monthly |
| **Office-hour attendance** | Manual log | Per session |
| **Contribution rate** | GitHub | Monthly |
| **NPS internal** | Survey | Quarterly |
| **RFC velocity** | RFC repo | Monthly |
| **Time-to-resolve issue** | GitHub | Monthly |

Surfaced in DesignOps dashboard ([Part 15](part-15-tooling.md) §11).

---

## 9. Anti-patterns of adoption

The mistakes we will not repeat:

| Anti-pattern | Why it kills adoption |
|---|---|
| **"Use the DS or else"** mandates without support | Resentment; teams build "around" the system to avoid it |
| **Shipping components without docs** | Friction; teams reinvent rather than dig |
| **Slow RFC reviews (> 14 days)** | Teams ship without the system; system falls behind reality |
| **Breaking-change bombs** | Trust collapses; opt-out becomes default |
| **No migration codemod** for major changes | Teams can't migrate; technical debt builds |
| **DS team as gatekeepers**, not enablers | Product teams see DS as obstacle, not partner |
| **No customer (internal product team) NPS** | DS team detached from impact |
| **Over-engineering** components for unknown future needs | Bloat; performance suffers; complexity rejected |
| **Refusing to add a component** that 3 products need | Teams build their own; fragmentation |
| **Ignoring small contributions** while only valuing big features | Demotivates contributors |

---

## 10. The DesignOps charter

> The CyberSkill DesignOps function exists to make the design system **easier to use than not to use**. We measure success by adoption, not output. We win when a product team picks the system without thinking — because it's faster, better, and supported.
>
> We will:
>
> - Make every component, pattern, and template **discoverable in under 30 seconds**.
> - Respond to every RFC within **5 working days**.
> - Hold **at least one office hour every weekday**.
> - Ship **at least one improvement to tooling each month**.
> - Publish **honest adoption metrics** quarterly, including products struggling.
> - Treat every contributor with the gratitude they deserve.
>
> When in doubt, we ask: does this make adoption easier? If no, we don't ship it.
>
> — DesignOps Lead

---

## 11. Cross-references

- **[Part 1](part-1-foundations.md)** — voice and brand the DS embodies
- **[Part 2](part-2-design-language.md)–3** — the components / tokens being adopted
- **[Part 7](part-7-engineering-operations.md) §8** — versioning policy
- **[Part 7](part-7-engineering-operations.md) §9** — codemods (basis for migration tooling)
- **[Part 8](part-8-governance-legal-commerce.md) §2** — RFC process (extended here for contribution workflow)
- **[Part 10](part-10-measurement-research-appendix.md) §1** — adoption KPIs (extended here)
- **[Part 11](part-11-enterprise-patterns.md)–12** — patterns and Tier-2 components in the adoption funnel
- **[Part 13](part-13-theming-whitelabel-embed.md)** — theming (white-label adoption)
- **[Part 14](part-14-content-design.md)** — content adoption (microcopy catalogue)
- **[Part 15](part-15-tooling.md)** — tooling (Figma plugin, IDE extension, CLI, dashboard)
- **[Part 17](part-17-component-lifecycle.md)** — component lifecycle (deprecation timing)
- **[Part 18](part-18-docs-site.md)** — docs site (the front door for adoption)
- **[Part 20](part-20-layout-responsive.md)** — layout primitives in adoption guides

---

## 12. References

| Source | Year | Use |
|---|---|---|
| Nathan Curtis — *Adoption: Mistakes & Methods* (eightshapes) | continuous | Adoption framework |
| Brad Frost — *Atomic Design* | 2016 | Tier vocabulary |
| Diana Mounter (GitHub Primer) — adoption talks | continuous | Reference |
| Atlassian Design System — adoption case studies | continuous | Reference |
| Carbon Design System — contribution playbook | continuous | Reference |
| Polaris — design-system playbook | continuous | Reference |
| Material 3 — adoption framework | continuous | Reference |
| Microsoft Fluent — adoption framework | continuous | Reference |
| Design Systems Federation — adoption surveys | continuous | Benchmarks |

---

*End of Part 16. Next: [Part 17](part-17-component-lifecycle.md) — Component Lifecycle & Maturity Model.*
