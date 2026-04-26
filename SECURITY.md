# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in the CyberSkill Design System — whether in a published package, the doctrine, the CDN bundle, or the MCP server — **please do not open a public issue**.

Email **zintaen@gmail.com** with:

1. A description of the vulnerability.
2. Steps to reproduce.
3. Affected versions / packages.
4. Your assessment of impact and exploitability.
5. (Optional) Suggested mitigation or fix.

We will acknowledge receipt within 72 hours and aim to provide an initial assessment within 7 days.

## Disclosure timeline

We follow coordinated disclosure with a 90-day default window:

| Day | Event |
|---|---|
| 0 | Reporter notifies us. |
| 0–7 | We acknowledge + triage. |
| 7–30 | We investigate and (if confirmed) develop a fix. |
| 30–90 | We test the fix; coordinate with affected consumers. |
| 90 | Public disclosure (CVE if applicable; advisory in the GitHub repo + the doctrine's audit history register). |

We will negotiate a different timeline if exploitation is active or the fix has unusual complexity.

## Scope

In scope:
- All `@cyberskill/*` npm packages.
- The CDN bundle at `cdn.cyberskill.dev` (when live).
- The `cs-mcp-server` MCP server (read-only and read+write modes).
- The doctrine's `00-audit-and-roadmap.md` §13 review gates (e.g., bypasses of the change pipeline).
- The doctrine's lint rules at `lints/banned-phrases.json` and `lints/anti-patterns.json`.

Out of scope:
- Vulnerabilities in third-party dependencies (please report to the upstream maintainer).
- Issues in the wiki SPA showcase (this is a demo, not a production product).
- Theoretical attacks without a working PoC.

## Hardening commitments

Per `00-audit-and-roadmap.md` §15 cross-cutting commitments and Part 7 § Security:

1. **DTCG token files are integrity-checked** at build time.
2. **CDN distribution uses SHA-384 SRI hashes** published in `dist-cdn/.integrity.json`.
3. **The MCP server defaults to read-only**; write tools are gated by `--enable-write` and never modify files directly (they emit proposals only).
4. **The doctrine's anchor immutables** (Umber + Ochre + slogan + fonts) cannot be changed via MCP — the server refuses and logs the attempt.
5. **CI pre-review** (`scripts/pre-review.mjs`) blocks broken cross-references and banned-phrase violations on every PR.

## Acknowledgements

We will publicly thank reporters who follow coordinated disclosure (in the security advisory and in the next audit history register entry) — unless they prefer to remain anonymous.

## Cryptography

The doctrine and the npm packages do not include cryptographic primitives. The CDN bundle uses Node's standard `crypto` for SHA-256 / SHA-384 SRI hash computation only.
