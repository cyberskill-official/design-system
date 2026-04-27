# Lifecycle Templates

*Per Part 17 (Component Lifecycle & Maturity Model) + audit §14.17 expansion. Templates the lifecycle pipeline reaches for at deprecation / sunset / replacement events.*

| Template | When to use it |
|---|---|
| [`sunset-post-mortem.md`](./sunset-post-mortem.md) | Within 30 days of any artefact reaching sunset per Part 17 §3 |

## Cadence

Per `00-audit-and-roadmap.md` §14:

| Event | Action |
|---|---|
| Deprecation announced | Add badge to artefact docs; start 180-day countdown |
| 30 days from sunset | Email reminder to consumers; codemod published |
| 60 days | Last chance to escape via codemod; re-test |
| 180 days | Sunset. Codemod stays available 90 more days. |
| 30 days post-sunset | File `sunset-post-mortem.md` per the template. |
| 90 days post-sunset | Codemod retired; deprecation alias removed. |
