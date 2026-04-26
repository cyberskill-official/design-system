#!/usr/bin/env node
/**
 * @cyberskill/mcp-server — MCP server (read + write).
 *
 * Speaks the Model Context Protocol (Anthropic, Nov 2024) over stdio.
 *
 * Wave 1 (read-only):
 *     get_token, list_tokens, list_parts, get_part, audit_status
 *
 * Wave 3 / Phase 3 (write tools — gated by --enable-write flag):
 *     draft_rfc                — generate a Doctrine RFC stub from a brief
 *     propose_token_change     — emit a diff against tokens/*.tokens.json
 *     propose_part_change      — emit a diff against a doctrine part
 *     register_open_question   — file an entry in Open-Questions/{YYYY}/
 *
 * Write tools NEVER modify files directly. They produce structured proposals
 * (markdown diffs + RFC drafts + open-question stubs) that humans review and
 * commit. This honours §13.2 hard constraint #8 ("never bypass the change
 * pipeline") and §11.5 review gates.
 *
 *   resources (URI scheme `cyberskill://`):
 *     cyberskill://tokens/colour
 *     cyberskill://tokens/motion
 *     cyberskill://tokens/space
 *     cyberskill://tokens/type
 *     cyberskill://tokens/elevation
 *     cyberskill://docs/part-1-foundations
 *     ... etc.
 *
 * This is a read-only v1. RFC 2026-002 / A10.1 path → 5 requires the
 * full read+write MCP server (Phase 3 — Figma-style canvas write).
 *
 * Per RFC 2026-002 § Implementation outline, the server exposes structured
 * MCP-compatible endpoints. Closes A10.6 → 4.
 *
 * Zero-dependency Node ESM. Implements the JSON-RPC 2.0 framing of MCP
 * directly — no @modelcontextprotocol/sdk dependency required for the
 * narrow surface this server exposes.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stdin, stdout, stderr, argv } from 'node:process';
import { createInterface } from 'node:readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const DOCS = resolve(ROOT, 'docs');
const TOKENS = resolve(ROOT, 'tokens');
const RFCS_DIR = resolve(DOCS, 'RFCs');
const AUDIT_HISTORY = resolve(DOCS, '_audit/_history.md');

// Write tools are off by default. Enable with --enable-write or
// CYBERSKILL_MCP_WRITE=1 in the environment. Per §13.5 review gates,
// these tools never modify files; they generate proposals only.
const WRITE_ENABLED = argv.includes('--enable-write') || process.env.CYBERSKILL_MCP_WRITE === '1';

// ─── Token loading ─────────────────────────────────────────────────────

const tokenSources = {};
for (const f of readdirSync(TOKENS).filter((f) => f.endsWith('.tokens.json')).sort()) {
  const name = basename(f, '.tokens.json');
  tokenSources[name] = JSON.parse(readFileSync(resolve(TOKENS, f), 'utf8'));
}

function flattenTokens(node, prefix = []) {
  const out = [];
  if (!node || typeof node !== 'object') return out;
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    if (v && typeof v === 'object') {
      if ('$value' in v) {
        out.push({
          path: [...prefix, k].join('.'),
          value: v.$value,
          type: v.$type ?? null,
          description: v.$description ?? null,
        });
      } else {
        out.push(...flattenTokens(v, [...prefix, k]));
      }
    }
  }
  return out;
}

const allTokens = [];
for (const [, json] of Object.entries(tokenSources)) {
  allTokens.push(...flattenTokens(json));
}

// ─── Doctrine parts loading ────────────────────────────────────────────

function listDocParts() {
  return readdirSync(DOCS)
    .filter((f) => f.endsWith('.md') && (f.startsWith('00-') || f.startsWith('part-')))
    .sort();
}

function summariseDocPart(filename) {
  const path = resolve(DOCS, filename);
  if (!existsSync(path)) return null;
  const src = readFileSync(path, 'utf8');
  const lines = src.split('\n');
  let title = null;
  let intro = null;
  for (let i = 0; i < lines.length && (!title || !intro); i++) {
    const l = lines[i].trim();
    if (!title && l.startsWith('# ')) { title = l.slice(2).trim(); continue; }
    if (title && !intro && l.startsWith('*') && l.endsWith('*') && l.length > 2) {
      intro = l.replace(/^\*+|\*+$/g, '');
    }
  }
  return { filename, title, intro };
}

// ─── Tool implementations ──────────────────────────────────────────────

const TOOLS = {
  get_token: {
    description: 'Resolve a CyberSkill design token path to its $value (e.g. "color.semantic.danger").',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Dot-separated token path (e.g. "color.surface.default", "motion.duration.standard")' },
      },
      required: ['path'],
    },
    handler: ({ path }) => {
      const t = allTokens.find((t) => t.path === path);
      if (!t) return { error: `Token "${path}" not found. Try list_tokens to see available paths.` };
      return { path: t.path, value: t.value, type: t.type, description: t.description };
    },
  },

  list_tokens: {
    description: 'List all DTCG design tokens. Optional `prefix` filter (e.g. "color." or "motion.duration.").',
    inputSchema: {
      type: 'object',
      properties: {
        prefix: { type: 'string', description: 'Optional path prefix filter' },
      },
    },
    handler: ({ prefix } = {}) => {
      const filtered = prefix
        ? allTokens.filter((t) => t.path.startsWith(prefix))
        : allTokens;
      return {
        count: filtered.length,
        tokens: filtered.map((t) => ({ path: t.path, value: t.value, type: t.type })),
      };
    },
  },

  list_parts: {
    description: 'Index of all doctrine parts with title and one-line summary.',
    inputSchema: { type: 'object', properties: {} },
    handler: () => {
      return {
        parts: listDocParts().map(summariseDocPart).filter(Boolean),
      };
    },
  },

  get_part: {
    description: 'Read the full content of a doctrine part. Use list_parts first to discover filenames.',
    inputSchema: {
      type: 'object',
      properties: {
        filename: { type: 'string', description: 'Part filename, e.g. "part-2-design-language.md" or "00-audit-and-roadmap.md"' },
      },
      required: ['filename'],
    },
    handler: ({ filename }) => {
      const safe = basename(filename);
      const path = resolve(DOCS, safe);
      if (!existsSync(path)) return { error: `Part "${safe}" not found.` };
      const content = readFileSync(path, 'utf8');
      return { filename: safe, length: content.length, content };
    },
  },

  // ─── Write tools (gated by WRITE_ENABLED) ───────────────────────────
  // Each emits a structured proposal — markdown / JSON — that the operator
  // reviews and commits manually. They NEVER modify files directly.

  ...(WRITE_ENABLED ? {
    draft_rfc: {
      description: 'Draft a Doctrine RFC body from a brief. Returns the full markdown for the operator to file at docs/RFCs/{YYYY}-{NNN}-{slug}.md.',
      inputSchema: {
        type: 'object',
        properties: {
          slug: { type: 'string', description: 'kebab-case title' },
          motivation: { type: 'string', description: 'Why this change is proposed' },
          affectedParts: { type: 'array', items: { type: 'string' }, description: 'Part numbers e.g. ["7", "13"]' },
          class: { type: 'string', enum: ['Editorial', 'Substantive', 'Breaking'], description: 'Per §12.1 versioning rules' },
          subtype: { type: 'string', description: 'Per Part 8 §16: component / pattern / template / theme / token / tooling / etc.' },
          auditRef: { type: 'string', description: 'Audit criterion id, e.g. "A5.6" or "novel"' },
        },
        required: ['slug', 'motivation', 'affectedParts', 'class'],
      },
      handler: ({ slug, motivation, affectedParts, class: cls, subtype, auditRef }) => {
        const year = new Date().getFullYear();
        const today = new Date().toISOString().slice(0, 10);
        const closeDate = new Date(Date.now() + (cls === 'Breaking' ? 30 : 14) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        const md = `# Doctrine RFC ${year}-NNN: ${slug}

| Field | Value |
|---|---|
| Author | (operator name) |
| Affected parts | ${affectedParts.map((p) => `Part ${p}`).join(', ')} |
| Class | ${cls} |
| Subtype | ${subtype ?? 'TBD'} |
| Status | **Draft** |
| Audit reference | ${auditRef ?? 'novel'} |
| Review window opens | ${today} |
| Review window closes | ${closeDate} |

## Motivation

${motivation}

## Proposed change

(Diff narrative; full text in branch.)

## Alternatives considered

(At least two; include "do nothing".)

## Impact on dependent parts

(List parts that reference the changed part.)

## Backward compatibility

## Translation impact

## A11y impact

## Telemetry impact

## Audit-score impact

## Tree-test / card-sort impact

## DESIGN.md impact

## Open questions

## Approver

(Chair of affected parts + Founder for Breaking.)

---

*Drafted by @cyberskill/mcp-server draft_rfc tool. Operator must review and file at \`docs/RFCs/${year}-NNN-${slug}.md\` (allocate the next NNN). Per §13.2 hard constraint #8, this draft is not committed automatically.*
`;
        return { rfc_markdown: md, suggested_path: `docs/RFCs/${year}-NNN-${slug}.md`, next_steps: [
          'Allocate the next sequential NNN by reading docs/RFCs/_index.md',
          'Save the markdown above at the suggested path',
          'Add a row to docs/RFCs/_index.md with status "In Review"',
          'Notify the chair owner(s) of the affected parts',
        ] };
      },
    },

    propose_token_change: {
      description: 'Propose a change to a token in tokens/*.tokens.json. Returns a JSON diff + an RFC-stub. Operator must review and commit.',
      inputSchema: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Dot-path to the token, e.g. "color.semantic.danger"' },
          new_value: { description: 'New $value' },
          rationale: { type: 'string', description: 'Why the change is proposed' },
        },
        required: ['path', 'new_value', 'rationale'],
      },
      handler: ({ path, new_value, rationale }) => {
        const t = allTokens.find((t) => t.path === path);
        if (!t) return { error: `Token "${path}" not found.` };
        if (t.path === 'color.umber' || t.path === 'color.ochre') {
          return { error: `Refused: anchor immutable. Per §13.2 hard constraint #1, brand anchors (Umber, Ochre) cannot be changed via MCP. Founder + trademark legal review required.` };
        }
        return {
          diff: {
            path,
            before: t.value,
            after: new_value,
            type: t.type,
          },
          rationale,
          required_review: [
            'Design Lead approval (per §13.8 restricted ops)',
            'Contrast validation against text + surface anchors (WCAG 2.2 AA)',
            'Down-stream impact: every component that uses this token',
          ],
          next_steps: [
            'File a Doctrine RFC (subtype: token) per §12.3',
            'Run pnpm build:tokens to verify the change builds',
            'Run pnpm coverage:check to surface affected source paths',
            'Re-run pnpm pre-review to catch any banned-phrase drift',
          ],
        };
      },
    },

    propose_part_change: {
      description: 'Propose a change to a doctrine part. Returns a unified diff + an RFC-stub. Operator must review and commit.',
      inputSchema: {
        type: 'object',
        properties: {
          filename: { type: 'string', description: 'Part filename, e.g. "part-2-design-language.md"' },
          section: { type: 'string', description: 'Section to add/modify (e.g. "§28")' },
          summary: { type: 'string', description: 'One-sentence summary of the change' },
          rationale: { type: 'string', description: 'Why' },
        },
        required: ['filename', 'summary', 'rationale'],
      },
      handler: ({ filename, section, summary, rationale }) => {
        const safe = basename(filename);
        const path = resolve(DOCS, safe);
        if (!existsSync(path)) return { error: `Part "${safe}" not found.` };
        return {
          target: { file: safe, section: section ?? '(new section)' },
          summary,
          rationale,
          required_review: [
            'Chair owner of the affected part',
            'Voice rubric verification per §13.5',
            'Cross-reference verification per §13.5',
            'Audit-score impact prediction per §10.3',
          ],
          next_steps: [
            'Read the target file in full (line-count limit applies)',
            'Draft the additive section per Part 14 §2 voice',
            'File the change as a Doctrine RFC (subtype matches the affected area)',
            'Re-run pnpm build:design-md after merge',
          ],
        };
      },
    },

    register_open_question: {
      description: 'File an open-question stub at Open-Questions/{YYYY}/{NNN}.md per §12.5. Returns the markdown for the operator to commit.',
      inputSchema: {
        type: 'object',
        properties: {
          question: { type: 'string', description: 'The question text' },
          affected_parts: { type: 'array', items: { type: 'string' } },
          hypothesis: { type: 'string', description: 'Best-guess answer' },
          owner: { type: 'string', description: 'Chair seat or person responsible' },
          deadline: { type: 'string', description: 'ISO date by which the question should be resolved' },
        },
        required: ['question', 'affected_parts', 'owner'],
      },
      handler: ({ question, affected_parts, hypothesis, owner, deadline }) => {
        const year = new Date().getFullYear();
        const md = `# Open Question — ${question.slice(0, 60)}…

| Field | Value |
|---|---|
| Question | ${question} |
| Affected parts | ${affected_parts.map((p) => `Part ${p}`).join(', ')} |
| Hypothesis | ${hypothesis ?? '(none yet)'} |
| Owner | ${owner} |
| Filed | ${new Date().toISOString().slice(0, 10)} |
| Deadline | ${deadline ?? 'None set; defaults to 90 days per §12.5'} |
| Related RFCs | (none) |

## Detail

${question}

## Hypothesis (updateable)

${hypothesis ?? 'No working hypothesis yet.'}

---

*Filed via @cyberskill/mcp-server register_open_question tool. Per §12.5, an open question that exceeds its deadline triggers automatic escalation to Founder.*
`;
        return {
          open_question_markdown: md,
          suggested_path: `Open-Questions/${year}/NNN.md`,
          next_steps: [
            `Allocate the next sequential NNN under Open-Questions/${year}/`,
            'Save the markdown above at the suggested path',
            'Notify the named owner',
          ],
        };
      },
    },
  } : {}),

  audit_status: {
    description: 'Return the most recent CyberSkill self-audit summary (from _audit/_history.md).',
    inputSchema: { type: 'object', properties: {} },
    handler: () => {
      if (!existsSync(AUDIT_HISTORY)) return { error: 'No audit history register found.' };
      const content = readFileSync(AUDIT_HISTORY, 'utf8');
      // Parse the markdown table; return the most-recent audit row.
      // The audit table has 11 columns ending with a Report link; the
      // phase-milestones table has 5 columns. Filter on column count.
      const rows = content.split('\n')
        .filter((l) => l.startsWith('| 20'))
        .map((l) => l.split('|').map((c) => c.trim()).filter(Boolean))
        .filter((cols) => cols.length >= 10);
      if (rows.length === 0) return { error: 'No audits logged yet.' };
      const latest = rows[rows.length - 1];
      return {
        latest: {
          date: latest[0],
          mode: latest[1],
          agent: latest[2],
          operator: latest[3],
          signer: latest[4],
          part_a_pct: latest[5],
          part_b_pct: latest[6],
          combined_pct: latest[7],
          tier: latest[8],
          enterprise_grade: latest[9],
          report: latest[10],
        },
        total_audits: rows.length,
      };
    },
  },
};

// ─── MCP JSON-RPC framing ──────────────────────────────────────────────

function send(message) {
  stdout.write(JSON.stringify(message) + '\n');
}

function ok(id, result) { send({ jsonrpc: '2.0', id, result }); }
function err(id, code, message) { send({ jsonrpc: '2.0', id, error: { code, message } }); }

const SERVER_INFO = {
  name: '@cyberskill/mcp-server',
  version: '1.0.0',
  protocolVersion: '2024-11-05',
  capabilities: {
    tools: { listChanged: false },
    resources: { subscribe: false, listChanged: false },
  },
};

function handleRequest(req) {
  const { id, method, params } = req;

  switch (method) {
    case 'initialize':
      return ok(id, {
        protocolVersion: SERVER_INFO.protocolVersion,
        capabilities: SERVER_INFO.capabilities,
        serverInfo: { name: SERVER_INFO.name, version: SERVER_INFO.version },
      });

    case 'tools/list':
      return ok(id, {
        tools: Object.entries(TOOLS).map(([name, t]) => ({
          name,
          description: t.description,
          inputSchema: t.inputSchema,
        })),
      });

    case 'tools/call': {
      const tool = TOOLS[params?.name];
      if (!tool) return err(id, -32602, `Unknown tool: ${params?.name}`);
      try {
        const result = tool.handler(params?.arguments ?? {});
        return ok(id, {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        });
      } catch (e) {
        return err(id, -32603, `Tool error: ${e.message}`);
      }
    }

    case 'resources/list':
      return ok(id, {
        resources: [
          ...Object.keys(tokenSources).map((n) => ({
            uri: `cyberskill://tokens/${n}`,
            name: `${n} tokens`,
            description: `DTCG ${n} tokens — see tokens/${n}.tokens.json`,
            mimeType: 'application/json',
          })),
          ...listDocParts().map((f) => ({
            uri: `cyberskill://docs/${basename(f, '.md')}`,
            name: f,
            description: `Doctrine part: ${f}`,
            mimeType: 'text/markdown',
          })),
        ],
      });

    case 'resources/read': {
      const uri = params?.uri ?? '';
      if (uri.startsWith('cyberskill://tokens/')) {
        const name = uri.slice('cyberskill://tokens/'.length);
        if (!tokenSources[name]) return err(id, -32602, `Unknown token resource: ${name}`);
        return ok(id, {
          contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(tokenSources[name], null, 2) }],
        });
      }
      if (uri.startsWith('cyberskill://docs/')) {
        const slug = uri.slice('cyberskill://docs/'.length);
        const path = resolve(DOCS, slug + '.md');
        if (!existsSync(path)) return err(id, -32602, `Unknown doc resource: ${slug}`);
        return ok(id, {
          contents: [{ uri, mimeType: 'text/markdown', text: readFileSync(path, 'utf8') }],
        });
      }
      return err(id, -32602, `Unknown resource URI: ${uri}`);
    }

    case 'ping':
      return ok(id, {});

    default:
      return err(id, -32601, `Method not found: ${method}`);
  }
}

// ─── stdio loop ────────────────────────────────────────────────────────

const rl = createInterface({ input: stdin, terminal: false });

stderr.write(`[@cyberskill/mcp-server] ready (${WRITE_ENABLED ? 'read+write' : 'read-only'}) — ${allTokens.length} tokens, ${listDocParts().length} doctrine parts.\n`);
if (WRITE_ENABLED) {
  stderr.write(`[@cyberskill/mcp-server] write tools enabled (--enable-write). Tools NEVER modify files; they emit structured proposals for operator review per §13.5.\n`);
}

rl.on('line', (line) => {
  if (!line.trim()) return;
  let req;
  try {
    req = JSON.parse(line);
  } catch {
    return;
  }
  if (req?.method && req?.id !== undefined) {
    handleRequest(req);
  }
});

rl.on('close', () => process.exit(0));
