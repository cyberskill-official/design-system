import { useId, type ReactNode } from 'react';
import { Label } from '@atoms/Label';
import { Input, type InputProps } from '@atoms/Input';

export interface FieldProps extends Omit<InputProps, 'id'> {
  label: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

/**
 * Canonical form-field molecule = Label + Input + helper / error.
 * Composes the Label + Input atoms; demonstrates real atomic composition.
 */
export function Field({ label, helper, error, required, ...inputProps }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const describedBy = error ? errorId : helper ? helperId : undefined;
  return (
    <div className="flex flex-col">
      <Label htmlFor={id} required={required}>{label}</Label>
      <Input id={id} invalid={!!error} aria-describedby={describedBy} {...inputProps} />
      {error && <span id={errorId} className="text-xs text-danger mt-1" role="alert">{error}</span>}
      {!error && helper && <span id={helperId} className="text-xs text-text-muted mt-1">{helper}</span>}
    </div>
  );
}
