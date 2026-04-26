/**
 * @cyberskill/theme-generator — programmatic API.
 *
 * Per RFC 2026-004, this package generates a DTCG-conformant theme overlay
 * from a logo or primary brand colour. Hard validation gates ensure WCAG 2.2
 * AA contrast; anchor immutables (Umber + Ochre) are never overridden.
 */

import { validateContrast, srgbToOklch, contrastRatio } from './validate.mjs';
import { emitThemeJson } from './emit.mjs';
import { extractPrimary } from './extract.mjs';

export { validateContrast, srgbToOklch, contrastRatio, emitThemeJson, extractPrimary };

/**
 * generateTheme — top-level convenience.
 *
 * @param {object} input
 * @param {string} [input.primary]   - "#hex", "oklch(...)", or DTCG ref
 * @param {string} [input.accent]    - optional secondary brand colour
 * @param {string} [input.tenant]    - tenant slug for the overlay file
 * @param {object} [input.options]   - reserved for v2 (tone hints, etc.)
 * @returns {{ tokens: object, warnings: string[], passed: boolean }}
 */
export function generateTheme(input) {
  if (!input.primary) {
    throw new Error('generateTheme: input.primary is required.');
  }
  // For v1, the primary is provided directly; the logo-extraction path
  // (input.logo) is reserved for v2.
  const primaryOklch = srgbToOklch(input.primary);
  if (!primaryOklch) {
    throw new Error(`generateTheme: cannot parse primary colour "${input.primary}".`);
  }
  const accent = input.accent ?? deriveAccent(primaryOklch);
  const ramp = deriveRamp(primaryOklch);

  const validation = validateContrast({ primary: input.primary, accent, ramp });
  return {
    tokens: emitThemeJson({
      tenant: input.tenant ?? 'tenant',
      primary: input.primary,
      accent,
      ramp,
    }),
    warnings: validation.warnings,
    passed: validation.passed,
  };
}

// ─── Helpers (v1 placeholders for the full algorithm) ──────────────────

function deriveAccent(primaryOklch) {
  // v1 simplified: rotate hue +180° for complementary accent.
  // v2 replaces this with a learned palette derived from the logo.
  const [L, C, H] = primaryOklch;
  return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${((H + 180) % 360).toFixed(1)})`;
}

function deriveRamp(primaryOklch) {
  // 12-step ramp at constant chroma/hue; vary lightness 0.05 → 0.97.
  // Mirrors Part 2 §3–§4 ramp algorithm.
  const [, C, H] = primaryOklch;
  const stops = [];
  for (let i = 0; i <= 11; i++) {
    const L = 0.05 + (0.92 * i) / 11;
    stops.push(`oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`);
  }
  return stops;
}
