import type { ReactNode } from 'react';
import { Tag, type TagTone } from '@atoms/Tag';

export interface Column<T> {
  key: keyof T & string;
  header: ReactNode;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  caption?: ReactNode;
}

export function DataTable<T extends Record<string, any>>({ columns, rows, caption }: DataTableProps<T>) {
  return (
    <div className="bg-surface-raised border border-border-subtle rounded-lg overflow-x-auto">
      {caption && <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted py-cs2 px-cs3 border-b border-border-subtle">{caption}</div>}
      <table className="w-full border-collapse text-sm" style={{ fontVariantNumeric: 'tabular-nums' }}>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key} className={`text-${c.align ?? 'left'} bg-surface-subtle font-mono text-xs uppercase tracking-wider text-text-muted py-cs2 px-cs3 border-b-2 border-border`}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-surface-subtle">
              {columns.map(c => (
                <td key={c.key} className={`text-${c.align ?? 'left'} py-cs2 px-cs3 border-b border-border-subtle`}>
                  {c.render ? c.render(row) : (row[c.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatusTag({ status }: { status: 'paid' | 'pending' | 'overdue' | 'draft' }) {
  const map: Record<string, { tone: TagTone; label: string }> = {
    paid:    { tone: 'success', label: 'Paid' },
    pending: { tone: 'warning', label: 'Pending' },
    overdue: { tone: 'danger',  label: 'Overdue' },
    draft:   { tone: 'default', label: 'Draft' },
  };
  const m = map[status];
  return <Tag tone={m.tone}>{m.label}</Tag>;
}
