import type * as React from "react";

/** Three animated dots in a bubble — shown while Lumi composes a reply. Freezes
 *  under reduced-motion. */
export interface TypingIndicatorProps {
  label?: string;
  className?: string;
}
export function TypingIndicator(props: TypingIndicatorProps): React.ReactElement;
