import { Button } from '@atoms/Button';
import { Input } from '@atoms/Input';

export default function FilterBarShowcase() {
  return (
    <div className="max-w-4xl border border-border rounded-lg overflow-hidden bg-surface-raised">
      <div className="bg-surface-subtle py-cs2 px-cs3 border-b border-border-subtle font-mono text-[11px] text-text-muted">
        FilterBarPattern · 3 filters · 142 results
      </div>
      <div className="flex gap-cs2 p-cs3 bg-surface-subtle items-center flex-wrap">
        <Input inputSize="sm" type="search" placeholder="Search by name or ID" className="max-w-60" />
        <Button variant="secondary" size="sm">Status ▾</Button>
        <Button variant="secondary" size="sm">Owner ▾</Button>
        <Button variant="secondary" size="sm">Date ▾</Button>
        <Chip>Status: Active ×</Chip>
        <Chip>Owner: Linh ×</Chip>
        <Chip>Last 30 days ×</Chip>
        <Button variant="tertiary" size="sm">Clear</Button>
        <span className="text-text-muted font-mono text-xs ml-auto">142 results</span>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="bg-accent-subtle py-1 px-2.5 rounded-full text-sm font-semibold" style={{ color: 'var(--cs-umber)' }}>{children}</span>;
}
