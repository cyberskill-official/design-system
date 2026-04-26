# Locales

*Per Part 5 §7 locale pipeline + audit `locale-expansion-plan.md`. The doctrine ships English (canonical) + Vietnamese (first-class) by default. Additional locales are added in cohorts of 4 per `locale-expansion-plan.md` §3.*

## Active locales (built into the doctrine + tooling)

| Code | Name | Status |
|---|---|---|
| `en` | English | ✅ canonical |
| `vi` | Vietnamese | ✅ first-class (per §15 cross-cutting commitment 1) |

## Cohort 1 (in progress — 2026-Q3 / Q4 ship target)

Per `_audit/2026-04-26/locale-expansion-plan.md`. Stub files below await native steward translation.

| Code | Name | Stub | Steward | Status |
|---|---|---|---|---|
| `tl` | Tagalog (Filipino) | [`cohort-1/tl/microcopy.json`](./cohort-1/tl/microcopy.json) | TBD — recruit Q3 | ⏳ stub only |
| `bn` | Bengali | [`cohort-1/bn/microcopy.json`](./cohort-1/bn/microcopy.json) | TBD — recruit Q3 | ⏳ stub only |
| `ur` | Urdu | [`cohort-1/ur/microcopy.json`](./cohort-1/ur/microcopy.json) | TBD — recruit Q3 (RTL specialist) | ⏳ stub only |
| `pa` | Punjabi | [`cohort-1/pa/microcopy.json`](./cohort-1/pa/microcopy.json) | TBD — recruit Q3 | ⏳ stub only |

## Future cohorts

| Cohort | Locales | Target |
|---|---|---|
| 2 | Tamil, Telugu, Marathi, Persian | 2027-Q1 / Q2 |
| 3 | Burmese, Khmer, Lao, Swahili | 2027-Q3 / Q4 |
| 4 | Hausa, Yoruba, Amharic | 2028-Q1 / Q2 |

## Per-locale handoff

Each cohort-1 stub file ships:
- `microcopy.json` — structural template with all keys from the canonical EN catalogue, values left as `"{TODO: native review required}"`.
- `README.md` — locale-specific notes (script direction, plural rules, taboos to avoid).

Native stewards translate values; the doctrine's translation-memory + glossary integration (audit §14.14) caches their work for future releases.

## Hard rules per Part 5 §7

1. **Never silent translation.** Every locale ships with a named steward who countersigns.
2. **Pseudo-localisation in CI** catches expansion-aware layout regressions.
3. **Per-locale plain-language target tier 1** for citizen-facing surfaces.
4. **Lived-experience consultant review** per major release for trauma-informed surfaces.

See `_audit/2026-04-26/locale-expansion-plan.md` for the full plan.
