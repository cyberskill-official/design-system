/**
 * Host Storybook contract:
 * - Live hub = Storybook (Live View shell retired to redirect)
 * - Complete CSF for every public primary
 * - Deep control matrix: Default + at least one Matrix/* (or AllVariants/Sizes/States) story
 * - Axes + styles.css
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
assert(/id:'live'[^}]*playground|label:'Live'[^}]*playground/s.test(dash) || dash.includes("src:'playground/index.html'"), 'Live tab is playground');
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

// Live surfaces story maps former tabs
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
  console.error('✗ Storybook CSF missing for primary components:\n' + missing.map((m) => '  - ' + m).join('\n'));
  process.exit(1);
}

const MATRIX_EXPORT = /export\s+const\s+(Matrix|AllVariants|AllSizes|States|Disabled)\b/;
let matrixFail = [];
for (const m of modules) {
  const own = join(root, 'stories', m.primary + '.stories.jsx');
  assert(existsSync(own), 'story file for ' + m.primary);
  const text = readFileSync(own, 'utf8');
  assert(text.includes(m.relFromRoot) || text.includes(m.primary), 'story imports real source for ' + m.primary);
  assert(/export\s+const\s+Default\b/.test(text), 'Default story for ' + m.primary);
  assert(/argTypes\s*:/.test(text), 'argTypes present for ' + m.primary);
  if (!MATRIX_EXPORT.test(text)) matrixFail.push(m.primary);
}
if (matrixFail.length) {
  console.error('✗ Missing deep matrix story (Matrix|AllVariants|AllSizes|States|Disabled):\n' + matrixFail.map((x) => '  - ' + x).join('\n'));
  process.exit(1);
}

// Live surface stories file exists
assert(listStoryFiles().some((f) => f.includes('Surfaces.stories')), 'Surfaces.stories present');

const deploy = readFileSync(join(root, 'docs/deploy.md'), 'utf8');
assert(deploy.includes('npm install') && deploy.includes('build:site'), 'deploy.md host packaging');

console.log('PASS test-storybook-contract', {
  modules: modules.length,
  covered: covered.size,
  matrix: modules.length - matrixFail.length,
  liveSurfaces: true,
  liveShell: 'redirect',
});
