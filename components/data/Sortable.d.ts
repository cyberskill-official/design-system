import type { ReactNode } from "react";

/** Drag-to-reorder list (HTML5 drag and drop). onChange receives the new order. */
export interface SortableItem { key: string; label: ReactNode; }
export interface SortableProps {
  items: SortableItem[];
  onChange?: (items: SortableItem[]) => void;
  className?: string;
}
export function Sortable(props: SortableProps): React.ReactElement;
