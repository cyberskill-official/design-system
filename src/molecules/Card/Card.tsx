import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'accent' | 'inset' | 'elevated';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

const VARIANT: Record<CardVariant, string> = {
  default:  'bg-surface-raised border border-border-subtle',
  accent:   'bg-surface-raised border-2 border-ochre',
  inset:    'bg-surface-subtle border border-dashed border-border',
  elevated: 'bg-surface-raised border border-border-subtle shadow-cs-md',
};

export function Card({ variant = 'default', className = '', children, ...rest }: CardProps) {
  return (
    <div className={`rounded-lg p-cs4 ${VARIANT[variant]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
