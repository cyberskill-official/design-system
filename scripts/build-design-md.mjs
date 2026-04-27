#!/usr/bin/env node
/**
 * build-design-md.mjs — CyberSkill wrapper around the framework's generator
 * ──────────────────────────────────────────────────────────────────────────
 *
 * The canonical implementation lives in the design-system-audit-framework repo
 * (sibling folder). This wrapper:
 *   1. Loads the framework's exportable runGenerator() function.
 *   2. Loads the system-specific config from `meta/design-md.config.json`.
 *   3. Invokes it with this design system's root directory.
 *
 * Outputs:
 *   - DESIGN.md         (full inline; ~1MB+; standalone for Claude 200K)
 *   - DESIGN-DIGEST.md  (per-part-truncated; ~250-400KB; fits smaller contexts)
 *
 * Usage:
 *   pnpm build:design-md          (preferred)
 *   node scripts/build-design-md.mjs
 *   node scripts/build-design-md.mjs --check         (CI gate)
 *   node scripts/build-design-md.mjs --full-only
 *   node scripts/build-design-md.mjs --digest-only
 *   node scripts/build-design-md.mjs --dry-run
 *
 * If the framework folder isn't present as a sibling, this script will fail
 * with a clear error message pointing at the framework repo URL.
 *
 * Zero dependencies — Node 20+ built-ins only.
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");                        // Design System/
const FRAMEWORK = resolve(ROOT, "..", "Design System Audit Framework");
const GENERATOR_PATH = resolve(FRAMEWORK, "scripts/build-design-md.mjs");

if (!existsSync(GENERATOR_PATH)) {
  console.error(`[build-design-md] Framework generator not found at:`);
  console.error(`  ${GENERATOR_PATH}`);
  console.error(``);
  console.error(`Clone the audit framework as a sibling of this repo:`);
  console.error(`  git clone https://github.com/cyberskill-official/design-system-audit-framework.git`);
  console.error(`(or adjust the FRAMEWORK path at the top of this file)`);
  process.exit(1);
}

const { runGenerator } = await import(GENERATOR_PATH);

// Load CyberSkill-specific config
const configPath = resolve(ROOT, "meta/design-md.config.json");
let config = {};
try {
  config = JSON.parse(readFileSync(configPath, "utf8"));
} catch (err) {
  console.error(`[build-design-md] Couldn't read config at ${configPath}: ${err.message}`);
  process.exit(1);
}

// Pass through CLI flags
const args = process.argv.slice(2);
const opts = {
  dryRun: args.includes("--dry-run"),
  check: args.includes("--check"),
  fullOnly: args.includes("--full-only"),
  digestOnly: args.includes("--digest-only"),
};

try {
  await runGenerator({ root: ROOT, config, opts });
} catch (err) {
  console.error("[build-design-md] Error:", err);
  process.exit(1);
}
