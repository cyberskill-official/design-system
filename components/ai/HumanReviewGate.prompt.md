**HumanReviewGate** — an AI-native checkpoint that keeps a human in the loop before a high-stakes action. Warning-bordered card with a risk label, plain-language summary, optional reviewer, and Approve / Reject.

```jsx
<HumanReviewGate
  risk="High-stakes · billing change"
  summary="Lumi proposes moving this client to the annual plan and issuing a prorated credit."
  reviewer="Ops on call"
  onApprove={apply}
  onReject={dismiss}
/>
```

- Risk is stated in words, never colour alone. Pair with `AIDisclosureBadge` for full provenance.
