import type * as React from "react";
import type { ReactNode } from "react";

/**
 * User/entity avatar: image, or auto initials on the Umber ground. Sizes
 * sm/md/lg; `square` for org/app tiles. Compose several in an AvatarGroup.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  /** Full name — used for the image alt + initials fallback. */
  name?: string;
  size?: "sm" | "md" | "lg";
  square?: boolean;
}
export function Avatar(props: AvatarProps): React.ReactElement;

export interface AvatarGroupProps { className?: string; children?: ReactNode; }
export function AvatarGroup(props: AvatarGroupProps): React.ReactElement;
