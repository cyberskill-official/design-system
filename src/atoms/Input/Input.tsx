import { forwardRef, type InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: InputSize;
  invalid?: boolean;
}

const SIZE: Record<InputSize, string> = {
  sm: 'h-7 px-cs2 text-xs',
  md: 'h-9 px-cs3 text-sm',
  lg: 'h-11 px-cs4 text-md',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { inputSize = 'md', invalid, className = '', ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={`w-full bg-surface-raised border rounded-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre focus-visible:border-ochre
        disabled:opacity-60 disabled:cursor-not-allowed
        ${invalid ? 'border-danger' : 'border-border'} ${SIZE[inputSize]} ${className}`}
      {...rest}
    />
  );
});
