# Sunset Post-Mortem — {Component / Pattern / Token Name}

*Per audit §14.17 expansion ("Sunset post-mortem template"). Filed within 30 days of any component / pattern / token reaching its sunset date per Part 17 §3 lifecycle. Archived at `_audit/lifecycle/sunset-postmortems/{YYYY}-{slug}.md`.*

---

| Field | Value |
|---|---|
| Artefact name | (e.g., `<Button.legacy>` or `Card.elevation-deprecated`) |
| Type | Component / Pattern / Template / Theme / Token / Vertical pack |
| Sunset date | YYYY-MM-DD (the day the artefact stopped working in production) |
| Deprecation announced | YYYY-MM-DD (the day the deprecation badge first appeared) |
| Replacement | (link to the replacement artefact, or "none — pattern abandoned") |
| Owner | Chair seat that approved the sunset |
| Filed by | Person + role |

## 1. Why we sunset this

What the artefact was for; why it's no longer fit. Cite the RFC that triggered the deprecation and any audit criterion or external constraint that forced the change (regulatory, accessibility, performance).

## 2. Migration path

How consumers were expected to migrate:

- Codemod offered? (link to `@cyberskill/codemods` rule if applicable)
- Documentation update? (link to the new pattern's spec)
- Tooling support? (Figma library auto-replace; Code Connect remap)

## 3. Adoption of the replacement

| Metric | Before sunset | At sunset |
|---|---|---|
| Production sites still using the deprecated artefact | N | N (target: 0) |
| Replacement coverage % | N | N |
| Codemod success rate | — | N% |

If non-zero usage at sunset, that is a doctrine failure — note it explicitly.

## 4. What went well

- (Honest assessment — what the deprecation pipeline did right)

## 5. What didn't go well

- (Equally honest — where the doctrine's lifecycle process missed)

## 6. Lessons for the next sunset

What we'd do differently. These feed back into Part 17 §3 lifecycle text + `00-audit-and-roadmap.md` §14.17 expansion list.

## 7. Cross-references

- Originating RFC: `docs/RFCs/{YYYY}-{NNN}-{slug}.md`
- Lifecycle stage history: per Part 17 telemetry
- Audit criterion this sunset addresses: §X.Y (or "novel — added to expansion menu")
- Replacement artefact: `{path}`

## 8. Closure

| Field | Value |
|---|---|
| Approved by chair | Name + date |
| Founder informed | Yes / No (required for token-level or vertical-pack sunsets) |
| Codemod retired | YYYY-MM-DD (180 days after sunset, when the deprecation alias is removed) |

---

*Once filed, append a row to `_audit/_history.md` Phase milestones table with `Sunset` as the milestone class. Per Part 17 §3, sunset post-mortems are due within 30 days of the sunset date.*
