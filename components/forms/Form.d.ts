import type { ReactNode } from "react";

/** Semantic form: gathers named-field values (FormData) into onSubmit(values);
 *  renders a bilingual error summary from `errors`. Pair with FormField. */
export interface FormProps {
  onSubmit?: (values: Record<string, unknown>) => void;
  /** name → message; truthy entries render in the summary + on fields. */
  errors?: Record<string, string | undefined>;
  children?: ReactNode;
  lang?: string;
  className?: string;
}
export function Form(props: FormProps): React.ReactElement;

/** Label + control + hint/error line. */
export interface FormFieldProps {
  label: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  children?: ReactNode;
  lang?: string;
  className?: string;
}
export function FormField(props: FormFieldProps): React.ReactElement;
