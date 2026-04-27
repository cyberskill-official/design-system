# Audit & Roadmap

This system is audited using the **[CyberSkill Design System Audit Framework](https://github.com/cyberskill-official/design-system-audit-framework)** — an open-source, vendor-neutral framework with 125 criteria across 20 categories.

The framework lives in its own repo. This file used to contain the full framework text; it now serves as a thin pointer so the framework stays canonical in one place and improvements there flow into every system that uses it.

## Where to read the framework

| What | Where |
|---|---|
| Framework rules (modes, actors, scoring, no-downgrade rule) | [`02-framework.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/02-framework.md) |
| 125 criteria — Part A (system, 63 criteria) | [`03-criteria-part-a.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/03-criteria-part-a.md) |
| 125 criteria — Part B (UX, 62 criteria) | [`04-criteria-part-b.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/04-criteria-part-b.md) |
| Step-by-step playbook | [`05-running-an-audit.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/docs/05-running-an-audit.md) |
| LLM prompt pack (SCAN, FIX, research, plan) | [`prompts/`](https://github.com/cyberskill-official/design-system-audit-framework/tree/main/prompts) |
| Audit report template | [`templates/audit-report-template.md`](https://github.com/cyberskill-official/design-system-audit-framework/blob/main/templates/audit-report-template.md) |

## Where this system's audit outputs live

- **Latest audit report** — [`audit-report-2026-04-27.md`](../meta/audits/audit-report-2026-04-27.md)
- **Audit history register** — [`_history.md`](../meta/audits/_history.md)
- **Improvement plan** — [`improvement-plan.md`](../meta/audits/improvement-plan.md)
- **Annual audit runbook** — [`annual-audit-runbook.md`](../meta/templates/audit/annual-audit-runbook.md)

## How to run an audit on this system

1. Clone the framework repo as a sibling: `git clone https://github.com/cyberskill-official/design-system-audit-framework.git`.
2. Run the scaffolder against this repo: `node ../design-system-audit-framework/scripts/audit-init.mjs .`
3. Open `prompts/scan-mode.md` from the framework and paste it into Claude / Cursor / Copilot, pointing at this system's `doctrine/` and `tokens/`.
4. After the scaffolder creates `_audit/`, move it to `meta/audits/` (this system's convention).
5. Review the draft audit at §4 and approve / defer findings.
6. Paste `prompts/fix-mode.md` to apply approved fixes.
7. Sign §9 and append a row to `meta/audits/_history.md`.

## Anchor immutables for this system

The framework is system-agnostic. The bits below are CyberSkill-specific and override the framework defaults where they conflict:

- **Slogan:** "Hiện Thực Hoá Ý Chí" / "Turn Your Will Into Real". Immutable per [`part-1-foundations.md`](part-1-foundations.md) §2.
- **Primary brand colour:** Umber. Secondary / accent: Ochre.
- **Vietnamese-first commitment:** every UI string ships a VN counterpart or an explicit deferral note. See [`part-5-accessibility-localization.md`](part-5-accessibility-localization.md) §7.
- **Voice axes:** warm · direct · honest · respectful. See [`part-1-foundations.md`](part-1-foundations.md) §3.

Any agent operating against this design system must refuse to modify these.

## Operating cadence

| Cadence | Activity | Reference |
|---|---|---|
| Quarterly (Q1, Q3) | DYNAMIC criterion re-score | Framework §10 |
| Annually | Full Mode S audit with human Co-Auditor calibration | [`annual-audit-runbook.md`](../meta/templates/audit/annual-audit-runbook.md) |
| Per release | DESIGN.md regenerated, doc-freshness check | `scripts/build-design-md.mjs --check` |

## Where this system's structure lives

| Folder | Purpose |
|---|---|
| `doctrine/` | **The single source of truth** — 22 files (00-index, 00-audit-and-roadmap, part-1 to part-20). The doctrine. |
| `tokens/` | Canonical token values (DTCG sources). Referenced by name from doctrine. |
| `meta/audits/` | Audit outputs (reports, history register, improvement plans, evidence JSONs). |
| `meta/rfcs/` | Change-history archive (RFCs proposing changes to doctrine). |
| `meta/runbooks/` | Operational runbooks (deployment, etc.). |
| `meta/templates/` | Reusable templates (audit runbook, research-ops kit, lifecycle templates). |
| `packages/` | npm packages (tokens, primitives, web-components, react, vue, svelte, …). |
| `src/` | Wiki SPA reference application. |
| `scripts/` | Build / check scripts (build-design-md, check-apca, check-coverage, …). |

The doctrine + tokens are the spec. Everything else is implementation, operational artefacts, or tooling.

---

*If the framework spec text is needed offline, check out a tagged release of the framework repo and read it locally — but do not copy it back into this repo. Keep one canonical source.*
