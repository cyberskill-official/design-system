# Annual Practitioner Survey — CyberSkill Design System

*Closes audit recommendation §14.21 ("annual practitioner survey") + B1.5 evidence-based decision logging path. Run once per year per Part 10 §16.7 + the operating cadence in `00-audit-and-roadmap.md` §14.*

---

## Audience

Internal CyberSkill engineers, designers, content designers, PMs who consume the design system. (External customers / clients use a separate NPS instrument — see `npd-survey-template.md` if you ship one.)

## When to run

Q4 each year. Publish results internally by end of Q1 of the following year.

## Length

Target ≤ 12 minutes. Long surveys = low response rate.

## Sections

### 1. Identification (1 question, anonymous)

- Which of these best describes your role? (Designer / Engineer / Content / PM / Other)

### 2. Awareness (3 questions, 5-point Likert: Strongly disagree → Strongly agree)

- I know where to find the doctrine when I need it.
- I know which part(s) cover the topic I'm working on.
- I know how to file a Doctrine RFC when I want to propose a change.

### 3. Adoption (3 questions, 5-point Likert)

- I default to CyberSkill primitives over building custom for my product.
- I default to DTCG tokens over hand-coded values.
- The CyberSkill components fit my product's needs without significant overrides.

### 4. Quality (3 questions, 5-point Likert)

- The doctrine answers my questions when I read it.
- The doctrine's accessibility commitments hold up in practice (WCAG 2.2 AA).
- The doctrine's voice matches the products I work on.

### 5. NPS-style (1 question, 0–10)

- On a scale of 0–10, how likely are you to recommend CyberSkill to a peer at another company?

### 6. Open feedback (3 free-text)

- One thing the doctrine does well —
- One thing the doctrine doesn't yet do well —
- One change you'd ship today if you could —

## Analysis (Part 10 §16.7)

Per quarterly review ritual:
- Compute distribution per Likert question.
- Compute NPS = (% promoters) − (% detractors). Industry top quartile ≥ 50.
- Theme-code free-text per Part 10 §16.6.
- Triangulate with insight repository: which themes recur across interviews + survey?

## Action

Themes scoring < 3.5 mean on a 5-point scale **must** generate at least one Doctrine RFC per Part 10 §16.8 decision-logging gate, or be added to `00-audit-and-roadmap.md` §14 expansion menu with explicit rationale for deferral.

## Bilingual

EN canonical; VN counterpart ships in `practitioner-survey.vi.md` with a native-Vietnamese reviewer per §15 cross-cutting commitment 1.

## Filed by

Results published at `_audit/practitioner-survey-{YYYY}.md` and a row appended to `_audit/_history.md` Phase milestones table.
