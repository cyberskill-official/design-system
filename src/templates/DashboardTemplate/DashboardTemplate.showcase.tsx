import { Avatar } from '@atoms/Avatar';
import { Button } from '@atoms/Button';
import { Tag } from '@atoms/Tag';
import { Card } from '@molecules/Card';
import { KpiCard } from '@molecules/KpiCard';
import { DataTable, StatusTag, type Column } from '@organisms/DataTable';

interface Row { date: string; customer: string; amount: string; status: 'paid' | 'pending' | 'overdue' }
const rows: Row[] = [
  { date: '2026-04-22', customer: 'Acme Corp',  amount: '$12,450.00', status: 'paid' },
  { date: '2026-04-18', customer: 'Globex Ltd', amount: '$8,200.00',  status: 'pending' },
  { date: '2026-04-10', customer: 'Hooli',      amount: '$24,000.00', status: 'overdue' },
];
const cols: Column<Row>[] = [
  { key: 'date', header: 'Date' },
  { key: 'customer', header: 'Customer' },
  { key: 'amount', header: 'Amount', align: 'right' },
  { key: 'status', header: 'Status', render: r => <StatusTag status={r.status} /> },
];

export default function DashboardTemplateShowcase() {
  return (
    <div className="grid h-[640px] border border-border rounded-lg overflow-hidden bg-warm" style={{ gridTemplateColumns: '200px 1fr', gridTemplateRows: '48px 1fr' }}>
      {/* App header */}
      <div className="col-span-2 bg-umber text-warm flex items-center justify-between px-cs4 border-b border-umber-dark">
        <div className="flex items-center gap-cs2 font-bold">
          <img src="/logo-symbol.svg" alt="" className="h-6 w-6" />
          <span>Acme Corp <span className="font-mono text-xs opacity-70 ml-1">▾</span></span>
        </div>
        <div className="flex items-center gap-cs2">
          <Tag tone="accent">Pro plan</Tag>
          <Avatar size="sm" initials="SC" />
        </div>
      </div>
      {/* Sidebar */}
      <nav className="bg-surface-subtle p-cs3 border-r border-border-subtle text-sm">
        <NavItem active>📊 Dashboard</NavItem>
        <NavItem>📁 Projects</NavItem>
        <NavItem>👥 Customers</NavItem>
        <NavItem>📨 Invoices</NavItem>
        <NavItem>⚙ Settings</NavItem>
      </nav>
      {/* Main */}
      <main className="overflow-y-auto p-cs5">
        <div className="flex justify-between items-center mb-cs4">
          <h1 className="m-0 text-h2 font-bold">Welcome back, Stephen</h1>
          <Button variant="accent">+ New invoice</Button>
        </div>
        <div className="grid gap-cs3 mb-cs5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
          <KpiCard label="MRR" value="$48,200" trend={{ direction: 'up', label: '12.4%', tone: 'success' }} accent />
          <KpiCard label="Active users" value="1,284" trend={{ direction: 'up', label: '4.1%', tone: 'success' }} />
          <KpiCard label="NPS" value="62" trend={{ direction: 'flat', label: 'no change', tone: 'muted' }} />
        </div>
        <div className="grid gap-cs4" style={{ gridTemplateColumns: '2fr 1fr' }}>
          <DataTable caption="Recent invoices" columns={cols} rows={rows} />
          <Card>
            <h3 className="m-0 mb-cs2 font-bold">Activity</h3>
            <ul className="m-0 p-0 list-none text-sm space-y-cs2">
              <li><strong>Linh</strong> created invoice <span className="text-text-muted">10:42</span></li>
              <li><strong>Tuấn</strong> approved expense <span className="text-text-muted">09:15</span></li>
              <li><strong>System</strong> sent reminder <span className="text-text-muted">08:00</span></li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
function NavItem({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return <a href="#" className={`block py-1.5 px-cs2 rounded-sm ${active ? 'bg-accent-subtle font-semibold' : 'hover:bg-surface-raised'}`} style={active ? { color: 'var(--cs-umber)' } : undefined}>{children}</a>;
}
