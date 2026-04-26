import { Button } from '@atoms/Button';

const HEADS = ['CN','T2','T3','T4','T5','T6','T7'];
type Cell = { num: number; muted?: boolean; today?: boolean; events?: string[] };

const CELLS: Cell[] = [
  { num: 29, muted: true }, { num: 30, muted: true }, { num: 31, muted: true },
  { num: 1, events: ['Họp đội'] }, { num: 2 }, { num: 3 },
  { num: 4, events: ['Khách Acme'] }, { num: 5 },
  { num: 6, events: ['Sprint planning'] }, { num: 7 }, { num: 8 }, { num: 9 },
  { num: 10, events: ['Demo'] }, { num: 11 }, { num: 12 },
  { num: 13 }, { num: 14 }, { num: 15 }, { num: 16 }, { num: 17 },
  { num: 18, events: ['QBR'] },
  { num: 19 }, { num: 20 }, { num: 21 }, { num: 22 }, { num: 23 }, { num: 24 },
  { num: 25, today: true, events: ['v1.0 lock!'] },
  { num: 26 }, { num: 27 }, { num: 28 }, { num: 29 },
  { num: 30, events: ['Reunification'] },
  { num: 1, muted: true }, { num: 2, muted: true },
];

export default function CalendarShowcase() {
  return (
    <div className="max-w-3xl border border-border rounded-lg overflow-hidden bg-surface-raised">
      <div className="bg-surface-subtle py-cs2 px-cs3 border-b border-border-subtle font-mono text-[11px] text-text-muted">
        Calendar.Scheduler · view=month · locale=vi · week-start=Sunday
      </div>
      <div className="flex justify-between items-center p-cs3 border-b border-border-subtle">
        <div className="flex gap-cs2">
          <Button variant="secondary" size="sm">← Trước</Button>
          <Button variant="secondary" size="sm">Sau →</Button>
        </div>
        <h3 className="m-0 font-bold">Tháng 4, 2026</h3>
        <Button variant="accent" size="sm">+ Thêm sự kiện</Button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-border-subtle">
        {HEADS.map(h => (
          <div key={h} className="bg-surface-subtle py-cs2 font-mono text-[11px] uppercase tracking-wider text-center text-text-muted">{h}</div>
        ))}
        {CELLS.map((c, i) => (
          <div key={i} className={`bg-surface-raised p-cs2 min-h-16 text-sm ${c.muted ? 'bg-surface-subtle text-text-muted' : ''} ${c.today ? 'bg-accent-subtle border-2 border-accent' : ''}`}>
            <div className="font-bold">{c.num}</div>
            {c.events?.map(ev => (
              <div key={ev} className="bg-umber text-warm text-[10px] py-px px-1 rounded inline-block mt-0.5">{ev}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
