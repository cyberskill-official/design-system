/**
 * Depth-token vocabulary per RFC 2026-006 §1.
 *
 * The doctrine ships these as a separate file (tokens/depth.tokens.json
 * — Phase 5 wires the DTCG file). For now they live as TS constants
 * consumable from React, web-components, and react-native.
 */

export const depth = {
  surface: {
    flat:     0,    // 2D — no z-offset
    raised:   8,    // button hover, card lift
    floating: 16,   // modal, drawer in 3D space
    overlay:  32,   // toasts, tooltips, notifications
    spatial:  64,   // visionOS-class glass materials
  },
  material: {
    solid:  { opacity: 1.0, backdropFilter: 'none' },
    glass:  { opacity: 0.85, backdropFilter: 'blur(20px) saturate(180%)' },
    haze:   { opacity: 0.5,  backdropFilter: 'blur(40px)' },
  },
} as const;

export type DepthSurface = keyof typeof depth.surface;
export type DepthMaterial = keyof typeof depth.material;
