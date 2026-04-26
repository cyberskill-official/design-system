/**
 * @cyberskill/codemods — migration codemods.
 *
 * Per audit §14.16 expansion. Three codemods, each transforms a source DS's
 * imports + JSX to @cyberskill/react equivalents. Phase 3 ships
 * source-to-source string replacement (regex-based — covers ~80% of real
 * usage); Phase 4 swaps in jscodeshift for AST-aware transforms.
 */

export { transformMaterial } from './material-to-cyberskill.mjs';
export { transformPolaris } from './polaris-to-cyberskill.mjs';
export { transformCarbon } from './carbon-to-cyberskill.mjs';

export const codemods = {
  __version: '1.0.0',
  __coverage: '~80% (regex-based; AST in Phase 4)',
  __sources: ['Material UI v5+', 'Shopify Polaris 2025', 'IBM Carbon 11+'],
};
