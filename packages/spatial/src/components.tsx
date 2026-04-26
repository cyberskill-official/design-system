/**
 * Spatial primitive React implementations — Phase 5 starter.
 *
 * Per RFC 2026-006 §3 — every spatial primitive ships with a non-spatial
 * fallback. Progressive enhancement; never broken UI in 2D.
 *
 * Phase 5 Wave 1 ships React-only with progressive-enhancement fallbacks.
 * Phase 5 Wave 2 adds visionOS RealityKit + Quest WebXR + Wear OS Compose
 * native paths once the first VR/AR engagement materialises.
 */

import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { depth, type DepthSurface, type DepthMaterial } from './depth-tokens.ts';
import { detectSpatialContext, type SpatialContext } from './primitives.ts';

// ─── 1. SpatialContainer — content with z-axis placement ───────────────

export interface SpatialContainerComponentProps {
  /** Depth level (z-axis offset). Maps to box-shadow in 2D fallback. */
  depthLevel?: DepthSurface;
  /** Material treatment — controls translucency / backdrop blur. */
  material?: DepthMaterial;
  /** Render-mode hint. 'auto' (default) detects platform; 'flat' forces 2D. */
  mode?: 'auto' | 'flat';
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function SpatialContainer({
  depthLevel = 'flat',
  material = 'solid',
  mode = 'auto',
  children,
  className = '',
  style = {},
}: SpatialContainerComponentProps) {
  const [ctx, setCtx] = useState<SpatialContext>('flat');
  useEffect(() => {
    if (mode !== 'flat') setCtx(detectSpatialContext());
  }, [mode]);

  const z = depth.surface[depthLevel];
  const mat = depth.material[material];

  // 2D fallback — box-shadow translates the z-axis offset, backdrop-filter
  // approximates the material treatment.
  const fallbackStyle: CSSProperties = {
    boxShadow: z === 0 ? 'none' : `0 ${z / 2}px ${z * 1.5}px rgba(69, 33, 14, 0.${Math.min(z * 2, 24)})`,
    backdropFilter: mat.backdropFilter,
    opacity: mat.opacity,
    ...style,
  };

  // Spatial path — visionOS / Quest get a CSS transform with translateZ.
  const spatialStyle: CSSProperties = {
    transform: `translateZ(${z}px)`,
    transformStyle: 'preserve-3d',
    backdropFilter: mat.backdropFilter,
    ...style,
  };

  const isSpatial = ctx === 'visionos' || ctx === 'quest';
  const finalStyle = isSpatial ? spatialStyle : fallbackStyle;

  return (
    <div
      className={className}
      style={finalStyle}
      data-cs-spatial-context={ctx}
      data-cs-depth-level={depthLevel}
      data-cs-material={material}
    >
      {children}
    </div>
  );
}

// ─── 2. DepthSurface — token-driven elevation ──────────────────────────

export interface DepthSurfaceComponentProps {
  level?: DepthSurface;
  children?: ReactNode;
  className?: string;
}

export function DepthSurface({ level = 'flat', children, className = '' }: DepthSurfaceComponentProps) {
  return (
    <SpatialContainer depthLevel={level} material="solid" className={className}>
      {children}
    </SpatialContainer>
  );
}

// ─── 3. EyeFocus — gaze targeting + :hover fallback ────────────────────

export interface EyeFocusComponentProps {
  onFocus?: () => void;
  onBlur?: () => void;
  children?: ReactNode;
  className?: string;
}

export function EyeFocus({ onFocus, onBlur, children, className = '' }: EyeFocusComponentProps) {
  const [ctx, setCtx] = useState<SpatialContext>('flat');
  useEffect(() => setCtx(detectSpatialContext()), []);

  // 2D fallback: pointer hover. visionOS path: gaze API (Phase 5 Wave 2 wires
  // the actual visionOS `eyeTrackingEnabled` event listener).
  const handleMouseEnter = () => onFocus?.();
  const handleMouseLeave = () => onBlur?.();
  const handleFocusKeyboard = () => onFocus?.();
  const handleBlurKeyboard = () => onBlur?.();

  return (
    <div
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocusKeyboard}
      onBlur={handleBlurKeyboard}
      className={className}
      data-cs-eye-focus={ctx === 'visionos' ? 'gaze' : 'pointer-fallback'}
    >
      {children}
    </div>
  );
}

// ─── 4. HandPinch — pinch gesture + click fallback ─────────────────────

export interface HandPinchComponentProps {
  onPinch?: () => void;
  children?: ReactNode;
  className?: string;
}

export function HandPinch({ onPinch, children, className = '' }: HandPinchComponentProps) {
  const [ctx, setCtx] = useState<SpatialContext>('flat');
  useEffect(() => setCtx(detectSpatialContext()), []);

  // 2D fallback: native click. visionOS / Quest path (Phase 5 Wave 2):
  // bind the platform's pinch-tap gesture event.
  return (
    <button
      type="button"
      onClick={() => onPinch?.()}
      className={className}
      data-cs-hand-pinch={ctx === 'visionos' || ctx === 'quest' ? 'pinch' : 'click-fallback'}
    >
      {children}
    </button>
  );
}

// ─── 5. SpatialAudio — earcons for off-screen attention ────────────────

export interface SpatialAudioComponentProps {
  src: string;
  /** Spatial position [x, y, z] in metres. */
  position?: [number, number, number];
  /** When `null`, plays as monaural audio (2D fallback). */
  volume?: number;
  autoPlay?: boolean;
}

export function SpatialAudio({ src, position, volume = 1, autoPlay = false }: SpatialAudioComponentProps) {
  const ref = useRef<HTMLAudioElement>(null);
  const [ctx, setCtx] = useState<SpatialContext>('flat');
  useEffect(() => setCtx(detectSpatialContext()), []);

  // 2D fallback: native <audio>. Spatial path (Phase 5 Wave 2): WebAudio
  // PannerNode positioning using the `position` array.
  return (
    <audio
      ref={ref}
      src={src}
      autoPlay={autoPlay}
      data-cs-spatial-audio={ctx === 'visionos' || ctx === 'quest' ? '3d' : 'mono-fallback'}
      data-cs-position={position?.join(',')}
      style={{ display: 'none' }}
    />
  );
}

// ─── 6. SafeZone — ergonomic FOV reach guidance ────────────────────────

export interface SafeZoneComponentProps {
  /** Reach radius in metres (visionOS / Quest). */
  reachRadius?: number;
  /** When in 2D fallback, applies max-width matching the radius (1m ≈ 1080px). */
  children?: ReactNode;
  className?: string;
}

export function SafeZone({ reachRadius = 1, children, className = '' }: SafeZoneComponentProps) {
  const [ctx, setCtx] = useState<SpatialContext>('flat');
  useEffect(() => setCtx(detectSpatialContext()), []);

  // 2D fallback: max-width of (reachRadius * 1080px). Spatial path: applies
  // a 3D bounding-box constraint.
  const maxWidth = `${reachRadius * 1080}px`;

  return (
    <div
      className={className}
      style={{ maxWidth, marginInline: 'auto' }}
      data-cs-safe-zone={ctx === 'visionos' || ctx === 'quest' ? '3d' : 'flat-fallback'}
      data-cs-reach-radius={reachRadius}
    >
      {children}
    </div>
  );
}
