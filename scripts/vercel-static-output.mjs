import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Package the static webroot for Vercel.
 * - Copies the portable design-system tree (no Storybook required for consumers).
 * - If storybook-static/ exists (from `npm run build:storybook`), copies it to playground/.
 */
const outDir = '.vercel-static';
const excluded = new Set([
  '.git',
  '.vercel',
  '.vercel-static',
  'node_modules',
  'uploads',
  'scraps',
  'storybook-static',
  '.storybook',
  'stories',
]);

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const entry of readdirSync('.')) {
  if (excluded.has(entry)) continue;
  if (entry.startsWith('.') && entry !== '.github') {
    // skip other dotfiles (env, etc.) but keep nothing else required
    continue;
  }
  if (entry === '_audit' && existsSync(join(entry, 'exports'))) {
    cpSync(entry, join(outDir, entry), {
      recursive: true,
      filter: (source) => !source.includes(`${entry}/exports`),
    });
    continue;
  }
  cpSync(entry, join(outDir, entry), { recursive: true });
}

const sb = 'storybook-static';
const playground = join(outDir, 'playground');
if (existsSync(sb)) {
  mkdirSync(playground, { recursive: true });
  cpSync(sb, playground, { recursive: true });
  writeFileSync(
    join(outDir, 'playground', 'HOST-ONLY.txt'),
    'CyberSkill Storybook static export — host playground only.\nPortable consumers use styles.css + _ds_bundle.js / ESM, not this folder.\n',
  );
  console.log('packaged Storybook → .vercel-static/playground/');
} else {
  console.log('note: storybook-static/ missing — run `npm run build:storybook` before package for playground/');
}

console.log('static package ready:', outDir);
