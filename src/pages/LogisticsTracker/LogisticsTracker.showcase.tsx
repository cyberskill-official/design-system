import { Button } from '@atoms/Button';

const STOPS = [
  { city: 'TP.HCM', when: '23/04 08:00', state: 'done' },
  { city: 'Phan Thiết', when: '23/04 14:18', state: 'done' },
  { city: 'Nha Trang', when: '24/04 18:42 · current', state: 'active' },
  { city: 'Quy Nhơn', when: '25/04 06:15 · ETA', state: 'pending' },
  { city: 'Đà Nẵng', when: '25/04 18:42 · ETA', state: 'pending' },
];

export default function LogisticsTrackerShowcase() {
  return (
    <div className="max-w-5xl space-y-cs4">
      <div className="bg-surface-raised border border-border rounded-md p-cs5 grid gap-cs4" style={{ gridTemplateColumns: '1fr auto' }}>
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-text-muted">Tracking number</div>
          <div className="font-mono text-lg font-bold text-umber tracking-wider">CSL-VN-9482-104821</div>
          <h2 className="my-cs2 font-bold text-h3">3 pallets · 1,240 kg · Refrigerated 4°C</h2>
          <div className="text-text-muted text-sm">Customer: Globex Logistics · Order #PO-44821 · 2026-04-23</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-xs uppercase text-text-muted">Estimated arrival</div>
          <div className="inline-flex items-center gap-1 bg-accent-subtle py-1 px-3 rounded-full font-bold text-sm my-1" style={{ color: 'var(--cs-umber)' }}>⏱ in 4h 22m</div>
          <div className="font-mono text-sm text-text-muted">2026-04-25 · 18:42 ICT</div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="h-60 relative overflow-hidden rounded-md border border-border" style={{ background: 'linear-gradient(135deg, #E5EDD8, #C8DBA8)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1" style={{ background: 'linear-gradient(90deg, var(--cs-color-semantic-success) 0% 60%, var(--cs-color-accent-default) 60% 60%, var(--cs-color-border-default) 60% 100%)' }} />
        {[
          { x: '5%', label: 'SAIGON · Origin', color: 'var(--cs-color-semantic-success)' },
          { x: '60%', label: 'NHA TRANG · now', color: 'var(--cs-color-accent-default)', big: true },
          { x: '95%', label: 'DA NANG · Dest.', color: 'var(--cs-umber)' },
        ].map(p => (
          <div key={p.label} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-cs" style={{ left: p.x, width: p.big ? 24 : 18, height: p.big ? 24 : 18, background: p.color }}>
            <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-surface py-0.5 px-cs2 rounded-sm font-mono text-xs font-bold whitespace-nowrap border border-border shadow-cs">{p.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-cs2 my-cs4">
        {STOPS.map((s, i) => (
          <div key={s.city} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full border-[3px] flex items-center justify-center text-xs font-bold ${
                s.state === 'done' ? 'bg-success border-success text-white'
                : s.state === 'active' ? 'bg-accent border-accent shadow-cs'
                : 'bg-surface-subtle border-border text-text-muted'
              }`}>{s.state === 'done' ? '✓' : i+1}</div>
              <div className="font-bold text-sm mt-1">{s.city}</div>
              <div className="font-mono text-[11px] text-text-muted">{s.when}</div>
            </div>
            {i < STOPS.length - 1 && <div className={`flex-1 h-0.5 mx-cs2 ${s.state === 'done' ? 'bg-success' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      <h2 className="font-bold text-h2 m-0">Live exceptions <span className="font-normal text-text-muted text-sm font-mono">2 active · 1 cleared</span></h2>
      <Exception tone="warn" title="Cold-chain temperature drift · Sensor #4" body="Reading 6.2°C (target 4°C, max 5°C) for 12 minutes. Driver notified, AC re-balanced." cta="View readings" />
      <Exception tone="danger" title="Estimated 22-min delay · Highway QL1A" body="Traffic incident at km 1245. Re-routed via QL1D. Customer auto-notified at 11:48." cta="Notify customer" />
    </div>
  );
}

function Exception({ tone, title, body, cta }: { tone: 'warn' | 'danger'; title: string; body: string; cta: string }) {
  const cls = tone === 'warn'
    ? 'bg-warning-subtle/30 border border-warning/30'
    : 'bg-danger-subtle/30 border border-danger/30';
  return (
    <div className={`grid items-center gap-cs3 p-cs3 rounded-md ${cls}`} style={{ gridTemplateColumns: 'auto 1fr auto' }}>
      <div className="text-2xl">⚠</div>
      <div>
        <div className="font-bold">{title}</div>
        <div className="text-text-muted text-sm">{body}</div>
      </div>
      <Button variant="secondary" size="sm">{cta}</Button>
    </div>
  );
}
