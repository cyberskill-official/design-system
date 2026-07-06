# Security Policy

## Reporting a vulnerability

Email **info@cyberskill.world** with subject `SECURITY: design-system`. Include reproduction steps, affected files or packages, and impact. You will receive an acknowledgement within 3 business days and a remediation plan or resolution target within 14.

Please do not open public issues for security reports.

## Scope

This repository ships doctrine (Markdown) plus prototype packages (tokens, React components, style packs, MCP servers). Reports we care about most:

1. Supply-chain issues in the build or verify scripts (`scripts/`, `packages/*/scripts/`).
2. Generated CSS or components that could enable injection when consumed as documented.
3. MCP server prototypes (`packages/mcp-*`) — they are pre-GA and not for production, but responsible reports are still welcome.
4. Leaked credentials or tokens anywhere in history.

## Out of scope

Vulnerabilities in downstream products that consume the design system (report those to the product teams), and findings that require ignoring documented "prototype — not for production" labels.

## Data classification

This repository must contain no personal data. PDPL-relevant patterns (consent receipts, telemetry) exist here as prototypes with synthetic data only.
