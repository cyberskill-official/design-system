#!/usr/bin/env node
/**
 * cleanup-doctrine-refs.mjs — One-shot doctrine reference cleanup
 * ───────────────────────────────────────────────────────────────
 *
 * Removes audit-history attribution boilerplate from the doctrine and
 * converts bare "Part N" references to markdown links so the doctrine
 * body has zero outside dependencies (per docs/00-audit-and-roadmap.md
 * §6 doc-class purity rule).
 *
 * Transforms applied:
 *   1. Strip italic-intro lines that are pure audit-history attribution.
 *      e.g. "*Added per the 2026-04 audit. Operationalised in §X.*"
 *           → "*Operationalised in §X.*"
 *      e.g. "*Added 2026-04-26 to close audit recommendation B7.12.*"
 *           → (line removed)
 *
 *   2. Strip HTML comment markers like:
 *      "<!-- AUDIT 2026-04 EXTENSION — ... -->" → (removed)
 *
 *   3. Strip "Audit closure:" bullets pointing into _audit/{date}/.
 *      e.g. "- Audit closure: `_audit/2026-04-26/audit-report.md`"
 *           → (line removed)
 *
 *   4. Convert bare "Part N" / "Part Na" references to markdown links.
 *      e.g. "Part 5 §3" → "[Part 5 §3](part-5-accessibility-localization.md)"
 *      Skips refs that are already inside markdown links.
 *
 * Run: node scripts/cleanup-doctrine-refs.mjs [--dry-run]
 *
 * Zero dependencies; idempotent.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DOCS = join(ROOT, "docs");
const DRY_RUN = process.argv.includes("--dry-run");

// ─── Map part number → filename slug ───────────────────────────────────
// Built from the actual files under docs/.

function buildPartSlugMap() {
  const map = new Map();
  for (const f of readdirSync(DOCS)) {
    if (!f.endsWith(".md") || !f.startsWith("part-")) continue;
    const m = f.match(/^part-(\d+)([a-h])?-/);
    if (!m) continue;
    const num = parseInt(m[1], 10);
    const sub = m[2] || "";
    const key = num + sub;
    map.set(key, f);
  }
  return map;
}

const PART_SLUG = buildPartSlugMap();

// ─── Transforms ────────────────────────────────────────────────────────

/**
 * Transform 1+2+3: line-level removal/cleanup of audit-history boilerplate.
 */
function stripAuditHistory(src) {
  const lines = src.split("\n");
  const out = [];
  const removed = [];

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];

    // T2: HTML comment audit markers
    if (/^<!--\s*AUDIT\s+\d{4}-\d{2}\b.*-->$/i.test(l.trim())) {
      removed.push({ line: i + 1, kind: "html-audit-marker", content: l });
      continue;
    }

    // T3: "Audit closure: `_audit/...`" bullets and similar
    if (/^[\s\-*]+Audit\s+closure:?\s+`?_audit\//i.test(l) ||
        /^[\s\-*]+Closes?\s+audit\s+recommendations?\s+(`?[A-B]\d+(\.\d+)?`?[^a-z])/i.test(l) ||
        /^[\s\-*]+Audit\s+closure:?\s+`_audit\/\d{4}/i.test(l)) {
      removed.push({ line: i + 1, kind: "audit-closure-bullet", content: l });
      continue;
    }

    // T1: italic-intro lines with audit-history attribution
    const italicMatch = l.match(/^(\s*)\*(.+?)\*\s*$/);
    if (italicMatch) {
      const inner = italicMatch[2];
      // Pure audit-history italic — remove entirely
      const purePatterns = [
        /^Added\s+per\s+the\s+\d{4}-\d{2}\s+audit\.?\s*$/i,
        /^Added\s+\d{4}-\d{2}-\d{2}(\s+to\s+close.*?recommendation\s+[A-B]\d+(\.\d+)?\.?)?\s*$/i,
        /^Added\s+\d{4}-\d{2}-\d{2}\s+per\s+audit\s+§[\d.]+\s+expansion.*$/i,
      ];
      if (purePatterns.some((re) => re.test(inner))) {
        removed.push({ line: i + 1, kind: "audit-history-italic-pure", content: l });
        continue;
      }

      // Italic with audit-attribution prefix + substantive content
      const trimPatterns = [
        /^Added\s+per\s+the\s+\d{4}-\d{2}\s+audit\.\s*/i,
        /^Added\s+\d{4}-\d{2}-\d{2}\s+to\s+close\s+audit\s+recommendations?\s+[A-Z0-9.,\s]+?\s+in\s+a\s+single\s+coherent\s+section\.\s*/i,
        /^Added\s+\d{4}-\d{2}-\d{2}\s+to\s+close\s+audit\s+recommendation\s+[A-B]\d+(\.\d+)?(\s*→\s*\d)?\.?\s*/i,
        /^Added\s+\d{4}-\d{2}-\d{2}\s+per\s+audit\s+§[\d.]+\s+expansion\s*\+?\s*/i,
      ];
      let trimmed = inner;
      for (const re of trimPatterns) {
        if (re.test(trimmed)) {
          trimmed = trimmed.replace(re, "").trim();
          // Capitalise first char if needed
          if (trimmed) trimmed = trimmed[0].toUpperCase() + trimmed.slice(1);
        }
      }
      if (trimmed !== inner) {
        if (!trimmed) {
          removed.push({ line: i + 1, kind: "audit-history-italic-after-trim", content: l });
          continue;
        }
        removed.push({ line: i + 1, kind: "audit-history-italic-trimmed", content: l, replacement: italicMatch[1] + "*" + trimmed + "*" });
        out.push(italicMatch[1] + "*" + trimmed + "*");
        continue;
      }
    }

    out.push(l);
  }

  return { src: out.join("\n"), removed };
}

/**
 * Transform 4: convert bare "Part N" / "Part Na §M" → markdown links.
 *
 * Rules:
 *  - Match "Part N" or "Part Na" word, optionally followed by "§..." or "(...)" or descriptive title.
 *  - Skip if already inside a markdown link (preceded by `[` and followed by `](...)`).
 *  - Skip if inside a fenced code block or inline code.
 *  - Skip self-references (e.g., a sentence in part-5 referencing "Part 5").
 *  - Use the part slug map to construct the link.
 */
function linkifyPartRefs(src, currentFile) {
  const lines = src.split("\n");
  const out = [];
  let inCodeBlock = false;
  let linksAdded = 0;

  for (let i = 0; i < lines.length; i++) {
    let l = lines[i];

    if (/^```/.test(l.trim())) {
      inCodeBlock = !inCodeBlock;
      out.push(l);
      continue;
    }
    if (inCodeBlock) {
      out.push(l);
      continue;
    }
    // skip headers (already handled cross-refs in their own way)
    if (/^#+\s/.test(l)) {
      out.push(l);
      continue;
    }
    // skip table separator lines
    if (/^\s*\|[\s|:-]+\|\s*$/.test(l)) {
      out.push(l);
      continue;
    }

    // Process inline. Mask out existing links and inline code first.
    const masks = [];
    let masked = l
      .replace(/\[[^\]]+\]\([^)]+\)/g, (m) => { masks.push(m); return `${masks.length - 1}`; })
      .replace(/`[^`]+`/g, (m) => { masks.push(m); return `${masks.length - 1}`; });

    // Match: "Part N" or "Part Na" (word boundary), optionally followed by " §X" or " (descriptor)"
    masked = masked.replace(
      /\bPart\s+(\d+)([a-h])?\b/g,
      (full, num, sub) => {
        const key = num + (sub || "");
        const slug = PART_SLUG.get(key);
        if (!slug) return full;
        // Self-reference check: don't link inside its own file
        if (basename(currentFile) === slug) return full;
        linksAdded++;
        return `[${full}](${slug})`;
      }
    );

    // Restore masks
    l = masked.replace(/(\d+)/g, (_, n) => masks[parseInt(n, 10)]);
    out.push(l);
  }

  return { src: out.join("\n"), linksAdded };
}

// ─── Per-file pipeline ─────────────────────────────────────────────────

function processFile(path) {
  const src = readFileSync(path, "utf8");
  const t1 = stripAuditHistory(src);
  const t2 = linkifyPartRefs(t1.src, path);
  const final = t2.src;
  const changed = final !== src;
  return {
    path,
    changed,
    removedCount: t1.removed.length,
    linksAdded: t2.linksAdded,
    final,
  };
}

// ─── Main ──────────────────────────────────────────────────────────────

function main() {
  const files = readdirSync(DOCS)
    .filter((f) => f.endsWith(".md") && (f.startsWith("00-") || f.startsWith("part-")))
    .sort();

  let touched = 0;
  let totalRemoved = 0;
  let totalLinks = 0;

  for (const f of files) {
    const path = join(DOCS, f);
    const r = processFile(path);
    if (r.changed) {
      touched++;
      totalRemoved += r.removedCount;
      totalLinks += r.linksAdded;
      console.log(`  ${f}: -${r.removedCount} audit-history line(s), +${r.linksAdded} link(s)`);
      if (!DRY_RUN) writeFileSync(path, r.final, "utf8");
    }
  }

  console.log(`\n[cleanup-doctrine-refs] ${touched} file(s) touched.`);
  console.log(`  audit-history lines removed: ${totalRemoved}`);
  console.log(`  bare Part refs linkified:    ${totalLinks}`);
  if (DRY_RUN) console.log("  (dry run — no files written)");
}

main();
