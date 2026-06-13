#!/usr/bin/env node
/*
 * @cyberskill/style-packs verify — per-pack audit engine.
 *
 * Proves every shipped style pack "works perfectly when triggered along with the
 * design system". For each pack with a CSS render layer it checks, individually:
 *
 *  HARD (fail the build):
 *   H1 braces balanced (parses)
 *   H2 every selector scoped under [data-cs-style="<id>"]
 *   H3 no redefinition of immutable anchors (--cs-color-brand-umber/ochre)
 *   H4 focus is never removed (no `outline: none|0` on a :focus/:focus-visible rule)
 *   H5 base .cs-button min-height is never set below 44px (touch-target floor)
 *   H6 targets at least one real design-system surface (token override or .cs-* class)
 *
 *  SOFT (warn, reported, non-blocking):
 *   S1 stays on-brand (references a brand anchor token/hex or a cs surface/radius token)
 *   S2 if it animates (transition/animation/@keyframes) it declares a
 *      prefers-reduced-motion fallback
 *   S3 if it uses translucency (backdrop-filter / filter: blur) it declares a
 *      prefers-reduced-transparency fallback
 *
 * Emits dist/verification-report.json and dist/verification-report.md.
 * Exit non-zero if any HARD check fails on any pack.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = resolve(ROOT, "src/styles.catalog.json");
const CSS_DIR = resolve(ROOT, "src/css");
const DIST = resolve(ROOT, "dist");

const catalog = JSON.parse(readFileSync(SRC, "utf8"));
function ensure(p) { mkdirSync(p, { recursive: true }); }
function write(p, b) { ensure(dirname(p)); writeFileSync(p, b); }

const ANCHOR_HEX = /#45210e|#f4ba17/i;
const CS_CLASSES = [".cs-button", ".cs-field", ".cs-dialog", ".cs-table", ".cs-ai-disclosure", ".cs-review-gate", ".cs-logo"];

function stripComments(css) { return css.replace(/\/\*[\s\S]*?\*\//g, ""); }

function bracesBalanced(css) {
  let depth = 0;
  for (const ch of css) {
    if (ch === "{") depth++;
    else if (ch === "}") { depth--; if (depth < 0) return false; }
  }
  return depth === 0;
}

/** Split into { selector, body } rule objects, flattening one level of @media/@supports. */
function rules(css) {
  const out = [];
  const clean = stripComments(css);
  const re = /([^{}]+)\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let m;
  function walk(text) {
    let mm;
    const r = /([^{}]+)\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
    while ((mm = r.exec(text))) {
      const sel = mm[1].trim();
      const body = mm[2];
      if (sel.startsWith("@")) {
        walk(body); // descend into @media/@supports/@keyframes
      } else {
        out.push({ selector: sel, body });
      }
    }
  }
  walk(clean);
  return out;
}

const packs = catalog.packs;
const report = [];
let hardFails = 0;

for (const pack of packs) {
  const cssFile = resolve(CSS_DIR, `${pack.id}.css`);
  if (!existsSync(cssFile)) {
    report.push({ id: pack.id, name: pack.name, status: "no-css", hard: [], soft: [], ok: true });
    continue;
  }
  const css = readFileSync(cssFile, "utf8");
  const scope = `[data-cs-style="${pack.id}"]`;
  const hard = [];
  const soft = [];

  // H1
  if (!bracesBalanced(css)) hard.push("H1 unbalanced braces");
  const rs = rules(css);

  // H2
  for (const { selector } of rs) {
    if (!selector.includes(scope)) { hard.push(`H2 selector not scoped: "${selector.slice(0, 60)}"`); break; }
  }
  // H3
  if (/--cs-color-brand-(umber|ochre)\s*:/.test(css)) hard.push("H3 redefines brand anchor");
  // H4
  for (const { selector, body } of rs) {
    if (/:focus(-visible)?/.test(selector) && /outline\s*:\s*(none|0)\b/.test(body)) {
      hard.push("H4 removes focus outline"); break;
    }
  }
  // H5 — base .cs-button (no extra class) min-height below 44
  for (const { selector, body } of rs) {
    const isBaseButton = /\.cs-button(?![\w-])/.test(selector) && !/--/.test(selector);
    const mh = body.match(/min-height\s*:\s*(\d+(?:\.\d+)?)px/);
    if (isBaseButton && mh && parseFloat(mh[1]) < 44) { hard.push(`H5 base button min-height ${mh[1]}px < 44px`); break; }
  }
  // H6 — does something real
  const touchesSystem = rs.some(({ selector, body }) =>
    selector.trim() === scope && /--cs-/.test(body)) ||
    rs.some(({ selector }) => CS_CLASSES.some((c) => selector.includes(c)));
  if (!touchesSystem) hard.push("H6 pack does not target any cs token or component");

  // S1 on-brand
  const onBrand = ANCHOR_HEX.test(css) || /var\(--cs-color-brand-/.test(css) ||
    /--cs-color-surface|--cs-color-accent|--cs-radius|--cs-color-text/.test(css);
  if (!onBrand) soft.push("S1 no brand anchor / cs token reference (may drift off-brand)");
  // S2 motion fallback
  const animates = /(transition|animation)\s*:/.test(stripComments(css)) || /@keyframes/.test(css);
  if (animates && !/prefers-reduced-motion/.test(css)) soft.push("S2 animates without prefers-reduced-motion fallback");
  // S3 transparency fallback
  const translucent = /backdrop-filter\s*:/.test(css) || /filter\s*:\s*blur/.test(css);
  if (translucent && !/prefers-reduced-transparency/.test(css)) soft.push("S3 translucent without prefers-reduced-transparency fallback");

  const ok = hard.length === 0;
  if (!ok) hardFails++;
  report.push({ id: pack.id, name: pack.name, status: ok ? "pass" : "fail", hard, soft, ok });
}

const shippedReports = report.filter((r) => r.status !== "no-css");
const passCount = shippedReports.filter((r) => r.ok).length;
const warnCount = shippedReports.filter((r) => r.ok && r.soft.length).length;

write(resolve(DIST, "verification-report.json"), JSON.stringify({
  generatedAt: new Date().toISOString(),
  totals: { audited: shippedReports.length, pass: passCount, fail: hardFails, withWarnings: warnCount },
  packs: report
}, null, 2) + "\n");

const md = [
  "# Style Pack Verification Report",
  "",
  `${shippedReports.length} packs audited · **${passCount} pass** · ${hardFails} fail · ${warnCount} with warnings.`,
  "",
  "Each pack is checked individually for: balanced CSS, correct `[data-cs-style]` scoping, no brand-anchor override, focus never removed, 44px button floor, real system targeting (hard); plus on-brand reference, reduced-motion and reduced-transparency fallbacks (soft).",
  "",
  "| Pack | Result | Hard failures | Warnings |",
  "|---|---|---|---|",
  ...shippedReports.map((r) =>
    `| \`${r.id}\` | ${r.ok ? "✅ pass" : "❌ FAIL"} | ${r.hard.join("; ") || "—"} | ${r.soft.join("; ") || "—"} |`),
  ""
].join("\n");
write(resolve(DIST, "verification-report.md"), md);

console.log(`[style-packs:verify] ${shippedReports.length} audited, ${passCount} pass, ${hardFails} fail, ${warnCount} with warnings`);
if (hardFails > 0) {
  console.error("[style-packs:verify] HARD failures present:");
  for (const r of report.filter((x) => !x.ok)) console.error(`  - ${r.id}: ${r.hard.join("; ")}`);
  process.exit(1);
}
