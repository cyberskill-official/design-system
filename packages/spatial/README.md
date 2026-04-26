# @cyberskill/spatial

Sketch-class spatial / immersive primitives for the CyberSkill Design System. Per **RFC 2026-006** + audit `§14.20` expansion. Closes `A6.6` / `B3.7` → 4 path.

## Phase 4 (shipped 2026-04-26)

- **Depth tokens**: 5-level surface family + 3-material family (solid / glass / haze) — see `./tokens`
- **Six primitive type contracts**: `SpatialContainer`, `DepthSurface`, `EyeFocus`, `HandPinch`, `SpatialAudio`, `SafeZone` — see `./primitives`
- **Platform detection**: `detectSpatialContext()` returns `'visionos' | 'quest' | 'wearos' | 'flat'`

## Phase 5 (Q2 2028 trigger — first VR/AR engagement)

Actual platform-native implementations:
- visionOS via RealityKit
- Quest via WebXR
- Wear OS via Wear Compose

Hard rule from RFC 2026-006 §3: every spatial primitive ships with a non-spatial fallback. Progressive enhancement; never broken UI in 2D.

## Usage (Phase 4 — types-only consumption)

```ts
import { detectSpatialContext, depth, type SpatialContainerProps } from '@cyberskill/spatial';

const ctx = detectSpatialContext();
console.log(ctx); // 'flat' | 'visionos' | 'quest' | 'wearos'

// Token consumption:
const elevation = depth.surface.floating; // 16
const glass = depth.material.glass;       // { opacity: 0.85, backdropFilter: '...' }
```

## Doctrine references

- RFC 2026-006 — `Design System/docs/RFCs/2026-006-spatial-interaction-sketch.md`
- `Design System/docs/00-audit-and-roadmap.md` §14.20 — AR/VR layout primitives
- `Design System/docs/part-2-design-language.md` §27 — token-layer extensions
