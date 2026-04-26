import { Button } from '@atoms/Button';
import { Card } from '@molecules/Card';

interface Step { title: string; done: boolean; cta?: string }

const STEPS: Step[] = [
  { title: 'Connect your domain', done: true },
  { title: 'Invite your team',    done: true },
  { title: 'Set up SSO',          done: true },
  { title: 'Configure billing',   done: false, cta: 'Set up →' },
  { title: 'Create your first project', done: false, cta: 'Start' },
];

export default function OnboardingChecklistShowcase() {
  const doneCount = STEPS.filter(s => s.done).length;
  const pct = (doneCount / STEPS.length) * 100;
  return (
    <div className="max-w-md">
      <Card variant="accent">
        <div className="flex justify-between items-center mb-cs3">
          <h3 className="m-0 font-bold">Get started</h3>
          <Button variant="ghost" size="sm">Hide</Button>
        </div>
        <div className="h-2 bg-surface-subtle rounded-full overflow-hidden mb-cs2">
          <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-text-muted font-mono text-xs mb-cs3">{doneCount} of {STEPS.length} done</div>
        <div className="space-y-cs2">
          {STEPS.map((s, i) => (
            <div key={i} className={`flex items-center justify-between gap-cs2 ${s.done ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-cs2 flex-1">
                <span className={s.done ? 'text-success' : ''}>{s.done ? '✓' : '○'}</span>
                <span className={s.done ? 'line-through' : ''}>{s.title}</span>
              </div>
              {s.cta && <Button variant={i === doneCount ? 'accent' : 'secondary'} size="sm">{s.cta}</Button>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
