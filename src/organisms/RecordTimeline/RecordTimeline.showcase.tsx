interface Event { icon: string; who: string; what: React.ReactNode; when: string }

const TODAY: Event[] = [
  { icon: '$', who: 'Linh', what: <>marked invoice <strong>paid</strong></>, when: '10:42 · payment received via wire' },
  { icon: '@', who: 'System', what: <>sent reminder email</>, when: '09:15' },
];
const YESTERDAY: Event[] = [
  { icon: '✎', who: 'Tuấn', what: <>updated due date <span className="font-mono text-text-muted">→ 2026-05-15</span></>, when: '15:22' },
  { icon: '+', who: 'Stephen', what: <>created invoice</>, when: '22 Apr · 08:00' },
];

export default function RecordTimelineShowcase() {
  return (
    <div className="max-w-2xl border border-border rounded-lg overflow-hidden bg-surface-raised">
      <div className="bg-surface-subtle py-cs2 px-cs3 border-b border-border-subtle font-mono text-[11px] text-text-muted">
        Invoice INV-2026-014 · History · 4 events
      </div>
      <div className="p-cs5">
        <Day label="Today" events={TODAY} />
        <Day label="Yesterday" events={YESTERDAY} />
      </div>
    </div>
  );
}

function Day({ label, events }: { label: string; events: Event[] }) {
  return (
    <>
      <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-cs3 mt-cs3 first:mt-0">{label}</div>
      {events.map((e, i) => (
        <div key={i} className="grid gap-cs3 pb-cs4 relative" style={{ gridTemplateColumns: '32px 1fr' }}>
          {i < events.length - 1 && <div className="absolute left-3.5 top-8 bottom-0 w-0.5 bg-border-subtle" />}
          <div className="w-8 h-8 rounded-full bg-accent-subtle text-umber flex items-center justify-center font-bold text-sm relative z-10">{e.icon}</div>
          <div>
            <div><strong>{e.who}</strong> {e.what}</div>
            <div className="text-text-muted font-mono text-xs">{e.when}</div>
          </div>
        </div>
      ))}
    </>
  );
}
