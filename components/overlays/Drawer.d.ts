import type * as React from "react";
import type { ReactNode } from "react";

/**
 * Slide-in side panel with a scrim (the Status Hub detail-drawer pattern).
 * Escape / scrim-click close. Put Buttons in `actions`. `side="left"` slides
 * from the left.
 */
export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  side?: "right" | "left";
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
export function Drawer(props: DrawerProps): React.ReactElement | null;
