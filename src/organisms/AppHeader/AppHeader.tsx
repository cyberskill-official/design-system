/**
 * AppHeader — top-of-app shell header.
 *
 * Extracted from App.tsx in Phase 4 Wave 2 (component substitution per
 * first-product-migration-plan.md sub-phase A3). Contains: brand mark,
 * search input, theme switcher.
 */

import { useTheme, type Theme } from '@themes/ThemeProvider';
import { MODULE } from '@lib/registry';

export interface AppHeaderProps {
  /** Render inside the existing 3-column shell grid (col-span-3). */
  className?: string;
}

const THEMES: { id: Theme; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'hc', label: 'HC' },
  { id: 'sepia', label: 'Sepia' },
];

export function AppHeader({ className = '' }: AppHeaderProps) {
  const { theme, setTheme } = useTheme();
  return (
    <header
      className={`col-span-3 flex items-center justify-between gap-cs4 border-b border-border-subtle bg-surface px-cs4 relative z-10 ${className}`}
      style={{ height: 'var(--cs-shell-header-height)' }}
    >
      <div className="absolute left-0 right-0 -bottom-px h-0.5 bg-accent opacity-85" />
      <a
        href="#home"
        className="flex items-center gap-cs2 no-underline text-inherit shrink-0"
        aria-label="CyberSkill home"
      >
        <img src="/logo-symbol.svg" alt="" className="h-8 w-8" />
        <span className="font-extrabold text-md tracking-tight" style={{ color: 'var(--cs-umber)' }}>
          Cyber<span style={{ color: 'var(--cs-color-accent-default)' }}>Skill</span>
        </span>
        <span className="font-mono text-xs text-text-muted ml-cs2 pl-cs2 border-l border-border">
          Design System · v{MODULE.version} · LOCKED
        </span>
      </a>
      <div className="flex items-center gap-cs2">
        <input
          type="search"
          placeholder="Search wiki + showcases — ⌘K"
          aria-label="Search"
          className="h-8 w-80 bg-surface-subtle rounded-md px-cs3 text-sm border border-transparent focus:border-accent focus:bg-surface-raised outline-none"
        />
        <div
          className="flex items-center bg-surface-subtle rounded-md p-0.5 font-mono text-xs"
          role="radiogroup"
          aria-label="Theme"
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              aria-pressed={theme === t.id}
              className={`px-cs2 py-1 rounded ${
                theme === t.id ? 'bg-surface-raised font-semibold shadow-cs' : 'text-text-muted'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
