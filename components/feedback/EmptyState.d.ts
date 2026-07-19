import type * as React from "react";
import type { ReactNode } from "react";

/** Friendly placeholder for empty or zero-result views: icon, title, message,
 *  and optional actions (compose Buttons). */
export interface EmptyStateProps {
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
export function EmptyState(props: EmptyStateProps): React.ReactElement;
