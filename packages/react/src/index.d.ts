import type * as React from "react";
import type { ReactNode } from "react";

export interface ComponentSpec {
  name: string;
  sequence: string;
  maturity: string;
  anatomy: string[];
  states: string[];
  keyboard: string[];
  tokens: string[];
  a11y: string[];
  localization: string[];
}

export const components: ComponentSpec[];
export function getComponentSpec(name: string): ComponentSpec | null;
export function listComponentsBySequence(sequence: string): ComponentSpec[];

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "danger" | "danger-ghost";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

export interface LogoProps extends React.SVGAttributes<SVGSVGElement> {
  /** Rendered width/height in px. Default 32. */
  size?: number;
  /** Accessible name. Default "CyberSkill". */
  title?: string;
  /** When true, the mark is decorative (aria-hidden, no title). */
  decorative?: boolean;
}

/** CyberSkill brand mark — use whenever a product is for or owned by CyberSkill. */
export const Logo: React.ForwardRefExoticComponent<LogoProps & React.RefAttributes<SVGSVGElement>>;

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
}

export const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;

export interface DialogProps {
  open: boolean;
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  closeLabel?: string;
  className?: string;
  onClose?: () => void;
}

export function Dialog(props: DialogProps): ReactNode;

export interface DataTableColumn<Row> {
  key: string;
  header: ReactNode;
  render?: (row: Row) => ReactNode;
}

export interface DataTableProps<Row extends Record<string, unknown>> {
  caption?: ReactNode;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey?: keyof Row & string;
  emptyState?: ReactNode;
  className?: string;
}

export function DataTable<Row extends Record<string, unknown>>(props: DataTableProps<Row>): ReactNode;

export interface AIDisclosureBadgeProps {
  label?: string;
  details?: ReactNode;
  sources?: string[];
  className?: string;
}

export function AIDisclosureBadge(props: AIDisclosureBadgeProps): ReactNode;

export interface HumanReviewGateProps {
  risk?: ReactNode;
  summary: ReactNode;
  reviewer?: ReactNode;
  approveLabel?: string;
  rejectLabel?: string;
  className?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

export function HumanReviewGate(props: HumanReviewGateProps): ReactNode;
