/**
 * Public React component inventory for host Storybook coverage.
 * Scans components for .jsx PascalCase exports (excludes pure constants like CS_ICONS).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const COMPONENTS = join(ROOT, 'components');
const NON_COMPONENT = new Set(['CS_ICONS']);

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith('.jsx')) out.push(p);
  }
  return out;
}

function exportsOf(text) {
  const named = [];
  for (const m of text.matchAll(/export\s+function\s+([A-Z][A-Za-z0-9_]*)/g)) named.push(m[1]);
  for (const m of text.matchAll(/export\s+const\s+([A-Z][A-Za-z0-9_]*)\s*=/g)) named.push(m[1]);
  for (const m of text.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const part of m[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop().trim();
      if (/^[A-Z][A-Za-z0-9_]*$/.test(name) && !named.includes(name)) named.push(name);
    }
  }
  // Drop ALL_CAPS constants and known non-components
  return named.filter((n) => !NON_COMPONENT.has(n) && !/^[A-Z0-9_]+$/.test(n));
}

/** @returns {{ file: string, relFromRoot: string, group: string, primary: string, companions: string[], all: string[] }[]} */
export function listPublicComponents() {
  const files = walk(COMPONENTS);
  const modules = [];
  for (const f of files) {
    const text = readFileSync(f, 'utf8');
    const stem = basename(f, '.jsx');
    const ex = exportsOf(text);
    if (!ex.length) continue;
    const primary = ex.includes(stem) ? stem : ex[0];
    const companions = ex.filter((e) => e !== primary);
    const relFromRoot = f.slice(ROOT.length + 1).replace(/\\/g, '/');
    const group = relFromRoot.split('/')[1] || 'misc';
    modules.push({
      file: f,
      relFromRoot,
      group,
      primary,
      companions,
      all: [primary, ...companions],
    });
  }
  modules.sort((a, b) => a.primary.localeCompare(b.primary));
  return modules;
}

export function listStoryFiles() {
  const storiesDir = join(ROOT, 'stories');
  if (!statSync(storiesDir, { throwIfNoEntry: false })?.isDirectory()) return [];
  const out = [];
  function walk(dir) {
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.stories\.(jsx|tsx|js|ts)$/.test(e)) out.push(p);
    }
  }
  walk(storiesDir);
  return out;
}

/** Which primary components are referenced by import from a stories/*.stories.* file. */
export function coveredPrimariesFromStories() {
  const modules = listPublicComponents();
  const byPrimary = new Map(modules.map((m) => [m.primary, m]));
  const covered = new Set();
  for (const sf of listStoryFiles()) {
    const text = readFileSync(sf, 'utf8');
    // import { X, Y } from '../components/...'
    for (const m of text.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"](\.\.\/components\/[^'"]+)['"]/g)) {
      const names = m[1].split(',').map((p) => p.trim().split(/\s+as\s+/).pop().trim());
      for (const name of names) {
        if (byPrimary.has(name)) covered.add(name);
        // companion import still covers its module primary
        for (const mod of modules) {
          if (mod.all.includes(name)) covered.add(mod.primary);
        }
      }
    }
    // import X from ...
    for (const m of text.matchAll(/import\s+([A-Z][A-Za-z0-9_]*)\s+from\s*['"](\.\.\/components\/[^'"]+)['"]/g)) {
      const name = m[1];
      if (byPrimary.has(name)) covered.add(name);
      for (const mod of modules) {
        if (mod.all.includes(name)) covered.add(mod.primary);
      }
    }
  }
  return { modules, covered, missing: modules.filter((m) => !covered.has(m.primary)).map((m) => m.primary) };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { modules, covered, missing } = coveredPrimariesFromStories();
  console.log(JSON.stringify({ total: modules.length, covered: covered.size, missing }, null, 2));
}
