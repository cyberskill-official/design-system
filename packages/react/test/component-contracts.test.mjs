#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../../..");

function read(path) {
  return readFileSync(resolve(ROOT, path), "utf8");
}

const specs = JSON.parse(read("packages/react/src/component-specs.json"));
const source = read("packages/react/src/index.js");
const types = read("packages/react/src/index.d.ts");
const css = read("packages/react/src/styles.css");

const requiredSelectors = {
  Button: ".cs-button",
  TextField: ".cs-field",
  Dialog: ".cs-dialog",
  DataTable: ".cs-table",
  AIDisclosureBadge: ".cs-ai-disclosure",
  HumanReviewGate: ".cs-review-gate"
};

const failures = [];

for (const spec of specs) {
  if (!spec.name || !spec.sequence || !spec.maturity) failures.push(`${spec.name ?? "unknown"} missing identity fields`);
  if (!Array.isArray(spec.states) || spec.states.length === 0) failures.push(`${spec.name} missing states`);
  if (!Array.isArray(spec.keyboard) || spec.keyboard.length === 0) failures.push(`${spec.name} missing keyboard model`);
  if (!Array.isArray(spec.tokens) || spec.tokens.length === 0) failures.push(`${spec.name} missing consumed tokens`);
  if (!Array.isArray(spec.a11y) || spec.a11y.length === 0) failures.push(`${spec.name} missing accessibility obligations`);
  if (!Array.isArray(spec.localization) || spec.localization.length === 0) failures.push(`${spec.name} missing localization obligations`);

  if (requiredSelectors[spec.name]) {
    if (!source.includes(` ${spec.name}`)) failures.push(`${spec.name} source export missing`);
    if (!types.includes(spec.name)) failures.push(`${spec.name} type export missing`);
    if (!css.includes(requiredSelectors[spec.name])) failures.push(`${spec.name} CSS selector missing`);
  }
}

if (failures.length) {
  console.error("[components:test] contract failures:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`[components:test] ${specs.length} component contracts checked`);
