export default function PrintOnePagerShowcase() {
  return (
    <div className="bg-white text-[#1A0E04] mx-auto my-cs5 shadow-cs-md p-12 relative" style={{ width: '8.27in', minHeight: '11.69in', fontSize: '11pt', lineHeight: 1.5 }}>
      <header className="flex justify-between items-start border-b-2 border-umber pb-3 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-umber rounded-sm flex items-center justify-center"><div className="w-2.5 h-2.5 bg-accent rounded-sm" /></div>
            <strong className="text-sm tracking-wider">CyberSkill</strong>
          </div>
          <h1 className="font-bold mt-3" style={{ color: 'var(--cs-umber)', fontSize: '24pt', margin: 0 }}>Q1 2026 — Quarterly Performance Brief</h1>
          <div className="text-sm text-stone mt-1">Internal · Distribute to leadership only</div>
        </div>
        <div className="text-right text-xs font-mono text-stone">
          Doc-ID: QPR-2026-Q1-v3<br />
          Issued: 2026-04-15<br />
          Owner: Stephen Cheng
        </div>
      </header>

      <h2 className="font-bold mt-5 mb-2 pb-1 border-b border-border-subtle" style={{ color: 'var(--cs-umber)', fontSize: '13pt' }}>Executive summary</h2>
      <div style={{ columnCount: 2, columnGap: '24pt', marginTop: '8pt' }}>
        <p>Q1 2026 closed with two long-term engagements continuing at full capacity and three pilot conversations in late-stage discovery. Revenue grew 18% QoQ on the back of contract escalators tied to scope expansion at our largest account.</p>
        <p>Cost discipline held: utilisation across the 10-person engineering team averaged 78%, with the remaining 22% absorbed by internal R&amp;D — most notably the v1.0 lock of this Design System.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 my-5">
        {[['$148K','Quarterly revenue'],['+18%','QoQ growth'],['2','Active long-term contracts']].map(([v,l]) => (
          <div key={l} className="bg-warm border-l-[3pt] border-accent p-3">
            <div style={{ fontSize: '20pt', fontWeight: 800, lineHeight: 1, color: 'var(--cs-umber)' }}>{v}</div>
            <div className="text-xs uppercase tracking-wider text-stone mt-1">{l}</div>
          </div>
        ))}
      </div>

      <h2 className="font-bold mt-5 mb-2 pb-1 border-b border-border-subtle" style={{ color: 'var(--cs-umber)', fontSize: '13pt' }}>Pipeline snapshot</h2>
      <table className="w-full border-collapse text-sm mt-2">
        <thead><tr className="bg-warm">{['Account','Stage','ARR (USD)','Probability','Owner'].map(h => <th key={h} className="text-left py-1 px-2 font-bold border-b border-border-subtle">{h}</th>)}</tr></thead>
        <tbody>
          <tr><td className="py-1 px-2 border-b border-border-subtle">Acme Manufacturing</td><td className="py-1 px-2 border-b border-border-subtle">Renewal · negotiation</td><td className="py-1 px-2 border-b border-border-subtle">$120K</td><td className="py-1 px-2 border-b border-border-subtle">85%</td><td className="py-1 px-2 border-b border-border-subtle">Stephen</td></tr>
          <tr><td className="py-1 px-2 border-b border-border-subtle">Globex Logistics</td><td className="py-1 px-2 border-b border-border-subtle">Active · expansion ask</td><td className="py-1 px-2 border-b border-border-subtle">$96K</td><td className="py-1 px-2 border-b border-border-subtle">—</td><td className="py-1 px-2 border-b border-border-subtle">Stephen</td></tr>
          <tr><td className="py-1 px-2 border-b border-border-subtle">Singapore Fintech (Pilot 1)</td><td className="py-1 px-2 border-b border-border-subtle">POC running</td><td className="py-1 px-2 border-b border-border-subtle">$60K</td><td className="py-1 px-2 border-b border-border-subtle">50%</td><td className="py-1 px-2 border-b border-border-subtle">Stephen</td></tr>
        </tbody>
      </table>

      <footer className="absolute left-12 right-12 bottom-8 text-xs text-stone flex justify-between border-t border-border-subtle pt-2 font-mono">
        <span>CyberSkill JSC · TP.HCM, Vietnam</span>
        <span>Page 1 of 1 · Confidential</span>
      </footer>
    </div>
  );
}
