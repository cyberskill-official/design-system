interface Row { surface: string; before: string; after: string; why: string }

const ROWS: Row[] = [
  { surface: 'Empty state — Tasks list', before: 'No data available.',
    after: 'Nothing here yet — create your first task to get started.',
    why: 'Tells the user what to do next, not just what\'s missing.' },
  { surface: 'Error toast — Save failed', before: 'An unexpected error occurred. Please try again.',
    after: 'We couldn\'t save your changes — usually a network blip. Try again, or copy your draft to be safe.',
    why: 'Names the likely cause and suggests a safe fallback.' },
  { surface: 'Destructive confirm', before: 'Are you sure you want to do this?',
    after: 'Delete Acme Corp? This removes 1,248 records and cancels all integrations. 30-day grace period applies.',
    why: 'Specifies what disappears, in numbers, and the grace window.' },
  { surface: 'Button label', before: 'Submit', after: 'Send invoice',
    why: 'Verb + object beats generic verb.' },
  { surface: 'Vietnamese welcome', before: 'Xin chào người dùng!', after: 'Chào Stephen, hôm nay bạn muốn bắt đầu từ đâu?',
    why: 'Personal name + open question; matches Vietnamese register for first-name address.' },
];

export default function MicrocopyShowcase() {
  return (
    <div className="max-w-5xl space-y-cs6">
      <section>
        <h2 className="font-bold text-h2 m-0 mb-cs3">Voice principles</h2>
        <div className="grid gap-cs3 grid-cols-3">
          {[['Direct','Say the thing','Lead with the action or fact.'],['Warm','Human, not corporate','"We" not "the platform". "You" not "the user".'],['Honest','Don\'t bury bad news','If something failed or is delayed, say so plainly.']].map(([tone, h, d]) => (
            <div key={tone} className="bg-surface-raised border border-border-subtle rounded-lg p-cs4">
              <div className="inline-block bg-accent-subtle font-bold uppercase text-xs tracking-wider px-2 py-0.5 rounded-full" style={{ color: 'var(--cs-umber)' }}>{tone}</div>
              <h3 className="m-0 mt-cs2 font-bold">{h}</h3>
              <p className="text-text-muted text-sm m-0">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-h2 m-0 mb-cs3">Before / After</h2>
        <div className="bg-surface-raised border border-border rounded-md overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>{['Surface','Before','After','Why'].map(h => <th key={h} className="text-left bg-surface-subtle font-mono text-xs uppercase tracking-wider text-text-muted py-cs3 px-cs3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} className="border-t border-border-subtle align-top">
                  <td className="p-cs3 font-semibold">{r.surface}</td>
                  <td className="p-cs3 italic" style={{ background: 'rgba(179,59,25,.04)', color: '#7A2A12' }}>{r.before}</td>
                  <td className="p-cs3" style={{ background: 'rgba(58,125,68,.04)', color: '#1F4D27' }}>{r.after}</td>
                  <td className="p-cs3 text-text-muted">{r.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-h2 m-0 mb-cs3">Forbidden phrases</h2>
        <div className="bg-surface-raised border border-border-subtle rounded-md p-cs4">
          <ul className="m-0 pl-cs5 space-y-1 text-sm">
            <li><strong>Never:</strong> "Oops!", "Whoops!", "Uh-oh!" — performative cuteness around failures the user can't fix.</li>
            <li><strong>Never:</strong> "Please be advised", "Kindly", "As per" — corporate filler. Strip on sight.</li>
            <li><strong>Never:</strong> "Click here", "Read more" — link text must describe the destination.</li>
            <li><strong>Never:</strong> "Are you sure?" alone — destructive confirms must specify what is being destroyed.</li>
            <li><strong>Never:</strong> Emoji in transactional copy (allowed in optional onboarding/marketing only).</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
