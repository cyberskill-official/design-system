import { AppSidebar } from './AppSidebar';

export function AppSidebarShowcase() {
  return (
    <div className="grid h-screen" style={{ gridTemplateColumns: 'var(--cs-shell-sidebar-left) 1fr' }}>
      <AppSidebar side="left" />
      <main className="bg-surface text-text p-cs6">
        <p className="text-text-muted text-sm">← AppSidebar (left rail) shown above. Right rail variant: <code>side="right"</code>.</p>
      </main>
    </div>
  );
}
