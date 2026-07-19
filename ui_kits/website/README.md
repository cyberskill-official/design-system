# cyberskill.world — UI kit

A high-fidelity recreation of the **CyberSkill marketing site** home page — the public front door for the Saigon studio whose guide is **Lumi**, the golden genie. Bilingual (EN + VN), lead-generation first.

## What it demonstrates
- **Glass header** (`cs-surface-light`) with the Logo lockup, nav, a **language toggle** (EN ⇄ Tiếng Việt — flips every string, Vietnamese-first), a theme toggle, and a "Talk to Lumi" CTA.
- **Hero** over the warm `aurora-gold` wash with an umber protection gradient: eyebrow, the Ochre slogan + Vietnamese counterpart, lead, a **"make a wish"** input, and Lumi floating alongside.
- **Keyword marquee** band (real "what we build" terms).
- **Services** — three Standard-Glass cards.
- **Process** — the four-step "arc of a wish".
- **Careers** umber band + **Contact** form built from the design system's `cs-field` controls.
- **Lumi chat** — a floating launcher opens a scripted genie panel (real greeting + quick "wish" chips); typing a wish in the hero seeds the conversation.

## Files
- `index.html` — entry; loads `styles.css`, `site.css`, React, and the app.
- `work.html` — case-study grid + results band (static, `.cs-*` classes; dark toggle).
- `careers.html` — values, open roles, culture CTA (static; dark toggle).
- `chat.html` — full-page **Lumi assistant**: composes `PromptInput`, `ChatMessage`, `PromptSuggestions`, `TypingIndicator`, `CitationList`, `ConfidenceMeter`, `AIDisclosureBadge`, and `LumiAvatar` from the bundle.
- `site.css` — bespoke marketing section styles, all driven by design tokens.
- `copy.js` — real EN + VN copy lifted from the product i18n dictionaries (`window.SITE_COPY`).
- `Website.jsx` — the interactive app (`window.Website`).

## Fidelity notes
The production site layers a **3D cosmic scroll-story and a Claude-powered Lumi genie** (R3F + GSAP) over this HTML-first base — that base is the real product and is what's recreated here. The chat is scripted (no live model), copy is real, and colours/type/spacing come from the design tokens. Exact service and case-study copy lives in the production CMS; the service cards here use the real "what we build" categories.
