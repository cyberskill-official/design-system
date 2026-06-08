#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname, "..");
const required = [
  "packages/tokens/dist/css/tokens.css",
  "packages/tokens/dist/ts/tokens.js",
  "packages/tokens/dist/swift/Tokens.swift",
  "packages/tokens/dist/kt/CSTokens.kt",
  "packages/tokens/dist/flutter/cs_tokens.dart",
  "packages/tokens/dist/rn/tokens.js",
  "packages/tokens/dist/figma/variables.json",
  "packages/tokens/dist/contrast-grid.csv",
  "packages/react/src/index.js",
  "packages/react/src/index.d.ts",
  "packages/react/src/styles.css",
  "packages/react/test/component-contracts.test.mjs",
  "packages/react/test/render-smoke.test.mjs",
  "packages/mcp-tokens/src/server.js",
  "packages/mcp-components/src/server.js",
  "plugins/figma-token-sync/manifest.json",
  "plugins/figma-token-sync/code.js",
  "plugins/figma-token-sync/ui.html",
  "docs/evidence.csv",
  "docs/benchmark.csv",
  "docs/wcag-matrix.csv",
  "docs/component-catalog.json",
  "docs/storybook/index.html",
  "docs/artifact-recreation.json",
  "docs/artifact-conformance.json"
];

const missing = required.filter((path) => !existsSync(resolve(ROOT, path)));
if (missing.length) {
  console.error("[verify] missing artifacts:");
  for (const path of missing) console.error(`  - ${path}`);
  process.exit(1);
}

const contrast = readFileSync(resolve(ROOT, "packages/tokens/dist/contrast-grid.csv"), "utf8");
if (contrast.includes(",false")) {
  console.error("[verify] contrast grid contains WCAG AA body failure");
  process.exit(1);
}

const conformance = JSON.parse(readFileSync(resolve(ROOT, "docs/artifact-conformance.json"), "utf8"));
if (conformance.scoring_model !== "tri-track-2026-05-24") {
  console.error("[verify] artifact conformance must use tri-track-2026-05-24 scoring");
  process.exit(1);
}
if (conformance.doctrine_excellence_score !== 1000 || conformance.artifacts_conformance_score !== 1000) {
  console.error("[verify] automated loop stop condition not met");
  process.exit(1);
}
if (!Array.isArray(conformance.hard_blockers) || conformance.hard_blockers.length !== 0) {
  console.error("[verify] automated hard blockers must be empty; manual blockers belong in manual_required_blockers");
  process.exit(1);
}
if (!Array.isArray(conformance.manual_required_blockers)) {
  console.error("[verify] artifact conformance missing manual_required_blockers");
  process.exit(1);
}

const reactSource = readFileSync(resolve(ROOT, "packages/react/src/index.js"), "utf8");
for (const exportName of ["Button", "TextField", "Dialog", "DataTable", "AIDisclosureBadge", "HumanReviewGate"]) {
  if (!reactSource.includes(` ${exportName}`)) {
    console.error(`[verify] @cyberskill/react missing ${exportName} export`);
    process.exit(1);
  }
}

const componentContracts = spawnSync(process.execPath, ["packages/react/test/component-contracts.test.mjs"], {
  cwd: ROOT,
  encoding: "utf8"
});
if (componentContracts.status !== 0) {
  process.stderr.write(componentContracts.stdout);
  process.stderr.write(componentContracts.stderr);
  process.exit(componentContracts.status ?? 1);
}

const renderSmoke = spawnSync(process.execPath, ["packages/react/test/render-smoke.test.mjs"], {
  cwd: ROOT,
  encoding: "utf8"
});
if (renderSmoke.status !== 0) {
  process.stderr.write(renderSmoke.stdout);
  process.stderr.write(renderSmoke.stderr);
  process.exit(renderSmoke.status ?? 1);
}

console.log(`[verify] ${required.length} artifacts present; automated scores ${conformance.doctrine_excellence_score}/${conformance.artifacts_conformance_score}; manual score ${conformance.manual_conformance_score}`);
