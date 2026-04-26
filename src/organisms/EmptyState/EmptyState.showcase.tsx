import { EmptyState } from './EmptyState';

export default function EmptyStateShowcase() {
  return (
    <div className="max-w-2xl border border-border rounded-lg overflow-hidden bg-surface-raised">
      <div className="bg-surface-subtle py-cs2 px-cs3 border-b border-border-subtle font-mono text-[11px] text-text-muted">
        Section: Invoices · No data yet
      </div>
      <EmptyState
        illustration={
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="#FBE5A6" opacity={0.5} />
            <rect x="35" y="40" width="50" height="60" rx="4" fill="#FFFFFF" stroke="#45210E" strokeWidth={2} />
            <line x1="42" y1="55" x2="78" y2="55" stroke="#8B7355" strokeWidth={2} />
            <line x1="42" y1="65" x2="68" y2="65" stroke="#8B7355" strokeWidth={2} />
            <line x1="42" y1="75" x2="78" y2="75" stroke="#8B7355" strokeWidth={2} />
            <circle cx="85" cy="35" r="14" fill="#F4BA17" stroke="#45210E" strokeWidth={2} />
            <text x="85" y="40" textAnchor="middle" fontSize={16} fontWeight={800} fill="#45210E">+</text>
          </svg>
        }
        title="No invoices yet"
        description="Create your first invoice to track payments. We'll auto-import from Stripe / PayPal once you connect them."
        primaryCta={{ label: '+ Create your first invoice' }}
        secondaryCta={{ label: 'Read the docs' }}
      />
    </div>
  );
}
