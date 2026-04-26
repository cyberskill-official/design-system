/**
 * @cyberskill/tokens — DTCG 2025.10 design tokens, programmatic interface.
 *
 * The source-of-truth JSON files live one level up at `../../tokens/*.tokens.json`.
 * This module re-exports them for consumers who want to read tokens at runtime
 * (e.g., the theme generator, the MCP server, the wiki SPA).
 *
 * For build-time consumption (CSS variables, JS constants, Swift enums, Android
 * XML resources), use the multi-platform build at `dist/` produced by
 * `scripts/build-tokens.mjs`.
 *
 * Per RFC 2026-003 + the doctrine §15 cross-cutting commitment 7 (DTCG-native
 * tokens), token values are NEVER hand-edited at the consumer side; consumers
 * reference token paths only.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_DIR = resolve(__dirname, '../../../tokens');

const load = (name) => JSON.parse(readFileSync(resolve(TOKENS_DIR, `${name}.tokens.json`), 'utf8'));

export const colour = load('colour');
export const motion = load('motion');
export const space = load('space');
export const type = load('type');
export const elevation = load('elevation');

export const all = {
  colour,
  motion,
  space,
  type,
  elevation,
};

/**
 * Resolve a dot-path token reference like "color.semantic.danger" to its $value.
 * Recursively resolves alias references like "{color.warm-white}".
 */
export function resolveToken(path, source = all) {
  const parts = path.split('.');
  // The first segment matches a top-level domain (color, motion, space, type, elevation)
  // — handle the legacy/canonical "color" vs "colour" by aliasing
  const head = parts[0];
  let cursor;
  if (head === 'color' || head === 'colour') cursor = source.colour.color;
  else if (head === 'motion') cursor = source.motion.motion;
  else if (head === 'space') cursor = source.space.space;
  else if (head === 'font') cursor = source.type.font;
  else if (head === 'elevation') cursor = source.elevation.elevation;
  else return undefined;

  for (let i = 1; i < parts.length; i++) {
    if (cursor == null) return undefined;
    cursor = cursor[parts[i]];
  }
  if (cursor == null) return undefined;
  if (cursor.$value !== undefined) {
    const v = cursor.$value;
    if (typeof v === 'string' && v.startsWith('{') && v.endsWith('}')) {
      return resolveToken(v.slice(1, -1), source);
    }
    return v;
  }
  return cursor;
}
