/**
 * tokens.ts — RN-friendly token constants.
 *
 * RN doesn't support CSS custom properties; constants are imported directly.
 * Mirrors the values in tokens/colour.tokens.json + others, with theme-mode
 * overrides exposed under TOKENS.theme[mode].
 *
 * Phase 4 adds: a build step that emits this file from the source DTCG JSON
 * automatically (instead of being hand-aligned).
 */

export const TOKENS = {
  color: {
    umber: '#45210E',
    ochre: '#F4BA17',
    warmWhite: '#FAF6F1',
    stone: '#8B7355',
    surface: { default: '#FAF6F1', subtle: '#F4EFE6', raised: '#FFFFFF' },
    text:    { default: '#2A1505', muted: '#8B7355' },
    accent:  { default: '#F4BA17', subtle: '#FBE5A6' },
    border:  { default: '#D7CFC0', subtle: '#EAE2D2' },
    semantic: { success: '#3A7D44', warning: '#A87411', danger: '#B33B19', info: '#2A6CB0' },
    focusRing: '#F4BA17',
  },
  space: {
    px: 1,
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    pill: 999,
  },
  motion: {
    duration: { fast: 100, quick: 150, standard: 250, slow: 400 },
  },
  font: {
    family: { ui: 'Be Vietnam Pro', mono: 'JetBrains Mono' },
    size: { xs: 12, sm: 13, body: 15, md: 16, lg: 18, h3: 20, h2: 24, h1: 32, display: 48 },
    weight: { regular: '400', medium: '500', semibold: '600', bold: '700', black: '800' },
    lineHeight: { tight: 1.25, body: 1.55, relaxed: 1.7 },
  },
  // Theme overrides per mode — keys override paths above
  theme: {
    light: {},
    dark: {
      'color.surface.default': '#1C0E04',
      'color.surface.subtle': '#2A1505',
      'color.surface.raised': '#3F2515',
      'color.text.default': '#FAF6F1',
      'color.text.muted': '#BFAE94',
      'color.border.default': '#3F2515',
    },
    'high-contrast': {
      'color.surface.default': '#000000',
      'color.surface.subtle': '#0A0A0A',
      'color.surface.raised': '#000000',
      'color.text.default': '#FFFFFF',
      'color.text.muted': '#CCCCCC',
      'color.border.default': '#FFFFFF',
      'color.accent.default': '#FFD400',
      'color.focusRing': '#FFD400',
    },
    sepia: {
      'color.surface.default': '#F4ECDC',
      'color.text.default': '#3D2A14',
      'color.accent.default': '#C49810',
    },
  },
} as const;

export type Theme = keyof typeof TOKENS.theme;
