import type * as React from "react";
import type { ReactNode } from "react";

export interface DescriptionItem { term: ReactNode; value: ReactNode; }

/** Responsive term/value metadata grid (the detail-drawer meta pattern). */
export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[];
}
export function DescriptionList(props: DescriptionListProps): React.ReactElement;
