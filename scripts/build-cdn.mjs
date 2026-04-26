#!/usr/bin/env node
/**
 * build-cdn.mjs — build the CDN distribution bundle
 * ─────────────────────────────────────────────────
 *
 * Per RFC 2026-002 § Architecture choice (Polaris-style single bundle).
 * Produces:
 *   dist-cdn/loader.js              — concatenated ESM of all web-components
 *                                      + tokens.css + auto-register call
 *   dist-cdn/loader.js.integrity    — SHA-384 integrity hash for SRI pinning
 *   dist-cdn/.integrity.json        — machine-readable integrity manifest
 *   dist-cdn/themes/{tenant}.css    — per-tenant theme overlays (when present)
 *
 * The actual upload to Cloudflare R2 / cdn.cyberskill.dev is the next
 * step — wired in .github/workflows/release.yml as a separate job once
 * the CLOUDFLARE_R2_TOKEN secret is provisioned.
 *
 * Zero-dep Node ESM. Uses Node's native crypto for SRI hashes.
 *
 * Usage:
 *   pnpm build:cdn
 *   pnpm build:cdn --version v1.0.0
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'dist-cdn');
const PKG = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));

const args = process.argv.slice(2);
const versionArg = args.find((a, i) => args[i - 1] === '--version');
const version = versionArg ?? PKG.version ?? '1.0.0';

// Overwrite-in-place strategy (don't rm the directory — some CI sandboxes
// disallow rmdir of files we own). writeFileSync clobbers each file on its own.
mkdirSync(OUT, { recursive: true });
mkdirSync(resolve(OUT, 'themes'), { recursive: true });

// ─── 1. Concatenate the web-components into a single ESM bundle ────────

const WC_DIR = resolve(ROOT, 'packages/web-components/src');
const PRIMITIVES_DIR = resolve(ROOT, 'packages/primitives/src');

const componentFiles = [
  // Order matters — primitives first; cs-button then alphabetical
  resolve(PRIMITIVES_DIR, 'use-disclosure.mjs'),
  resolve(PRIMITIVES_DIR, 'use-focus-trap.mjs'),
  resolve(PRIMITIVES_DIR, 'use-tabs.mjs'),
  resolve(WC_DIR, 'cs-button.mjs'),
  resolve(WC_DIR, 'cs-card.mjs'),
  resolve(WC_DIR, 'cs-checkbox.mjs'),
  resolve(WC_DIR, 'cs-input.mjs'),
  resolve(WC_DIR, 'cs-modal.mjs'),
  resolve(WC_DIR, 'cs-nav.mjs'),
  resolve(WC_DIR, 'cs-radio.mjs'),
  resolve(WC_DIR, 'cs-select.mjs'),
  resolve(WC_DIR, 'cs-table.mjs'),
  resolve(WC_DIR, 'cs-tabs.mjs'),
  resolve(WC_DIR, 'cs-toast.mjs'),
  resolve(WC_DIR, 'cs-toggle.mjs'),
];

const fileSummaries = [];
let combinedSrc = `/*!
 * CyberSkill Design System — CDN bundle
 * Version: ${version}
 * Generated: ${new Date().toISOString()}
 * License: see Design System/docs/00-audit-and-roadmap.md §17
 *
 * Per RFC 2026-002 (CDN distribution architecture). This is a single-file
 * concatenation of @cyberskill/web-components + dependencies, suitable for
 * <script src="https://cdn.cyberskill.dev/v1/loader.js">.
 *
 * For SRI pinning, see dist-cdn/.integrity.json.
 */
`;

// Strip imports/exports — concat-friendly. v2 will use a real bundler.
function stripImportsExports(src) {
  return src
    .replace(/^import\s+.*?from\s+['"][^'"]+['"];?\s*$/gm, '// import stripped during CDN bundle')
    .replace(/^export\s+(?:default\s+)?/gm, '/* export */ ');
}

for (const f of componentFiles) {
  if (!existsSync(f)) continue;
  const src = readFileSync(f, 'utf8');
  fileSummaries.push({ name: basename(f), bytes: src.length });
  combinedSrc += `\n\n// ──── ${basename(f)} ────\n`;
  combinedSrc += stripImportsExports(src);
}

// Add the tag-registration footer
combinedSrc += `\n\n// ──── Auto-register all CyberSkill custom elements ────\n`;
combinedSrc += `if (typeof customElements !== 'undefined') {
  const registry = [
    ['cs-button', CSButton],
    ['cs-input', CSInput],
    ['cs-checkbox', CSCheckbox],
    ['cs-radio', CSRadio],
    ['cs-toggle', CSToggle],
    ['cs-card', CSCard],
    ['cs-modal', CSModal],
    ['cs-toast', CSToast],
    ['cs-tabs', CSTabs],
    ['cs-tab', CSTab],
    ['cs-tab-panel', CSTabPanel],
    ['cs-table', CSTable],
    ['cs-nav', CSNav],
    ['cs-nav-item', CSNavItem],
    ['cs-select', CSSelect],
  ];
  for (const [tag, ctor] of registry) {
    try { if (!customElements.get(tag)) customElements.define(tag, ctor); }
    catch (e) { console.warn('[cyberskill] failed to register', tag, e); }
  }
}
`;

writeFileSync(resolve(OUT, 'loader.js'), combinedSrc);

// ─── 2. Bundle CSS — include built tokens.css ──────────────────────────

const tokensCss = resolve(ROOT, 'packages/tokens/dist/tokens.css');
if (existsSync(tokensCss)) {
  writeFileSync(resolve(OUT, 'tokens.css'), readFileSync(tokensCss, 'utf8'));
}

// ─── 3. Compute SRI hashes ─────────────────────────────────────────────

function sriHash(buf, alg = 'sha384') {
  return alg + '-' + createHash(alg).update(buf).digest('base64');
}

const integrity = {
  version,
  generated: new Date().toISOString(),
  files: {},
};

for (const f of ['loader.js', 'tokens.css']) {
  const path = resolve(OUT, f);
  if (!existsSync(path)) continue;
  const buf = readFileSync(path);
  const sha384 = sriHash(buf, 'sha384');
  const sha256 = sriHash(buf, 'sha256');
  integrity.files[f] = {
    bytes: buf.length,
    sha384,
    sha256,
  };
  writeFileSync(path + '.integrity', `${sha384}\n${sha256}\n`);
}

writeFileSync(resolve(OUT, '.integrity.json'), JSON.stringify(integrity, null, 2) + '\n');

// ─── 4. Print the consumer recipe ──────────────────────────────────────

const loaderHash = integrity.files['loader.js']?.sha384;
const cssHash = integrity.files['tokens.css']?.sha384;

const recipe = `<!-- CyberSkill DS CDN consumer recipe (Phase 2 Wave 2 stub) -->
<link rel="stylesheet"
      href="https://cdn.cyberskill.dev/v${version.split('.')[0]}/tokens.css"
      integrity="${cssHash ?? 'TBD'}"
      crossorigin="anonymous" />
<script type="module"
        src="https://cdn.cyberskill.dev/v${version.split('.')[0]}/loader.js"
        integrity="${loaderHash ?? 'TBD'}"
        crossorigin="anonymous"></script>
`;
writeFileSync(resolve(OUT, 'README.html'), recipe);

// ─── Summary ───────────────────────────────────────────────────────────

const totalBytes = Object.values(integrity.files).reduce((a, f) => a + f.bytes, 0);
console.log(`[build-cdn] Wrote ${Object.keys(integrity.files).length} files to dist-cdn/ — ${(totalBytes / 1024).toFixed(1)} KB total.`);
console.log(`  loader.js:  ${(integrity.files['loader.js']?.bytes / 1024 || 0).toFixed(1)} KB  (${integrity.files['loader.js']?.sha384.slice(0, 30)}…)`);
console.log(`  tokens.css: ${(integrity.files['tokens.css']?.bytes / 1024 || 0).toFixed(1)} KB  (${integrity.files['tokens.css']?.sha384.slice(0, 30)}…)`);
console.log(`  Recipe in dist-cdn/README.html`);
console.log(`  Manifest in dist-cdn/.integrity.json`);
console.log('');
console.log('  Phase 2 Wave 2 wires: rclone copyto dist-cdn r2:cdn-cyberskill/v' + version.split('.')[0] + '/');
console.log('  See .github/workflows/release.yml for the upload step.');
