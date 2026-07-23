/**
 * Host Storybook contract:
 * - Live hub = Storybook only (guidelines/live-view.html must not exist)
 * - Complete CSF for every public primary
 * - Honest deep matrix: non-empty argTypes; Matrix/AllVariants render mounts primary
 * - CSF bar: AllSizes when argTypes.size exists; States (or Matrix subsection) for
 *   disabled/loading/error/busy when those argTypes exist
 * - Non-goal: full N-dimensional enum product is not required
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { coveredPrimariesFromStories, listPublicComponents, listStoryFiles } from './storybook-inventory.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
function assert(c, m) {
  if (!c) throw new Error(m);
}

const mainPath = existsSync(join(root, '.storybook/main.js'))
  ? join(root, '.storybook/main.js')
  : join(root, '.storybook/main.cjs');
const main = readFileSync(mainPath, 'utf8');
assert(main.includes('../stories/'), 'stories glob');
assert(main.includes('guidelines') || main.includes('/guidelines'), 'staticDirs include guidelines for Live iframes');
assert(main.includes('@storybook/addon-docs') || main.includes('addon-docs'), 'SB10 addon-docs');
assert(main.includes('@storybook/addon-a11y') || main.includes('addon-a11y'), 'addon-a11y');
assert(!main.includes('addon-essentials'), 'no addon-essentials (removed in SB10)');
assert(/export\s+default/.test(main), 'main config is ESM default export');
assert(main.includes('@cs'), 'viteFinal @cs alias');
assert(main.includes('react-vite') || main.includes('@storybook/react-vite'), 'react-vite framework');

const preview = readFileSync(join(root, '.storybook/preview.jsx'), 'utf8');
assert(preview.includes('styles.css'), 'imports styles.css');
assert(preview.includes('data-theme') && preview.includes('data-cs-element') && preview.includes('lang'), 'axes globals');

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
assert(pkg.scripts['build:storybook'], 'build:storybook script');
assert(pkg.scripts['build:site'], 'build:site script');
const sbVer = String(pkg.devDependencies?.storybook || '');
assert(/^[\^~]?10\./.test(sbVer), 'storybook package is v10, got ' + sbVer);
assert(pkg.devDependencies?.['@storybook/addon-docs'], '@storybook/addon-docs present');
assert(!pkg.devDependencies?.['@storybook/addon-essentials'], 'addon-essentials removed');

const vercel = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
assert(vercel.buildCommand.includes('build:site'), 'vercel builds site with storybook');

const pack = readFileSync(join(root, 'scripts/vercel-static-output.mjs'), 'utf8');
assert(pack.includes('playground') && pack.includes('storybook-static'), 'packager copies playground');

const dash = readFileSync(join(root, 'dashboard.html'), 'utf8');
assert(dash.includes('playground/index.html'), 'hub Live targets playground');
assert(dash.includes("src:'playground/index.html'"), 'Live tab is playground');
assert(!dash.includes('live-view'), 'dashboard has no live-view references');

assert(!existsSync(join(root, 'guidelines/live-view.html')), 'guidelines/live-view.html deleted');

const liveHub = readFileSync(join(root, 'docs/live-hub.md'), 'utf8');
assert(/single live|Storybook is the single|single Live hub/i.test(liveHub), 'docs: Storybook single live hub');
assert(/Live\/Surfaces|surface map/i.test(liveHub), 'docs surface map present');
assert(!/live-view\.html|redirect only/i.test(liveHub), 'docs do not revive live-view.html');

const decisions = readFileSync(join(root, 'docs/decisions-pending.md'), 'utf8');
assert(/Storybook is the single live hub/i.test(decisions), 'decision §4 Storybook hub');
assert(!/live-view\.html/i.test(decisions), 'decisions do not reference live-view.html');

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

const MATRIX_CORE = /export\s+const\s+(Matrix|AllVariants)\b/;
const MATRIX_EXPORT = /export\s+const\s+(Matrix|AllVariants|AllSizes|States|Disabled)\b/;
const THEATER = /data-matrix-cell|Secondary composition context|forces multi-story depth/;
const SPREAD_ARGS = /\{\s*\.\.\.\s*args\s*\}/;
const STATE_KEYS = ['disabled', 'loading', 'error', 'busy'];

function argTypesSection(text) {
  return (text.split('argTypes:')[1] || '').split(/parameters:|args:/)[0] || '';
}

function hasArgTypeKey(text, key) {
  const at = argTypesSection(text);
  return new RegExp('(^|\\n)\\s*"?' + key + '"?\\s*:').test(at);
}

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
  assert(MATRIX_CORE.test(text), 'Matrix|AllVariants export for ' + m.primary);
  assert(MATRIX_EXPORT.test(text), 'matrix-family export for ' + m.primary);
  assert(!THEATER.test(text), 'no theater placeholders in ' + m.primary);

  // argTypes must be a non-empty object (at least one documented prop key)
  assert(/argTypes:\s*\{/.test(text), 'argTypes block for ' + m.primary);
  assert(!/argTypes:\s*\{\s*\}/.test(text), 'argTypes not empty for ' + m.primary);
  const atSection = argTypesSection(text);
  const atKeys = [...atSection.matchAll(/^\s*"?([A-Za-z_][A-Za-z0-9_]*)"?\s*:/gm)].map((x) => x[1]);
  if (atKeys.length < 1) fail.push(m.primary + ' no argTypes keys');

  // CSF bar: AllSizes required when size is documented in argTypes (full N-dim product is not)
  if (hasArgTypeKey(text, 'size')) {
    assert(/export\s+const\s+AllSizes\b/.test(text), 'AllSizes story for ' + m.primary + ' (argTypes.size)');
  }

  const metaArgs = metaArgsObject(text);
  const metaHasFixtures = argsNonEmpty(metaArgs);

  // Extract matrix story body and require primary mount
  const matrixBodies = [...text.matchAll(/export\s+const\s+(Matrix|AllVariants|AllSizes|States|Disabled)\s*=\s*\{([\s\S]*?)\n\};/g)];
  assert(matrixBodies.length >= 1, 'matrix body for ' + m.primary);
  const joinedBodies = matrixBodies.map((x) => x[2]).join('\n');

  // Interactive CSF bar: each state argType must appear in States or a Matrix subsection
  for (const key of STATE_KEYS) {
    if (!hasArgTypeKey(text, key)) continue;
    const shown =
      key === 'disabled'
        ? /\bdisabled\b/.test(joinedBodies)
        : key === 'loading'
          ? /\bloading\b/.test(joinedBodies)
          : key === 'busy'
            ? /\bbusy\b/.test(joinedBodies)
            : /\berror\b/.test(joinedBodies);
    if (!shown) {
      fail.push(m.primary + ' missing ' + key + ' coverage in Matrix|AllVariants|States (argTypes.' + key + ')');
    }
  }

  for (const [, name, body] of matrixBodies) {
    if (!body.includes('<' + m.primary)) {
      fail.push(m.primary + ' ' + name + ' does not mount <' + m.primary);
    }
    if (new RegExp('<' + m.primary + '\\b[^>]*\\bdisabled(?:\\s|=|/|>)').test(body)) {
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
  storybook: sbVer,
  csfBar: 'AllSizes+States',
  liveSurfaces: true,
  liveShell: 'redirect',
});
