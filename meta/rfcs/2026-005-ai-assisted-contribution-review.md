# Doctrine RFC 2026-005: AI-assisted contribution review

| Field | Value |
|---|---|
| Author | Stephen Cheng (founder) |
| Affected parts | Part 15 (Tooling), Part 7 (Engineering & Operations — CI), Part 8 (Governance — review gates), Part 14 (Content Design — banned phrases) |
| Class | **Substantive** |
| Subtype | tooling (per Part 8 §16) |
| Status | **In Review** |
| Audit reference | `_audit/2026-04-26/recommendations/A10.4.md` (currently 2 → target 4 in Phase 2); `00-audit-and-roadmap.md` §14.15 |
| Review window opens | 2026-04-26 |
| Review window closes | 2026-05-10 (14-day Substantive window) |

## Motivation

The 2026-04-26 self-audit scored **A10.4 — AI-assisted contribution review** at 2/5. CyberSkill is a 10-person remote team — every reviewer-hour is precious. An AI lint pre-review that catches the cheap-but-tedious issues *before* a human reviewer opens the PR cuts the review-cycle time meaningfully and frees senior contributors for substantive judgement.

This is uniquely high-leverage for a small consultancy:

1. **Reviewer-hour scarcity.** With 10 people and 2 active client projects, reviewer capacity is the binding constraint. Pre-review automation directly trades cheap inference for expensive human attention.
2. **Doctrine consistency.** Many of the §13.2 hard constraints (banned phrases, token discipline, voice principles, cross-reference integrity) are deterministically lintable. We should not be paying humans to catch them.
3. **AI-tier readiness.** The doctrine's A0–A3 agent tier model (§13.1) currently sits at A0/A1/A2. The path to A3 (substantive autonomous merge) requires evidence the agent operates safely; a pre-review system that *reviews* AI-authored PRs against the same rules creates that evidence trail.

This RFC is **decision-class**: it commits to the architecture and ruleset. The Phase 2 implementation ships the actual CI step.

## Proposed change

Add a new subsection to **Part 15 §3** (Tooling — IDE & CI extensions) titled "AI-assisted contribution pre-review". The subsection specifies:

### What the system does

A CI step runs at PR-open time and posts a single comment on the PR with categorised findings. It runs in **under 60 seconds** for typical PRs. It is **advisory** — humans remain the final approvers per §13.7.

### Five lint categories

#### 1. Token-discipline lint (deterministic, AST-based)

Scan changed `.tsx`, `.ts`, `.css`, `.svg`, `.md` files. Flag:
- Raw hex colours (`#FF0000`) → suggest `color.semantic.{slot}` from `tokens/colour.tokens.json`.
- Raw px / em / rem in style props → suggest `space.N` or `font.size.{name}`.
- Raw ms / cubic-bezier values → suggest `motion.duration.*` / `motion.easing.*`.
- Raw OKLCH values → confirm the value is also in the token file.

Implementation: a small Node ESM lint script (similar shape to `scripts/build-design-md.mjs`). Zero LLM. The "suggest" step is rule-based, not generative.

#### 2. Banned-phrase lint (deterministic, regex-based)

Scan changed `.md` and string-literal content for phrases on the canonical lists:
- Part 1 §16 anti-patterns ("revolutionary", "synergy", etc.).
- Part 14 §2.3 banned phrases ("just works", "effortlessly", etc.).
- Customer-facing copy that hasn't been bilingual-checked (`vi-deferred-by:` markers without dates).

Implementation: regex against published lists; lists are versioned in `Design System/docs/lints/banned-phrases.json` for transparency.

#### 3. A11y-note presence lint (rule-based, structural)

When a changed file is a component spec or a primitive `.tsx`, verify:
- A `## Accessibility` section exists.
- WCAG 2.2 SC mapping is present (per Part 5 §2 conformance map).
- Keyboard interaction table is present.

Implementation: markdown AST walker; keyword presence check.

#### 4. Cross-reference lint (deterministic, link-walker)

Walk every `[link](path)` and `§N.M` reference in changed files. Flag:
- Broken file links (`./part-99-mythical.md`).
- Section anchors that don't exist in the target file.
- Forward references to parts that have moved (per §13.2.3 stable file numbering rule).

Implementation: Node ESM walker; reuse parsing from `scripts/build-design-md.mjs`.

#### 5. AI-content disclosure lint (rule-based, scoped)

For PRs authored by AI agents (detectable via `agent:` author prefix per §13.6):
- Verify the §13.4 PR template is used.
- Verify all 11 fields are filled.
- Verify "Audit-score impact" prediction is non-empty.
- Verify "DESIGN.md regenerated" is set if doc/token/manifest files changed.

Implementation: PR-body parser; structured field check.

### What the system does NOT do

- **It does not auto-merge.** Humans approve.
- **It does not generate code.** It reviews code humans (or other agents at A1/A2 tier) wrote.
- **It does not invent rules.** Every rule references a documented source (Part 1 §16, Part 14 §2.3, Part 5 §2, etc.).
- **It does not silently fail.** If the system itself errors, the PR is marked "AI pre-review unavailable" and human review proceeds normally.
- **It does not call an LLM** in v1. All checks are deterministic rule-based. v2 may add LLM-assisted suggestions for token replacements, but only as advisory next to the deterministic finding.

### Severity & blocking behaviour

| Severity | Categories | Behaviour |
|---|---|---|
| **Block** | Banned-phrase (Part 1 §16); broken cross-reference; missing audit-score impact on agent PR | PR cannot merge until resolved |
| **Warn** | Token-discipline (suggest only); banned-phrase (Part 14 §2.3 — soft list); missing a11y note section | Posted as comment; human reviewer overrides if intentional |
| **Info** | AI disclosure presence; DESIGN.md staleness | Posted as comment; informational |

The block list is intentionally narrow — automation that blocks too much produces frustration and gets disabled. The Warn-and-suggest mode is the workhorse.

## Alternatives considered

| Alternative | Why we considered it | Why rejected |
|---|---|---|
| **Skip; rely on human review** | Simplest. | Caps A10.4 at 2; wastes reviewer hours on cheap deterministic checks. |
| Outsource to a generic linter (ESLint plugins, etc.) | No-build path. | Generic linters can't enforce doctrine-specific rules (banned phrases, audit-score impact, §13 tiers). |
| LLM-driven full-PR review | Higher perceived AI value. | Inconsistent across runs; opaque rationale; harder to defend in §13.5 review gates. |
| **Rule-based pre-review v1, LLM-augmented v2 (recommended)** | — | Closes A10.4 deterministically; Phase 3 can add LLM suggestions as additive layer. |

## Impact on dependent parts

| Part | Impact |
|---|---|
| **Part 15 §3** | New subsection (this RFC's content) added; CI hook documented. |
| **Part 7 §7** | CI/CD section adds pre-review job (post-clone, pre-test). |
| **Part 8 §2** | RFC-review SLA adjusts: the AI pre-review is the first review pass; human reviewer SLA starts after AI pre-review completes. |
| **Part 14 §2.3** | Banned-phrase list moves from inline doc to versioned `lints/banned-phrases.json` source-of-truth (with cross-reference). |
| **Part 1 §16** | Same treatment for anti-pattern list → `lints/anti-patterns.json`. |
| **`00-audit-and-roadmap.md` §13.4 / §13.5** | PR template + review gates section gains "AI pre-review status" rows. |
| **`00-audit-and-roadmap.md` §11.2** | Hard constraint #11 ("Never edit `DESIGN.md` by hand") gets enforced by lint #5. |

## Backward compatibility

Fully additive. Existing PRs without AI pre-review (those filed before the system ships) merge normally. The system never retroactively blocks merges.

## Translation impact

Lint output messages ship bilingual EN+VN per §15 cross-cutting commitment 1. The lint *rules* themselves are language-neutral (regex on canonical phrase lists; both EN and VN lists maintained).

## A11y impact

None directly. The a11y-note-presence lint indirectly improves Part 5 conformance by ensuring no component ships without documented a11y semantics — a small but cumulatively-positive effect.

## Telemetry impact

Per-PR lint-run log (aggregated, no PII): rule fired counts, PR resolution time. Surfaced in DesignOps dashboard (Part 15 §11) as adoption metric.

## Audit-score impact

| Criterion | Before | After (this RFC) | After Phase 2 ship | Path to 5 |
|---|---|---|---|---|
| A10.4 AI-assisted contribution review | 2 | **3** | 4 | LLM-augmented v2 with semantic suggestions |
| A4.2 RFC process | 5 | 5 sustained | 5 sustained | Lint enforces RFC template completeness |
| A4.5 Contribution model | 4 | 4 | 5 | Lower contribution barrier → more outside contributors |
| A2.2 API consistency | 4 | 4 | 5 | Lint enforces prop taxonomy |
| A3.4 A11y notes | 5 | 5 sustained | 5 sustained | Lint enforces a11y section presence |

## DESIGN.md impact

Minor — adds a "CI pre-review rules" pointer in the rules block (§13 mirror). No new top-level section.

## Open questions

1. **Where do the lint rules live?** Recommend `Design System/lints/` with one JSON per category; documented in Part 15 §3. Versioned with the doctrine.
2. **Which CI provider for the gate?** Likely GitHub Actions (most common) — but the lint is provider-agnostic and runs as `pnpm pre-review`.
3. **Should the pre-review run on `_legacy/` files?** Recommend no — `_legacy/` is sunset code; lints would be noise. Configure exclude patterns.
4. **AI agent self-pre-review before submitting a PR?** Recommend yes — encourage agents to run `pnpm pre-review` locally before opening the PR. Reduces back-and-forth.
5. **Is the v1 LLM-free constraint sustainable?** Yes for 12+ months. Re-evaluate at Phase 3 when the full MCP server (RFC 2026-002 path) is live and an LLM-augmented suggestion layer becomes natural.

## Approver

Chair of Part 15 (Engineering Lead) + AI/Ethics Lead seat (for Part 6 alignment).

## Implementation outline (if approved — Phase 2)

1. Create `Design System/lints/` directory; extract `banned-phrases.json` and `anti-patterns.json` from Parts 1 + 14.
2. Build `scripts/pre-review.mjs` (zero-dep Node ESM, mirrors the shape of `build-design-md.mjs`).
3. Wire as `pnpm pre-review` script in `package.json`.
4. Wire as a CI job (GitHub Action workflow file).
5. Wire as a PR comment-poster (use the CI provider's PR-comment API).
6. Document in Part 15 §3, Part 7 §7, Part 8 §2.
7. Update §13.4 PR template + §13.5 review gates in `00-audit-and-roadmap.md`.
8. Re-run `pnpm build:design-md`.
9. Mark this RFC `Implemented (Phase 2)` in `docs/RFCs/_index.md`.

Estimated effort: **M** (2–8 weeks; Engineering Lead + 1 AI Lead contributor).
