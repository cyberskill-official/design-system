# The CyberSkill Global Design System

## Part 19 — Industry Vertical Packs

*The doctrine for industry-specific overlays on the design system. Pattern packs for Fintech (KYC, transaction tables, compliance badges), Healthcare (PHI handling, accessibility-of-elderly users), Education (learner-progress, teacher-roster), Govtech (form-wizard for citizen services, accessibility for the public), Logistics (route planning, manifests). Each pack composes existing primitives, patterns, and templates with vertical-specific patterns, terminology, and compliance overlays. Inherits all of Parts 1–18; adds vertical knowledge.*

---

## Introduction — what vertical packs owe the system

The horizontal design system (Parts 1–18) is industry-neutral. A `Button` is a button whether it confirms a healthcare appointment, a stock trade, or a shipping manifest. But certain patterns are **vertical-specific**: a fintech transaction table has columns and conventions that a logistics manifest does not; healthcare PHI handling has UI requirements no other industry shares; government services have accessibility expectations that go beyond enterprise norms.

Without vertical packs, every product team in a regulated industry rebuilds the same wheel: the KYC stepper, the appointment-scheduling overlay, the secure-document-viewer with audit-trail. Vertical packs codify these so a product team in finance composes a working KYC flow in an afternoon, not a month.

This part defines:

1. The vertical-pack architecture (how packs compose with the horizontal system).
2. Five initial packs: **Fintech**, **Healthcare**, **Education**, **Govtech**, **Logistics**.
3. The contribution model for new packs and pack additions.
4. Vertical compliance overlays (regulatory dimensions per industry).

Three commitments anchor the doctrine:

1. **Packs compose, never replace.** A vertical pack adds patterns and terminology; it does not fork the design system.
2. **Compliance is structural.** PHI / PCI / FERPA / GDPR-special-categories are baked into pack components, not bolted on later.
3. **Vertical experts own packs.** Fintech pack maintained by people with fintech experience; not "any designer can edit any pack".

---

## 1. The vertical pack architecture

### 1.1 What a pack contains

A vertical pack is a typed, versioned package:

```
@cyberskill/vertical-fintech
├── components/         (vertical-specific Tier-2 components)
├── patterns/           (vertical-specific T3 patterns)
├── templates/          (vertical-specific T4 templates)
├── content/            (vertical-specific microcopy keys)
├── terminology/        (glossary additions)
├── compliance/         (regulatory mapping; PCI, KYC, AML, etc.)
├── icons/              (vertical-specific icons)
├── illustration/       (vertical-specific illustrations)
└── docs/               (vertical pack documentation)
```

### 1.2 Composition rules

| Rule | Means |
|---|---|
| Pack composes, never overrides | Pack adds; doesn't change horizontal primitives |
| Pack inherits tokens | Cannot redefine token semantics; can use different tokens |
| Pack inherits voice | Vertical adapts tone within [Part 1](part-1-foundations.md) §3 voice; never violates |
| Pack inherits a11y | Vertical may strengthen a11y; never weakens |
| Pack inherits lifecycle | Pack components have status ([Part 17](part-17-component-lifecycle.md)) |
| Pack inherits docs | Pack pages live on the same docs site ([Part 18](part-18-docs-site.md) §1.5 — `/verticals/{vertical}`) |

### 1.3 Pack discovery

Pack imports are explicit and namespaced:

```jsx
import { KycStepper, TransactionTable } from '@cyberskill/vertical-fintech'
import { PhiViewer, AppointmentScheduler } from '@cyberskill/vertical-healthcare'
```

Tree-shakeable; products only import the packs they use.

### 1.4 Pack versioning

Packs versioned independently:

- Major bumps independent of horizontal DS major.
- Pack pinned to a horizontal-DS version range (e.g., "compatible with DS v4.x").
- Pack compatibility matrix on docs site.

### 1.5 Pack ownership

Each pack has a named maintainer (vertical-pack owner per [Part 16](part-16-adoption-designops.md) §7.2). Owner accountable for:

- Pack lifecycle.
- Compliance accuracy (signed off by an industry expert).
- Pack documentation.
- Customer support for pack consumers.

### 1.6 Pack lifecycle

Per [Part 17](part-17-component-lifecycle.md):

- New pack starts at "experimental" (broader than alpha; less commitment).
- Promotion to alpha after 1 product use.
- Promotion to beta after 2 production uses + compliance review.
- Promotion to GA after 3 production uses + external compliance audit.

---

## 2. Vertical pack — Fintech

### 2.1 Scope

For products in:

- Banking (retail, business).
- Lending (consumer, SME).
- Investment (brokerage, robo-advisory, wealth management).
- Payments (payment processors, wallets).
- Insurance (life, P&C, health insurance UI).
- Capital markets (trading, settlement).
- RegTech (KYC, AML, compliance ops).

### 2.2 Regulatory anchors (mapped)

| Regulation | Region | Pattern impact |
|---|---|---|
| **PCI-DSS** v4.0 | Global (cards) | Card-data masking patterns; no full-PAN render in UI |
| **PSD2 / SCA** | EU | Strong customer authentication UX |
| **GDPR Art. 22** | EU | Automated-decision explanation patterns |
| **KYC / AML** | Global | KYC stepper; sanctions-screening result displays |
| **MiFID II** | EU | Risk-disclosure modal patterns |
| **Reg E / Reg Z** | US | Disclosure presentation; cooling-off |
| **SOX** | US (public co.) | Audit-trail display |
| **FINRA / SEC suitability** | US | Risk-tolerance assessment patterns |
| **OFAC SDN / EU sanctions** | Global | Restricted-party screening UI |
| **Vietnam Decree 21/2017/ND-CP** (e-money) | Vietnam | Local payment pattern |
| **Vietnam Banking Law (47/2010/QH12)** | Vietnam | Banking customer identification |

### 2.3 Pattern catalogue

#### 2.3.1 KycStepper

A specialised WizardTemplate ([Part 11](part-11-enterprise-patterns.md) §5.6) for KYC onboarding:

- Steps: identity → document upload → liveness check → address verification → sanctions screening → review.
- Each step has compliance-hardened inputs (e.g., document-upload uses File.Upload with auto-OCR + EXIF strip + virus scan).
- Sanctions-screening result clearly disclosed.
- Audit trail of every step preserved.

#### 2.3.2 TransactionTable

Specialised Table.Virtualized ([Part 12](part-12-advanced-components.md) §9):

- Columns: date/time (with TZ), description, category, amount (with currency), balance, status (cleared/pending), reference.
- Sortable by every column; default by date desc.
- Row colour for credit / debit (semantic; not the only signal).
- Pending vs cleared rendered distinctly.
- Search by reference, amount, description.
- Export to CSV / OFX / QIF / PDF (with optional encryption).
- Audit-bookmarkable (deep link to specific transaction).

#### 2.3.3 AmountInput

Currency-aware input with:

- Currency symbol prefix (locale-aware; EU has trailing).
- Thousands separator (locale-aware; lakh/crore for India per [Part 5](part-5-accessibility-localization.md) §13.1).
- Decimal precision per currency (JPY: 0; USD: 2; KWD: 3).
- Reject non-numeric input.
- Show full numerals on focus; abbreviated when blurred (e.g., "1,234,567" / "$1.2M").

#### 2.3.4 AccountIdentifier

Renders account numbers, IBANs, SWIFT codes, card PANs:

- Always masked by default ("**** **** **** 1234").
- Click to reveal (logged to audit trail).
- IBAN validates format on display.
- Card brand auto-detected from BIN.

#### 2.3.5 RiskDisclosure

A pre-action modal showing risks of the action:

- Plain-language summary at top.
- Detailed disclosures expandable.
- "I understand" checkbox — required before action.
- Cooling-off counter for high-risk products (e.g., 5-second hold-to-confirm).

#### 2.3.6 OrderTicket

For trading interfaces:

- Symbol, side, quantity, type (market/limit/stop), price.
- Estimated cost / proceeds shown live.
- Pre-trade warnings (insufficient funds, position-size limits).
- Confirm requires fresh re-auth for high-value orders.
- Audit trail of order entry.

#### 2.3.7 ComplianceBadge

Inline visual indicator:

- "Verified", "Pending verification", "Not verified".
- Tooltip explains what was verified and by whom.
- Used on accounts, addresses, identities.

#### 2.3.8 RegulatoryFooter

A footer block with:

- Firm regulatory information (license number, regulator name).
- Risk warning text per region.
- Links to disclosure documents.
- Locale-specific.

### 2.4 Microcopy additions

```yaml
# /vertical-fintech/content/
fintech:
  insufficient-funds:
    en: "Insufficient funds. Available balance: {balance}."
    vi: "Không đủ số dư. Số dư khả dụng: {balance}."
  pending-clearance:
    en: "Pending clearance — funds available {date}."
    vi: "Đang chờ thanh toán — số tiền sẽ khả dụng vào {date}."
  sanctions-hit:
    en: "Verification needed. We can't process this transaction automatically. Our team will contact you within 24 hours."
    vi: "Cần xác minh. Chúng tôi không thể xử lý giao dịch này tự động. Đội ngũ sẽ liên hệ với bạn trong 24 giờ."
  cooling-off:
    en: "Confirm in {seconds}s to proceed with this {amount} transfer."
    vi: "Xác nhận sau {seconds} giây để tiến hành chuyển khoản {amount}."
```

### 2.5 Terminology

| Term | Vietnamese | Definition |
|---|---|---|
| Account holder | Chủ tài khoản | The legal owner |
| Beneficiary | Người thụ hưởng | The recipient |
| BIN | BIN | Bank Identification Number |
| IBAN | IBAN | International Bank Account Number |
| Settlement | Thanh toán | T+N convention |
| KYC | KYC | Know Your Customer |
| AML | Phòng chống rửa tiền | Anti-Money Laundering |
| PEP | Nhân vật chính trị | Politically Exposed Person |
| SDN | Danh sách bị cấm vận | Specially Designated Nationals |

### 2.6 Compliance overlays

Per pattern, the pack documents the regulatory rationale:

```yaml
# /vertical-fintech/compliance/
TransactionTable:
  pci-dss:
    requirement: "Mask PAN at all times; no full-PAN export without authentication."
    pattern: "Card field auto-masks; full reveal logs audit event."
  sox:
    requirement: "Audit trail for any data modification."
    pattern: "All edits logged via AuditLogTemplate (Part 11 §5.11)."
```

### 2.7 Reference implementations

- Internal: a sample retail-banking dashboard (`apps/sample-fintech-bank/`).
- Internal: a sample trading interface (`apps/sample-fintech-trading/`).

---

## 3. Vertical pack — Healthcare

### 3.1 Scope

For products in:

- Electronic Health Records (EHR).
- Patient portals.
- Telemedicine.
- Clinical workflow tools.
- Pharmacy systems.
- Insurance / payor systems.
- Public health.

### 3.2 Regulatory anchors

| Regulation | Region | Pattern impact |
|---|---|---|
| **HIPAA** | US | PHI handling; minimum-necessary; audit trail |
| **HITECH** | US | Breach notification; meaningful use |
| **GDPR — special categories (Art. 9)** | EU | Health data is special category; strict consent |
| **Vietnam PDPL — sensitive categories** | Vietnam | Health is sensitive; explicit consent |
| **MDR** (Medical Device Regulation) | EU | Software-as-medical-device UX requirements |
| **FDA 21 CFR [Part 11](part-11-enterprise-patterns.md)** | US | Electronic records; e-signatures |
| **WCAG 2.2 AAA** for citizen-health surfaces | Global | Higher a11y bar |

### 3.3 Pattern catalogue

#### 3.3.1 PhiViewer

A controlled component for displaying Protected Health Information:

- "View" requires fresh re-auth.
- Auto-redact mode: PHI redacted unless explicitly revealed.
- Audit log entry for every view + any field reveal.
- Auto-blur after 30s idle (re-auth to unblur).
- Watermark with viewer's name + timestamp.

#### 3.3.2 PatientHeader

The header for any patient-context page:

- Patient name + photo (when allowed).
- DOB + age.
- MRN (Medical Record Number).
- Allergies prominently displayed (red-bordered chip).
- Active conditions summary.
- Care team chips.
- Quick actions: Add note, Schedule, Order.

#### 3.3.3 AppointmentScheduler

Specialised Calendar.Scheduler ([Part 12](part-12-advanced-components.md) §3):

- Provider availability shown by colour.
- Appointment type (15min, 30min, 45min) selectable.
- Preferred-language matching for telemedicine.
- Patient-facing booking with simplified UI.
- Provider-facing scheduling with full controls.

#### 3.3.4 MedicationList

- Active vs discontinued.
- Dosage + frequency in plain language ("1 tablet, twice a day").
- Drug-interaction warnings (severe = inline alert).
- Refill request action.
- Print-friendly (for patient handout).

#### 3.3.5 OrderEntry

Computerized Provider Order Entry (CPOE):

- Smart auto-complete (drug, dose, frequency).
- Drug-allergy check on entry.
- Formulary alternatives shown.
- Verification by second provider for high-risk orders.
- Audit trail with timestamps and provider identity.

#### 3.3.6 ConsentForm

- Plain-language summary at top.
- Detailed legalese expandable.
- Required initials per section.
- Witness signature option.
- Print + sign + scan workflow supported.
- E-signature compliant with 21 CFR [Part 11](part-11-enterprise-patterns.md) (US) / eIDAS (EU).

#### 3.3.7 TelemedicineSession

- Pre-session: device check (camera, mic, network — [Part 5](part-5-accessibility-localization.md) §5).
- In-session: video + audio + chat + notes side-panel.
- Provider can share screen for education.
- Session recording with explicit consent (audit logged).
- Post-session: visit summary auto-generated; e-signed by patient + provider.

#### 3.3.8 LargeAccessibleHero

For patient-portal landing pages:

- Larger type by default (16px → 20px).
- Touch-target minimum 56×56 (above WCAG 2.5.8).
- Plain-language tier 1 copy ([Part 5](part-5-accessibility-localization.md) §15.1).
- High-contrast available.
- Voice-control friendly labels (action verbs, not jargon).

### 3.4 Microcopy additions

Healthcare-specific:

```yaml
healthcare:
  appointment-confirmed:
    en: "Your appointment with {provider} is confirmed for {date}, {time}."
    vi: "Lịch hẹn của bạn với {provider} đã được xác nhận vào {date}, {time}."
  prescription-ready:
    en: "Your prescription is ready for pickup at {pharmacy}."
    vi: "Đơn thuốc của bạn đã sẵn sàng để nhận tại {pharmacy}."
  test-results-ready:
    en: "Your test results are available. Review them with your care team."
    vi: "Kết quả xét nghiệm của bạn đã sẵn sàng. Hãy xem cùng đội ngũ chăm sóc."
  drug-allergy-alert:
    en: "Allergy alert: {patient-name} is allergic to {allergen}. {medication} contains {allergen}."
    vi: "Cảnh báo dị ứng: {patient-name} dị ứng với {allergen}. {medication} chứa {allergen}."
  emergency-contact:
    en: "If this is a medical emergency, call {emergency-number} or go to your nearest emergency room."
    vi: "Nếu đây là trường hợp cấp cứu, gọi {emergency-number} hoặc đến phòng cấp cứu gần nhất."
```

### 3.5 Terminology

| Term | Vietnamese | Definition |
|---|---|---|
| PHI | Thông tin sức khoẻ được bảo vệ | Protected Health Information (HIPAA term) |
| MRN | Mã hồ sơ y tế | Medical Record Number |
| EHR | Hồ sơ sức khoẻ điện tử | Electronic Health Record |
| ICD-10 | ICD-10 | International Classification of Diseases |
| Care team | Đội ngũ chăm sóc | Group of providers caring for patient |
| Encounter | Lần khám | A single visit / interaction |
| Order | Y lệnh | Medication / lab / procedure order |
| Allergy | Dị ứng | (severity: mild / moderate / severe / anaphylaxis) |

### 3.6 Compliance overlays

```yaml
PhiViewer:
  hipaa:
    requirement: "Minimum necessary; audit trail; access controls."
    pattern: "Re-auth on view; auto-redact; idle blur; watermark; audit log."
  gdpr-art9:
    requirement: "Explicit consent for processing health data."
    pattern: "Consent flow before first PHI access; consent expiry handled."
  vn-pdpl-sensitive:
    requirement: "Sensitive-data processing requires written or e-consent."
    pattern: "ConsentForm (§3.3.6) used; consent record retained."
```

### 3.7 Patient-portal accessibility

Patient-facing healthcare surfaces target **WCAG 2.2 AAA where feasible**:

- Larger type defaults.
- Plain-language tier 1.
- Touch targets ≥ 56×56.
- Captions on every video.
- Screen-reader tested with elderly users ([Part 5](part-5-accessibility-localization.md) §17).

---

## 4. Vertical pack — Education

### 4.1 Scope

For products in:

- LMS (Learning Management Systems).
- Student information systems.
- Edtech (K–12, higher-ed, vocational).
- Tutoring / online courses.
- Assessment / proctoring.
- Educator tools (gradebook, lesson planning).

### 4.2 Regulatory anchors

| Regulation | Region | Pattern impact |
|---|---|---|
| **FERPA** | US | Student records protection; parental consent under 18 |
| **COPPA** | US | Children under 13: parental consent required |
| **GDPR-K** (children) | EU | Children's special protections |
| **Vietnam Education Law** | Vietnam | Records retention; parental rights |
| **WCAG 2.2 AA** | Global | Accessibility for diverse learners |

### 4.3 Pattern catalogue

#### 4.3.1 LearnerProgressView

- Course outline with completion state per module.
- Time invested.
- Skill mastery indicators.
- Recommended next steps.
- Educator can share encouragement note.

#### 4.3.2 GradebookTable

Specialised Table.Virtualized:

- Rows: students; columns: assignments / standards.
- Cells: scores with colour-coded mastery levels.
- Inline edit with bulk-apply.
- Audit log on grade changes.
- Print-friendly per student.

#### 4.3.3 LessonPlanner

- Calendar grid (week / unit view).
- Lessons drag-droppable (Calendar.Scheduler base).
- Standards alignment (lesson tagged with curriculum standards).
- Co-teacher collaboration ([Part 12](part-12-advanced-components.md) §5).

#### 4.3.4 AssignmentViewer

- Student work display (text, file, video, code).
- Inline annotation by teacher.
- Rubric grading (criteria with score levels).
- Plagiarism check status.
- Re-submission workflow.

#### 4.3.5 ParentChildLink

Authentication & authorisation pattern for parent access to child's records:

- Verification flow.
- Per-child scope.
- Audit log of parent access.
- Per-school custom rules supported.

#### 4.3.6 LiveClassroom

For synchronous online classes:

- Video grid (teacher prominent).
- Chat with teacher-moderation.
- Hand-raise.
- Breakout rooms.
- Quick-poll.
- Recording (with consent).

### 4.4 Microcopy

```yaml
education:
  assignment-submitted:
    en: "Submitted on {date}, {time}. {educator} will grade it soon."
    vi: "Đã nộp lúc {date}, {time}. {educator} sẽ chấm điểm sớm."
  late-submission:
    en: "This is a late submission. Late penalty: {penalty}%."
    vi: "Bài này nộp trễ. Phạt trễ: {penalty}%."
  mastery-level:
    novice: { en: "Beginning", vi: "Bắt đầu" }
    developing: { en: "Developing", vi: "Đang phát triển" }
    proficient: { en: "Proficient", vi: "Thành thạo" }
    advanced: { en: "Advanced", vi: "Nâng cao" }
```

### 4.5 Terminology

| Term | Vietnamese |
|---|---|
| Student | Học sinh / Sinh viên |
| Educator / Teacher | Giáo viên / Giảng viên |
| Course | Khoá học |
| Module | Chuyên đề |
| Assignment | Bài tập |
| Rubric | Phiếu chấm |
| Mastery | Mức độ thành thạo |

### 4.6 Compliance overlays

- FERPA: parental access rights (under 18); rights transfer at majority.
- COPPA: under-13 onboarding gated by parental consent.
- VN Education Law: records retention 5+ years.

---

## 5. Vertical pack — Govtech

### 5.1 Scope

For products in:

- Citizen-facing government services (e-government portals).
- Internal government workflow tools.
- Public-sector HR / case management.
- Civic technology.

### 5.2 Regulatory anchors

| Regulation | Region | Pattern impact |
|---|---|---|
| **Section 508 / Revised 508** | US | Federal a11y; WCAG 2.0 AA + addenda |
| **EN 301 549** | EU | Procurement a11y standard |
| **EAA** | EU | Public-sector a11y |
| **WCAG 2.2 AA / AAA** | Global (citizen surfaces) | Citizen surfaces target AAA where feasible |
| **Vietnam Government Decree 42/2022/ND-CP** | Vietnam | Online public services |
| **Vietnam Government Decree 87/2018/ND-CP** | Vietnam | E-identification |
| **Plain Writing Act** (US) | US | Plain-language requirement |
| **Public Sector Bodies Accessibility Directive** | EU | Mandatory a11y |

### 5.3 Pattern catalogue

#### 5.3.1 CitizenWizard

Specialised WizardTemplate ([Part 11](part-11-enterprise-patterns.md) §5.6):

- Plain-language tier 1 throughout.
- One-question-per-step UX (lower cognitive load).
- Save-and-resume.
- Progress saved per session-token (no account needed for first interaction).
- Results in shareable / printable confirmation.
- Multilingual (locale per citizen preference).

#### 5.3.2 FormGenerator

For complex citizen forms (tax, benefits, permits):

- Conditional fields based on prior answers.
- Field help with example answers.
- Cross-field validation in plain language.
- Save draft + email-back link to resume.
- Field-level help-text translations and audio recordings.

#### 5.3.3 IdentityVerification

- Multi-method: government ID upload + selfie + knowledge-based questions.
- Falls back to in-person verification with appointment booking.
- Per locale: integration with national e-ID schemes (CCCD/VNeID for Vietnam; Login.gov for US; eIDAS for EU).

#### 5.3.4 CaseStatus

For citizens tracking their application / request:

- Plain-language status ("We're reviewing your application").
- Estimated timeline.
- Required actions (if any) prominently displayed.
- Notification preferences (email / SMS).
- Available documents downloadable.

#### 5.3.5 PublicMap

For services with geographic component (find polling place, schools, etc.):

- WCAG-compliant map (alternative tabular view; keyboard nav).
- Accessible markers (text labels; not colour alone).
- Distance + travel time per mode (drive/walk/transit).
- Print-friendly directions.

#### 5.3.6 LanguageSelector

Prominent language selector in the header (citizens may not be primary-language readers):

- Current language displayed in own script.
- Languages listed in own script.
- Sticky preference per session.
- Auto-detect with override.

### 5.4 Microcopy

Govtech microcopy is the strictest application of [Part 14](part-14-content-design.md) voice rules:

- Plain-language tier 1 default.
- Reading age 6th-grade or lower for citizen-facing.
- No jargon; no "Per regulation 21.3.4(b)".
- Reassuring (citizens often anxious about government interactions).

```yaml
govtech:
  application-received:
    en: "We got your application. We'll review it within {days} business days."
    vi: "Chúng tôi đã nhận đơn của bạn. Sẽ xem xét trong {days} ngày làm việc."
  more-info-needed:
    en: "We need more information to continue. Please {action}."
    vi: "Chúng tôi cần thêm thông tin. Vui lòng {action}."
  no-account-needed:
    en: "You don't need to create an account. We'll email you a link to come back to your application."
    vi: "Bạn không cần tạo tài khoản. Chúng tôi sẽ gửi liên kết qua email để bạn quay lại đơn của mình."
```

### 5.5 Compliance overlays

```yaml
CitizenWizard:
  section-508:
    requirement: "Conformance with WCAG 2.0 AA + supplementary."
    pattern: "Form fields fully accessible; instructions outside form; error recovery clear."
  plain-writing:
    requirement: "Plain language; reading age 6th-grade or below."
    pattern: "All copy lint-checked against tier-1 (Part 5 §15.1)."
  vn-decree-42:
    requirement: "Online public services available in Vietnamese; user identification standards."
    pattern: "Integration with VNeID; bilingual interface."
```

### 5.6 Public-sector a11y bar

All citizen surfaces target:

- WCAG 2.2 AA minimum.
- AAA where feasible (especially: 3.1.5 Reading Level, 1.4.6 Contrast Enhanced).
- Tested with diverse-cohort research ([Part 10](part-10-measurement-research-appendix.md) §4 + [Part 5](part-5-accessibility-localization.md) §17.2).

---

## 6. Vertical pack — Logistics

### 6.1 Scope

For products in:

- Shipping & freight.
- Last-mile delivery.
- Warehouse management (WMS).
- Fleet management.
- Supply chain visibility.

### 6.2 Regulatory anchors

| Regulation | Region | Pattern impact |
|---|---|---|
| **Hazardous Materials regs (DOT, ADR, IMDG)** | Global | Hazmat labelling; manifest patterns |
| **WCO standards** | Global (customs) | Customs declaration UX |
| **GDPR** | EU | Driver / customer data |
| **Vietnam Customs Law (54/2014/QH13)** | Vietnam | Import/export declarations |
| **HOS** (Hours of Service) | US | Driver work-hours tracking |

### 6.3 Pattern catalogue

#### 6.3.1 ShipmentTracker

- Map view + list view of shipments.
- Live position updates.
- ETA per stop.
- Status timeline (picked up, in transit, out for delivery, delivered).
- Exception highlighting (delayed, damaged, returned).

#### 6.3.2 ManifestEditor

For freight manifests:

- Per-line items with weight, volume, hazmat class.
- Auto-validation against truck capacity, regulatory limits.
- Export to industry standards (EDIFACT, ANSI X12).

#### 6.3.3 RoutePlanner

- Multi-stop route with optimisation.
- Driver hours-of-service awareness.
- Vehicle constraints (height, weight, hazmat).
- Real-time re-routing for traffic, weather.
- Mobile-first for drivers.

#### 6.3.4 WarehousePicker

For warehouse staff (often on mobile / handheld scanner):

- Pick list with optimal walk path.
- Barcode / QR scan integration.
- Voice-pick option (driver hands-busy).
- Exception handling (out of stock, damaged).
- Confirmation per pick.

#### 6.3.5 DriverMobileApp template

Specialised mobile-first template:

- Large touch targets (compact-mode forbidden).
- High-contrast default (sunlight readability).
- Voice-input for status updates.
- Offline-first (intermittent connectivity).

### 6.4 Microcopy

```yaml
logistics:
  delivery-attempted:
    en: "Delivery attempted at {time}. {reason}. We'll try again {next-attempt}."
    vi: "Đã thử giao hàng lúc {time}. {reason}. Sẽ thử lại {next-attempt}."
  exception-needed:
    en: "Exception: {description}. {action}."
    vi: "Vấn đề phát sinh: {description}. {action}."
  hazmat-warning:
    en: "Hazardous: {class}. Handle per training."
    vi: "Nguy hiểm: {class}. Xử lý theo quy trình."
```

### 6.5 Compliance overlays

```yaml
ManifestEditor:
  hazmat:
    requirement: "Hazmat shipments must include UN number, class, packing group."
    pattern: "Hazmat fields surfaced when class selected; validation enforced."
  customs:
    requirement: "International shipments require harmonised system codes."
    pattern: "HS code lookup integrated; per-country requirements surfaced."
```

---

## 7. The pack contribution model

### 7.1 New pack proposal

Any team may propose a new vertical pack by:

1. Filing a Pack RFC ([Part 8](part-8-governance-legal-commerce.md) §2 extension).
2. Naming a maintainer with industry expertise.
3. Demonstrating ≥ 3 product use cases that benefit.
4. Compliance scope outlined.

### 7.2 Pack additions

Adding a new pattern / template / component to an existing pack:

1. RFC subtype "Pack contribution" ([Part 8](part-8-governance-legal-commerce.md) §2 extension).
2. Pack maintainer + DS Lead approval.
3. Standard component lifecycle ([Part 17](part-17-component-lifecycle.md)).

### 7.3 Pack ownership rotation

Pack maintainers may rotate; transfer documented; continuity per [Part 16](part-16-adoption-designops.md) §7.2.

### 7.4 Pack deprecation

If a pack falls out of use (no product using it for ≥ 12 months), pack enters "minimal maintenance" status; if 24 months, deprecated; if 36 months, sunset.

---

## 8. Cross-pack patterns

Some patterns recur across packs:

| Pattern | Relevant packs |
|---|---|
| Audit log ([Part 11](part-11-enterprise-patterns.md) §5.11) | Fintech, Healthcare, Govtech |
| Multi-step wizard ([Part 11](part-11-enterprise-patterns.md) §5.6) | All packs |
| Document upload + e-sign | Fintech, Healthcare, Govtech |
| Re-authentication for sensitive actions | Fintech, Healthcare |
| Plain-language tier 1 | Govtech (default), all citizen surfaces |
| Mobile-first for field workers | Logistics, Healthcare (rural telemedicine), Education (rural) |

These remain in horizontal Parts 11, 12; packs document their pack-specific composition.

---

## 9. Vertical pack telemetry

Per [Part 10](part-10-measurement-research-appendix.md):

- Pack adoption per pack (which products use which packs).
- Pack-component usage telemetry.
- Pack-specific NPS (vertical experts asked).

---

## 10. Vertical pack governance

### 10.1 Per-pack ownership

Each pack has:

- A named maintainer (typically a senior designer / engineer with vertical experience).
- A subject-matter expert (from a partner law / consulting firm, contracted).
- A product team consuming the pack.

### 10.2 Pack-Level RFC reviews

Pack RFCs require reviewers with vertical knowledge:

- Fintech: at least one fintech engineer.
- Healthcare: at least one HIPAA-trained reviewer.
- Govtech: at least one a11y-AAA expert.
- Education: at least one COPPA/FERPA-trained reviewer.
- Logistics: at least one logistics-domain reviewer.

### 10.3 Compliance audit cadence

Per pack:

- **Annual** compliance audit by external industry expert.
- **Semi-annual** internal review.
- **On regulatory change** (new statute / amendment): emergency review within 90 days.

### 10.4 Pack documentation

Each pack has:

- A docs section (`/verticals/{pack}/`).
- A compliance map (regulation → pattern).
- Reference applications.
- Customer success stories (with consent).

---

## 11. Pack pricing and access

For internal CyberSkill products: packs are free; included in the main DS package.

For external customers (when applicable):

- Some packs may be premium (deep compliance investment).
- Per-pack license per tenant.
- Compliance-audit support optional add-on.

---


## 12. Vertical pack — HR Tech

### 12.1 Scope

For products in:

- Recruiting / Applicant Tracking Systems (ATS).
- Onboarding (Joiner workflows).
- Performance management (review cycles, calibration).
- Compensation (band management, equity).
- Learning & Development (LMS for employees).
- Payroll-adjacent (not payroll itself).
- People analytics.

### 12.2 Regulatory anchors

| Regulation | Region | Pattern impact |
|---|---|---|
| **GDPR — employee data** | EU | Worker data is personal data; lawful basis (often contract / legitimate interest) |
| **OFCCP / EEO-1** | US (federal contractors) | Demographic reporting; affirmative action |
| **AI Act — employment Annex III** | EU | Recruiting AI is high-risk; bias evaluation required |
| **Vietnam Labor Code 45/2019/QH14** | Vietnam | Worker protections, contract management |
| **GDPR Art. 22 — automated decisions** | EU | Hiring decisions cannot be solely automated |
| **Pay-transparency laws** (CO, NY, CA) | US states | Salary range required in postings |
| **Whistleblower Directive (EU 2019/1937)** | EU | Reporting channels in HR products |

### 12.3 Pattern catalogue

#### 12.3.1 ApplicantPipeline

Specialised KanbanBoard ([Part 12](part-12-advanced-components.md) §4):

- Columns: Sourced → Screened → Phone screen → Interview → Offer → Hired / Rejected.
- Each card: candidate name, role, source, recruiter, status indicators (response time, days-in-stage).
- Move events trigger automation (auto-emails, calendar invites).
- Compliance: rejection reasons categorised for EEO reporting.

#### 12.3.2 InterviewScorecard

Per-interview standardised scorecard:

- Competencies pre-defined by role.
- Levels per competency (Strong-No / No / Mixed / Yes / Strong-Yes).
- Required behavioural evidence per rating.
- Submission locks scorecard.
- Aggregated to hiring decision view.

#### 12.3.3 PerformanceReview

Multi-rater review surface:

- Self-assessment form (employee).
- Peer feedback collection (3–5 peers).
- Manager review form.
- Calibration grid (manager-of-managers).
- Final summary with rating + development plan.

#### 12.3.4 CompensationBand

Visualisation of comp bands per level:

- Per-level: floor / mid / ceiling.
- Per-employee: position within band; tenure indicator.
- Pay-equity audit overlay (gap analysis).
- Privacy-controlled (visible to authorised roles only).

#### 12.3.5 OrgChart

Hierarchical organisation visualisation:

- Composes Tree.Hierarchical ([Part 12](part-12-advanced-components.md) §27).
- Shows reporting structure, span of control.
- Click for employee details (role, tenure).
- Support for matrix orgs (dotted-line reporting).

#### 12.3.6 LearningPath

Sequence of courses / modules / certifications:

- Per-employee progress.
- Manager-assignable.
- Required vs recommended.
- Compliance certifications tracked separately (e.g., security training).

#### 12.3.7 BiasAuditDashboard

Per [Part 6](part-6-ai-ethics-sustainability.md) + EU AI Act Annex III:

- Recruiting funnel by demographic.
- Disparate-impact ratios per stage.
- Surfaced when ratios exceed configurable thresholds.
- Per-decision explanations available (no black-box AI hiring).

### 12.4 Microcopy

```yaml
hr-tech:
  candidate-rejected:
    en: "Decision: not moving forward. Reason: {reason}."
    vi: "Quyết định: không tiếp tục. Lý do: {reason}."
  performance-summary-saved:
    en: "Review saved. Calibration scheduled for {date}."
    vi: "Đã lưu đánh giá. Hiệu chỉnh diễn ra ngày {date}."
  interview-scorecard-required:
    en: "Submit your scorecard before {date} so we can move forward."
    vi: "Gửi phiếu chấm trước {date} để có thể tiếp tục."
```

### 12.5 Terminology

| Term | Vietnamese |
|---|---|
| Candidate | Ứng viên |
| Hiring manager | Quản lý tuyển dụng |
| Recruiter | Chuyên viên tuyển dụng |
| Performance review | Đánh giá hiệu suất |
| Calibration | Hiệu chỉnh |
| Pay band | Khung lương |
| Span of control | Phạm vi quản lý |

### 12.6 Compliance overlays

```yaml
ApplicantPipeline:
  ai-act-annex-iii:
    requirement: "Recruiting AI must be high-risk-compliant; explainability + human-in-loop."
    pattern: "Every AI-suggested ranking comes with explanation; final decision is human."
  ofccp:
    requirement: "EEO-1 reporting; demographic data collection at apply-time."
    pattern: "Voluntary self-identification form; data segregated from hiring decisions."
```

---

## 13. Vertical pack — Real Estate

### 13.1 Scope

For products in:

- Residential listings (sales, rentals).
- Commercial real estate (CRE).
- Property management / tenant management.
- Mortgage / lending.
- Real-estate-specific transaction management.

### 13.2 Regulatory anchors

| Regulation | Region | Pattern impact |
|---|---|---|
| **Fair Housing Act / FHA** | US | Anti-discrimination in advertising and rental decisions |
| **RESPA** | US | Settlement disclosure transparency |
| **TILA / Truth in Lending** | US | Mortgage disclosure |
| **GDPR — tenant data** | EU | Personal data of tenants; lawful basis |
| **Vietnam Real Estate Business Law 66/2014/QH13** | Vietnam | Brokerage, transparency |
| **California Senate Bill 326** | CA | HOA balcony inspection record-keeping |

### 13.3 Pattern catalogue

#### 13.3.1 ListingCard

Standardised property card:

- Photo carousel.
- Address + map preview.
- Price + price-history.
- Beds/baths/sqft/lot.
- Listing agent.
- Days-on-market.
- Saved indicator (heart).

#### 13.3.2 PropertyDetailView

Specialised DetailViewTemplate:

- Hero image + photo gallery.
- Map with neighborhood layer.
- Stats (price, sqft, lot, year built).
- Description (rich text).
- Schools / commute / walk-score (where licensable).
- Mortgage calculator inline.
- Schedule tour / Make offer.
- Compliance footer (per locale; equal-opportunity statements).

#### 13.3.3 TourScheduler

Self-service tour booking:

- Calendar view of available slots.
- Group / private tour selection.
- Pre-tour questionnaire.
- Confirmation + reminders.
- Cancel / reschedule.

#### 13.3.4 OfferBuilder

Offer-formation surface:

- Pre-fill from listing.
- Price + terms + contingencies.
- Pre-approval letter attachment.
- E-signature (composes [Part 12](part-12-advanced-components.md) §22 Signature).
- Submit to listing agent + audit log.

#### 13.3.5 RentalApplication

Tenant application form:

- Personal info, employment, references.
- Income verification documents (File.Upload, [Part 12](part-12-advanced-components.md) §2).
- Background-check consent (per [Part 8](part-8-governance-legal-commerce.md) §5.6).
- Equal-opportunity statement.
- Application fee processing (BillingCheckoutPattern, [Part 11](part-11-enterprise-patterns.md) §3.18).

#### 13.3.6 LeaseManagement

For property managers:

- Lease document store.
- Rent collection (via BillingTemplate, [Part 11](part-11-enterprise-patterns.md) §5.9).
- Maintenance request workflow.
- Renewal cadence + reminders.
- Move-in / move-out inspection forms.

### 13.4 Anti-discrimination

Per Fair Housing — listings and screening must:

- Not include protected-class language ("no kids", "Christian only").
- Apply consistent screening criteria across applicants.
- Document rejection reasons.

UI surfaces enforce this with linting (lexicon-based detection of FHA-violating language).

### 13.5 Microcopy

```yaml
real-estate:
  listing-saved:
    en: "Saved. Find it in your favorites."
    vi: "Đã lưu. Tìm trong mục yêu thích."
  application-received:
    en: "Application received. We'll respond within {days} days."
    vi: "Đã nhận đơn ứng tuyển. Chúng tôi phản hồi trong {days} ngày."
  fair-housing-statement:
    en: "We comply with the Fair Housing Act. All applicants receive equal consideration."
    vi: "Chúng tôi tuân thủ Luật Nhà ở Bình đẳng. Mọi ứng viên đều được xem xét bình đẳng."
```

---

## 14. Vertical pack — Energy & Utilities

### 14.1 Scope

For products in:

- Electric / gas / water utility customer portals.
- Smart-meter dashboards.
- Outage / restoration management.
- Energy efficiency programmes.
- Renewable energy (solar / wind generators) management.
- Demand-response programmes.

### 14.2 Regulatory anchors

| Regulation | Region | Pattern impact |
|---|---|---|
| **NERC CIP** | US bulk power | Critical infrastructure protection; access controls |
| **ENTSO-E** | EU | Cross-border energy data standards |
| **GDPR — smart-meter data** | EU | High-resolution consumption is personal data |
| **California SB 871** | CA | Smart-meter opt-out |
| **Vietnam EVN Decision 4495** | Vietnam | Customer portal standards |
| **TCFD climate disclosures** | Global | Per [Part 18](part-18-docs-site.md) §9 reference |

### 14.3 Pattern catalogue

#### 14.3.1 ConsumptionDashboard

- Time-series chart (hourly / daily / monthly).
- Comparisons (this period vs last period vs neighbors-average).
- Cost projection.
- Tier indicator (when billing is tiered).
- Anomaly highlight (unusual spikes).

Composes [Part 3g](part-3g-visualization.md) visualization + [Part 11](part-11-enterprise-patterns.md) §5.1 DashboardTemplate.

#### 14.3.2 OutageMap

Specialised Map.Visualization ([Part 12](part-12-advanced-components.md) §16):

- Coloured polygons showing outage areas.
- Per-area: customers affected, ETA restoration, cause.
- Crew dispatch indicators (where authorised).
- User can report outage from current location.

#### 14.3.3 BillBreakdown

Detailed energy bill view:

- Usage-based charges.
- Tiered breakdown (off-peak / shoulder / peak).
- Solar / battery credits (where applicable).
- Taxes + fees per regulation.
- Comparison to previous bills.
- Pay options (BillingTemplate, [Part 11](part-11-enterprise-patterns.md) §5.9).

#### 14.3.4 DemandResponseCallout

Real-time prompt during grid stress events:

- "Reduce usage now and earn ${amount}".
- Suggested actions (precool now, charge EV later).
- Opt-in confirmation.
- Post-event credit summary.

#### 14.3.5 SolarDashboard (for prosumers)

- Production vs consumption time-series.
- Net export / import.
- Battery state-of-charge.
- Earnings (where net-metering applies).

#### 14.3.6 CrewDispatch (operator-side)

For utility ops centres:

- Map (OutageMap above) + crew availability.
- Outage queue priority-sorted.
- Estimated restoration time per dispatch.
- Audit log of dispatch decisions.

### 14.4 Privacy

Smart-meter data is personal data:

- Aggregation-by-default for shared portals.
- Customer consent for sharing with third parties.
- Per [Part 8](part-8-governance-legal-commerce.md) §5 (PDPL) + GDPR Art. 9 sensitive-categories considerations (consumption can reveal lifestyle).

### 14.5 Microcopy

```yaml
energy:
  outage-reported:
    en: "Outage reported. We'll notify you when power is restored."
    vi: "Đã ghi nhận sự cố. Chúng tôi sẽ thông báo khi có điện lại."
  high-usage-alert:
    en: "Your usage today is {%} above your average."
    vi: "Mức tiêu thụ hôm nay cao hơn {%} so với mức trung bình."
  demand-response-event:
    en: "Grid event: reduce usage now and earn {amount}. {Opt in} | {Opt out}"
    vi: "Sự kiện lưới: giảm tiêu thụ ngay để nhận {amount}. {Tham gia} | {Bỏ qua}"
```

---

## 15. Vertical pack — Telco

### 15.1 Scope

For products in:

- Telecom service provisioning (mobile, broadband).
- Customer billing / account management.
- Network operations centre (NOC).
- Field service management.
- IoT-device fleet management.

### 15.2 Regulatory anchors

| Regulation | Region | Pattern impact |
|---|---|---|
| **CPNI** | US | Customer Proprietary Network Information protection |
| **GDPR — telco data** | EU | Call records, location are personal data |
| **EU ePrivacy Directive 2002/58** | EU | Communications privacy; cookie consent |
| **Vietnam Telecom Law 41/2009/QH12** | Vietnam | Customer service standards; data protection |
| **FCC TCPA** | US | Robocall / SMS consent |

### 15.3 Pattern catalogue

#### 15.3.1 ServiceCatalogue

Browse-able catalogue of available plans, add-ons, devices:

- Filter by needs (data, talk, international).
- Compare plans side-by-side (PlanComparisonModal — composes [Part 11](part-11-enterprise-patterns.md) §5.9 sub-pattern).
- Add to cart → BillingCheckoutPattern ([Part 11](part-11-enterprise-patterns.md) §3.18).

#### 15.3.2 UsageDashboard

Subscriber-facing usage:

- Data / minutes / SMS used vs allowance.
- Roaming usage separated.
- Daily / weekly / monthly views.
- Overage warnings.

#### 15.3.3 CallDetailRecord

CDR display:

- Date, time, number, duration, type, charge.
- Search / filter.
- Privacy: numbers masked beyond user's authority.
- Export for tax / business use.

#### 15.3.4 NetworkStatusMap

Specialised Map.Visualization:

- Coverage areas (3G/4G/5G).
- Outage / maintenance overlays.
- Speed-test heatmap (crowdsourced).

#### 15.3.5 NocOpsView (operator-side)

NOC-grade operations dashboard:

- Real-time alarms.
- Network topology.
- KPIs (latency, packet loss, capacity).
- Incident workflows (composes JobsQueuePattern, [Part 11](part-11-enterprise-patterns.md) §3.21).

#### 15.3.6 SubscriberSupport

CSR-facing customer detail:

- Account summary.
- Recent events (per RecordTimelinePattern, [Part 11](part-11-enterprise-patterns.md) §3.5).
- Active troubles.
- Quick actions (credit, plan change, port).

### 15.4 Privacy

Strict per Vietnam Telecom Law + GDPR + CPNI:

- Re-auth required for sensitive views (CDR, location).
- Audit log every access.
- Customer-data sharing with third parties requires explicit consent.

### 15.5 Microcopy

```yaml
telco:
  data-cap-near:
    en: "{%} of your data used. {Top up | Wait until reset}"
    vi: "Đã dùng {%} dung lượng. {Nạp thêm | Chờ chu kỳ mới}"
  service-restored:
    en: "Service restored. Sorry for the disruption."
    vi: "Dịch vụ đã được khôi phục. Xin lỗi về sự bất tiện."
```

---

## 16. Vertical pack — Hospitality

### 16.1 Scope

For products in:

- Hotel / short-term-rental booking.
- Hotel property management systems (PMS).
- Restaurant reservations.
- Tour / activity booking.
- Loyalty programmes.

### 16.2 Regulatory anchors

| Regulation | Region | Pattern impact |
|---|---|---|
| **PCI-DSS v4** | Global (cards) | Payment-data handling |
| **GDPR — guest data** | EU | Booking data; consent for marketing |
| **TCPA** | US | SMS confirmations require consent |
| **Vietnam Tourism Law 09/2017/QH14** | Vietnam | Tourist business standards |
| **Various national accessibility codes** | Regional | Public-accommodation accessibility |

### 16.3 Pattern catalogue

#### 16.3.1 BookingFlow

Multi-step booking:

- Search (dates, guests, location).
- Results (with map view).
- Property detail.
- Date / room selection.
- Guest info.
- Add-ons.
- Payment (PCI-compliant).
- Confirmation.

Each step is a wizard step (per [Part 11](part-11-enterprise-patterns.md) §5.6).

#### 16.3.2 RoomCalendar

Per-property availability calendar (composes Calendar.Scheduler, [Part 12](part-12-advanced-components.md) §3):

- Per-room availability.
- Drag-rate adjustment for revenue management.
- Block / unblock dates.
- Group-block (multiple rooms for events).

#### 16.3.3 GuestProfile

Guest detail with:

- Booking history.
- Preferences (room type, pillows, dietary).
- Loyalty status.
- Communication preferences.
- Notes (housekeeping, front-desk).

#### 16.3.4 CheckInExpress

Self-service check-in:

- ID verification (composes IdentityVerification from Govtech, §5.3.3).
- Room selection (where allowed).
- Key issuance (digital + physical option).
- Welcome message.

#### 16.3.5 HousekeepingBoard

Kanban for housekeeping ([Part 12](part-12-advanced-components.md) §4):

- Columns: Vacant-Dirty → Cleaning → Vacant-Clean → Inspected → Available.
- Drag rooms between states.
- Photos for inspection.

#### 16.3.6 RestaurantReservation

For restaurant arms:

- Time-slot picker.
- Party size.
- Special requests.
- Confirmation + reminder.
- Waitlist management.

### 16.4 Microcopy

```yaml
hospitality:
  booking-confirmed:
    en: "Booked! See you on {date}."
    vi: "Đã đặt phòng! Hẹn gặp ngày {date}."
  check-in-instructions:
    en: "Check in: {time}. Need a late arrival? {Contact us}"
    vi: "Nhận phòng: {time}. Cần đến muộn? {Liên hệ}"
```

---

## 17. Pack composition — multi-vertical customers

Some customers operate in two or more verticals simultaneously. Examples:

- **Fintech-for-healthcare** — financial product targeting medical practices (combines Fintech + Healthcare).
- **HR-tech-for-hospitality** — workforce platform for hotels (HR Tech + Hospitality).
- **Real-estate-tech-for-energy** — building-management platform with energy dashboards.

When two packs apply:

- **Compose, don't fork.** Both packs' patterns coexist.
- **Strictest compliance wins.** If Healthcare requires PHI handling, that overrides Fintech defaults for any UI touching PHI.
- **Microcopy reconciliation.** Where packs conflict on terminology (e.g., "Customer" in Fintech vs "Patient" in Healthcare), the customer chooses; microcopy keys are namespaced per pack.
- **Regulatory union.** All applicable regulations apply; no "we picked the looser one".

The vertical-pack maintainers coordinate compatibility per [Part 16](part-16-adoption-designops.md) (Adoption); a multi-vertical product gets a senior-DesignOps engineer assigned for the engagement.

---

## 18. Future packs (under consideration for v1.1+)

Beyond the 10 packs in v1.0, additional packs proposed but not yet built:

- **Manufacturing / Industrial IoT** — production-floor dashboards, OEE, asset management.
- **Agritech** — farm management, supply chain to processor.
- **Government — citizen services beyond Govtech** — military, social services, justice.
- **Sports / esports** — fan engagement, team operations.
- **Media / publishing** — editorial workflow, content licensing.
- **Non-profit / charity** — donor management, programme tracking.
- **Higher Education** (beyond §4 Education) — university administration, alumni.
- **Banking — investment** (beyond §2 Fintech retail) — capital-markets-specific.

Each would need a Pack RFC proving customer demand before commitment.

---

## 19. Vertical pack — HR Tech


### 19.1 Pack purpose

HR Tech surfaces — **recruiting, performance, payroll, org-chart, time-and-attendance, employee self-service** — span more regulatory frameworks per surface than any other vertical. The pack codifies the cross-jurisdictional patterns so a single CyberSkill product can serve EU + US + Vietnam + APAC employees without rewriting compliance UX per geography.

### 19.2 Regulatory frame

| Regime | Source | What it constrains |
|---|---|---|
| **OFCCP** (US federal contractors) | 41 CFR Parts 60-1 to 60-300 | Self-ID forms (race / ethnicity / gender / veteran / disability) — **voluntary** + **separated from selection decision** + **anonymised aggregate reporting only** |
| **GDPR Art. 88 (employee data)** | EU GDPR + national derogations | Lawful basis usually NOT consent (power asymmetry); employee monitoring requires DPIA; subject access requests within 30 days |
| **EU AI Act Art. 6 + Annex III §4** | Reg. EU 2024/1689 | Recruitment AI = high-risk; mandatory transparency, human oversight, bias evaluation per [Part 6](part-6-ai-ethics-sustainability.md) §3 |
| **Vietnam Labor Code 45/2019/QH14** | + PDPL Law 91/2025/QH15 | Personal data handling for employees; required notices in Vietnamese; consent for non-employment data uses |
| **EEOC** (US — civil rights) | 42 U.S.C. § 2000e et seq. | Records-retention rules for selection decisions (1 year); pay-transparency posting requirements per state |
| **Saudi Arabia PDPL + Saudization (Nitaqat)** | Royal Decree M/19 + L/M Decree | Saudi-national-quota tracking on org charts; employment-data residency |
| **California pay transparency (SB 1162)** | + 14 other US states | Salary range posted on every job listing; gender / race / ethnicity pay-gap reporting |
| **OECD Privacy Guidelines** | + national derogations | Cross-border employee-data transfer (parent → subsidiary) requires SCCs |

The pack codifies **default-private + opt-in transparency** per [Part 6](part-6-ai-ethics-sustainability.md) §3 — surfaces show the employee what the employer can see, when.

### 19.3 Surfaces — primary inventory

| Surface | Notes |
|---|---|
| Job-listing template | Pay-transparency-aware (per-state); accessibility statement per WCAG 2.2 SC 1.3.5; bilingual EN+VN at minimum |
| Application flow | OFCCP-compliant self-ID (separated from selection); accessible authentication per WCAG 2.2 SC 3.3.8 |
| Candidate-review template | Bias-disclosure UI per [Part 6](part-6-ai-ethics-sustainability.md) §3 (per AI-assist score, show rationale); HumanReviewGate ([Part 3h](part-3h-ai-chat.md)) wraps any AI-recommended hire/no-hire |
| Onboarding wizard | Multi-step form with draft persistence ([Part 11](part-11-enterprise-patterns.md) §3); paperwork e-signature with audit trail; contract delivery in employee's primary language |
| Org-chart explorer | Privacy-first (no compensation visible by default; gated by role); honours OFCCP aggregate-only reporting |
| Time-and-attendance | Trauma-informed per [Part 5](part-5-accessibility-localization.md) §21.2 (no shaming microcopy on tardiness; opt-in geolocation only) |
| Performance-review template | Calibration-aware UI ([Part 11](part-11-enterprise-patterns.md) patterns); 360-feedback with anonymity contract; bias-disclosure per [Part 6](part-6-ai-ethics-sustainability.md) |
| Compensation review | Pay-transparency-aware; pay-gap visualisation (aggregated; audit-mode for HRBPs) |
| Self-service portal | Employee-data subject-access flow per GDPR Art. 15 + PDPL Art. 18; export in machine-readable form |
| Termination flow | Trauma-informed ([Part 5](part-5-accessibility-localization.md) §21.2); record-retention per regime; offboarding checklist with audit trail |

### 19.4 Pack-specific patterns (extensions to Part 11)

- **OFCCPSelfIdentificationForm** — separated section before/after the application; cannot be required to proceed; not visible to interviewers.
- **PayTransparencyBanner** — per-state pay-range disclosure on job listings; auto-detects employer location via [Part 8](part-8-governance-legal-commerce.md) §13 multi-tenant role model.
- **CalibrationView** — calibration session UI showing manager-rating distributions vs target distribution; anonymises individual records below 5-employee bucket.
- **BiasAuditDashboard** (HRBP-only) — per-protected-attribute hiring/promotion outcomes; honours OFCCP aggregate-only rule (no row < 5 employees).
- **EmployeeDataExportFlow** — GDPR Art. 15 / PDPL Art. 18 subject-access UI; produces a JSON + PDF bundle.

### 19.5 Pack-specific tokens (extensions to `tokens/`)

- `color.role.recruiter`, `color.role.hiring-manager`, `color.role.candidate`, `color.role.employee`, `color.role.hrbp` — role-coded surface accents (subtle; never the only signal).
- `space.form.section-gap` — extra-wide gap (≥ `space.10`) between OFCCP self-ID block and the rest of the form, signalling separation.

### 19.6 Cognitive accessibility (Part 5 §21.1)

HR Tech surfaces frequently encounter users in distressed states (job hunters; performance-review recipients; offboarding). Apply trauma-informed defaults:

- No countdown timers on application flows (WCAG 2.2 SC 2.2.1 + [Part 5](part-5-accessibility-localization.md) §21.2 #1 safety).
- "Save and resume" available everywhere; auto-saves every 30 seconds.
- Error messages reference the field by quote, not by index ("we couldn't read your visa number 'AB123'" not "field 7 invalid").
- Reading-grade tier 1 ([Part 5](part-5-accessibility-localization.md) §20.5) for citizen-employee-facing flows in Vietnam, US states with low average literacy, and EU member states with non-native-speaker employee populations.

### 19.7 Pack RFC

Per [Part 8](part-8-governance-legal-commerce.md) §16, ship of this pack requires a Pack RFC. The §14.19 expansion entry now references this section; future expansion of HR Tech (compensation-benchmarking, learning management) follows the same RFC path.

### 19.8 Audit-score impact

| Criterion | Before | After §19 lands | Path to 5 |
|---|---|---|---|
| §14.19 HR Tech expansion | menu | **shipped (sketch-class)** | First customer engagement uplifts to spec-class |
| B5.7 Inclusive design | 4 | 4 sustained | Trauma-informed + cognitive defaults strengthen |
| B9.1 No dark patterns | 5 | 5 sustained | Anti-pattern policy now covers HR-specific traps (forced-OFCCP, shaming microcopy) |
| B9.7 Inclusive risk review | 4 | **5** | Trauma-informed surfaces explicitly enumerated for HR vertical |

### 19.9 References

- 41 CFR Parts 60-1 to 60-300 — OFCCP regulations
- EU GDPR Art. 88 — employee data
- EU AI Act (Reg. EU 2024/1689) Annex III §4 — recruitment AI as high-risk
- Vietnam Labor Code (Law 45/2019/QH14) + PDPL (Law 91/2025/QH15)
- California SB 1162 — pay-transparency posting
- Pairs with [Part 5](part-5-accessibility-localization.md) §21.2 (trauma-informed surfaces) and [Part 6](part-6-ai-ethics-sustainability.md) §3 (AI ethics)

---

## 20. Cross-references

- **[Part 1](part-1-foundations.md) §3** — voice (verticals adapt within voice; never violate)
- **[Part 5](part-5-accessibility-localization.md) §15** — cognitive accessibility (plain-language tiers, especially for Govtech)
- **[Part 5](part-5-accessibility-localization.md) §17** — diverse research cohorts (verticals run their own research)
- **[Part 6](part-6-ai-ethics-sustainability.md)** — AI ethics (vertical AI features held to same standards)
- **[Part 8](part-8-governance-legal-commerce.md) §2** — Pack RFC subtype
- **[Part 8](part-8-governance-legal-commerce.md) §5–9** — privacy laws (verticals strengthen for sensitive categories)
- **[Part 10](part-10-measurement-research-appendix.md) §4** — research cohorts
- **[Part 11](part-11-enterprise-patterns.md)** — page templates verticals adapt
- **[Part 12](part-12-advanced-components.md)** — Tier-2 components verticals specialise
- **[Part 13](part-13-theming-whitelabel-embed.md)** — theming applies to verticals
- **[Part 14](part-14-content-design.md)** — vertical microcopy keys
- **[Part 15](part-15-tooling.md)** — pack tooling (CLI scaffolds packs)
- **[Part 16](part-16-adoption-designops.md)** — pack adoption tracking
- **[Part 17](part-17-component-lifecycle.md)** — pack lifecycle
- **[Part 18](part-18-docs-site.md)** — pack documentation pages

---

## 21. References

| Source | Year | Use |
|---|---|---|
| Salesforce Industries (formerly Vlocity) | continuous | Vertical-cloud reference |
| SAP Fiori for Industries | continuous | Vertical-pack reference |
| Microsoft Industry Clouds | continuous | Reference |
| HIPAA Security Rule | continuous | Healthcare baseline |
| PCI-DSS v4.0 | 2022 | Fintech baseline |
| FERPA | continuous | Education baseline |
| Section 508 / EN 301 549 | continuous | Govtech baseline |
| Vietnam laws cited per pack | various | Local compliance |
| WCO standards | continuous | Logistics customs |
| HL7 FHIR (healthcare interop) | continuous | Healthcare data reference |
| EDIFACT / ANSI X12 (logistics) | continuous | Logistics data reference |
| Diátaxis (for vertical-pack docs) | continuous | Documentation theory |

---

*End of Part 19. Next: [Part 20](part-20-layout-responsive.md) — Layout & Responsive System (deep dive).*
