# CyberSkill Global Design System

> **Turn Your Will Into Real — Hiện Thực Hoá Ý Chí**

## Start here

This is the **entrance document** for the CyberSkill Design System — **v5.0.0** (see `VERSION` · changelog below). Open **`dashboard.html`** for the single-page hub (components + playgrounds · health · identity, all in one). One sentence: a warm, Vietnamese-first, enterprise-grade system where every surface resolves three independent axes — **Theme** (light · dark) × **Element** (Ngũ Hành product identity: Kim · Mộc · Thủy · Hỏa · Thổ, 15 variants) × **Expression** (treatment: liquid-glass default · solid · dense · paper · soft · bold · luxe).

**Quick start by audience**
- **Designers** — open the Design System tab and the Templates picker (84 starting points, including the 41-document lawyer-validated Employment Suite); the Identity Lab (`ui_kits/status-hub/identity-lab.html`) lets you flip axes live.
- **AI agents** — read `SKILL.md` (normative Hard rules + orientation), then the guide below; component contracts live beside each component (`.d.ts` + `.prompt.md`).
- **Consuming projects** — link **`styles.css`** (one file = everything), or copy a `templates/<slug>/` folder and edit one line in its `ds-base.js` (one-line rebind, validated end-to-end Jul 2026). Scope identity with `data-theme` · `data-cs-element` (+`data-cs-variant`) · `data-cs-expression`.

**Document map**

| Doc | What it answers |
|---|---|
| `README.md` (this file, below) | The full guide: anchors, voice, visual foundations, components, templates, index |
| `SKILL.md` | Agent entry — hard rules + fast orientation |
| `docs/conventions.md` | How to extend the system (naming grammar, checklists, the four axes, decision log) |
| `docs/products.md` | Product → element registry (provisional) |
| `docs/contrast-report.md` | Generated APCA report — 0 failures at Lc ≥ 60 |
| `docs/agents.md` | AI-agent import one-pager (Claude Code · no-build React · static HTML · DTCG token pipelines) |
| `docs/template-schema-v2.md` | Typed content-slot spec for templates — opt-in, machine-checkable |
| `docs/deploy.md` | Deploying the live site — Vercel (zero-config) · generic VPS/nginx · post-deploy checklist |
| `docs/ci-cd.md` | CI/CD automation — GitHub Actions workflow, headless gate runner, token-provenance pre-check, badge |
| `docs/audit-v3.md` | Final deep audit (v3.0.4): findings by severity, deploy verdict, Vercel showcase map, v4 roadmap |

---

A warm, enterprise-grade, **Vietnamese-first** design system for **CyberSkill** — a Saigon software studio (est. 2020) that turns a clear *wish* into working software. Anchored on **Umber** and **Ochre**, guided by **Lumi** the golden genie. This project packages CyberSkill's tokens, components, brand assets, and product recreations so any agent can design on-brand artifacts and production UI.

Consumers link one file: **`styles.css`**.

## Sources

Built by reading CyberSkill's own repositories — explore them for deeper fidelity:

- **Design system** (tokens, React components, brand assets, doctrine, style packs): https://github.com/cyberskill-official/design-system
- **Marketing site** (Next.js, bilingual, Lumi genie, in-repo icon set): https://github.com/cyberskill-official/landing-page
- **Audit framework** (referenced): https://github.com/cyberskill-official/design-system-audit-framework

The doctrine itself is the single-file `DESIGN.md` (22 Parts, ~1.3 MB) in the design-system repo; tokens come from `@cyberskill/tokens`, components from `@cyberskill/react`, the master mark from `@cyberskill/brand-assets`. Where a value here differs from a guess, **the repo source wins** — every token and component in this project was lifted from that code.

---

## Anchor immutables (never change these)

| Immutable | Value |
|---|---|
| **Slogan** | *Turn Your Will Into Real* / *Hiện Thực Hoá Ý Chí* |
| **Primary brand** | **Umber** `#45210E` · `oklch(0.265 0.073 44.3)` |
| **Primary accent** | **Ochre** `#F4BA17` · `oklch(0.811 0.162 83.7)` |
| **Voice** | warm · direct · honest · respectful (a chord — all four at once) |
| **Vietnamese-first** | every UI string ships an EN + VN pair |
| **Accessibility floor** | APCA Lc ≥ 75 body text, focus rings never removed, ≥ 44px touch targets |

---

## CONTENT FUNDAMENTALS

**Voice is a four-axis chord, sounded all at once:** *warm · direct · honest · respectful.* Never "fun/playful/edgy" — that is explicitly off-brand.

- **Warm, human, second-person.** Speak to "you"; the studio is "we". Lumi speaks as "I". Copy is gentle and encouraging, never corporate. e.g. *"Lovely. What should I call you?"*, *"The lamp is resting for a moment."*
- **Direct and concrete.** Short sentences, plain outcomes, no hedging. e.g. *"Send a short note. We reply within one business day."*, *"Built to ship, and built to last."*
- **Honest about trade-offs.** The brand advertises candour: *"senior, small, and honest about trade-offs."* Risks are stated in words, never hidden or colour-only.
- **Respectful of consent & privacy.** Ask before contacting; promise not to share. e.g. *"Your details go straight to the team. We never share them."*
- **The "wish" metaphor is the spine.** Products are *wishes*; Lumi (a golden genie) *grants* them by handing them to a real human team. Verbs: *make a wish, grant, shape it, ship, last.* Use it warmly, never gimmicky.

**Casing & mechanics:** Sentence case for headings and buttons (*"Make a wish"*, *"Tell us your wish"*). UPPERCASE + wide tracking only for small eyebrows/labels/table headers. Titles avoid trailing punctuation; body uses full stops. Numerals as digits (*"one business day"* in prose is fine, but *"3 business days"* for concrete SLAs). Em dashes for asides.

**Bilingual (Vietnamese-first):** Every user-facing string has an EN + VN counterpart or an explicit deferral note. VN is a first-class citizen, not a translation afterthought — diacritics are preserved everywhere (*Nguyễn Hoàng Vũ*, *Hiện Thực Hoá Ý Chí*). Vietnamese-safe line-heights (body 1.5 / heading 1.35) leave room for stacked marks.

**Emoji:** **Not used** in product UI or brand copy. Meaning is carried by words and the line-icon set, not emoji. (The mascot and the sparkle "wish" glyph do the affective work.)

---

## VISUAL FOUNDATIONS

**Palette — warm earth, never cold.** Umber `#45210E` grounds everything (it *is* the primary text colour); Ochre `#F4BA17` is the single accent — CTAs on dark, focus rings, highlights, the genie. Surfaces are warm paper: page `#FFFDF8`, panel `#FFFFFF`, raised `#FBF4E9`. Every neutral is warmed toward umber — borders are `#E7D9C6`, muted text `#6E5A4C`. Semantic colours (success `#166534`, danger `#B42318`, warning `#92400E`, info `#1D4ED8`) are used sparingly and never as the only signal. **Max one accent per surface** — on core surfaces that accent is Ochre; a *product* may swap in its element accent (see Elemental identity below), never add a second hue beside it. No bluish-purple gradients.

**Typography.** UI/display: **Be Vietnam Pro** (300–800; a Vietnamese-first Google family). Code/data: **JetBrains Mono**. Display headings are heavy (800), tight tracking (−0.02em); body is 400/500 at 1.5. Uppercase eyebrows at 0.08–0.12em tracking. The size ramp runs xs 12 → 5xl 60 on a 16px base.

**Spacing & layout.** 4px base grid (`--cs-space-*`); section padding lives between 64 and 96px; content max-width ~1200–1320px. Generous, calm whitespace.

**Corners & cards.** Radii: sm 4, md 8 (default), **lg 14 (cards/panels)**, full 999 (pills, inputs, chips). A default card = white panel, 1px warm border `#E7D9C6`, 14px radius, soft warm shadow. No coloured-left-border cards.

**Surfaces — Liquid Glass (the default treatment).** Five materials over the anchors: **Whisper** (hero washes), **Light** (nav/sidebar), **Standard** (cards over imagery), **Heavy** (modals/popovers), **Solid** (dense content, tables). Glass = `color-mix` translucency + `backdrop-filter` blur/saturate + a 1px lens-edge gradient. It is **opt-in and additive** — apply a `cs-surface-*` class after checking APCA against the backdrop; dense content stays Solid. Collapses to solid under `prefers-reduced-transparency`, `forced-colors`, print, and unsupported browsers.

**Shadows** are warm and umber-tinted (`rgba(69,33,14,…)`), a soft five-step scale from `xs` hairline to `xl` dialog lift. Never grey, never harsh.

**Depth** is an explicit z-scale mapped to glass tiers: bg 0 → section 5 → card 10 → nav 50 → modal 100 → toast 200.

**Backgrounds & imagery** glow from within: deep-umber darks with **warm gold particle light** (`aurora-gold.jpg`), never cold or flat — and each element carries its own wash (`assets/aurora-{hoa,thuy,moc,kim}.png`, applied via the `.cs-aurora-wash` overlay class; Thổ's is the official gold). Photography is warm-toned. Full-bleed umber sections anchor heroes, careers bands, and footers; on umber, the Ochre slogan and white body carry the message. The mascot, **Lumi**, is a polished golden genie rendered on transparent backgrounds.

**Elemental product identity — Ngũ Hành.** The studio itself is **Thổ/Earth** (Umber + Ochre — the traditional earth-yellow); each CyberSkill *product* may take one element — **Kim** (metal) · **Mộc** (wood) · **Thủy** (water) · **Hỏa** (fire) · **Thổ** (earth) — via `data-cs-element` (+ `data-cs-variant`, e.g. Hỏa: ember · lava · plasma). Each pack sets the nine **`--cs-accent-*`** role tokens (accent / strong / bright / on / tint / ink / glow / grad-a / grad-b) defined in `tokens/elements.css`; inside the scope the element fully takes Ochre's accent roles. Never elemental: semantic statuses, and the **3px Ochre focus ring** — the studio's accessibility signature on every product. Mixing follows the cycles: a secondary element may appear only as a gradient endpoint along **Tương sinh** (Mộc→Hỏa→Thổ→Kim→Thủy→Mộc); **Tương khắc** pairs never mix. Product→element mapping lives in `docs/products.md`. **Every template carries the Element tweak** — anything that should follow the product's element must consume `--cs-accent-*`, never raw hex. **Lumi stays golden in every element** — the genie is the studio's constant; only the environment re-tints.

**Expressions — the treatment axis.** Surfaces resolve **Theme × Element × Expression** independently. An expression (`data-cs-expression="solid|paper|soft|bold"`, default liquid-glass) re-tunes t

**Density — the size axis (v3.5).** `data-cs-density="compact"` on any container tightens control metrics (button md 44→36, field 44→38) for dense product surfaces; comfortable is the default and identical to pre-3.5 rendering. Pointer-fine-gated — on touch, the 44px floor from `base/a11y.css` stays authoritative.reatment only — radius, shadow, glass scalars, border weight, motion — by overriding the existing tokens in `tokens/expressions.css`; hue, voice, semantics, and a11y floors are untouchable. The registry is curated (capped at seven — extended 6→7 by owner decision, Jul 2026, now full): `solid` (flat, Swiss-calm), `dense` (operational data UI; coarse pointers keep the 44px floor), `paper` (editorial, print-true), `soft` (plush, rounded), `bold` (neubrutalism, warmed — umber frames, hard offset shadows), `luxe` (ceremonial — pill CTAs, hairline borders, deep soft glow, unhurried motion). Neon/cyberpunk, memphis, and full skeuomorphism are rejected by doctrine.

**Motion** is calm and purposeful: short durations (120–320ms), a soft decelerate `cubic-bezier(0.2,0,0,1)`, small translate/scale and fades (e.g. the hero mascot's gentle float). No bounce, no flash. Everything collapses to 0 under `prefers-reduced-motion`.

**Interaction states.** Hover: brighten ~8% (filled) or fill to `surface-raised` (subtle). Press: a 0.5–1px nudge. Focus: a **3px Ochre ring, 2px offset** — always visible, never removed. Disabled: opacity 0.58. Touch targets ≥ 44px on coarse pointers.

**Transparency & blur** appear only on glass surfaces and the hero wish-input — deliberate, backed by fallbacks — never as decoration.

---

## ICONOGRAPHY

CyberSkill ships **no external icon library**. It uses its own small **in-repo line-icon set** (from the marketing site, `TASK-DS-010`): each icon is data (a viewBox + primitive paths) rendered through one `<Icon>` component. Style: **line icons, `currentColor` stroke, 1.75 weight, round caps/joins, 24×24 viewBox** — so icons follow the surrounding text token and recolour by setting `color`. Sizes come from `--cs-icon-sm|md|lg` (16/20/24).

The set: `close · sun · moon · arrow-right · check · sparkle · chat · sound-on · sound-off`, extended in v2.0 with `search · sliders · upload · download · calendar · user · plus · trash · external · menu` and in v2.13 with `chevron-down/up/left/right · edit · copy · info · alert-triangle` (same grammar, marked as extensions). `sparkle` is the brand's **"wish"** glyph. **No emoji** and no unicode-glyph icons in product UI. The one exception to "line icons" is the **brand mark** (`Logo`) and **Lumi** mascot, which are filled artwork.

Copied assets live in `assets/`: `logo-mark.svg` / `logo-mark.png` (official master mark, Umber ground + Ochre genie), `favicon.svg`, `aurora-gold.jpg` (warm gold hero wash), `lumi-poster.webp` (the golden-genie mascot). **The logo is the real master file — never recreate, recolour, or approximate it;** for third-party tenants, swap the tenant's own logo.

---

## Components

**A comprehensive library — 113 exports across 8 groups.** Each has a `.jsx`, a `.d.ts` props contract, a `.prompt.md`, and a Design-System card. Mount from the compiled bundle. The bundle's global is `window.CyberSkillDesignSystem_<projectId>` — the 6-hex suffix is assigned by the compiler and **changes when this system is imported into another project**, so resolve it by prefix rather than hardcoding it: `const CS = window[Object.keys(window).find(k => /^CyberSkillDesignSystem_/.test(k))]; const { Button } = CS;`

- **Core — actions & overlays** — `Button`, `Dialog`
- **Forms** — `TextField`, `Textarea`, `Select`, `Checkbox`, `RadioGroup` (+ `Radio`), `Switch`, `SearchField`, `NumberField`, `Slider`, `FileUpload`, `SegmentedControl`
- **Data & layout** — `DataTable`, `Card` (+ `CardHeader`, `CardBody`, `CardFooter`), `Stat`, `Avatar` (+ `AvatarGroup`), `Tooltip`, `Divider`, `List` (+ `ListItem`), `DescriptionList`, `Timeline`, `Accordion`, `Kbd`, `CodeBlock`
- **Feedback & status** — `Badge`, `Tag`, `Alert`, `Toast` (+ `ToastStack`), `Spinner`, `ProgressBar`, `Skeleton`, `StatusIndicator`, `EmptyState`
- **Navigation** — `Tabs` (+ `Tab`), `Breadcrumb`, `Pagination`, `Menu` (+ `MenuItem`), `Sidebar` (+ `NavItem`), `Steps`, `CommandPalette`
- **Overlays** — `Popover`, `Drawer`
- **AI-native** — `AIDisclosureBadge`, `HumanReviewGate`, `PromptInput`, `ChatMessage`, `ConfidenceMeter`, `PromptSuggestions`, `TypingIndicator`, `CitationList`
- **Brand** — `Logo`, `Icon`, `LumiAvatar`

**Atomic tiers** — the same 113 exports seen through the design-composition lens (browsable live in `guidelines/atomic-view.html`, where one toolbar reskins every tier across Theme × Element × Expression). The eight groups above are the *functional/import* grouping (how the bundle is organized); these tiers are the *composition* grouping — same components, two lenses.
- **Atoms** (indivisible primitives) — `Button`, `Icon`, `Badge`, `Tag`, `StatusIndicator`, `Spinner`, `ProgressBar`, `Skeleton`, `Avatar` (+ `AvatarGroup`), `Divider`, `Kbd`, `Logo`, `LumiAvatar`, `Toggle`, `Link`
- **Molecules** (a few atoms bonded into one control) — `TextField`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `SearchField`, `NumberField`, `Slider`, `FileUpload`, `SegmentedControl`, `Tabs`, `Breadcrumb`, `Pagination`, `Menu`, `Steps`, `Stat`, `Card`, `Tooltip`, `List`, `DescriptionList`, `CodeBlock`, `Alert`, `Toast`, `ConfidenceMeter`, `AIDisclosureBadge`, `PromptSuggestions`, `TypingIndicator`, `CitationList`, `Rating`, `InputOTP`, `ButtonGroup`, `Combobox`, `InputGroup`, `TagInput`, `TimePicker`, `HoverCard`, `Popconfirm`, `ContextMenu`, `FloatingActionButton`, `InlineEdit`, `Toolbar`, `Anchor`, `Image`, `Watermark`, `BackTop`, `Mentions`, `ColorPicker`, `QRCode`
- **Organisms** (composite, self-contained sections) — `Sidebar` (+ `NavItem`), `CommandPalette`, `DataTable`, `Accordion`, `Timeline`, `EmptyState`, `Dialog`, `Drawer`, `Popover`, the `PromptInput` + `ChatMessage` conversation, `HumanReviewGate`, `Calendar`, `DatePicker`, `Result`, `Menubar`, `NavigationMenu`, `Carousel`, `Comment`, `Form` (+ `FormField`), `Tree`, `TreeSelect`, `Cascader`, `Transfer`, `Tour`, `Masonry`, `Splitter`, `HotKeys`, `Dock`, `DataGrid`, `TreeTable`, `Sortable`, `Chart`, `Editor`, `Terminal`

Highlights: **Button** — Umber primary; variants primary/secondary/tertiary/ghost/danger/danger-ghost; sizes xs–lg; loading, icon, fullWidth. **TextField / Textarea / Select** share one `.cs-field` frame (label + description + inline error; diacritic/IME-safe). **DataTable** — caption, scoped headers, per-column render, empty state. **Card** — warm panel + header/body/footer. **Logo** renders the exact official mark; **Icon** drives the in-repo line-icon set. The **AI-native** family carries the brand's explainability doctrine — disclosure, human review, wish capture, and confidence, all stated in words (never colour alone).

**Source inventory vs. extensions.** `@cyberskill/react` ships six primitives — `Button`, `TextField`, `Dialog`, `DataTable`, `AIDisclosureBadge`, `HumanReviewGate` — plus `Logo` (`@cyberskill/brand-assets`). Everything else is an **intentional extension** built in the brand's own token vocabulary so consumers have a complete working kit: `Icon` (the marketing site's real in-repo line-icon set), the standard Forms / Feedback / Data / Navigation / Overlays primitives (search, stepper, slider, file upload, list, description list, timeline, accordion, kbd, code block, sidebar, steps, command palette, popover, drawer, and more), added AI-native pieces (`PromptInput`, `ChatMessage`, `ConfidenceMeter`, `PromptSuggestions`, `TypingIndicator`, `CitationList`) that formalise the Lumi wish-flow, and the `LumiAvatar` mascot. None invent new visual language — they reuse the anchors, surfaces, type, and motion already defined.

---

## Templates

Copyable starting points for consuming projects (the **Templates** picker — these replace the old per-component "starting points"). Each lives in `templates/<slug>/` as a Design Component that loads this system via a sibling `ds-base.js`.

- **Marketing page** (`templates/marketing-page/`) — bilingual landing: umber hero with a `PromptInput` wish box, service cards, process band, Lumi chat launcher.
- **Dashboard** (`templates/dashboard/`) — Status-Hub-style portfolio: KPI `Stat`s, `Tabs` board/table lenses, status cards with `ProgressBar` + `Badge`, and a `DataTable`.
- **Slide deck** (`templates/slide-deck/`) — 16:9 brand deck: umber title + closing, ochre accents, light content layouts.
- **Sign in** (`templates/auth/`) — split auth: umber brand panel + form (`TextField`, `Switch`, `Button`).
- **Settings** (`templates/settings/`) — `Tabs`, form fields, switches, and a danger zone.
- **App shell** (`templates/app-shell/`) — `Sidebar` nav, topbar with `SearchField`, KPI `Stat`s, and a `DataTable`.
- **Article** (`templates/article/`) — long-form post: title, author meta, prose, `Alert` callout, `CodeBlock`.
- **Email** (`templates/email/`) — centred 600px announcement: umber header, ochre CTA, footer.

Every template exposes the **Element (Ngũ Hành)** tweak (15 variants) and the **Expression** tweak (7 treatments) plus a behavior toggle; screen templates also carry theme light/dark, and the letter-print business docs are **light-only** (no theme tweak — print doctrine).

### Team artifact templates

Branded documents, emails, reports, and decks per department — each a copyable `.dc.html` composing the design-system components. Groups now cover **Tech, Team, HR, Board, Marketing, Culture, Delivery, Legal, Finance, Sales** — the full operations map (coverage research, Jul 2026). Counsel-gated drafts (PIP, board resolution, VN employment contract) ship **banner-marked**: legal/HR review is mandatory before real use.

- **Tech** — `tech-release-notes` (release email), `tech-incident-report` (blameless postmortem: timeline + action table), `tech-rfc` (design doc: proposal, trade-offs, rollout).
- **Team** — `team-meeting-agenda` (time-boxed items, owners, decisions log, ground rules).
- **HR** — `hr-announcement` (team-news email). *(The offer letter, onboarding checklist, and job description now live in the lawyer-validated Employment Suite below as `vn-offer-letter`, `vn-onboarding-checklist`, and `vn-job-description`.)*
- **Board** — `bod-report` (quarterly review: KPI stats, portfolio table, risks, AI-assisted disclosure), `bod-deck` (16:9 board deck — stacked slides, PDF/PPTX-exportable), `bod-memo` (one-page exec memo with a single ask).
- **Marketing** — `marketing-campaign-brief` (objective, audience, channels, metrics), `marketing-newsletter` (“The Lamp” issue email), `marketing-launch` (product launch announcement), `marketing-case-study` (result hero, proof stats, quote — print-ready), `marketing-press-release` (dateline, boilerplate, media contact — print-ready).

### Business, legal & sales templates

Print-ready letter documents and client decks — the paperwork a studio actually sends. Legal and finance docs are Letter-sized with an `@page` + `@media print` block, so **File → Print / Save as PDF** paginates cleanly with 0.6in margins; on screen they render as a warm sheet on a desk.

- **Legal** — `legal-msa` (master services agreement — the umbrella SOWs hang off: definitions, IP, fees, liability, term), `legal-sow` (statement of work: deliverables & milestone tables, fees, acceptance, sign-off). *(The standalone mutual NDA now lives in the Employment Suite as the lawyer-validated `vn-mutual-nda`.)*
- **Finance** — `finance-invoice` (bill-to/from, line items in đồng, VAT, total, bank details), `finance-quote` (scoped estimate with optional add-on, valid-until, accept CTA).
- **Sales** — `sales-one-pager` (leave-behind: umber hero, services, proof stats, the wish process, contact CTA), `sales-proposal-deck` (8-slide 16:9 client proposal — the wish, understanding, approach, scope, timeline, team, investment, next steps).

**Bilingual — full coverage.** Every one of the 84 templates is bilingual. The 37 `vn-*` HR-suite instruments and the three `doc-*` references are Vietnamese-first with English stacked beneath (Ink/Slate). Every other template carries a **Language** tweak (*English · Tiếng Việt*) that swaps the entire body between the two; several emails (`email`, `marketing-launch`, `tech-release-notes`, `delivery-status-email`, `finance-dunning-email`) add a *Both* mode that stacks them. Legal and finance docs (MSA, SOW, invoice, quote) print their Vietnamese side as an **unreviewed draft** behind a warning banner stating the English governs — have counsel review before real use. As of v2.6.0 the last English-only holdouts — board & comms (`bod-report`, `bod-deck`, `bod-investor-update`, `bod-resolution`) and the client decks/docs (`sales-proposal-deck`, `tech-rfc`, `delivery-kickoff`, `delivery-qbr-deck`) — carry the tweak too.

### Reference documents (govern EVERY template)

Three suite-wide reference documents define and catalogue the whole template library — legal, HR, finance, sales, client-facing paperwork, and EN-first communications alike. They live in `templates/doc-*/` and print as A4 bilingual documents themselves:

- **Documents · Style Guide** (`templates/doc-style-guide/`) — the presentation standard: palette, type ramp, bilingual Ink/Slate rule, tables, fill-ins, tick-boxes, signing blocks, data hygiene, header/footer (Articles 1–10, verbatim from the lawyer-validated original), plus **Article 11 — scope & archetypes**, mapping the A4 rules onto Letter-print, email, product-screen, deck and social archetypes.
- **Documents · Suite Index & Usage Guide** (`templates/doc-suite-index/`) — Part I catalogues every template by group (HR suite, legal, finance, sales, product, comms); Part II is the usage guide (employment lifecycle, which documents carry disciplinary force, the eight house presentation rules, and the 8-step “add a new template” workflow).
- **Documents · Templates** (`templates/doc-templates/`) — Part A is the blank A4 bilingual shell (header, title block, sample clause, Party A pre-filled / Party B blank, signing block); Part B is the archetype map (A4 · Letter print · email · product screen · deck · social) with an example per family.

### HR & Employment Suite (lawyer-validated)

Thirty-seven **counsel-validated** bilingual instruments supplied by the client (built on an earlier version of the system) were **converted one-by-one into templates, content preserved verbatim**, and re-skinned to the latest design system. They live under the **HR Suite** group (`templates/vn-*/`) and follow the house standard set out in the reference documents above: **A4, Vietnamese-first bilingual** (Ink `#1A1614` VN over Slate `#3F4C55` italic EN pairs), state-motto header, umber table title bars, yellow fill-in blanks, PDPL data-hygiene (Party B always blank), and signing blocks that never split. Every one carries the Element (15) + Expression (7) tweaks like all templates; none carries a language tweak (they are inherently bilingual). Because these are validated instruments, **`vn-labor-contract` supersedes the earlier fictional `legal-employment-contract`**, and `vn-mutual-nda` / `vn-offer-letter` / `vn-onboarding-checklist` / `vn-job-description` supersede the fictional `legal-nda` / `hr-offer-letter` / `hr-onboarding` / `hr-job-description` (all removed); the remaining fictional templates are EN-first comms (announcements, newsletters, press releases) and client-facing sales/finance paperwork — a different purpose, so they stay.
- **Core employment** — `vn-labor-contract`, `vn-probation-contract`, `vn-offer-letter`, `vn-ndnca-ip` (bảo mật · không cạnh tranh · SHTT), `vn-appointment-transfer`, `vn-contract-amendment`, `vn-termination-decision`, `vn-exit-handover` (with settlement + handover schedules).
- **Compensation & rewards** — `vn-total-rewards-appendix`, `vn-phantom-stock`, `vn-salary-scale`, `vn-compensation-regulation`.
- **Policies & regulations** — `vn-internal-labor-regulations`, `vn-disciplinary-schedule`, `vn-performance-evaluation-regulation`, `vn-grassroots-democracy`, `vn-code-of-conduct`, `vn-infosec-policy`, `vn-data-protection-policy`, `vn-remote-work-policy`, `vn-travel-expense-policy`.
- **Hiring & records** — `vn-job-description`, `vn-onboarding-checklist`, `vn-receipt-acknowledgement`, `vn-labour-management-book`, `vn-foreign-employee-pack`, `vn-pdpl-consent`.
- **Performance & requests** — `vn-performance-review-form`, `vn-employee-request` (leave · overtime consent · other).
- **Outside relationships** — `vn-internship-agreement`, `vn-contractor-agreement`, `vn-sow-appendix`, `vn-mutual-nda`.
- **Discipline & exit** — `vn-disciplinary-case-file` (4-part A→D), `vn-resignation-letter`, `vn-certificate-of-employment` (deliberately neutral), `vn-training-commitment`.

These are the client's validated legal text; keep the content as-is and have counsel review any edits before real use.

### Component coverage map

How the templates exercise the component library — every group is covered by at least one starting point:

| Component group | Exercised by templates |
|---|---|
| **Core** (Button, Dialog) | marketing-page · auth · settings · sales-one-pager · finance-quote |
| **Forms** (TextField, Select, Switch, SearchField…) | auth · settings · app-shell |
| **Data & layout** (Stat, DataTable, Card, Avatar, Divider) | dashboard · app-shell · bod-report · sales-proposal-deck · hr-announcement |
| **Feedback & status** (Badge, Alert, ProgressBar) | dashboard · bod-report · bod-memo |
| **Navigation** (Tabs, Sidebar, NavItem) | dashboard · app-shell · settings |
| **AI-native** (AIDisclosureBadge, PromptInput) | marketing-page · bod-report |
| **Brand** (Logo, Icon, LumiAvatar) | every template |

Raw markup (numbered clauses, invoice tables, milestone rows) in the legal/finance/HR-suite docs is composed from tokens + `.cs-*` type utilities rather than components, by design — these are documents, not app UI. Their frame is defined by the three reference documents (Style Guide · Suite Index & Usage Guide · Templates), not the component library.

### Archetype coverage map

Every template resolves to one of six archetypes, framed by `templates/doc-templates`:

| Archetype | Frame | Templates |
|---|---|---|
| **A4 bilingual instrument** | State-motto header · Articles · Party A/B tables · signing block; Style-Guide 1–10 in full | the 37 `vn-*` HR-suite instruments |
| **Letter print doc** | Letter, 0.6in margins, desk + sheet, clean Print/PDF | `finance-invoice` · `finance-quote` · `finance-expense-report` · `legal-msa` · `legal-sow` · `sales-one-pager` · `bod-*` docs |
| **Email (600px)** | Centred body, system header/CTA, no motto/signing; bilingual via Language tweak | `email` · `hr-announcement` · `marketing-newsletter` · `tech-release-notes` · `delivery-status-email` · `finance-dunning-email` |
| **Product screen** | Components + tokens; Theme × Element × Expression; no print geometry | `marketing-page` · `dashboard` · `app-shell` · `auth` · `settings` · `article` |
| **Deck (16:9)** | Stacked 16:9 slides, umber cover, element accent, bilingual via Language tweak, PDF/PPTX | `slide-deck` · `bod-deck` · `sales-proposal-deck` · `delivery-qbr-deck` |
| **Social image** | Fixed per-channel size (1080² · 1200×630 · 1080×1920) | `marketing-social-kit` |

---

## Index / manifest

```
styles.css                 ← single entry point (@import manifest only) · VERSION 2.4.0
tokens/                    fonts · colors · typography · spacing · elevation · motion · component-tokens · elements (Ngũ Hành packs) · expressions (treatment packs)
base/                      reset · typography · components · forms · feedback · data · navigation · ai · controls · collections · shell · glass · interaction
components/                button · textfield · dialog · datatable · forms · feedback · data · navigation · overlays · ai · logo · icon · brand
                           (each Name: Name.jsx + Name.d.ts + Name.prompt.md; one *.card.html per group)
guidelines/                specimen cards (Colors · Type · Spacing · Surfaces · Brand incl. Iconography · Motion incl. Interaction · Elements ×3 · Expressions · Responsive & Bilingual)
templates/                 marketing-page · dashboard · slide-deck · auth · settings · app-shell · article · email (copyable .dc.html)
                           + team artifacts — tech (release/incident/rfc) · team (meeting-agenda) · hr (announcement) · board (report/deck/memo) · marketing (brief/newsletter/launch/case-study/press-release)
                           + business — legal (nda/msa/sow) · finance (invoice/quote) · sales (one-pager/proposal-deck) — letter print docs + client deck
                           + Documents (reference, govern all templates) — doc-style-guide · doc-suite-index (index & usage) · doc-templates (archetypes)
                           + HR Suite — 37 lawyer-validated bilingual A4 instruments (vn-*); content verbatim, latest-DS skin
ui_kits/status-hub/        Status Hub recreation (index · login · settings · project · identity-lab + status.css · data.js · StatusHub.jsx)
ui_kits/website/           cyberskill.world recreation (index · work · careers · chat + site.css · copy.js · Website.jsx)
ui_kits/deck/              brand deck on deck-stage (index.html; deck-stage runtime lives in templates/_vendor/, outside the compiled bundle; export PPTX/PDF on demand)
assets/                    logo-mark.svg/png · favicon.svg · aurora-gold.jpg + aurora-{hoa,thuy,moc,kim}.png · lumi-poster.webp
docs/                      conventions (incl. decision log) · products registry · contrast report
fonts/                     self-hosted Be Vietnam Pro + JetBrains Mono woff2 (latin · latin-ext · vietnamese)
thumbnail.html             project tile
SKILL.md                   Agent-Skills-compatible entry
```

**UI kits** (product recreations, composing the tokens + `.cs-*` classes): **Status Hub** (portfolio dashboard — KPIs, board/table/releases lenses, drawer — plus **sign-in**, **settings**, **project detail**, and the **Identity Lab** for live Theme × Element × Expression switching), **cyberskill.world** (bilingual marketing home with Lumi chat — plus **Work**, **Careers**, and a full-page **Lumi assistant**), and a **Brand deck** (16:9, `deck-stage`, PDF/PPTX-ready). See each kit's `README.md`.

**Design System tab** renders every card: Components (113 exports — Core, Forms, Data, Feedback, Navigation, Overlays, AI-native, Brand), Colors, Type, Spacing, Surfaces, Brand, Motion, Responsive & Bilingual, **Elements**, **Expressions**, plus the Status Hub (incl. Identity Lab), Website, and Deck surfaces.

---

## Changelog

> Full version history: [`CHANGELOG.md`](./CHANGELOG.md). Recent releases below.

- **5.0.0** (Jul 2026) — **The v5 cut**: rolls up A11y CSSOM gate, template content-schema v2, visual regression depth (12 baselines), CI/CD automation, and docs search — fast board grew 13→16 gates, all whole-set audits re-verified.
- **4.5.0** (Jul 2026) — **Docs-site niceties**: full-text search across every doc in the Docs tab; OG social-image recipe documented in `docs/deploy.md`.
- **4.4.0** (Jul 2026) — **CI/CD automation**: GitHub Actions workflow (headless Playwright gate run + browser-free token-provenance check + docs/bilingual merge blockers). See `docs/ci-cd.md`.
- **4.3.0** (Jul 2026) — **Visual regression depth**: baselines grown 9→12, incl. `dashboard-dark` anchoring the v4.0.0 APCA dark-pack repaint.
- **4.2.0** (Jul 2026) — **Template content-schema v2**: opt-in `content-schema.json` sidecars declare typed content slots (text/richtext/image/link/list/table/date) for a template's existing holes — no markup changes. 3 exemplars ship (product/document/deck); new gate validates shape + bidirectional hole-matching.
- **4.1.0** (Jul 2026) — **A11y-harness promoted to a real gate**: fixed 2 real gaps found while building it (Switch/Slider had no coarse-pointer treatment; Splitter's resize handle had zero focus indicator). Floors read from source, tiered per control, focus-visible proven by static scan.
- **4.0.2** (Jul 2026) — **Re-import bug fixed**: `docs/sync.md` never listed `_esm/` in the round-trip file set, so a faithful port skipped it as a presumed build artifact. Added explicitly + a warning against inferring gitignore status from an underscore prefix. New `docs/deploy.md` (Vercel/VPS); fixed a dangling `docs-src/` reference; junk cleanup.
- **4.0.1** (Jul 2026) — **Behavior gate de-flaked**: `until()` polling replaces fixed waits on DOM-appearance asserts (verifier-caught under-load flake).
- **4.0.0** (Jul 2026) — **The v4 cut.** Dark elemental packs are APCA-derived (owner-approved; 15/15 hold the targets, gate #14 enforces them) + the v4 batch roll-up: Density axis · ESM entry · Form controller. Schema v2 deferred to v4.x.
- **3.8.0** (Jul 2026) — **APCA dark-pack preview** (decision artifact): current dark elemental packs measured 0/15 against APCA targets; derived proposals pass 15/15 — awaiting owner approval before any token change.
- **3.7.0** (Jul 2026) — **Form controller unification**: `Form` gains `rules`/`initialValues` + a context registry; `name`d FormFields auto-wire value/onChange and per-field errors; manual usage unchanged. Behavior gate 20→21; new Form organism story.
- **3.6.0** (Jul 2026) — **ESM entry point** (`_esm/cs.mjs`): one no-build `import` for all 113 components (self-ensures React + bundle, prefix-resolved); ESM smoke gate enforces export/manifest parity.
- **3.5.0** (Jul 2026) — **Density axis (v4 batch 1)**: opt-in `data-cs-density="compact"` control metrics (pointer-fine-gated; defaults byte-identical), wired across Atomic View/playground toolbars, specimen card, DTCG overrides + natives, plus a fast density gate and a whole-set compact overflow audit.
- **3.4.0** (Jul 2026) — **Token pipeline**: pre-generated native builds (`tokens/native/` — SwiftUI · Compose · Flutter) + `tokens/provenance.json` (sha-256 pinning); parity gate in the fast runner keeps them lockstep with the DTCG source.
- **3.3.1** (Jul 2026) — **A11y gate hardened against background-iframe focus quirks** (action retries + focus spies) — proven green direct + runner ×2.
- **3.3.0** (Jul 2026) — **Visual regression**: per-tier baselines 3→9 (archetypes + kitchen-sink composite + UI-kit Pages); visual-diff wired into the runner as an advisory freshness row.
- **3.2.0** (Jul 2026) — **A11y depth**: Dialog/Drawer focus trap + restore (+ Dialog Escape), roving tabindex on Tabs/SegmentedControl/Menubar, Combobox `aria-activedescendant`; new a11y interaction gate in the fast runner + advisory QR reader-scan sanity check (jsQR round-trip incl. VN UTF-8).
- **3.1.0** (Jul 2026) — **v3.1 live-site polish**: dashboard Docs tab (in-page markdown viewer), gate-status badge (last run persisted by the runner), Atomic View per-story permalinks, OG meta, `package.json` (version gate-checked) + `docs/agents.md`.
- **3.0.4** (Jul 2026) — **Final deep audit + deploy readiness** (`docs/audit-v3.md`): whole-tree scans clean (component units complete, assets all referenced, zero debt markers); added root `index.html` → dashboard so static hosts serve `/`; honest dashboard version fallback. Verdict: ready to deploy as source of truth.
- **3.0.3** (Jul 2026) — **Gate-runner hardening**: copy-report button now works in embedded previews (selection-first copy + honest failure state); behavior gate gets React/bundle preflight, per-test + suite watchdogs and progress reporting — a timeout now names the stalled test instead of a bare `{"timeout":true}`.
- **3.0.2** (Jul 2026) — **Gate-coverage audit**: registry scan clean, behavior tests 11→20 (all green), kits added to the responsive audit.
- **3.0.1** (Jul 2026) — **Import health report** in the gate runner (paste-ready per-gate diagnostics for re-imports).
- **3.0.0** (Jul 2026) — **The v3 cut.** Bilingual-by-rule everywhere (components resolve `[lang]`; EN·VI registry + parity gate), 5-tier Atomic View with a Language axis, Element/Expression made visibly distinct, and 46 new components (67→113 exports). Breaking: built-in component strings now localize automatically.
- **2.38.0** (Jul 2026) — **v3 Batch 7c: Chart · Editor · Terminal — Batch 7 complete; all v3 components built.** 110→113 exports.
- **2.37.0** (Jul 2026) — **v3 Batch 7b: DataGrid · TreeTable · Sortable.** 107→110 exports.
- **2.36.0** (Jul 2026) — **v3 Batch 7a: Masonry · Splitter · HotKeys · Dock.** 103→107 exports.
- **2.35.0** (Jul 2026) — **v3 Batch 6c: ColorPicker · Tour · QRCode** — Batch 6 complete. 100→103 exports.
- **2.34.0** (Jul 2026) — **v3 Batch 6b: TreeSelect · Cascader · Transfer · Mentions.** 96→100 exports.
- **2.33.0** (Jul 2026) — **v3 Batch 6a: Form (+FormField) · Tree · BackTop · Watermark.** 91→96 exports.
- **2.32.0** (Jul 2026) — **v3 Batch 5 (part 2): Menubar · NavigationMenu · Carousel · Comment** — Batch 5 complete. 87→91 exports.
- **2.31.0** (Jul 2026) — **v3 Batch 5 (part 1): Link · Anchor · Image · Toolbar** — nav/display set, bilingual by rule. 83→87 exports.
- **2.30.0** (Jul 2026) — **v3 Batch 4: HoverCard · Popconfirm · ContextMenu · FloatingActionButton · Result · InlineEdit** — overlays/feedback set, bilingual by rule. 77→83 exports.
- **2.29.0** (Jul 2026) — **v3 Batch 3: Calendar · DatePicker · TimePicker** — VN-first date/time (Monday week-start, T2–CN, DD/MM/YYYY via i18n `formatDate`, 24h). 74→77 exports.
- **2.28.0** (Jul 2026) — **v3 Batch 2 (part 2): Combobox · InputGroup · TagInput** — full bilingual units (source + contract + prompt + styles + registry + stories). Batch 2 component set complete (71→74 exports).
- **2.27.0** (Jul 2026) — **v3 Batch 2 (part 1): Toggle · Rating · InputOTP · ButtonGroup.** Four new bilingual-by-rule input components (full units: source + `.d.ts` + `.prompt.md` + registry strings + Atomic View stories/playgrounds + token-based styles).
- **2.26.1** (Jul 2026) — **v3 Batch 1b.** All three UI kits fully bilingual (owner decision A): website work/careers toggle wired, deck EN⇄VN toggle, Status Hub UI + mock data EN⇄VN (`SH_VI`).
- **2.26.0** (Jul 2026) — **v3 Batch 1 cut.** Bilingual retrofit complete: 16 components wired, templates verified (lang-bound roots), Atomic View fully EN·VI. Kits: website home already bilingual; work/careers toggle static; status-hub/deck EN-only pending the recreation-boundary decision.
- **2.25.0** (Jul 2026) — **v3 Batch 1 (components).** 16 components retrofitted onto the bilingual registry via a `useLang` hook (built-in strings switch EN·VI by nearest `[lang]` ancestor); parity 16/16, behavior 11/11.
- **2.24.0** (Jul 2026) — **v3 Batch 0.** Bilingual foundation (`components/_i18n/` — lang resolve + EN·VI registry + VN format utils + `bilingual-parity` gate), Expression **type treatment** (heading weight/tracking per expression), and Atomic View → **5 tiers** (adds Templates + Pages) with a **Language axis** — all four axes now browsable on every artifact.
- **2.23.0** (Jul 2026) — **Element reach.** Elements now wash page/panel/raised surfaces + borders with their accent (not just buttons/links) so switching Element visibly reskins the whole surface — contrast-safe, contrast-guard green. Plus v3 planning docs (`design-styles.md`, updated `v3-roadmap.md`).
- **2.22.0** (Jul 2026) — **Single-page dashboard** (`dashboard.html`): one tabbed hub embedding the Atomic View (components + playgrounds), the gate runner, and the Identity Lab, with live version/counts. The single entry point.
- **2.21.2** (Jul 2026) — **Gate runner** (`_audit/run.html`): one-click board running all 8 fast deterministic gates with an aggregate pass/fail. All green.
- **2.21.1** (Jul 2026) — **Improve-loop fixes.** `dashboard` project-code labels remapped `brand-umber`→`text-accent` (were near-invisible in dark); `contrast-guard.html` now scans full screen-template bodies + adds a 15-scope element-pack accent-contrast section (WCAG advisory, APCA is the system metric). All screen templates theme-safe.
- **2.21.0** (Jul 2026) — **Contrast guard + coverage/behavior gates + Atomic View controls.** New `contrast-guard.html` (static umber-on-dark lint + token-pair WCAG matrix in light+dark — the reliable dark-contrast gate; caught a real `.cs-empty__icon` defect) and `story-coverage.html` (every primary component has an Atomic View story). Behavior test 5→11 (Menu/Popover/Dialog/Drawer/Pagination/Segmented). Atomic View gained a live controls panel (Button/Badge/Alert).
- **2.20.0** (Jul 2026) — **Atomic View — a Storybook for the system.** New `guidelines/atomic-view.html`: every component (42 stories) grouped Atoms/Molecules/Organisms, each rendered live and reskinned across **Theme × Element × Expression** from one toolbar — filter, jump-nav, portal components framed inline. One click from the Design System tab (new *Atomic View* card) or open standalone.
- **2.19.1** (Jul 2026) — **Dark-mode contrast + table/wordmark fixes (user-reported).** Base `[data-theme="dark"]` overrides for nav-item-active + secondary/tertiary/ghost buttons (umber text was near-invisible on dark — one base fix, every template/card); `marketing-page`/`app-shell` brand wordmarks now use `--cs-color-text-primary` (flip to cream in dark, unchanged in light); `bod-minutes` NO. column `white-space:nowrap`; shell-card command-palette clip fixed.
- **2.19.0** (Jul 2026) — **Audit symmetry + DTCG + behavior/visual gates.** Language and theme now have race-free, all-84 whole-set gates matching responsive: `language-overflow.html` (VN forced on all 84 — **84/84, 0 overflow/clip**) and `theme-overflow.html` (dark forced on all 84 — **hard gate green: dark-applies + 0 dark overflow**; contrast kept *advisory* because a DOM walk can't read painted fg/bg reliably — verified false reads on decks that render fine). Added `component-behavior-test.html` (drives real Switch/Accordion/Tabs/CommandPalette interactions + asserts state), `visual-diff.html` (baseline review assist), and `tokens/tokens.dtcg.json` (**W3C DTCG** export for Tokens Studio / Style Dictionary). All gates green.
- **2.18.0** (Jul 2026) — **Responsive: no horizontal scroll on phone/tablet.** A whole-set audit (all 84 templates, fresh iframes) caught real overflow at mobile 390 — doc write-on lines, the app-shell (shell grid + DataTable), the 16:9 decks, and the marketing-page header. Fixed in `base/responsive.css` (`overflow-wrap:anywhere` on doc surfaces, app-shell shell-grid collapse + table scroll, `.cs-canvas-desk` scrolls at all widths) plus two in-source fixes; **84/84 now = 0 document overflow at 390**, desktop unchanged. The Responsive preview (`_audit/responsive-harness.html`) now covers **all 84 templates** (manifest-driven, grouped, filterable) at mobile/tablet/desktop.
- **2.17.0** (Jul 2026) — **Namespace portability — zero-touch re-import.** The compiled bundle's global is `window.CyberSkillDesignSystem_<projectId>`, whose 6-hex suffix is compiler-assigned and changes on import into another project — so hardcoding it (`…_847b3c`) broke ~23 files on every re-import. Now the whole system resolves it dynamically: `ds-base.js` publishes a stable `window.CyberSkillDS` alias (all 84 templates mount through it); cards, the UI-kit chat page, the standalone email, and the audit harnesses resolve by prefix. Docs teach the portable pattern; new guard `_audit/namespace-portability.html` scans every manifest-indexed source (84 templates + 56 cards + kit pages) and fails on any hardcoded suffix — green. Re-import is now zero-touch.
- **2.16.1** (Jul 2026) — **Maintenance: count reconciliation + consumer-path health re-proof.** Corrected a stale Templates count in the README Quick-start (85→84, the compiler's true count); re-ran `_audit/consumer-smoke-test.html` on the *freshly-compiled* bundle — **PASS** (68 namespace exports · tokens resolve · 11 key components mount · umber `Button` inherits the brand token). Reconciled the 67-vs-68 export denominator: 3 internal data constants (`CS_ICONS`, `CS_LOGO_*`) sit beside the 67 `.d.ts`-paired components — not a registration gap. Added `_audit/docs-consistency.html` — an automated guardrail asserting every count/version claim in the live docs matches the compiler's manifest (caught + fixed a stale `llms.txt` component-file count).
- **2.16.0** (Jul 2026) — **Optional-set completion (O1–O3).** Built the remaining send-path email-safe copy-swaps (`email-launch/status/announcement/investor` — bilingual, table-based, leak-scanned clean); the playground element picker now covers all 15 Ngũ Hành variants; added `docs/consuming.md` (how an external project adopts the system — static stylesheet vs. compiled bundle vs. templates — and upgrades safely).
- **2.15.0** (Jul 2026) — **Consumer proof, playground & imagery finish (S1–S3).** Added a consumer smoke test (`_audit/consumer-smoke-test.html`, PASS — imports the packaged bundle + styles the way an external project would); finished the social-kit slots (link + story); added `templates/playground.html` (live Theme × Element × Expression switcher).
- **2.14.0** (Jul 2026) — **Image-slot retrofits (R1–R4).** Applied the real-imagery pattern to `marketing-page`, `marketing-social-kit` (square), and `culture-event-invite` heroes — source-ordered `<image-slot>` behind aurora + warm scrim, verified. `article` skipped (text-first layout).
- **2.13.0** (Jul 2026) — **Consumer polish & completeness (K1–K6).** Finished the email-safe set (newsletter + dunning structures); retrofitted `<image-slot>` into `marketing-case-study` (+ documented pattern); split history into `CHANGELOG.md`; added `CONTRIBUTING.md`; extended the icon set 19→27 (chevrons, edit, copy, info, alert-triangle); confirmed RTL-readiness (logical properties, verified at `dir="rtl"`).
- **2.12.0** (Jul 2026) — **Dev-consumer & imagery polish (M1–M5).** (M1) Generated machine-readable token exports — `tokens/tokens.json` + `tokens/tokens.js` (ESM), root grouped by 16 categories plus theme/element/expression override maps (134 root · dark/system 22 · 15 elements · 6 expressions); regenerate from `tokens/*.css`. (M2) Added `templates/email-safe/` — a send-ready, table-based, fully-inlined bilingual email (bulletproof CTA, Outlook conditionals, preheader, email-safe fonts, dark-mode-safe brand colors) as the canonical pattern for the DC emails, which use client-stripped modern CSS. (M3) Rebuilt the Motion specimen card with **live** animating easing tracks + duration chips (was a static value table). (M4) Added the `<image-slot>` mechanism + `templates/image-slots-demo.html` showing the layout-safe real-imagery pattern (full-bleed hero with warm scrim, avatars, card images). (M5) Added `templates/kitchen-sink.html` — the whole component library in one scroll for fast cross-component review.
- **2.11.0** (Jul 2026) — **Follow-up polish (N1–N6).** (N1) Closed the last bilingual-`lang` gap: wrapped every `sc-if isVN` block in the 24 dual-block templates with a layout-neutral `<div lang="vi" style="display:contents">`, so VN is pronounced correctly even in *Both* mode. (N2) Added a token-contract test — static (element role-token completeness + no undefined `var()` in tokens/base) and runtime (`_audit/token-contract.html`); both pass. (N3) Verified print-CSS is identical across all 61 docs and triggered a real A4 PDF export for visual pagination confirmation. (N5) Added `[data-theme="dark"]` shadow overrides (near-black) so elevation reads on dark surfaces — the umber-tinted light shadows vanished there. (N6) Added `_audit/index.html`, a launcher for the whole verification suite. (N4) Seeded `_audit/baselines/` with product/document/deck reference captures for visual regression.
- **2.10.3** (Jul 2026) — **Dual-block *Both*-mode language marking (N1).** Wrapped every `sc-if isVN` block in the 24 dual-block templates with a layout-neutral `<div lang="vi" style="display:contents">`, so VN text is pronounced correctly even in **Both** mode (where the root carries the primary `en`). Verified: email in Both mode renders both languages with the VN block under `lang="vi"` and no layout shift. Closes the last documented bilingual-`lang` gap — pronunciation is now correct in every language mode.
- **2.10.2** (Jul 2026) — **Bilingual `lang` rollout completed + P6 fix confirmed.** Extended screen-reader language marking from the 37 `vn-*` instruments to **all 44 tweakable bilingual templates** — each root now binds `lang="{{ langAttr }}"` to the Language tweak (injected into `renderVals`; 23 swap + 21 dual-block), so switching to Tiếng Việt marks the document `lang="vi"` (verified: email resolves `vi` in VN mode). Every bilingual template now carries a root `lang`. Also re-ran `_audit/component-children-test.html` against the freshly-compiled bundle: all 8 hardened void-element components mount cleanly with stray children (`anyThrew: false`) — the P6 fix is confirmed at runtime. Remaining nuance: dual-block **Both** mode marks the root primary (`en`) with VN blocks unmarked (per-block `lang="vi"` is the documented refinement).
- **2.10.1** (Jul 2026) — **Docs & tooling (Phase 7).** Verified every one of the 55 components ships a `.prompt.md` (complete AI-consumer coverage). Formalized `_audit/` as a named regression suite in `_audit/README.md` (responsive · vn-overflow · a11y · component-children harnesses + exports), and cleaned stray captures. Synced `SKILL.md` — added an **Exporting** section (PPTX/PDF/standalone paths), refreshed the a11y hard-rule (coarse-pointer 44px, reduced-motion, prefers-contrast, dark AA) and the guidelines groups. Contribution/expansion process is the Expansion rule + the `docs/conventions.md` decision log (no separate file needed).
- **2.10.0** (Jul 2026) — **Component gaps & API consistency (Phase 6).** Audited the 55-component / 67-export set — coverage is complete (all common primitives present: Tooltip, Popover, Alert, Badge, Tag, EmptyState, ProgressBar, Skeleton, Spinner, Card, Avatar, Accordion, CommandPalette, Sidebar, Steps, …); DatePicker/Combobox are deliberately out of scope for a base DS. Hardened the whole void-element family against the React #137 footgun that hit `settings`: TextField, Checkbox, Radio, Switch, SearchField, NumberField, Slider, and Divider now destructure `children` out of `...props` so a stray child can never spread onto an `<input>`/`<hr>`. State coverage is supported across the set (Button loading/disabled, fields error/disabled/readOnly, plus EmptyState/Skeleton/Spinner/ProgressBar). Retained `_audit/component-children-test.html` to re-confirm against each fresh bundle.
- **2.9.2** (Jul 2026) — **Responsive completeness verification (Phase 5).** Deep-checked print + ultrawide, no changes needed. Print is clean by construction: a whole-project scan found the only bare `@media (max-width)` queries are `.cs-dialog` (640px, below A4/Letter print width so never fires on paper; dialogs aren't printed) and exempt UI-kit/vendor pages — every responsive collapse rule in `responsive.css`/`a11y.css` is `@media screen`, so no screen reflow reaches print. Confirmed every content template caps its width (emails 600–640px · docs 760–820px · article 720px · decks/social/dashboard 1280px), so nothing stretches at ultrawide; app-shell is intentionally full-width. Inline-grid collapse is handled globally by `responsive.css §7`.
- **2.9.1** (Jul 2026) — **Typography & locale verification (Phase 4).** Deep-checked the Vietnamese type foundations — no code changes needed, all sound: both self-hosted fonts ship a full `vietnamese` subset for every weight; line-heights are VN-safe (`:where(h*)`=1.35 + balanced wrap, `.cs-display`=1.15); and a scan confirmed English-format dates appear only in English branches while VN branches use VN formats (`DD/MM/YYYY`, `₫` suffix, dot-thousands). Codified the VN typography + locale conventions in `docs/conventions.md`.
- **2.9.0** (Jul 2026) — **Contrast & theming (Phase 3).** Audited every dark-theme text/surface pairing (all pass WCAG AA body, 9–15:1) and confirmed the 15 elemental packs still pass APCA Lc ≥ 60 (unchanged). Verified dark completeness: core dark already remaps the primary button to Ochre and warms the field border, so no dark control is low-contrast. Added a high-contrast accommodation — `@media (prefers-contrast: more)` strengthens the soft hairline border + muted text on request. Documented the new dark-semantic pairings in `docs/contrast-report.md`.
- **2.8.0** (Jul 2026) — **Accessibility hardening (Phase 2).** Added `base/a11y.css`: 44px touch targets on `@media (pointer: coarse)` for every interactive control (tabs, pagination, menu items, stepper, checkbox/radio, segmented) while keeping desktop mouse density, plus a global `prefers-reduced-motion` safety net. Fixed a real focus-ring regression — `.cs-menu__item` set `outline:none` on `:focus-visible` (keyboard users got no ring); now a 3px inset ochre ring. Marked the 37 Vietnamese instruments `lang="vi"` for correct screen-reader pronunciation (bilingual `lang` convention documented). Fixed a real **dark-theme contrast defect** found by a full pairing audit: the semantic colours had no dark overrides and failed on dark surfaces (~2.5:1); added dark-safe `success/danger/warning/info` (now 6–10:1). Verified component ARIA is already complete across all interactive components. Audit harness: `_audit/a11y-harness.html`.
- **2.7.0** (Jul 2026) — **Export & handoff fidelity (Phase 1).** Proved and hardened every export path, all preserving Vietnamese. (1) **All 61 document templates are now one-click PDF-exportable** — added `<meta name="omelette-owns-print">` to each doc's raw `<head>` so the browser print engine paginates them at A4/Letter (the export dialog now accepts them directly; no rebuild). (2) **All 4 decks export to editable PPTX in VN** — verified by unzipping the slide XML: VN diacritics survive as native text runs (26–69 runs/deck, zero empty, only the Logo is an image). (3) **Standalone offline-HTML path proven** for DCs — the dynamic `ds-base.js` loader is invisible to the bundler, so the pattern is a same-folder `*-standalone.html` copy with static `<link>`/`<script>` resource tags; shipped a VN email bundle (fonts inlined, faithful offline). (4) Documented the **export-path matrix + font-embedding policy** in `docs/conventions.md`. Artifacts in `_audit/exports/`.
- **2.6.2** (Jul 2026) — **Deep-verification pass (found real bugs).** A complete VN render audit forced every one of the 44 toggle-able templates into Tiếng Việt (via `__dcSetProps`) and measured clipping/overflow — **0 offenders**, diacritics clean at display and body sizes. It caught a genuine crash: `settings` passed a `TextField` value as **children**, which the component spreads onto its `<input>` (a void element) → **React #137 on every prop re-render** (any tweak toggle, not just language); fixed by using `default-value`, and documented the rule (never children on `TextField`). Also: **print regression fixed** — responsive media rules are now `@media screen` so a <900px print page keeps the native A4/Letter layout instead of collapsing; **mobile touch targets** (§8) grow sidebar nav rows (39→44) and the search input (26→44) to the 44px floor on ≤760px; dark-theme reflow confirmed (layout and theme are orthogonal at 390px). New dev harnesses in `_audit/` (responsive + VN overflow). Verification-depth rule codified in `CLAUDE.md`.
- **2.6.1** (Jul 2026) — **Responsive & bilingual hardening.** Fixed the responsive layer, which was inert: its `[style*=…]` selectors used no-space syntax while the DC runtime serializes React styles *spaced* (`grid-template-columns: repeat(4, 1fr)`), so nothing matched. Rewrote every substring selector, added inline fixed-column grid collapse (3+→2 tablet, →1 phone) and deck/social `cs-canvas-desk` scroll (keeps export geometry), and **verified at 390/768/1280 px** via a new harness (`_audit/responsive-harness.html`) — reaching into the same-origin frames confirmed the 4-col agenda bar collapses 4→2→1 and decks scroll with 3-col slides intact. Header eyebrow labels (Agenda, Runbook, Master agreement, …) now swap with the Language tweak. Ran a **complete bilingual audit across all 84 templates** (mechanism, en/vi key parity, hole coverage, hardcoded-leak scan): parity clean everywhere, and fixed 6 residual leaks — `delivery-change-note` English-month dates + party name, `article` team label, `marketing-page` footer slogan + "golden genie", and the board runway unit (`19 mo`→`19 tháng`).
- **2.6.0** (Jul 2026) — **Full bilingual coverage + responsive layer.** The last 8 English-only templates gained the *English · Tiếng Việt* Language tweak — board & comms (`bod-report`, `bod-deck`, `bod-investor-update`, `bod-resolution`) and client decks/docs (`sales-proposal-deck`, `tech-rfc`, `delivery-kickoff`, `delivery-qbr-deck`). **All 84 templates are now bilingual** (37 `vn-*` + 3 `doc-*` stacked Vietnamese-first; every other template swaps via the Language tweak, several emails add *Both*). Also shipped a global responsive layer (`base/responsive.css`) — fluid media, print-doc padding reflow, table + fixed-canvas scroll (decks/social carry `cs-canvas-desk` and scroll to keep export geometry), sidebar collapse, and inline fixed-column grids that collapse (3+→2 on tablet, →1 on phone) across every archetype; its `[style*=…]` selectors match the DC runtime's spaced style serialization (`grid-template-columns: repeat(4, 1fr)`). Enforced full **language separation**: swept the header brand line to the canonical bilingual lockup (`Hiện Thực Hoá Ý Chí · Turn Your Will Into Real`) across 17 doc headers, and made every header eyebrow label (Agenda, Runbook, Master agreement, …) swap with the tweak — a selected language now renders with no stray English/Vietnamese (rule codified in `docs/conventions.md`).
- *Older releases (2.5.0 → 1.7.0): see [`CHANGELOG.md`](./CHANGELOG.md).*

## Substitutions & caveats

- **Fonts:** Be Vietnam Pro (300–800 + italics) and JetBrains Mono are **self-hosted** in `fonts/` as subset-split woff2 (latin · latin-ext · vietnamese) — no CDN dependency. Same families as the source (which ships them via `next/font`); no visual substitution.
- **Type size ramp & motion tokens** are a documented convention layered on the doctrine (the token source ships families + line-heights only); they mirror real in-product usage. The ramp also carries semantic role aliases (`--cs-text-h1`…) and `.cs-h1` / `.cs-body` / … utilities in `base/typography.css`.
- **UI kits are cosmetic recreations** — data is fictional, interactions are shallow, and the marketing site's production 3D/genie layer is not reproduced (the HTML-first base is).

*Welcome. Hiện Thực Hoá Ý Chí.*
