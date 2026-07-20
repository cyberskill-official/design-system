import type { ReactNode } from "react";

/** Input with prefix/suffix addons (text or nodes), a clearable ×, and a
 *  password show/hide reveal. Controlled or uncontrolled. */
export interface InputGroupProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  clearable?: boolean;
  /** Renders a password field with a reveal button. */
  password?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** "en" | "vi" — else resolved from the nearest [lang] ancestor (vi default). */
  lang?: string;
  className?: string;
}
export function InputGroup(props: InputGroupProps): React.ReactElement;
