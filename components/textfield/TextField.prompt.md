**TextField** — labelled text input with optional description and inline error. The label is always associated; errors announce via `role="alert"`. Vietnamese diacritics and IME composition are preserved.

```jsx
<TextField label="Work email" type="email" placeholder="you@company.com" />
<TextField label="Tên của bạn" description="Vietnamese diacritics welcome" />
<TextField label="Email" error="Enter a valid email address." defaultValue="nope" />
```

- **label** (required), **description** (helper), **error** (inline + `aria-invalid`).

- Passes through all native `<input>` props (`type`, `placeholder`, `value`, `disabled`, `readOnly`, …).
