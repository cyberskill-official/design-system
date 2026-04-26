import { DataTable, StatusTag, type Column } from './DataTable';

interface Invoice {
  date: string; customer: string; amount: string; status: 'paid' | 'pending' | 'overdue' | 'draft';
}

const rows: Invoice[] = [
  { date: '2026-04-22', customer: 'Acme Corp',   amount: '$12,450.00', status: 'paid' },
  { date: '2026-04-18', customer: 'Globex Ltd',  amount: '$8,200.00',  status: 'pending' },
  { date: '2026-04-15', customer: 'Initech',     amount: '$3,750.50',  status: 'paid' },
  { date: '2026-04-10', customer: 'Hooli',       amount: '$24,000.00', status: 'overdue' },
  { date: '2026-04-02', customer: 'Stark Inc.',  amount: '$1,895.00',  status: 'draft' },
];

const columns: Column<Invoice>[] = [
  { key: 'date',     header: 'Date' },
  { key: 'customer', header: 'Customer' },
  { key: 'amount',   header: 'Amount', align: 'right' },
  { key: 'status',   header: 'Status', render: r => <StatusTag status={r.status} /> },
];

export default function DataTableShowcase() {
  return (
    <div className="max-w-3xl">
      <DataTable caption="Invoices · 5 rows" columns={columns} rows={rows} />
    </div>
  );
}
