# The CyberSkill Global Design System

## Part 8 — Governance, Legal, Commerce

*The system as a contract. This Part documents the governance model that decides how the system evolves, the legal regime that governs every personal-data flow, and the commerce patterns that turn the design system into revenue. Three concerns sit together because they are inseparable: governance without legal is unenforceable; legal without commerce is theatre; commerce without governance is fragility.*

---

## Introduction — what the governance / legal / commerce layer owes the system

Three obligations frame this Part:

1. **Governance is explicit.** Every change to the system goes through a documented process; ownership is assigned; contributors are credited; deprecations are announced. Implicit governance produces inconsistent systems and demoralised contributors.
2. **Legal is operationalised, not papered.** A privacy notice that does not affect the components is theatre. CyberSkill bakes regulatory requirements — PDPL, GDPR, EAA, EU AI Act, and the regional regimes — into the **components themselves** so that compliance is the default path, not a sticker.
3. **Commerce is fair by construction.** Subscription, billing, payment, and account-management surfaces are anti-dark-pattern by component contract. Consent for marketing is unbundled and unchecked; cancellation is one step; pricing is honest with all-inclusive currency display where required.

Governing references for this Part: **Vietnam PDPL Law 91/2025/QH15** (effective 1 January 2026; LuatVietnam); **Decree 356/2025/ND-CP** (effective 1 January 2026; Tilleke); **Vietnam Cybersecurity Law 116/2025/QH15** (effective 1 July 2026; Tilleke; Mori Hamada); **Resolution 57-NQ/TW** (signed 22 December 2024 by General Secretary Tô Lâm; Vietnam Law Magazine); **EU GDPR**; **EU AI Act** (entered into force 1 August 2024; phased applicability through 2 August 2027; European Commission); **EU EAA** (Directive 2019/882; enforcement 28 June 2025); **PIPL** (China); **APPI** (Japan); **PIPA** (Korea); **PDPA Singapore**; **PDPA Thailand**; **PDP Law Indonesia**; **DPDPA 2023** (India); **Saudi PDPL**; **UAE Federal Decree-Law 45 of 2021**; **LGPD** (Brazil); **CCPA/CPRA** (California); **PIPEDA** (Canada).

---

## 1. Governance model

### 1.1 Three tiers

- **Core Maintainers** — small group with full write access; final authority on breaking changes, sub-brand creation, and policy changes. Named and listed publicly.
- **Contributors** — write access to feature packages via RFC + review; trusted sub-system stewards (locale stewards, accessibility leads, sustainability leads).
- **Consumers** — read access; feedback via issues and discussions; promoted to Contributor based on contribution history.

### 1.2 Federated ownership

Each package has a **named owner** plus a backup. Ownership confers responsibility for review, deprecation, and on-call for incident response within the package's scope. Ownership is reviewed annually and rotates to prevent burnout.

### 1.3 Cadence

- **Weekly** — design-system office hours (open to all consumers).
- **Monthly** — governance review meeting with Core Maintainers + sub-system stewards.
- **Quarterly** — public roadmap review with consumer Q&A.
- **Annual** — full system audit including immutable-context check, accessibility audit, and security audit.

### 1.4 Decision-making

When Core Maintainers disagree, decisions are made by **consent** — a proposal stands when no Core Maintainer raises a substantive objection, and substantive objections require a written rationale. This is a deliberate choice over **consensus** (which can stall on minor preferences) and over **majority vote** (which can over-rule minorities holding important concerns).

### 1.5 Conflict of interest

A Core Maintainer with a financial interest in a particular vendor or technology recuses themselves from votes on that vendor or technology. Conflicts are disclosed annually.

---

## 2. RFC process

### 2.1 What requires an RFC

- New components.
- Breaking changes.
- New tokens beyond the existing ramps.
- Sub-brand creation or retirement.
- Major dependency updates.
- Changes to immutable-context anchors (RFC will be **rejected** unless the brand owner authorises a master-brand update).

### 2.2 RFC template

Every RFC follows the template at `docs/rfcs/_template.md`:

- **Title** — short imperative form.
- **Summary** — one paragraph stating the proposal in plain language.
- **Motivation** — what problem this solves.
- **Proposal** — the concrete change, with diagrams or schemas where relevant.
- **Alternatives considered** — at least three; reasons rejected.
- **Risks** — accessibility, privacy, security, performance, sustainability.
- **Rollout plan** — phased rollout, opt-in vs default-on.
- **Migration plan** — codemod, deprecation timeline.
- **Security / Privacy / A11y impact assessment** — explicit answer per dimension.

### 2.3 Review timeline

- **Draft** — author writes; reviewers see early.
- **Open for comment** — minimum **14 days**; longer for major changes.
- **Decision** — Core Maintainers consent within 7 days of close.
- **Implementation** — feature branch + tests + Storybook stories + docs + changeset.

### 2.4 Promotion criteria

A component graduates from `experimental` (in `@cyberskill/labs`) to `stable` (in the relevant package) when:

- Used in ≥ 3 internal apps.
- Passes accessibility audit (axe + manual SR + APG).
- Has Vietnamese + English content examples + at least one other locale.
- Has Storybook coverage including all required story conventions ([Part 7](part-7-engineering-operations.md) §5.4).
- Has Playwright e2e coverage.
- Has a written API stability statement.

### 2.5 Public RFCs

RFCs are **public-by-default**. Closed RFCs (containing security or unreleased-product details) are rare and require Core Maintainer approval.

---

## 3. Contribution guide

### 3.1 Extend vs compose vs fork

When a consumer needs behaviour the system does not provide:

- **Extend** — add a prop or variant via RFC. The default path.
- **Compose** — wrap the system component with consumer-specific logic without modifying the base. Acceptable for one-off product needs.
- **Fork** — copy the component into the consumer's repo. Strongly discouraged; loses upgrade path and accessibility audit; Core Maintainers will not accept upstream PRs from forks.

### 3.2 PR requirements

Every PR includes:

- Lint pass.
- Test coverage at or above current level.
- Changeset describing the change at the appropriate version level.
- Storybook stories updated where component behaviour changed.
- A11y audit pass for component changes.
- Vietnamese + English content where strings are added.
- Self-audit checklist completed ([Part 1](part-1-foundations.md) §8.7).

### 3.3 Code of conduct

Adopted from Contributor Covenant 2.1. Enforcement chain documented; reports go to a designated email address with Core Maintainer rotation.

### 3.4 Credit

Every contributor named in the changelog. Locale stewards and accessibility reviewers credited in the appendix ([Part 10](part-10-measurement-research-appendix.md) §11).

---

## 4. Global privacy matrix — 20+ jurisdictions

The matrix below summarises the regulatory parameters across CyberSkill's primary markets:

| Jurisdiction | Law | Consent | DPO | Cross-border | Breach notification | Penalty ceiling |
|---|---|---|---|---|---|---|
| **Vietnam** | PDPL Law 91/2025/QH15 + Decree 356/2025/ND-CP | Explicit; **no default; no bundling** | Required | TIA + **CTIA dossier** (Art. 20) | 72 h (location/biometric) | **VND 3 bn** general; **5 % revenue** cross-border |
| **EU** | GDPR + EU AI Act + EAA | Explicit | Required (scale) | Adequacy / SCC / BCR | 72 h | €20M / 4 % (GDPR); €35M / 7 % (AI Act prohibited); €100k per violation EAA national (Germany / Italy) |
| **UK** | UK GDPR + DPA 2018 | Explicit | Required | Adequacy / IDTA | 72 h | £17.5M / 4 % |
| **USA — CA** | CCPA/CPRA | Opt-out + notice; opt-in for sensitive | — | — | varies | $7,500 / intentional violation |
| **USA — federal** | sectoral (HIPAA, COPPA, GLBA, …) | varies | — | — | varies | varies |
| **China** | PIPL + DSL + CSL | Explicit; separate consent for sensitive | Required | CAC / standard contract | timely | RMB 50M / 5 % |
| **Japan** | APPI | Explicit for sensitive | Manager required | Adequacy / SCC / consent | without delay | ¥100M / criminal penalties |
| **Korea** | PIPA | Explicit | Required | Specific rules | 24 h | KRW 5M per individual / 3 % |
| **Singapore** | PDPA + Do-Not-Call | Opt-out + notice | Required | Transfer-limitation obligations | — | SGD 1M / 10 % of revenue |
| **Thailand** | PDPA | Explicit; sensitive-data extra | Required | Adequacy | 72 h | THB 5M / criminal |
| **Indonesia** | PDP Law | Explicit | Required | Adequacy | 3 × 24 hours | IDR 5 bn / 2 % |
| **Malaysia** | PDPA | Opt-in | — | whitelist | — | RM 500k |
| **Philippines** | Data Privacy Act | Explicit | Required | Adequacy | 72 h | PHP 5M / criminal |
| **India** | DPDPA 2023 | Explicit | Required (scale) | Adequacy | 72 h | INR 250 cr |
| **Saudi Arabia** | PDPL | Explicit | Required | Adequacy | 72 h | SAR 5M + criminal |
| **UAE** | Federal Decree-Law 45 of 2021 | Explicit | Required | Adequacy | without delay | varies by sector |
| **Brazil** | LGPD | Explicit | Required | Adequacy | reasonable | BRL 50M / 2 % |
| **Canada** | PIPEDA + Quebec Law 25 | Opt-out / opt-in | Required | limited | real-risk | CAD 100k |
| **Australia** | Privacy Act + Privacy Amendment Bill 2024 | Opt-out / opt-in sensitive | — | — | as soon as practicable | AUD 50M / 30 % |
| **Israel** | Privacy Protection Law 5741-1981 | Explicit | Required | limited | — | varies |

The matrix is maintained by the legal locale stewards and updated quarterly.

---

## 5. Vietnam PDPL — article-level compliance patterns

The Vietnamese personal-data regime is the home market and the most operationally demanding for CyberSkill. This section is the longest in this Part because it must be both a doctrine and a checklist for every component team.

### 5.1 The instruments

- **Law on Personal Data Protection — Law No. 91/2025/QH15.** Passed by the National Assembly **26 June 2025**; effective **1 January 2026** (LuatVietnam, luatvietnam.vn). Supersedes the prior decree-driven regime.
- **Decree 356/2025/ND-CP.** Issued **31 December 2025**; effective **1 January 2026**; replaces Decree 13/2023/ND-CP entirely (Tilleke & Gibbins).
- **Resolution 57-NQ/TW.** Signed **22 December 2024 by General Secretary Tô Lâm**; sets the policy umbrella for digital transformation under which the PDPL operates (Vietnam Law Magazine).

### 5.2 Extraterritorial scope

The PDPL is **extraterritorial**. In its own language (LuatVietnam translation), it applies to "Foreign agencies, organizations and individuals directly involved in or related to the processing of personal data of Vietnamese citizens." A US-based, EU-based, or Japan-based product processing personal data of Vietnamese citizens is in scope.

### 5.3 Penalties

- **General violation** — up to **VND 3 billion** (VNETWORK).
- **Cross-border-transfer breach** — **up to 5 % of prior-year annual revenue** (Tilleke).
- Additional sanctions: business-licence suspension; prohibition from processing.

### 5.4 Articles 10–12 — Consent

PDPL Articles 10–12 govern lawful basis. Consent must be:

- **Explicit** — affirmative action; not implied from inaction.
- **Specific** — purpose-bound; one consent per purpose.
- **Informed** — the data subject knows what they are consenting to and the consequences.
- **Verifiable** — the controller can demonstrate consent was given.
- **Freely given** — no consequences for refusal beyond loss of the specific service the consent enables.
- **Revocable** — withdrawal as easy as granting.

Decree 356/2025/ND-CP **explicitly prohibits** "default consent or ambiguous instructions that confuse data subjects" (Tilleke).

**UX consequence in components:**

- `Checkbox` ([Part 3b](part-3b-inputs.md) §12) — never pre-checked for consent; `defaultChecked` is forbidden by lint on consent surfaces.
- `ConfirmationDialog consent` variant ([Part 3e](part-3e-feedback.md) §11) — each consent is its own checkbox; Confirm disabled until **all required consents are ticked individually**.
- `Banner` ([Part 3e](part-3e-feedback.md) §2) — consent banner has `dismissable={false}` until user interacts.
- `RadioGroup` ([Part 3b](part-3b-inputs.md) §15) — no pre-selected option for consent-related questions.

**UX consequence in copy:**

- Consent prompts state the purpose plainly: *"Bạn có đồng ý cho chúng tôi sử dụng email để gửi bản tin sản phẩm hàng tháng không?"* — not the bundled *"Tôi đồng ý nhận thông tin về sản phẩm, dịch vụ và đối tác của CyberSkill."*
- Withdrawal is a single click from the user-settings surface; an audit-log entry is made on withdrawal.

### 5.5 Articles 14–15 — Data subject rights (DSR)

PDPL grants users six rights, each with a stated SLA:

| Right | PDPL Article | SLA |
|---|---|---|
| **Access** — view personal data held | Art. 14 | ≤ 72 hours |
| **Correction** — correct inaccuracies | Art. 14 | ≤ 72 hours |
| **Deletion** — request erasure | Art. 14 | ≤ 72 hours |
| **Portability** — export in machine-readable format | Art. 14 | ≤ 72 hours |
| **Objection** — to specific processing | Art. 15 | ≤ 72 hours |
| **Restriction** — restrict processing pending dispute | Art. 15 | ≤ 72 hours |

**UX consequence:** every product surfaces a self-service `/privacy` panel with one Button per right. The `legal:legal-response` skill (where applicable) drafts legally-correct responses; HumanReviewGate ([Part 3h](part-3h-ai-chat.md) §6) gates legal output before user display.

The 72-hour SLA timer is **visible to the user** so the right is not theoretical: *"Yêu cầu đã được gửi. Bạn sẽ nhận được phản hồi trước 27/04/2026 lúc 14:30."*

### 5.6 Article 19 — Processing without consent

Narrow lawful bases without consent include:

- **Vital interests** of the data subject.
- **Legal obligation** of the controller.
- **National defence / security** (state-only).
- **Public interest** as defined.

**UX consequence:** an admin surface (`/admin/processing-bases`) carries a **legal-basis selector** with a free-text reason field; every processing operation under a non-consent basis carries a justification record audit-logged.

### 5.7 Article 20 — Cross-border transfer

PDPL Art. 20 requires:

- **Transfer Impact Assessment (TIA)** — for every cross-border data flow; documents the destination, the protection guarantees, and the risk to data subjects.
- **Cross-border Transfer Impact Assessment (CTIA) dossier** — submitted to the Ministry of Public Security; includes the TIA, the legal basis, and the data subject notification.
- **Data subject notification** — the user is informed of the transfer destination at the moment of the relevant flow.

**UX consequence:**

- A **banner** at account creation if the hosting region is outside VN: *"Dữ liệu của bạn sẽ được xử lý trên máy chủ tại Singapore. [Đọc đánh giá tác động chuyển dữ liệu]"*.
- **Per-region explainer** linked from the consent flow.
- **Pre-transfer CTIA submission status** surfaced to admins; cannot ship product to VN users without a successful CTIA submission.
- The `ConfirmationDialog consent` variant ([Part 3e](part-3e-feedback.md) §11) covers the per-flow user confirmation: *"Xác nhận chuyển dữ liệu sang Singapore"* with an **unbundled** consent for the transfer.

### 5.8 Article 21 — DPIA

Data Protection Impact Assessment **filed within 60 days** of processing commencement for high-risk processing (Tilleke).

**UX consequence:** an admin **DPIA workflow** that prompts the team at day 30, 50, and 59; the workflow ships a template aligned to PDPL Art. 21 plus EU AI Act AIIA where applicable.

### 5.9 Article 30 — Big-data and AI processing disclosure

Art. 30 requires that AI processing of personal data carry an explicit disclosure to the data subject.

**UX consequence:** the `AIDisclosureBadge` ([Part 3h](part-3h-ai-chat.md) §10) in VN locale carries Art. 30 copy in the expansion: *"Xử lý này dùng AI theo Điều 30, Luật BVDLCN 91/2025/QH15"*.

### 5.10 Sensitive data (per Decree 356/2025/ND-CP)

Decree 356 specifies sensitive personal data classes — including **photos of Vietnam ID/CCCD/passport** (Acclime Vietnam reading). Sensitive data triggers:

- **AES-256 encryption at rest**.
- **DPO sign-off** for processing pipeline.
- **Audit-log entry** on access.
- **Separate consent** at collection.
- **Stricter retention** — purpose-limited.
- **RedactionMarker** by default in preview contexts ([Part 3h](part-3h-ai-chat.md) §11).

The full sensitive-class taxonomy:

- CCCD photos and number; passport photos and number.
- Biometric data — fingerprints, face, iris.
- Health data — medical records, diagnoses, treatments.
- Financial data — bank account, payment-instrument data.
- Location data of precise type.
- Genetic data.
- Sexual orientation; political opinion; religion (where collected).

### 5.11 Breach notification

- **72 hours** for location and biometric data per Tilleke reading.
- **Incident-response template** in `legal-templates/incident-response.md` pre-populates notification content for legal review.

### 5.12 PDPL summary checklist for every CyberSkill product

| Requirement | Component / Surface | Verification |
|---|---|---|
| Explicit consent UX | Checkbox, ConfirmationDialog | Lint + manual |
| No default consent | All consent surfaces | Lint |
| One purpose per consent | Consent flow | Manual |
| Self-service DSR panel | `/privacy` | Required path |
| 72-hour DSR SLA timer | DSR ack + monitor | Audit log |
| Legal-basis selector for non-consent processing | Admin `/admin/processing-bases` | Audit log |
| TIA + CTIA dossier for cross-border | Banner + per-flow consent | Pre-deploy gate |
| DPIA at day 60 | Admin DPIA workflow | Reminder |
| Art. 30 AI disclosure | AIDisclosureBadge VN locale copy | Render check |
| Sensitive-class redaction | RedactionMarker; FileUpload `sensitive` | Lint + render |
| AES-256 sensitive at rest | DB layer | Pen-test |
| 72-hour breach notification | Incident-response template | Quarterly drill |

---

## 6. Decree 356/2025/ND-CP — implementing rules

Decree 356 supplements the PDPL with operational specifics:

- The **consent prohibition language** (no default; no bundling) is in Decree 356 directly; the PDPL principle is operationalised here.
- **Sensitive-data classes** (§5.10) are enumerated in Decree 356.
- **DPIA template requirements** are specified.
- **Cross-border TIA + CTIA** procedures detailed.
- **DPO appointment** thresholds and role specified.

The Decree replaces Decree 13/2023/ND-CP entirely; teams migrating from the prior regime check the migration mapping in `docs/pdpl-migration-13-to-356.md`.

---

## 7. Cybersecurity Law 116/2025/QH15

### 7.1 Instrument

**Law on Cybersecurity — Law No. 116/2025/QH15.** Passed **10 December 2025**; effective **1 July 2026** (Tilleke; Mori Hamada & Matsumoto).

### 7.2 Notable provisions

- **IP identification obligations** for service providers operating in Vietnam.
- **Data-localisation triggers** for defined categories of data and service types.
- **Incident reporting** to the Authority of Cyber Security and Information Technology Crime Prevention.
- **Cooperation duties** with state cybersecurity agencies.

### 7.3 UX consequence

- **Admin-console country-of-operation configuration** at onboarding; the configuration determines which data-localisation rules apply.
- **Telemetry and logs** for in-scope services default to **in-country storage**; cross-border is opt-in with explicit basis.
- **Incident-reporting workflow** in admin includes a one-click submission template for the authority's required form.

---

## 8. EU — GDPR + AI Act + EAA

### 8.1 GDPR

- **Cookie / consent patterns** — use of cookies banner per [Part 3e](part-3e-feedback.md) §2 with PDPL parity.
- **DSR service** at `/privacy` — 30-day SLA per GDPR (vs PDPL's 72 hours; PDPL's tighter SLA dominates for VN users).

### 8.2 EU AI Act

- AI Act disclosures per [Part 6](part-6-ai-ethics-sustainability.md) §2.
- High-risk AI surfaces carry the `HighRiskAIBanner`; Art. 14 human oversight via HumanReviewGate.

### 8.3 EAA

- **Accessibility statements** linked from the Footer ([Part 3d](part-3d-navigation.md) §2).
- **EN 301 549 conformance** declared.

---

## 9. Other markets

### 9.1 California — CCPA/CPRA

- Consumer-rights banner with **Do Not Sell or Share My Personal Information** link.
- **Limit Use of Sensitive Personal Information** option for users opting in.
- **Global Privacy Control (GPC)** signal honoured (Sec 1798.135(b)).

### 9.2 China — PIPL + DSL

- Sensitive data — **separate consent** required.
- Cross-border transfer requires **CAC approval** for certain classes; **standard contract** for others.
- **Local representative** appointed.

### 9.3 Japan — APPI

- **Explicit consent for sensitive data** including health, criminal record, religion.
- Foreign-transfer restrictions; **adequacy** or **SCC** required.

### 9.4 Singapore — PDPA + Do-Not-Call

- **Opt-out + notice** model with sensitive-data sub-rules.
- **Do-Not-Call registry** check before marketing call.

### 9.5 Thailand — PDPA

- **Explicit consent**; sensitive-data carries enhanced rules.
- **DPO required**.
- **72-hour breach notification**.

### 9.6 Saudi Arabia / UAE — PDPL / Federal Decree-Law 45

- **Explicit consent**.
- **Adequacy-based cross-border**.
- **Locale-specific surfaces** respect prayer-time push suppression ([Part 3e](part-3e-feedback.md) §4.9).

### 9.7 Brazil — LGPD

- **Explicit consent**; data-subject rights; controller obligations.

### 9.8 India — DPDPA 2023

- **Explicit consent**; high penalties; restricted cross-border.

---

## 10. Terms, Privacy, Cookies, DPA templates

### 10.1 Templates package

`@cyberskill/legal-templates` ships:

- **Terms of Service** (consumer + B2B variants).
- **Privacy Notice** with PDPL + GDPR + CCPA modules.
- **Cookies Notice** with category granularity.
- **Data Processing Agreement (DPA)** for B2B customers.
- **Sub-processor list** template.
- **Incident-response notification** templates for each major jurisdiction.

### 10.2 Authoring

Templates are **plain-language** (Flesch–Kincaid grade 9 max for consumer; grade 11 for B2B). Each template carries a versioning header (effective-from, effective-to, change-summary).

### 10.3 Review

Every template is reviewed by counsel **before use**. The system does not provide legal advice; it provides scaffolding to be customised by counsel for the specific deployment.

### 10.4 Localisation

Templates ship in **Vietnamese + English** at minimum. Other locales added as the locale steward + counsel review per market.

---

## 11. Commerce patterns

### 11.1 Patterns

The system ships the following commerce surfaces and patterns:

- **Product page** — title, price, description, variant selector, add-to-cart, reviews, recommendations.
- **Cart** — line-items, totals, taxes, shipping, promo code, checkout button.
- **Checkout** — three-step typical (address / payment / review-and-confirm); anti-dark-pattern by default.
- **Payment** — card, bank transfer, e-wallet; locale-specific (Momo, ZaloPay, VNPay for VN; Stripe Connect for global).
- **Subscriptions** — per-period billing; one-step cancel; mid-cycle change handling.
- **Invoicing** — locale-correct invoice with VAT / GST / tax-id rendering.
- **Returns** — request-refund flow; status tracking.
- **Reviews and ratings** — moderation queue; spam protection.
- **Recommendations** — AI-powered with AIDisclosureBadge.
- **Search and filtering** — Combobox + filter Chips ([Part 3b](part-3b-inputs.md) §7, [Part 3f](part-3f-data-display.md) §8).
- **Pricing display** — all-inclusive where required by law (EU MFR; UK CMA; AU); VN VAT-inclusive display.
- **Currency selector** — explicit; persisted per user.
- **Shipping calculator** — per-region with locale-correct address.

### 11.2 Tax per region

Tax handling per [Part 5](part-5-accessibility-localization.md) §13 country-format table:

- **VN VAT** — 8 % standard, 5 % reduced, 0 % exempt; inclusive display (price shown includes tax).
- **EU VAT** — per-country rates; price-inclusive display per CMA / consumer law.
- **US sales tax** — exclusive display; calculated at checkout per ZIP.
- **JP consumption tax** — 10 % standard, 8 % reduced; inclusive.
- **AU GST** — 10 %; inclusive.

### 11.3 Anti-dark-pattern by construction

The commerce surfaces are anti-dark-pattern by component contract ([Part 6](part-6-ai-ethics-sustainability.md) §9):

- **No auto-add items** at checkout.
- **No hidden fees** — every fee shown line-item.
- **No pre-ticked add-ons** — Decree 356 prohibition extended.
- **One-step cancel** for subscriptions.
- **No confirmshaming** in unsubscribe flow.

---

## 12. Authentication

### 12.1 Primary — passkeys (WebAuthn L3)

Passkeys are the **primary authentication method**. SC 3.3.8 Accessible Authentication is satisfied: no cognitive function test, paste allowed, autofill supported.

### 12.2 Secondary — TOTP

Time-based one-time passwords as second factor; OTPInput component ([Part 3b](part-3b-inputs.md) §23) handles SMS auto-fill for low-security factors.

### 12.3 SSO — SAML 2.0 / OIDC

Enterprise customers receive SAML 2.0 and OIDC SSO. SCIM 2.0 for provisioning.

### 12.4 Biometric local unlock

Where supported by the device (Face ID, Touch ID, Android BiometricPrompt) — biometric unlocks the local credential, not the remote authentication.

### 12.5 Re-authentication for sensitive actions

Per WCAG 2.2 SC 2.2.5 Re-authenticating, sensitive actions (account deletion, payment-instrument changes, role changes) require re-auth via the `ConfirmationDialog auth-step` variant ([Part 3e](part-3e-feedback.md) §11).

### 12.6 Session management

- **Session timeout** with 5-minute warning + extend option (SC 2.2.1 Timing Adjustable).
- **Session invalidation** across devices on password/passkey change.
- **Per-session audit log**.

---

## 13. Account, team, workspace management

### 13.1 Role model

| Role | Capabilities |
|---|---|
| **Owner** | All capabilities + billing + delete-workspace |
| **Admin** | Manage members, settings, integrations |
| **Member** | Use product features per assigned permissions |
| **Guest** | Limited access to specific resources |

### 13.2 Invitations

Invitation flow with explicit PDPL consent for VN-domiciled invitees — the invitee receives a privacy notice before account creation; data residency is disclosed at the invite.

### 13.3 Multi-workspace

Users can belong to multiple workspaces with different roles. Workspace switcher in the Header.

### 13.4 Bulk operations

Admin surfaces support bulk operations (invite many; remove many) with **confirmation per operation** showing the target list explicitly — to prevent accidental mass-mutation.

---

## 14. Billing, admin, audit logs, feature flags

### 14.1 Billing

- **Region-specific tax** display (Part 8 §11.2).
- **Invoices** generated with locale formats ([Part 5](part-5-accessibility-localization.md) §13).
- **Receipts** delivered by email with C2PA-signed PDF attachment.
- **Payment-method management** — passkey-protected by default.

### 14.2 Admin patterns

- **Audit-log viewer** with filter, search, export.
- **Permission browser** showing role-to-capability matrix.
- **Integration management** — list of connected MCP servers, third-party APIs, OAuth grants.

### 14.3 Audit logs

- **Append-only**.
- **PII-minimised** by default — only hashed user identifiers; full identifiers visible to admins on reveal-with-reason.
- **Queryable by the user** per PDPL Art. 14 access right (the user can download their own audit-log entries).
- **Retention** per PDPL Art. 21 DPIA-driven retention; sector-specific overrides for medical / financial.

### 14.4 Feature flags

- **Server-side evaluation** for privacy-sensitive contexts (avoids client-side leakage of flag state correlated with user attributes).
- **Client-side flags never gate data-collection defaults** — a user reading the privacy policy must see the same defaults regardless of the flags they are bucketed into.
- **Audit-log entry** for every flag flip in a user's session (allows reproducing what the user saw).

---

## 15. References

**Vietnamese law**

- LuatVietnam — *Personal Data Protection Law No. 91/2025/QH15* — passed 26 June 2025; effective 1 January 2026. https://luatvietnam.vn/
- Tilleke & Gibbins — *Decree 356/2025/ND-CP* — issued 31 December 2025; effective 1 January 2026; consent prohibition language; sensitive-data classes; DPIA + TIA + CTIA procedures.
- Tilleke & Gibbins; Mori Hamada & Matsumoto — *Cybersecurity Law 116/2025/QH15* — passed 10 December 2025; effective 1 July 2026.
- Acclime Vietnam — *Sensitive personal data under Decree 356/2025/ND-CP* — including photos of Vietnam ID/CCCD/passport.
- VNETWORK — *PDPL penalty summary* — VND 3 billion general; 5 % annual revenue cross-border.
- Vietnam Law Magazine — *Resolution 57-NQ/TW of the Politburo, signed 22 December 2024 by General Secretary Tô Lâm*.

**EU and other**

- European Commission — *EU AI Act Regulation 2024/1689* — entered into force 1 August 2024; phased applicability through 2 August 2027.
- DLA Piper — EU AI Act penalty tiers.
- AllAccessible — EAA national penalty references.
- European Commission — *EAA Directive 2019/882* — enforcement 28 June 2025.
- *PIPL* (China), *APPI* (Japan), *PIPA* (Korea), *PDPA* (Singapore, Thailand), *PDP Law* (Indonesia), *DPDPA 2023* (India), *Saudi PDPL*, *UAE Federal Decree-Law 45 of 2021*, *LGPD* (Brazil), *CCPA / CPRA* (California), *PIPEDA* (Canada), *Privacy Act* (Australia), *Privacy Protection Law 5741-1981* (Israel).
- *Contributor Covenant 2.1* — code of conduct.
- *WebAuthn Level 3* — W3C; passkeys.
- *SAML 2.0*, *OIDC*, *SCIM 2.0* — enterprise authentication and provisioning.
- WCAG 2.2 SC 2.2.5 Re-authenticating; SC 2.2.1 Timing Adjustable; SC 3.3.8 Accessible Authentication.

---


## 16. RFC subtypes

*The base RFC template (§2.2) covers most cases; subtypes add fields specific to particular changes. All subtypes inherit the base; reviewers know which fields to scrutinise.*

### 16.1 Why subtypes

A "new component" RFC and a "deprecate a component" RFC need different evidence. A theme RFC (white-label, sub-brand) needs evidence the base RFC template doesn't ask for. Subtypes formalise the additions without inventing new processes.

### 16.2 Subtype catalogue

| Subtype | Adds | Owner approver |
|---|---|---|
| **Component RFC** | Tier (1 / 2); proposed slot model; variant matrix; state matrix; a11y plan; lifecycle path | Design Lead + Engineering Lead |
| **Pattern RFC** | At least 3 product use cases; composition recipe; reference implementation | Design Lead + Product PM |
| **Template RFC** | Page archetype; slot model; reference implementation; accessibility plan | Design Lead + Product PM |
| **Theme RFC** | Theme schema; contrast verification; a11y validation per [Part 13](part-13-theming-whitelabel-embed.md) §5.4 | Brand Owner + Accessibility Lead |
| **Sub-brand RFC** | Sub-brand name (per [Part 1](part-1-foundations.md) §10); accent token; logo lockup; trademark availability check | Brand Owner + Founder |
| **Token RFC** | Token name; type; value(s) per theme variant; rationale; deprecation plan if replacing | Design Lead |
| **Pack RFC** (Vertical pack) | Vertical scope; regulatory map; named industry expert; ≥ 3 product use cases | DS Lead + named pack maintainer |
| **Tooling RFC** | Tool description; user surfaces affected; SLO targets; deprecation plan | Engineering Lead + DesignOps Lead |
| **Content RFC** | Source string + VN translation + rubric pass; banned-phrase / glossary impact | Content Designer + (Brand Owner for tone changes) |
| **Lifecycle RFC** | Promotion / demotion / deprecation case; gate evidence; comms plan | DS Lead + Engineering Lead |

### 16.3 Subtype templates

Subtype templates extend the base in `/RFCs/_templates/{subtype}.md`. The Driver picks a template at draft time.

### 16.4 Review timeline by subtype

| Subtype | Review window |
|---|---|
| Editorial / minor | 5 days |
| Component / Pattern / Template (substantive) | 14 days |
| Theme / Sub-brand | 14 days |
| Pack | 21 days (vertical-expert review) |
| Tooling | 14 days |
| Content (substantive) | 14 days |
| Content (string addition) | 5 days |
| Lifecycle (deprecation) | 14 days; extended for high-impact components |

### 16.5 Cross-references

- §2.2 — base RFC template.
- [Part 11](part-11-enterprise-patterns.md) (patterns / templates), [Part 12](part-12-advanced-components.md) (components), [Part 13](part-13-theming-whitelabel-embed.md) (theme), [Part 14](part-14-content-design.md) (content), [Part 15](part-15-tooling.md) (tooling), [Part 17](part-17-component-lifecycle.md) (lifecycle), [Part 19](part-19-vertical-packs.md) (vertical packs) — operational detail per subtype.

*End of Part 8 — Governance, Legal, Commerce.*
