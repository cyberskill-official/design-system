# The CyberSkill Global Design System

## Part 1 — Foundations

*A comprehensive doctrine for the brand, principles, voice, values, decision framework, sub-brands, and cultural adaptations of the CyberSkill Global Design System. This Part is the philosophical and operational charter that all subsequent Parts inherit. Read it once, refer to it forever.*

---

## 1. Origin Story

### 1.1 The gap that gave the brand its reason

CyberSkill exists to close a specific distance. The distance is the one between **what a person decides to do** and **what software lets them actually accomplish**. Every digital product has this distance. Most products treat it as a fact of nature; a few treat it as a fault of design; CyberSkill treats it as the central engineering problem of the discipline. The company's founding slogan — **"Turn Your Will Into Real"** in English and **"Hiện Thực Hoá Ý Chí"** in Vietnamese — is not a marketing flourish or a wall poster. It is an engineering contract. It states that the job of every product CyberSkill ships is to carry human will across that gap, honestly and without drag, until the user's intention and the system's outcome coincide.

The contract has consequences. It changes how forms are designed (the form does not impose its preferences on the user; it serves the user's), how errors are written (errors name the failure and offer the next step, instead of blaming the user), how AI is disclosed (every generated output reveals its uncertainty before the user has to ask), how privacy is handled (consent is never bundled, never pre-checked, never ambiguous), and how performance is measured (we measure how long it takes from a user's intention to its accomplishment, not how long the page took to render). Every line of every Part of this design system is a derivative of the same single commitment.

### 1.2 The word "will" — and why it matters

Of all the synonyms available, the brand chose **will** rather than *wish*, *hope*, or *dream*. This was a deliberate choice. *Wish* is passive and removes agency; *hope* is uncertain and removes confidence; *dream* is aspirational and removes specificity. *Will* is the deliberate, chosen form of motivation. It is the form that addresses CyberSkill's actual users — builders, operators, clinicians, teachers, students, administrators, owners, civil servants — people who have already decided to do something specific and who need tools that respect that decision.

In Vietnamese, the chosen rendering uses the noun *ý chí*, which carries a stronger moral register than its English counterpart. *Ý chí* is the quality attributed to a farmer persevering through floods, a student revising for the national exam, a founder writing payroll at three o'clock in the morning. It is an ethical noun, not merely a psychological one. It carries the connotation of *choosing to do hard things well, and to do them again tomorrow*. Pairing *ý chí* with *hiện thực hoá* — literally *to make real* — binds the moral commitment to a verb of action. The phrase *Hiện Thực Hoá Ý Chí* is the exact form the brand uses, and **the only form the brand uses**. Alternative Vietnamese renderings such as *Biến ý chí thành hiện thực* are not permitted, because they shift the register from the formal-warm (*trang trọng-thân thiện*) into the colloquial-transactional, and quietly change the meaning from a moral commitment into a marketing promise. This is an immutable rule.

### 1.3 The translation of will into product

Will becomes product through a discipline of small decisions. The discipline appears in small moments, large moments, and infrastructural moments.

**Small moments:**

- An empty state that tells the user **why** the region is empty rather than **that** it is empty (*"Add your first record to get started"* rather than *"No data"*).
- A form that **remembers what the user typed** when the network blinked, when the tab closed unexpectedly, when the laptop went to sleep — not because remembering is convenient, but because failing to remember is rude.
- An error message that **names the failure and offers the next step**: *"We can't reach the server. Your draft is safe; we'll retry in 15 s."* — instead of *"Save failed."*
- A loading indicator that **measures real progress** when progress is knowable, and announces *"this may take a moment"* when it is not. Decoration that pretends to be measurement is a small lie.
- A confirmation that **names the consequence** before requesting it: *"This will discard 2 unsaved edits. Discard?"* rather than *"Are you sure?"*

**Large moments:**

- A migration that preserves **six years of operator muscle memory** rather than forcing relearning, because operators in production environments cannot afford a learning tax.
- An AI surface that **discloses its uncertainty** before the user has to ask, with three confidence tiers (Low <60%, Medium 60–85%, High >85%) and a default behaviour of withholding low-confidence outputs unless the user explicitly opts to see them.
- A privacy consent screen that **refuses to be defaulted on**, refuses to bundle purposes, and refuses to dim the "decline" button — even if the conversion math would prefer otherwise.
- A version upgrade that **announces its breaking changes early**, ships a codemod alongside the change, and gives the user at least two minor versions of warning before removal.

**Infrastructural moments:**

- A token system published in **W3C Design Tokens Community Group format 2025.10**, the first stable version, published 28 October 2025 (W3C DTCG, w3.org/community/design-tokens/2025/10/28/). This is a contract with future maintainers and with autonomous agents that consume the system.
- An API error envelope authored to **RFC 9457 Problem Details for HTTP APIs**, published July 2023 by the IETF, with media type `application/problem+json`, obsoleting RFC 7807 (rfc-editor.org/rfc/rfc9457). This is a contract with developers integrating the system.
- An accessibility baseline aligned to **WCAG 2.2 level AA**, the W3C Recommendation published 5 October 2023 (w3.org/TR/WCAG22/), with all 87 success criteria mapped to specific components in [Part 5](part-5-accessibility-localization.md). This is a contract with disabled users, regulators, and the law.

A good design system is not a style guide. It is a set of commitments to the human on the other side of the glass.

### 1.4 Vietnam first, then the world

CyberSkill operates from Vietnam and builds for the world. **That order matters.** Many Vietnamese technology companies — even capable ones — still treat Vietnamese as a translation target, an afterthought layer poured onto an English-first product after the design has been frozen. The result is a class of typography bugs that no English-language reviewer ever sees: stacked diacritics clipping at the top of the line because the line-height was tuned for Latin characters; Vietnamese all-caps labels that smear because the tracking was inherited from English; vowel + tone-mark combinations such as *ắ*, *ễ*, *ự* that pass spell-check and fail visual comprehension.

CyberSkill treats Vietnamese as a **first-class source language and first-class test language**. Every component, every pattern, every error string ships in Vietnamese and English **simultaneously**. Vietnamese is approved before English is approved; the English string is not allowed to ship before its Vietnamese counterpart has been validated. Every text component is tested against the canonical stacked-diacritic canary string `ỚẾỰỎÃỸ` before any Latin specimen is accepted. The system standardises a minimum body line-height of **1.5** and a minimum heading line-height of **1.35** specifically to prevent diacritic clipping; this is not a preference but a correctness requirement. Vietnamese first-class is not a feature. It is a property — the same way correctness, security, and accessibility are properties.

This commitment goes further than typography. Vietnamese cultural conventions — the family-middle-given name order, the *bạn* second-person register in product UI, the lunar calendar for cultural dates, the small-to-large address format, the unique status of CCCD photos as sensitive personal data — are treated as native, not as exceptions to a Western default. When the locale-specific behaviour conflicts with a global standard, the global standard wins only when accessibility, security, or law require it. Otherwise, Vietnamese behaviour is the default for Vietnamese users, and the same respect is extended to every other locale.

### 1.5 Timing — why now

The brand exists at this moment because the regulatory landscape made the moment unavoidable.

The **Vietnamese Law on Personal Data Protection (Law No. 91/2025/QH15)**, often called the PDPL, was passed by the National Assembly on **26 June 2025** and takes effect on **1 January 2026** (LuatVietnam, luatvietnam.vn). Its implementing rules, **Decree 356/2025/ND-CP**, were issued on **31 December 2025** and also took effect on **1 January 2026**, replacing Decree 13/2023/ND-CP entirely (Tilleke & Gibbins). The PDPL is **extraterritorial** — it applies, in its own language, to "Foreign agencies, organizations and individuals directly involved in or related to the processing of personal data of Vietnamese citizens" (LuatVietnam). It is **consent-first**, granular, and explicit about prohibiting default consent or ambiguous instructions: Decree 356/2025/ND-CP states that "Prohibiting default consent or ambiguous instructions that confuse data subjects" (Tilleke). Penalties reach **VND 3 billion** for general violations and **5 % of prior-year annual revenue** for cross-border-transfer breaches (VNETWORK; Tilleke).

The **Law on Cybersecurity (Law No. 116/2025/QH15)** was passed on **10 December 2025** and takes effect on **1 July 2026** (Tilleke; Mori Hamada & Matsumoto). Together with the PDPL, it reshapes what a Vietnamese-built or Vietnamese-deployed digital product is permitted to do.

The **Resolution 57-NQ/TW**, signed on **22 December 2024 by General Secretary Tô Lâm**, sets the political directive for digital transformation in Vietnam (Vietnam Law Magazine). It is the policy umbrella under which the PDPL and the Cybersecurity law operate.

A design system that quietly assumes pre-checked consent boxes, toggle-on defaults, or bundled privacy permissions is not legal in Vietnam from January 2026 onwards. CyberSkill treats this not as a regulatory burden to mitigate but as a specification to comply with by design — the patterns are baked in at the foundation rather than retrofitted as patches.

The global picture has the same shape. The **EU AI Act** entered into force on **1 August 2024**, with prohibited-practice and AI-literacy provisions applicable from **2 February 2025**, GPAI obligations from **2 August 2025**, high-risk obligations from **2 August 2026**, and full applicability on **2 August 2027** (European Commission). Penalties tier at **€35 million or 7 %** of global annual turnover for prohibited practices, **€15 million or 3 %** for most other obligations, and **€7.5 million or 1 %** for misleading information (DLA Piper).

The **European Accessibility Act (Directive (EU) 2019/882)** began enforcement on **28 June 2025** (European Commission; Davis Wright Tremaine). National penalties reach **€100,000 per violation** in Germany and Italy and up to **€75,000 or 4 %** of revenue in France (AllAccessible). **EN 301 549** provides presumption of conformity under the EAA (AllAccessible).

For a design system aiming at global enterprise relevance, none of these dates are optional. A system built today without the PDPL, the EU AI Act, the EAA, and WCAG 2.2 baked into its foundations will not meet regulated thresholds in 2026 and 2027 — and the majority of global enterprise procurements route through one or more of those frameworks.

### 1.6 Warmth and rigour are not opposites

A long tradition in enterprise software equates *seriousness* with *coldness*: monochrome palettes, geometric sans-serifs, impersonal error strings, form labels in all-caps. The legacy assumption is that warmth is unprofessional. CyberSkill rejects this. The brand's two warm earth anchors — **Umber** (`#45210E` / `oklch(0.265 0.073 44.3)`) and **Ochre** (`#F4BA17` / `oklch(0.811 0.162 83.7)`) — are chosen to reference the land and light of Vietnam: the russet soils after monsoon rain, the turmeric and saffron of *phở* broth, the terracotta of village roofs, the *bột nghệ* (turmeric powder) used in cooking and traditional medicine. They are used as the system's spine, not as decorative accents, because the brand's claim of *warm and approachable tech* is only credible if the foundation carries the warmth.

The typography choices are equally non-negotiable. **Be Vietnam Pro**, designed by **Lâm Bảo, Tony Le, and ViệtAnh Nguyễn** under the SIL Open Font License 1.1, is the single primary typeface across product and marketing surfaces. It carries 18 styles (9 weights × upright + italic), full Vietnamese diacritic support, and a Neo-Grotesque proportion calibrated for both Latin and Vietnamese rendering. **JetBrains Mono**, designed by **Philipp Nurullin** with project lead Konstantin Bulenkov at JetBrains under SIL OFL 1.1, is the single monospace face. It ships **138 code-specific ligatures**, supports **145 languages**, uses a **9° italic angle**, and is the only monospace face used in CyberSkill products. These are not defaults inherited from a starter template; they are choices defended by typographical and accessibility analysis.

The brand's voice — warm, direct, honest, respectful of user effort — is the linguistic correlate of the visual system. Warm earth anchors and a warm voice sit together. Cool typography and a warm voice would be incoherent; cool typography and a cool voice is the industry default the brand was created to differ from.

### 1.7 The document this Part introduces

The CyberSkill Global Design System is the written form of all of the above: foundations (Part 1), design language ([Part 2](part-2-design-language.md)), components (Part 3, split into eight sub-Parts), surfaces and patterns ([Part 4](part-4-surfaces.md)), accessibility, inclusion, and localisation ([Part 5](part-5-accessibility-localization.md)), AI-native ethics and sustainability ([Part 6](part-6-ai-ethics-sustainability.md)), engineering and operations ([Part 7](part-7-engineering-operations.md)), governance, legal, and commerce ([Part 8](part-8-governance-legal-commerce.md)), the AI prompt library and agentic workflows ([Part 9](part-9-ai-prompt-library.md)), and measurement, research, and the appendix ([Part 10](part-10-measurement-research-appendix.md)). The document does not have a version number in its title, ever. Versions appear in package metadata and changelogs; they do not appear in the document title, on slide masters, or on the landing page hero. This rule is immutable.

Everything in the system serves the same single commitment. The user has will. The product carries it. The design system is how the product keeps its word.

---

## 2. Brand Architecture

### 2.1 The architecture model

CyberSkill uses a **master-brand with endorsed sub-brands** architecture. The master brand — *CyberSkill* — is the identity that customers, partners, regulators, and employees recognise and trust. The sub-brands are functional domains that inherit the master's foundations (the colour anchors, typography, voice, accessibility baseline, privacy and AI defaults, and the decision framework) and override only the **single permitted attribute**: a sub-brand accent colour. Product brands sit a tier below sub-brands, inheriting the sub-brand's accent and the master's contract. Partnership co-locks are a separate, regulated case described in §12.

This model was chosen deliberately over the alternatives. A pure **monolithic** brand (one mark for everything) would not communicate the functional clarity of the sub-brand domains; an **endorsed-house** model (each product its own brand, master endorsed in fine print) would dilute the master's promise and force every product to reinvent the foundations; a **freestanding** brand house (every product a separate brand with no master endorsement) would be unaffordable for a Vietnamese-origin company with global ambitions and would create twenty surface areas of inconsistency. The master-brand-with-endorsed-sub-brands choice gets the recognition of monolithic with the functional clarity of endorsed-house, at the cost of strict discipline about what a sub-brand may and may not change.

### 2.2 The six immutable elements of the master brand

The master brand carries six elements that are **never modified** by any sub-brand, product, partner, region, or surface:

1. **The wordmark *CyberSkill*** set in Be Vietnam Pro SemiBold (weight 600), never condensed, never stretched, never re-weighted, and never rendered in a non-Be-Vietnam-Pro typeface. The wordmark is **always set in sentence case as a single word**: *CyberSkill*. It is not *Cyber Skill*, *CYBERSKILL*, *cyberskill*, or *CYBER SKILL*.
2. **The Umber primary anchor** at `oklch(0.265 0.073 44.3)` (hex `#45210E`).
3. **The Ochre primary anchor** at `oklch(0.811 0.162 83.7)` (hex `#F4BA17`).
4. **The English slogan** *Turn Your Will Into Real*, used in title case with internal capitals as shown.
5. **The Vietnamese slogan** *Hiện Thực Hoá Ý Chí*, used with the diacritics shown and with the title-case capitalisation shown.
6. **The accessibility, privacy, and AI-transparency defaults** codified in Parts 5, 6, and 8 of this system.

A surface that violates any of these six is off-brand and must not ship.

### 2.3 The dark-background rule

On dark backgrounds, the wordmark, the Umber anchor used as text or as a primary text fill, and any surface that would otherwise rely on Umber for its contrast against a dark field, are replaced by a **light warm-neutral** at `oklch(0.96 0.03 83.7)`. This produces approximately 17:1 contrast against the dark surfaces in the Material 3-aligned tonal-elevation scale ([Part 2](part-2-design-language.md) §6) and is preferred over pure white because pure white on dark is harsh and disregards the warm earth identity. The dark-background rule applies to every surface — print, video end-cards, app splash screens, avatars, partner co-locks, product loading screens, and any animation that crosses between light and dark stages. **No exception is permitted** even for "we'll fix it next sprint" cases.

### 2.4 The five endorsed sub-brands

| Sub-brand | English label | Vietnamese label | Domain | Permitted accent (OKLCH) | Hex equivalent | Example products |
|---|---|---|---|---|---|---|
| Learn | CyberSkill Learn | CyberSkill Học | Education, training, certification, curriculum | `oklch(0.66 0.15 165)` | ~`#1F8E7C` | LMS, skills labs, assessments, language tutoring |
| Work | CyberSkill Work | CyberSkill Làm | Productivity, collaboration, operations | `oklch(0.6 0.17 255)` | ~`#3265D6` | Case management, project ops, workflow, knowledge base |
| Secure | CyberSkill Secure | CyberSkill An Ninh | Cybersecurity, identity, compliance | `oklch(0.52 0.18 25)` | ~`#A52E2E` | Auth, IAM, SOC consoles, DPIA tooling, audit |
| AI | CyberSkill AI | CyberSkill AI | AI surfaces, agents, prompt tooling | `oklch(0.7 0.16 305)` | ~`#9266C9` | Agents, prompt studio, evaluation harness, redaction |
| Labs | CyberSkill Labs | CyberSkill Phòng Thí Nghiệm | Research, early access, open source | `oklch(0.78 0.16 115)` | ~`#A5C84B` | Experiments, prototypes, RFCs, open-source toolkits |

The accent is the **only** override permitted. Every sub-brand accent has been chosen to satisfy three constraints simultaneously: a minimum **3:1** contrast against the Umber anchor (WCAG 2.2 SC 1.4.11 Non-text Contrast), a minimum **4.5:1** contrast against light warm-neutral surfaces (SC 1.4.3), and a perceptual lightness L value within `0.52`–`0.78` so that the accents remain visually consistent in weight to one another. Chroma is bound between `0.12` and `0.20` to avoid neon saturation that would feel out of place beside the warm-neutral spine.

### 2.5 The accent's permitted scope

A sub-brand may use its accent in:

- **Sub-brand landing pages** (the public marketing page for the sub-brand).
- **Sub-brand documentation sections** (the docs index for the sub-brand domain).
- **Sub-brand top-navigation tints** (the accent bar in the header for surfaces that belong solely to the sub-brand).
- **Sub-brand iconography hue** for domain-specific icons that are not part of the global icon set.
- **Sub-brand internal-tool branding** for back-office surfaces where the audience benefits from domain identification.

A sub-brand may **not** use its accent in:

- **Semantic tokens** (success, warning, danger, info) — these are global and stable across sub-brands so users learn the meaning once.
- **Error or success states** — semantic tokens own these.
- **Destructive action colour** — destructive remains the global danger token.
- **Primary CTA colour** — primary CTAs remain Ochre across all sub-brands.
- **Input focus rings** — focus rings remain the master-brand focus token (Ochre with neutral inner stroke), to satisfy SC 2.4.13 Focus Appearance consistency across the whole product family.

### 2.6 Product brands and the endorsement lockup

Below sub-brands sit **product brands** — named products that inherit the sub-brand accent and the master's contract. A product brand is **never** permitted to override the master's six immutable elements.

There are two permitted naming forms:

- **Long form**: `CyberSkill <Domain> <Product>` — *CyberSkill Work Board*, *CyberSkill Secure Vault*, *CyberSkill AI Studio*. This form is preferred for B2B and admin contexts where domain clarity is important.
- **Short form** (the **endorsement lockup**): a stand-alone product name co-locked with the CyberSkill master mark at smaller scale. Used where a shorter form is required for consumer surfaces, mobile app icons, or where the product must coexist with third-party app stores' name-length conventions.

The short form requires the master mark to be present in clear-space proximity (≤ 4× the product mark's x-height away) on the home screen, in the splash, and on the about page; it does not need to appear in every individual surface. The short form is reviewed by the Brand RFC process ([Part 8](part-8-governance-legal-commerce.md)) before it can be registered.

### 2.7 Clear-space rules

Clear space around every CyberSkill master or sub-brand mark is **1×** the x-height of the wordmark, on all four sides, measured from the outer edge of the mark's bounding box. Co-branded lockups (master × partner; see §12) take precedence: clear space applies to the **composite lockup**, not to the individual marks within it.

**Worked examples of clear-space violations** (each of which fails review):

- Headline copy ending less than 1× x-height above the wordmark.
- An icon stack abutting the wordmark from the left.
- A sub-brand accent strip touching the wordmark from below.
- Photography crossing into the clear-space region from any side.

The clear-space rule is enforced by a Figma plugin in the design files and by an SVG-bounding-box check in the engineering pipeline.

### 2.8 What is forbidden in any sub-brand or product brand

Sub-brands and product brands may not:

- Replace the wordmark with an icon-only mark.
- Add a tagline that competes with *Turn Your Will Into Real* / *Hiện Thực Hoá Ý Chí*.
- Introduce a third typeface beyond Be Vietnam Pro and JetBrains Mono.
- Use a colour outside the sub-brand accent OKLCH bounds.
- Disable or weaken the accessibility, privacy, AI-disclosure, or consent defaults defined in Parts 5, 6, 8.

---

## 3. Personality, Voice, and Tone

### 3.1 Voice — the four-attribute chord

The personality of the CyberSkill brand is expressed in four attributes that are simultaneously true of every surface: **warm**, **direct**, **honest**, and **respectful of user effort**. These four are not a slider; they are a chord. If any one is missing, the surface is off-brand — even if the others are loud. The remainder of this section defines each attribute, establishes the rules of register, and specifies the do/don't tables that writers use.

### 3.2 Warm

**Warmth is the property of the product treating the user as a person who wants to succeed.** Warmth is not a filler, an emoji, an exclamation mark, or a *we love you so much* preamble. Warmth is produced by linguistic restraint at scale — a hundred small choices that, taken together, change the register of the surface.

Warmth in Vietnamese:

- Use the second-person pronoun **bạn** as the default in product UI. *Bạn* is warm-formal, suitable for an unfamiliar user of any age, and culturally neutral. Reserve **anh / chị** for customer-service surfaces where the user has explicitly consented to a more familiar register. Reserve **quý khách / quý vị** for explicitly legal or financial registers (terms of service, billing) where formality is the duty of care.
- Prefer active verbs (*Lưu* over *Việc lưu sẽ được thực hiện*).
- Name the user's goal before naming the system's limits (*"Để xuất file PDF, hãy chọn 'Tải xuống'"* over *"Bạn không thể xuất file ở đây"*).
- Prefer *có thể* (can) framings over *không được* (not allowed) where both are factually accurate.

Warmth in English:

- Sentence case for UI labels and microcopy. (Title case is reserved for headings of dialogs and section titles in long-form documentation.)
- Active voice: "We saved your draft" rather than "Your draft has been saved."
- Specific subjects: "We held back this answer" rather than "The answer was held back."
- Plain language preferred over corporate vocabulary: *use*, *pick*, *run*, not *utilise*, *select*, *operationalise*.

### 3.3 Direct

**Directness is the counterweight to warmth.** Together they prevent the two common failure modes of enterprise copy: cold competence (factual, distant, unwelcoming) and friendly vagueness (warm, unspecific, evasive). A product that is warm without directness becomes ingratiating; directness without warmth becomes brusque. The chord requires both.

Directness in practice:

- State what is true in the fewest words that still convey the full meaning.
- Do not bury the verb. *"Click Save to save your draft"* not *"To save your draft, you should click the Save button"*.
- Skip euphemism. *"This will permanently delete 12 files"* not *"This action may have consequences."*
- Surface the next step. *"Add an @ symbol — e.g., you@example.com"* not *"Invalid email."*

### 3.4 Honest

**Honesty is the property of the product not claiming certainty it does not have, capability it does not possess, or intent it does not hold.** Honesty appears most visibly in three places.

**AI disclosure.** Every AI-generated output carries an `AIDisclosureBadge` ([Part 3h](part-3h-ai-chat.md) §10) and, where applicable, a `ConfidenceIndicator` with the three tiers — **Low <60%**, **Medium 60–85%**, **High >85%** — defined in [Part 6](part-6-ai-ethics-sustainability.md). Low-confidence outputs are withheld by default unless the user has opted into seeing them. Medium-confidence outputs are surfaced with a disclaimer. High-confidence outputs are shown without disclaimer but always with the disclosure badge. AI-generated images and audio carry **C2PA 2.2 manifests** (C2PA Technical Specification v2.2, 1 May 2025; c2pa.org).

**Error messaging.** Errors name the failure, name the next step, and never pretend the failure was the user's fault unless it was. *"We couldn't reach the payment provider. Your card hasn't been charged. Try again, or use a different card."* — not *"Payment failed."*

**Forecasts and estimates.** When we don't know, we say we don't know. Time-remaining estimates show a band, not a misleading point estimate. Confidence is published, not concealed.

Honesty closes the distance between a product's marketing surface and its operational surface. A CyberSkill product that oversells during sign-up and underdelivers in use has broken the brand even if every individual feature works as advertised.

### 3.5 Respectful of user effort

**Respect for user effort is the property of the product not wasting what the user has already given.** This appears as:

- **Form state preservation** across disconnections, crashes, tab closures, and session timeouts. WCAG 2.2 SC 3.3.7 Redundant Entry establishes the floor; we treat it as the floor, not the ceiling.
- **Honest progress.** Loading indicators measure real progress. Indeterminate spinners are reserved for cases where progress cannot be measured, with a written explanation of why.
- **Skipped redundant confirmations.** If the user has already confirmed within the session, do not re-prompt. Confirm only when the action is destructive *and* the consequence is recoverable.
- **Histories, drafts, recovery.** User work is the most valuable asset in the system because it is not ours. Treat it accordingly.

### 3.6 Tone — the contextual application of voice

Tone varies by context while voice stays constant. Tone is how the four attributes are balanced for the task at hand. The following table is authoritative.

| Context | Primary tone | Secondary tone | Avoid |
|---|---|---|---|
| Onboarding | Warm, inviting | Direct | Over-explaining; gamification; "Awesome!" |
| Empty state | Warm, instructive | Direct | "Oops"; "Nothing here"; sad faces |
| Success toast | Calm, brief | Warm | Exclamation marks; emoji; "Hooray" |
| Inline guidance | Direct, helpful | Warm | Patronising; "easy" claims |
| Error (user) | Direct, constructive | Respectful | Blame; sarcasm; "Invalid" alone |
| Error (system) | Honest, apologetic | Direct | Hiding the cause; vague "Something went wrong" |
| Error (third-party) | Honest, neutral | Direct | Blaming the third party; gloating |
| AI output | Honest, cautious | Direct | Overclaiming certainty; pretending the AI is human |
| Legal / consent | Direct, plain | Honest | Dark patterns; bundling; defaulted-on toggles |
| Admin / compliance | Formal, precise | Honest | Jargon without definition; passive voice burying responsibility |
| Marketing | Warm, confident | Honest | Unverifiable claims; superlatives without source; FOMO copy |
| In-product education | Warm, thorough | Direct | Long preambles; condescension |

### 3.7 Do/don't tables — empty states

| Context | ❌ Don't | ✓ Do (English) | ✓ Do (Vietnamese) |
|---|---|---|---|
| No data | "Nothing here yet." | "Add your first record to get started." | "Thêm bản ghi đầu tiên để bắt đầu." |
| No results | "No matches!" | "No matches for *acme*. Try a shorter query or check spelling." | "Không có kết quả cho *acme*. Thử từ khoá ngắn hơn hoặc kiểm tra chính tả." |
| Filters too narrow | "0 results." | "0 results with these filters. Clear filters?" | "Không có kết quả với bộ lọc này. Xoá bộ lọc?" |
| Blocked by permission | "Access denied." | "You don't have access to this workspace. Ask an admin to invite you." | "Bạn chưa có quyền truy cập workspace này. Hãy đề nghị quản trị viên mời bạn." |
| Onboarding empty | "Get started!" | "Welcome. Pick a project to begin, or create a new one." | "Chào bạn. Chọn một dự án để bắt đầu, hoặc tạo dự án mới." |
| Calendar empty | "No events" | "No events this week. Schedule one or import from another calendar." | "Không có sự kiện trong tuần này. Lên lịch hoặc nhập từ lịch khác." |
| Chat empty | "No messages" | "No messages yet. Send the first to start the thread." | "Chưa có tin nhắn. Gửi tin đầu tiên để bắt đầu." |

### 3.8 Do/don't tables — errors

| Context | ❌ Don't | ✓ Do (English) | ✓ Do (Vietnamese) |
|---|---|---|---|
| Validation (user typo) | "Invalid input" | "Email needs an @ — e.g., you@example.com." | "Email cần ký tự @ — ví dụ: you@example.com." |
| Save failed (network) | "Save failed." | "We can't reach the server. Your draft is safe; we'll retry in 15 s." | "Không kết nối được máy chủ. Bản nháp của bạn được giữ lại; chúng tôi sẽ thử lại trong 15 giây." |
| Save failed (server) | "500 Internal Server Error" | "Something went wrong on our side. We've logged it and we'll fix it. Try again, or contact support." | "Có lỗi từ phía chúng tôi. Lỗi đã được ghi lại và sẽ được khắc phục. Hãy thử lại, hoặc liên hệ hỗ trợ." |
| AI output withheld | "Error." | "We held back this answer because our confidence is Low. Ask a narrower question or try again." | "Chúng tôi tạm giữ câu trả lời vì độ tin cậy Thấp. Hãy đặt câu hỏi hẹp hơn hoặc thử lại." |
| Permission denied | "Forbidden" | "You can read this project but can't edit it. Ask an admin for edit access." | "Bạn có thể xem dự án này nhưng chưa được phép chỉnh sửa. Hãy đề nghị quản trị viên cấp quyền." |
| Rate limited | "Too many requests" | "You've reached the per-minute limit. Wait 30 s and try again." | "Bạn đã đạt giới hạn mỗi phút. Hãy đợi 30 giây và thử lại." |
| Quota exceeded | "Quota exceeded" | "You've used your monthly quota for AI summaries. Upgrade or wait until next month." | "Bạn đã hết lượt tóm tắt AI tháng này. Nâng cấp gói hoặc chờ sang tháng." |
| File too large | "File too large." | "Files must be ≤ 10 MB. This one is 23 MB. Compress it or pick a smaller file." | "Tệp phải ≤ 10 MB. Tệp này là 23 MB. Hãy nén lại hoặc chọn tệp nhỏ hơn." |

### 3.9 Do/don't tables — success

| Context | ❌ Don't | ✓ Do (EN) | ✓ Do (VN) |
|---|---|---|---|
| Single save | "Saved!" | "Saved." | "Đã lưu." |
| Multi-step finish | "All done 🎉" | "Published. 2 reviewers notified." | "Đã đăng. Đã thông báo cho 2 người duyệt." |
| Account created | "Welcome!" | "Account created. Check your email to verify." | "Đã tạo tài khoản. Hãy kiểm tra email để xác minh." |
| Invitation sent | "Invitation sent ✉️" | "Invitation sent to anh.tran@example.com." | "Đã gửi lời mời tới anh.tran@example.com." |

### 3.10 Do/don't tables — AI disclosure

| Context | ❌ Don't | ✓ Do (EN) | ✓ Do (VN) |
|---|---|---|---|
| Generated text | [no disclosure] | "AI-generated. Confidence: Medium. Review before sending." | "Do AI tạo. Độ tin cậy: Trung bình. Hãy xem lại trước khi gửi." |
| Summary from documents | "Summary:" | "AI summary of 4 sources. 3 citations. Last updated 2 m ago." | "Tóm tắt AI từ 4 nguồn. 3 trích dẫn. Cập nhật 2 phút trước." |
| Image edited by AI | [no provenance] | "AI-edited. Original from 18 Apr 2026. C2PA manifest available." | "Có chỉnh sửa bởi AI. Bản gốc từ 18/04/2026. Có manifest C2PA." |
| Real-time AI suggestion | "Suggestion" | "AI suggestion — review before accepting." | "Gợi ý AI — hãy xem lại trước khi chấp nhận." |

### 3.11 Do/don't tables — legal / consent

| Context | ❌ Don't | ✓ Do (EN) | ✓ Do (VN) |
|---|---|---|---|
| Cookie banner | "By using this site, you agree…" | "We use cookies for *sign-in* and *measurement*. You can say yes to each, or decline both." | "Chúng tôi dùng cookie cho *đăng nhập* và *đo lường*. Bạn có thể đồng ý từng mục hoặc từ chối cả hai." |
| PDPL cross-border transfer | "We may share data with partners." | "Sending your data to our server in Singapore requires your consent. You can revoke it any time. [Read the transfer impact assessment]" | "Việc chuyển dữ liệu của bạn sang máy chủ tại Singapore cần sự đồng ý. Bạn có thể rút lại bất cứ lúc nào. [Đọc đánh giá tác động chuyển dữ liệu]" |
| Marketing opt-in | [pre-checked] | [unchecked] "Send me product updates by email. You can unsubscribe any time." | [unchecked] "Gửi cho tôi cập nhật sản phẩm qua email. Bạn có thể huỷ đăng ký bất cứ lúc nào." |
| Sensitive data collection | "We need your ID." | "We need a photo of your CCCD to verify your identity. We store it encrypted and delete it after 90 days. [Why we need this]" | "Chúng tôi cần ảnh CCCD của bạn để xác minh danh tính. Ảnh được mã hoá và xoá sau 90 ngày. [Vì sao chúng tôi cần ảnh này]" |

Consent copy is compliance copy. Decree 356/2025/ND-CP **prohibits** default consent and ambiguous instructions that confuse data subjects (Tilleke). Treat every consent surface as a legal artefact; any change to consent language requires DPO sign-off ([Part 8](part-8-governance-legal-commerce.md)).

### 3.12 Do/don't tables — onboarding

| Context | ❌ Don't | ✓ Do (EN) | ✓ Do (VN) |
|---|---|---|---|
| First-run welcome | "Welcome to [App]!! Let's get you set up!!" | "Welcome. Pick your language, then we'll set up a workspace." | "Chào mừng bạn. Hãy chọn ngôn ngữ, sau đó cùng tạo workspace." |
| Empty inbox | "Nothing here yet — add some friends!" | "Your inbox is empty. Add a contact to start." | "Hộp thư của bạn đang trống. Thêm liên hệ để bắt đầu." |
| Skip prompt | "Don't skip!" | "You can skip and finish setup later from Settings." | "Bạn có thể bỏ qua và hoàn tất sau từ Cài đặt." |

### 3.13 Marketing copy — the honesty rule

Marketing copy is held to the same honesty standard as product copy. Unverifiable claims — *"the world's best"*, *"AI that thinks"*, *"10× faster"* without a cited benchmark — are **not permitted**. Every superlative must be traceable to a source that is named in the footer or linked inline. Vietnamese marketing avoids loan-English buzzwords where a Vietnamese equivalent exists: *trải nghiệm* over *experience*, *đồng hành* over *partner journey*, *bạn* over *user*. The marketing voice is warm and confident, never breathless.

### 3.14 Administrative / compliance copy

Admin and compliance surfaces (DPO consoles, audit log viewers, SOC dashboards, billing administration) use **formal, precise, jargon-defined** copy. When the audience is necessarily technical, technical language is correct — but every acronym is expanded on first use within a surface, and a glossary link is surfaced for long documents. The Vietnamese register for admin surfaces is *trang trọng-thân thiện* (formal-warm): polite and structured, but not stiff. Avoid *quý vị* unless the document is explicitly for legal or financial review.

### 3.15 Voice across modalities

The four-attribute chord applies across modalities, with mode-specific manifestations:

- **Voice UI (VUI).** Warm tones at 0 dB intelligibility-loudness; pacing one-third slower than visual reading; explicit acknowledgements ("OK, I'll do that").
- **Email.** Subject lines name the action and the relevance: *"Bạn có 2 yêu cầu cần duyệt"* not *"Updates from CyberSkill"*.
- **Push notifications.** Single-sentence, action-oriented, locale-aware.
- **In-product video.** Captions in the locale of the surface (VN + EN minimum); transcript available; motion respects `prefers-reduced-motion`.

### 3.16 Voice when refusing

Sometimes the right answer is no. CyberSkill products refuse with the same chord as they accept: warm, direct, honest, respectful.

| Situation | ✓ Refusal copy (EN) | ✓ Refusal copy (VN) |
|---|---|---|
| Feature unavailable on plan | "Advanced workflows are on the Team plan and above. Upgrade to use this." | "Quy trình nâng cao có ở gói Team trở lên. Nâng cấp để sử dụng." |
| Action would violate policy | "We can't generate this — it would identify a private individual without consent." | "Chúng tôi không thể tạo nội dung này — sẽ xác định danh tính cá nhân không có sự đồng ý." |
| Legal block | "We can't process this in your region under PDPL Art. 19. Contact support to discuss alternatives." | "Chúng tôi không thể xử lý trong khu vực của bạn theo PDPL Đ. 19. Liên hệ hỗ trợ để bàn phương án khác." |

A refusal does not soften into an apology and does not harden into a wall. It explains and offers the next step.

---

## 4. Core Principles

The core principles are the eight commitments against which every design, engineering, and content decision inside the system is tested. They are **ordered deliberately**; when two principles conflict, the earlier principle wins. The order is the operating contract of the design system.

### 4.1 Intent before interface

The user's intent is the reason the surface exists. Every screen in a CyberSkill product must answer the question *"what is the user trying to do here?"* in **one sentence**, and that sentence must be legible to someone who has never seen the product. When we cannot write that sentence, the surface should not ship.

This principle is operationalised through three artefacts:

- **The Surface Brief**, a one-page document that opens every design and engineering effort. It states the intent, the actors, the constraints, the success criteria, and the acceptance rubric. The brief is co-authored by the product manager, the designer, and the engineer; it is reviewed before any pixel or character is committed.
- **The Job Story**, written in the form *"When I … I want to … so I can …"* — a Clayton-Christensen-derived format that names the situation, the motivation, and the desired outcome.
- **The Acceptance Rubric**, six pass/fail criteria adapted from Part 1 §8 of this document, that turn the brief into a binary review at delivery time.

Surfaces that ship without a brief drift; surfaces that ship without a job story drift specifically toward what is convenient to engineer rather than what the user wanted; surfaces that ship without an acceptance rubric drift specifically toward what is convenient to demonstrate rather than what works.

### 4.2 Vietnamese as a first-class language

Every component and every pattern in this system is validated in Vietnamese **and** English simultaneously. This has four concrete implications:

1. **Stacked-diacritic glyph height** is tested in every text component. The canonical canary is `ỚẾỰỎÃỸ` set in Be Vietnam Pro Regular at the component's base size. A component that clips this canary at 100 %, 200 %, or 400 % zoom, in light or dark mode, in LTR or in any mixed-script context, fails review.
2. **Line-height minimums** of 1.5 (body) and 1.35 (headings) and **tracking rules** (increase 0.04em for any all-caps run) are part of the token system, not optional overrides. Token consumers cannot easily disable them.
3. **Every microcopy string** ships in both locales at the same time. The English string is not permitted to ship before the Vietnamese string is approved. A surface with placeholder Vietnamese (or, worse, machine-translated Vietnamese without human review) is not ready to ship.
4. **Testing protocols** include screen-reader pronunciation of Vietnamese text. NVDA, JAWS, VoiceOver (macOS 15, iOS 18), and TalkBack (Android 15) read Vietnamese at varying quality levels; we maintain a pronunciation-hint registry for tokens that synthesise badly (especially Vietnamese acronyms — CCCD, PDPL — and Vietnamese place names with unfamiliar diacritics).

Vietnamese first-class is not a feature. It is a correctness property — a class of bugs that the system refuses to ship.

### 4.3 Accessibility as the floor

The system targets **WCAG 2.2 level AA** as the **minimum**, not the ceiling, across web and mobile surfaces (W3C Recommendation, 5 October 2023; w3.org/TR/WCAG22/). Three of the nine new 2.2 success criteria are particularly material to the components in Part 3:

- **SC 2.4.11 Focus Not Obscured (Minimum).** The focus indicator of the currently focused element must not be entirely covered by other content. This is enforced in our Sheet, FAB, and sticky-header components by raising the focused element above any obstruction.
- **SC 2.5.8 Target Size (Minimum 24 × 24 CSS px).** All interactive targets must be at least 24 × 24 CSS pixels, or have at least 24 px of clear surrounding space. Every button, icon button, slider thumb, chip, and tag in the system meets this.
- **SC 3.3.8 Accessible Authentication (Minimum).** Authentication must not require a cognitive function test (puzzle CAPTCHAs are forbidden); paste must be allowed; password managers must be supported; one-time codes must auto-fill. The `PasswordField` and `OTPInput` components ([Part 3b](part-3b-inputs.md)) implement these requirements.

Under the **European Accessibility Act (Directive 2019/882)**, which began enforcement on **28 June 2025** (European Commission; Davis Wright Tremaine), and **EN 301 549**, which provides presumption of conformity to the EAA (AllAccessible), these are legal requirements for any product sold into EU markets. National penalties reach **€100,000 per violation in Germany and Italy** and up to **€75,000 or 4 %** of revenue in France (AllAccessible).

### 4.4 Transparency defeats surprise

Surprise is a debt; transparency is how we avoid running one up. Every piece of automation, inference, or delay in a CyberSkill product **discloses itself** before the user notices.

- **AI outputs** carry disclosure (`AIDisclosureBadge`) and confidence (`ConfidenceIndicator` with the Low/Medium/High tiers above).
- **Summarisations** carry citations and source counts.
- **Background syncs** carry visible state (the "saving…", "saved", "offline — queued" indicator that updates in real time).
- **Long tasks** carry honest progress.
- **Cancellations** carry consequence statements (*"This will discard 2 unsaved edits."*).
- **Personal-data collection** carries a clear statement of purpose and retention at the moment of collection, not on a separate privacy page.

The relevant ethical framing is **IEEE 7001-2021 on transparency of autonomous systems** (IEEE). The regulatory framing is **EU AI Act Art. 50** on user transparency, applicable in phases per the Regulation's entry-into-force schedule (European Commission), and **PDPL Art. 11** (Vietnam Law 91/2025/QH15) on informed consent (LuatVietnam).

### 4.5 Calm default

The default state of a CyberSkill surface is calm. Animation respects `prefers-reduced-motion`; notifications aggregate ([Part 3e](part-3e-feedback.md) §4); colours stay in the warm-neutral range unless something is actively wrong; sounds are opt-in and capped at **−18 LUFS** ([Part 2](part-2-design-language.md) §20); haptics defer to OS-level accessibility settings.

The influence is Amber Case's *Calm Technology* (O'Reilly Media, 2015) — a surface that waits to be asked, that uses the periphery, that requires the smallest possible amount of attention, and that lets you focus on doing your work. Calm default does not mean *dull*; it means the surface earns its emphasis. When an AI surface returns a high-confidence answer, it doesn't celebrate; when a low-confidence answer is withheld, it does so quietly.

### 4.6 Sustainability

The system treats carbon and energy as first-class design properties.

- **Per-surface carbon** is measured using the **Sustainable Web Design Model v4**, released **14 July 2025** — which produces estimates roughly two-thirds lower than v3 and uses a default grid intensity of **494 gCO₂/kWh** (sustainablewebdesign.org).
- **Per-surface budgets**, image weight caps, and offline-first defaults are specified in [Part 6](part-6-ai-ethics-sustainability.md) §13.
- **Hardware lifetime extension** is a social-sustainability commitment: no surface drops support for five-year-old devices without a documented justification approved at governance level. This is operationalised via browser-support and device-support matrices in [Part 7](part-7-engineering-operations.md).

Sustainability is not a marketing claim; it is a budget. The budget is monitored in production via OpenTelemetry and surfaced on a public CyberSkill sustainability dashboard.

### 4.7 Global spine, local skin

The token system, the component contract, and the accessibility, privacy, and AI-transparency baselines are **global**. The locale skin — date formats, number formats, name order, address layout, currency presentation, calendar system, week-start, honorifics, taboos — is **local**, and local overrides are declarative (defined in the locale token files) rather than ad-hoc patches in component code.

[Part 5](part-5-accessibility-localization.md) specifies this for 20+ locales. The spine is non-negotiable: no locale may disable accessibility, alter consent defaults, or remove AI disclosure. A locale that wishes to do so opens an RFC under [Part 8](part-8-governance-legal-commerce.md) governance — and the RFC will be denied if it conflicts with safety, accessibility, or law.

### 4.8 Agents as users

The system treats AI agents that **consume**, **compose with**, or **act on** CyberSkill products as a class of user. This means the system ships **machine-readable contracts**, not scraped screens:

- **DTCG-compliant token files** in format **2025.10**, media type `application/design-tokens+json`, extensions `.tokens` / `.tokens.json`, with the core syntax `$type`, `$value`, `$description` (W3C DTCG, published 28 October 2025).
- **An `AGENTS.md` file at the monorepo root**, following the open agents.md convention used in 60,000+ repositories (agents.md), with package-level overrides per [Part 9](part-9-ai-prompt-library.md).
- **MCP servers for tokens and components** — `@cyberskill/mcp-tokens` and `@cyberskill/mcp-components` — implementing the **Model Context Protocol spec 2025-11-25** (Anthropic), stewarded via the **Linux Foundation Agentic AI Foundation**.
- **RFC 9457 Problem Details** as the single error-envelope contract for every API surface — media type `application/problem+json`, published July 2023, obsoleting RFC 7807 (rfc-editor.org/rfc/rfc9457).
- **`CLAUDE.md`, `.cursor/rules`, `.windsurf/rules`, and `.github/copilot-instructions.md`** all reference the root `AGENTS.md` so the same policy is read by every agent.

When agents and humans both consume the system, the cost of inconsistency is paid by both. The contract defeats the cost.

### 4.9 The principle order, restated

When two principles disagree, the earlier wins:

1. Intent before interface.
2. Vietnamese as a first-class language.
3. Accessibility as the floor.
4. Transparency defeats surprise.
5. Calm default.
6. Sustainability.
7. Global spine, local skin.
8. Agents as users.

A surface that fails one of the lower-numbered principles to satisfy a higher-numbered principle cannot ship. A surface that fails one of the higher-numbered principles to satisfy a lower-numbered principle ships, with the trade-off documented in the Surface Brief.

---

## 5. Values

**Principles are how we decide; values are who we are when no one is watching.** The CyberSkill values are four, and they are short on purpose. Length here is dilution.

### 5.1 Dignity

Every user is owed the default of being treated as a capable adult who has decided to do something specific. Forms do not scold. Errors do not blame. Accessibility is not a courtesy. Consent is not a trick. Dignity is the reason consent cannot be pre-checked under Decree 356/2025/ND-CP — but it is also the reason we wouldn't pre-check it even if the law permitted it. Dignity manifests in a hundred small choices: the pronoun *bạn*; the unchecked checkbox; the focus ring that meets SC 2.4.13; the screen reader announcement that says *"đã bật"* / *"đã tắt"* in Vietnamese rather than the English fallback; the three-tier confidence indicator that doesn't pretend Low and High are the same kind of answer.

Dignity also extends to contributors. The system's RFC process ([Part 8](part-8-governance-legal-commerce.md) §2) is structured so that the smallest valid contribution receives the same review attention as the largest; contributors are credited in the changelog by name; the deprecation policy gives consumers two minor versions of warning before removal.

### 5.2 Craft

Craft is the ethics of taking the time. The system respects the long tradition of making in Vietnamese visual culture — *sơn mài* lacquerware (the multi-coat layering and burnishing tradition), *gốm Bát Tràng* pottery (the discipline of firing temperature and glaze chemistry), *lụa Hà Đông* silk weaving (the patient setup of the loom before the first thread is thrown). The lesson these crafts teach is the same: the quality of a finished surface is the sum of invisible preparatory work.

In the design system, this manifests as:

- **Tokens are crafted, not picked.** OKLCH values are calculated for perceptual uniformity and sub-brand range, not chosen from a colour wheel.
- **Line-heights are tested**, not defaulted, against stacked Vietnamese diacritics.
- **Motion curves are written**, not inherited, with names that describe the intent (*decelerate*, *emphasized*).
- **Component APIs are deliberated.** Props are added when needed, removed when unused, deprecated when superseded.
- **Documentation is co-shipped with code.** Every change ships with a changelog entry, a test, and an updated story.

Craft is not perfectionism. Perfectionism delays shipping; craft causes shipping the right thing. The difference is whether the additional time produces a result the user notices.

### 5.3 Evidence

The system prefers evidence over opinion.

- Every factual claim in this document is cited to a primary source (Part 1 §14, [Part 10](part-10-measurement-research-appendix.md)).
- Every component passes axe-core automated accessibility checks plus manual screen-reader tests across NVDA, JAWS, VoiceOver, and TalkBack (Part 3).
- Every performance budget is measured in production with Real-User Measurement, not lab benchmarks ([Part 7](part-7-engineering-operations.md) §11).
- Every AI prompt is evaluated with a named eval before it ships ([Part 9](part-9-ai-prompt-library.md) §4).
- Every claim that a component is more accessible / faster / lighter than the previous version is backed by a measurement with method documented.

A design system without evidence is a style magazine. Style magazines are pleasant to read; they do not change what ships in production.

### 5.4 Reciprocity

We ask users for less than we take. When we collect data, we spend it (the PDPL minimisation and purpose-specificity requirements under Articles 10–12 are treated as design targets, not regulatory ceilings; Law 91/2025/QH15). When we ask for attention, we pay it back with calmness. When open-source authors gave us our fonts under SIL OFL 1.1 (Be Vietnam Pro by Lâm Bảo, Tony Le, ViệtAnh Nguyễn; JetBrains Mono by Philipp Nurullin), we return the same license on fonts we author, and our contributions to upstream projects are publicly attributed. When we use third-party libraries, we report bugs back, contribute fixes, and credit the maintainers.

Reciprocity is not transactional. It is the recognition that the design system sits inside a commons of standards, fonts, libraries, and norms, and that the commons is healthy only if it is maintained by everyone who benefits from it.

---

## 6. Experience Pillars

The experience pillars are the **four properties a CyberSkill product is known by in the world**: clarity, competence, care, continuity. They are distinct from principles — principles are how we decide internally, pillars are what users feel externally.

### 6.1 Clarity

Clarity is the product of intent-before-interface plus the warm-direct voice. A clear surface says **what it is** in the first 300 milliseconds, says **what it wants from you** in the next 700, and makes the **first action** obvious within the first second.

Clarity is measured in three ways:

- **Time-to-first-meaningful-paint.** Part of Core Web Vitals; target LCP < 2.5 s, INP < 200 ms, CLS < 0.1 ([Part 7](part-7-engineering-operations.md) §10).
- **Five-second test.** Show the surface to a user for five seconds. After that, they should be able to recall the purpose and the primary action. The test is run on every new surface before usability testing.
- **Reading grade.** Flesch–Kincaid for English; equivalent Vietnamese readability metrics. Consumer surfaces target grade 9; admin surfaces grade 11. The grade is calculated by the docs CI and posted as a check on every PR.

Clarity is **not** minimalism. A sparse surface with buried meaning fails clarity; a denser surface where every element is necessary and signposted passes. Clarity is signal-to-noise.

### 6.2 Competence

Competence is the product of craft plus evidence. A competent surface tolerates bad networks, bad input, and bad moods. It preserves work across failure. It returns predictable errors (RFC 9457 `application/problem+json`). It hits performance budgets. It respects `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`. It returns the same output for the same input unless the user has changed the input.

Competence is the quiet property: users don't name it, but they leave products that don't have it. They will not say *"this product was not competent"*; they will say *"I don't trust it."* The latter sentence is the failure of the former property.

Competence shows up in:

- **State management.** Drafts saved every 2 s, recovered on reload, with the user shown the time of the last save.
- **Error handling.** Every error has a localised, structured response. Every recoverable error offers the next step.
- **Performance.** Every surface meets its budget; budget violations gate deploy.
- **Reliability.** Every API call is idempotent where the action is intended to be repeatable; non-idempotent calls require explicit confirmation.

### 6.3 Care

Care is the product of dignity plus warm voice. A caring surface calls the user by the pronoun they chose, reads a screen-reader announcement at the right volume and cadence, asks for consent with real choices, surfaces the consequences of destructive actions before taking them, and owns its own failures in the first person (*"we"* not *"the system"*).

Care does not translate into emojis or animation; it translates into restraint. Care is also how we treat ourselves — the system budgets contributor time, uses Changesets for human-readable changelogs, and publishes deprecation timelines across at least two minor versions ([Part 7](part-7-engineering-operations.md)).

A surface that is competent but uncaring is brittle in the user's hand. A surface that is caring but incompetent is annoying. Both are needed.

### 6.4 Continuity

Continuity is the product of global spine, local skin, and sustainability. A continuous product works **the same way** across sessions, devices, networks, years, and versions.

- **Data is portable.** PDPL Art. 14 portability right is implemented as a self-service download; no support tickets required ([Part 8](part-8-governance-legal-commerce.md) §5).
- **Migrations are codemod-assisted.** Breaking changes ship a codemod ([Part 7](part-7-engineering-operations.md) §9).
- **Deprecation is announced.** Two minor versions of warning before removal.
- **State is preserved.** Form state across reloads; session state across devices (with explicit user opt-in for cross-device sync).
- **Old browsers are supported.** Five-year device-support window is honoured.

Continuity also means the product still works when it is slow, offline, on an old device, in a low-bandwidth market, or under an accessibility profile — because none of those states are exceptions; they are reality for a large share of our users.

A surface that feels clear, competent, caring, and continuous has met the experience pillars. A surface that feels one but not the others has not.

---

## 7. Decision Framework

When a decision is hard, we make it in this order:

**safe → honest → usable → consistent → beautiful**

The order is operational and binding. The earlier filter wins.

### 7.1 Safe

**Safe** means the decision does not introduce a regression in **privacy**, **accessibility**, or **security**. If a new component would require collecting a new category of personal data without a lawful basis under PDPL Art. 10–12, or would fail a WCAG 2.2 AA success criterion, or would introduce a new attack surface — it is not safe. Safe wins over honest, usable, consistent, and beautiful. A feature that is beautiful and unsafe is **cancelled**, not softened.

Safe decisions take the system's defaults seriously: no pre-checked consent, no obscured destructive actions, no third-party scripts loaded without subresource integrity, no PII in logs, no analytics without opt-in.

### 7.2 Honest

**Honest** means the decision does not misrepresent the product's capability, certainty, or intention. A toast that says *"Saved"* when the save failed is dishonest; a confidence indicator that rounds 58 % to *"Medium"* violates our own tier boundaries (Low < 60 %) and is dishonest; a marketing claim of *"AI that thinks"* is dishonest because it ascribes a capability the model does not have.

Honest wins over usable when they conflict: it is better for the user to experience a slightly less pleasant truth than an easier lie.

### 7.3 Usable

**Usable** means the decision makes the user's job easier — measured, not intuited. Usability is demonstrated by task-completion rate, time-on-task, error rate, and satisfaction (SUS, UMUX-Lite). Usability wins over consistency when a consistency rule would make the surface less usable — for example, when a surface's domain demands a deviation from the standard form pattern (e.g., clinical dosing input requiring a custom dual-validation pattern for safety), we deviate, with documented justification.

### 7.4 Consistent

**Consistent** means the decision follows the system's patterns unless usability or honesty requires otherwise. Consistency is the system's property; inconsistency is a tax on every user who has learned the pattern. When we choose to deviate, we file an RFC documenting the deviation.

### 7.5 Beautiful

**Beautiful** means the decision delights the user aesthetically. Beauty is the **last** filter, not the first, because:

- Beauty is easy to confuse with *novel*.
- Beautiful-but-unsafe decisions are how products hurt people.
- Beautiful-but-dishonest decisions are how trust collapses.
- Beautiful-but-unusable decisions are how interfaces win awards and lose users.

When safe, honest, usable, and consistent are all satisfied, the beautiful choice is the one we make.

### 7.6 Worked example — AI surface

A streaming assistant is tempted to **auto-summarise** long documents without explicit user action, because it is more beautiful (the page just *fills with insight*) and more usable (one fewer click).

- **Safe?** The data is in scope under PDPL if the document contains personal data. Auto-summarisation without consent is **unsafe**.
- **Decision.** Disable auto-summarisation. Require explicit user trigger. Log the consent event. Emit `application/problem+json` on unauthorised attempts.
- **The beautiful interaction loses to safe.**

### 7.7 Worked example — subscription form

A subscription flow is tempted to **pre-check** the *"Agree to marketing emails"* box to increase opt-in.

- **Safe?** Decree 356/2025/ND-CP explicitly bans default consent (Tilleke).
- **Decision.** Ship unchecked. Provide a clear marketing-benefit statement. Make change-of-mind easy.
- **The easier conversion loses to safe.**

### 7.8 Worked example — data viz

A bar chart with seven series uses a rainbow palette and a decorative 3D bevel.

- **Safe?** Colour-only differentiation violates SC 1.4.1 Use of Color. Not safe.
- **Decision.** Shift to the 8-hue colourblind-safe categorical palette ([Part 2](part-2-design-language.md) §17), remove the bevel, add shape differentiation for non-colour cue, and test with Sim Daltonism and Coblis.
- **Beauty loses to safe and honest.**

### 7.9 Worked example — confirmation dialog

A destructive action's confirmation dialog initially focuses the **destructive primary** button to make the flow faster.

- **Safe?** Slightly less safe — easier to confirm an unintended destruction.
- **Honest?** Same.
- **Usable?** Marginally faster.
- **Decision.** Initial focus is on **Cancel** (the safer option) for destructive variants. Users who intend destruction press Tab once, which is a tiny cost; users who pressed *Delete* by accident on the previous screen are protected.
- **Marginal usability loses to safe.**

### 7.10 Worked example — performance vs. brand

A marketing page hero would benefit from a 3 MB high-resolution image of Vietnamese craftspeople. The image is beautiful and on-brand.

- **Safe?** Yes (no privacy/security/accessibility issue, assuming alt text).
- **Honest?** Yes.
- **Usable?** It increases LCP and exceeds the per-surface carbon budget for marketing landing pages ([Part 6](part-6-ai-ethics-sustainability.md) §13).
- **Decision.** Use AVIF compression with a 600 KB cap; serve a `<picture>` with smaller variants; serve a SVG illustration on slow connections via `effective-connection-type` hint.
- **Beauty is preserved with a different technical choice; budget is preserved.**

### 7.11 Decision-framework artefacts

The framework is operationalised through:

- **The five-question Decision Card**, attached to every PR that changes UX: *Is it safe? Is it honest? Is it usable? Is it consistent? Is it beautiful?* Each answer is ✓/✗/N-A, and the explanations are recorded.
- **The pre-merge bot** that blocks merge if the Decision Card has any ✗ on safe, honest, or usable.
- **The retrospective tag** for any surface that shipped with a documented deviation, so the deviation is reviewed in the next governance cycle.

---

## 8. What-Good-Looks-Like Rubric

The rubric is **six acceptance criteria**, each binary pass/fail. A surface ships only if all six pass. The rubric is the concrete expression of the Decision Framework, applied at review time.

### 8.1 Criterion 1 — Brief-aligned

The Surface Brief's intent sentence, actors, and success criteria are met by the surface as shipped. There is no scope drift. New scope is filed as a follow-up brief, not absorbed silently.

### 8.2 Criterion 2 — A11y-clean

- **axe-core** automated score: zero critical and zero serious violations.
- **Manual keyboard traversal** reaches every interactive target; no traps; no missing focus indicators.
- **Manual screen-reader** (NVDA 2025+ on Firefox/Chrome; JAWS 2024+ on Chrome/Edge; VoiceOver macOS 15 on Safari/Chrome; VoiceOver iOS 18 on Safari; TalkBack Android 15 on Chrome) reads the right thing in the right order, in **Vietnamese and English**.
- **Focus order** equals visual order.
- **Focus indicator** meets SC 2.4.13 (Focus Appearance, AAA) — 2 CSS px outline, ≥ 3:1 contrast with adjacent colours.
- **Focus is not obscured** (SC 2.4.11, AA) by any sticky header, FAB, or sheet.

### 8.3 Criterion 3 — VN-correct

- Vietnamese copy passes register, tone, and diacritic tests.
- Stacked diacritics render without clipping at 100 %, 200 %, and 400 % zoom in light and dark modes.
- Vietnamese-specific edge cases (*đ*, *ơ*, *ư*, tone marks on vowels with diacritic base) render correctly in all browsers in the support matrix.
- Screen reader pronunciation is acceptable in the locale's voice synthesiser; pronunciation hints are added where synthesis fails standard tokens (CCCD, PDPL, API).

### 8.4 Criterion 4 — Disclosed

- Every AI output, every background automation, every data-sharing event, every deferred save, and every piece of personal-data collection is **disclosed to the user at the moment of the event**, not later.
- AI outputs carry the `AIDisclosureBadge` and confidence tier per [Part 6](part-6-ai-ethics-sustainability.md).
- Background syncs carry visible status.
- Personal-data collection states purpose and retention at the point of collection.

### 8.5 Criterion 5 — Budgeted

- LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
- JS < 150 KB gzipped on the critical path.
- Surface meets its SWDM v4 carbon budget.
- Measured in production RUM, not in the lab. A surface that meets budgets in lab but exceeds in production has not met this criterion.

### 8.6 Criterion 6 — Legal-clean

- Privacy, consent, AI disclosure, content provenance (C2PA 2.2 where applicable), and accessibility baselines for the locales the surface is deployed in are met and signed off.
- For VN-deployed surfaces: PDPL Art. 10–21 and Decree 356/2025/ND-CP requirements are satisfied (consent unbundled and explicit; data subject rights surfaced; cross-border-transfer disclosure; DPIA for in-scope processing).
- For EU-deployed surfaces: GDPR, EU AI Act applicable provisions, and EAA / EN 301 549 conformance are met.

### 8.7 The self-audit checklist

The self-audit checklist is the **shorter artefact** the team runs **during build** — before the formal rubric — to catch drift early. It lives in the repository at `docs/self-audit.md` and is re-run at the end of each PR. The checklist contains:

- Did you change any token? If yes, link the RFC.
- Did you add any string? If yes, is it in both locales?
- Did you add any interaction? If yes, what is the keyboard path?
- Did you add any automation or AI call? If yes, what is the disclosure?
- Did you change any data-collection? If yes, what is the lawful basis?
- Did you change any motion? If yes, did you respect `prefers-reduced-motion`?
- Did you change any contrast? If yes, did you re-verify SC 1.4.3 / 1.4.11?
- Did you change any sub-brand surface? If yes, did you stay within the OKLCH bounds?
- Did you change any consent surface? If yes, has DPO reviewed?

The checklist is not a governance instrument; it is a **prompt**. Its function is to make each contributor a reviewer of their own work, so that the formal rubric is the last gate, not the first.

### 8.8 Failure modes the rubric catches

- A surface ships with the Vietnamese strings *almost* done (placeholder for one toast). Criterion 3 fails. Surface does not ship.
- A surface ships with axe-core green but a focus trap in a modal. Criterion 2 manual check fails.
- A surface meets LCP in lab but exceeds it in production due to third-party fonts. Criterion 5 production-RUM check fails.
- A surface ships with an AI toggle that summarises documents, but the disclosure badge appears only in the docs, not the surface. Criterion 4 fails.

---

## 9. Competitive Positioning

### 9.1 The reference set

CyberSkill's design system competes in a field of mature enterprise systems. A clear-eyed view of that field is necessary to position the brand honestly.

The **primary reference set** comprises six systems:

- **IBM Carbon Design System** — IBM's enterprise system; tokens, components, accessibility, AI Lab patterns.
- **Material Design 3** including Material 3 Expressive — Google's cross-platform system with dynamic colour and tonal elevation.
- **Microsoft Fluent 2** — Microsoft's cross-product design system spanning Windows, Office, Teams, and Azure.
- **Adobe Spectrum** — Adobe's design system across Creative Cloud and Experience Cloud.
- **Shopify Polaris** — Shopify's merchant-facing design system, with a strong opinion on commerce patterns.
- **GitHub Primer** — GitHub's developer-facing system, with strong open-source contribution patterns.

The **secondary reference set** comprises 14 systems used for benchmarking specific dimensions:

- **Salesforce Lightning Design System (SLDS)** — enterprise CRM patterns; access and audit-rich.
- **Ant Design** — strong China-market localisation and dense data-display patterns.
- **Pinterest Gestalt** — content-rich consumer patterns.
- **Uber Base Web** — strong dark mode and dense map-driven patterns.
- **Nord/Redwood** — northern-design aesthetics; product-shop focus.
- **SAP Fiori** — enterprise resource planning patterns.
- **Workday Canvas** — HR and finance patterns.
- **Intuit Design System** — financial-product patterns and accessibility focus.
- **Mantine** — open-source React component library; strong developer experience.
- **Chakra UI v3** — open-source React; strong theming.
- **Radix Themes** — primitives library and unstyled component contracts.
- **HeroUI (formerly NextUI)** — open-source React with Tailwind integration.
- **Zendesk Garden** — customer-support patterns.
- **Twilio Paste** — communication and identity patterns.

### 9.2 Where CyberSkill is the same

The honest part of any competitive analysis is what we *don't* differentiate on. Every major modern system covers tokens, components, patterns, accessibility, and engineering, and CyberSkill matches their coverage. Specifically:

- **React 19 component idioms** — Actions, `useActionState`, `useOptimistic`, Server Components — are used as-is, not reinvented.
- **React Aria Components** behaviour patterns from Adobe are inherited where they are the state of the art.
- **Radix Primitives** are not re-implemented; the system layers tokens and styling on top.
- **OKLCH** is CSS Color Module Level 4 (W3C); we adopt it, we do not invent a new colour space.
- **WCAG 2.2** is the W3C Recommendation; we comply, we do not redefine.
- **Material 3 tonal elevation** for dark mode is industry consensus; we adopt it.

Pretending we differ on these axes would be dishonest.

### 9.3 Where CyberSkill differs

CyberSkill's distinctive position is the result of seven concrete differentiators, each grounded in a verifiable choice or commitment.

**1. Vietnamese first-class.** No major enterprise system is designed from Vietnamese typography and register outward. Systems that are "localised" into Vietnamese typically inherit Latin-optimised line-heights and tracking, which clip stacked diacritics. CyberSkill's baseline (Be Vietnam Pro with 1.5/1.35 minimums, all-caps tracking +0.04em, validated in every component, screen-reader-pronunciation hints) is **native**, not adapted.

**2. PDPL-ready.** No enterprise system outside Vietnam has Law 91/2025/QH15, Decree 356/2025/ND-CP, and Law 116/2025/QH15 as first-class compliance targets. The CyberSkill consent components, audit-log surfaces, redaction patterns, cross-border-transfer banners, and DPIA workflows are designed around the PDPL articles, not retrofitted.

**3. DTCG 2025.10-native.** Many enterprise systems publish tokens in bespoke JSON shapes; CyberSkill publishes in DTCG 2025.10 (W3C DTCG, 28 October 2025) with `$type`, `$value`, `$description`, and media type `application/design-tokens+json`. This is **machine-agent portability**, not a marketing detail. Style Dictionary v5 consumes the tokens and produces CSS, TypeScript, iOS Swift, Android Compose, React Native, Flutter, and Figma Variables outputs.

**4. MCP-native.** CyberSkill ships **Model Context Protocol** servers as a first-party product (`@cyberskill/mcp-tokens`, `@cyberskill/mcp-components`; spec **2025-11-25**) and an `AGENTS.md` at the monorepo root (agents.md). Agents-as-users is a principle (§4.8); these servers are the engineering correlate.

**5. RFC 9457-native.** Every API surface returns `application/problem+json` per RFC 9457 (July 2023, obsoletes RFC 7807). Most enterprise systems still treat structured error envelopes as optional; CyberSkill treats them as the default contract.

**6. SWDM v4-measured.** Sustainability is a **budget**, not a marketing statement; measured using the Sustainable Web Design Model v4 methodology released **14 July 2025** (sustainablewebdesign.org). Salesforce and Intuit publish sustainability claims; CyberSkill publishes per-surface budgets and real-user measurement.

**7. Warmth.** The warm earth anchors and the *warm and approachable* voice are distinct from the predominantly cool neutrals and procedural tones of the reference set. This is an identity differentiator; it becomes a product differentiator only because it is carried all the way through voice, microcopy, motion, and error handling. Other systems have warm marketing surfaces backed by cool product surfaces; CyberSkill is warm at every layer.

### 9.4 What CyberSkill explicitly does **not** claim

- We do not claim to be the largest or the most-used.
- We do not claim a unique innovation in colour, typography, or motion.
- We do not claim faster build times than any specific competitor without citing measured numbers.
- We do not claim more components than any specific competitor.

What we claim is that the seven differentiators above are simultaneously true, and that the simultaneous truth is what is rare. [Part 10](part-10-measurement-research-appendix.md) contains the full 20-system benchmark matrix with the dimensions tabulated.

### 9.5 Positioning statements

For internal alignment and external messaging, the positioning is summarised as follows:

> *CyberSkill Global Design System is the first enterprise design system designed Vietnamese-first, PDPL-compliant, DTCG 2025.10-native, and Model-Context-Protocol-native — built warm, kept rigorous.*

For markets outside Vietnam:

> *A global enterprise design system from Vietnam — opinionated about consent, accessibility, sustainability, and how AI tells the truth.*

For technical audiences:

> *Tokens in DTCG 2025.10. Errors in RFC 9457. Agents in MCP. Accessibility at WCAG 2.2 AA. Sustainability in SWDM v4. Privacy at PDPL Law 91/2025/QH15. AI at ISO/IEC 42001. Warm earth anchors at OKLCH.*

---

## 10. Naming Guidelines

### 10.1 General rules

- **Component names** are nouns or noun-phrases in English **PascalCase** (`Button`, `DataGrid`, `CommandPalette`).
- **Acronyms** are permitted up to three letters and are capitalised in component names (`URL`, `API`, `PDPL`); longer acronyms are title-cased as words (`Captcha`, `Oauth`).
- **Pattern and surface names** are **title case** in prose (`Empty state`, `Confirmation dialog`).
- **Token names** are **kebab-case** with a predictable structure (`cs-color-bg-surface-1`, `cs-space-4`, `cs-type-body-md`).
- **Event names** are **dot-separated lower-camelCase** (`form.submitted.success`, `modal.opened.destructive`).
- **Package names** are scoped under `@cyberskill/` and lower-kebab (`@cyberskill/react`, `@cyberskill/mcp-tokens`).

### 10.2 Two-name discipline

Every customer-facing element carries an **English name** and a **Vietnamese name**. Vietnamese names are nouns, in standard orthography, **never translated literally**. The system maintains a glossary ([Part 10](part-10-measurement-research-appendix.md) §11) that locks each English-Vietnamese pair at the level of the system, so the same concept is called the same thing in every product.

| English | ❌ Literal | ✓ Idiomatic Vietnamese |
|---|---|---|
| Save changes | Lưu các thay đổi | Lưu thay đổi |
| Are you sure? | Bạn có chắc không? | Bạn có chắc chắn không? |
| Something went wrong | Một cái gì đó đã sai | Đã xảy ra lỗi |
| Loading… | Đang tải… | Đang tải… (OK) |
| Welcome back | Chào mừng quay lại | Chào bạn trở lại |
| Forgot password? | Quên mật khẩu? | Quên mật khẩu? (OK) |
| Sign out | Đăng ra | Đăng xuất |
| Add to cart | Thêm vào giỏ hàng | Thêm vào giỏ |

### 10.3 Domain-suffix discipline

A component name does **not** include its domain unless disambiguation requires it. `Table` is correct; `DataTable` is correct only when there is a second table type. `UserTable` is **never** correct — domain belongs in the product, not in the system.

### 10.4 Screen-reader hint discipline

Every interactive component has an `aria-label` fallback when no visible label exists; the label is **localised**, not English-only. Every Vietnamese label is validated against the screen reader's Vietnamese synthesis; where synthesis fails common patterns (`CCCD`, `PDPL`, `API`), we add a pronunciation hint or fall back to the expanded form in the `aria-label` (e.g., `aria-label="Số căn cước công dân"` instead of `"Số CCCD"`).

### 10.5 Version discipline in names

The title of this document is **The CyberSkill Global Design System**, **without a version number in the title, ever**. Versions appear in the footer, in `package.json`, and in changelogs; they do not appear in the document title, on slide masters, on landing-page heroes, or on the `<title>` element of the documentation site. This rule is **immutable**.

### 10.6 Avoiding name drift

The following naming drifts are common in enterprise systems and are **prohibited** in CyberSkill:

- Adding a marketing prefix (`Smart`, `Pro`, `Plus`) to components.
- Adding emoji to package names or component names.
- Renaming components in product code without updating the design system source.
- Localising component names — components have one English name; only customer-facing labels are localised.

### 10.7 Reserved names

The following names are reserved and may not be used for non-system purposes:

- **CyberSkill, CyberSkill Learn, CyberSkill Work, CyberSkill Secure, CyberSkill AI, CyberSkill Labs** — master and sub-brand names.
- **`@cyberskill/*`** — npm scope.
- **`cs-*`** — token prefix.
- **`Cs*`** in any component name — Lit/Vue web-component prefix.

### 10.8 Naming for change

When a component must be renamed (rare, but it happens), the rename follows the deprecation policy in [Part 7](part-7-engineering-operations.md) §8: the old name remains exported for at least two minor versions with a runtime warning; a codemod is provided; the changelog explains the rationale.

---

## 11. Sub-Brand Framework

### 11.1 The inheritance contract

Every sub-brand inherits, without modification:

1. The Umber and Ochre primary anchors.
2. Be Vietnam Pro (UI/body) and JetBrains Mono (code).
3. The eight core principles and four values.
4. The accessibility, privacy, AI-transparency, and sustainability defaults.
5. The component APIs defined in Part 3.
6. The decision framework and the what-good-looks-like rubric.
7. The voice attributes and tone matrix.
8. The dark-background rule.
9. The clear-space rule.
10. The naming guidelines.

This is the **non-negotiable spine**.

### 11.2 The single permitted override

The accent OKLCH colour, used in the limited scope defined in §2.5.

### 11.3 The OKLCH bounds

| Bound | Min | Max | Reason |
|---|---|---|---|
| Lightness L | 0.52 | 0.78 | Maintains 3:1 against Umber and 4.5:1 against light warm-neutral surfaces |
| Chroma C | 0.12 | 0.20 | Avoids neon saturation that conflicts with the warm-neutral spine |
| Hue H | reserved per sub-brand | — | Locked to assignments in §2.4 |

### 11.4 The sub-brand contract — what each must publish

Every sub-brand publishes:

- A **sub-brand spec sheet** — one page describing the domain, the example products, the accent OKLCH value, and the contact for governance.
- A **sub-brand landing page** — public marketing surface using the accent within the permitted scope.
- A **sub-brand documentation index** — referencing the master docs and adding domain-specific guidance.
- A **sub-brand telemetry tag** — events emitted by sub-brand surfaces are tagged with the sub-brand identifier so adoption can be measured per sub-brand.

### 11.5 Creating a new sub-brand

Creating a new sub-brand is a governance event, not a marketing decision. The process:

1. **Proposal.** An RFC is filed under [Part 8](part-8-governance-legal-commerce.md) governance, including: domain, justification, named accent within the OKLCH bounds, anticipated example products, and the maintainer team.
2. **Two-Core-Maintainer endorsement.** The proposal must be endorsed by two Core Maintainers from different sub-brands.
3. **90-day review.** All existing sub-brands have an opportunity to comment.
4. **Conflict check.** The proposed accent is checked for visual conflict with existing sub-brand accents (perceptual ΔE > 25 in Oklab).
5. **Decision.** Decided by Core Maintainers in the next governance cycle.

Sub-brand proliferation is a tax on recognition; the review exists to keep the tax low. The system does not encourage growth in the number of sub-brands; it encourages depth within the sub-brands that exist.

### 11.6 Retiring a sub-brand

A sub-brand may be retired by the same RFC process. Retirement is announced with a **180-day deprecation window**; products under the sub-brand migrate to the master or to another sub-brand; the accent is **frozen** (not re-issued for at least two years, to prevent confusion with previously-branded surfaces).

---

## 12. Partnership Co-Branding

### 12.1 Definition

A CyberSkill **partnership co-brand** is a visual lock-up of the CyberSkill master or sub-brand mark with a partner organisation's mark, used on co-authored surfaces (joint landing pages, joint research, joint product launches, joint case studies). The rules are strict because co-brand surfaces carry the trust of both brands.

### 12.2 Lock-up format

- The CyberSkill mark is on the **left** in LTR locales and on the **right** in RTL locales (Arabic, Hebrew); the composition mirrors at the layout level, not the glyph level, so Vietnamese type within the lock-up never mirrors.
- The two marks are separated by a **× symbol** (Unicode U+00D7) set in Be Vietnam Pro Regular, **or** an **en-dash** (U+2013), never a plus sign, never a middot, never an ampersand.
- The × symbol is preferred for partnership; the en-dash is preferred for neutral co-location (e.g., joint event logistics).

### 12.3 Clear space

The clear space around the co-brand lock-up is **1×** the x-height of the CyberSkill wordmark on all four sides, measured from the outermost edge of the combined composition. Clear space is exclusive — no type, no art, no interface element may encroach.

### 12.4 Equal optical weight

The two marks are set at **equal optical weight**, measured by cap height or by x-height, whichever is more consistent for the partner's mark. The partner's mark may be scaled so its cap height matches the CyberSkill wordmark's cap height; it may **not** be shrunk below 80 % of optical equivalence.

### 12.5 Contrast

The combined lock-up must meet **WCAG 2.2 SC 1.4.11 Non-text Contrast (3:1)** against its background. If the partner's mark is a colour that fails at the chosen background, the **background changes**, not the marks. For printed surfaces, the **Fogra39** (Europe) or **GRACoL 2013** (US) CMYK profile is used, and the contrast is re-validated on the target substrate.

### 12.6 What is not permitted

- A co-brand may **not carry a third mark**. If a third party is involved, the surface is published with a different layout (e.g., a "with support from" credit line below the lock-up).
- A co-brand may **not appear over a photograph** unless a solid plate provides contrast. Even then, the plate must extend by 1× clear-space outside the lock-up.
- A co-brand may **not appear in motion** where the marks enter at different times (they enter and exit together; this is a brand-fairness rule).
- A co-brand may **not be abbreviated**.
- A co-brand may **not be applied** to surfaces the partner has not approved at marketing-management or higher level.

### 12.7 Approval and audit

Every co-brand surface requires:

- Written approval from the partner's marketing function (referenced in the surface's metadata).
- A signed brand-use agreement on file at CyberSkill Legal.
- An audit trail of the surfaces produced, retained for the duration of the partnership plus three years (PDPL retention scaffolding).

### 12.8 Multi-tier partnerships

Where CyberSkill operates as part of a multi-tier partnership (e.g., reseller chains), the lock-up convention is **per pair**: each pair has its own approved lock-up. There is no transitive lock-up that combines three or more marks.

---

## 13. Cultural Adaptations per Market

Market-specific adaptations apply at the **locale skin**; the global spine (accessibility baseline, consent defaults, AI disclosure) is **unchanged**. The seven primary markets covered here are: **Vietnam** (primary home market), **Japan**, **Saudi Arabia / UAE**, **Korea**, **China**, **India**, and **Indonesia**. [Part 5](part-5-accessibility-localization.md) contains the full 20-locale specification; this section establishes the doctrine and the per-market specifics that affect Foundations.

### 13.1 Vietnam (vi-VN)

- **Calendar.** Gregorian primary; Lunar (*Âm lịch*) secondary where culturally relevant (Tết, rằm, giỗ).
- **Week start.** Monday.
- **Name order.** Family–middle–given. Familiar form is the **given** name (e.g., *Nguyễn Thanh Hà* → *Chị Hà*).
- **Pronouns.** *bạn* (default UI). *anh / chị* (customer-service surfaces). *quý khách / quý vị* (legal / financial). Avoid *em* unless the product is youth-targeted.
- **Address format.** number street, ward (*phường*), district (*quận* / *huyện*), city/province (*thành phố* / *tỉnh*).
- **ID.** CCCD 12-digit.
- **Tax ID.** Mã số thuế (MST).
- **Currency.** VND, no decimals.
- **Number grouping.** Thousands separator `.` (e.g., 1.234.567).
- **Date format.** dd/mm/yyyy.
- **Time format.** 24-hour primary; 12-hour with am/pm acceptable in marketing.
- **Holidays.** Tết (movable), Hùng Kings (10/3 lunar), 30/4, 1/5, 2/9. Workforce policies vary; respect business holiday settings.
- **Cultural notes.** Avoid juxtaposing red-white in mourning contexts; ghost iconography is unwelcome near major holidays; *gia đình* (family) imagery is welcome.
- **Legal overlay.** PDPL Law 91/2025/QH15 (effective 1 January 2026), Decree 356/2025/ND-CP (effective 1 January 2026), Law on Cybersecurity 116/2025/QH15 (effective 1 July 2026); CCCD photos are **sensitive personal data**; cross-border transfers require TIA + CTIA dossier per Art. 20; DPIA filed within 60 days; Resolution 57-NQ/TW (signed 22 December 2024 by General Secretary Tô Lâm) is the digital-transformation directive context.

### 13.2 Japan (ja-JP)

- **Calendar.** Gregorian primary; Imperial era (*Reiwa*) secondary in formal and administrative surfaces.
- **Week start.** Monday (widespread convention) or Sunday (consumer); respect user setting.
- **Name order.** Family–given. Honorifics (*-san*, *-sama*, *-sensei*) attached.
- **Pronouns.** Avoid second-person pronouns where possible; use polite verb forms.
- **Address format.** Large-to-small: prefecture, city, ward, block, building — in contrast to Vietnam's small-to-large.
- **Vertical writing mode.** *Tategaki* supported but not default; reserved for traditional document classes.
- **Currency.** JPY; no decimals.
- **Number grouping.** Thousand separator `,`.
- **Date format.** yyyy/mm/dd.
- **Time format.** 24-hour.
- **Cultural notes.** Avoid the numbers 4 (*shi*) and 9 (*ku*) in primary emphasis positions where their homophones are culturally negative — we do not omit them, but we do not celebrate them. Use *ご* and *お* honorific prefixes appropriately.
- **Legal overlay.** APPI — explicit consent for sensitive data; foreign-transfer restrictions; **personal information** narrower than EU PII.

### 13.3 Saudi Arabia / UAE (ar-SA, ar-AE)

- **Calendar.** Hijri **and** Gregorian, presented together.
- **Week start.** Sunday (KSA, UAE public sector) or Monday (private sector by agreement); respect user setting.
- **Writing direction.** RTL; component mirroring per [Part 5](part-5-accessibility-localization.md).
- **Name order.** Given + father's + grandfather's + family.
- **Currency.** SAR / AED; two decimals standard.
- **Number system.** Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩) optional; Western digits acceptable; respect user setting.
- **Date format.** dd/mm/yyyy.
- **Prayer times.** Respected; do not schedule push notifications during prayer windows (the system reads prayer-time APIs in-region; inactivity bands are honoured).
- **Ramadan.** Reduce motion intensity; soften marketing tone; offer daytime-dim theme toggles; respect Iftar/Suhoor windows in operational notifications.
- **Imagery.** Avoid alcohol, pork, gambling; modesty in figurative art.
- **Legal overlay.** Saudi PDPL (enforced from September 2023 onwards); UAE Federal Decree-Law 45 of 2021.

### 13.4 Korea (ko-KR)

- **Calendar.** Gregorian.
- **Week start.** Monday.
- **Name order.** Family–given; honorifics (*-ssi*, *-nim*) attached.
- **Currency.** KRW; no decimals.
- **Address.** Large-to-small; postal code five digits.
- **Phone.** +82-10-XXXX-XXXX.
- **Density.** High information density accepted; dense table layouts are a competence signal.
- **Legal overlay.** PIPA amendments; data-transfer restrictions; explicit consent for sensitive data; 24-hour breach notification target.

### 13.5 China (zh-CN, zh-TW)

- **Calendar.** Gregorian primary; Lunar secondary.
- **Week start.** Monday.
- **Name order.** Family–given.
- **Currency.** CNY (mainland); TWD (Taiwan).
- **Number grouping.** Standard thousand separator.
- **Scripts.** Simplified by default for zh-CN; Traditional default for zh-TW; user-selectable.
- **Legal overlay.** PIPL (Personal Information Protection Law, 2021) and Data Security Law — cross-border transfer requires CAC approval for certain classes; standard contract for others. Content overlay: compliance with local content regulation. We do not ship surfaces that cannot meet content rules.
- **Cultural notes.** Red and gold auspicious; white funereal; political sensitivity in mapping (boundary disputes, region naming).

### 13.6 India (hi-IN, en-IN, ta-IN, te-IN, kn-IN, bn-IN)

- **Calendar.** Gregorian.
- **Multi-script.** Devanagari, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Punjabi, Malayalam, Odia at the system level.
- **Currency.** INR with **lakh / crore** grouping (`##,##,###.00`) — **not** standard US/EU grouping. This is a frequent bug in non-Indian-built systems and is enforced in our locale tokens.
- **Week start.** Sunday (business) or Monday (organisational); respect user setting.
- **Name order.** Given + family in Hindi belt; given + father's + surname in South Indian conventions.
- **Phone.** +91; ten-digit national number.
- **Legal overlay.** **DPDPA 2023** (Digital Personal Data Protection Act) — explicit consent, restricted cross-border transfer, breach notification.

### 13.7 Indonesia (id-ID)

- **Calendar.** Gregorian.
- **Week start.** Monday.
- **Name order.** Given–family (varies by tradition).
- **Currency.** IDR; two decimals (rare but possible).
- **Address.** RT/RW/desa/kec/kota; complex hierarchical structure.
- **Legal overlay.** PDP Law (Personal Data Protection Law) — explicit consent, DPO required, breach notification 3×24 hours, adequacy regime.

### 13.8 The common cross-market rule

Where a surface's locale overlay would conflict with the **accessibility or consent baseline**, the **baseline wins**. Taboo avoidance never outweighs a legal consent requirement or a WCAG 2.2 AA criterion. This is the global-spine principle in practice.

The locale skin chooses **how**; the global spine chooses **what**.

### 13.9 Locale governance

Each supported locale has a named **locale steward** — a person responsible for keeping the locale tokens, microcopy, taboo list, and legal overlay current. Locale stewards meet quarterly in the locale-stewardship forum. Microcopy changes are reviewed by the steward before merge. Locale stewards are credited in the appendix ([Part 10](part-10-measurement-research-appendix.md)).

---

## 14. References

**Standards & specifications**

- W3C, *Web Content Accessibility Guidelines (WCAG) 2.2 Recommendation*, 5 October 2023. https://www.w3.org/TR/WCAG22/
- W3C, *What's New in WCAG 2.2*. https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- W3C Design Tokens Community Group, *Format Module — Design Tokens 2025.10*, 28 October 2025. https://www.w3.org/community/design-tokens/2025/10/28/
- W3C, *CSS Color Module Level 4*. https://www.w3.org/TR/css-color-4/
- IETF, *RFC 9457 — Problem Details for HTTP APIs*, July 2023. https://www.rfc-editor.org/rfc/rfc9457
- IEEE, *7001-2021 Transparency of Autonomous Systems*.
- ISO/IEC, *ISO/IEC 42001:2023 — Information technology — Artificial intelligence — Management system*. https://www.iso.org/standard/42001
- C2PA, *Technical Specification v2.2*, 1 May 2025. https://c2pa.org/
- Unicode Consortium, *CLDR v47*, March 2025; *ICU 77 — MessageFormat 2.0 stable*.

**EU regulation**

- European Commission, *Regulation (EU) 2024/1689 — EU AI Act*. Entered into force 1 August 2024; prohibited practices and AI literacy applicable 2 February 2025; GPAI obligations 2 August 2025; high-risk obligations 2 August 2026; full applicability 2 August 2027.
- European Commission, *Directive (EU) 2019/882 — European Accessibility Act*. Enforcement from 28 June 2025.
- DLA Piper, *EU AI Act penalty tiers* (€35M / 7 %; €15M / 3 %; €7.5M / 1 %).
- AllAccessible, *EAA national penalty references* (Germany, Italy, France); EN 301 549 presumption of conformity.
- Davis Wright Tremaine, *EAA enforcement begins 28 June 2025*.

**Vietnamese regulation**

- LuatVietnam, *Law on Personal Data Protection — Law No. 91/2025/QH15*, passed 26 June 2025; effective 1 January 2026. https://luatvietnam.vn/
- Tilleke & Gibbins, *Decree 356/2025/ND-CP*, issued 31 December 2025, effective 1 January 2026, replaces Decree 13/2023/ND-CP.
- Tilleke & Gibbins; Mori Hamada & Matsumoto, *Law No. 116/2025/QH15 — Vietnam Cybersecurity 2025*, passed 10 December 2025, effective 1 July 2026.
- Acclime Vietnam, *Sensitive personal data under Decree 356/2025/ND-CP — including photos of Vietnam ID/CCCD/passport*.
- VNETWORK, *PDPL penalty summary — VND 3 billion general; 5 % annual revenue cross-border*.
- Vietnam Law Magazine, *Resolution 57-NQ/TW of the Politburo, signed 22 December 2024 by General Secretary Tô Lâm*.

**Engineering ecosystem**

- Tailwind CSS, *v4.0 release*, 22 January 2025.
- Storybook, *v9 release*, June 2025; *v10 release*, November 2025 (ESM-only).
- React, *19 GA*, 5 December 2024.
- Style Dictionary, *v5*, requires Node 22 LTS; partial DTCG 2025.10 support.
- Anthropic, *Model Context Protocol spec 2025-11-25*.
- Linux Foundation Agentic AI Foundation, *MCP stewardship*.
- agents.md, *AGENTS.md open convention* (60,000+ repositories).
- Sustainable Web Design, *SWDM v4*, 14 July 2025. https://sustainablewebdesign.org/
- web.dev, *View Transitions API — Baseline Newly Available*, October 2025.

**Typography**

- JetBrains, *JetBrains Mono typeface — Philipp Nurullin, project lead Konstantin Bulenkov*. SIL OFL 1.1. https://jetbrains.com/lp/mono/
- *Be Vietnam Pro typeface* — Lâm Bảo, Tony Le, ViệtAnh Nguyễn. SIL OFL 1.1.

**Books and influential frameworks**

- Amber Case, *Calm Technology*, O'Reilly Media, 2015.
- Center for Humane Technology, *Humane Design Guide*.
- Microsoft, *Inclusive Design Toolkit*.
- Material Design 3 (Google) — tonal elevation; Material 3 Expressive.
- IBM Carbon Design System; Microsoft Fluent 2; Adobe Spectrum; Shopify Polaris; GitHub Primer — public documentation, accessed Q1 2026.

---


## 15. Voice principles for AI surfaces

*Operationalised in detail in [Part 14](part-14-content-design.md) §8 (Microcopy for AI surfaces). This section defines voice rules specific to AI-driven UI; pairs with the four voice pillars in §3.*

When CyberSkill products surface AI-generated responses, recommendations, or actions, voice tightens to avoid the failure modes that erode trust in AI products:

1. **No false agency.** AI surfaces never claim subjective experience. Avoid "I think", "I believe", "I feel"; prefer "Based on the data", "According to the source", "The model returned".
2. **No false certainty.** Confidence is shown via the ConfidenceIndicator ([Part 3h](part-3h-ai-chat.md) §5), not implied in the language. Phrases like "Definitely", "Absolutely", "Without a doubt" are forbidden.
3. **No first-person personality drift.** AI surfaces refer to themselves as "the assistant" or use third-person framing; "I" is reserved for the user.
4. **Explicit AI provenance.** Every AI-generated artefact carries the AIDisclosureBadge ([Part 6](part-6-ai-ethics-sustainability.md) §3); reinforcing inline copy ("Generated using AI. Verify before relying.") supports it.
5. **Always cite when claiming facts.** Citations are first-class via CitationCard ([Part 3h](part-3h-ai-chat.md) §4). Unsourced facts are marked "no source available" and flagged for user verification.

These rules constrain — they do not erase warmth. The four pillars (warm, direct, honest, respectful) still apply; AI surfaces simply add five more guardrails on top.

---

## 16. Brand voice anti-patterns

*The earlier-implicit "what the voice is not" made explicit and lint-enforceable. Full banned-phrase catalogue in [Part 14](part-14-content-design.md) §2.3.*

CyberSkill voice excludes the following categories outright. The list is enforced by `@cyberskill/content-lint` ([Part 14](part-14-content-design.md) §10.1):

| Anti-pattern | Why we avoid it |
|---|---|
| **Performative softening** — "We're sorry, but…", "Oops!", "Whoops!" | Trivialises problems; weakens delivery of bad news |
| **Patronising fillers** — "Just click", "Simply enter", "Don't worry" | Implies the user is incapable; signals problem where there is none |
| **Vague vacuum** — "Something went wrong", "An error occurred", "Please try again later" | Provides no information; user has no path forward |
| **Corporate jargon** — "Synergy", "leverage" (as a verb), "circle back", "best-in-class", "thought leader", "ninja", "rockstar", "guru" | Empty signalling; reads as deck noise |
| **Saccharine confirmation** — "Awesome!", "Sweet!", "All good!" | Inflates routine confirmation; reads as bot-generated |
| **AI-cliché flourishes** — "I'd be happy to", "Certainly!", "Of course!" | AI-product clichés; user knows they're not talking to a friend |
| **Inflated punctuation** — multiple exclamation marks; decorative em-dashes | Tone inflation; distracts from content |
| **Vague link text** — "Click here", "Read more" | A11y violation (link without context) |

This list is not exhaustive; the canonical-phrase glossary in [Part 14](part-14-content-design.md) §2.6 catalogues preferred substitutions.

---

## 17. Multi-product brand architecture

*Extends §11 (sub-brand framework) for the case where CyberSkill ships multiple products under its umbrella. Operationalised in [Part 13](part-13-theming-whitelabel-embed.md) §6 (Sub-brand systems).*

When CyberSkill ships its second, third, or N-th product, the brand architecture must flex without breaking. Three patterns are available; we choose per case.

### 17.1 Branded house (preferred default)

Every product carries the CyberSkill master mark; sub-product names are descriptors. Examples:

- **CyberSkill Atlas** — analytics product.
- **CyberSkill Loom** — collaboration product.

Pros: brand strength concentrates on the master mark; cross-sell easier; trust transfers.

Cons: every product's reputation reflects on the master.

Apply when products share the same buyer, sit in the same trust ecosystem, and benefit from cross-sell.

### 17.2 House of brands

Each product carries its own primary mark; CyberSkill is the parent (often subtle).

Pros: products can address very different markets without brand dilution.

Cons: each product builds brand equity from scratch; cross-sell weaker.

Apply rarely; only when a product genuinely serves a different audience that would not respond to the parent's positioning.

### 17.3 Endorsed brand

A product carries its own primary mark with an explicit endorsement: "by CyberSkill" / "a CyberSkill product".

A middle ground; useful when a sub-product has earned its own brand equity (e.g., post-acquisition) but benefits from parent association.

### 17.4 Decision framework

```
Does the product serve the same buyer as the master?
├─ Yes → Branded house (default)
├─ Partially → Endorsed brand
└─ No (truly different audience) → House of brands (justify in RFC)
```

### 17.5 Product naming under a branded house

- The master remains "CyberSkill".
- Sub-product names follow Part 1 §10 naming rules.
- Sub-product Wordmark sits beneath master in lockup; never replaces master.
- Sub-product accent token may shift (per [Part 13](part-13-theming-whitelabel-embed.md) §6.2); colour palette otherwise inherits.
- Sub-product RFC ([Part 8](part-8-governance-legal-commerce.md) §2 + sub-brand RFC subtype) required before launch.

### 17.6 Sub-brand consistency

A user inside any sub-product still:

- Recognises the CyberSkill family lockup.
- Encounters consistent UX (one design system).
- Has accounts portable across the family (single sign-on).
- Receives consistent voice (this part §3 + §15 + §16).

This is non-negotiable. The whole reason for a branded-house architecture is the consistency it preserves; we don't fork the doctrine per product.

*End of Part 1 — Foundations.*
