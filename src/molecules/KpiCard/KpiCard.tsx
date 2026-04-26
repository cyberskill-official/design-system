import type { ReactNode } from 'react';
import { Card } from '@molecules/Card';

export interface KpiCardProps {
  label: ReactNode;
  value: ReactNode;
  trend?: { direction: 'up' | 'down' | 'flat'; label: string; tone?: 'success' | 'danger' | 'muted' };
  accent?: boolean;
}

export function KpiCard({ label, value, trend, accent }: KpiCardProps) {
  const trendColour = trend?.tone === 'success' ? 'text-success'
    : trend?.tone === 'danger' ? 'text-danger'
    : 'text-text-muted';
  const arrow = trend?.direction === 'up' ? '↑' : trend?.direction === 'down' ? '↓' : '→';
  return (
    <Card variant={accent ? 'accent' : 'default'}>
      <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{label}</div>
      <div className="text-[28px] font-extrabold leading-none mt-1" style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      {trend && (
        <div className={`font-mono text-xs mt-1 ${trendColour}`}>
          {arrow} {trend.label}
        </div>
      )}
    </Card>
  );
}
