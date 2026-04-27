# Doctrine RFC 2026-006: Spatial interaction sketch (depth tokens + visionOS / Quest / Wear OS guidance)

| Field | Value |
|---|---|
| Author | Stephen Cheng (founder) |
| Affected parts | Part 4 (Surfaces), Part 3 (Components — interaction), Part 20 (Layout & Responsive), Part 2 (Design Language — depth tokens) |
| Class | **Substantive** |
| Subtype | pattern (per Part 8 §16) |
| Status | **In Review** |
| Audit reference | `_audit/2026-04-26/recommendations/A6.6.md` and `B3.7.md` (currently 2 → target 3 in Phase 1 → 5 in Phase 4); `00-audit-and-roadmap.md` §14.20 |
| Review window opens | 2026-04-26 |
| Review window closes | 2026-05-10 (14-day Substantive window) |

## Motivation

The 2026-04-26 self-audit scored two paired criteria at 2/5:

- **A6.6 — Spatial / immersive surface support** (Cross-platform & Theming category, 8% weight)
- **B3.7 — Spatial / 3D interaction** (Interaction Design category, 11% weight)

Apple visionOS, Meta Quest, and Wear OS 6 all shipped robust spatial guidelines in 2024–2025. The Apple Liquid Glass design language (iOS 26 / 2025–2026) made translucency and depth first-class; visionOS HIG was folded into Apple's main HIG. CyberSkill's vertical packs (Part 19), particularly **healthcare** (patient education in immersive spaces) and **education** (Vision Pro classroom scenarios), increasingly include spatial-computing requirements.

Without explicit spatial guidance, teams reach for ad-hoc patterns and break the **consistency & standards** heuristic (B7.5 in part-11 §15). The doctrine cannot claim L5 in cross-platform until spatial is documented at minimum at the sketch level.

This RFC is **decision-class**: it commits to the vocabulary, the depth tokens, and the architecture for spatial primitives. The Phase 4 implementation ships actual primitive code (`@cyberskill/spatial`); this RFC unblocks the doctrine work and lifts both criteria from 2 → 3 on landing.

## Proposed change

Three coordinated additions across four parts:

### 1. New depth-token family — Part 2 §27 (deferred-implementation; this RFC commits to the vocabulary)

```
depth.surface.flat       0      (default 2D surfaces — no z-offset)
depth.surface.raised     8      (button hover, card lift)
depth.surface.floating   16     (modals, dialogs, sheets in 3D space)
depth.surface.overlay    32     (toasts, tooltips, notifications)
depth.surface.spatial    64     (visionOS-class glass materials)
```

Plus a paired blur/translucency family for "Liquid Glass"-style surfaces:

```
depth.material.solid     opacity 1.0; backdrop-filter none
depth.material.glass     opacity 0.85; backdrop-filter blur(20px) saturate(180%)
depth.material.haze      opacity 0.5; backdrop-filter blur(40px)
```

These tokens are **DTCG-conformant** (custom `$type: spatial-depth` extension, fall back to `dimension`). They live in a new `tokens/depth.tokens.json` file alongside the existing four.

### 2. Spatial-interaction primitives — Part 3 §X (new sub-section, position TBD per chair)

Six primitive concepts are documented at sketch level. **Implementation (the actual `<SpatialContainer>` etc. components) is Phase 4 work**; this RFC commits to the vocabulary so cross-references can point at it now.

| Primitive | Purpose | Maps to platform |
|---|---|---|
| `<SpatialContainer>` | Wraps content for 3D-space placement; defines a depth-anchored frame | visionOS RealityKit; Quest WebXR |
| `<DepthSurface>` | Token-driven elevation in spatial mode; falls back to box-shadow on 2D surfaces | Cross-platform |
| `<EyeFocus>` | Behaviour primitive that responds to gaze targeting (visionOS) and falls back to `:hover` on 2D | visionOS gaze; pointer fallback |
| `<HandPinch>` | Behaviour primitive for pinch-tap gestures (visionOS / Quest hand-tracking); falls back to click | visionOS hands; Quest hands |
| `<SpatialAudio>` | Component that plays earcons for off-screen attention cues | visionOS spatial audio |
| `<SafeZone>` | Layout primitive describing reach safe-zones (don't render interactive content beyond ergonomic FOV) | All immersive |

Each primitive documents a **hard fallback**: if the platform doesn't support spatial, the primitive renders in 2D with the equivalent semantic (e.g., `<EyeFocus>` becomes a hover-pointer wrapper, `<HandPinch>` becomes a button). **No surface ever shows broken UI just because it's running in a non-spatial browser.** Progressive enhancement is enforced.

### 3. Layout primitives for AR/VR — Part 20 §X (new sub-section)

Two layout primitives complement the interaction set:

- `<SpatialStack>` — vertical stack with z-axis spacing using `depth.surface.*` tokens.
- `<OrbitGroup>` — content arranged in a 3D arc around a focal point, with consistent reach radius.

These are **layout primitives** (Part 20's domain) not interaction primitives. They compose with `<Stack>` / `<Grid>` from Part 20 §3.

### 4. Accessibility — paired with §14.5 expansion

Spatial interaction is one of the **highest-risk a11y categories** in the audit. The depth tokens + primitives must:

1. **Honour `prefers-reduced-motion`** — disable depth animations, fall to flat surfaces.
2. **Honour `prefers-reduced-transparency`** — `depth.material.glass` becomes `solid`.
3. **Pair every gesture with a non-gesture alternative** — `<HandPinch>` + button; `<EyeFocus>` + Tab focus.
4. **Document AAA criteria for high-stakes spatial flows** (paired with B5.3 expansion in §14.5).
5. **Reference the voice-control / switch-control compliance matrix** (§14.5) — spatial primitives that aren't reachable via switch control fail.

## Alternatives considered

| Alternative | Why we considered it | Why rejected |
|---|---|---|
| **Skip; defer entirely** | Saves Phase 1 effort. | Caps A6.6 + B3.7 at 2; misses the Apple Vision Pro / Quest 2026 adoption window for healthcare and education vertical packs. |
| Adopt visionOS HIG verbatim | Smallest writing burden. | Ties us to one platform; leaves Quest, Wear OS, future Android XR uncovered. The doctrine commitment is cross-platform. |
| Wait for hardware adoption to plateau | "Don't be early." | Carbon, Polaris, Material 3 all shipped spatial guidance in 2024–2025; we are already late. |
| **Sketch-class doctrine commitment now; Phase 4 ships primitives (recommended)** | — | Closes 2 → 3 in Phase 1 with no infra; Phase 4 closes to 4–5 when first VR/AR product engagement materialises. |

## Impact on dependent parts

| Part | Impact |
|---|---|
| **Part 2 §27 (new)** | Depth-token family + Liquid-Glass material tokens (this RFC's content). |
| **Part 3 §X (new)** | Six spatial-interaction primitives at sketch level. |
| **Part 4 §8** | Existing high-level spatial section gains forward-references to the new Part 3 primitives. |
| **Part 20 §X (new)** | Two layout primitives (`<SpatialStack>`, `<OrbitGroup>`). |
| **Part 5** | Spatial accessibility hard-floors documented (paired with §14.5 expansion). |
| **Part 19** | Healthcare and education vertical packs gain forward-references to spatial primitives. |
| **`tokens/depth.tokens.json` (new)** | DTCG file with the spatial vocabulary. |
| **`00-audit-and-roadmap.md` §14.20** | Mark "Layout primitives for AR/VR surfaces" as RFC'd. |

## Backward compatibility

Fully additive. Existing 2D surfaces and components are unaffected. Spatial primitives ship as opt-in; no implicit z-axis is applied to anything that doesn't ask for it.

## Translation impact

VN counterpart for the new sub-sections ships in the same PR. Token names stay English (industry convention); prose translation per §15 cross-cutting commitment 1.

## A11y impact

**Strongly positive on commitment; risk-managed on implementation.** This RFC explicitly requires every spatial primitive to ship with a non-spatial fallback and to honour reduced-motion / reduced-transparency. Without this RFC, ad-hoc spatial code shipping later would be much more likely to break a11y. The risk is in *implementation* (Phase 4); the RFC sets the floor.

## Telemetry impact

Future spatial primitives will emit per-platform usage events (visionOS / Quest / Wear / 2D-fallback) for adoption tracking (A.7 cluster). No telemetry until Phase 4 ships.

## Audit-score impact

| Criterion | Before | After (this RFC) | After Phase 4 ship | Path to 5 |
|---|---|---|---|---|
| A6.6 Spatial / immersive | 2 | **3** | 4 | First VR/AR product migration |
| B3.7 Spatial / 3D interaction | 2 | **3** | 4 | First product ships spatial primitives |
| A1.4 Elevation / shadow tokens | 3 | 4 | 5 | Depth tokens are mode-aware (light/dark/HC + spatial fallback) |
| A6.3 Web / iOS / Android / RN parity | 3 | 3 sustained | 4 | Spatial extends parity to visionOS / Quest / Wear |
| A8.4 Reduced-motion | 5 | 5 sustained | 5 sustained | Spatial primitives strengthen this |
| B5.6 Cognitive accessibility | 4 | 4 sustained | 5 | Spatial flows expose new cognitive concerns (FOV, depth fatigue) — addressed in §14.5 paired expansion |

## DESIGN.md impact

Significant — adds a new "Spatial / immersive" row to the "What to do when" cheat sheet; depth tokens appear in the tokens summary. Re-run `pnpm build:design-md` after `tokens/depth.tokens.json` lands.

## Open questions

1. **Where exactly does Part 3's spatial section live?** Recommend a new sub-part `part-3i-spatial.md` rather than mutating an existing 3a–3h. Keeps numbering stable.
2. **Custom DTCG `$type: spatial-depth`** — DTCG 2025.10 doesn't define a spatial-depth type officially. We use `$type: dimension` with `$extensions.com.cyberskill.depth-mode` annotations until DTCG ratifies (or we propose) a spatial type. Track this in Open Questions.
3. **WebXR vs platform-native?** WebXR works in Quest browsers but not visionOS Safari. The primitives use platform-native APIs (RealityKit on visionOS, WebXR on Quest) via a shared abstraction in `@cyberskill/spatial`. Document the abstraction in Phase 4.
4. **Liquid Glass copyright/trademark concerns?** Apple has not asserted trademark on "Liquid Glass" generically. We use it as descriptive vocabulary; if Apple objects, we rename to "translucent-depth materials". Low risk.
5. **What's the budget for spatial-primitive engineering effort?** Conservative L (2–6 months) for Phase 4 implementation. Defer until first vertical-pack engagement justifies the investment.
6. **Do we require visionOS HIG compliance, or merely consistency?** Recommend **consistency** at v1 (look-and-feel matches platform expectations); strict HIG compliance is a Phase 5+ goal once we have a customer engagement to validate against.

## Approver

Chair of Part 4 (Design Lead + Engineering Lead) + Chair of Part 20 (Design Lead) + Founder for the strategic platform-extension decision.

## Implementation outline (if approved)

### Phase 1 (this approval — doc only)

1. Write `tokens/depth.tokens.json` with the depth + material vocabulary.
2. Write `Design System/docs/part-3i-spatial.md` (new sub-part) with the six primitive sketches + accessibility hard-floors.
3. Append §27 to `part-2-design-language.md` for the depth tokens.
4. Append §X to `part-20-layout-responsive.md` for `<SpatialStack>` / `<OrbitGroup>`.
5. Forward-reference from Part 4 §8 + Part 19 healthcare/education packs.
6. Re-run `pnpm build:design-md`.

### Phase 4 (Q4 2027 – Q2 2028 — implementation)

7. Scaffold `@cyberskill/spatial` package.
8. Implement six primitives + two layout primitives with platform-native APIs.
9. Per-platform tests (visionOS Simulator, Quest browser, Wear OS emulator).
10. Storybook stories for each primitive (with platform-fallback toggle).
11. Mark this RFC `Implemented (Phase 4)` in `docs/RFCs/_index.md`.

Estimated effort: **M** for Phase 1 (Design Lead + Engineering Lead, 2–4 weeks). **L** for Phase 4 (2–6 months when triggered by first relevant engagement).
