import type { LabelHTMLAttributes, ReactNode } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: ReactNode;
}

export function Label({ required, className = '', children, ...rest }: LabelProps) {
  return (
    <label className={`block text-sm font-semibold text-text mb-1 ${className}`} {...rest}>
      {children}
      {required && <span className="text-danger ml-1" aria-label="required">*</span>}
    </label>
  );
}
