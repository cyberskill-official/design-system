/**
 * <Button> — React Native primitive.
 *
 * Mirrors the cs-button web-component contract (variants, sizes, loading,
 * disabled) using RN's Pressable + Text + ActivityIndicator. Honours the
 * AccessibilityInfo reduced-motion + reduced-transparency hints.
 */

import { useEffect, useState, type ReactNode } from 'react';
import { Pressable, Text, ActivityIndicator, View, AccessibilityInfo, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from './ThemeProvider.tsx';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'danger-ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  testID?: string;
}

const SIZE_TO_PADDING: Record<ButtonSize, { paddingV: number; paddingH: number; minH: number; fontSize: number }> = {
  sm: { paddingV: 4,  paddingH: 12, minH: 32, fontSize: 13 },
  md: { paddingV: 8,  paddingH: 16, minH: 40, fontSize: 14 },
  lg: { paddingV: 12, paddingH: 20, minH: 48, fontSize: 16 },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onPress,
  iconLeading,
  iconTrailing,
  testID,
}: ButtonProps) {
  const { tokens, theme } = useTheme();
  const themeOv = tokens.theme[theme] as Record<string, string>;
  const surface = themeOv['color.surface.default'] ?? tokens.color.surface.default;
  const text = themeOv['color.text.default'] ?? tokens.color.text.default;
  const accent = themeOv['color.accent.default'] ?? tokens.color.accent.default;
  const danger = tokens.color.semantic.danger;
  const border = themeOv['color.border.default'] ?? tokens.color.border.default;
  const focus = themeOv['color.focusRing'] ?? tokens.color.focusRing;

  const colorMap = {
    primary:        { bg: accent,  fg: tokens.color.umber, border: 'transparent' as const },
    secondary:      { bg: 'transparent', fg: tokens.color.umber, border: border },
    tertiary:       { bg: 'transparent', fg: tokens.color.umber, border: 'transparent' as const },
    ghost:          { bg: 'transparent', fg: tokens.color.text.muted, border: 'transparent' as const },
    danger:         { bg: danger,  fg: '#FFFFFF', border: 'transparent' as const },
    'danger-ghost': { bg: 'transparent', fg: danger, border: 'transparent' as const },
  };
  const c = colorMap[variant];
  const sz = SIZE_TO_PADDING[size];

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReducedMotion).catch(() => {});
  }, []);

  return (
    <Pressable
      testID={testID}
      onPress={!disabled && !loading ? onPress : undefined}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={({ pressed }): ViewStyle => ({
        backgroundColor: c.bg,
        borderColor: c.border,
        borderWidth: 1,
        borderRadius: tokens.radius.md,
        paddingVertical: sz.paddingV,
        paddingHorizontal: sz.paddingH,
        minHeight: sz.minH,
        minWidth: sz.minH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled || loading ? 0.55 : pressed ? (reducedMotion ? 1 : 0.85) : 1,
      })}
    >
      {iconLeading ? <View style={{ marginRight: 8 }}>{iconLeading}</View> : null}
      <Text style={{ color: c.fg, fontSize: sz.fontSize, fontWeight: '500' } as TextStyle}>
        {children}
      </Text>
      {loading ? (
        <ActivityIndicator size="small" color={c.fg} style={{ marginLeft: 8 }} />
      ) : iconTrailing ? (
        <View style={{ marginLeft: 8 }}>{iconTrailing}</View>
      ) : null}
    </Pressable>
  );
}
