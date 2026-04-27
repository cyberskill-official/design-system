# Experiment Pre-registration — {slug}

*Per Part 10 §16.5 pre-registered hypothesis framework. File this **before** the experiment runs. After it runs, the result is null by default if the hypothesis was not in this file beforehand.*

---

| Field | Value |
|---|---|
| Slug | (URL-safe; matches the issue / file slug) |
| Filed | YYYY-MM-DD (must precede experiment start) |
| Authors | Researcher + Engineer + PM names |
| Product | which CyberSkill product / vertical pack |
| Experiment platform | Statsig / GrowthBook / LaunchDarkly / other |
| Sample size target | N |
| Power calculation | (link to calc; assumes alpha = 0.05, beta = 0.20) |
| Minimum detectable effect (MDE) | (e.g., 2pp lift on conversion) |

## Hypothesis

We believe that **{change}** will cause **{primary metric}** to move by **{effect size, direction}** for **{audience segment}**.

(One sentence. Specific. Falsifiable.)

## Primary metric

| Field | Value |
|---|---|
| Name | (e.g., Activation rate, week-2 retention, NPS) |
| Definition | (precise — formula or event spec) |
| Source-of-truth telemetry | (event name + property path; or DB query) |
| Baseline | (current value) |
| Target | (post-experiment expectation) |
| MDE | (smallest detectable effect at our power) |

## Guardrail metrics — if any of these degrade, the experiment is null

Per Part 10 §16.5 hard rule 3 — accessibility and performance are always guardrails.

| Guardrail | Threshold |
|---|---|
| Accessibility (WCAG 2.2 AA — axe violations) | No new violations |
| Performance (LCP / INP / CLS p75) | No regression > 5% on each |
| Conversion (whatever the doctrine product cares about) | No regression > 1pp |
| Retention (week-2) | No regression > 2pp |
| {add product-specific guardrail} | {threshold} |

## Audience

| Field | Value |
|---|---|
| Segmentation | (which users see the change) |
| Exclusion criteria | (e.g., admins, employees, users < 7 days old) |
| Treatment / control split | (e.g., 50/50; for risky changes start 5/95 ramp) |
| Targeting key | (user_id / device_id / session_id) |

## Analysis plan

| Field | Value |
|---|---|
| Statistical method | (e.g., two-sided t-test on means, χ² on proportions) |
| Sequential testing controls | (e.g., always-valid p-values per Howard 2021; alpha = 0.05) |
| Stopping rule | (when do we call it? minimum runtime + minimum sample) |
| Multiple comparisons correction | (e.g., Bonferroni if testing multiple primaries) |

## Decision rule

| Result | Action |
|---|---|
| Wins primary, no guardrail breach | Ship; document in changelog. |
| Null on primary, no guardrail breach | Do not ship; document the null result; add to insight repository. |
| Loses primary | Do not ship; investigate; consider follow-up experiment. |
| Wins primary BUT guardrail breach | Do not ship. Per §16.5 guardrail rule. |

## Risks

What might go wrong with this experiment? What are we doing to mitigate?

## Approvals

| Role | Name | Date |
|---|---|---|
| Author (PM) | | |
| Engineer | | |
| Researcher | | |
| Chair owner of affected product | | |

---

## Post-mortem (filed after experiment closes)

| Field | Value |
|---|---|
| Closed | YYYY-MM-DD |
| Actual sample | N |
| Primary metric — before | |
| Primary metric — after | |
| Statistical significance | (p-value or CI) |
| Guardrails — any breach? | |
| Decision | Ship / Don't ship / Iterate |
| Rationale | |

Per Part 10 §16.5 hard rule 4: **null results are filed, not buried.** Even nulls land in the experiment archive.
