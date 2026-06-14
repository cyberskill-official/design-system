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

// ---- APCA contrast (real computation, light-mode) -------------------------
// Core light-theme token defaults (from @cyberskill/tokens) for surface resolution.
const CORE = {
  "--cs-color-surface-page": "#FFFDF8",
  "--cs-color-surface-panel": "#FFFFFF",
  "--cs-color-surface-raised": "#FBF4E9",
  "--cs-color-text-primary": "#45210E",
  "--cs-color-text-accent": "#6E3B0E",
  "--cs-color-text-muted": "#6E5A4C",
  "--cs-color-text-inverse": "#FFFFFF"
};
function normHex(h) {
  if (!h) return null;
  h = h.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(h)) return "#" + h.slice(1).split("").map((c) => c + c).join("");
  if (/^#[0-9a-f]{6}$/.test(h)) return h;
  return null;
}
function resolveColor(val, vars, depth = 0) {
  if (!val || depth > 8) return null;
  val = val.trim();
  if (/color-mix\(/i.test(val)) return null;            // skip blends (avoid false positives)
  if (/^#[0-9a-f]{3,6}$/i.test(val)) return normHex(val);
  const low = val.toLowerCase();
  if (low === "white") return "#ffffff";
  if (low === "black") return "#000000";
  if (["transparent", "currentcolor", "inherit", "initial", "unset", "none"].includes(low)) return null;
  const vm = val.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*([\s\S]+))?\)$/);
  if (vm) {
    const name = vm[1], fb = vm[2];
    if (/--cs-color-brand-umber/.test(name)) return "#45210e";
    if (/--cs-color-brand-ochre/.test(name)) return "#f4ba17";
    if (vars[name] !== undefined) { const r = resolveColor(vars[name], vars, depth + 1); if (r) return r; }
    if (fb) { const r = resolveColor(fb, vars, depth + 1); if (r) return r; }
    if (CORE[name]) return resolveColor(CORE[name], vars, depth + 1);
    return null;
  }
  return null;
}
function apcaLc(txtHex, bgHex) {
  const lin = (h) => { const v = h.replace("#", ""); const f = (c) => Math.pow(parseInt(c, 16) / 255, 2.4);
    return 0.2126729 * f(v.slice(0, 2)) + 0.7151522 * f(v.slice(2, 4)) + 0.072175 * f(v.slice(4, 6)); };
  let Yt = lin(txtHex), Yb = lin(bgHex); const thr = 0.022, clmp = 1.414;
  const cl = (Y) => (Y >= thr ? Y : Y + Math.pow(thr - Y, clmp)); Yt = cl(Yt); Yb = cl(Yb);
  let S, L;
  if (Yb > Yt) { S = (Math.pow(Yb, 0.56) - Math.pow(Yt, 0.57)) * 1.14; L = S < 0.001 ? 0 : S - 0.027; }
  else { S = (Math.pow(Yb, 0.65) - Math.pow(Yt, 0.62)) * 1.14; L = S > -0.001 ? 0 : S + 0.027; }
  return Math.round(L * 100);
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
  // H7 — declares a valid mode set
  const VALID_MODES = new Set(["light", "dark"]);
  if (!Array.isArray(pack.modes) || pack.modes.length === 0 || !pack.modes.every((m) => VALID_MODES.has(m))) {
    hard.push("H7 invalid or missing `modes` (expected non-empty subset of light|dark)");
  } else if (pack.primaryMode && !pack.modes.includes(pack.primaryMode)) {
    hard.push(`H7 primaryMode "${pack.primaryMode}" not listed in modes`);
  }

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
  // S4 — declares dark mode but pins a light base surface and ships no [data-theme="dark"] override
  const declaresDark = Array.isArray(pack.modes) && pack.modes.includes("dark") && pack.primaryMode !== "dark";
  const pinsLightSurface = /--cs-color-surface-(page|panel|raised)\s*:/.test(stripComments(css));
  const hasDarkBlock = /\[data-theme="dark"\]/.test(css);
  if (declaresDark && pinsLightSurface && !hasDarkBlock) {
    soft.push('S4 declares dark mode but pins a light surface with no [data-theme="dark"] override');
  }
  // S5 — real APCA contrast on resolvable solid color/background pairs (light mode).
  // Resolves the pack's root-scope custom props + core token defaults; skips color-mix()
  // and unresolved vars so it only flags high-confidence pairs. Warn if |Lc| < 75.
  {
    const vars = {};
    for (const { selector, body } of rs) {
      if (selector.trim() !== scope) continue; // light-mode root declarations only
      for (const m of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+)/g)) vars[m[1]] = m[2].trim();
    }
    const pageBg = resolveColor(vars["--cs-color-surface-page"] || CORE["--cs-color-surface-page"], vars);
    const panelBg = resolveColor(vars["--cs-color-surface-panel"] || CORE["--cs-color-surface-panel"], vars);
    for (const { selector, body } of rs) {
      if (/\[data-theme="dark"\]/.test(selector)) continue; // dark uses standardized warm-dark tokens
      const cm = body.match(/(?:^|;|\s)color\s*:\s*([^;!]+)/);
      if (!cm) continue;
      const fg = resolveColor(cm[1], vars);
      if (!fg) continue;
      const bgm = body.match(/(?:^|;|\s)background(?:-color)?\s*:\s*([^;!]+)/);
      let bg = bgm ? resolveColor(bgm[1], vars) : null;
      let where = "bg";
      // Non-solid background (gradient / image) — the visible fill isn't resolvable; don't
      // guess against a surface (that produced false positives on gradient buttons).
      if (!bg && /(linear|radial|conic)-gradient|background-image/.test(body)) continue;
      if (!bg) {
        if (/\.cs-dialog|\.cs-ai-disclosure__panel|\.cs-review-gate|\.cs-table/.test(selector)) { bg = panelBg; where = "panel"; }
        else if (/\.cs-button|\.cs-field/.test(selector)) { bg = pageBg; where = "page"; }
      }
      if (!bg) continue;
      const lc = apcaLc(fg, bg);
      // APCA size-aware floor: button labels and dialog titles are large/bold → Lc 60;
      // body/control text → Lc 75 (per APCA conformance levels).
      const floor = /\.cs-button|\.cs-dialog__title/.test(selector) ? 60 : 75;
      if (Math.abs(lc) < floor) soft.push(`S5 low APCA Lc ${lc} (<${floor}) — ${fg} on ${where} ${bg} (${selector.replace(scope, "").trim().slice(0, 36)})`);
    }
  }

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
  "Each pack is checked individually for: balanced CSS, correct `[data-cs-style]` scoping, no brand-anchor override, focus never removed, 44px button floor, real system targeting (hard); plus on-brand reference, reduced-motion and reduced-transparency fallbacks, and **real APCA contrast** (S5 — computed on resolvable solid color/background pairs; Lc ≥ 75 body, ≥ 60 large/bold) (soft).",
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
