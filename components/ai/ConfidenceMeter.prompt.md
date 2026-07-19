**ConfidenceMeter** — segmented AI-confidence indicator. Pass `value` 0–1 or a `level`; the level is always spelled out (never colour alone). Pair with AIDisclosureBadge / HumanReviewGate.

```jsx
<ConfidenceMeter value={0.82} />
<ConfidenceMeter level="low" label="Model confidence" />
```
