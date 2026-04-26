import { Button, type ButtonVariant, type ButtonSize } from './Button';

const variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'accent', 'danger', 'ghost'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

export default function ButtonShowcase() {
  return (
    <div className="flex flex-col gap-cs6 max-w-3xl">
      <Section title="Variants">
        <div className="flex gap-cs2 flex-wrap">
          {variants.map(v => <Button key={v} variant={v}>{cap(v)}</Button>)}
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex gap-cs2 items-center flex-wrap">
          {sizes.map(s => <Button key={s} size={s}>Size {s.toUpperCase()}</Button>)}
        </div>
      </Section>

      <Section title="States">
        <div className="flex gap-cs2 flex-wrap">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button iconLeft={<PlusIcon />}>With icon</Button>
        </div>
      </Section>

      <Section title="Full matrix">
        <div className="grid gap-cs2" style={{ gridTemplateColumns: 'auto repeat(3, 1fr) auto' }}>
          <div />
          {sizes.map(s => <div key={s} className="font-mono text-[10px] uppercase tracking-wider text-text-muted self-center text-center">{s}</div>)}
          <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted self-center">disabled</div>
          {variants.map(v => (
            <FragmentRow key={v} v={v} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function FragmentRow({ v }: { v: ButtonVariant }) {
  return (
    <>
      <div className="font-mono text-xs text-text-muted self-center">{v}</div>
      {sizes.map(s => (
        <div key={s} className="flex"><Button variant={v} size={s} className="w-full">{cap(v)}</Button></div>
      ))}
      <div className="flex"><Button variant={v} disabled>Disabled</Button></div>
    </>
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

function PlusIcon() {
  return <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth={2} strokeLinecap="round"/></svg>;
}

function cap(s: string) { return s[0].toUpperCase() + s.slice(1); }
