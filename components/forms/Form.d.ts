import type { ReactNode } from "react";

/** One validation rule: "required" (bilingual default message) or fn(value, values) → message | null. */
export type FormRule = "required" | ((value: unknown, values: Record<string, unknown>) => string | null | undefined);

/** Semantic form + optional controller. Plain mode: named native fields collected via
 *  FormData into onSubmit(values); `errors` renders the bilingual summary. Controller mode:
 *  `rules` validate on submit (blocking until clean); FormField children with `name`
 *  auto-wire value/onChange + per-field errors via context. */
export interface FormProps {
  onSubmit?: (values: Record<string, unknown>) => void;
  /** External errors (name → message); merged over rule errors in summary + fields. */
  errors?: Record<string, string | undefined>;
  /** name → rule or rule[]; validated on submit. */
  rules?: Record<string, FormRule | FormRule[]>;
  /** Seed for controller-registered fields. */
  initialValues?: Record<string, unknown>;
  children?: ReactNode;
  lang?: string;
  className?: string;
}
export function Form(props: FormProps): React.ReactElement;

/** Label + control + hint/error line. With `name` inside a Form, registers with the
 *  controller: single element child cloned with value/onChange (valueProp="checked"
 *  for checkbox-shaped children); context error auto-shows (explicit `error` wins). */
export interface FormFieldProps {
  label: ReactNode;
  /** Register with the surrounding Form controller under this key. */
  name?: string;
  required?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  /** Prop carrying the value on the child ("value" default; "checked" for Checkbox/Switch/Toggle). */
  valueProp?: "value" | "checked";
  children?: ReactNode;
  lang?: string;
  className?: string;
}
export function FormField(props: FormFieldProps): React.ReactElement;
