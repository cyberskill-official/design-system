// Generates the root DESIGN.md (Google-Stitch-style open-spec surface) from
// tokens/tokens.dtcg.json (values) + _ds_manifest.json (inventory) + VERSION.
// Deterministic: the "generated" stamp comes from the DTCG generation date, not
// the wall clock — same inputs ⇒ byte-identical output.
//
//   node scripts/generate-design-md.mjs           # write DESIGN.md
//   node scripts/generate-design-md.mjs --check   # exit 1 if DESIGN.md is stale
//
// The browser gate _audit/design-md-parity.html imports the same
// scripts/design-md-lib.mjs and asserts byte equality, so generator and gate
// cannot drift.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDesignMd } from "./design-md-lib.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "DESIGN.md");

const dtcg = JSON.parse(readFileSync(join(ROOT, "tokens/tokens.dtcg.json"), "utf8"));
const manifest = JSON.parse(readFileSync(join(ROOT, "_ds_manifest.json"), "utf8"));
const version = readFileSync(join(ROOT, "VERSION"), "utf8").trim();

const text = buildDesignMd({ dtcg, manifest, version });

if (process.argv.includes("--check")) {
  let current = null;
  try { current = readFileSync(OUT, "utf8"); } catch { /* missing counts as stale */ }
  if (current === text) {
    console.log("✓ DESIGN.md is fresh (byte-identical regeneration, " + text.length + " bytes)");
    process.exit(0);
  }
  console.error("✗ DESIGN.md is stale or hand-edited — regenerate with: npm run build:design-md");
  if (current === null) console.error("  (file is missing)");
  else {
    const a = current.split("\n"), b = text.split("\n");
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if (a[i] !== b[i]) { console.error(`  first diff at line ${i + 1}:\n    on disk:  ${a[i] ?? "(missing)"}\n    expected: ${b[i] ?? "(missing)"}`); break; }
    }
  }
  process.exit(1);
}

writeFileSync(OUT, text);
console.log("built DESIGN.md — " + text.length + " bytes, v" + version + ", " + manifest.templates.length + " templates, " + manifest.components.length + " exports");
