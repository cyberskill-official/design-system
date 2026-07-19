import type * as React from "react";
import type { ReactNode } from "react";

export interface Citation { title: ReactNode; source?: ReactNode; href?: string; }

/** Numbered provenance list for AI output — pairs with AIDisclosureBadge to show
 *  what a response was grounded in. Rows link out when href is set. */
export interface CitationListProps {
  label?: ReactNode;
  items: Citation[];
  className?: string;
}
export function CitationList(props: CitationListProps): React.ReactElement;
