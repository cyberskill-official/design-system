/**
 * Unit tests for pure helpers in push-figma-variables.mjs (no network, no secrets).
 */
import {
  hexToFigmaColor,
  flattenDtcg,
  toFigmaName,
  pickColorLeaves,
  isEnterpriseVariablesBlock,
} from './push-figma-variables.mjs';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

function assert(c, m) {
  if (!c) throw new Error(m || 'assert failed');
}

const umber = hexToFigmaColor('#45210E');
assert(Math.abs(umber.r - 0x45 / 255) < 1e-9, 'umber r');
assert(Math.abs(umber.g - 0x21 / 255) < 1e-9, 'umber g');
assert(Math.abs(umber.b - 0x0e / 255) < 1e-9, 'umber b');
assert(umber.a === 1, 'umber a');

const short = hexToFigmaColor('#f4b');
assert(short.r > 0.9 && short.g > 0.2, 'short hex expands');

assert(toFigmaName('color.--cs-color-brand-umber') === 'color/brand/umber'
  || toFigmaName('color.--cs-color-brand-umber').includes('brand'),
  'name maps: ' + toFigmaName('color.--cs-color-brand-umber'));

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const dtcg = JSON.parse(readFileSync(join(root, 'tokens/tokens.dtcg.json'), 'utf8'));
const leaves = flattenDtcg(dtcg);
assert(leaves.length >= 100, 'flatten leaves ' + leaves.length);
const colors = pickColorLeaves(leaves);
assert(colors.length >= 10, 'color leaves ' + colors.length);
assert(colors.every((c) => typeof c.value === 'string' && c.value.startsWith('#')), 'all hex');

// names unique
const names = colors.map((c) => toFigmaName(c.path));
assert(new Set(names).size === names.length, 'unique figma names');

assert(isEnterpriseVariablesBlock(new Error('Figma GET /files/x/variables/local → 403: Invalid scope(s): file_content:read. This endpoint requires the file_variables:read scope')), 'enterprise block: scopes');
assert(isEnterpriseVariablesBlock('Enterprise plan only'), 'enterprise block: plan note');
assert(!isEnterpriseVariablesBlock(new Error('Figma GET /files/x → 404: Not found')), 'not enterprise: 404');

console.log('PASS test-figma-push-helpers', {
  leaves: leaves.length,
  colors: colors.length,
  sample: names.slice(0, 5),
  umber,
});
