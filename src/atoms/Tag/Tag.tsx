import type { HTMLAttributes, ReactNode } from 'react';

export type TagTone = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
  children: ReactNode;
}

const TONE: Record<TagTone, string> = {
  default: 'bg-surface-subtle text-text border-border-subtle',
  accent:  'bg-accent-subtle text-umber border-ochre',
  success: 'bg-success-subtle text-success border-success/40',
  warning: 'bg-warning-subtle text-warning border-warning/40',
  danger:  'bg-danger-subtle text-danger border-danger/40',
  info:    'bg-info-subtle text-info border-info/40',
};

export function Tag({ tone = 'default', className = '', children, ...rest }: TagProps) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold py-0.5 px-2 rounded-full border ${TONE[tone]} ${className}`} {...rest}>
      {children}
    </span>
  );
}
