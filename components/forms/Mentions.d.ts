/** Textarea with @user suggestions (typeahead on the trailing "@word"). */
export interface MentionsProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Usernames offered after "@". */
  users: string[];
  placeholder?: string;
  rows?: number;
  lang?: string;
  className?: string;
}
export function Mentions(props: MentionsProps): React.ReactElement;
