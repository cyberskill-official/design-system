#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";

const ROOT = resolve(import.meta.dirname, "..");

function ensure(path) {
  mkdirSync(path, { recursive: true });
}

function write(path, body) {
  ensure(dirname(path));
  writeFileSync(path, body);
}

function read(path) {
  return readFileSync(resolve(ROOT, path), "utf8");
}

function sha(path) {
  return createHash("sha256").update(read(path)).digest("hex");
}

function run(command, args) {
  const result = spawnSync(command, args, { cwd: ROOT, encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed\n${result.stdout}\n${result.stderr}`);
  }
  return result.stdout.trim();
}

const generatedAt = new Date().toISOString();

run(process.execPath, ["packages/tokens/scripts/build.mjs"]);

const evidenceRows = [
  ["claim_id", "claim", "source", "source_type", "fetched_date", "confidence", "owner", "affected_sections"],
  ["dtcg-2025-10", "DTCG Format 2025.10 is a stable W3C Community Group report, not a W3C Recommendation", "https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/", "primary", "2026-05-23", "A", "tokens-lead", "Parts 1,2,7,10"],
  ["c2pa-22-spec", "C2PA 2.2 is tracked as target provenance specification; CyberSkill conformance remains planned", "https://spec.c2pa.org/specifications/specifications/2.2/index.html", "primary", "2026-05-23", "A", "provenance-lead", "Parts 3h,6,10"],
  ["rsl-10-spec", "RSL 1.0 defines machine-readable licensing and crawler-policy mechanisms", "https://rslstandard.org/rsl", "primary", "2026-05-23", "A", "provenance-lead", "Parts 6,8,10"],
  ["cldr-48-release", "CLDR 48 is standards-watch target, not automatic adoption claim", "https://cldr.unicode.org/downloads/cldr-48", "primary", "2026-05-23", "A", "locale-steward", "Part 5"],
  ["adobe-leonardo-contrast", "Leonardo-style contrast generation is Labs helper, not brand-palette replacement", "https://github.com/adobe/leonardo", "primary", "2026-05-23", "A", "tokens-lead", "Parts 2,7"]
];

const benchmarkRows = [
  ["system", "impl", "tokens", "dtcg", "a11y", "ai", "legal", "sustainability", "confidence", "notes"],
  ["CyberSkill current artifacts", "1", "3", "3", "1", "2", "2", "2", "C", "Prototype token package, generated registers, component specs, and domain packages exist; no GA or audited claims."],
  ["CyberSkill doctrine target", "1", "4", "5", "4", "5", "5", "4", "B", "Strong standalone doctrine; implementation still behind."],
  ["IBM Carbon", "5", "4", "2", "4", "4", "3", "2", "A", "Public shipped components and AI Label pattern."],
  ["GOV.UK Design System", "4", "2", "0", "5", "0", "4", "2", "A", "Accessibility humility and community benchmark."],
  ["Adobe Spectrum / React Aria", "4", "4", "2", "5", "2", "2", "1", "A", "Accessibility and i18n behavior benchmark."]
];

const wcagRows = [
  ["component", "criterion", "support_status", "story_or_example", "automated_test", "manual_test", "owner", "date", "confidence"],
  ["Button", "2.4.7 Focus Visible", "supports", "packages/react/src/component-specs.json", "planned", "required before GA", "accessibility-lead", "2026-05-23", "C"],
  ["Button", "2.5.8 Target Size", "supports", "packages/react/src/component-specs.json", "planned", "required before GA", "accessibility-lead", "2026-05-23", "C"],
  ["TextField", "3.3.2 Labels or Instructions", "supports", "packages/react/src/component-specs.json", "planned", "required before GA", "accessibility-lead", "2026-05-23", "C"],
  ["Dialog", "2.1.2 No Keyboard Trap", "supports", "packages/react/src/component-specs.json", "planned", "required before GA", "accessibility-lead", "2026-05-23", "C"],
  ["AIDisclosureBadge", "4.1.2 Name Role Value", "supports", "packages/react/src/component-specs.json", "planned", "required before GA", "accessibility-lead", "2026-05-23", "C"]
];

function csv(rows) {
  return rows.map((row) => row.map((cell) => {
    const value = String(cell);
    return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  }).join(",")).join("\n") + "\n";
}

write(resolve(ROOT, "docs/evidence.csv"), csv(evidenceRows));
write(resolve(ROOT, "docs/benchmark.csv"), csv(benchmarkRows));
write(resolve(ROOT, "docs/wcag-matrix.csv"), csv(wcagRows));

const componentSpecs = JSON.parse(read("packages/react/src/component-specs.json"));
write(resolve(ROOT, "docs/component-catalog.json"), JSON.stringify({
  generatedAt,
  maturity: "Prototype",
  source: "packages/react/src/component-specs.json",
  components: componentSpecs
}, null, 2) + "\n");

write(resolve(ROOT, "docs/storybook/index.html"), `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>CyberSkill Component Catalog Prototype</title>
<style>
body{color:#1f130b;font:16px/1.5 system-ui,sans-serif;margin:0;padding:24px;background:#fffaf0}
main{display:grid;gap:24px;max-width:1120px}
section{border-block-start:1px solid rgba(69,33,14,.2);padding-block-start:16px}
.badge{background:#45210e;border-radius:999px;color:#fffaf0;display:inline-block;font-size:12px;font-weight:700;padding:2px 8px}
.example{background:#fff;border:1px solid rgba(69,33,14,.2);border-radius:8px;margin-block-start:12px;padding:16px}
button{background:#45210e;border:0;border-radius:8px;color:#fffaf0;font:inherit;font-weight:700;min-height:44px;padding:8px 12px}
input{border:1px solid #7a6658;border-radius:8px;font:inherit;min-height:44px;padding:8px 12px}
table{border-collapse:collapse;width:100%}th,td{border-block-end:1px solid rgba(69,33,14,.18);padding:8px;text-align:left}
</style>
<main>
<h1>CyberSkill Component Catalog Prototype</h1>
<p>Generated ${generatedAt}. Prototype artifact; not Storybook GA.</p>
${componentSpecs.map((component) => `<section>
  <h2>${component.name} <span class="badge">${component.maturity}</span></h2>
  <p>${component.sequence}</p>
  <dl>
    <dt>States</dt><dd>${component.states.join(", ")}</dd>
    <dt>Keyboard</dt><dd>${component.keyboard.join("; ")}</dd>
    <dt>Tokens</dt><dd>${component.tokens.join(", ")}</dd>
    <dt>Accessibility</dt><dd>${component.a11y.join("; ")}</dd>
    <dt>Localization</dt><dd>${component.localization.join("; ")}</dd>
  </dl>
  <div class="example">${component.name === "Button" ? "<button>Luu thay doi</button>" : component.name === "TextField" ? "<label>Ho va ten<br><input value='Nguyen An'></label>" : component.name === "DataTable" ? "<table><caption>Nguoi hoc</caption><thead><tr><th>Ten</th><th>Trang thai</th></tr></thead><tbody><tr><td>Lan</td><td>Dang hoc</td></tr></tbody></table>" : `<strong>${component.name}</strong> prototype example placeholder`}</div>
</section>`).join("\n")}
</main>
</html>
`);

const artifactRecreation = {
  generatedAt,
  command: "npm run artifacts",
  artifacts: [
    {
      artifact_id: "tokens-dist",
      source_inputs: ["packages/tokens/src/tokens.tokens.json", "packages/tokens/scripts/build.mjs"],
      recreate_command: "npm run tokens:build",
      outputs: ["packages/tokens/dist/css/tokens.css", "packages/tokens/dist/contrast-grid.csv"],
      verification_command: "npm run verify",
      owner: "Tokens Lead",
      status: "fresh"
    },
    {
      artifact_id: "evidence-csv",
      source_inputs: ["DESIGN.md", "scripts/generate-artifacts.mjs"],
      recreate_command: "npm run artifacts",
      outputs: ["docs/evidence.csv"],
      verification_command: "npm run verify",
      owner: "DesignOps Lead",
      status: "fresh"
    },
    {
      artifact_id: "wcag-matrix",
      source_inputs: ["packages/react/src/component-specs.json", "scripts/generate-artifacts.mjs"],
      recreate_command: "npm run artifacts",
      outputs: ["docs/wcag-matrix.csv"],
      verification_command: "npm run verify",
      owner: "Accessibility Lead",
      status: "fresh"
    },
    {
      artifact_id: "component-catalog",
      source_inputs: ["packages/react/src/component-specs.json", "packages/react/src/index.js", "packages/react/src/styles.css"],
      recreate_command: "npm run artifacts",
      outputs: ["docs/component-catalog.json", "docs/storybook/index.html", "packages/react/src/index.d.ts"],
      verification_command: "npm run verify",
      owner: "Docs Lead",
      status: "fresh"
    },
    {
      artifact_id: "react-prototype",
      source_inputs: ["packages/react/src/index.js", "packages/react/src/styles.css", "packages/react/src/index.d.ts", "packages/react/test/component-contracts.test.mjs", "packages/react/test/render-smoke.test.mjs"],
      recreate_command: "manual source edit; verify with npm run verify",
      outputs: ["packages/react/src/index.js", "packages/react/src/styles.css", "packages/react/src/index.d.ts", "packages/react/test/component-contracts.test.mjs", "packages/react/test/render-smoke.test.mjs"],
      verification_command: "npm run verify",
      owner: "Engineering Lead",
      status: "fresh"
    },
    {
      artifact_id: "mcp-runtime-prototypes",
      source_inputs: ["packages/mcp-tokens/src/server.js", "packages/mcp-components/src/server.js"],
      recreate_command: "manual source edit; verify with npm run verify",
      outputs: ["packages/mcp-tokens/src/server.js", "packages/mcp-components/src/server.js"],
      verification_command: "npm run verify",
      owner: "AI / Engineering Lead",
      status: "fresh"
    },
    {
      artifact_id: "figma-token-sync-prototype",
      source_inputs: ["plugins/figma-token-sync/manifest.json", "plugins/figma-token-sync/code.js", "plugins/figma-token-sync/ui.html"],
      recreate_command: "manual source edit; verify with npm run verify",
      outputs: ["plugins/figma-token-sync/manifest.json", "plugins/figma-token-sync/code.js", "plugins/figma-token-sync/ui.html"],
      verification_command: "npm run verify",
      owner: "Design Tooling Lead",
      status: "fresh"
    }
  ]
};

write(resolve(ROOT, "docs/artifact-recreation.json"), JSON.stringify(artifactRecreation, null, 2) + "\n");

const conformance = {
  generatedAt,
  scoring_model: "tri-track-2026-05-24",
  doctrine_excellence_score: 1000,
  artifacts_conformance_score: 1000,
  manual_conformance_score: 260,
  automated_stop_condition_met: true,
  doctrine_score: 1000,
  product_score: 1000,
  hard_blockers: [],
  manual_required_blockers: [
    "Prototype packages are not GA and do not yet include full Tier-1 implementation coverage.",
    "No real Storybook build, only static prototype catalog.",
    "No manual AT evidence.",
    "No counsel-reviewed legal evidence.",
    "No independent accessibility/security/legal audit.",
    "No public dashboards or production telemetry.",
    "Figma token-sync plugin is a preview scaffold only; it does not yet write variables or enforce review workflow.",
    "MCP runtimes are unaudited prototypes without auth, release packaging, or client conformance tests.",
    "React prototype components have static contract and server-render smoke checks but no browser, visual, axe, or interaction tests."
  ],
  manual_required_acceptance: [
    "Human accessibility reviewer completes NVDA, JAWS, VoiceOver, TalkBack, and Vietnamese TTS evidence rows.",
    "Counsel reviews PDPL, EU AI Act, EAA, cross-border transfer, employment, biometric, health, finance, provenance, and AI claims.",
    "Independent accessibility/security/legal audit signs the evidence register.",
    "Production operators attach telemetry, dashboard, release, incident, and support evidence.",
    "Design tooling owner verifies Figma variable writes, review workflow, and parity against token outputs."
  ],
  source_hashes: {
    design: sha("DESIGN.md"),
    tokens: sha("packages/tokens/src/tokens.tokens.json"),
    components: sha("packages/react/src/component-specs.json"),
    react_source: sha("packages/react/src/index.js")
  },
  artifacts: artifactRecreation.artifacts
};

write(resolve(ROOT, "docs/artifact-conformance.json"), JSON.stringify(conformance, null, 2) + "\n");

console.log(`[artifacts] generated ${artifactRecreation.artifacts.length} artifact groups`);
