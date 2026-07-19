import type * as React from "react";

/**
 * Determinate progress bar. Ochre fill by default; umber/success variants.
 * Always pass a `label` for assistive tech.
 */
export interface ProgressBarProps {
  value?: number;
  max?: number;
  variant?: "ochre" | "umber" | "success";
  label?: string;
  className?: string;
}

export function ProgressBar(props: ProgressBarProps): React.ReactElement;
