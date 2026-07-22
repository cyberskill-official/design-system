import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
function assert(c,m){ if(!c) throw new Error(m); }

const main = readFileSync(join(root,'.storybook/main.js'),'utf8');
assert(main.includes('../stories/'), 'stories glob');
const preview = readFileSync(join(root,'.storybook/preview.jsx'),'utf8');
assert(preview.includes('styles.css'), 'imports styles.css');
assert(preview.includes('data-theme') && preview.includes('data-cs-element') && preview.includes('lang'), 'axes globals');

const pkg = JSON.parse(readFileSync(join(root,'package.json'),'utf8'));
assert(pkg.scripts['build:storybook'], 'build:storybook script');
assert(pkg.scripts['build:site'], 'build:site script');

const vercel = JSON.parse(readFileSync(join(root,'vercel.json'),'utf8'));
assert(vercel.buildCommand.includes('build:site'), 'vercel builds site with storybook');
assert(vercel.installCommand === 'npm install', 'vercel installs deps for storybook');

const pack = readFileSync(join(root,'scripts/vercel-static-output.mjs'),'utf8');
assert(pack.includes('playground') && pack.includes('storybook-static'), 'packager copies playground');

const dash = readFileSync(join(root,'dashboard.html'),'utf8');
assert(dash.includes('playground/index.html'), 'hub links playground');

const consuming = readFileSync(join(root,'docs/consuming.md'),'utf8');
assert(consuming.includes('host-only') || consuming.includes('Storybook'), 'consuming documents host-only');

// Portable paths must not require storybook
assert(!consuming.includes('must use Storybook') && !consuming.includes('require Storybook'), 'no required storybook for consumers');

const stories = [
  'Button.stories.jsx','Form.stories.jsx','Badge.stories.jsx','TextField.stories.jsx','Alert.stories.jsx',
  'Spinner.stories.jsx','Dialog.stories.jsx','Toast.stories.jsx','Checkbox.stories.jsx',
];
for (const s of stories) assert(existsSync(join(root,'stories',s)), 'story '+s);

const liveVs = readFileSync(join(root,'docs/live-view-vs-storybook.md'),'utf8');
assert(/Do not delete|keep Live View|zero-build/i.test(liveVs), 'live-view-vs-storybook documents keep Live View');
const live = readFileSync(join(root,'guidelines/live-view.html'),'utf8');
assert(live.includes('live-view-vs-storybook'), 'live-view points at split doc');

const deploy = readFileSync(join(root,'docs/deploy.md'),'utf8');
assert(deploy.includes('npm install') && deploy.includes('build:site'), 'deploy.md host packaging');
assert(!deploy.includes('installCommand: "true"'), 'deploy.md not stale true install');
const cicd = readFileSync(join(root,'docs/ci-cd.md'),'utf8');
assert(/Host deploy|build:site|Storybook/i.test(cicd), 'ci-cd distinguishes host packaging');
console.log('PASS test-storybook-contract');
