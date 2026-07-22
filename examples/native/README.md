# Native multi-screen sample apps

Pre-release samples (VERSION still **1.0.0**) that demonstrate **Sign in → Home (wish list) → Settings** on three platforms, consuming **generated** design tokens from `tokens/native/` (not hand-copied hex).

| App | Path | Token source |
|---|---|---|
| SwiftUI | `examples/native/swiftui/` | `CSTokens.swift` (synced) |
| Jetpack Compose | `examples/native/compose/` | `tokens/CSTokens.kt` (synced, package remapped) |
| Flutter | `examples/native/flutter/` | `lib/tokens/cs_tokens.dart` (synced) |

## Sync tokens after DTCG changes

```bash
node _audit/ci/generate-native-tokens.mjs
node examples/native/sync-tokens.mjs
```

## Build / run (when toolchains exist)

### SwiftUI (macOS / Xcode)

```bash
cd examples/native/swiftui
swift build
# or open Package.swift in Xcode and run the CyberSkillSample scheme
```

### Compose (Android Studio / SDK)

```bash
cd examples/native/compose
./gradlew :app:assembleDebug   # requires Android SDK + Gradle wrapper bootstrap
```

### Flutter

```bash
cd examples/native/flutter
flutter pub get
flutter analyze
flutter run
```

## Scope (honest)

These are **sample hosts**, not App Store / Play Store products. No backend. Navigation and brand-token usage are the bar. Full product shells remain product work.

Structural CI: `npm run test:native-samples`.
