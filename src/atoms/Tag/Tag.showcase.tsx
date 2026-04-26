import { Tag, type TagTone } from './Tag';

const tones: TagTone[] = ['default', 'accent', 'success', 'warning', 'danger', 'info'];

export default function TagShowcase() {
  return (
    <div className="flex flex-col gap-cs5 max-w-2xl">
      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">Tones</h3>
        <div className="flex gap-cs2 flex-wrap">
          {tones.map(t => <Tag key={t} tone={t}>{t}</Tag>)}
        </div>
      </section>
      <section>
        <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">In context</h3>
        <div className="flex gap-cs2 flex-wrap">
          <Tag tone="success">✓ Paid</Tag>
          <Tag tone="warning">⏳ Pending</Tag>
          <Tag tone="danger">⚠ Overdue</Tag>
          <Tag tone="info">ℹ Beta</Tag>
          <Tag tone="accent">⭐ Featured</Tag>
        </div>
      </section>
    </div>
  );
}
