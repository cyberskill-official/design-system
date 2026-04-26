interface Card { title: string; meta: string; done?: boolean }
interface Col { name: string; cards: Card[] }

const COLS: Col[] = [
  { name: 'Backlog', cards: [
    { title: 'Add CSV import', meta: 'BE · P3' },
    { title: 'Refactor token pipeline', meta: 'FE · P4' },
    { title: 'Update onboarding', meta: 'UX · P3' },
  ] },
  { name: 'In progress', cards: [
    { title: 'Migrate to Tailwind v4', meta: 'L · P2' },
    { title: 'RichText AI commands', meta: 'T · P2' },
    { title: 'VN diacritic regression', meta: 'H · P1' },
  ] },
  { name: 'Review', cards: [
    { title: 'DangerConfirm pattern', meta: 'N · P3' },
    { title: 'EmptyState illustrations', meta: 'M · P4' },
  ] },
  { name: 'Done', cards: [
    { title: 'Logo SVG cleanup',    meta: '✓ Done', done: true },
    { title: 'Fix dark contrast',   meta: '✓ Done', done: true },
    { title: 'v1.0 audit publish',  meta: '✓ Done', done: true },
  ] },
];

export default function KanbanShowcase() {
  return (
    <div className="max-w-5xl border border-border rounded-lg overflow-hidden bg-surface-raised">
      <div className="bg-surface-subtle py-cs2 px-cs3 border-b border-border-subtle font-mono text-[11px] text-text-muted">
        Kanban.Board · standard variant
      </div>
      <div className="grid grid-cols-4 gap-cs3 p-cs4">
        {COLS.map(col => (
          <div key={col.name} className="bg-surface-subtle rounded-lg p-cs3">
            <div className="flex justify-between font-mono text-[11px] uppercase text-text-muted mb-cs2">
              <span>{col.name}</span><span>{col.cards.length}</span>
            </div>
            {col.cards.map(c => (
              <div key={c.title} className={`bg-surface-raised border border-border-subtle rounded-md p-cs2 px-cs3 mb-cs2 shadow-cs text-sm ${c.done ? 'opacity-70' : ''}`}>
                <div className="font-semibold">{c.title}</div>
                <div className="text-text-muted font-mono text-[11px] mt-0.5">{c.meta}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
