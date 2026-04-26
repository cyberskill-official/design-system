interface Swatch { name: string; hex: string; token: string; oklch?: string; bg?: string; fg?: string }

const brand: Swatch[] = [
  { name: 'Umber',       hex: '#45210E', oklch: 'oklch(0.265 0.073 44.3)', token: '--cs-umber',  fg: '#FAF6F1' },
  { name: 'Ochre',       hex: '#F4BA17', oklch: 'oklch(0.811 0.162 83.7)', token: '--cs-ochre',  fg: '#45210E' },
  { name: 'Warm white',  hex: '#FAF6F1', token: '--cs-warm', fg: '#45210E' },
  { name: 'Umber deep',  hex: '#1C0E04', token: '--cs-umber-deep', fg: '#FAF6F1' },
];

const surface: Swatch[] = [
  { name: 'Surface subtle', hex: '#F4EFE6', token: '--cs-color-surface-subtle' },
  { name: 'Bone',           hex: '#EAE2D2', token: '--cs-bone' },
  { name: 'Border',         hex: '#D7CFC0', token: '--cs-color-border-default' },
  { name: 'Stone (muted)',  hex: '#8B7355', token: '--cs-stone', fg: '#fff' },
];

const semantic: Swatch[] = [
  { name: 'Success', hex: '#3A7D44', token: 'semantic.success', fg: '#fff' },
  { name: 'Warning', hex: '#A87411', token: 'semantic.warning', fg: '#fff' },
  { name: 'Danger',  hex: '#B33B19', token: 'semantic.danger',  fg: '#fff' },
  { name: 'Info',    hex: '#2A6CB0', token: 'semantic.info',    fg: '#fff' },
];

export default function ColourShowcase() {
  return (
    <div className="flex flex-col gap-cs6 max-w-4xl">
      <Group title="Brand anchors (immutable)" rows={brand} />
      <Group title="Surface neutrals"         rows={surface} />
      <Group title="Semantic"                  rows={semantic} />
    </div>
  );
}

function Group({ title, rows }: { title: string; rows: Swatch[] }) {
  return (
    <section>
      <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">{title}</h3>
      <div className="grid gap-cs3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {rows.map(s => (
          <div key={s.name} className="rounded-md overflow-hidden border border-border-subtle bg-surface-raised">
            <div className="h-24 flex items-end p-cs3" style={{ background: s.hex, color: s.fg ?? '#45210E' }}>
              <div className="font-bold">{s.name}</div>
            </div>
            <div className="p-cs2 px-cs3 text-xs font-mono text-text-muted leading-relaxed">
              <div><strong className="text-text">Hex</strong> {s.hex}</div>
              {s.oklch && <div><strong className="text-text">OKLCH</strong> {s.oklch}</div>}
              <div><strong className="text-text">Token</strong> {s.token}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
