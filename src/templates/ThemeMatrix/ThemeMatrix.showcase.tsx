import type { Theme } from '@themes/ThemeProvider';
import { Button } from '@atoms/Button';
import { Tag } from '@atoms/Tag';
import { Field } from '@molecules/Field';

const THEMES: { id: Theme; name: string }[] = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'hc', name: 'High-contrast' },
  { id: 'sepia', name: 'Sepia' },
];

export default function ThemeMatrixShowcase() {
  return (
    <div className="max-w-6xl">
      <h2 className="font-bold text-h2 m-0">Themes</h2>
      <p className="text-text-muted mb-cs4">Same component set rendered in all 4 built-in themes. Same code, only token cascade changes.</p>
      <div className="grid gap-cs3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {THEMES.map(t => (
          <div key={t.id} className="rounded-lg overflow-hidden border border-border-subtle shadow-cs-md">
            <div className="bg-surface-subtle py-cs2 px-cs3 border-b border-border-subtle font-mono text-xs uppercase flex justify-between">
              <strong>{t.name}</strong>
              <span>data-theme={t.id}</span>
            </div>
            <div className="p-cs4 space-y-cs3" data-theme={t.id === 'light' ? undefined : t.id} style={{ background: 'var(--cs-color-surface-default)', color: 'var(--cs-color-text-default)' }}>
              <h3 className="m-0 font-bold">Welcome back, Stephen</h3>
              <p className="text-text-muted italic m-0">Your trial ends in 5 days.</p>
              <div className="bg-surface-subtle p-cs3 rounded-md border border-border-subtle">
                <div className="font-mono text-xs text-text-muted">MRR</div>
                <div className="text-2xl font-extrabold">$48,200</div>
                <div className="text-xs text-success">↑ 12.4%</div>
              </div>
              <div className="flex gap-cs2 flex-wrap">
                <Button>Save</Button>
                <Button variant="accent">Upgrade</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
              <Field label="" placeholder="Search…" />
              <div className="text-xs text-text-muted">
                <Tag tone="accent">Online</Tag>{' '}<Tag tone="success">Saved</Tag>{' '}<Tag tone="danger">Failed</Tag>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-h2 mt-cs8 mb-cs2">Density</h2>
      <p className="text-text-muted mb-cs4">Compact / cozy (default) / comfortable. Affects spacing only — never type sizes.</p>
      <div className="grid gap-cs3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {(['compact','cozy','comfortable'] as const).map(d => (
          <div key={d} className="rounded-lg border border-border-subtle p-cs4" data-density={d === 'cozy' ? undefined : d}>
            <div className="font-mono text-xs uppercase text-text-muted mb-cs2">{d}</div>
            <h3 className="m-0 font-bold mb-cs2">Trading desk</h3>
            <div className="flex gap-cs2"><Button size="sm">Buy</Button><Button variant="secondary" size="sm">Sell</Button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
