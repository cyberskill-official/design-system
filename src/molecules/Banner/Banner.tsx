import type { HTMLAttributes, ReactNode } from 'react';

export type BannerTone = 'info' | 'success' | 'warning' | 'danger';

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: BannerTone;
  title?: ReactNode;
  children: ReactNode;
  onDismiss?: () => void;
  icon?: ReactNode;
}

const TONE: Record<BannerTone, string> = {
  info:    'bg-info-subtle text-info border-info',
  success: 'bg-success-subtle text-success border-success',
  warning: 'bg-warning-subtle border-warning',
  danger:  'bg-danger-subtle text-danger border-danger',
};

const ICON: Record<BannerTone, string> = {
  info: 'ℹ', success: '✓', warning: '⚠', danger: '✕',
};

export function Banner({ tone = 'info', title, children, onDismiss, icon, className = '', ...rest }: BannerProps) {
  return (
    <div role="status" className={`flex gap-cs2 items-start border-l-4 rounded-md p-cs3 ${TONE[tone]} ${className}`} {...rest}>
      <span aria-hidden className="text-md font-bold">{icon ?? ICON[tone]}</span>
      <div className="flex-1 text-sm">
        {title && <strong className="block mb-0.5">{title}</strong>}
        <span>{children}</span>
      </div>
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Dismiss" className="opacity-60 hover:opacity-100 text-md">×</button>
      )}
    </div>
  );
}
