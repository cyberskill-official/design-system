import type { ReactNode } from "react";

/** In-page table of contents with scrollspy: highlights the section currently in
 *  view (IntersectionObserver; ochre rail marker). */
export interface AnchorItem { id: string; label: ReactNode; }
export interface AnchorProps {
  items: AnchorItem[];
  title?: ReactNode;
  className?: string;
}
export function Anchor(props: AnchorProps): React.ReactElement;
