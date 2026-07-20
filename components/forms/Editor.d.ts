/** Light rich-text editor (contentEditable): bold · italic · bullet list.
 *  onChange receives HTML. Bilingual toolbar labels. */
export interface EditorProps {
  /** Initial HTML. */
  defaultValue?: string;
  onChange?: (html: string) => void;
  /** px. Default 120. */
  minHeight?: number;
  lang?: string;
  className?: string;
}
export function Editor(props: EditorProps): React.ReactElement;
