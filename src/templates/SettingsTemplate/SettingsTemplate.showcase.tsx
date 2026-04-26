import { Button } from '@atoms/Button';
import { Field } from '@molecules/Field';
import { Tag } from '@atoms/Tag';

export default function SettingsTemplateShowcase() {
  return (
    <div className="grid border border-border rounded-lg overflow-hidden bg-surface min-h-[640px]" style={{ gridTemplateColumns: '220px 1fr' }}>
      <aside className="bg-surface-subtle p-cs3 border-r border-border-subtle text-sm">
        <h2 className="font-bold text-md m-0 mx-cs2 mb-cs3">Workspace settings</h2>
        <Group title="General">
          <Item active>Profile</Item>
          <Item>Branding</Item>
          <Item>Localisation</Item>
        </Group>
        <Group title="Team">
          <Item>Members</Item>
          <Item>Roles &amp; permissions</Item>
        </Group>
        <Group title="Billing">
          <Item>Plan &amp; usage</Item>
          <Item>Invoices</Item>
        </Group>
        <Group title="Security">
          <Item>Authentication</Item>
          <Item>SSO / SCIM</Item>
          <Item>Audit log</Item>
        </Group>
      </aside>
      <main className="p-cs6 max-w-2xl overflow-y-auto">
        <h1 className="font-bold text-h1 m-0">Profile</h1>
        <p className="text-text-muted flex items-center gap-cs3">
          Workspace profile and contact details.
          <Tag tone="success">✓ Changes saved 2 min ago</Tag>
        </p>

        <Section title="Identity">
          <Field label="Workspace name" defaultValue="Acme Corp" helper="Affects all members." />
          <Field label="Workspace URL" defaultValue="acme-corp" helper="Lowercase letters, numbers, hyphens only." />
        </Section>

        <Section title="Appearance">
          <Field label="Default theme" defaultValue="System (auto)" helper="Members can override." />
          <Field label="Density" defaultValue="Cozy (default)" helper="Compact for power users; comfortable for accessibility." />
        </Section>

        <section className="mt-cs8 border border-danger rounded-md p-cs4 bg-danger-subtle/20">
          <div className="font-mono text-xs uppercase tracking-wider text-danger mb-cs3">Danger zone</div>
          <DangerRow title="Transfer ownership" desc="Move workspace to another owner." cta="Transfer" />
          <DangerRow title="Delete workspace" desc="All data permanently removed. 30-day grace period." cta="Delete workspace" danger />
        </section>
      </main>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted mt-cs3 mb-1 px-cs2">{title}</div>
      {children}
    </>
  );
}
function Item({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return <a href="#" className={`block py-1.5 px-cs2 rounded-sm ${active ? 'bg-accent-subtle font-semibold' : ''}`} style={active ? { color: 'var(--cs-umber)' } : undefined}>{children}</a>;
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-cs5 border-b border-border-subtle last:border-0">
      <h2 className="font-bold text-h3 mt-0 mb-cs3">{title}</h2>
      <div className="space-y-cs3">{children}</div>
    </section>
  );
}
function DangerRow({ title, desc, cta, danger }: { title: string; desc: string; cta: string; danger?: boolean }) {
  return (
    <div className="flex justify-between items-center py-cs2 border-t border-danger/20 first:border-0">
      <div>
        <strong>{title}</strong>
        <div className="text-text-muted text-sm">{desc}</div>
      </div>
      <Button variant={danger ? 'danger' : 'secondary'}>{cta}</Button>
    </div>
  );
}
