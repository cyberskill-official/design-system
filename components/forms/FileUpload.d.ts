import type * as React from "react";
import type { ReactNode } from "react";

/** Click-or-drag file dropzone. Calls onFiles with the selected/dropped File[]. */
export interface FileUploadProps {
  title?: ReactNode;
  hint?: ReactNode;
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
  icon?: ReactNode;
  className?: string;
}
export function FileUpload(props: FileUploadProps): React.ReactElement;
