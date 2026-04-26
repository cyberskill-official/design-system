import { Button } from '@atoms/Button';
import { Tag } from '@atoms/Tag';
import { DataTable, type Column } from '@organisms/DataTable';

interface Inv { date: string; desc: string; amount: string; status: string; pdf: string }
const invoices: Inv[] = [
  { date: '2026-04-25', desc: 'Pro plan · Apr 2026', amount: '$49.00', status: 'Paid', pdf: 'PDF' },
  { date: '2026-03-25', desc: 'Pro plan · Mar 2026', amount: '$49.00', status: 'Paid', pdf: 'PDF' },
  { date: '2026-02-25', desc: 'Pro plan · Feb 2026', amount: '$49.00', status: 'Paid', pdf: 'PDF' },
];
const cols: Column<Inv>[] = [
  { key: 'date', header: 'Date' },
  { key: 'desc', header: 'Description' },
  { key: 'amount', header: 'Amount', align: 'right' },
  { key: 'status', header: 'Status', render: () => <Tag tone="success">Paid</Tag> },
  { key: 'pdf', header: '', render: () => <a href="#" className="underline">PDF</a> },
];

export default function BillingTemplateShowcase() {
  return (
    <div className="max-w-4xl mx-auto p-cs6">
      <h1 className="font-bold text-h1 m-0">Billing &amp; usage</h1>
      <p className="text-text-muted">Anti-dark-pattern — cancel as discoverable as upgrade.</p>

      <div className="grid gap-cs4 p-cs5 rounded-lg my-cs6 text-warm" style={{ gridTemplateColumns: '2fr 1fr', background: 'linear-gradient(135deg, var(--cs-umber), var(--cs-umber-light))' }}>
        <div>
          <div className="font-mono text-xs uppercase tracking-wider opacity-70">Current plan</div>
          <h2 className="font-bold m-0 mt-1 text-3xl text-warm">Pro <span className="text-accent">$49<span className="text-sm">/mo</span></span></h2>
          <div className="font-mono text-sm opacity-80">Renews 2026-05-25 · Annual billing · USD</div>
          <div className="flex gap-cs2 mt-cs4">
            <Button variant="accent">Change plan</Button>
            <button className="bg-transparent border border-warm/40 text-warm py-1 px-cs4 rounded-md font-semibold">Update payment</button>
          </div>
        </div>
        <div>
          <div className="font-mono text-xs uppercase opacity-70">Next charge</div>
          <div className="text-3xl font-extrabold mt-1">$49.00</div>
          <div className="font-mono text-sm opacity-80">on 2026-05-25 · Visa •••• 4242</div>
        </div>
      </div>

      <h2 className="font-bold text-h2">Usage this period <span className="font-normal text-text-muted text-sm font-mono">2026-04-25 → 2026-05-25</span></h2>
      <div className="grid gap-cs3 my-cs4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Usage label="Members" value="12 / 25" pct={48} />
        <Usage label="API requests" value="87,420 / 100,000" pct={87} warn />
        <Usage label="Storage" value="14.2 / 50 GB" pct={28} />
      </div>

      <div className="flex justify-between items-center mb-cs3"><h2 className="m-0 font-bold text-h2">Invoices</h2><Button variant="secondary" size="sm">↓ Export all</Button></div>
      <DataTable columns={cols} rows={invoices} />

      <section className="mt-cs8 pt-cs5 border-t border-border-subtle">
        <h3 className="font-bold text-h3">Cancel subscription</h3>
        <p className="text-text-muted">Cancel anytime. You'll keep access through your current billing period (until 2026-05-25). After that, your account becomes free-tier; data preserved for 30 days.</p>
        <Button variant="secondary">Cancel subscription</Button>
      </section>
    </div>
  );
}

function Usage({ label, value, pct, warn }: { label: string; value: string; pct: number; warn?: boolean }) {
  return (
    <div className="bg-surface-raised border border-border-subtle rounded-md p-cs4">
      <div className="font-mono text-xs uppercase text-text-muted">{label}</div>
      <div className="text-xl font-extrabold my-1" style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div className="h-1.5 bg-surface-subtle rounded-full overflow-hidden">
        <div className={`h-full ${warn ? 'bg-warning' : 'bg-accent'}`} style={{ width: `${pct}%` }} />
      </div>
      <div className={`text-xs mt-1 ${warn ? 'text-warning font-bold' : 'text-text-muted'}`}>{warn && '⚠ '}{pct}% used</div>
    </div>
  );
}
