# Component baselines

12 curated component crops (280×160), one per `_audit/component-visual-diff.html` cell — Button,
Badge, Alert, Toast, Card, DataTable, Accordion, TextField, Avatar, ProgressBar, Switch, Tooltip.
Exemplars across the atomic tiers, not exhaustive (mirrors `_audit/baselines/README.md`'s template
philosophy) — `guidelines/atomic-view.html` is the exhaustive live story set.

**Regenerating a baseline:** open `component-visual-diff.html`, screenshot the page (it renders at
909px wide, 3 cells per row, each cell's `.box` is a fixed 280×160), crop the changed cell's box
region, save over `<slug>.png`. The page's own coverage check (`window.__componentVisualDiff`,
wired into `_audit/run.html` as an advisory row) only verifies every declared baseline file exists
— drift itself is judged by eye, same doctrine as the template-level `visual-diff.html`.
