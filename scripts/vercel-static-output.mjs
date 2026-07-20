import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const outDir = '.vercel-static';
const excluded = new Set([
  '.git',
  '.vercel',
  '.vercel-static',
  'node_modules',
  'uploads',
  'scraps',
]);

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const entry of readdirSync('.')) {
  if (excluded.has(entry)) continue;
  if (entry === '_audit' && existsSync(join(entry, 'exports'))) {
    cpSync(entry, join(outDir, entry), {
      recursive: true,
      filter: source => !source.includes(`${entry}/exports`),
    });
    continue;
  }
  cpSync(entry, join(outDir, entry), { recursive: true });
}
