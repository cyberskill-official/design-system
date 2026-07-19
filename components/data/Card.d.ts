import type * as React from "react";
import type { ReactNode } from "react";

/**
 * Warm content panel — 14px radius, 1px warm border, soft umber-tinted shadow.
 * Compose with CardHeader / CardBody / CardFooter. `interactive` renders a
 * hoverable button; add `className="cs-surface-standard"` for a glass card.
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  interactive?: boolean;
  flat?: boolean;
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
}
export function Card(props: CardProps): React.ReactElement;

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  subtitle?: ReactNode;
}
export function CardHeader(props: CardHeaderProps): React.ReactElement;
export function CardBody(props: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
export function CardFooter(props: React.HTMLAttributes<HTMLDivElement>): React.ReactElement;
