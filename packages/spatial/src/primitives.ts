/**
 * Spatial-interaction primitive sketches per RFC 2026-006 §2.
 *
 * Six primitives — sketch-class. Phase 5 (Q2 2028 trigger) ships full
 * implementations with platform-native APIs (RealityKit on visionOS,
 * WebXR on Quest, Wear OS shape APIs on watch surfaces).
 *
 * Until then these primitives expose:
 *   - the type contract (so consumers can import + use them in flat 2D mode)
 *   - the platform-detection helper (whether a spatial runtime is available)
 *   - the 2D fallback (always works; renders with the existing depth tokens
 *     mapped to box-shadow elevation)
 *
 * Hard rule from RFC 2026-006 §3 — every spatial primitive ships with a
 * non-spatial fallback. Progressive enhancement; never broken UI in 2D.
 */

import { depth } from './depth-tokens.ts';

export type SpatialContext = 'flat' | 'visionos' | 'quest' | 'wearos' | 'unknown';

/**
 * Detect the spatial runtime. Phase 4 returns 'flat' for everything except
 * visionOS Safari (the only platform with stable detection today). Phase 5
 * extends this to Quest WebXR + Wear OS.
 */
export function detectSpatialContext(): SpatialContext {
  if (typeof navigator === 'undefined') return 'flat';
  // visionOS Safari sets a specific UA string
  if (/visionos/i.test(navigator.userAgent)) return 'visionos';
  // Quest browser (Oculus / Meta) — best-effort
  if (/oculus|quest/i.test(navigator.userAgent)) return 'quest';
  // Wear OS — heuristic; real check via window.matchMedia('(width:wear)') future
  if (/android.*wear/i.test(navigator.userAgent)) return 'wearos';
  return 'flat';
}

// ─── 1. SpatialContainer — wraps content for 3D-space placement ────────

export interface SpatialContainerProps {
  depth?: keyof typeof depth.surface;     // default: 'flat'
  material?: 'solid' | 'glass' | 'haze';  // default: 'solid'
  children?: unknown;
  /** Fallback className applied in flat 2D mode. */
  fallbackClassName?: string;
}

// ─── 2. DepthSurface — token-driven elevation ──────────────────────────

export interface DepthSurfaceProps {
  level?: keyof typeof depth.surface;
  children?: unknown;
}

// ─── 3. EyeFocus — gaze targeting + fallback :hover ────────────────────

export interface EyeFocusProps {
  onFocus?: () => void;
  onBlur?: () => void;
  children?: unknown;
}

// ─── 4. HandPinch — pinch-tap gesture + fallback click ─────────────────

export interface HandPinchProps {
  onPinch?: () => void;
  children?: unknown;
}

// ─── 5. SpatialAudio — earcon for off-screen attention ─────────────────

export interface SpatialAudioProps {
  src: string;
  /** Spatial position [x, y, z] in metres. */
  position?: [number, number, number];
  /** When `null`, plays as monaural audio (2D fallback). */
  volume?: number;
}

// ─── 6. SafeZone — ergonomic FOV reach guidance ────────────────────────

export interface SafeZoneProps {
  /** Reach radius in metres (visionOS / Quest). */
  reachRadius?: number;
  /** When in 2D fallback, applies `max-width` matching the radius (1m ≈ 1080px). */
  children?: unknown;
}

/**
 * Spatial-context summary — useful for analytics / DesignOps cost-value model.
 */
export const spatialModule = {
  __version: '1.0.0',
  __rfc: '2026-006',
  __wave: 'Phase 4 sketch',
  __platforms_detected: ['visionos', 'quest', 'wearos', 'flat'],
  __primitives_planned: ['SpatialContainer', 'DepthSurface', 'EyeFocus', 'HandPinch', 'SpatialAudio', 'SafeZone'],
};
