import { Button } from '@atoms/Button';
import { Field } from '@molecules/Field';
import { Banner } from '@molecules/Banner';
import { Card } from '@molecules/Card';

const STEPS = ['Workspace', 'Branding', 'Team', 'Billing', 'Review'];
const ACTIVE = 2; // 0-indexed

export default function WizardTemplateShowcase() {
  return (
    <div className="max-w-3xl mx-auto p-cs8 px-cs6">
      <header className="bg-surface border-b border-border-subtle py-cs3 px-cs6 flex justify-between items-center -mx-cs6 -mt-cs8 mb-cs8">
        <strong>CyberSkill</strong>
        <Button variant="ghost" size="sm">Save and exit</Button>
      </header>

      <h1 className="font-bold text-h1 m-0">Set up your workspace</h1>
      <p className="text-text-muted mb-cs6">5 minutes — we'll get you ready to invoice your first customer.</p>

      <nav className="flex items-center gap-cs2 mb-cs8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
                i < ACTIVE ? 'bg-success text-white border-success'
                : i === ACTIVE ? 'bg-accent border-accent shadow-cs'
                : 'bg-surface-raised border-border text-text-muted'
              }`} style={i === ACTIVE ? { color: 'var(--cs-umber)' } : undefined}>
                {i < ACTIVE ? '✓' : i + 1}
              </div>
              <div className={`font-mono text-[10px] uppercase tracking-wider mt-1 ${i === ACTIVE ? 'font-bold' : 'text-text-muted'}`}>{s}</div>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-cs2 ${i < ACTIVE ? 'bg-success' : 'bg-border'}`} />}
          </div>
        ))}
      </nav>

      <Card>
        <div className="font-mono text-xs uppercase tracking-wider text-accent">Step {ACTIVE + 1} of {STEPS.length}</div>
        <h2 className="mt-cs2 font-bold text-h2">Invite your team</h2>
        <p className="text-text-muted">Add members now or skip — you can always invite people later from Settings.</p>
        <div className="space-y-cs3 mt-cs4">
          <div className="flex gap-cs2">
            <Field label="Email" placeholder="email@acme-corp.example" className="flex-1" />
            <Field label="Role" defaultValue="Editor" className="max-w-40" />
            <Button variant="secondary" className="self-end">+ Add another</Button>
          </div>
          <Card variant="inset">
            <h3 className="m-0 font-bold mb-1">Bulk invite via CSV</h3>
            <p className="text-text-muted text-sm m-0 mb-cs2">Up to 100 members per import.</p>
            <Button variant="secondary" size="sm">Choose file</Button>
          </Card>
          <Banner tone="info" title="Tip:">Invitations expire in 7 days. We'll send reminders at day 3 and day 6.</Banner>
        </div>
      </Card>

      <div className="flex justify-between items-center mt-cs6">
        <Button variant="tertiary">← Back</Button>
        <div className="flex gap-cs2">
          <Button variant="ghost">Skip for now</Button>
          <Button variant="accent">Continue →</Button>
        </div>
      </div>
    </div>
  );
}
