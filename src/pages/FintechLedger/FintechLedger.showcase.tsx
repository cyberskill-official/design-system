import { Button } from '@atoms/Button';
import { Tag } from '@atoms/Tag';
import { Banner } from '@molecules/Banner';

interface Tx { date: string; desc: string; ref: string; amount: string; in: boolean; status: 'Cleared' | 'Pending' | 'Failed · IBAN invalid' }
const TXNS: Tx[] = [
  { date: '2026-04-25 14:22', desc: 'Transfer to Globex Logistics Ltd', ref: 'TXN-94821', amount: '−$48,200.00', in: false, status: 'Cleared' },
  { date: '2026-04-25 09:14', desc: 'Inbound · Acme Manufacturing payroll', ref: 'TXN-94820', amount: '+$120,000.00', in: true, status: 'Cleared' },
  { date: '2026-04-24 17:08', desc: 'FX conversion · USD → VND', ref: 'FX-13402', amount: '−$5,000.00', in: false, status: 'Pending' },
  { date: '2026-04-24 11:33', desc: 'Wire · supplier #4421', ref: 'WIRE-2089', amount: '−$3,210.00', in: false, status: 'Failed · IBAN invalid' },
  { date: '2026-04-23 19:51', desc: 'Card refund · Amazon AWS', ref: 'RFD-7712', amount: '+$184.32', in: true, status: 'Cleared' },
];

export default function FintechLedgerShowcase() {
  return (
    <div className="max-w-5xl space-y-cs5" style={{ fontVariantNumeric: 'tabular-nums' }}>
      <div className="grid gap-cs4 p-cs5 rounded-lg text-warm" style={{ gridTemplateColumns: '2fr 1fr', background: 'linear-gradient(135deg, var(--cs-umber), var(--cs-umber-light))' }}>
        <div>
          <div className="font-mono text-xs uppercase tracking-wider opacity-80">Available balance · USD</div>
          <div className="text-4xl font-extrabold leading-tight my-1">$248,419<span className="text-lg opacity-80">.06</span></div>
          <div className="text-sm opacity-85">Across 3 accounts · Last sync 2 min ago</div>
          <div className="flex gap-cs2 mt-cs3">
            <Button variant="accent">+ Send</Button>
            <button className="bg-transparent border border-warm/30 text-warm py-1 px-cs3 rounded-md font-semibold">Request</button>
            <button className="bg-transparent border border-warm/30 text-warm py-1 px-cs3 rounded-md font-semibold">Convert</button>
          </div>
        </div>
        <div>
          <div className="font-mono text-xs uppercase opacity-80">Pending settlement</div>
          <div className="text-2xl font-bold mt-1">$3,210.00</div>
          <div className="text-xs opacity-80">2 inbound transactions clearing Mon</div>
        </div>
      </div>

      <h2 className="font-bold text-h2 m-0">KYC status <span className="font-normal text-text-muted text-sm font-mono">3 of 4 complete</span></h2>
      <div className="grid gap-cs3 grid-cols-4">
        {['Identity','Address','Source of funds','Enhanced DD'].map((s, i) => (
          <div key={s} className={`p-cs3 border rounded-md ${i < 3 ? 'border-success bg-success-subtle/40' : 'border-accent shadow-cs'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs mb-2 ${i < 3 ? 'bg-success text-white' : 'bg-accent'}`} style={i === 3 ? { color: 'var(--cs-umber)' } : undefined}>
              {i < 3 ? '✓' : '4'}
            </div>
            <div className="font-bold text-sm">{s}</div>
            <div className="text-text-muted text-xs">{i < 3 ? 'Verified' : 'Reviewer: Linh N.'}</div>
          </div>
        ))}
      </div>

      <h2 className="font-bold text-h2 m-0">Recent transactions</h2>
      <div className="bg-surface-raised border border-border rounded-md overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>{['Date','Description','Reference','Amount','Status'].map(h => <th key={h} className={`bg-surface-subtle font-mono text-xs uppercase tracking-wider text-text-muted py-cs2 px-cs3 ${h === 'Amount' ? 'text-right' : 'text-left'}`}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {TXNS.map((t, i) => (
              <tr key={i} className="border-t border-border-subtle">
                <td className="py-cs2 px-cs3">{t.date}</td>
                <td className="py-cs2 px-cs3">{t.desc}</td>
                <td className="py-cs2 px-cs3 font-mono text-text-muted">{t.ref}</td>
                <td className={`py-cs2 px-cs3 text-right font-semibold ${t.in ? 'text-success' : 'text-danger'}`}>{t.amount}</td>
                <td className="py-cs2 px-cs3"><Tag tone={t.status === 'Cleared' ? 'success' : t.status === 'Pending' ? 'warning' : 'danger'}>{t.status}</Tag></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Banner tone="warning" title="Compliance note:">1 wire failed validation. Re-submit with corrected IBAN within 24h or the transaction is cancelled per AML §4.2.</Banner>
    </div>
  );
}
