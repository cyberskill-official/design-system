import { AppHeader } from './AppHeader';

/** Demo wrapper that constrains the AppHeader to a Storybook viewport-friendly size. */
export function AppHeaderShowcase() {
  return (
    <div className="w-full" style={{ minHeight: 'var(--cs-shell-header-height)' }}>
      <AppHeader />
    </div>
  );
}
