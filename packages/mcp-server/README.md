# @cyberskill/mcp-server

Read-only Model Context Protocol (MCP) server exposing CyberSkill design tokens, doctrine parts, and audit status to AI agents (Claude, Cursor, custom MCP clients).

## What it exposes

### Tools

| Tool | Purpose |
|---|---|
| `get_token` | Resolve a token path → `$value` |
| `list_tokens` | List all DTCG tokens; optional prefix filter |
| `list_parts` | Index of all 20+ doctrine parts |
| `get_part` | Read a full doctrine part |
| `audit_status` | Latest self-audit summary scores |

### Resources (URI scheme `cyberskill://`)

- `cyberskill://tokens/{colour|motion|space|type|elevation}` → DTCG JSON
- `cyberskill://docs/{part-slug}` → markdown content

## Usage

### Cursor / Claude Code config

```jsonc
// .mcp.json or settings.json
{
  "mcpServers": {
    "cyberskill": {
      "command": "node",
      "args": ["./packages/mcp-server/src/server.mjs"]
    }
  }
}
```

### Direct stdio test

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize"}' | node packages/mcp-server/src/server.mjs
echo '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' | node packages/mcp-server/src/server.mjs
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_token","arguments":{"path":"color.semantic.danger"}}}' | node packages/mcp-server/src/server.mjs
```

## Read-only by design

This is **Wave 1**. The server cannot write — it cannot modify tokens, parts, or audit records. Per RFC 2026-002 / A10.1 audit path, the **full read+write** server (Figma-style canvas-write) is **Phase 3 work**. Read-only is sufficient to close A10.6 → 4 and unblock most agent workflows that don't need to author the doctrine.

## Doctrine references

- `Design System/docs/00-audit-and-roadmap.md` §6 A.10.1 / §6 A.10.6 — the audit criteria this closes
- RFC 2026-002 — `Design System/docs/RFCs/2026-002-cdn-distribution-architecture.md`
- Anthropic — *Model Context Protocol* (Nov 2024)
