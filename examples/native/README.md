# Native token samples

SwiftUI, Compose, and Flutter constants are generated from `tokens/tokens.dtcg.json` into:
- `tokens/native/CSTokens.swift`

- `tokens/native/CSTokens.kt`

- `tokens/native/cs_tokens.dart`

Regenerate with:
```bash
node _audit/ci/generate-native-tokens.mjs
```

Provenance is enforced by `_audit/token-pipeline-test.html` and `_audit/ci/check-token-provenance.mjs`.
This folder is the consumer-facing pointer for L5 (native samples). Embed the constants in a host app shell; there is no second copy of the tokens here.
