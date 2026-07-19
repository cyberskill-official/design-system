import type * as React from "react";

/**
 * Page navigation with prev/next arrows and automatic ellipsis for long ranges.
 * Controlled via page / pageCount / onChange.
 */
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  page?: number;
  pageCount?: number;
  onChange?: (page: number) => void;
}

export function Pagination(props: PaginationProps): React.ReactElement;
