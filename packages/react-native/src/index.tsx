/**
 * @cyberskill/react-native — RN primitives for the CyberSkill Design System.
 *
 * Per RFC 2026-003 + the §14.7 expansion item (React Native / Capacitor
 * cross-platform compatibility). Closes A6.3 → 4 path. Phase 4 expands to
 * the top-12.
 *
 * RN cannot use the web-components core (no custom-element runtime), so this
 * package re-implements the styled layer using RN primitives (View, Pressable,
 * Text). Behaviour comes from @cyberskill/primitives; tokens come from
 * @cyberskill/tokens (re-exported as RN-compatible JS constants from
 * ../tokens.ts).
 */

export { Button } from './Button.tsx';
export { ThemeProvider, useTheme, useTokens } from './ThemeProvider.tsx';
export { TOKENS } from './tokens.ts';

export const reactNativePackage = {
  __version: '1.0.0',
  __rfc: '2026-003',
  __wave: 'Phase 3',
  __platforms: ['ios', 'android'],
};
