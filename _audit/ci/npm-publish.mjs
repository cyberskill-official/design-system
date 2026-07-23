#!/usr/bin/env node
/**
 * npm publish with Decision 1C soft-skip when NPM_TOKEN is absent.
 *
 * Usage:
 *   node _audit/ci/npm-publish.mjs --dry-run   # pack inventory only (no token needed)
 *   node _audit/ci/npm-publish.mjs             # npm publish (needs NPM_TOKEN)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const REPORT = join(root, '_audit/ci/npm-publish-report.json');
const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');

export function isSoftSkippableNpmError(err) {
  const msg = String(err?.message || err || '');
  return /ENEEDAUTH/i.test(msg)
    || /need auth/i.test(msg)
    || /404.*Not found/i.test(msg)
    || /402\b/.test(msg)
    || /403\b/.test(msg)
    || /EPUBLISHCONFLICT/i.test(msg);
}

function writeReport(payload) {
  try {
    writeFileSync(REPORT, JSON.stringify({ ...payload, at: new Date().toISOString() }, null, 2) + '\n');
  } catch (_) { /* ignore */ }
}

function softSkip(reason, detail) {
  console.error('');
  console.error(`SOFT SKIP — npm publish (${reason}).`);
  if (detail) console.error(detail);
  console.error('Set repository secret NPM_TOKEN to publish. See docs/consuming.md.');
  writeReport({ skipped: true, reason, message: detail || reason });
  process.exit(0);
}

function main() {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  if (pkg.version !== '1.0.0') {
    throw new Error(`VERSION pin: package.json must stay 1.0.0 until LAUNCH (got ${pkg.version})`);
  }
  if (pkg.private === true) {
    throw new Error('package.json private must be false for the publish path (workflow landed)');
  }
  if (pkg.license !== 'UNLICENSED') {
    console.warn(`license is ${pkg.license} — expected UNLICENSED until an explicit open license is chosen`);
  }

  // Consumer-safe tarball intent: full portable tree (styles, tokens, components, templates, docs).
  const required = ['styles.css', '_esm/', 'tokens/', '_ds_bundle.js', 'components/', 'docs/'];
  for (const f of required) {
    if (!pkg.files?.includes(f) && !pkg.files?.includes(f.replace(/\/$/, ''))) {
      throw new Error(`package.json files[] missing required entry: ${f}`);
    }
    const path = join(root, f.replace(/\/$/, ''));
    if (!existsSync(path)) throw new Error(`missing pack path: ${f}`);
  }

  console.log(`Package ${pkg.name}@${pkg.version} · files ${pkg.files.length} entries · license ${pkg.license}`);

  if (dryRun) {
    const pack = spawnSync('npm', ['pack', '--dry-run'], { cwd: root, encoding: 'utf8', shell: process.platform === 'win32' });
    if (pack.status !== 0) {
      console.error(pack.stderr || pack.stdout);
      writeReport({ skipped: false, ok: false, dryRun: true, message: pack.stderr || pack.stdout });
      process.exit(pack.status || 1);
    }
    console.log(pack.stdout || pack.stderr);
    console.log('Dry-run OK — tarball inventory listed (no publish).');
    writeReport({ skipped: false, ok: true, dryRun: true, name: pkg.name, version: pkg.version });
    return;
  }

  const token = process.env.NPM_TOKEN || '';
  if (!token) {
    softSkip('missing_secrets', 'NPM_TOKEN empty — no publish attempted.');
  }

  const env = {
    ...process.env,
    NODE_AUTH_TOKEN: token,
    NPM_TOKEN: token,
  };

  // Prefer .npmrc in the runner (workflow writes it); also support env auth.
  const pub = spawnSync('npm', ['publish', '--access', 'restricted'], {
    cwd: root,
    encoding: 'utf8',
    env,
    shell: process.platform === 'win32',
  });
  const combined = `${pub.stdout || ''}\n${pub.stderr || ''}`;
  if (pub.status !== 0) {
    if (isSoftSkippableNpmError(combined)) {
      softSkip('npm_registry_unavailable', combined.slice(0, 800));
    }
    console.error(combined);
    writeReport({ skipped: false, ok: false, message: combined.slice(0, 800) });
    process.exit(pub.status || 1);
  }
  console.log(pub.stdout);
  writeReport({ skipped: false, ok: true, published: true, name: pkg.name, version: pkg.version });
}

const invoked = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (invoked) {
  try {
    main();
  } catch (e) {
    console.error(e.message || e);
    writeReport({ skipped: false, ok: false, message: String(e.message || e) });
    process.exit(1);
  }
}
