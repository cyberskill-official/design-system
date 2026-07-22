import SwiftUI

struct SettingsView: View {
  var onSignOut: () -> Void
  @State private var dark = false
  @State private var language = "English"

  var body: some View {
    VStack(alignment: .leading, spacing: 20) {
      Text("Settings")
        .font(.system(size: 24, weight: .heavy))
        .foregroundStyle(CSTokens.colorTextPrimary)
      Text("Third screen — identity & session.")
        .font(.system(size: 13))
        .foregroundStyle(CSTokens.colorTextMuted)

      VStack(alignment: .leading, spacing: 12) {
        Toggle(isOn: $dark) {
          Text("Prefer dark theme")
            .foregroundStyle(CSTokens.colorTextPrimary)
        }
        .tint(CSTokens.colorBrandOchre)

        Picker("Language", selection: $language) {
          Text("English").tag("English")
          Text("Tiếng Việt").tag("Tiếng Việt")
        }
        .pickerStyle(.segmented)

        HStack {
          Text("Brand umber")
            .foregroundStyle(CSTokens.colorTextPrimary)
          Spacer()
          RoundedRectangle(cornerRadius: 6)
            .fill(CSTokens.colorBrandUmber)
            .frame(width: 36, height: 24)
        }
        HStack {
          Text("Brand ochre")
            .foregroundStyle(CSTokens.colorTextPrimary)
          Spacer()
          RoundedRectangle(cornerRadius: 6)
            .fill(CSTokens.colorBrandOchre)
            .frame(width: 36, height: 24)
        }
      }
      .padding(16)
      .background(CSTokens.colorSurfacePanel)
      .clipShape(RoundedRectangle(cornerRadius: 12))
      .overlay(
        RoundedRectangle(cornerRadius: 12)
          .stroke(CSTokens.colorBorderDefault, lineWidth: 1)
      )

      Spacer()
      Button(action: onSignOut) {
        Text("Sign out")
          .frame(maxWidth: .infinity)
          .frame(minHeight: CSTokens.componentButtonMdMinHeight)
          .foregroundStyle(CSTokens.colorTextInverse)
          .background(CSTokens.colorSemanticDanger)
          .clipShape(RoundedRectangle(cornerRadius: CSTokens.componentButtonRadius))
      }
      .buttonStyle(.plain)
    }
    .padding(24)
    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
    .background(CSTokens.colorSurfacePage)
  }
}
