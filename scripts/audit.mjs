#!/usr/bin/env node
// @ts-check
/**
 * audit.mjs — run the CyberSkill Design System Audit Framework (CSAF) on this repo
 * ─────────────────────────────────────────────────────────────────────────────────
 *
 * The CDS half of the CDS↔CSAF auto-evolution loop.
 *
 *   npm run audit             audit the repo; if a committed baseline exists,
 *                             gate against it (no-silent-regression, FR-CORE-002)
 *   npm run audit:baseline    audit, then promote the fresh scores.json to
 *                             docs/audit-baseline.json — the explicit human
 *                             sign-off act; commit the diff it produces
 *   npm run audit -- --profile dsaf-25    quick 25-criterion pass
 *
 * Framework resolution order:
 *   1. DSAF_HOME environment variable
 *   2. sibling checkout ../design-system-audit-framework
 *
 * Outputs land in meta/audits/<date>/ (gitignored, regenerable). Only the
 * baseline (docs/audit-baseline.json) is committed — updating it is a reviewed,
 * versioned decision, which is exactly what the regression policy wants.
 */

import { existsSync, mkdirSync, copyFileSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BASELINE = join(ROOT, "docs", "audit-baseline.json");

const args = process.argv.slice(2);
const updateBaseline = args.includes("--baseline");
const profileIndex = args.indexOf("--profile");
const profile = profileIndex >= 0 ? args[profileIndex + 1] : undefined;

const dsafHome = process.env.DSAF_HOME
  ? resolve(process.env.DSAF_HOME)
  : resolve(ROOT, "..", "design-system-audit-framework");
const enginePath = join(dsafHome, "scripts", "bin", "maximal-audit.mjs");
if (!existsSync(enginePath)) {
  console.error(`[audit] CSAF engine not found at ${enginePath}`);
  console.error("[audit] Set DSAF_HOME or clone the framework as a sibling:");
  console.error("        git clone https://github.com/cyberskill-official/design-system-audit-framework ../design-system-audit-framework");
  process.exit(2);
}

const today = new Date().toISOString().slice(0, 10);
const outDir = join(ROOT, "meta", "audits", today);
mkdirSync(outDir, { recursive: true });

const { runMaximalAudit } = await import(pathToFileURL(enginePath).href);
const result = await runMaximalAudit({
  input: ROOT,
  outDir,
  mode: "analyze",
  model: "cds-audit-wrapper",
  maxPages: 1,
  profile
});

console.log(`[audit] engine: ${dsafHome}`);
console.log(`[audit] report: ${result.reportPath}`);
console.log(`[audit] scores: ${result.scoresPath}`);
console.log(`[audit] unified ${result.unifiedAverage}/100 · weighted ${result.weightedCombined}/100 · tier ${result.tier} · enterprise floors ${result.enterpriseGrade ? "PASS" : "not yet"}`);

if (updateBaseline) {
  copyFileSync(result.scoresPath, BASELINE);
  console.log(`[audit] baseline updated -> ${BASELINE}`);
  console.log("[audit] Commit this file. A baseline update is the signed acceptance of the current score surface.");
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.log(`[audit] no committed baseline at docs/audit-baseline.json — run \`npm run audit:baseline\` once and commit it to arm the regression gate.`);
  process.exit(0);
}

// Same-profile guard: comparing a dsaf-25 run against a full baseline is noise.
try {
  const base = JSON.parse(readFileSync(BASELINE, "utf8"));
  const cur = JSON.parse(readFileSync(result.scoresPath, "utf8"));
  if (base.profile !== cur.profile) {
    console.log(`[audit] baseline profile (${base.profile}) differs from this run (${cur.profile}); skipping regression gate.`);
    process.exit(0);
  }
} catch {
  // fall through to the diff, which validates schemas properly
}

const diff = spawnSync(process.execPath, [
  join(dsafHome, "scripts", "bin", "audit-diff.mjs"),
  "--baseline", BASELINE,
  "--current", result.scoresPath,
  "--out", join(outDir, "AUDIT_DIFF.md")
], { stdio: "inherit" });
process.exit(diff.status ?? 1);
