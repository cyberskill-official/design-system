// CyberSkill Design System — documentation-only SwiftUI smoke.
// Not an Xcode target. Drop into a host app and add CSTokens.swift from tokens/native/.
//
// import SwiftUI
//
// struct SignInTokenSmoke: View {
//   var body: some View {
//     VStack(spacing: 16) {
//       Text("Sign in").font(.title.bold()).foregroundStyle(CSTokens.colorTextPrimary)
//       // Map DTCG brand umber / ochre via generated helpers in CSTokens.swift
//       RoundedRectangle(cornerRadius: 12)
//         .fill(CSTokens.color(0x45210E)) // brand umber — prefer named tokens when generated
//         .frame(height: 48)
//         .overlay(Text("Continue").foregroundStyle(.white).fontWeight(.semibold))
//     }
//     .padding(24)
//     .frame(maxWidth: .infinity, maxHeight: .infinity)
//     .background(CSTokens.color(0xF7F1E8)) // surface page — prefer named tokens
//   }
// }
