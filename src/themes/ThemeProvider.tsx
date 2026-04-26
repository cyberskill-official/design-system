import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'hc' | 'sepia';
export type Density = 'compact' | 'cozy' | 'comfortable';

interface ThemeContextValue {
  theme: Theme;
  density: Density;
  setTheme: (t: Theme) => void;
  setDensity: (d: Density) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    (localStorage.getItem('cs-theme') as Theme) || 'light',
  );
  const [density, setDensityState] = useState<Density>(() =>
    (localStorage.getItem('cs-density') as Density) || 'cozy',
  );

  useEffect(() => {
    if (theme === 'light') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cs-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (density === 'cozy') document.documentElement.removeAttribute('data-density');
    else document.documentElement.setAttribute('data-density', density);
    localStorage.setItem('cs-density', density);
  }, [density]);

  return (
    <ThemeContext.Provider value={{ theme, density, setTheme: setThemeState, setDensity: setDensityState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
