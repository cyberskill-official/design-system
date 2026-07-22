/**
 * Host Storybook contract:
 * - Live hub = Storybook (Live View shell is redirect)
 * - Complete CSF for every public primary
 * - Honest deep matrix: non-empty argTypes; Matrix/AllVariants/… render mounts primary
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { coveredPrimariesFromStories, listPublicComponents, listStoryFiles } from './storybook-inventory.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
function assert(c, m) {
  if (!c) throw new Error(m);
}

const mainPath = existsSync(join(root, '.storybook/main.cjs'))
  ? join(root, '.storybook/main.cjs')
  : join(root, '.storybook/main.js');
const main = readFileSync(mainPath, 'utf8');
assert(main.includes('../stories/'), 'stories glob');
assert(main.includes('guidelines') || main.includes('/guidelines'), 'staticDirs include guidelines for Live iframes');

const preview = readFileSync(join(root, '.storybook/preview.jsx'), 'utf8');
assert(preview.includes('styles.css'), 'imports styles.css');
assert(preview.includes('data-theme') && preview.includes('data-cs-element') && preview.includes('lang'), 'axes globals');

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
assert(pkg.scripts['build:storybook'], 'build:storybook script');
assert(pkg.scripts['build:site'], 'build:site script');

const vercel = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
assert(vercel.buildCommand.includes('build:site'), 'vercel builds site with storybook');

const pack = readFileSync(join(root, 'scripts/vercel-static-output.mjs'), 'utf8');
assert(pack.includes('playground') && pack.includes('storybook-static'), 'packager copies playground');

const dash = readFileSync(join(root, 'dashboard.html'), 'utf8');
assert(dash.includes('playground/index.html'), 'hub Live targets playground');
assert(dash.includes("src:'playground/index.html'"), 'Live tab is playground');
assert(!dash.includes("src:'guidelines/live-view.html'"), 'dashboard Live tab no longer live-view shell');

const liveShell = readFileSync(join(root, 'guidelines/live-view.html'), 'utf8');
assert(/location\.replace|http-equiv="refresh"|Continue to Live/i.test(liveShell), 'live-view.html is redirect only');
assert(!liveShell.includes('const SURFACES='), 'live-view shell SURFACES removed');

const liveVs = readFileSync(join(root, 'docs/live-view-vs-storybook.md'), 'utf8');
assert(/single live|Storybook is the single|single Live hub/i.test(liveVs), 'docs: Storybook single live hub');
assert(/Live\/Surfaces|surface map/i.test(liveVs), 'docs surface map present');

const decisions = readFileSync(join(root, 'docs/decisions-pending.md'), 'utf8');
assert(/Storybook is the single live hub|absorbs Live View/i.test(decisions), 'decision §4 Storybook hub');

const consuming = readFileSync(join(root, 'docs/consuming.md'), 'utf8');
assert(consuming.includes('host-only') || consuming.includes('Storybook'), 'consuming documents host-only');
assert(!consuming.includes('must use Storybook') && !consuming.includes('require Storybook'), 'no required storybook for consumers');

const surfaces = readFileSync(join(root, 'stories/Live/Surfaces.stories.jsx'), 'utf8');
for (const needle of [
  'atomic-view.html',
  'motion.html',
  'identity-lab.html',
  'playground.html',
  'kitchen-sink.html',
  'image-slots-demo.html',
  'ai-cluster-demo.html',
  'rtl-preview.html',
]) {
  assert(surfaces.includes(needle), 'Live surface maps ' + needle);
}

const modules = listPublicComponents();
assert(modules.length >= 90, 'expected ~99 public component modules, got ' + modules.length);

const { covered, missing } = coveredPrimariesFromStories();
if (missing.length) {
  console.error('✗ Storybook CSF missing:\n' + missing.map((m) => '  - ' + m).join('\n'));
  process.exit(1);
}

const MATRIX_EXPORT = /export\s+const\s+(Matrix|AllVariants|AllSizes|States|Disabled)\b/;
const THEATER = /data-matrix-cell|Secondary composition context|forces multi-story depth/;
const SPREAD_ARGS = /\{\s*\.\.\.\s*args\s*\}/;

/** Extract balanced `{...}` starting at open brace index. */
function balanced(s, start) {
  let depth = 0;
  let inStr = null;
  let esc = false;
  for (let i = start; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      inStr = c;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return s.slice(start, i + 1);
    }
  }
  return null;
}

function metaArgsObject(text) {
  const dm = text.match(/export\s+default\s*(\{)/);
  if (!dm) return null;
  const metaStart = dm.index + dm[0].length - 1;
  const meta = balanced(text, metaStart);
  if (!meta) return null;
  const am = meta.match(/\bargs\s*:\s*(\{)/);
  if (!am) return null;
  const abs = metaStart + am.index + am[0].length - 1;
  return balanced(text, abs);
}

function argsNonEmpty(argsBlock) {
  if (!argsBlock) return false;
  const inner = argsBlock.slice(1, -1).trim();
  return inner.length > 0;
}

let fail = [];
for (const m of modules) {
  const own = join(root, 'stories', m.primary + '.stories.jsx');
  assert(existsSync(own), 'story file for ' + m.primary);
  const text = readFileSync(own, 'utf8');
  assert(text.includes(m.relFromRoot), 'story imports path for ' + m.primary);
  assert(/export\s+const\s+Default\b/.test(text), 'Default story for ' + m.primary);
  assert(MATRIX_EXPORT.test(text), 'matrix export for ' + m.primary);
  assert(!THEATER.test(text), 'no theater placeholders in ' + m.primary);

  // argTypes must be a non-empty object (at least one documented prop key)
  assert(/argTypes:\s*\{/.test(text), 'argTypes block for ' + m.primary);
  assert(!/argTypes:\s*\{\s*\}/.test(text), 'argTypes not empty for ' + m.primary);
  const atSection = (text.split('argTypes:')[1] || '').split('parameters:')[0] || '';
  const atKeys = [...atSection.matchAll(/^\s*"([A-Za-z_][A-Za-z0-9_]*)"\s*:/gm)].map((x) => x[1]);
  if (atKeys.length < 1) fail.push(m.primary + ' no argTypes keys');

  const metaArgs = metaArgsObject(text);
  const metaHasFixtures = argsNonEmpty(metaArgs);

  // Extract matrix story body and require primary mount
  const matrixBodies = [...text.matchAll(/export\s+const\s+(Matrix|AllVariants|AllSizes|States|Disabled)\s*=\s*\{([\s\S]*?)\n\};/g)];
  assert(matrixBodies.length >= 1, 'matrix body for ' + m.primary);
  for (const [, name, body] of matrixBodies) {
    if (!body.includes('<' + m.primary)) {
      fail.push(m.primary + ' ' + name + ' does not mount <' + m.primary);
    }
    if (/disabled\s*[=:{]/.test(body)) {
      const jsx = readFileSync(join(root, m.relFromRoot), 'utf8');
      const sig = jsx.match(new RegExp('export\\s+function\\s+' + m.primary + '\\s*\\(\\s*\\{([^}]*)\\}'));
      const params = sig ? sig[1] : '';
      if (!/\bdisabled\b/.test(params)) {
        fail.push(m.primary + ' ' + name + ' uses disabled but prop not in signature');
      }
    }
    // Universal hollow-class rule (CSF3): {...args} requires non-empty meta.args
    // (or non-empty matrix-local args). Prevents Default.args inheritance theater.
    if (SPREAD_ARGS.test(body)) {
      const matArgsM = body.match(/\bargs\s*:\s*(\{)/);
      let matFixtures = false;
      if (matArgsM) {
        // approximate: not empty object
        matFixtures = !/\bargs\s*:\s*\{\s*\}/.test(body);
      }
      if (!metaHasFixtures && !matFixtures) {
        fail.push(m.primary + ' ' + name + ' spreads {...args} without non-empty meta/matrix args (CSF3 hollow)');
      }
    }
  }

  // Table primaries: meta fixtures must include columns+rows when Matrix spreads args
  if ((m.primary === 'DataGrid' || m.primary === 'DataTable') && metaArgs) {
    if (!/columns\s*:/.test(metaArgs) || !/rows\s*:/.test(metaArgs)) {
      fail.push(m.primary + ' meta args must include columns and rows fixtures');
    }
  }

  // Full story text composition checks (Default + Matrix)
  const requiredPath = join(root, '_audit/ci/storybook-required-tokens.json');
  if (existsSync(requiredPath)) {
    const required = JSON.parse(readFileSync(requiredPath, 'utf8'));
    const need = required[m.primary];
    if (need) {
      for (const tok of need) {
        if (!text.includes(tok)) fail.push(m.primary + ' missing required token ' + tok);
      }
    }
  }
  // Known wrong-prop / hollow patterns
  if (m.primary === 'Steps' && /items\s*=/.test(text) && !/steps\s*=/.test(text)) {
    fail.push('Steps uses items= instead of steps=');
  }
  if (m.primary === 'Carousel' && /slides\s*=/.test(text)) {
    fail.push('Carousel uses slides= (API is children)');
  }
  if (m.primary === 'CommandPalette' && /groups\s*=/.test(text) === false) {
    fail.push('CommandPalette missing groups=');
  }
  if (m.primary === 'Popover' && /content\s*=/.test(text)) {
    fail.push('Popover uses content= (API is trigger+children)');
  }
  if (m.primary === 'HoverCard' && /content\s*=/.test(text)) {
    fail.push('HoverCard uses content= (API is trigger+children)');
  }
  if (m.primary === 'Tabs' && /selected\s*=/.test(text)) {
    fail.push('Tabs uses selected= (companion Tab prop only)');
  }
  if (m.primary === 'Sidebar' && /<Sidebar[^>]*\bactive\s*=/.test(text)) {
    fail.push('Sidebar uses active= (NavItem prop only)');
  }
  if (m.primary === 'Menu') {
    const mat = matrixBodies.map((x) => x[2]).join('\n');
    if (!mat.includes('trigger=') || !mat.includes('MenuItem')) {
      fail.push('Menu matrix missing trigger/MenuItem composition');
    }
  }
}

if (fail.length) {
  console.error('✗ Honest matrix/argTypes failures:\n' + fail.map((x) => '  - ' + x).join('\n'));
  process.exit(1);
}

assert(listStoryFiles().some((f) => f.includes('Surfaces.stories')), 'Surfaces.stories present');

console.log('PASS test-storybook-contract', {
  modules: modules.length,
  covered: covered.size,
  matrixHonest: modules.length,
  liveSurfaces: true,
  liveShell: 'redirect',
});
