# Doctrine RFC 2026-001: Public roadmap page

| Field | Value |
|---|---|
| Author | Stephen Cheng (founder) |
| Affected parts | Part 8 (Governance), Part 16 (Adoption), Part 18 (Docs Site) |
| Class | **Substantive** |
| Subtype | lifecycle (per Part 8 §16) |
| Status | **In Review** |
| Audit reference | `_audit/2026-04-26/audit-report.md` A4.6 (currently 3 → target 5); `roadmap-to-l5.md` §3.5 |
| Review window opens | 2026-04-26 |
| Review window closes | 2026-05-10 (14-day Substantive window) |

## Motivation

The 2026-04-26 self-audit scored **A4.6 — Roadmap transparency** at 3/5. Part 8 §3 commits to a quarterly public roadmap; this commitment exists in doctrine but is not yet operationalised. Without a public artefact, the doctrine cannot meaningfully claim L5 in governance.

Three concrete drivers:

1. **Adoption signal.** zeroheight's *Design Systems Report 2026* shows top-quartile systems publish a forward-looking roadmap. Without one, prospective enterprise clients have no defensible way to evaluate forward investment.
2. **Sales artefact.** A public roadmap is one of the cheapest pre-sales materials a 10-person consultancy can produce; it punches above weight class against IDEO/frog/Accenture Song.
3. **Internal accountability.** Naming a quarterly cadence forces the team to keep §14 (the per-part expansion menu) in sync with what is actually being worked on.

## Proposed change

Add a new file `Design System/docs/roadmap.md` published to the docs site (per Part 18) under the URL `cyberskill.dev/design-system/roadmap`. The page contains:

1. A **Now / Next / Later** view (3-column markdown table). Each item references a §14 expansion entry by ID.
2. A **quarter-stamped recent shipped** list (last 4 quarters).
3. A **link to the active audit folder** (`_audit/{latest-date}/`) so the relationship between audit gaps and roadmap items is visible.
4. A **last-updated timestamp** auto-generated from git.
5. An **explicit non-commitment line** stating that items are proposals not promises, and the change pipeline (§12.2) is the only binding mechanism.

The page is regenerated quarterly from `00-audit-and-roadmap.md` §14 via a small extension to `scripts/build-design-md.mjs` (or a sibling `scripts/build-roadmap-md.mjs`). Editorial fixes between quarters ship as patches.

## Alternatives considered

| Alternative | Why we considered it | Why rejected |
|---|---|---|
| **Do nothing** | Cheapest. | Leaves A4.6 at 3; sustains the L4-vs-L5 gap on a low-effort fix. |
| **Client-only roadmap (NDA)** | Some firms do this for confidentiality. | Defeats the trust-signal purpose; consultancies that hide roadmaps look smaller than they are. |
| **Twitter/X / LinkedIn thread cadence** | Reaches an audience already on those platforms. | Unstructured, decays, not bilingual, hard to cite in RFCs. |
| **Public roadmap.md, quarterly cadence (recommended)** | — | Closes A4.6, accountable, bilingual-ready, citable, low ongoing cost. |
| **GitHub Projects / Linear public board** | Live data, granular. | Premature for a 10-person team; introduces a tool dependency for a doc-class concern. Revisit at Phase 4. |

## Impact on dependent parts

| Part | Impact |
|---|---|
| **Part 8 §3** | The "quarterly public roadmap review" line becomes a live commitment with a URL. Add the URL to §3 once the page is published. |
| **Part 16 §3.5** | "Affected ambassadors notified" gains a public-roadmap-update notification step. |
| **Part 18 §4** | Docs site IA gains a "Roadmap" top-nav entry alongside "Get started", "Components", "Tokens". |
| **Part 14 §2.6** | Glossary adds "public roadmap" entry. |
| **`00-audit-and-roadmap.md` §14** | Becomes the source of truth for the public roadmap (the menu is the roadmap). |

## Backward compatibility

Additive — no breaking surface. Existing docs continue to work.

## Translation impact

Bilingual EN+VN required per §15 (cross-cutting commitment). VN counterpart ships in the same PR as the EN page. Other locales follow Part 5 §7 cadence (no SLA).

## A11y impact

Standard markdown rendering on the docs site — inherits Part 18's a11y posture. No regression.

## Telemetry impact

Optional pageview + outbound-click tracking on the roadmap page (Part 10 §7). Not required for landing.

## Audit-score impact

| Criterion | Before | After (this RFC) | Path to 5 |
|---|---|---|---|
| A4.6 Roadmap transparency | 3 (Defined) | **5 (Optimised)** | Quarter-over-quarter progress visible from the page itself. |
| A4.2 RFC process | 5 | 5 sustained | This RFC + the archive index (`docs/RFCs/_index.md`) is itself the public RFC archive — strengthens A4.2's L5. |
| A4.5 Contribution model | 4 | 4 sustained | A public roadmap surfaces opportunities for outside contribution (closes part of the path to A4.5 → 5). |

## DESIGN.md impact

Minor — the generator gains a "Roadmap" link in the master-index summary section. No change to the rules block (§13 mirror).

## Open questions

1. **Cadence: quarterly + monthly mini-update vs quarterly only?** Recommend quarterly only for v1; monthly mini-updates are a Phase 4 consideration when downstream products start consuming the roadmap.
2. **Format: phase-based vs Now/Next/Later?** Recommend Now/Next/Later for the main page (most familiar to consumers) with a link out to `_audit/{YYYY-MM-DD}/roadmap-to-l5.md` for the phase-based detail.
3. **Where does it live in the docs site IA?** Recommend top-nav adjacent to "Get started"; alternative is a footer link. Decision deferred to Part 18 chair.
4. **Vietnamese translation responsibility?** Recommend Content Designer + Locale Steward joint ownership; same PR as EN.

## Approver

Chair of Part 8 (General Counsel + Design Lead) + Founder for cross-cutting governance commitments.

## Implementation outline (if approved)

1. Create `Design System/docs/roadmap.md` with Now/Next/Later table sourced from §14.
2. Add `pnpm build:roadmap-md` script (or extend `build-design-md.mjs`) — optional but reduces drift.
3. Add VN counterpart `roadmap.vi.md`.
4. Update Part 8 §3 with the live URL.
5. Update Part 18 §4 IA spec with the new top-nav entry.
6. Update `00-audit-and-roadmap.md` §14.21 to mark "Public roadmap page" as shipped.
7. Re-run `pnpm build:design-md`.
8. Mark this RFC `Implemented` in `docs/RFCs/_index.md`.

Estimated effort: **S** (≤ 2 weeks, single contributor — Founder or DS Lead).
