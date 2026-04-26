export default function CommandPaletteShowcase() {
  return (
    <div className="max-w-2xl mx-auto p-cs8 rounded-lg" style={{ background: 'rgba(42,21,5,0.6)' }}>
      <div className="bg-surface-raised rounded-lg shadow-cs-md border border-border overflow-hidden">
        <div className="flex gap-cs2 py-cs3 px-cs4 border-b border-border-subtle">
          <span className="text-text-muted">⌕</span>
          <input type="text" defaultValue="invoice" className="flex-1 border-0 outline-0 text-md bg-transparent" />
          <span className="font-mono text-xs py-0.5 px-1.5 bg-surface-subtle border border-border-subtle rounded-sm text-text-muted">Esc</span>
        </div>
        <div className="py-cs2">
          <Group title="Recent">
            <Item active>Create invoice <Kbd>↵</Kbd></Item>
          </Group>
          <Group title="Pages">
            <Item><strong>Invoices</strong> — list of all invoices</Item>
            <Item><strong>Invoice settings</strong> — billing</Item>
          </Group>
          <Group title="Actions">
            <Item><strong>Export invoices</strong> as CSV / PDF</Item>
          </Group>
        </div>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <div className="py-1 px-cs4 font-mono text-[10px] uppercase tracking-wider text-text-muted">{title}</div>
      {children}
    </>
  );
}
function Item({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <div className={`py-cs2 px-cs4 flex justify-between items-center cursor-pointer ${active ? 'bg-accent-subtle' : 'hover:bg-surface-subtle'}`}>
      <span>{children}</span>
    </div>
  );
}
function Kbd({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-xs py-0.5 px-1.5 bg-surface-subtle border border-border-subtle rounded-sm text-text-muted">{children}</span>;
}
