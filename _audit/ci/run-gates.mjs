// Headless runner for _audit/run.html — reads window.__run once the board finishes,
// exits non-zero on any hard-gate failure. Also writes a copy of the report text
// (same shape as the in-page "Copy import report" button) so CI can upload it.
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const url = process.argv[2];
if (!url) { console.error('usage: node run-gates.mjs <url to _audit/run.html>'); process.exit(2); }

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
page.on('console', (m) => { if (/VERDICT|ERROR/i.test(m.text())) console.log('[page]', m.text()); });

await page.goto(url, { waitUntil: 'load' });

// The runner sets window.__run once every gate (incl. advisory) has settled.
const result = await page.waitForFunction(() => window.__run, null, { timeout: 5 * 60 * 1000 })
  .then((h) => h.jsonValue())
  .catch(() => null);

const report = await page.evaluate(() => document.querySelector('#list + textarea, textarea')?.value || '');
writeFileSync(new URL('./import-report.txt', import.meta.url), report || '(no report text captured)');

await browser.close();

if (!result) { console.error('TIMEOUT — window.__run never populated (see uploaded import-report artifact if present)'); process.exit(1); }
console.log('Gate board result:', JSON.stringify(result));
if (!result.pass) { console.error('FAST GATES FAILED:', result.failed.join(', ')); process.exit(1); }
console.log('✓ all fast gates pass' + (result.total ? ' (' + result.total + ')' : ''));
