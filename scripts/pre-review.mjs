#!/usr/bin/env node
/**
 * pre-review.mjs — AI-assisted contribution review (RFC 2026-005)
 * ──────────────────────────────────────────────────────────────
 *
 * Runs five categories of lint over changed files (or the whole repo
 * with --all). Posts a single PR-comment-shaped summary to stdout.
 *
 * Categories (per RFC 2026-005):
 *   1. Token-discipline lint
 *   2. Banned-phrase lint
 *   3. A11y-note presence
 *   4. Cross-reference walk
 *   5. AI-disclosure lint (for agent-authored PRs)
 *
 * Severity:
 *   block — fails CI
 *   warn  — comment only
 *   info  — comment only
 *
 * Usage:
 *   pnpm pre-review                 # lint changed files (vs main)
 *   pnpm pre-review --all           # lint the whole repo
 *   pnpm pre-review --json          # emit JSON instead of markdown comment
 *   pnpm pre-review --files a b c   # lint specific files
 *
 * Zero-dependency Node ESM. Per RFC 2026-005 § Implementation outline.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, resolve, relative, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
const opts = {
  all: args.includes('--all'),
  json: args.includes('--json'),
  files: args.includes('--files') ? args.slice(args.indexOf('--files') + 1) : null,
};

// ─── Load lint sources ─────────────────────────────────────────────────

const banned = JSON.parse(readFileSync(resolve(ROOT, 'lints/banned-phrases.json'), 'utf8'));
const antiPatterns = JSON.parse(readFileSync(resolve(ROOT, 'lints/anti-patterns.json'), 'utf8'));

// ─── Pick which files to lint ──────────────────────────────────────────

function getChangedFiles() {
  try {
    const out = execSync('git diff --name-only --diff-filter=ACMR HEAD~1 HEAD 2>/dev/null', {
      cwd: ROOT, encoding: 'utf8',
    });
    return out.split('\n').filter(Boolean).map((f) => resolve(ROOT, f)).filter(existsSync);
  } catch {
    return null;
  }
}

function listAllRepoFiles(dir = ROOT, prefix = '', collected = []) {
  const ignore = new Set(['node_modules', 'dist', '_legacy', '.git', '.storybook-cache']);
  for (const entry of readdirSync(dir)) {
    if (ignore.has(entry) || entry.startsWith('.')) continue;
    const path = resolve(dir, entry);
    let st;
    try { st = statSync(path); } catch { continue; }
    if (st.isDirectory()) listAllRepoFiles(path, prefix + entry + '/', collected);
    else if (st.size < 500_000) collected.push(path);
  }
  return collected;
}

let files;
if (opts.files) {
  files = opts.files.map((f) => resolve(ROOT, f)).filter(existsSync);
} else if (opts.all) {
  files = listAllRepoFiles();
} else {
  files = getChangedFiles() ?? listAllRepoFiles();
}

// Filter to files we care about
const ALLOWED_EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.jsx', '.md', '.mdx', '.css', '.html']);
files = files.filter((f) => ALLOWED_EXT.has(extname(f)));

// ─── Findings collector ───────────────────────────────────────────────

const findings = []; // { rule, severity, file, line, col, message, suggestion? }

function add(severity, ruleId, file, line, message, suggestion) {
  findings.push({ severity, ruleId, file: relative(ROOT, file), line, message, suggestion });
}

// ─── Lint 1: token-discipline ─────────────────────────────────────────

function lintTokens(file, content) {
  const ext = extname(file);
  if (!['.ts', '.tsx', '.js', '.mjs', '.jsx', '.css', '.html'].includes(ext)) return;
  const isCss = ext === '.css';
  const lines = content.split('\n');
  for (const rule of antiPatterns.code) {
    // Skip rules that exclude this file pattern
    const rel = relative(ROOT, file);
    if (rule.exclude_files?.some((g) => globMatch(rel, g))) continue;
    if (isCss && rule.id === 'raw-px-style') continue; // CSS allowed to use px
    const re = new RegExp(rule.pattern, 'g');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*')) continue;
      if (re.test(line)) {
        re.lastIndex = 0;
        add(rule.severity, rule.id, file, i + 1, rule.message);
      }
    }
  }
}

function globMatch(path, glob) {
  // tiny glob: ** → .*, * → [^/]*, escape regex
  const re = new RegExp(
    '^' + glob
      .replace(/[.+^${}()|[\]\\]/g, '\\$&')
      .replace(/\*\*/g, '__DOUBLESTAR__')
      .replace(/\*/g, '[^/]*')
      .replace(/__DOUBLESTAR__/g, '.*') + '$'
  );
  return re.test(path);
}

// ─── Lint 2: banned phrases ───────────────────────────────────────────

function lintBannedPhrases(file, content) {
  const ext = extname(file);
  if (!['.md', '.mdx', '.tsx', '.ts'].includes(ext)) return;
  const lower = content.toLowerCase();
  const lines = content.split('\n');
  for (const entry of banned.block) {
    const phrase = entry.phrase.toLowerCase();
    const idx = lower.indexOf(phrase);
    if (idx >= 0) {
      // Find the line number
      let line = 1;
      for (let i = 0; i < idx; i++) if (content[i] === '\n') line++;
      add(
        'block',
        'banned-phrase',
        file,
        line,
        `Banned phrase "${entry.phrase}" — ${entry.reason}`,
        entry.alternative,
      );
    }
  }
  for (const entry of banned.warn) {
    const phrase = entry.phrase.toLowerCase();
    if (lower.includes(phrase)) {
      let line = 1;
      const idx = lower.indexOf(phrase);
      for (let i = 0; i < idx; i++) if (content[i] === '\n') line++;
      add('warn', 'cliche-phrase', file, line, `Cliché "${entry.phrase}" — ${entry.reason}`);
    }
  }
}

// ─── Lint 3: a11y-note presence ───────────────────────────────────────

function lintA11yNotePresence(file, content) {
  const rel = relative(ROOT, file);
  // Apply to docs/part-3*-component spec files (audit-driven assumption: those are the component pages)
  if (!rel.startsWith('docs/part-3') && !rel.startsWith('docs/part-12')) return;
  if (!rel.endsWith('.md')) return;
  const lower = content.toLowerCase();
  if (!lower.includes('## accessibility') && !lower.includes('### accessibility')) {
    add('warn', 'missing-a11y-section', file, 1,
      'Component spec lacks an "## Accessibility" section. Add one mapping WCAG 2.2 SCs per Part 5 §2.');
  }
  // WCAG SC mention check
  const hasSCMention = /SC\s+[0-9]\.[0-9]\.[0-9]+/.test(content) || /WCAG\s+2\.2/.test(content);
  if (!hasSCMention) {
    add('warn', 'missing-wcag-mapping', file, 1,
      'No WCAG 2.2 SC reference found. Cite specific SCs per Part 5 §2 conformance map.');
  }
}

// ─── Lint 4: cross-reference walk ─────────────────────────────────────

const partFiles = readdirSync(resolve(ROOT, 'docs')).filter((f) => f.endsWith('.md'));

function lintCrossReferences(file, content) {
  const ext = extname(file);
  if (ext !== '.md') return;
  const lines = content.split('\n');

  // Markdown link references
  const linkRe = /\]\(([^)]+\.md)(?:#([^)]+))?\)/g;
  for (let i = 0; i < lines.length; i++) {
    let m;
    while ((m = linkRe.exec(lines[i])) !== null) {
      const target = m[1];
      // Only validate intra-docs references
      if (target.startsWith('http')) continue;
      const targetBase = basename(target);
      if (targetBase.endsWith('.md') && !partFiles.includes(targetBase)) {
        // Check if it might be elsewhere (e.g., RFCs/, _audit/)
        const candidates = [
          resolve(ROOT, 'docs', target),
          resolve(dirname(file), target),
          resolve(ROOT, 'docs', 'RFCs', target),
        ];
        if (!candidates.some(existsSync)) {
          add('block', 'broken-xref', file, i + 1, `Broken cross-reference: ${target}`);
        }
      }
    }
  }
}

// ─── Lint 5: AI-disclosure presence (agent-authored PRs only) ─────────

function lintAiDisclosure(file, content) {
  // Only applies to PR descriptions; not normally found on disk. Skip in v1.
  // Phase 2 Wave 2 wires this via GitHub Actions context.
}

// ─── Run all lints ────────────────────────────────────────────────────

let scanned = 0;
for (const f of files) {
  let content;
  try { content = readFileSync(f, 'utf8'); } catch { continue; }
  scanned++;
  lintTokens(f, content);
  lintBannedPhrases(f, content);
  lintA11yNotePresence(f, content);
  lintCrossReferences(f, content);
  lintAiDisclosure(f, content);
}

// ─── Format output ────────────────────────────────────────────────────

const counts = {
  block: findings.filter((x) => x.severity === 'block').length,
  warn: findings.filter((x) => x.severity === 'warn').length,
  info: findings.filter((x) => x.severity === 'info').length,
};

if (opts.json) {
  process.stdout.write(JSON.stringify({ scanned, counts, findings }, null, 2) + '\n');
} else {
  // Markdown PR comment shape
  const out = [];
  out.push(`## CyberSkill pre-review — ${scanned} files scanned`);
  out.push('');
  out.push(`| Severity | Count |`);
  out.push(`|---|---|`);
  out.push(`| Block | ${counts.block} |`);
  out.push(`| Warn | ${counts.warn} |`);
  out.push(`| Info | ${counts.info} |`);
  out.push('');
  if (findings.length === 0) {
    out.push('✅ No issues found. Nice work.');
  } else {
    const grouped = {};
    for (const f of findings) {
      grouped[f.ruleId] ??= [];
      grouped[f.ruleId].push(f);
    }
    for (const [rule, list] of Object.entries(grouped)) {
      out.push(`### ${rule} (${list[0].severity}) — ${list.length} occurrence${list.length === 1 ? '' : 's'}`);
      for (const f of list.slice(0, 10)) {
        out.push(`- \`${f.file}:${f.line}\` — ${f.message}${f.suggestion ? ` *(suggestion: ${f.suggestion})*` : ''}`);
      }
      if (list.length > 10) out.push(`- … and ${list.length - 10} more`);
      out.push('');
    }
  }
  out.push('---');
  out.push('*Generated by `scripts/pre-review.mjs` per RFC 2026-005. See `Design System/docs/RFCs/2026-005-ai-assisted-contribution-review.md`.*');
  process.stdout.write(out.join('\n') + '\n');
}

// Exit code: 1 if any block, else 0
process.exit(counts.block > 0 ? 1 : 0);
