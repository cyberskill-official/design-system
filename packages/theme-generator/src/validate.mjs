/**
 * Colour math + WCAG 2.2 AA contrast validation.
 *
 * Zero-dep — uses only standard JavaScript. The OKLCH math is approximate
 * (matches the Oklab paper to ~3 decimal places); v2 may import `culori` for
 * higher fidelity. The contrast ratio matches WCAG 2.x exactly.
 */

// ─── sRGB ↔ OKLCH ──────────────────────────────────────────────────────

const srgbToLinear = (c) => {
  c = c / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};

const linearToSrgb = (c) => {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
};

function parseHex(hex) {
  const s = hex.replace('#', '');
  if (s.length === 3) {
    return [
      parseInt(s[0] + s[0], 16),
      parseInt(s[1] + s[1], 16),
      parseInt(s[2] + s[2], 16),
    ];
  }
  if (s.length === 6) {
    return [
      parseInt(s.slice(0, 2), 16),
      parseInt(s.slice(2, 4), 16),
      parseInt(s.slice(4, 6), 16),
    ];
  }
  return null;
}

/** Convert an sRGB triple to OKLCH (L, C, h). Approximate. */
export function rgbToOklch([r, g, b]) {
  const lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const bComp = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  const C = Math.sqrt(a * a + bComp * bComp);
  let H = (Math.atan2(bComp, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [L, C, H];
}

/** Parse a colour string (#hex, oklch(...)) and return [L, C, H] or null. */
export function srgbToOklch(input) {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (trimmed.startsWith('#')) {
    const rgb = parseHex(trimmed);
    return rgb ? rgbToOklch(rgb) : null;
  }
  const m = trimmed.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/i);
  if (m) {
    return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
  }
  return null;
}

// ─── WCAG 2.2 contrast ─────────────────────────────────────────────────

/** Relative luminance per WCAG 2.x. */
function luminance([r, g, b]) {
  const lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/** Contrast ratio between two colours per WCAG 2.x. Returns a value in [1, 21]. */
export function contrastRatio(fg, bg) {
  const fgRgb = typeof fg === 'string' ? parseHex(fg) : fg;
  const bgRgb = typeof bg === 'string' ? parseHex(bg) : bg;
  if (!fgRgb || !bgRgb) return null;
  const l1 = luminance(fgRgb);
  const l2 = luminance(bgRgb);
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

// ─── Theme contrast validation ─────────────────────────────────────────

/**
 * Validate contrast against the WCAG 2.2 AA hard-floor:
 *   - text-on-surface ≥ 4.5:1
 *   - UI ≥ 3:1
 *
 * Returns { passed: boolean, warnings: string[], findings: object[] }
 */
export function validateContrast({ primary, accent, ramp }) {
  const warnings = [];
  const findings = [];

  // Sample pairings the doctrine mandates:
  //   - text.default ON surface.default
  //   - accent.default ON surface.default (UI)
  //   - text.default ON accent.default (button label)
  // The base text/surface colours come from the doctrine; tenant overrides
  // typically only touch primary + accent. So we validate accent against
  // the doctrine's text and surface anchors.

  const textAnchor = '#2A1505';      // doctrine color.text.default
  const surfaceAnchor = '#FAF6F1';   // doctrine color.surface.default

  const accentVsSurface = contrastRatio(accent, surfaceAnchor);
  if (accentVsSurface !== null) {
    findings.push({ pair: 'accent on surface', ratio: accentVsSurface, required: 3.0 });
    if (accentVsSurface < 3.0) {
      warnings.push(`Accent vs surface contrast ${accentVsSurface.toFixed(2)} < 3.0 (WCAG 2.2 AA UI floor).`);
    }
  }

  const textVsAccent = contrastRatio(textAnchor, primary);
  if (textVsAccent !== null) {
    findings.push({ pair: 'text on primary', ratio: textVsAccent, required: 4.5 });
    if (textVsAccent < 4.5) {
      warnings.push(`Text vs primary contrast ${textVsAccent.toFixed(2)} < 4.5 (WCAG 2.2 AA text floor). Consider darker primary or lighter text override.`);
    }
  }

  return {
    passed: warnings.length === 0,
    warnings,
    findings,
  };
}
