# Annual Audit Runbook

*Per `00-audit-and-roadmap.md` §10.8 + the 2027-01-26 reminder pre-filled in `_audit/_history.md`. This runbook makes the annual audit a checkable procedure rather than improvisation.*

---

## When

Each year, on the anniversary of the prior major release. First: **2027-01-26** (one year after the 2026-04-26 baseline). Thereafter: 2028-01-26, 2029-01-26, etc.

Plus: **on every major release** (X.0.0). Plus: **on regulatory shift** materially affecting privacy / AI / accessibility scope.

## Pre-flight checklist (week before)

- [ ] Confirm Lead Auditor seat (default: DS Lead).
- [ ] Recruit human Co-Auditor (required from 2027 forward; v1.0 baseline waived this).
- [ ] Verify all CI gates green for the past 30 days (no FIXED-criterion regressions).
- [ ] Pull latest `_audit/_history.md`; confirm the prior audit row is signed.
- [ ] Read `00-audit-and-roadmap.md` §10 (audit runbook) end-to-end.
- [ ] Read `roadmap-to-l5.md` to understand the per-category trajectory.

## Day-of execution — 8 steps (parallel where noted)

### Step 1 — Frame (½ day)

```bash
# Mode S (doctrine self-audit)
mkdir -p "Design System/docs/_audit/$(date -u +%Y-%m-%d)"
```

Write the audit charter at `_audit/{YYYY-MM-DD}/charter.md`. State scope, raters, target tier, success criteria.

### Step 2 — Inventory + evidence (1–2 days, parallelisable)

Run all the existing instruments in parallel:

```bash
pnpm build:tokens
pnpm coverage:check
pnpm check:bundle-size
pnpm check:doc-freshness
node scripts/check-apca.mjs

# Fresh mcp-server smoke test
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"audit_status","arguments":{}}}' | \
  node packages/mcp-server/src/server.mjs
```

Capture each output JSON to `_audit/{YYYY-MM-DD}/`:
- `coverage.json` (from check-coverage)
- `bundle-size.json` (from check-bundle-size)
- `doc-freshness.json` (from check-doc-freshness)
- `apca-contrast.json` (from check-apca)

### Step 3 — Score (3–5 days, paired)

Two-rater independent scoring per `00-audit-and-roadmap.md` §10.4. Differences ≥ 2 points trigger calibration.

For Mode S:
1. AI agent (Claude / GPT) reads the framework + the doctrine; emits `audit-worksheet.csv` per §10.5.2.
2. Human Co-Auditor independently spot-checks 5+ random criteria.
3. Disagreements ≥ 2 → calibration discussion logged at `calibration-notes.md`.

### Step 4 — Synthesise (2–3 days)

Compare to the prior year's snapshot. The doctrine commits to:
- **No FIXED-criterion regression** (per `00-audit-and-roadmap.md` §12.4 decision criterion #6).
- A FIXED-criterion regression is itself an alarm that must be remediated before the audit can be signed.

Compute:
- Per-category % per `audit-worksheet.csv`.
- Combined %.
- Maturity tier per §5.4.
- Enterprise-grade thresholds per §5.5 (pass/fail per row).
- YoY delta — append a line to `_audit/_trends.md` (create if first run).

### Step 5 — Recommend (1–2 days)

For every criterion scoring ≤ 2 below its category mean (or ≤ 2 absolute), generate a Recommendation Card per §9.2. Save to `_audit/{YYYY-MM-DD}/recommendations/{criterion-id}.md`.

### Step 6 — Report + sign (½ day)

Author `_audit/{YYYY-MM-DD}/audit-report.md` per §10.5.1 structure. Lead Auditor + Human Co-Auditor countersign the signature block.

### Step 7 — Append history register (15 min)

Add a row to `_audit/_history.md` per §10.7 format. Include: date, mode, agent, operator, signer, scores, tier, enterprise-grade status, link to report.

### Step 8 — Refresh AI rules + DESIGN.md (15 min)

```bash
pnpm build:design-md
pnpm check:design-md
git commit -am "chore(audit): annual audit $(date -u +%Y-%m-%d) signed"
```

## Special considerations for 2027-01-26 (the first annual audit)

The 2026-04-26 baseline waived human Co-Auditor calibration because no human had yet been operationalised on the framework. **That waiver does not apply going forward.** The 2027-01-26 audit must:

1. Pair the AI rater with a human Co-Auditor (not the operator).
2. Compare the FIXED-criterion column to the 2026-04-26 worksheet — any drift > 1 point triggers a calibration discussion.
3. Emit the **first `_trends.md`** with year-over-year deltas.
4. Address the open questions list from `_audit/2026-04-26/audit-report.md` § "Open questions for human review" — by this point those should be resolved or formally deferred.

## Output artefacts (mandatory)

After the audit:

```
Design System/docs/_audit/{YYYY-MM-DD}/
├── charter.md
├── audit-report.md             ← signed; appended to _history.md
├── audit-worksheet.csv
├── audit-worksheet.json
├── coverage.json
├── bundle-size.json
├── doc-freshness.json
├── apca-contrast.json
├── calibration-notes.md        ← only if any rater disagreement ≥ 2
├── recommendations/
│   ├── _index.md
│   ├── {criterion-id}.md       ← one per qualifying criterion
└── (delta-from-prior-year.md   ← first appears 2027-01-26)
```

Plus a single appended row in `_audit/_history.md`.

## Cadence reminder

Per `00-audit-and-roadmap.md` §14 operating cadence:
- **Quarterly** DYNAMIC re-score: 2026-07-26, 2026-10-26, 2027-04-26, 2027-07-26, 2027-10-26.
- **Annual full audit**: 2027-01-26 (this runbook), 2028-01-26, …
- **On regulatory shift**: WCAG 3.0 reaching Recommendation, EU AI Act high-risk obligation date (2 August 2026), EAA next update.

## When to skip the runbook (never)

This runbook is mandatory. The doctrine commits to annual audit per §15 cross-cutting commitment 11 ("Audit rigour"). Skipping is a major-release-class deviation requiring Founder approval + a Doctrine RFC explaining why.

## Cross-references

- `00-audit-and-roadmap.md` §4 — step-by-step playbook (the canonical version)
- `00-audit-and-roadmap.md` §10 — AI-agent audit runbook
- `_audit/_history.md` — register
- `roadmap-to-l5.md` — what we're auditing toward
