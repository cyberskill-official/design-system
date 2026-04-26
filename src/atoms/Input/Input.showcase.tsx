import { Input } from './Input';

export default function InputShowcase() {
  return (
    <div className="flex flex-col gap-cs5 max-w-xl">
      <Section title="States">
        <div className="flex flex-col gap-cs2">
          <Input placeholder="Default — Acme Corp" />
          <Input defaultValue="Acme Corp" />
          <Input defaultValue="invalid-email" invalid type="email" />
          <Input placeholder="Disabled" disabled />
        </div>
      </Section>
      <Section title="Sizes">
        <div className="flex flex-col gap-cs2">
          <Input inputSize="sm" placeholder="Small (h-7)" />
          <Input inputSize="md" placeholder="Medium (h-9, default)" />
          <Input inputSize="lg" placeholder="Large (h-11)" />
        </div>
      </Section>
      <Section title="Types">
        <div className="grid gap-cs2 grid-cols-2">
          <Input type="email" placeholder="email@example.com" />
          <Input type="number" placeholder="2026" />
          <Input type="date" defaultValue="2026-04-25" />
          <Input type="search" placeholder="Search…" />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-cs2">{title}</h3>
      {children}
    </section>
  );
}
