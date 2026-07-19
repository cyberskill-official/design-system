# Email-client-safe templates

Send-ready HTML that survives Gmail, Outlook (Word engine), and Apple Mail — a different medium from the DC email templates in `templates/email*`, which use modern CSS (flex, custom properties, `display:contents`) that email clients strip. Use these when the email will actually be **sent**; use the DC versions for in-product previews / design refs.

## What's here — three exemplars covering every structure
- **`email-transactional.html`** — header · message · CTA · footer (the common shape). Bilingual EN·VN.
- **`email-newsletter.html`** — header · lead · stacked story cards · CTA (multi-block marketing).
- **`email-dunning.html`** — header · message · amount-due box · CTA (transactional with a data panel + gentle urgency).

Between them these cover the structural variety of the whole DC email set. The remaining DC emails are **copy-swaps** of the nearest exemplar — same table skeleton, new copy:
- `email` → transactional · `hr-announcement`, `culture-event-invite`, `marketing-launch`, `bod-investor-update`, `delivery-status-email` → transactional/newsletter · `finance-dunning-email` → dunning · `marketing-newsletter` → newsletter.

## The pattern (follow it for the copy-swaps)
- Nested `<table role="presentation" cellpadding="0" cellspacing="0" border="0">`; one centered 600px wrapper; single-column stacked rows. No flex/grid/position.
- **Every** style inlined on its element. The `<head><style>` carries only media queries (mobile + `prefers-color-scheme: dark`) — clients that drop it still get a correct email from the inline styles.
- No web fonts — `Arial, Helvetica, sans-serif` (renders Vietnamese diacritics fine). Brand values hardcoded: Umber `#45210E`, Ochre `#F4BA17`, warm neutrals; no `var(--cs-*)`.
- **Bulletproof button**: padded `<td bgcolor="#F4BA17">` with an `<a display:inline-block>` + an `<!--[if mso]><v:roundrect>` fallback for Outlook.
- Hidden **preheader** span first in `<body>`; `lang="vi"` on the Vietnamese block; real `https` links; footer with unsubscribe + postal address. `color-scheme` meta + dark-mode-safe fills (no pure `#000`/`#fff`).
- Before sending: replace the logo wordmark with a **hosted** image URL if you want the mark (project images won't exist for recipients), and point the `href`s at real URLs.

## Applies to
The DC emails that have a send path convert to the exemplar closest in structure (mapping above) — the three files here are the references; generate a copy-swap for a specific email on request.
