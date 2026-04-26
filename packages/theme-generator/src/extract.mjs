/**
 * Logo-to-palette extraction.
 *
 * v1: SVG colour-attribute scan only. Parses `<svg>` source, finds fill="#..."
 * and stop-color="#..." attributes, returns the dominant non-grey colour.
 *
 * v2 will add raster (PNG/JPEG) k-means clustering. v1 is sufficient for the
 * common B2B SaaS case where logos ship as SVG with explicit fills.
 */

import { readFileSync } from 'node:fs';
import { rgbToOklch } from './validate.mjs';

const HEX_RE = /(?:fill|stop-color|color)\s*=\s*"(#[0-9a-fA-F]{3,8})"/g;

const parseHex = (hex) => {
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
};

/**
 * extractPrimary — read an SVG file and return its dominant chromatic colour as #hex.
 * Returns null if no SVG / no chromatic colours found.
 */
export function extractPrimary(svgPath) {
  let src;
  try {
    src = readFileSync(svgPath, 'utf8');
  } catch {
    return null;
  }

  const candidates = new Map(); // hex → count
  let match;
  while ((match = HEX_RE.exec(src)) !== null) {
    const hex = match[1].toLowerCase();
    if (hex === '#000' || hex === '#000000' || hex === '#fff' || hex === '#ffffff') continue;
    candidates.set(hex, (candidates.get(hex) ?? 0) + 1);
  }

  if (candidates.size === 0) return null;

  // Score candidates by chroma × frequency
  let best = null;
  let bestScore = -1;
  for (const [hex, freq] of candidates) {
    const rgb = parseHex(hex);
    if (!rgb) continue;
    const [, C] = rgbToOklch(rgb);
    const score = C * freq;
    if (score > bestScore) {
      bestScore = score;
      best = hex;
    }
  }

  return best;
}
