// Regenerates tokens/native/{CSTokens.swift,CSTokens.kt,cs_tokens.dart} + tokens/provenance.json
// from tokens/tokens.dtcg.json. Browser-free (Node crypto instead of window.crypto.subtle) — the
// SAME transform algorithm as _audit/token-pipeline-test.html's `expected()` function, so a file
// this script writes is byte-identical to what that gate independently re-derives. Run this
// after any change to tokens/tokens.dtcg.json; CI wires it up in the `regenerate-tokens` job
// (.github/workflows/design-system-gates.yml) via git-auto-commit-action.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const ROOT = new URL('../../', import.meta.url);
const read = (p) => readFile(new URL(p, ROOT), 'utf8');
const write = (p, s) => writeFile(new URL(p, ROOT), s, 'utf8');
const sha256 = (s) => createHash('sha256').update(s, 'utf8').digest('hex');

const camel = (css) => css.replace(/^--cs-/, '').split(/[-_]/).map((p, i) => (i ? p.charAt(0).toUpperCase() + p.slice(1) : p)).join('');
const pascalScope = (key) => key.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');

function parseColor(v) {
  v = String(v).trim();
  let m = /^#([0-9a-f]{6})$/i.exec(v);
  if (m) { const n = parseInt(m[1], 16); return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 }; }
  m = /^#([0-9a-f]{3})$/i.exec(v);
  if (m) { const h = m[1]; return { r: parseInt(h[0] + h[0], 16), g: parseInt(h[1] + h[1], 16), b: parseInt(h[2] + h[2], 16), a: 1 }; }
  m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(v);
  if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
  return null;
}
const hex2 = (n) => n.toString(16).toUpperCase().padStart(2, '0');
const argb = (c) => hex2(Math.round(c.a * 255)) + hex2(c.r) + hex2(c.g) + hex2(c.b);
const px = (v) => { let m = /^(-?[\d.]+)px$/.exec(v); if (m) return +m[1]; m = /^(-?[\d.]+)rem$/.exec(v); if (m) return +m[1] * 16; return null; };
const em = (v) => { const m = /^(-?[\d.]+)em$/.exec(v); return m ? +m[1] : null; };

// Same per-token transform as the gate's `expected()` — keep these two in lockstep by hand if either changes.
// Round-trip contract: a token carrying $extensions["com.cyberskill"].css (structured DTCG value whose
// authoritative emission form is the raw CSS string — shadow composites, var() aliases, percentage
// scalars) ships to natives as that raw string, preserving the legacy String-constant shape.
function expected(name, type, value, cssRaw) {
  if (cssRaw !== undefined) {
    const s = JSON.stringify(String(cssRaw));
    return { swift: `let ${name}: String = ${s}`, kt: `val ${name} = ${s}`, dart: `const String ${name} = ${s};` };
  }
  if (type === 'color') {
    const c = parseColor(String(value)); if (!c) return null;
    const hex6 = ((c.r << 16) | (c.g << 8) | c.b).toString(16).toUpperCase().padStart(6, '0');
    return { swift: `let ${name} = color(0x${hex6}${c.a !== 1 ? ', alpha: ' + c.a : ''})`, kt: `val ${name} = Color(0x${argb(c)})`, dart: `const Color ${name} = Color(0x${argb(c)});` };
  }
  if (type === 'dimension') {
    const n = px(String(value));
    if (n !== null) return { swift: `let ${name}: CGFloat = ${n}`, kt: `val ${name} = ${n}.dp`, dart: `const double ${name} = ${n};` };
    const e = em(String(value));
    if (e !== null) return { swift: `let ${name}Em: Double = ${e}`, kt: `val ${name}Em = ${e}${Number.isInteger(e) ? '' : 'f'}`, dart: `const double ${name}Em = ${e};` };
    return null;
  }
  if (type === 'number') {
    const n = +value; if (isNaN(n)) return null;
    return { swift: `let ${name}: Double = ${n}`, kt: `val ${name} = ${n}${Number.isInteger(n) ? '' : 'f'}`, dart: `const double ${name} = ${n};` };
  }
  if (type === 'duration') {
    const m = /^([\d.]+)ms$/.exec(String(value)); if (!m) return null;
    const n = +m[1];
    return { swift: `let ${name}Ms: Double = ${n}`, kt: `val ${name}Ms = ${n}${Number.isInteger(n) ? '' : 'f'}`, dart: `const double ${name}Ms = ${n};` };
  }
  if (type === 'cubicBezier' && Array.isArray(value)) {
    const a = value.join(', ');
    return { swift: `let ${name}: [Double] = [${a}]`, kt: `val ${name} = doubleArrayOf(${a})`, dart: `const List<double> ${name} = [${a}];` };
  }
  if (type === 'fontFamily' && Array.isArray(value)) {
    const s = JSON.stringify(value.join(', '));
    return { swift: `let ${name}: String = ${s}`, kt: `val ${name} = ${s}`, dart: `const String ${name} = ${s};` };
  }
  const s = JSON.stringify(String(value));
  return { swift: `let ${name}: String = ${s}`, kt: `val ${name} = ${s}`, dart: `const String ${name} = ${s};` };
}

const dtcgText = await read('tokens/tokens.dtcg.json');
const dtcg = JSON.parse(dtcgText);
const ext = dtcg.$extensions['com.cyberskill'];
const VERSION = (await read('VERSION')).trim();

// 1. Base tokens, in DTCG group order.
const base = [];
const byType = {};
for (const [g, entries] of Object.entries(dtcg)) {
  if (g.startsWith('$')) continue;
  for (const [css, def] of Object.entries(entries)) {
    if (css.startsWith('$') || !def || def.$value === undefined) continue;
    const type = def.$type || 'string';
    const cssRaw = def.$extensions && def.$extensions['com.cyberskill'] ? def.$extensions['com.cyberskill'].css : undefined;
    base.push({ css, name: camel(css), value: def.$value, type, cssRaw });
    byType[type] = (byType[type] || 0) + 1;
  }
}

// 2. Dark-theme color overrides. themes.dark also carries a few non-color entries (shadow strings,
// which are umber-tinted but not swapped per-theme as a distinct native constant) — only the ones
// that parse as an actual colour become a `<name>Dark` constant, matching the original pipeline.
const darkOverrides = Object.entries(ext.overrides.themes.dark || {})
  .filter(([, v]) => parseColor(v))
  .map(([css, v]) => ({ css, name: camel(css) + 'Dark', value: v, type: 'color' }));

// 3. Compact-density overrides — none in current system (empty).
const densityCompact = Object.entries((ext.overrides.densities && ext.overrides.densities.compact) || {}).map(([css, v]) => ({ css, name: camel(css) + 'Compact', value: v, type: 'dimension' }));

// 4. Dark elemental accent packs (APCA-derived) — element key e.g. "tho-clay" -> suffix "ThoClayDark".
const elementsDark = [];
for (const [elKey, props] of Object.entries(ext.overrides.elementsDark || {})) {
  const suffix = pascalScope(elKey) + 'Dark';
  for (const [css, v] of Object.entries(props)) elementsDark.push({ css, name: camel(css) + suffix, value: v, type: 'color' });
}

function render(list, lang) {
  const out = [];
  for (const t of list) {
    const e = expected(t.name, t.type, t.value, t.cssRaw);
    if (!e) { console.error('WARN: unconvertible token', t.css, t.type); continue; }
    out.push(e[lang]);
  }
  return out;
}

// Deterministic output: never embed wall-clock time in headers or provenance.
// A clock stamp made every CI run "dirty", which race-failed auto-commits on main.
const sourceSha256 = sha256(dtcgText);
const shaShort = sourceSha256.slice(0, 16) + '…';

const HEADER = (lang) => [
  '// CyberSkill Design System — native design tokens.',
  '// GENERATED from tokens/tokens.dtcg.json — do not hand-edit; regenerate on token change.',
  `// release v${VERSION} · source sha256 ${shaShort}`,
  '// conversions: rem→px at 16 · em→…Em relative doubles · rgba alpha→ARGB byte (round(a*255)) · durations in ms',
  '// dark element packs: see $extensions.overrides.elementsDark',
  '// provenance: tokens/provenance.json · parity gate: _audit/token-pipeline-test.html',
  '',
].join('\n');

function buildSwift() {
  const lines = [HEADER('swift'), 'import SwiftUI', '', 'public enum CSTokens {',
    '  /// 0xRRGGBB (+ alpha param) → SwiftUI Color',
    '  public static func color(_ hex: UInt32, alpha: Double = 1) -> Color {',
    '    Color(red: Double((hex >> 16) & 0xFF)/255, green: Double((hex >> 8) & 0xFF)/255, blue: Double(hex & 0xFF)/255, opacity: alpha)',
    '  }', ''];
  for (const l of render(base, 'swift')) lines.push('  public static ' + l);
  lines.push('', '  // MARK: dark-theme color overrides');
  for (const l of render(darkOverrides, 'swift')) lines.push('  public static ' + l);
  if (densityCompact.length) {
    lines.push('', '  // MARK: compact-density control metrics');
    for (const l of render(densityCompact, 'swift')) lines.push('  public static ' + l);
  }
  lines.push('', '  // MARK: dark elemental accent packs (APCA-derived, v4.0.0)');
  for (const l of render(elementsDark, 'swift')) lines.push('  public static ' + l);
  lines.push('}', '');
  return lines.join('\n');
}
function buildKt() {
  const lines = [HEADER('kt'), 'package world.cyberskill.tokens', '', 'import androidx.compose.ui.graphics.Color', 'import androidx.compose.ui.unit.dp', '', 'object CSTokens {'];
  for (const l of render(base, 'kt')) lines.push('  ' + l);
  lines.push('', '  // dark-theme color overrides');
  for (const l of render(darkOverrides, 'kt')) lines.push('  ' + l);
  if (densityCompact.length) {
    lines.push('', '  // compact-density control metrics');
    for (const l of render(densityCompact, 'kt')) lines.push('  ' + l);
  }
  lines.push('', '  // dark elemental accent packs (APCA-derived, v4.0.0)');
  for (const l of render(elementsDark, 'kt')) lines.push('  ' + l);
  lines.push('}', '');
  return lines.join('\n');
}
function buildDart() {
  const lines = [HEADER('dart'), "import 'package:flutter/material.dart';", '', 'class CSTokens {', '  CSTokens._();'];
  for (const l of render(base, 'dart')) lines.push('  static const ' + l.replace(/^const /, ''));
  lines.push('', '  // dark-theme color overrides');
  for (const l of render(darkOverrides, 'dart')) lines.push('  static const ' + l.replace(/^const /, ''));
  if (densityCompact.length) {
    lines.push('', '  // compact-density control metrics');
    for (const l of render(densityCompact, 'dart')) lines.push('  static const ' + l.replace(/^const /, ''));
  }
  lines.push('', '  // dark elemental accent packs (APCA-derived, v4.0.0)');
  for (const l of render(elementsDark, 'dart')) lines.push('  static const ' + l.replace(/^const /, ''));
  lines.push('}', '');
  return lines.join('\n');
}

const swift = buildSwift(), kt = buildKt(), dart = buildDart();
await write('tokens/native/CSTokens.swift', swift);
await write('tokens/native/CSTokens.kt', kt);
await write('tokens/native/cs_tokens.dart', dart);

const provenance = {
  system: ext.system,
  release: VERSION,
  source: 'tokens/tokens.dtcg.json',
  sourceSha256,
  dtcgStamp: { version: ext.version, generated: ext.generated },
  conversions: { remBasePx: 16, emSuffix: 'Em (relative)', alphaToArgbByte: 'round(a*255)', durationsUnit: 'ms', densitySuffix: 'Compact (fine-pointer only)', darkPackSuffix: '<Scope>Dark (APCA-derived)' },
  counts: { baseTokens: base.length, byType, darkColorOverrides: darkOverrides.length, densityCompactOverrides: densityCompact.length, darkPackConstants: elementsDark.length, skipped: 0 },
  skipped: [],
  targets: [
    { file: 'tokens/native/CSTokens.swift', lang: 'swift', sha256: sha256(swift) },
    { file: 'tokens/native/CSTokens.kt', lang: 'kotlin', sha256: sha256(kt) },
    { file: 'tokens/native/cs_tokens.dart', lang: 'dart', sha256: sha256(dart) },
  ],
};
await write('tokens/provenance.json', JSON.stringify(provenance, null, 2) + '\n');

console.log(`Regenerated tokens/native/* — ${base.length} base + ${darkOverrides.length} dark + ${densityCompact.length} compact + ${elementsDark.length} dark-pack tokens.`);
