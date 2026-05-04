# CyberSkill Global Design System

> *Turn Your Will Into Real — Hiện Thực Hoá Ý Chí*

A unified, enterprise-grade design system for a Vietnamese-origin, globally-scoped enterprise. Warm earth anchors. Vietnamese first-class. PDPL- and EU AI Act-ready. DTCG 2025.10-native. MCP-native.

This README is the **operating manual** for the design system: what it is, how to use it in production projects, how to fine-tune it without breaking it, and how to audit it. The doctrine itself lives in two forms — `doctrine/<part>.md` (editable source, 29 files) and [`DESIGN.md`](./DESIGN.md) (single-file portable distribution, regenerated per release).

---

## Table of contents

1. [What this is and how to use it](#1-what-this-is-and-how-to-use-it)
2. [Repository layout](#2-repository-layout)
3. [Anchor immutables](#3-anchor-immutables)
4. [Distribution into production projects](#4-distribution-into-production-projects)
5. [How to fine-tune the system (the change protocol)](#5-how-to-fine-tune-the-system-the-change-protocol)
6. [RFC process](#6-rfc-process)
7. [Versioning and release cadence](#7-versioning-and-release-cadence)
8. [Building DESIGN.md from doctrine](#8-building-designmd-from-doctrine)
9. [Auditing the system](#9-auditing-the-system)
10. [Operating cadence](#10-operating-cadence)
11. [Roles and ownership](#11-roles-and-ownership)
12. [Working with AI agents](#12-working-with-ai-agents)
13. [Anti-patterns to refuse](#13-anti-patterns-to-refuse)
14. [Appendix — file inventory](#14-appendix--file-inventory)

---

## 1. What this is and how to use it

The system is a **doctrine** — twenty parts at uniform enterprise grade — plus a portable single-file distribution.

| Artefact | Purpose | When to edit |
|---|---|---|
| `doctrine/<part>.md` (29 files) | Source of truth, organised by reading purpose | When the system itself evolves (RFC required) |
| `DESIGN.md` (single file) | Portable distribution for downstream projects | Never directly — regenerated from `doctrine/` |
| `tokens/` (when present) | Canonical DTCG 2025.10 token sources | Tokens RFC required |
| `meta/audits/` | Audit reports, history, improvement plans | Per audit cycle |
| `meta/rfcs/` | Change-history archive | Per RFC |
| `packages/` (when present) | Implementation packages (tokens, primitives, react, vue, …) | Per package release |

**Three reading paths**, depending on why you're here:

- **You're shipping a product on this system** — read [§4 Distribution](#4-distribution-into-production-projects) and use [`DESIGN.md`](./DESIGN.md) directly.
- **You're proposing a change** — read [§5 How to fine-tune](#5-how-to-fine-tune-the-system-the-change-protocol) and [§6 RFC process](#6-rfc-process). Do **not** edit `doctrine/` without an RFC.
- **You're maintaining the system** — read everything below.

---

## 2. Repository layout

```
.
├── README.md                          ← this file
├── DESIGN.md                          ← portable single-file distribution (built artefact)
├── doctrine/                          ← editable source of truth (29 files)
│   ├── 00-index.md                    ← the master index
│   ├── part-1-foundations.md          ← brand, voice, principles, values
│   ├── part-2-design-language.md      ← colour, type, spacing, motion, tokens
│   ├── part-3a-actions.md             ← Tier 1 components (8 sub-parts: 3a–3h)
│   ├── …
│   └── part-20-layout-responsive.md   ← layout primitives, container queries, RTL
├── tokens/                            ← (optional) DTCG 2025.10 token sources
├── meta/
│   ├── audits/                        ← audit outputs and history
│   │   ├── _history.md
│   │   ├── audit-report-<date>.md
│   │   └── improvement-plan.md
│   ├── rfcs/                          ← change-history archive
│   ├── runbooks/                      ← operational runbooks
│   └── templates/                     ← reusable templates
├── packages/                          ← (optional) implementation packages
├── scripts/                           ← (optional) build, check, audit scripts
└── src/                               ← (optional) wiki SPA reference application
```

`DESIGN.md` is generated at the repo root — a sibling to `doctrine/`, not nested inside it. This is deliberate: a downstream project copies `DESIGN.md` and `README.md` together to get both the spec and the operating manual.

---

## 3. Anchor immutables

These are the four commitments that no agent, no edit, and no audit may relax. They predate v1.0 and override every other rule in conflict.

| Immutable | Value | Source |
|---|---|---|
| **Slogan** | EN: *Turn Your Will Into Real* / VN: *Hiện Thực Hoá Ý Chí* | `doctrine/part-1-foundations.md` §2 |
| **Primary brand colour** | **Umber** — `oklch(0.265 0.073 44.3)` / `#45210E` / `color(display-p3 0.265 0.13 0.06)` | `doctrine/part-2-design-language.md` §2 |
| **Primary accent** | **Ochre** — `oklch(0.811 0.162 83.7)` / `#F4BA17` / `color(display-p3 0.95 0.74 0.13)` | `doctrine/part-2-design-language.md` §2 |
| **Voice axes** | warm · direct · honest · respectful (chord, not slider — all four simultaneously) | `doctrine/part-1-foundations.md` §3 |
| **Vietnamese-first commitment** | Every UI string ships a VN counterpart or an explicit deferral note | `doctrine/part-5-accessibility-localization.md` §7 |

**Refuse to modify these.** If anyone — human or agent — proposes changing them, escalate to the Design System Lead and Brand Owner; do not merge an RFC that touches an immutable without the v2.0.0 protocol described in §7.

---

## 4. Distribution into production projects

You can use this system in a downstream project in three ways, in order of progressive integration.

### 4.1 Copy `DESIGN.md` only (lightest)

Drop a single file into the target repo's root:

```bash
cp ../cyberskill-design-system/DESIGN.md ./DESIGN.md
```

Every contributor (human or AI agent) has access to the full doctrine. Cite `DESIGN.md` in your `AGENTS.md` / `CLAUDE.md` so agents know to read it first. Re-sync per CyberSkill release.

### 4.2 Copy `DESIGN.md` + `README.md` (recommended)

Add this README so downstream contributors know how to fine-tune the system locally without forking the global one:

```bash
cp ../cyberskill-design-system/{DESIGN.md,README.md} ./design-system/
```

Place both inside a `design-system/` subfolder so they don't shadow the project's own README.

### 4.3 Submodule or subtree (heaviest, for products that contribute back)

```bash
git submodule add https://github.com/cyberskill/design-system.git design-system
```

The submodule pin is the locked v1.0.0 distribution; product upgrades happen by bumping the submodule SHA, never by editing in-place.

### 4.4 What changes per project, what doesn't

| Layer | Per-project freedom | Rule |
|---|---|---|
| Tokens (override) | Yes — themes, density, typography weights | Must inherit from anchor immutables; Ochre never below APCA Lc 75 vs surface |
| Components (compose) | Yes — extend with project-specific composites | Must reuse Tier-1 primitives; new compositions go through local RFC |
| Components (modify behaviour) | No | Modifying Tier-1 behaviour requires an RFC against the global system |
| Voice / brand | No | Anchor immutables apply across every product |
| Accessibility floor | No | WCAG 2.2 AA is the floor; products may go beyond, never below |
| Vertical patterns | Optional | Use `doctrine/part-19-vertical-packs.md` as the template if your product is in a regulated vertical |

---

## 5. How to fine-tune the system (the change protocol)

Edits fall into three classes. Apply the matching protocol.

### 5.1 Class A — Editorial (no RFC needed)

Typo fixes, broken-link repairs, classification footers, formatting consistency, language quality. Ship as a patch release (v1.0.x).

**Workflow:**
1. Branch off `main`: `git checkout -b editorial/<short-slug>`.
2. Edit the relevant `doctrine/<part>.md` file.
3. Re-run the build: `node scripts/build-design-md.mjs` (when present) or rerun the build script in §8 below.
4. PR with the diff. Two reviewers from the part's chair owner team approve.
5. Merge → `v1.0.x` patch tag.

### 5.2 Class B — Substantive (RFC required, minor release)

New components, new patterns, new tokens, new themes, new vertical packs, new surfaces, expanded coverage. Ship as a minor release (v1.x.0).

**Workflow:**
1. Open a draft RFC under `meta/rfcs/<YYYY-MM-DD>-<slug>.md` using the template in `doctrine/part-8-governance-legal-commerce.md` §2.
2. Tag the RFC with one of the subtypes — *component, token, pattern, surface, vertical-pack, content, tooling, lifecycle, accessibility, governance*.
3. Discussion period: minimum 14 calendar days for component / token / pattern; 21 days for surface / vertical-pack / governance.
4. RFC requires sign-off from: chair owner of every affected part + at least one accessibility reviewer.
5. Once accepted: implement in `doctrine/`, regenerate `DESIGN.md`, update `meta/audits/_history.md` with a note.
6. Ship as `v1.x.0`.

### 5.3 Class C — Anchor or breaking change (v2.0.0 protocol)

Anything touching an immutable in [§3](#3-anchor-immutables), or any change that breaks API compatibility for downstream projects.

**Workflow:**
1. RFC as above, but with a 60-day public discussion period and explicit founder sign-off.
2. Compatibility codemod published in `packages/codemods/`.
3. v2.0.0 release with a migration guide in `meta/runbooks/migration-v1-to-v2.md`.
4. Two minor versions deprecation runway from the last v1.x.

**Default answer for Class C: "no, find a way to keep the immutable."** Anchor changes have shipped exactly zero times since v1.0.0 lock and we expect that to continue.

### 5.4 What every change must include

Regardless of class, every accepted change carries:

- **Diff against the doctrine** — the actual prose change.
- **Cross-reference update** — every `[Part X](…)` link still resolves.
- **Telemetry hook** if the change is a component / pattern / token, per `doctrine/part-10-measurement-research-appendix.md` §2.
- **Microcopy** in EN + VN per `doctrine/part-14-content-design.md`.
- **Accessibility review** per `doctrine/part-5-accessibility-localization.md`.
- **Audit note** in `meta/audits/_history.md`.

---

## 6. RFC process

RFC subtypes and required reviewers — copy from `doctrine/part-8-governance-legal-commerce.md` §16:

| Subtype | Required reviewers | Discussion period |
|---|---|---|
| component | Design Lead, Engineering Lead, A11y Lead | 14 days |
| token | Design Lead, Brand Owner | 14 days |
| pattern | Design Lead | 14 days |
| surface | Design Lead, Engineering Lead, vertical owner if applicable | 21 days |
| vertical-pack | Vertical-pack owner, Design Lead, A11y Lead, GC | 21 days |
| content | Design Lead, Brand Owner, localisation reviewer | 14 days |
| tooling | Engineering Lead, DesignOps Lead | 14 days |
| lifecycle | DesignOps Lead, Engineering Lead | 14 days |
| accessibility | A11y Lead, Design Lead | 14 days |
| governance | General Counsel, Founder, Design System Lead | 21 days |

RFC template (place at `meta/rfcs/<YYYY-MM-DD>-<slug>.md`):

```markdown
# RFC: <Title>

- **Subtype:** component | token | pattern | …
- **Author:** <name>
- **Status:** draft | discussion | accepted | rejected | withdrawn | superseded
- **Discussion ends:** <date>
- **Affected parts:** Part X, Part Y
- **Affected immutables:** none | <list> (Class C if any)

## Problem

What user/team need is unmet today?

## Proposal

The change. Concrete, scoped, reviewable.

## Alternatives considered

What else was on the table and why not.

## Migration

Codemod path, deprecation runway, downstream impact.

## Open questions

What is unresolved and how it gets answered before acceptance.
```

---

## 7. Versioning and release cadence

We follow **Semantic Versioning 2.0.0**, with the following interpretation:

- **MAJOR** (v2.0.0+) — breaks downstream API compatibility OR touches an anchor immutable.
- **MINOR** (v1.x.0) — adds new components, tokens, patterns, surfaces, vertical packs, themes, or surface-level features. Backward-compatible.
- **PATCH** (v1.0.x) — editorial, link, classification, prose, codemod-only fixes.

| Release type | Cadence | Trigger |
|---|---|---|
| PATCH | Continuous | Any merged editorial PR |
| MINOR | Quarterly target (Q1, Q3) | Bundle of accepted RFCs |
| MAJOR | At-most every 18 months | Class C change accepted |

Every release ships:
1. Updated `doctrine/<part>.md` files.
2. Regenerated `DESIGN.md`.
3. Refreshed `meta/audits/_history.md` row.
4. Tag `vX.Y.Z` on `main`.
5. A CHANGELOG entry under `meta/runbooks/changelog.md` using the template in `doctrine/part-16-adoption-designops.md` §5.

---

## 8. Building `DESIGN.md` from doctrine

`DESIGN.md` is the portable distribution. It is built — never hand-edited.

### 8.1 What the build does

1. Reads the 29 files in `doctrine/` in canonical order (00-index → part-1 → part-2 → part-3a–h → part-4 … part-20).
2. Strips the boilerplate `# The CyberSkill Global Design System` H1 from each part.
3. Demotes the master-index H1 to `## Master Index`.
4. Downlevels inline file-label H1s (e.g., `# /packages/content/primitives/buttons.yaml`) to H6 so they don't pollute the table of contents.
5. Rewrites every `(part-X-….md)` cross-reference to a `(#part-X-…)` anchor link inside the flat document.
6. Rewrites references to the old `00-audit-and-roadmap.md` to point at this README.
7. Generates a TOC from the part-level H2 of every file.
8. Wraps the whole thing in front matter (slogan, version, build date) and a footer.

### 8.2 Reference build script

A reference Python build is in this repository's history (and recovered below). The official long-term home is `scripts/build-design-md.mjs` (Node) when that script lands; until then, run the Python equivalent:

```bash
python3 scripts/build-design-md.py
```

Or call the script inline from the repository's history. The build is deterministic — same inputs produce the same output bytes — so consecutive builds with no doctrine changes are no-ops.

### 8.3 Verifying the build

After a build, verify:

```bash
# Exactly one H1 (the doc title) — TOC labels are H2s, file labels downleveled to H6
grep -cE '^# ' DESIGN.md         # → 1

# Every TOC link resolves to an actual H2 anchor in the file
python3 - <<'PY'
import re, pathlib
s = pathlib.Path("DESIGN.md").read_text(encoding="utf-8")
# Extract anchors used in TOC
toc = re.findall(r"\]\((#[^)]+)\)", s.split("---", 2)[2].split("---", 1)[0])
# Build the set of actual H2 anchors
import unicodedata
def slug(t):
    out=[]
    for c in t.strip().lower():
        cat = unicodedata.category(c)
        if cat.startswith(("L","N")) or c in (" ","-","_"): out.append(c)
    s2 = re.sub(r"\s+","-","".join(out)); s2 = re.sub(r"-+","-",s2)
    return "#" + s2.strip("-")
present = {slug(m.group(1)) for m in re.finditer(r"^## (.+)$", s, re.M)}
missing = [a for a in toc if a not in present]
print(f"TOC entries: {len(toc)}; missing anchors: {len(missing)}")
for m in missing: print("  missing:", m)
PY
```

---

## 9. Auditing the system

The system is audited using the open-source **CyberSkill Design System Audit Framework** — a vendor-neutral framework with 125 criteria across 20 categories.

### 9.1 Where the framework lives

| What | Where |
|---|---|
| Framework rules (modes, actors, scoring, no-downgrade rule) | [`02-framework.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/02-framework.md) |
| 125 criteria — Part A (system, 63 criteria) | [`03-criteria-part-a.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/03-criteria-part-a.md) |
| 125 criteria — Part B (UX, 62 criteria) | [`04-criteria-part-b.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/04-criteria-part-b.md) |
| Step-by-step playbook | [`05-running-an-audit.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/05-running-an-audit.md) |
| LLM prompt pack (SCAN, FIX, research, plan) | [`prompts/`](https://github.com/cyberskill-official/design-system-audit-framework/tree/main/prompts) |
| Audit report template | [`templates/audit-report-template.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/templates/audit-report-template.md) |

### 9.2 Where this system's audit outputs live

- **Latest audit report** — `meta/audits/audit-report-<YYYY-MM-DD>.md`
- **Audit history register** — `meta/audits/_history.md`
- **Improvement plan** — `meta/audits/improvement-plan.md`
- **Annual audit runbook** — `meta/templates/audit/annual-audit-runbook.md`

### 9.3 How to run an audit on this system

1. Clone the framework as a sibling: `git clone https://github.com/cyberskill-official/design-system-audit-framework.git`.
2. Run the scaffolder: `node ../design-system-audit-framework/scripts/audit-init.mjs .`.
3. Open `prompts/scan-mode.md` from the framework, paste it into Claude / Cursor / Copilot, point at this system's `DESIGN.md` (or `doctrine/` + `tokens/`).
4. After the scaffolder creates `_audit/`, move it to `meta/audits/`.
5. Review the draft audit at §4 and approve / defer findings.
6. Paste `prompts/fix-mode.md` to apply approved fixes.
7. Sign §9 and append a row to `meta/audits/_history.md`.

### 9.4 What the audit checks against

The framework is system-agnostic; the bits below are CyberSkill-specific and override framework defaults where they conflict:

- **Slogan:** *Hiện Thực Hoá Ý Chí* / *Turn Your Will Into Real*. Immutable per §3.
- **Primary brand colour:** Umber. Secondary / accent: Ochre.
- **Vietnamese-first commitment:** every UI string ships a VN counterpart or an explicit deferral note.
- **Voice axes:** warm · direct · honest · respectful.

Any agent operating against this design system **must refuse** to modify these.

---

## 10. Operating cadence

| Cadence | Activity | Reference |
|---|---|---|
| Continuous | Editorial PRs (Class A) | §5.1 |
| Monthly | DesignOps dashboard review (adoption KPIs, deprecation lag, drift index) | `doctrine/part-10-measurement-research-appendix.md` §1, 9 |
| Quarterly (Q1, Q3) | DYNAMIC criterion re-score | Framework §10 |
| Quarterly | Per-part chair-owner review | `doctrine/00-index.md` Ownership table |
| Quarterly | Minor release window — bundle accepted RFCs | §7 |
| Annually | Full Mode S audit with human Co-Auditor calibration | `meta/templates/audit/annual-audit-runbook.md` |
| Per release | Regenerate `DESIGN.md`; doc-freshness check | §8 |
| Ad-hoc | Vertical-pack reviews | `doctrine/part-19-vertical-packs.md` |

---

## 11. Roles and ownership

| Role / seat | Owns | Approves |
|---|---|---|
| Founder | The system overall; anchor immutables (refusal authority) | Class C / v2.0.0 changes |
| Design System Lead | 00-index, audit, glossary; coordination | Editorial; any RFC affecting more than one part |
| Brand Owner | Parts 1, 11, 13, 14 (with Design Lead) | Token / brand RFCs |
| Design Lead | Parts 2, 3, 12, 20; Parts 4, 18 (with Engineering Lead) | Component / pattern / surface RFCs |
| Engineering Lead | Parts 7, 15, 17 | Tooling / lifecycle / engineering RFCs |
| Accessibility Lead | Part 5 | Accessibility RFCs (mandatory reviewer for all RFCs) |
| AI / Ethics Lead | Parts 6, 9 | AI / ethics / sustainability RFCs |
| General Counsel | Part 8 (with Design Lead) | Governance / legal / commerce RFCs |
| Research Lead | Part 10 | Research methodology, telemetry schema |
| DesignOps Lead | Part 16 | Adoption playbook, deprecation comms |
| Vertical-pack owner | Part 19 (per pack) | Pack RFCs, pack pricing |

At our current size of ten employees, multiple chair seats may be held by the same human; the seat persists when the human changes.

---

## 12. Working with AI agents

This system is MCP-native and AGENTS.md-aware. Every agent (Claude Code, Cursor, Windsurf, Copilot, custom MCP clients) follows the same contract.

### 12.1 What an agent must do

- **Read `DESIGN.md` (or `doctrine/`) before any change**, scoped to the part being modified plus its cross-references.
- **Refuse to modify the anchor immutables** (§3). If asked, escalate to the user.
- **Use the RFC process** for any substantive change (§6).
- **Update `meta/audits/_history.md`** if the change crosses the audit boundary.
- **Honour the BRAIN protocol** — see `AGENTS.md` for the memory-store rules at `.cyberos-memory/`.

### 12.2 What an agent must not do

- Edit `DESIGN.md` directly (it's a build artefact).
- Alter slogan, anchor colours, voice axes, or the Vietnamese-first commitment without an explicit Class C RFC.
- Skip accessibility review on a component change.
- Promote a component out of `alpha` / `beta` without the lifecycle gate (`doctrine/part-17-component-lifecycle.md` §3).
- Auto-resolve an RFC discussion by acclamation; the discussion period is a hard floor.

### 12.3 Suggested per-agent prompt

```
You are working in the CyberSkill design system repository. Read README.md first.
Treat anchor immutables (slogan, Umber, Ochre, voice axes, Vietnamese-first) as
non-negotiable. Use DESIGN.md as the doctrine reference. For any substantive
change, write an RFC under meta/rfcs/ following the template in §6 of README.md.
```

---

## 13. Anti-patterns to refuse

If any of the following come up in an RFC, a PR, or an agent suggestion, refuse and explain why.

| Anti-pattern | Why we refuse |
|---|---|
| "Let's switch the brand colour to something more on-trend" | Anchor immutable; every product depends on Umber/Ochre identity |
| "Drop Vietnamese for v2; we're going English-only globally" | Anchor immutable; the Vietnamese-first commitment IS the brand |
| "Make voice 'fun' / 'playful' / 'edgy'" | Voice is a 4-axis chord, not a slider; off-brand |
| "Skip the RFC — it's a small change" | RFC discussion period is a hard floor, not a courtesy |
| "Use Material 3 / Polaris / Carbon as a base" | We compose with primitives, not foundations; this is in the doctrine for a reason |
| "Bypass accessibility because we'll fix it later" | A11y is the floor, not a feature; refuse to ship below it |
| "Hardcode `#45210E` everywhere" | Use `cs-color-brand-umber` token; no magic colours |
| "Disable the audit framework for this release" | Audit frequency is a hard contract; never optional |

---

## 14. Appendix — file inventory

### 14.1 `doctrine/` (29 files)

| # | File | What's in it |
|---|---|---|
| — | `00-index.md` | Master index, reading paths by role, ownership, regulatory anchors |
| 1 | `part-1-foundations.md` | Origin, brand architecture, voice, principles, values, sub-brands |
| 2 | `part-2-design-language.md` | OKLCH colour, type, spacing, motion, elevation, iconography |
| 3a | `part-3a-actions.md` | Button family (7 components) |
| 3b | `part-3b-inputs.md` | TextField family (23 input components) |
| 3c | `part-3c-containers.md` | Card / Modal / Drawer family (11 components) |
| 3d | `part-3d-navigation.md` | Header / Nav / CommandPalette family (12 components) |
| 3e | `part-3e-feedback.md` | Toast / Alert / EmptyState family (11 components) |
| 3f | `part-3f-data-display.md` | Table / List / Avatar family (16 components) |
| 3g | `part-3g-visualization.md` | Chart family (13 components) |
| 3h | `part-3h-ai-chat.md` | AI / chat surface family (12 components) |
| 4 | `part-4-surfaces.md` | 13 surfaces (Web, iOS, Android, Email, Print, AI, VUI, AR/VR, …) |
| 5 | `part-5-accessibility-localization.md` | WCAG 2.2 mapping, ARIA APG, 20+ locale baseline, MessageFormat 2.0 |
| 6 | `part-6-ai-ethics-sustainability.md` | ISO 42001, EU AI Act, C2PA, SWDM v4 |
| 7 | `part-7-engineering-operations.md` | Monorepo, DTCG pipeline, Tailwind v4, Storybook 9, CI/CD |
| 8 | `part-8-governance-legal-commerce.md` | RFC process, privacy matrix, PDPL, GDPR, EAA, billing |
| 9 | `part-9-ai-prompt-library.md` | Prompt schema, evals, AGENTS.md, MCP servers |
| 10 | `part-10-measurement-research-appendix.md` | KPIs, telemetry, glossary, benchmark, change log |
| 11 | `part-11-enterprise-patterns.md` | Page templates, multi-tenancy, notifications, onboarding |
| 12 | `part-12-advanced-components.md` | 27 Tier-2 components |
| 13 | `part-13-theming-whitelabel-embed.md` | Density, accessibility themes, white-label, embed |
| 14 | `part-14-content-design.md` | Microcopy hierarchy C1–C4, MessageFormat 2.0 |
| 15 | `part-15-tooling.md` | Figma library, IDE extension, CLI, Code Connect |
| 16 | `part-16-adoption-designops.md` | Adoption maturity, migration, contribution, deprecation comms |
| 17 | `part-17-component-lifecycle.md` | 5 stages, status badges, promotion gates |
| 18 | `part-18-docs-site.md` | Docs IA, component-page anatomy, Diátaxis quadrants |
| 19 | `part-19-vertical-packs.md` | Fintech, Healthcare, Education, Govtech, Logistics, … |
| 20 | `part-20-layout-responsive.md` | Layout primitives, container queries, RTL parity |

### 14.2 Versioning

| Version | Date | Author | Summary |
|---|---|---|---|
| 1.0.0 | 2026-04-25 | Founder + AI co-author | Locked: 20 parts at uniform enterprise grade; audit framework extracted to sibling repo |
| 1.0.1 | 2026-05-04 | Founder + AI co-author | Built portable `DESIGN.md` distribution; promoted `00-audit-and-roadmap.md` to this README; expanded fine-tuning protocol |

---

*Welcome to the CyberSkill Global Design System. **Hiện Thực Hoá Ý Chí.***
