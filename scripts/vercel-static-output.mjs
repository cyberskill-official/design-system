import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Package the static webroot for Vercel.
 * - Copies the portable design-system tree (no Storybook required for consumers).
 * - If storybook-static/ exists (from `npm run build:storybook`), overlays it at the
 *   webroot so production `/` is Storybook (assets resolve at domain root).
 * - Writes thin redirect stubs for legacy `/dashboard.html` and `/playground/`.
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

const redirectStub = (title, href = '/') => `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<title>${title}</title>
<meta http-equiv="refresh" content="0; url=${href}">
<link rel="canonical" href="https://design.cyberskill.world/">
<script>location.replace(${JSON.stringify(href)});</script>
</head>
<body style="font-family:system-ui;padding:24px;background:#FBF6EE;color:#231a12">
<p>The product site is Storybook at <a href="${href}" style="color:#45210E">${href}</a>.</p>
</body></html>
`;

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
if (existsSync(sb)) {
  // Overlay Storybook at webroot so `/` + `/index.html` are the SB build.
  // Portable paths (styles.css, guidelines/, _audit/, templates/, …) remain beside it.
  cpSync(sb, outDir, { recursive: true });
  writeFileSync(
    join(outDir, 'HOST-ONLY-STORYBOOK.txt'),
    'CyberSkill Storybook static export at site root — host product surface only.\nPortable consumers use styles.css + _ds_bundle.js / ESM, not this shell.\n',
  );
  console.log('packaged Storybook → .vercel-static/ (site root)');
} else {
  console.log('note: storybook-static/ missing — run `npm run build:storybook` before package for `/`');
}

// Legacy product paths → Storybook root (also covered by vercel.json redirects).
writeFileSync(join(outDir, 'dashboard.html'), redirectStub('CyberSkill Design System'));
mkdirSync(join(outDir, 'dashboard'), { recursive: true });
writeFileSync(join(outDir, 'dashboard', 'index.html'), redirectStub('CyberSkill Design System'));
mkdirSync(join(outDir, 'playground'), { recursive: true });
writeFileSync(join(outDir, 'playground', 'index.html'), redirectStub('CyberSkill Design System'));

console.log('static package ready:', outDir);
