#!/usr/bin/env node
// @ts-check
/**
 * check-bundle-size.mjs — CSS payload budgets for the design system
 * ─────────────────────────────────────────────────────────────────
 *
 * Real, executable performance budgets (DSAF A9.1 "bundle size budgets",
 * measured band). Each shipped stylesheet gets a raw-byte and gzip budget;
 * exceeding a budget fails the build. Budgets are deliberate headroom over
 * current size (~25-60%) so growth is a conscious decision: raising a budget
 * means editing this file in a reviewed commit.
 *
 * Output: docs/bundle-size.json (regenerable evidence artifact).
 * Wired into `npm run verify:all` and CI.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "docs", "bundle-size.json");

/** @type {{file: string, maxBytes: number, maxGzipBytes: number, note: string}[]} */
const BUDGETS = [
  { file: "packages/tokens/dist/css/tokens.css", maxBytes: 6_000, maxGzipBytes: 2_000, note: "token custom properties (light + dark)" },
  { file: "packages/react/src/styles.css", maxBytes: 12_000, maxGzipBytes: 4_000, note: "core component styles" },
  { file: "packages/react/src/glass.css", maxBytes: 12_000, maxGzipBytes: 4_000, note: "Liquid Glass materials + fallbacks" },
  { file: "packages/style-packs/dist/style-packs.css", maxBytes: 120_000, maxGzipBytes: 24_000, note: "all 50 style packs combined (consumers should ship per-pack subsets)" }
];

let failed = 0;
const rows = [];
for (const budget of BUDGETS) {
  const path = resolve(ROOT, budget.file);
  if (!existsSync(path)) {
    console.error(`[bundle-size] MISSING ${budget.file} — run the build first (tokens:build / stylepacks:build).`);
    failed++;
    rows.push({ ...budget, bytes: null, gzipBytes: null, status: "missing" });
    continue;
  }
  const body = readFileSync(path);
  const bytes = body.length;
  const gzipBytes = gzipSync(body, { level: 9 }).length;
  const overRaw = bytes > budget.maxBytes;
  const overGzip = gzipBytes > budget.maxGzipBytes;
  const status = overRaw || overGzip ? "over-budget" : "ok";
  if (status === "over-budget") failed++;
  rows.push({ ...budget, bytes, gzipBytes, status });
  console.log(`[bundle-size] ${status === "ok" ? "OK " : "OVER"} ${budget.file} raw ${bytes}/${budget.maxBytes} gzip ${gzipBytes}/${budget.maxGzipBytes}`);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({
  generated: new Date().toISOString(),
  status: failed === 0 ? "pass" : "fail",
  audit_targets: { "A9.1 (bundle size budgets)": failed === 0 ? "measured, enforced in verify:all + CI" : "over budget" },
  budgets: rows
}, null, 2) + "\n", "utf8");

if (failed) {
  console.error(`[bundle-size] ${failed} budget failure(s). Shrink the payload or raise the budget in a reviewed commit.`);
  process.exit(1);
}
console.log(`[bundle-size] all ${BUDGETS.length} budgets green -> docs/bundle-size.json`);
