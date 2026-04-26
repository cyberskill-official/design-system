import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary:   'bg-umber text-warm border-umber hover:bg-umber-dark',
  secondary: 'bg-surface-raised text-text border-border hover:bg-surface-subtle',
  tertiary:  'bg-transparent text-text border-transparent hover:bg-surface-subtle',
  accent:    'bg-ochre text-umber border-ochre font-bold hover:bg-ochre-dark',
  danger:    'bg-danger text-warm border-danger hover:opacity-90',
  ghost:     'bg-transparent text-text-muted border-transparent hover:bg-surface-subtle hover:text-text',
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-7 px-cs3 text-xs gap-1.5',
  md: 'h-9 px-cs4 text-sm gap-cs2',
  lg: 'h-11 px-cs5 text-md gap-cs2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', iconLeft, iconRight, loading, fullWidth, className = '', children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center border rounded-md font-semibold cursor-pointer
        transition-colors duration-150 ease-cs no-underline whitespace-nowrap
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre focus-visible:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANT[variant]} ${SIZE[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner /> : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
});

function Spinner() {
  return (
    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
