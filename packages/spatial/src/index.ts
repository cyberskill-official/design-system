/**
 * @cyberskill/spatial — sketch-class spatial / immersive primitives.
 *
 * Per RFC 2026-006 + audit §14.20 expansion. Closes A6.6 / B3.7 → 4 path.
 *
 * Phase 4 ships:
 *   - depth tokens (surface + material families)
 *   - primitive type contracts (so consumer code compiles)
 *   - platform-detection helper
 *
 * Phase 5 ships the actual platform-native implementations once the first
 * VR/AR engagement materialises.
 */

export { depth, type DepthSurface, type DepthMaterial } from './depth-tokens.ts';
export {
  detectSpatialContext,
  type SpatialContext,
  type SpatialContainerProps,
  type DepthSurfaceProps,
  type EyeFocusProps,
  type HandPinchProps,
  type SpatialAudioProps,
  type SafeZoneProps,
  spatialModule,
} from './primitives.ts';
// Phase 5 Wave 1 React implementations with progressive-enhancement fallback.
export {
  SpatialContainer,
  DepthSurface as DepthSurfaceComponent,
  EyeFocus,
  HandPinch,
  SpatialAudio,
  SafeZone,
  type SpatialContainerComponentProps,
  type DepthSurfaceComponentProps,
  type EyeFocusComponentProps,
  type HandPinchComponentProps,
  type SpatialAudioComponentProps,
  type SafeZoneComponentProps,
} from './components.tsx';
