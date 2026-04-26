#!/usr/bin/env node
//
// cs-codemod — migrate source files from another design system to CyberSkill.
//
// Usage:
//   cs-codemod material 'src/**/*.tsx'
//   cs-codemod polaris  'src/**/*.tsx'
//   cs-codemod carbon   'src/**/*.tsx'
//   cs-codemod material src/Button.tsx --dry-run
//   cs-codemod material --help
//
// Phase 3 ships regex-based transforms. Phase 4 swaps in jscodeshift for
// AST-aware coverage of edge cases (nested JSX, conditional props).
//

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { transformMaterial } from './material-to-cyberskill.mjs';
import { transformPolaris } from './polaris-to-cyberskill.mjs';
import { transformCarbon } from './carbon-to-cyberskill.mjs';

const TRANSFORMS = {
  material: transformMaterial,
  polaris: transformPolaris,
  carbon: transformCarbon,
};

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h') || args.length === 0) {
  process.stdout.write(`cs-codemod — migrate to @cyberskill/react

Usage:
  cs-codemod {material|polaris|carbon} <files...> [--dry-run] [--json]

Examples:
  cs-codemod material src/Button.tsx
  cs-codemod polaris  src/**/*.tsx --dry-run
  cs-codemod carbon   src/index.tsx --json

Flags:
  --dry-run   Print the diff but do not write
  --json      Emit a structured JSON summary instead of inline diff

Per audit §14.16. Phase 3 = regex-based (~80% coverage). Manual review
always required after migration; warnings call out the cases that don't
auto-translate (theme tokens, sx-style props, app providers).
`);
  process.exit(0);
}

const sourceDS = args[0];
const transform = TRANSFORMS[sourceDS];
if (!transform) {
  console.error(`Unknown source DS: "${sourceDS}". Valid: material, polaris, carbon.`);
  process.exit(1);
}

const dryRun = args.includes('--dry-run');
const jsonMode = args.includes('--json');
const files = args.slice(1).filter((a) => !a.startsWith('--'));

if (files.length === 0) {
  console.error('No files provided. Pass at least one file path.');
  process.exit(1);
}

const results = [];
let totalChanges = 0;
let totalWarnings = 0;

for (const f of files) {
  const path = resolve(process.cwd(), f);
  if (!existsSync(path)) {
    console.error(`[cs-codemod] Skipping (not found): ${f}`);
    continue;
  }
  const before = readFileSync(path, 'utf8');
  const { source, changes, warnings } = transform(before);
  results.push({ file: f, changes, warnings, modified: source !== before });
  totalChanges += changes.length;
  totalWarnings += warnings.length;

  if (!dryRun && source !== before) {
    writeFileSync(path, source, 'utf8');
  }
}

if (jsonMode) {
  process.stdout.write(JSON.stringify({ source: sourceDS, dryRun, totalChanges, totalWarnings, results }, null, 2) + '\n');
} else {
  console.log(`[cs-codemod] ${sourceDS} → @cyberskill/react${dryRun ? ' (dry-run)' : ''}`);
  console.log('');
  for (const r of results) {
    const status = r.modified ? '✏️  modified' : '·  unchanged';
    console.log(`  ${status}  ${r.file}  (${r.changes.length} change${r.changes.length === 1 ? '' : 's'})`);
    for (const w of r.warnings) console.log(`    ⚠  ${w}`);
  }
  console.log('');
  console.log(`Total: ${totalChanges} changes, ${totalWarnings} warnings.`);
  if (!dryRun) console.log(`Wrote ${results.filter((r) => r.modified).length} files.`);
  console.log('');
  console.log('Manual review still required — see warnings above for cases the codemod cannot auto-translate.');
}

process.exit(0);
