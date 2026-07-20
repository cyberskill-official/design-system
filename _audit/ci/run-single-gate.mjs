// Headless single-gate runner — used for gates the CONTRIBUTING.md gate list marks
// as merge-blockers (docs-consistency, bilingual-parity) even though they also run
// inside the aggregate board. Exits non-zero if window[globalName].pass is not true.
import { chromium } from 'playwright';

const [, , url, globalName, timeoutArg] = process.argv;
if (!url || !globalName) { console.error('usage: node run-single-gate.mjs <url> <windowGlobalName> [timeoutMs=60000]'); process.exit(2); }
const timeoutMs = timeoutArg ? Number(timeoutArg) : 60000;

const browser = await chromium.launch();
const page = await browser.newPage();
page.on('console', (m) => { if (/VERDICT|ERROR/i.test(m.text())) console.log('[page]', m.text()); });
await page.goto(url, { waitUntil: 'load' });

const result = await page.waitForFunction((g) => window[g], globalName, { timeout: timeoutMs })
  .then((h) => h.jsonValue())
  .catch(() => null);

await browser.close();
if (!result) { console.error('TIMEOUT — window.' + globalName + ' never populated'); process.exit(1); }
console.log(globalName, '=', JSON.stringify(result));
if (!result.pass) { console.error(globalName + ' FAILED'); process.exit(1); }
console.log('✓', globalName, 'passes');
