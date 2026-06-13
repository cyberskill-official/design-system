# CyberSkill Global Design System

> *Turn Your Will Into Real — Hiện Thực Hoá Ý Chí*

A unified, enterprise-grade design system for a Vietnamese-origin, globally-scoped enterprise. Warm earth anchors. Vietnamese first-class. PDPL- and EU AI Act-ready. DTCG 2025.10-native. MCP-native.

This README is the **operating manual** for the design system: what it is, how to use it in production projects, how to fine-tune it without breaking it, and how to audit it. The doctrine itself lives at the repo root as [`DESIGN.md`](./DESIGN.md) — the single source of truth. Version history is in [`CHANGELOG.md`](./CHANGELOG.md).

---

## Current state (snapshot)

| Field | Value |
|---|---|
| Version | **v1.3.0** (2026-06-13) |
| Audit tier | **L3 — enterprise-grade** ✓ |
| Combined audit score | **80.3%** (Part A 74.8% / Part B 85.7%) |
| Enterprise-grade floors | **7 of 7 pass** |
| `DESIGN.md` | ~1.3 MB; 1 H1; **22 Parts** (Part 21 — Liquid Glass Default; Part 22 — Style Packs, added 2026-06-13); 0 anchor collisions |
| Section numbering | Decimal multi-level (e.g. `## 5.7 20+ locales baseline`) |
| Doctrine source | Single file — legacy `doctrine/` split removed (v1.0.3). Build/verify tooling lives in `scripts/` + `packages/*/scripts/`. |
| Audit findings closed | **14 of 18** (4 deferred — infrastructure-blocked, target Q1 2027) |
| Anchor immutables | Slogan, Umber, Ochre, voice axes, Vietnamese-first — **all preserved** |
| Default surface treatment | **Liquid Glass** (Part 21) — five materials (Whisper / Light / Standard / Heavy / Solid). Layered depth + lens edges + APCA Lc ≥ 75 preserved. **Shipped in code (v1.3.0):** `@cyberskill/tokens` `--cs-glass-*`/`--cs-depth-*` + `@cyberskill/react/glass.css`; component binding is opt-in (`.cs-surface-*`). |
| Canonical files | `README.md` + `DESIGN.md` + `CHANGELOG.md` (3 files; everything else is local working state, gitignored) |

For change log, see [`CHANGELOG.md`](./CHANGELOG.md). Audit reports are local-only — re-run the [audit framework](#9-auditing-the-system) to regenerate them.

---

## Table of contents

1. [What this is and how to use it](#1-what-this-is-and-how-to-use-it)
2. [Repository layout](#2-repository-layout)
3. [Anchor immutables](#3-anchor-immutables)
4. [Distribution into production projects](#4-distribution-into-production-projects)
5. [How to fine-tune the system (the change protocol)](#5-how-to-fine-tune-the-system-the-change-protocol)
6. [RFC process](#6-rfc-process)
7. [Versioning and release cadence](#7-versioning-and-release-cadence)
8. [Editing DESIGN.md](#8-editing-designmd)
9. [Auditing the system](#9-auditing-the-system)
10. [Operating cadence](#10-operating-cadence)
11. [Roles and ownership](#11-roles-and-ownership)
12. [Working with AI agents](#12-working-with-ai-agents)
13. [Anti-patterns to refuse](#13-anti-patterns-to-refuse)

---

## 1. What this is and how to use it

The system is a **single-file doctrine** — `DESIGN.md` at the repo root contains the full twenty-one-part specification. Twenty-one parts at uniform enterprise grade, decimal-numbered (e.g., Part 5 §5.7), one source of truth.

As of v1.1.0 (2026-05-14), **Liquid Glass** is the default surface treatment across CyberSkill products — see `DESIGN.md` [Part 21 — Liquid Glass Default](./DESIGN.md#part-21-liquid-glass-default). It became a working render layer in **v1.3.0** (`@cyberskill/tokens` glass/depth scalars + `@cyberskill/react/glass.css`). Umber + Ochre anchors stay immutable; Liquid Glass governs HOW surfaces render, not WHAT colors they use. Glass is applied to components opt-in (per-surface, after the §21.8 contrast check) so the APCA floor holds under every theme and style pack.

**The system ships as exactly three files at the repo root:**

| Artefact | Purpose | When to edit |
|---|---|---|
| **`DESIGN.md`** | Single source of truth — the doctrine itself. Edit directly. | When the system itself evolves (RFC required) |
| **`README.md`** | This operating manual | When governance, change protocol, or RFC process changes |
| **`CHANGELOG.md`** | Version history | Per release |

**Everything else is local-only working state**, gitignored, and regenerable from the source artefacts above:

| Local-only (gitignored) | Origin | What it is |
|---|---|---|
| `.cyberos-memory/` | BRAIN protocol (`AGENTS.md`) | Agent memory store; per-machine; never shipped |
| `meta/audits/` | Audit framework re-runs | Re-run SCAN audit to regenerate; see [§9](#9-auditing-the-system) |
| `meta/rfcs/` | Per-RFC archive | Local working drafts; canonical decisions land in `DESIGN.md` + `CHANGELOG.md` |
| `tokens/` (when present) | Style Dictionary build | DTCG token sources, when an implementation is shipped |
| `packages/` (when present) | npm publish flow | Implementation packages, when shipped |

**Three reading paths**, depending on why you're here:

- **You're shipping a product on this system** — read [§4 Distribution](#4-distribution-into-production-projects) and use [`DESIGN.md`](./DESIGN.md) directly.
- **You're proposing a change** — read [§5 How to fine-tune](#5-how-to-fine-tune-the-system-the-change-protocol) and [§6 RFC process](#6-rfc-process). Do **not** edit `DESIGN.md` directly without an RFC for substantive changes.
- **You're maintaining the system** — read everything below.

---

## 2. Repository layout

The shipped repo contains exactly three top-level Markdown files. Everything else is local working state that's gitignored and regenerable.

```
. (canonical, ships everywhere)
├── README.md                          ← this file (operating manual)
├── DESIGN.md                          ← single-file doctrine (source of truth, edit directly)
├── CHANGELOG.md                       ← version history (Keep a Changelog format)
└── .gitignore                         ← excludes the local-only artefacts below

. (local working state, gitignored)
├── .cyberos-memory/                   ← BRAIN protocol — local agent memory store
├── meta/                              ← audit framework outputs (regenerable)
│   ├── audits/
│   │   ├── _history.md
│   │   ├── audit-report-<date>.md
│   │   └── improvement-plan.md
│   ├── rfcs/                          ← local RFC drafts (decisions land in DESIGN.md + CHANGELOG.md)
│   └── templates/
├── tokens/                            ← (optional) DTCG token sources, when shipped
├── packages/                          ← (optional) implementation packages, when shipped
│   ├── tokens/                        ← DTCG token build (CSS/TS/Swift/Kotlin/Flutter/Figma); light default
│   ├── react/                         ← React components (Button, TextField, Dialog, DataTable,
│   │                                     AIDisclosureBadge, HumanReviewGate, Logo) + base styles
│   ├── style-packs/                   ← 50 separately-stored visual styles (data-cs-style); see AUTHORING.md
│   ├── brand-assets/                  ← official CyberSkill logo (svg + png) + usage rule
│   └── …                              ← mcp-tokens, mcp-components, provenance, legal-telemetry, …
└── src/                               ← (optional) reference application, when shipped
```

**Distribution rule:** downstream projects copy only the three top-level files (`README.md`, `DESIGN.md`, `CHANGELOG.md`). The local working state never travels — each project's audit-framework outputs and BRAIN memory belong to that project.

**Implementation quick reference (when packages are present):**

| Need | Where |
|---|---|
| Build tokens (light is the default theme) | `npm run tokens:build` → `packages/tokens/dist/` |
| Use a component | `import { Button, Logo } from "@cyberskill/react"` |
| Apply the official logo | `<Logo/>` or `packages/brand-assets/assets/logo-mark.svg` — required whenever a product is for/owned by CyberSkill (`DESIGN.md` §2.2a) |
| Re-skin into a visual style | set `data-cs-style="<id>"`; load `@cyberskill/style-packs/dist/style-packs.css`; catalog in `packages/style-packs/dist/catalog.md` |
| Add a new style | follow `packages/style-packs/AUTHORING.md`, then `npm run stylepacks:build && npm run stylepacks:verify` |
| Switch theme | `data-theme="light" | "dark" | "system"` (default light) |
| Verify everything | `npm run verify:all` |

---

## 3. Anchor immutables

These are the four commitments that no agent, no edit, and no audit may relax. They predate v1.0 and override every other rule in conflict.

| Immutable | Value | Source |
|---|---|---|
| **Slogan** | EN: *Turn Your Will Into Real* / VN: *Hiện Thực Hoá Ý Chí* | `DESIGN.md` [§1.2 Brand Architecture](./DESIGN.md#1-2-brand-architecture) |
| **Primary brand colour** | **Umber** — `oklch(0.265 0.073 44.3)` / `#45210E` / `color(display-p3 0.265 0.13 0.06)` | `DESIGN.md` [§2.2 Anchor Brand Tokens](./DESIGN.md#2-2-anchor-brand-tokens) |
| **Primary accent** | **Ochre** — `oklch(0.811 0.162 83.7)` / `#F4BA17` / `color(display-p3 0.95 0.74 0.13)` | `DESIGN.md` [§2.2 Anchor Brand Tokens](./DESIGN.md#2-2-anchor-brand-tokens) |
| **Voice axes** | warm · direct · honest · respectful (chord, not slider — all four simultaneously) | `DESIGN.md` [§1.3 Personality, Voice, and Tone](./DESIGN.md#1-3-personality-voice-and-tone) |
| **Vietnamese-first commitment** | Every UI string ships a VN counterpart or an explicit deferral note | `DESIGN.md` [§5.7 20+ locales baseline](./DESIGN.md#5-7-20-locales-baseline) |
| **APCA contrast floor** | Lc ≥ 75 for body text, Lc ≥ 90 for interactive elements. Liquid Glass surfaces must measure at the rendered translucent state, not the solid color. | `DESIGN.md` [§21.8 Accessibility floor](./DESIGN.md#21-8-accessibility-floor) |

**Refuse to modify these.** If anyone — human or agent — proposes changing them, escalate to the Design System Lead and Brand Owner; do not merge an RFC that touches an immutable without the v2.0.0 protocol described in §7.

**Note on Part 21:** Liquid Glass adoption (v1.1.0 doctrine; implemented v1.3.0) does NOT modify any immutable. It adds a surface-rendering layer ON TOP of the existing Umber/Ochre anchors. Existing solid-surface components continue to render correctly — Part 21 is additive, opt-in via the shipped `.cs-surface-whisper|light|standard|heavy|solid` classes (and the `.cs-glass-card` alias), with `prefers-reduced-transparency`, `forced-colors`, `@media print`, and `@supports not (backdrop-filter)` collapsing back to solid surfaces.

---

## 4. Distribution into production projects

You can use this system in a downstream project in three ways, in order of progressive integration.

### 4.1 Copy `DESIGN.md` only (lightest)

Drop a single file into the target repo's root:

```bash
cp ../cyberskill-design-system/DESIGN.md ./DESIGN.md
```

Every contributor (human or AI agent) has access to the full doctrine. Cite `DESIGN.md` in your `AGENTS.md` / `CLAUDE.md` so agents know to read it first. Re-sync per CyberSkill release.

### 4.2 Copy the three canonical files (recommended)

Add `README.md`, `DESIGN.md`, and `CHANGELOG.md` together so downstream contributors get the full picture — the spec, the operating manual, and the version history:

```bash
cp ../cyberskill-design-system/{README.md,DESIGN.md,CHANGELOG.md} ./design-system/
```

Place all three inside a `design-system/` subfolder so they don't shadow the project's own root files.

### 4.3 Submodule or subtree (heaviest, for products that contribute back)

```bash
git submodule add https://github.com/cyberskill/design-system.git design-system
```

Pin the submodule to a tagged release (currently `v1.3.0`). Product upgrades happen by bumping the submodule SHA, never by editing in-place.

### 4.4 What changes per project, what doesn't

| Layer | Per-project freedom | Rule |
|---|---|---|
| Tokens (override) | Yes — themes, density, typography weights | Must inherit from anchor immutables; Ochre never below APCA Lc 75 vs surface |
| Components (compose) | Yes — extend with project-specific composites | Must reuse Tier-1 primitives; new compositions go through local RFC |
| Components (modify behaviour) | No | Modifying Tier-1 behaviour requires an RFC against the global system |
| Voice / brand | No | Anchor immutables apply across every product |
| Accessibility floor | No | WCAG 2.2 AA is the floor; products may go beyond, never below |
| Vertical patterns | Optional | Use `DESIGN.md` [Part 19 — Industry Vertical Packs](./DESIGN.md#part-19-industry-vertical-packs) as the template if your product is in a regulated vertical |

---

## 5. How to fine-tune the system (the change protocol)

Edits fall into three classes. Apply the matching protocol.

### 5.1 Class A — Editorial (no RFC needed)

Typo fixes, broken-link repairs, classification footers, formatting consistency, language quality. Ship as a patch release (v1.0.x).

**Workflow:**
1. Branch off `main`: `git checkout -b editorial/<short-slug>`.
2. Edit `DESIGN.md` directly.
3. PR with the diff. Two reviewers from the affected part's chair-owner team approve.
4. Merge → `v1.0.x` patch tag. Append a row to `CHANGELOG.md`.

### 5.2 Class B — Substantive (RFC required, minor release)

New components, new patterns, new tokens, new themes, new vertical packs, new surfaces, expanded coverage. Ship as a minor release (v1.x.0).

**Workflow:**
1. Open a draft RFC under `meta/rfcs/<YYYY-MM-DD>-<slug>.md` using the template in `DESIGN.md` (Part 8) §2.
2. Tag the RFC with one of the subtypes — *component, token, pattern, surface, vertical-pack, content, tooling, lifecycle, accessibility, governance*.
3. Discussion period: minimum 14 calendar days for component / token / pattern; 21 days for surface / vertical-pack / governance.
4. RFC requires sign-off from: chair owner of every affected part + at least one accessibility reviewer.
5. Once accepted: edit `DESIGN.md` directly; append a row to `CHANGELOG.md`. (Audit-history rows in `meta/audits/_history.md` are local-only — they regenerate when a cycle runs.)
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
- **Telemetry hook** if the change is a component / pattern / token, per `DESIGN.md` [§10.2 Telemetry schema](./DESIGN.md#10-2-telemetry-schema).
- **Microcopy** in EN + VN per `DESIGN.md` [Part 14 — Content Design](./DESIGN.md#part-14-content-design-ux-writing-at-scale).
- **Accessibility review** per `DESIGN.md` [Part 5 — Accessibility, Inclusion, Localization](./DESIGN.md#part-5-accessibility-inclusion-localization).
- **Audit note** — surfaced in the next audit cycle's `_history.md` (local, regenerable). The summary lands in `CHANGELOG.md`.

---

## 6. RFC process

RFC subtypes and required reviewers — sourced from `DESIGN.md` [§8.16 RFC subtypes](./DESIGN.md#8-16-rfc-subtypes):

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
1. Updated `DESIGN.md`.
2. New `CHANGELOG.md` entry at the repo root, using the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.
3. (Optional, local) Audit-history row appended in `meta/audits/_history.md` if an audit cycle was part of the release.
4. Git tag `vX.Y.Z` on `main`.
5. Per-package changelogs (when packages exist) at `packages/<name>/CHANGELOG.md`, generated from Changesets per `DESIGN.md` [§16.5 Version comms](./DESIGN.md#16-5-version-comms).

---

## 8. Editing `DESIGN.md`

`DESIGN.md` is the single source of truth — edit it directly. There is no build step.

### 8.1 Editing rules

1. Open `DESIGN.md` at the repo root.
2. Make your change in the relevant `## Part X — …` section.
3. Preserve the front matter, the table of contents, and every `## Part X` H2 heading — these are anchor targets and are referenced from elsewhere.
4. Preserve anchor immutables (§3 of this README). They cannot be changed without a Class C / v2.0.0 RFC.
5. After every edit, run the verification snippet in §8.2.
6. Append a row to `CHANGELOG.md`.

### 8.2 Verification

After every edit, confirm `DESIGN.md` is still well-formed:

```bash
# Exactly one H1 (the doc title).
grep -cE '^# ' DESIGN.md         # → 1

# All TOC anchors resolve.
python3 - <<'PY'
import re, pathlib, unicodedata
s = pathlib.Path("DESIGN.md").read_text(encoding="utf-8")
def slug(t):
    out=[]
    for c in t.strip().lower():
        cat = unicodedata.category(c)
        if cat.startswith(("L","N")) or c in (" ","-","_"): out.append(c)
    s2 = re.sub(r"\s+","-","".join(out)); s2 = re.sub(r"-+","-",s2)
    return "#" + s2.strip("-")
toc = re.findall(r"\]\((#[^)]+)\)", s.split("---", 2)[2].split("---", 1)[0])
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

### 9.2 Where audit outputs live

Audit outputs are **local-only and gitignored** (see §2). They land under `meta/audits/` when an audit runs, and they're regenerable by re-running the framework — so they never need to ship.

When an audit cycle runs, expect these files in `meta/audits/`:

- `audit-report-<YYYY-MM-DD>.md` — full SCAN/FIX report following the framework template.
- `_history.md` — append-only register row per signed audit.
- `improvement-plan.md` — open / deferred findings, with target audit dates.
- `research-<YYYY-MM-DD>-<topic>.md` — sister research artefacts when a cycle does deep research.

**The canonical record of what changed lands in `CHANGELOG.md`** at the repo root. Audit-cycle highlights — score deltas, tier transitions, findings closed, standards adopted — are summarised in each release entry. If you need the underlying evidence trail, re-run the audit locally; the framework reproduces it from `DESIGN.md` deterministically.

### 9.3 How to run an audit on this system

1. Clone the framework as a sibling: `git clone https://github.com/cyberskill-official/design-system-audit-framework.git`.
2. Run the scaffolder: `node ../design-system-audit-framework/scripts/audit-init.mjs .`.
3. Open `prompts/scan-mode.md` from the framework, paste it into Claude / Cursor / Copilot, point at this system's `DESIGN.md` (and `tokens/` if present).
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
| Monthly | DesignOps dashboard review (adoption KPIs, deprecation lag, drift index) | `DESIGN.md` [§10.1 Adoption KPIs](./DESIGN.md#10-1-adoption-kpis) + [§10.9 Dashboards](./DESIGN.md#10-9-dashboards) |
| Quarterly (Q1, Q3) | DYNAMIC criterion re-score | Framework §10 |
| Quarterly | Per-part chair-owner review | `DESIGN.md` [Master Index](./DESIGN.md#master-index) — Ownership & cadence table |
| Quarterly | Minor release window — bundle accepted RFCs | §7 |
| Annually | Full Mode S audit with human Co-Auditor calibration | Per audit framework — `prompts/scan-mode.md` then `prompts/fix-mode.md` |
| Per release | Append row to `CHANGELOG.md`; doc-freshness check | §8 |
| Ad-hoc | Vertical-pack reviews | `DESIGN.md` [Part 19 — Industry Vertical Packs](./DESIGN.md#part-19-industry-vertical-packs) |

---

## 11. Roles and ownership

| Role / seat | Owns | Approves |
|---|---|---|
| Founder | The system overall; anchor immutables (refusal authority) | Class C / v2.0.0 changes |
| Design System Lead | Master index, audit framework, glossary; cross-part coordination | Editorial; any RFC affecting more than one part |
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

- **Read `DESIGN.md` before any change**, scoped to the part being modified plus its cross-references.
- **Refuse to modify the anchor immutables** (§3). If asked, escalate to the user.
- **Use the RFC process** for any substantive change (§6).
- **Surface audit-relevant changes in `CHANGELOG.md`** so the next audit cycle picks them up. `meta/audits/` is local and regenerable; never the canonical record.
- **Honour the BRAIN protocol** — see `AGENTS.md` for the memory-store rules at `.cyberos-memory/`.

### 12.2 What an agent must not do

- Alter slogan, anchor colours, voice axes, or the Vietnamese-first commitment without an explicit Class C RFC.
- Skip accessibility review on a component change.
- Promote a component out of `alpha` / `beta` without the lifecycle gate (`DESIGN.md` [§17.3 Promotion gates](./DESIGN.md#17-3-promotion-gates)).
- Auto-resolve an RFC discussion by acclamation; the discussion period is a hard floor.

### 12.3 Suggested per-agent prompt

```
You are working in the CyberSkill design system repository. Read README.md first
(start with the Current state snapshot at top), then DESIGN.md for the doctrine.
Anchor immutables (slogan, Umber, Ochre, voice axes, Vietnamese-first, APCA Lc ≥ 75
floor) are non-negotiable — refuse any request to change them. For substantive
changes, write an RFC under meta/rfcs/ following the template in §6 of README.md.
The current audit tier is L3 (combined 80.3%); the no-downgrade rule is hard.
Liquid Glass (Part 21) is the default surface treatment as of v1.1.0,
implemented in code in v1.3.0 — use .cs-surface-* classes (opt-in, after the
§21.8 contrast check) for structural/transient surfaces; dense content stays
solid. glass.css ships in @cyberskill/react.
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


Version history is in [`CHANGELOG.md`](./CHANGELOG.md).

---

*Welcome to the CyberSkill Global Design System. **Hiện Thực Hoá Ý Chí.***
