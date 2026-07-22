/**
 * Structural contract tests for shipped Health + Tokens UI source.
 * Reads the real HTML entry points (no reimplementation).
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
function assert(cond, msg) { if (!cond) throw new Error(msg); }

const run = readFileSync(join(root, '_audit/run.html'), 'utf8');
assert(run.includes('class="open"'), 'health rows have open links');
assert(run.includes('window.__csHealthUi'), 'health exposes UI contract');
assert(run.includes('id="wholeset"'), 'whole-set panel present');
assert(run.includes('responsive-overflow.html'), 'responsive whole-set link');
assert(run.includes('language-overflow.html'), 'language whole-set link');
assert(run.includes('theme-overflow.html'), 'theme whole-set link');
assert(!run.includes('Copy import report'), 'import report UI removed');

// Count gate open hrefs from GATES file list pattern
const gateFiles = [...run.matchAll(/file:'([^']+\.html)'/g)].map((m) => m[1]);
assert(gateFiles.length >= 15, 'enough gates: ' + gateFiles.length);
// Row open links are built dynamically: href="./'+g.file+'"
assert(run.includes("href=\"./\"+g.file+\"") || run.includes("href=\"./'+g.file+'\""), 'open href uses g.file');
assert(run.includes('class="open"'), 'open class on gate rows');
assert(run.includes('links:GATES.map(g=>g.file)'), 'health UI exposes gate file list');

const tokens = readFileSync(join(root, 'tokens/viewer.html'), 'utf8');
assert(tokens.includes('id="modeTable"') && tokens.includes('id="modeRaw"'), 'table/raw modes');
assert(tokens.includes('id="chips"'), 'group chips');
assert(tokens.includes('data-copy="path"') || tokens.includes("data-copy=\"path\""), 'copy path');
assert(tokens.includes('data-copy="value"') || tokens.includes('copyText'), 'copy value path');
assert(tokens.includes('window.__csTokensViewer'), 'tokens contract global');
assert(tokens.includes('__csTokensLastCopy'), 'last copy observability');

const live = readFileSync(join(root, 'guidelines/live-view.html'), 'utf8');
assert(live.includes("id:'motion'") || live.includes('id:\'motion\''), 'motion surface');
assert(live.includes('motion.html'), 'motion.html wired');
assert(live.includes('rtl-preview.html'), 'rtl surface');

const atomic = readFileSync(join(root, 'guidelines/atomic-view.html'), 'utf8');
assert(atomic.includes('nav-model.cjs') || atomic.includes('nav-model.js'), 'nav-model loaded');
assert(atomic.includes('groupStories') || atomic.includes('NM.groupStories'), 'groupStories used');
assert(atomic.includes('groupTemplates') || atomic.includes('NM.groupTemplates'), 'groupTemplates used');
assert(atomic.includes('foundation-motion'), 'motion foundation anchor');
assert(atomic.includes('ops + suite') || atomic.includes('employment suite'), 'HR merge labeling');

const dg = readFileSync(join(root, 'components/datatable/DataGrid.jsx'), 'utf8');
assert(dg.includes('virtualThreshold'), 'virtualThreshold in source');
assert(dg.includes('persistKey'), 'persistKey in source');
assert(dg.includes('data-virtual'), 'data-virtual attr');
const bundle = readFileSync(join(root, '_ds_bundle.js'), 'utf8');
assert(bundle.includes('virtualThreshold'), 'virtualThreshold in bundle');
assert(bundle.includes('data-virtual'), 'data-virtual in bundle');

const motion = readFileSync(join(root, 'guidelines/motion.html'), 'utf8');
assert(motion.includes('prefers-reduced-motion'), 'reduced-motion CSS');
assert(motion.includes('@keyframes run'), 'live keyframes');

const rtl = readFileSync(join(root, 'guidelines/rtl-preview.html'), 'utf8');
assert(rtl.includes('עברית') || rtl.includes('he'), 'Hebrew locale');
assert(rtl.includes('__csRtlPreview'), 'rtl contract');

console.log('PASS test-health-tokens-contract', {
  gates: gateFiles.length,
  hasMotion: true,
  hasVirtual: true,
});
