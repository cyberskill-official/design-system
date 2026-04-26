/**
 * ThemeProvider — provides the active theme + resolved tokens via React context.
 */

import { createContext, useContext, useState, type ReactNode } from 'react';
import { TOKENS, type Theme } from './tokens.ts';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  tokens: typeof TOKENS;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const value: ThemeContextValue = { theme, setTheme, tokens: TOKENS };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

/** Resolve a token path against the active theme. */
export function useTokens() {
  const { theme, tokens } = useTheme();
  return (path: string): string | number | undefined => {
    const override = (tokens.theme[theme] as Record<string, string>)[path];
    if (override !== undefined) return override;
    // Walk the dotted path
    const parts = path.split('.');
    let cursor: any = tokens;
    for (const p of parts) {
      if (cursor == null) return undefined;
      cursor = cursor[p];
    }
    return cursor;
  };
}
