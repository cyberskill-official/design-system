# Native token samples

SwiftUI, Compose, and Flutter constants are generated from `tokens/tokens.dtcg.json` into:

- `tokens/native/CSTokens.swift`
- `tokens/native/CSTokens.kt`
- `tokens/native/cs_tokens.dart`

Regenerate:

```bash
node _audit/ci/generate-native-tokens.mjs
```

Provenance is enforced by `_audit/token-pipeline-test.html` and `_audit/ci/check-token-provenance.mjs`.

## Scope (honest)

This folder is the **consumer pointer for L5 native tokens**, not a full app. Embed the constants in a host shell.

A minimal **SwiftUI colour smoke** sketch lives in `SignInTokenSmoke.swift` (documentation-only — not a Xcode project). Full multi-screen shells are multi-week product work (see `docs/BACKLOG.md`).

## Suggested first shell (when product needs it)

1. New iOS/Android/Flutter app.
2. Copy or SPM/path-link the matching `tokens/native/*` file.
3. One screen: surface + primary button using brand umber/ochre tokens.
4. Do not re-derive colours by hand — change DTCG and regenerate.
