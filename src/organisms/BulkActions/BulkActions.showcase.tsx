import { Button } from '@atoms/Button';

export default function BulkActionsShowcase() {
  return (
    <div className="max-w-4xl border border-border rounded-lg overflow-hidden bg-surface-raised">
      <div className="bg-surface-subtle py-cs2 px-cs3 border-b border-border-subtle font-mono text-[11px] text-text-muted">
        List with 7 selected of 142
      </div>
      <div className="bg-umber text-warm p-cs3 flex justify-between items-center">
        <div className="flex gap-cs2 items-center">
          <input type="checkbox" defaultChecked />
          <strong>7 invoices selected</strong>
          <Button variant="ghost" size="sm" className="text-warm hover:bg-umber-light">Select all 142</Button>
        </div>
        <div className="flex gap-cs2 items-center">
          <Button variant="secondary" size="sm">Send reminder</Button>
          <Button variant="secondary" size="sm">Mark paid</Button>
          <Button variant="secondary" size="sm" className="!text-danger">Delete</Button>
          <Button variant="ghost" size="sm" className="text-warm hover:bg-umber-light">✕ Clear</Button>
        </div>
      </div>
    </div>
  );
}
