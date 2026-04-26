#!/usr/bin/env node
/**
 * @cyberskill/theme-generator — CLI entry point.
 *
 * Usage:
 *   cs-theme-generator --primary "#1d4ed8" --tenant acme --output acme.tokens.json
 *   cs-theme-generator --logo customer.svg --tenant acme --output acme.tokens.json
 *   cs-theme-generator --help
 */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateTheme, srgbToOklch } from './index.mjs';
import { extractPrimary } from './extract.mjs';

const args = process.argv.slice(2);

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') { out.help = true; continue; }
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) { out[key] = next; i++; }
      else out[key] = true;
    } else {
      out._.push(a);
    }
  }
  return out;
}

const HELP = `cs-theme-generator — generate a contrast-validated DTCG theme overlay.

Usage:
  cs-theme-generator --primary "#1d4ed8" --tenant acme --output acme.tokens.json
  cs-theme-generator --logo customer.svg --tenant acme --output acme.tokens.json

Options:
  --primary <hex>     Primary brand colour as #hex or oklch(...)  (one of --primary or --logo required)
  --logo <path>       Path to an SVG logo; primary is extracted by chroma×frequency
  --accent <hex>      Optional secondary brand colour (default: complementary of primary)
  --tenant <slug>     Tenant slug (default: "tenant")
  --output <path>     Output path (default: stdout)
  --strict            Fail (exit 1) on any contrast warning
  --help, -h          Show this help

Output: DTCG 2025.10–conformant tokens.json (tenant overlay).
Hard guarantees:
  - Anchor immutables (Umber + Ochre) are NEVER overridden.
  - WCAG 2.2 AA contrast (4.5:1 text / 3:1 UI) validated; warnings printed.
  - The doctrine's master-index brand anchors are immutable per Part 1 §2.

Doctrine: see RFC 2026-004 in Design System/docs/RFCs/.
`;

const opts = parseArgs(args);

if (opts.help) { process.stdout.write(HELP); process.exit(0); }

let primary = opts.primary;
if (!primary && opts.logo) {
  primary = extractPrimary(resolve(process.cwd(), opts.logo));
  if (!primary) {
    console.error(`[theme-generator] Could not extract primary colour from "${opts.logo}". Provide --primary instead.`);
    process.exit(1);
  }
  console.error(`[theme-generator] Extracted primary: ${primary}`);
}

if (!primary) {
  console.error('[theme-generator] Missing --primary or --logo. Run with --help for usage.');
  process.exit(1);
}

if (!srgbToOklch(primary)) {
  console.error(`[theme-generator] Invalid colour "${primary}". Expected #hex or oklch(...).`);
  process.exit(1);
}

const result = generateTheme({
  primary,
  accent: opts.accent,
  tenant: opts.tenant ?? 'tenant',
});

// Print warnings to stderr
if (result.warnings.length > 0) {
  console.error('[theme-generator] Validation warnings:');
  for (const w of result.warnings) console.error(`  ⚠  ${w}`);
}

if (opts.strict && !result.passed) {
  console.error('[theme-generator] --strict was passed and validation failed. Exiting 1.');
  process.exit(1);
}

const json = JSON.stringify(result.tokens, null, 2);

if (opts.output) {
  writeFileSync(resolve(process.cwd(), opts.output), json + '\n', 'utf8');
  console.error(`[theme-generator] Wrote ${opts.output} (${json.length.toLocaleString()} chars). Validation: ${result.passed ? 'PASS ✓' : 'WARN'}`);
} else {
  process.stdout.write(json + '\n');
}
