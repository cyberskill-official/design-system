# System Usability Scale (SUS) — CyberSkill

*Per Part 10 §16.7 quarterly review ritual. The SUS instrument (Brooke 1986/1996) is a 10-question 5-point Likert survey yielding a 0–100 score. Industry mean = 68; ≥ 80 is grade A.*

---

## How to administer

1. Run quarterly per Part 10 §16.7.
2. Target ≥ 20–30 responses per round per active product.
3. Ask the questions in order — do not change wording.
4. Score per the formula in §Scoring below.
5. Trend the score over time in `_audit/sus-trend.md`.

## The 10 questions (Brooke 1986)

For each statement, the participant rates 1–5:
- 1 = Strongly disagree
- 5 = Strongly agree

1. I think that I would like to use this system frequently.
2. I found the system unnecessarily complex.
3. I thought the system was easy to use.
4. I think that I would need the support of a technical person to be able to use this system.
5. I found the various functions in this system were well integrated.
6. I thought there was too much inconsistency in this system.
7. I would imagine that most people would learn to use this system very quickly.
8. I found the system very cumbersome to use.
9. I felt very confident using the system.
10. I needed to learn a lot of things before I could get going with this system.

## Scoring

For each respondent:

```
For odd-numbered questions:    score = (response - 1)
For even-numbered questions:   score = (5 - response)
Total raw score                = sum of all 10 items (0..40)
SUS score                      = total raw × 2.5 (0..100)
```

Per-product SUS = mean of all respondents' scores.

## Interpretation (Sauro & Lewis 2016)

| Range | Grade | Adjective |
|---|---|---|
| ≥ 80.3 | A+ | Best imaginable |
| 78.9 – 80.3 | A | Excellent |
| 72.6 – 78.8 | A− | — |
| 71.0 – 72.5 | B+ | — |
| 67.7 – 71.0 | B | — |
| 65.4 – 67.6 | B− | — |
| 62.7 – 65.3 | C+ | Good |
| 51.7 – 62.6 | C | OK |
| 39.0 – 51.6 | D | Poor |
| < 39 | F | Worst imaginable |

## Bilingual

The SUS items above are the canonical EN form. The Vietnamese counterpart ships as `sus-survey.vi.md` — note that translation invalidates direct comparison to the global SUS norm (68 mean). Per Brooke + Sauro, run a within-locale baseline before trending against an industry comparator.

## Vietnamese-norm caveat

CyberSkill's Vietnamese audience comparison uses a within-locale baseline established in the first quarterly run; we do not assert SUS-68-as-mean for Vietnamese until at least 4 quarters of data exist (per Part 10 §16.5 pre-registration discipline).

## Filed by

After each round, file a summary at `_audit/sus-{YYYY-Q}.md` with: count, mean, median, distribution histogram, top-3 verbatim comments per product, trend vs prior quarter.
