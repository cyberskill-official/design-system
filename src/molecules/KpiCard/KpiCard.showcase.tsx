import { KpiCard } from './KpiCard';

export default function KpiShowcase() {
  return (
    <div className="grid gap-cs3 max-w-3xl" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
      <KpiCard label="MRR" value="$48,200" trend={{ direction: 'up', label: '12.4% vs LM', tone: 'success' }} accent />
      <KpiCard label="Active users" value="1,284" trend={{ direction: 'up', label: '4.1%', tone: 'success' }} />
      <KpiCard label="NPS" value="62" trend={{ direction: 'flat', label: 'no change', tone: 'muted' }} />
      <KpiCard label="Churn" value="3.4%" trend={{ direction: 'up', label: '0.6%', tone: 'danger' }} />
    </div>
  );
}
