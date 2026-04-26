# Doctrine RFC 2026-004: Generative theming (theme-from-logo)

| Field | Value |
|---|---|
| Author | Stephen Cheng (founder) |
| Affected parts | Part 13 (Theming, White-Label, Embedding), Part 6 (AI-Native, Ethics, Sustainability), Part 15 (Tooling) |
| Class | **Substantive** |
| Subtype | tooling (per Part 8 §16) |
| Status | **In Review** |
| Audit reference | `_audit/2026-04-26/recommendations/A10.5.md` (currently 2 → target 4 in Phase 2 → 5 in Phase 3); `00-audit-and-roadmap.md` §14.13 |
| Review window opens | 2026-04-26 |
| Review window closes | 2026-05-10 (14-day Substantive window) |

## Motivation

The 2026-04-26 self-audit scored **A10.5 — Generative theming / palette tools** at 2/5. White-label engagements (Part 13 §6) currently require a designer to hand-author each tenant's token overrides — slow, error-prone, and unscalable past 5–10 tenants.

Three concrete drivers:

1. **Sales artefact.** "Drop your logo, get a contrast-validated white-label theme in 30 seconds" is a memorable demo that punches above weight class against Carbon and Polaris, neither of which ships this OOTB.
2. **Multi-tenant scale.** Once Part 13's multi-tenant catalogue ships, a 50-tenant deployment cannot be hand-themed. Generation makes it linear.
3. **A11y discipline.** Hand-authored themes routinely break WCAG 2.2 AA contrast (4.5:1 text / 3:1 UI). A generator that validates contrast on output is a hard floor.

This RFC is **decision-class**: it commits to the architecture and acceptance criteria. The Phase 2 implementation ships the CLI + Figma plugin; this RFC unblocks that work and lifts A10.5 from 2 → 3 on landing.

## Proposed change

Add a new subsection to **Part 13 §6** ("White-label themes") titled "Generative theming — theme-from-logo". The subsection specifies:

### Inputs

- **Required**: a logo file (SVG preferred; PNG ≥ 256px works as fallback) **OR** a primary brand colour as `#hex` / `oklch()` / DTCG token reference.
- **Optional**: a secondary brand colour, a target locale, a target density mode, an "energetic" / "calm" / "expressive" emotional tone hint.

### Pipeline

```
1. EXTRACT
   Run OKLCH-aware k-means clustering on the logo's pixel data (or accept the
   provided primary). Produce a candidate primary, a candidate accent, and
   candidate neutrals (warm vs cool inferred from primary's chroma).

2. VALIDATE — hard gates, fail-fast on any
   2.1 Contrast: text-on-surface ≥ 4.5:1 (AA); UI ≥ 3:1.
   2.2 Touch-target tokens unchanged (SC 2.5.8 24×24 floor preserved).
   2.3 Reduced-motion alternatives unchanged (motion tokens inherited).
   2.4 Anchor immutables (Umber + Ochre in the master index §Anchors)
       NEVER overridden.

3. EXPAND
   Use the same 12-step ramp algorithm as our base ramps (Part 2 §3–§4)
   to derive light/dark/HC/sepia variants of the candidate primary
   and accent. Produce a candidate semantic layer that maps the
   existing semantic-token slots to the new primitives.

4. EMIT
   Output a DTCG-conformant `.tokens.json` matching the schema of
   `tokens/colour.tokens.json`. The file is a per-tenant overlay
   per Part 13 §6 — it does not replace the base.

5. PREVIEW
   Render the generator's output through the wiki SPA (or the
   Figma plugin's preview pane) so the designer sees the theme
   in situ across 5+ canonical surfaces (dashboard, settings,
   billing, error, empty) before approval.
```

### Surfaces

- **CLI**: `pnpm dlx @cyberskill/theme-generator --logo customer.svg --output customer.tokens.json`
- **Figma plugin button**: triggers the same pipeline against the active Figma file's logo asset
- **Web playground**: `cyberskill.dev/design-system/theme-generator` — drop-zone UI; outputs the JSON for download

### Hard non-goals

- The generator **never** changes the master-index brand anchors (Umber + Ochre + slogan + fonts). It produces tenant overlays only.
- The generator **never** silently translates microcopy. Theme generation is colour + density + motion; copy is out of scope.
- The generator **never** produces themes that fail WCAG 2.2 AA. If validation fails, the generator emits the closest passing alternative + an explicit `validation-warnings.md` file detailing the trade-off.

### AI use disclosure (per Part 6 §2 EU AI Act Art. 13)

The k-means clustering step is deterministic; no LLM is involved in colour extraction. If a future v2 uses an LLM (e.g., for the "expressive vs calm" tone modulation), the output theme JSON gains an `$extensions.com.cyberskill.ai-generated` annotation per Part 6 §3 datasheets, and the surface that consumes the theme must show an `AIDisclosureBadge` per Part 3h.

## Alternatives considered

| Alternative | Why we considered it | Why rejected |
|---|---|---|
| **Manual theming only** | Simplest. | Caps A10.5 at 2; doesn't scale past ~10 tenants. |
| LLM-driven theming end-to-end | Highest perceived AI value. | Indeterministic; harder to validate contrast hard-floors; AI Act Art. 13 disclosure burden every generation. Defer to v2. |
| Third-party (Khroma, Colormind, Coolors) | Fastest to integrate. | None enforce DTCG output, OKLCH math, or WCAG 2.2 AA hard-floor; none are aware of our anchor immutables. |
| **Deterministic OKLCH k-means + WCAG validation (recommended)** | Closes A10.5 cleanly; leverages our OKLCH foundation; no AI Act burden in v1. | — |

## Impact on dependent parts

| Part | Impact |
|---|---|
| **Part 13 §6** | New subsection (this RFC's content) added to white-label spec. |
| **Part 13 §X (new)** | Multi-tenant theme catalogue gains "generated themes" tag and provenance metadata. |
| **Part 6 §3** | If v2 adds LLM, datasheet entry required. |
| **Part 15 §6** | CLI scaffolders gain `theme-generator` subcommand. |
| **Part 18** | Docs site gains the playground page at `/theme-generator/`. |
| **`00-audit-and-roadmap.md` §14.13** | "AI-assisted theme generator" expansion item flips to "in progress" then "shipped". |

## Backward compatibility

Fully additive. Existing manual themes continue to work; the generator produces themes in the same DTCG schema, so they are interchangeable.

## Translation impact

The generator's CLI flags, error messages, and playground UI ship bilingual EN+VN per §15 cross-cutting commitment 1. The theme JSON itself has no localised content (colour values are universal).

## A11y impact

**Strongly positive.** WCAG 2.2 AA contrast is a hard validation gate; themes that fail are rejected with explicit guidance. The generator becomes a contrast-quality forcing function for white-label customers.

## Telemetry impact

Per-generation event log (no PII): timestamp, validation pass/fail, primary colour bucket. Aggregated for adoption measurement (A.7 cluster). No customer-identifying data.

## Audit-score impact

| Criterion | Before | After (this RFC) | After Phase 2 ship | Path to 5 |
|---|---|---|---|---|
| A10.5 Generative theming | 2 | **3** | 4 | Figma plugin + playground v1 (Phase 3) |
| A6.2 Multi-tenant | 5 | 5 sustained | 5 sustained | Generator scales the catalogue |
| A8.1 Contrast guarantees | 4 | 5 | 5 | Generator's hard validation gate strengthens this |
| A8.6 EAA / WCAG conformance | 4 | 4 | 5 (with independent audit) | — |

## DESIGN.md impact

Moderate — adds a "Theme generation" row to the "What to do when" cheat sheet pointing at Part 13 + the CLI command.

## Open questions

1. **Logo extraction quality on photographic logos?** Logos with photo backgrounds (rare in B2B SaaS but real) may produce too-many-colours. Recommend the v1 generator emit a warning and require designer override.
2. **Sub-brand vs white-label distinction?** Part 1 §11 sub-brand framework is for CyberSkill's own sub-brands; this generator is for customer white-labels. Document the distinction in Part 13 §6.
3. **Should the generator also produce dark-mode + HC variants?** Yes — the EXPAND step does. But this means a single logo becomes 4 themes. Token-bytes implications: minor (~2 KB per tenant per mode), acceptable.
4. **Ethical floor for the "energetic" / "expressive" tone hint?** Some tones may push an ageing-or-low-vision-unfriendly direction. Recommend the v1 generator refuse `expressive` if the contrast budget would drop below 5:1 (one notch above AA).

## Approver

Chair of Part 13 (Design Lead) + AI/Ethics Lead seat (for Part 6 alignment) + Founder (cross-cutting commercial decision).

## Implementation outline (if approved — Phase 2)

1. Scaffold `@cyberskill/theme-generator` package in the multi-package monorepo (RFC 2026-003 prerequisite).
2. Implement OKLCH k-means clustering (zero-dependency JS — `culori` is a possible dependency for OKLCH math).
3. Implement WCAG 2.2 AA contrast validator (deterministic; existing `culori` covers the math).
4. Wire the 12-step ramp algorithm reusing the production code from Part 2 §3–§4.
5. CLI wrapper + npm publish.
6. Figma plugin button (consumes the same pipeline via remote MCP tool — RFC 2026-002 + RFC 2026-003 prerequisites).
7. Playground page in the docs site.
8. Update Part 13 §6, Part 15 §6, Part 18.
9. Re-run `pnpm build:design-md`.
10. Mark this RFC `Implemented (Phase 2)` in `docs/RFCs/_index.md`.

Estimated effort: **M** (2–8 weeks; Design Lead + AI Lead + 1 contributor).
