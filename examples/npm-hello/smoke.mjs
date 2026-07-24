#!/usr/bin/env node
/**
 * Offline smoke for examples/npm-hello — proves the published package name is
 * installed and that package exports resolve without a bundler.
 * Run from this directory after `npm install`.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fail = (m) => {
  console.error('✗ npm-hello smoke:', m);
  process.exit(1);
};

const designRoot = join(__dirname, 'node_modules/@cyberskill/design');
const pkgPath = join(designRoot, 'package.json');
if (!existsSync(pkgPath)) fail('run npm install in examples/npm-hello first');

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
if (pkg.name !== '@cyberskill/design') fail('unexpected package name ' + pkg.name);
if (pkg.version !== '1.0.0') fail('expected @cyberskill/design@1.0.0, got ' + pkg.version);

// ESM resolve of the package entry (exports["."] → _esm/cs.mjs)
let resolvedEntry;
try {
  resolvedEntry = fileURLToPath(import.meta.resolve('@cyberskill/design'));
} catch (e) {
  fail('import.meta.resolve(@cyberskill/design) failed: ' + (e && e.message));
}
if (!resolvedEntry.includes('@cyberskill/design') || !resolvedEntry.endsWith('_esm/cs.mjs')) {
  fail('unexpected entry resolve: ' + resolvedEntry);
}

const styles = join(designRoot, 'styles.css');
const esm = join(designRoot, '_esm/cs.mjs');
const bundle = join(designRoot, '_ds_bundle.js');
for (const p of [styles, esm, bundle]) {
  if (!existsSync(p)) fail('missing entry ' + p);
}

const exportsMap = pkg.exports || {};
if (!exportsMap['.']?.import?.includes('_esm/cs.mjs')) fail('exports["."] missing _esm/cs.mjs');
if (!exportsMap['./styles.css']) fail('exports["./styles.css"] missing');

const html = readFileSync(join(__dirname, 'index.html'), 'utf8');
if (!html.includes('@cyberskill/design')) fail('index.html must import package name');
if (!/data-cs-element="hoa"/.test(html) || !/data-cs-variant="plasma"/.test(html)) {
  fail('index.html must scope Lumi identity (hoa · plasma) from docs/products.md');
}

console.log('PASS examples/npm-hello smoke', {
  package: '@cyberskill/design@' + pkg.version,
  entry: resolvedEntry.replace(__dirname + '/', ''),
  product: 'Lumi',
  element: 'hoa',
  variant: 'plasma',
});
