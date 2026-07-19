import type * as React from "react";

/** Numeric stepper with −/+ buttons, keyboard entry, and min/max clamping.
 *  Controlled via value/onChange or uncontrolled. */
export interface NumberFieldProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}
export function NumberField(props: NumberFieldProps): React.ReactElement;
