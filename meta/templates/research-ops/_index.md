# Research-Ops Templates

*Closes audit recommendation B1.3 (ResearchOps practice → 4) and pairs with Part 10 §16. The 8-pillar mapping in Part 10 §16.4 names what this folder owns; the templates below are the artefacts.*

| Template | When to use it | Pillar (Part 10 §16.4) |
|---|---|---|
| [`interview-template.md`](./interview-template.md) | Every customer interview (continuous discovery, weekly cadence) | 5 — Tools |
| [`consent-form.md`](./consent-form.md) | Required before recording any participant per Part 8 §5 PDPL | 4 — Governance |
| [`sus-survey.md`](./sus-survey.md) | Quarterly System Usability Scale runs per Part 10 §16.7 | 6 — Knowledge |
| [`practitioner-survey.md`](./practitioner-survey.md) | Annual practitioner survey (B1.5 → 4 path) | 6 — Knowledge |
| [`recruiting-playbook.md`](./recruiting-playbook.md) | Recruiting diverse participants; honoraria | 3 — Recruitment |
| [`pre-registration-template.md`](./pre-registration-template.md) | Before any A/B experiment (Part 10 §16.5) | 5 — Tools |

## Cadence (Part 10 §16.7)

| Cadence | Activity | Owner | Template |
|---|---|---|---|
| Weekly | ≥ 1 customer interview, 30–45 min | Research Lead + product PM | interview-template.md |
| Bi-weekly | Synthesis + theme review | Research Lead | (insight repo entry) |
| Monthly | HEART map adjustments | Research Lead + DesignOps | (Part 10 §16.1) |
| Quarterly | SUS run + practitioner survey | Research Lead | sus-survey.md |
| Annually | Full practitioner survey published | Research Lead + Founder | practitioner-survey.md |

## Tooling

The doctrine commits to one of: **Dovetail** (recommended), **Condens**, or **Notion** (with a tagged database). Pick one and commit. Per Part 10 §16.6 the repository requires:

- Full-text + tag faceted search
- Per-Part 8 §5 PDPL access controls
- Append-only insights
- Audit trail on every read

## Hard rules (Part 10 §16.5 / §16.8)

1. **No retrospective hypothesis-shopping.** Pre-register before running.
2. **Decision-logging gate** — any product RFC affecting user-facing UI must cite at least one filed research artefact in its `## Evidence` section.
3. **Insights filed within 48 hours** of the interview.
4. **No fewer than 4 customer interviews per month per active product** (continuous-discovery floor).
