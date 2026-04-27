# The CyberSkill Global Design System

## Part 3h — Components: AI & Chat

*Authoritative specifications for the 12 AI & Chat components: **ChatThread**, **ChatMessage** (user / assistant / system / tool), **StreamingResponse**, **CitationCard**, **ConfidenceIndicator**, **HumanReviewGate**, **PromptInput**, **PromptLibraryBrowser**, **ToolCallDisplay**, **AIDisclosureBadge**, **RedactionMarker**, **C2PAProvenanceBadge**. These are the surface-level expression of the ethical, regulatory, and operational rules in [Part 6](part-6-ai-ethics-sustainability.md) (AI-Native, Ethics, Sustainability) and [Part 8](part-8-governance-legal-commerce.md) (Governance, Legal). Every component honours **EU AI Act** transparency obligations (Art. 50, Art. 14), **ISO/IEC 42001:2023** AI Management System controls, **C2PA Technical Specification v2.2** content provenance, **PDPL Law 91/2025/QH15** Art. 30 disclosure for AI processing, and **Decree 356/2025/ND-CP** sensitive-data redaction.*

---

## Introduction — what AI surfaces owe the user

AI surfaces fail in characteristic ways. They overclaim certainty (presenting a guess as a fact); they fabricate citations (citing what does not exist or misquoting what does); they conceal automation (running a model where the user expects deterministic computation); they bury consent (collecting prompt content without lawful basis); they consume attention as if it were free.

The system commits to **six cross-component rules** that prevent these failure modes at the architectural level:

1. **Disclosure is universal.** Every AI-generated region carries an `AIDisclosureBadge`. There is no fine-print-only AI in any CyberSkill product. EU AI Act Art. 50 (applicable in phases per the Regulation's entry-into-force schedule; European Commission) is the legal floor; brand voice ([Part 1](part-1-foundations.md) §3.4) is the everyday reason.
2. **Confidence is calibrated and tiered.** Three tiers — **Low <60 %**, **Medium 60–85 %**, **High >85 %**. Low-confidence outputs are **withheld by default**; the user must opt-in to see them. Medium-confidence outputs are **disclaimed**. High-confidence outputs are **shown without disclaimer but always disclosed**.
3. **Citations are verified before render.** Every AI-cited source is verified to exist and to contain the cited passage. A model-fabricated citation is dropped; the user is shown a Low-confidence note that the answer could not be sourced.
4. **Sensitive domains require human gates.** Legal, medical, financial, and user-rights outputs go through a `HumanReviewGate` before user display. EU AI Act Art. 14 (human oversight for high-risk systems) is the regulatory reading; ISO/IEC 42001 Annex A control 6.1.4 (responsible-AI objective) is the management-system reading.
5. **Provenance is signed and verifiable.** AI-generated or AI-edited media carries a **C2PA 2.2 manifest** (Technical Specification v2.2, published 1 May 2025; c2pa.org). The system signs on emit, verifies on render, and surfaces a `C2PAProvenanceBadge` with the signature status.
6. **PDPL applies to prompts.** Prompts that contain personal data are processed under PDPL Art. 10–12 (consent), Art. 14 (data subject rights), and Art. 30 (big-data / AI processing disclosure). Decree 356/2025/ND-CP forbids default consent and bundled consent — both of which are easy traps in AI flows. Sensitive personal data (CCCD photos, biometrics, health, financial) is redacted by default in chat exports per Decree 356.

The governing standards: **EU AI Act** (European Commission; entered into force 1 August 2024; prohibited practices applicable 2 February 2025; GPAI obligations 2 August 2025; high-risk obligations 2 August 2026; full applicability 2 August 2027); **ISO/IEC 42001:2023** (AI Management System; iso.org/standard/42001); **C2PA Technical Specification v2.2** (1 May 2025; c2pa.org); **Model Context Protocol spec 2025-11-25** (Anthropic; Linux Foundation Agentic AI Foundation); **PDPL Law 91/2025/QH15** (effective 1 January 2026; LuatVietnam); **Decree 356/2025/ND-CP** (effective 1 January 2026; Tilleke); **WCAG 2.2** SC 1.1.1, 1.3.1, 1.4.1, 4.1.3.

---

## 1. ChatThread

### 1.1 Name

`ChatThread` — *Cuộc trò chuyện*.

### 1.2 Purpose

The container for an AI-mediated conversation between user, assistant, system, and (optionally) tools. The ChatThread is the most-used AI surface in the system and the most regulatorily sensitive — every disclosure, redaction, and audit obligation routes through it.

### 1.3 Anatomy

```
+----------------------------------------------------+
|  Trợ lý CyberSkill          [AI ⓘ]    [⋯]         |
|  Mô hình: Sonnet · Phiên: 24 phút                  |
+----------------------------------------------------+
|                                                     |
|  [Avatar] Bạn (10:01)                              |
|  Giúp tôi tóm tắt báo cáo Q4.                      |
|                                                     |
|  [AI Avatar] Trợ lý (10:01) [AI ⓘ]                 |
|  Đây là tóm tắt của 4 nguồn (3 trích dẫn,          |
|  độ tin cậy Trung bình).                            |
|  ────                                               |
|  [Citations: 1 2 3]    [Confidence: Medium]         |
|                                                     |
|  [Avatar] Bạn (10:02)                              |
|  …                                                  |
|                                                     |
+----------------------------------------------------+
| [PromptInput]                              [⏎ Gửi]  |
+----------------------------------------------------+
```

Header (title, model info, AI badge, options menu); message stream; composer (PromptInput, §7); transcript export controls.

### 1.4 Variants

| Variant | Use |
|---|---|
| `default` | Standalone assistant surface |
| `embedded` | Embedded inside an application surface (sidebar) |
| `multi-agent` | Multiple assistants participate (e.g., reviewer + drafter) |
| `read-only` | Historical thread; no composer |

### 1.5 Sizes

Container-sized. Composer height adapts to PromptInput auto-grow.

### 1.6 States

`active`, `archived`, `read-only`, `error` (model unreachable), `rate-limited`.

### 1.7 Props

```ts
import type { ReactNode } from 'react';

export interface ChatThreadProps {
  /** Localised title. */
  title: string;
  /** Model identifier; surfaced for transparency. */
  modelId: string;
  /** Modes affect disclosure — 'general', 'legal', 'medical', 'financial' (each enables HumanReviewGate). */
  mode?: 'general' | 'legal' | 'medical' | 'financial';
  /** Variant. */
  variant?: 'default' | 'embedded' | 'multi-agent' | 'read-only';
  /** Messages. */
  messages: ChatMessageData[];
  onSend?: (text: string, attachments?: File[]) => void;
  /** Streaming partial. */
  streaming?: { messageId: string; partial: string };
  /** Locale for UI strings + redaction rules. */
  locale?: string;
  /** Allow export. Default true. */
  exportable?: boolean;
}
```

### 1.8 Accessibility

The message stream uses `role="log"` with `aria-live="polite"` so each new message announces incrementally. `aria-atomic="false"` so chunks announce as they stream in (for partial messages). The header is a `<header>` element with the AIDisclosureBadge present at all times when an AI participates.

### 1.9 PDPL & redaction on copy / export

Transcript export is downloadable as plain text, Markdown, or JSON with a **C2PA 2.2 manifest** for the export (the export itself is a media artefact whose provenance is the conversation). Sensitive personal data per Decree 356/2025/ND-CP is **auto-masked on copy and export** by default:

- CCCD photos / numbers redacted.
- Phone, email, financial values masked.
- Biometric identifiers redacted.
- Health information redacted.

A "Reveal" option per export entry is available with audit-log entry. Reveal-on-export requires a **business reason** (selectable: *Audit*, *Legal*, *Customer support*, *Other (specify)*) and explicit user identity recording.

### 1.10 Audit log

Every message, every tool call, every reveal, every export is logged to the audit log per [Part 8](part-8-governance-legal-commerce.md) §14. Audit-log retention follows PDPL Art. 21 DPIA requirements.

### 1.11 SR announcements

| Event | Vietnamese | English |
|---|---|---|
| New user message | "Tin nhắn từ bạn" | "Message from you" |
| New assistant message | "Tin nhắn từ trợ lý AI, độ tin cậy Trung bình" | "Message from AI assistant, medium confidence" |
| Tool call | "Đã gọi công cụ: tìm-khách-hàng" | "Tool called: find-customer" |
| System message | "Hệ thống: phiên đã hết hạn" | "System: session expired" |

### 1.12 Do

- **Show model identifier and session length** in the header so users know which AI they are talking to.
- **Mask sensitive data** on copy/export; require explicit reveal.
- **Localise** all UI strings; PDPL disclosure in VN locale uses formal-warm register.
- Make the **AIDisclosureBadge** persistently visible in the header.

### 1.13 Don't

- Hide the model identifier — Art. 50 transparency.
- Allow free copy of sensitive content without redaction.
- Strip C2PA from exports.

### 1.14 Related

- All other components in this Part.

### 1.15 React example

```tsx
import { ChatThread } from '@cyberskill/ai';

export function AssistantSurface() {
  return (
    <ChatThread
      title="Trợ lý CyberSkill"
      modelId="claude-sonnet-4-6"
      mode="general"
      messages={messages}
      onSend={onSend}
      locale="vi-VN"
    />
  );
}
```

### 1.16 / 1.17 Web Components / Vue

```html
<cs-chat-thread title="Trợ lý CyberSkill" model-id="claude-sonnet-4-6" locale="vi-VN">…</cs-chat-thread>
```

### 1.18 Vietnamese content examples

- Title *Trợ lý CyberSkill*; model header *Mô hình: Sonnet · Phiên: 24 phút*; mode-specific headers *Chế độ pháp lý — yêu cầu duyệt người*; export options *Tải xuống Markdown / Văn bản / JSON*.

### 1.19 Tokens

```
--cs-color-surface-1, --cs-color-surface-2, --cs-color-surface-3
--cs-color-border-subtle
--cs-color-ai-accent           (= subbrand-ai oklch(0.7 0.16 305))
--cs-radius-md, --cs-radius-lg
--cs-spacing-3, --cs-spacing-4
--cs-z-chat-modal              (when used as Modal variant)
```

### 1.20 Test

- axe-core: `role="log"` + `aria-live="polite"` correct; header announces.
- AIDisclosureBadge persistent in header.
- Sensitive masking on copy/export verified.
- C2PA manifest on export verified by external validator.

---

## 2. ChatMessage (user / assistant / system / tool)

### 2.1 Name

`ChatMessage` — *Tin nhắn*.

### 2.2 Purpose

A **single utterance** in a conversation. Distinct rendering and semantics per role.

### 2.3 Anatomy

Per role:

```
[user]
  [Avatar] Bạn (10:01)
  Giúp tôi tóm tắt báo cáo.

[assistant]
  [AI Avatar] Trợ lý (10:01) [AI ⓘ] [Confidence: Medium]
  Đây là tóm tắt…
  ────
  [Citations: 1 2 3]                [Copy] [Regenerate]

[system]
  ─────  Hệ thống: Phiên đã hết hạn  ─────

[tool]
  [Tool] Đã gọi tìm-khách-hàng (340 ms)
         Hiện argument · Hiện kết quả
```

### 2.4 Variants

`user` / `assistant` / `system` / `tool`. The four roles have visually distinct treatments to prevent role confusion.

### 2.6 States

`default`, `streaming` (partial; for assistant), `failed` (model error), `flagged` (user marked as inaccurate), `redacted` (sensitive content masked).

### 2.7 Props

```ts
export interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system' | 'tool';
  /** ISO timestamp. */
  timestamp: string;
  /** Body — Markdown for assistant; plain text for others by default. */
  content: string;
  /** Format. */
  format?: 'markdown' | 'plain';
  /** Author display name (user) or model id (assistant). */
  author?: string;
  /** Confidence — required for assistant role. */
  confidence?: 'low' | 'medium' | 'high';
  /** Citations — assistant only. */
  citations?: Citation[];
  /** Tool call detail — tool role only. */
  toolCall?: ToolCallData;
  /** Streaming partial. */
  streaming?: boolean;
  /** Per-message actions. */
  actions?: ('copy' | 'regenerate' | 'flag' | 'speak' | 'export')[];
}
```

### 2.8 Accessibility

`role="article"` on each message. Role is visually + structurally distinguishable, **not by colour alone**:

- **User** messages — right-aligned in LTR (left in RTL); Avatar.
- **Assistant** messages — left-aligned in LTR; AI Avatar with `[AI]` badge embedded.
- **System** messages — centred, with an icon, distinct from user messages and assistant messages.
- **Tool** messages — left-aligned with `[Tool]` badge; collapsed args/result by default.

The role is announced first in the SR reading: *"Tin nhắn từ bạn"* / *"Tin nhắn từ trợ lý AI"* / *"Tin nhắn hệ thống"* / *"Lời gọi công cụ"*.

### 2.9 System messages

System messages **are never styled to impersonate the user** — they have an unmistakable visual treatment (centred, icon, distinct background) so a malicious prompt-injection that tries to forge a system message is visually obvious to the user.

### 2.18 Vietnamese content

- User: *Giúp tôi tóm tắt báo cáo này.*
- Assistant: *Đây là tóm tắt của 4 nguồn (3 trích dẫn, độ tin cậy Trung bình).*
- System: *Phiên trò chuyện đã hết hạn. Đăng nhập lại để tiếp tục.*
- Tool: *Đã gọi tìm-khách-hàng, hoàn tất trong 340 ms*.

### 2.19 Tokens

```
--cs-color-message-user-bg, --cs-color-message-assistant-bg, --cs-color-message-system-bg, --cs-color-message-tool-bg
--cs-color-ai-accent
--cs-radius-md
```

### 2.20 Test

- Role announced correctly across NVDA, VoiceOver, TalkBack.
- System message visually distinguishable from user message in monochrome (failure of colour-only rendering).
- VN diacritics in author names render unclipped.

---

## 3. StreamingResponse

### 3.1 Name

`StreamingResponse` — *Phản hồi truyền liên tục*.

### 3.2 Purpose

Render token / chunk-by-chunk generated content. The dominant visual primitive for assistant messages in modern AI UIs.

### 3.3 Anatomy

A streaming text region that grows as chunks arrive, with a cancel button always present.

### 3.4 Behaviour

- **Chunk cadence** — 60 ms default (matches typical Anthropic / OpenAI streaming intervals).
- **Markdown progressive render** — partial Markdown is rendered safely; incomplete code blocks are escaped until closing fence arrives.
- **HTML-injection protection** — every chunk passes through DOMPurify (CyberSkill allow-list) before render.
- **Reduced-motion** — chunks render in batches of larger size (200 ms cadence) to reduce visual update churn.
- **Cancel** — the cancel button is **always present** during stream; `Esc` cancels.

### 3.7 Props

```ts
export interface StreamingResponseProps {
  /** Already-rendered text. */
  rendered: string;
  /** Streaming chunks; an async iterable. */
  stream: AsyncIterable<string>;
  onChunk?: (chunk: string) => void;
  onComplete?: (full: string) => void;
  onCancel?: () => void;
  /** Format; default 'markdown'. */
  format?: 'markdown' | 'plain';
  /** Live-region politeness; default 'polite'. */
  politeness?: 'off' | 'polite' | 'assertive';
}
```

### 3.8 Accessibility

The streaming region is `aria-live="polite"` (configurable; off disables incremental announcements for users who find streaming distracting). `aria-busy="true"` while streaming; flips to `false` on complete.

### 3.9 Cancellation announcement

`aria-live="polite"` announces cancel and complete: *"Đã huỷ"* / *"Cancelled"*; *"Hoàn tất, 240 từ"* / *"Complete, 240 words"*.

### 3.13 Don't

- **Block the cancel button** during streaming — keyboard users must always be able to stop.
- Render unsanitised HTML.
- Use `assertive` politeness for normal streaming — only for safety-critical content.

### 3.18 VN content

Cancel label *Huỷ*; complete announcement *Hoàn tất, 240 từ*.

### 3.20 Test

- DOMPurify strips `<script>` mid-stream.
- `Esc` cancels.
- Reduced-motion batches chunks.

---

## 4. CitationCard

### 4.1 Name

`CitationCard` — *Thẻ trích dẫn*.

### 4.2 Purpose

Surface the **source backing an AI claim**. Inline numbered references in the body link to corresponding cards.

### 4.3 Anatomy

```
[1]
+----------------------------------------+
| 📄 Nghị định 356/2025/NĐ-CP            |
|    luatvietnam.vn · 31/12/2025         |
|----------------------------------------|
| "Nghiêm cấm sự đồng ý mặc định hoặc... |
| ...gây nhầm lẫn cho chủ thể dữ liệu."  |
|----------------------------------------|
| Liên quan: 92%   [Mở nguồn ↗]          |
+----------------------------------------+
```

Thumbnail / icon, title, source domain, date, excerpt (the cited passage), relevance score (0–100), link to full source.

### 4.7 Props

```ts
export interface CitationCardProps {
  number: number;             // [1], [2], …
  title: string;
  source: string;             // domain or publisher
  date?: string;              // ISO
  excerpt: string;            // the cited passage
  url: string;                // full source
  relevance?: number;         // 0–100
  /** Verification status. */
  verified: boolean;          // true after server-side verification; false drops the citation
}
```

### 4.8 Accessibility

Inline numbered reference `[1]` is a `<sup><a aria-describedby="citation-1">[1]</a></sup>`; the corresponding `CitationCard` has `id="citation-1"`. Hover/focus shows preview. The cited passage in the card is set in a `<blockquote>` with the source attribution.

### 4.9 Verification

**Citations are verified before render.** A model-fabricated citation (URL does not resolve, or resolves but does not contain the cited passage) is dropped before rendering — and the assistant's confidence is downgraded accordingly. A Low-confidence note explains: *"Không thể xác minh nguồn cho phần này — đã rút lại nội dung."*

### 4.12 Do

- One citation per claim minimum.
- Announce **citation count** in the assistant message header.
- Verify before render.

### 4.13 Don't

- **Fabricate citations** — drop unverified.

### 4.18 Vietnamese content

Source examples *Nghị định 356/2025/NĐ-CP — luatvietnam.vn*; *Luật BVDLCN 91/2025/QH15 — luatvietnam.vn*; *EU AI Act — eur-lex.europa.eu*.

### 4.19 Tokens

```
--cs-color-surface-2
--cs-color-border-subtle
--cs-radius-md
--cs-shadow-1
```

---

## 5. ConfidenceIndicator

### 5.1 Name

`ConfidenceIndicator` — *Chỉ báo độ tin cậy*.

### 5.2 Purpose

Communicate the model's **calibrated confidence**, distilled to three tiers users can read at a glance.

### 5.3 Anatomy

A small pill containing **shape + colour + word**:

```
▽ Thấp           (Low)        warm-amber, hollow triangle
◐ Trung bình     (Medium)     warm-ochre, half-filled circle
● Cao            (High)       warm-success, filled circle
```

### 5.4 Tiers

| Tier | Range | Default behaviour |
|---|---|---|
| Low | < 60 % | Content **withheld by default**; user opts in to reveal |
| Medium | 60–85 % | Content shown with **disclaimer**: *"Hãy xem lại trước khi sử dụng."* |
| High | > 85 % | Content shown **without disclaimer** (but always with AIDisclosureBadge) |

### 5.7 Props

```ts
export interface ConfidenceIndicatorProps {
  tier: 'low' | 'medium' | 'high';
  /** Optional numeric confidence (0–100) for diagnostic display. */
  numeric?: number;
  /** Show explanation Tooltip. */
  showExplanation?: boolean;
}
```

### 5.8 Accessibility

Shape + colour + word, never colour alone (SC 1.4.1). `aria-label` includes the tier, the numeric range, and the consequence: *"Độ tin cậy Thấp, dưới 60 phần trăm — nội dung được tạm giữ"*.

### 5.18 Vietnamese content

Tier labels *Thấp* / *Trung bình* / *Cao*; tooltip *Mức tin cậy phản ánh khả năng câu trả lời chính xác.*

### 5.20 Test

- Shape + colour + word redundancy.
- Low tier withholds by default.
- Numeric range correct.

---

## 6. HumanReviewGate

### 6.1 Name

`HumanReviewGate` — *Cổng duyệt người*.

### 6.2 Purpose

Enforce **human sign-off** for outputs in sensitive domains — legal, medical, financial, user-rights, employment decisions. Implements **EU AI Act Art. 14** (human oversight for high-risk AI) and **ISO/IEC 42001 Annex A 6.1.4** (responsible-AI objectives).

### 6.3 Anatomy

```
+----------------------------------------------------+
| ⏸  Câu trả lời này cần được duyệt                  |
|    Người duyệt: pháp lý                            |
|----------------------------------------------------|
|    [bản nháp ẩn — nhấn để xem trong vai trò duyệt] |
|----------------------------------------------------|
|    [Phê duyệt]   [Yêu cầu sửa]   [Từ chối]         |
+----------------------------------------------------+
```

The assistant's draft is **hidden until a human reviewer approves**. The reviewer sees the draft in a privileged context; the requesting user sees the gate.

### 6.4 Variants

| Variant | Use |
|---|---|
| `legal` | Legal advice / contract drafting |
| `medical` | Medical recommendation / diagnostic suggestion |
| `financial` | Financial advice / trade recommendation |
| `user-rights` | PDPL DSR responses / consent decisions |
| `custom` | Configurable threshold + reviewer role |

### 6.7 Props

```ts
export interface HumanReviewGateProps {
  variant: 'legal' | 'medical' | 'financial' | 'user-rights' | 'custom';
  /** Reviewer role required to approve. */
  requiredRole: string;
  /** Hidden draft — visible only to reviewers. */
  draft: string;
  /** Reviewer-approval handler. */
  onApprove: (reason: string) => void;
  /** Reviewer-modification handler. */
  onRequestChanges: (changeRequest: string) => void;
  /** Reviewer-rejection handler. */
  onReject: (reason: string) => void;
  /** Reviewer identity (current user role). */
  currentUserRole?: string;
}
```

### 6.8 Accessibility

The gate status is announced: *"Cần duyệt bởi người phụ trách pháp lý trước khi hiển thị"*. The reviewer view is privileged — a non-reviewer sees only the gate; a reviewer sees the draft + actions.

### 6.9 Audit logging

Every approval, change request, and rejection is logged with:

- Reviewer user id.
- Timestamp.
- Reason text.
- Diff between original draft and approved version (if changed).
- Output identifier.

The log is append-only ([Part 8](part-8-governance-legal-commerce.md) §14).

### 6.10 No bypass

The gate **cannot be bypassed by the requesting user** — only by an authorised reviewer. The component lints for any code path that returns the draft to the user without an approval log entry.

### 6.12 Do

- **Require a reason** for approval, change request, and rejection.
- **Retain log** per regulatory retention (PDPL Art. 21 DPIA-driven retention; sector regulation-driven retention for medical / financial).

### 6.13 Don't

- **Allow bypass** without audit entry.
- Show the draft to the requesting user before approval.

### 6.18 Vietnamese content

Status *Cần duyệt bởi người phụ trách pháp lý trước khi hiển thị*; actions *Phê duyệt*, *Yêu cầu sửa*, *Từ chối*.

### 6.20 Test

- Bypass-protection lint.
- Audit-log entries on every action.
- Reviewer-role check before draft display.

---

## 7. PromptInput

### 7.1 Name

`PromptInput` — *Nhập lời nhắc*.

### 7.2 Purpose

Multi-line input for prompts, with attachments, slash commands, mentions, and (optionally) voice.

### 7.3 Anatomy

```
+----------------------------------------------------+
| [📎] [Voice]  Gõ câu hỏi hoặc bấm / để xem lệnh… |
|                                                     |
| [contract.pdf ✕]  [report.docx ✕]                  |
+----------------------------------------------------+
                                              [⏎ Gửi]
```

Auto-grow textarea; attachment chips; slash-command menu (`/`); mention menu (`@`); voice toggle; send button.

### 7.7 Props

```ts
export interface PromptInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: (text: string, attachments?: File[]) => void;
  placeholder?: string;
  /** Slash commands. */
  commands?: SlashCommand[];
  /** Mention sources. */
  mentions?: { trigger: '@' | '#'; loadOptions: (q: string) => Promise<MentionItem[]> }[];
  /** Voice input. */
  voiceEnabled?: boolean;
  /** Attachment limits. */
  maxAttachmentBytes?: number;        // default 10MB
  maxAttachments?: number;             // default 5
  /** Locale; affects IME hints + redaction. */
  locale?: string;
}
```

### 7.8 Accessibility

Textarea semantics ([Part 3b](part-3b-inputs.md) §2). Slash-command menu uses **APG Listbox / Combobox** pattern. Voice toggle is a ToggleButton ([Part 3a](part-3a-actions.md) §7) with clear pressed state.

### 7.9 Keyboard

| Key | Action |
|---|---|
| `Enter` | Send. |
| `Shift+Enter` | New line. |
| `Cmd/Ctrl+Enter` | Send and stay open. |
| `/` | Open slash-command menu. |
| `@` | Open mention menu. |
| `Esc` | Close any open menu. |

### 7.10 PDPL on attachment scanning

Attachments are scanned client-side for sensitive content (CCCD photos, biometric IDs, healthcare formats, financial identifiers). When sensitive content is matched:

- A non-blocking **prompt-to-redact** dialog appears: *"Tệp này có thể chứa CCCD. Mã hoá trước khi gửi?"* / *"This file may contain a CCCD. Encrypt before sending?"*.
- The user chooses *Mã hoá* (encrypt — [Part 8](part-8-governance-legal-commerce.md) AES-256), *Gửi nguyên* (send raw — requires explicit consent), or *Huỷ* (cancel).
- The choice is logged.

### 7.18 Vietnamese content

Placeholder *Gõ câu hỏi hoặc bấm / để xem lệnh…*; sample slash commands *`/tóm tắt`*, *`/dịch`*, *`/giải thích`*, *`/định dạng`*.

### 7.19 Tokens

PromptInput inherits TextArea tokens; adds `--cs-color-ai-accent` for slash-menu highlight.

### 7.20 Test

- IME composition: Enter during composition does not send.
- Attachment sensitive-scan triggers redaction prompt.
- Voice toggle has pressed state.
- Slash menu APG Listbox conformance.

---

## 8. PromptLibraryBrowser

### 8.1 Name

`PromptLibraryBrowser` — *Thư viện lời nhắc*.

### 8.2 Purpose

Browse, search, and run prompts from the **CyberSkill prompt library** ([Part 9](part-9-ai-prompt-library.md) §1). The library is organised by category, locale, version, and owner; each prompt has eval scores and review history.

### 8.3 Anatomy

Sidebar of categories (component-copy, form-validation, error-recovery, etc.) + search + filter (by locale, by owner) + grid of prompt cards (name, description, version, owner, last-reviewed, eval score) + run modal.

### 8.7 Props

```ts
export interface PromptLibraryBrowserProps {
  prompts: PromptDescriptor[];
  /** Currently selected category. */
  category?: string;
  onCategoryChange?: (c: string) => void;
  search?: string;
  onSearchChange?: (q: string) => void;
  /** Locale filter; default surface locale. */
  localeFilter?: string;
  onRun?: (promptId: string, parameters: Record<string, unknown>) => void;
}

interface PromptDescriptor {
  id: string;
  name: string;
  description: string;
  category: string;
  locale: string[];
  version: string;
  owner: string;
  lastReviewed: string;
  evalScore?: number;          // 0–100; from named evals (Part 9 §4)
}
```

### 8.8 Accessibility

Grid of Card components ([Part 3c](part-3c-containers.md) §1); each Card is interactive. Filtering announces result count via `aria-live="polite"`.

### 8.12 Do

- Show **version** and **last-reviewed** on each card.
- Surface **eval score** with explanation Tooltip (citing the eval method).
- **Localise** per surface and filter the library accordingly.

### 8.18 Vietnamese content

Title *Thư viện lời nhắc*; categories *Microcopy thành phần*, *Xác thực biểu mẫu*, *Onboarding*, *Trạng thái rỗng*, *Khôi phục lỗi*, *Marketing*, *Bản địa hoá*, *Tài liệu*.

---

## 9. ToolCallDisplay

### 9.1 Name

`ToolCallDisplay` — *Hiển thị lời gọi công cụ*.

### 9.2 Purpose

Show when the assistant **invokes a tool / function / API**. Critical for auditability and prompt-injection defence.

### 9.3 Anatomy

```
+----------------------------------------------------+
| [Tool] Đã gọi: tìm-khách-hàng                      |
|        Hoàn tất trong 340 ms · MCP                 |
|----------------------------------------------------|
| ▾ Tham số (1)                                      |
|    query: "Lê Văn A"                               |
|----------------------------------------------------|
| ▾ Kết quả (2 records)                              |
|    [...]                                           |
|----------------------------------------------------|
| [Mở trong audit log ↗]                             |
+----------------------------------------------------+
```

Tool name, transport (MCP, native API), duration, collapsible arguments, collapsible result, link to audit-log entry.

### 9.4 Variants

| Variant | Use |
|---|---|
| `mcp` | Tool call via Model Context Protocol (spec 2025-11-25) |
| `native` | First-party API |
| `external` | Third-party API |

### 9.7 Props

```ts
export interface ToolCallDisplayProps {
  toolName: string;
  /** Transport. */
  transport: 'mcp' | 'native' | 'external';
  durationMs: number;
  /** Args; may be redacted at render. */
  args: Record<string, unknown>;
  /** Result; may be redacted at render. */
  result: unknown;
  /** Audit-log id — links to full record. */
  auditLogId?: string;
  /** Whether args/result contain sensitive data — auto-redacts on render. */
  containsSensitive?: boolean;
}
```

### 9.8 Accessibility

`role="region"` with localised `aria-label` summarising the tool call. Args and result are collapsible Disclosure components ([Part 3c](part-3c-containers.md) §8).

### 9.9 Sensitive redaction

When `containsSensitive` is true, args and result render with redaction (Part 3h §11). Reveal requires user action + audit-log entry.

### 9.10 SR

VN: *"Đã gọi công cụ: tìm-khách-hàng, hoàn tất trong 340 ms"*; EN: *"Tool called: find-customer, completed in 340 ms"*.

### 9.18 Vietnamese content

Tool examples *tìm-khách-hàng*, *kiểm-tra-trạng-thái-đơn-hàng*, *gửi-email*, *lưu-tệp*, *tra-cứu-CCCD*.

---

## 10. AIDisclosureBadge

### 10.1 Name

`AIDisclosureBadge` — *Huy hiệu công bố AI*.

### 10.2 Purpose

Clearly mark **AI-generated or AI-assisted content**.

### 10.3 Anatomy

A small badge: icon + text *AI* + optional expand for provenance detail.

```
[AI ⓘ]                          collapsed

[AI Sonnet · 25/04/2026 · vi-VN] expanded
```

### 10.7 Props

```ts
export interface AIDisclosureBadgeProps {
  /** Localised core text; default 'AI'. */
  label?: string;
  /** Expand on hover/focus to show details. */
  expandable?: boolean;
  /** Provenance details. */
  provenance?: {
    modelId?: string;
    timestamp?: string;
    locale?: string;
    sources?: number;
  };
  /** PDPL Art. 30 disclosure copy for VN locale. */
  pdplDisclosure?: boolean;
}
```

### 10.8 Accessibility

`aria-label` includes model, locale, date — *"Do AI tạo, mô hình Sonnet, ngày 25 tháng 4 năm 2026"* / *"AI-generated, model Sonnet, 25 April 2026"*.

### 10.9 Regulatory mapping

- **EU AI Act Art. 50** — transparency obligations for providers and deployers; applicable in phases per the staged Regulation schedule (European Commission). The badge is the user-facing component of Art. 50 compliance.
- **PDPL Art. 30** — disclosure for AI / big-data processing of personal data. In VN locale, the badge expansion includes the PDPL disclosure copy: *"Xử lý này dùng AI theo Điều 30, Luật BVDLCN 91/2025/QH15."*
- **Machine-readable signal** — the underlying HTML includes `<meta property="ai:generated" content="true">` and a C2PA manifest reference.

### 10.12 Do

- **Always** appear wherever AI output is shown — never only in fine print.
- **Localise** PDPL disclosure for VN.
- Pair with ConfidenceIndicator on assistant messages.

### 10.18 Vietnamese content

*Do AI tạo — Xem chi tiết*; expanded *Do AI tạo · Mô hình Sonnet · 25/04/2026 · Tiếng Việt · Theo PDPL Đ.30*.

### 10.19 Tokens

```
--cs-color-ai-accent
--cs-color-ai-accent-bg
--cs-radius-full
--cs-text-body-sm
```

---

## 11. RedactionMarker

### 11.1 Name

`RedactionMarker` — *Dấu mã hoá*.

### 11.2 Purpose

Visually indicate **personal data that has been masked**.

### 11.3 Anatomy

```
[🔒 Dữ liệu nhạy cảm — bấm để xem]    masked

038***5678 [👁 Xem]                    partial mask + reveal
```

A block with lock icon. Hover/focus reveals: *"Dữ liệu nhạy cảm — cần quyền để xem"*.

### 11.7 Props

```ts
export interface RedactionMarkerProps {
  /** Original (sensitive) value; never rendered without explicit reveal. */
  value: string;
  /** Class of sensitivity. */
  class: 'cccd' | 'phone' | 'email' | 'financial' | 'health' | 'biometric' | 'other';
  /** Strategy. */
  strategy: 'mask' | 'fully-redacted';
  /** Localised label for the masked block. */
  label?: string;
  /** Reveal handler; receives reason for audit log. */
  onReveal?: (reason: string) => void;
}
```

### 11.8 Accessibility

`aria-label` describes the redacted state and the class of data: *"Dữ liệu nhạy cảm CCCD, đã mã hoá"* / *"Sensitive data CCCD, redacted"*.

### 11.9 Reveal flow

- User clicks reveal.
- A confirmation dialog asks for the **reason** (selected from list).
- The reveal is logged with user id, cell id, timestamp, and reason.
- The full value is shown for the duration of the visibility timeout (default 30 s) before re-masking.

### 11.10 PDPL classification

Sensitive classes per Decree 356/2025/ND-CP and Acclime Vietnam's reading:

- **CCCD** — citizen ID number and ID-card photos.
- **Biometric** — fingerprints, face, iris.
- **Health** — medical records, diagnoses, treatments.
- **Financial** — bank account, payment-instrument data.
- **Other sensitive personal data** as specified in PDPL Art. 2.

### 11.18 Vietnamese content

*Dữ liệu nhạy cảm CCCD — cần quyền để xem*; reveal reasons *Audit*, *Hỗ trợ khách hàng*, *Pháp lý*, *Khác (ghi rõ)*.

---

## 12. C2PAProvenanceBadge

### 12.1 Name

`C2PAProvenanceBadge` — *Huy hiệu nguồn gốc C2PA*.

### 12.2 Purpose

Show **content provenance from a C2PA 2.2 manifest**. Surfaces signer, creation date, edit history, and signature status.

### 12.3 Anatomy

A small badge with verification status:

```
[✓ Nguồn gốc CyberSkill]          valid signature

[⚠ Chữ ký không khớp]              invalid signature

[? Không có manifest]              no manifest
```

### 12.4 Status states

| Status | Visual |
|---|---|
| `valid` | Filled checkmark; success colour; clickable to view manifest |
| `invalid` | Filled triangle; danger colour; clickable to view diagnostics |
| `partial` | Half-circle; warning colour; some claims valid, some not |
| `missing` | Question mark; muted; the asset has no manifest |

### 12.7 Props

```ts
export interface C2PAProvenanceBadgeProps {
  /** Asset URL or in-memory blob to verify. */
  asset: string | Blob;
  /** Optional pre-resolved manifest. */
  manifest?: C2PAManifest;
  /** Verification done client-side (default true) or server-side (when 'remote'). */
  verify?: 'client' | 'remote' | 'precomputed';
}
```

### 12.8 Accessibility

The badge is focusable; opens a Popover ([Part 3c](part-3c-containers.md) §6) with provenance detail. The status reads in SR: *"Nội dung này được ký bởi CyberSkill, chữ ký hợp lệ, tạo ngày 25/04/2026, chưa chỉnh sửa"* / *"Signed by CyberSkill, signature valid, created 25 April 2026, no edits"*.

### 12.9 Verification flow

The system **verifies signatures client-side** by default using the C2PA Web SDK (compliant with **Technical Specification v2.2**, published 1 May 2025; c2pa.org). The verification result is rendered as the badge status. For very large assets or resource-constrained clients, server-side verification is supported (`verify="remote"`).

### 12.10 Provenance display

The Popover shows:

- **Signer identity** (verified against trust list).
- **Creation date / time**.
- **Software / model identity** (e.g., model name, version).
- **Edit history** (claims of edits since creation).
- **AI-generation flag** (`c2pa.ai_generated_content` action).
- **Trust list status** (signer present in CyberSkill / industry trust list, or unknown).

### 12.18 Vietnamese content

Tooltip *Nguồn gốc nội dung: CyberSkill, chữ ký hợp lệ.*; status `aria-label` *"Đã ký bởi CyberSkill, chữ ký hợp lệ, tạo ngày 25 tháng 4 năm 2026"*.

### 12.19 Tokens

```
--cs-color-semantic-success    (valid)
--cs-color-semantic-danger     (invalid)
--cs-color-semantic-warning    (partial)
--cs-color-text-muted          (missing)
--cs-radius-full
```

### 12.20 Test

- Valid signature shows valid badge.
- Tampered signature shows invalid badge with diagnostics.
- Missing manifest shows muted "missing".
- Trust-list lookup verified.

---

## References

- **EU AI Act** (Regulation EU 2024/1689) — entered into force 1 August 2024; phased applicability per European Commission schedule. Articles 14, 50, 52 cited.
- **ISO/IEC 42001:2023** — AI Management System. https://www.iso.org/standard/42001
- **C2PA Technical Specification v2.2** — published 1 May 2025. https://c2pa.org/
- **Model Context Protocol spec 2025-11-25** — Anthropic; Linux Foundation Agentic AI Foundation stewardship.
- **PDPL Law 91/2025/QH15** — Vietnam; passed 26 June 2025; effective 1 January 2026. https://luatvietnam.vn/
- **Decree 356/2025/ND-CP** — Vietnam; effective 1 January 2026. Tilleke; Acclime Vietnam.
- **WCAG 2.2** — W3C Recommendation 5 October 2023.
- **W3C ARIA APG** — Listbox, Combobox, Disclosure patterns.
- **MITRE ATLAS** and **OWASP LLM Top 10** — referenced for prompt-injection defence ([Part 6](part-6-ai-ethics-sustainability.md) §§7–8).

*End of Part 3h — AI & Chat.*
