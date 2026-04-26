import { Avatar } from '@atoms/Avatar';
import { Button } from '@atoms/Button';
import { Tag } from '@atoms/Tag';

export default function HealthcarePatientShowcase() {
  return (
    <div className="max-w-5xl space-y-cs5">
      {/* Patient bar — sticky in real product */}
      <div className="bg-surface-raised border-2 border-umber rounded-lg p-cs4 grid items-center gap-cs5" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
        <Avatar size="xl" initials="NT" />
        <div>
          <h2 className="font-bold m-0">Nguyễn Thị Hương <span className="font-normal text-sm text-text-muted">· Female · DOB 1958-06-14 (67y)</span></h2>
          <div className="font-mono text-text-muted text-xs">MRN: 003-94821 · Bed 4B · Adm: 2026-04-23 · LOS: 3 days</div>
          <div className="flex gap-cs2 mt-cs2 flex-wrap">
            <Tag tone="danger">⚠ Penicillin allergy</Tag>
            <Tag tone="info">DNR on file</Tag>
            <Tag tone="warning">Fall risk</Tag>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-xs uppercase text-text-muted">Attending</div>
          <div className="font-bold">Dr. Lê M. Tuấn</div>
          <Button variant="secondary" size="sm" className="mt-1">Page</Button>
        </div>
      </div>

      <h2 className="font-bold text-h2 m-0">Latest vitals <span className="font-normal text-text-muted text-sm font-mono">recorded 11 min ago</span></h2>
      <div className="grid gap-cs3 grid-cols-4">
        <Vital label="Blood pressure" value="128/82" unit="mmHg · normal" />
        <Vital label="Heart rate" value="112" unit="bpm · ↑ above range" warn />
        <Vital label="Temperature" value="37.4" unit="°C · low-grade" />
        <Vital label="SpO₂" value="96" unit="% · room air" />
      </div>

      <h2 className="font-bold text-h2 m-0">Active orders</h2>
      <div className="bg-surface-raised border border-border-subtle rounded-md p-cs4">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b border-border-subtle">{['Order','Dose','Schedule'].map(h => <th key={h} className="text-left p-cs2">{h}</th>)}</tr></thead>
          <tbody>
            <tr className="border-b border-border-subtle"><td className="p-cs2">Amoxicillin <Tag tone="danger" className="text-[10px]">⚠ allergen-adjacent</Tag></td><td className="p-cs2">—</td><td className="p-cs2 font-bold text-danger">DO NOT GIVE</td></tr>
            <tr className="border-b border-border-subtle"><td className="p-cs2">Azithromycin (substituted)</td><td className="p-cs2">500mg PO</td><td className="p-cs2">q24h × 5 days</td></tr>
            <tr className="border-b border-border-subtle"><td className="p-cs2">Saline IV</td><td className="p-cs2">0.9% 1L</td><td className="p-cs2">Continuous</td></tr>
            <tr><td className="p-cs2">Paracetamol PRN</td><td className="p-cs2">500mg</td><td className="p-cs2">q6h max</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Vital({ label, value, unit, warn }: { label: string; value: string; unit: string; warn?: boolean }) {
  return (
    <div className={`bg-surface-raised border rounded-md p-cs3 ${warn ? 'border-warning bg-warning-subtle/30' : 'border-border-subtle'}`}>
      <div className="font-mono text-xs uppercase text-text-muted">{label}</div>
      <div className="text-2xl font-extrabold my-1" style={{ color: warn ? '#7A5A05' : 'var(--cs-umber)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div className="text-xs text-text-muted">{unit}</div>
    </div>
  );
}
