/**
 * <Button> — React 19 wrapper around <cs-button>.
 *
 * Auto-registers the custom element on first import (client only).
 * Translates React's onClick to the underlying cs-click event.
 *
 * Doctrine refs: part-3a-actions.md (Button spec); RFC 2026-003.
 */

import { type ReactNode, type MouseEventHandler, useEffect, useRef } from 'react';

// Note: the actual import would be `@cyberskill/web-components/button`.
// During Phase 2 Wave 1 the wiki SPA bypasses this wrapper; the wrapper
// is what downstream products consume.
let registered = false;
async function ensureRegistered() {
  if (typeof window === 'undefined' || registered) return;
  if (customElements.get('cs-button')) { registered = true; return; }
  const { CSButton } = await import('@cyberskill/web-components/button');
  customElements.define('cs-button', CSButton);
  registered = true;
}

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'danger-ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  iconLeading,
  iconTrailing,
  className,
}: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ensureRegistered();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !onClick) return;
    const handler = (e: Event) => onClick(e as unknown as React.MouseEvent<HTMLElement>);
    el.addEventListener('cs-click', handler as EventListener);
    return () => el.removeEventListener('cs-click', handler as EventListener);
  }, [onClick]);

  // Use createElement to render the custom element (TS / JSX intrinsic
  // not yet declared globally; downstream consumers add a global d.ts).
  return (
    // @ts-expect-error — custom element; consumers add global JSX types in Phase 2 Wave 2
    <cs-button
      ref={ref}
      variant={variant}
      size={size}
      disabled={disabled || undefined}
      loading={loading || undefined}
      class={className}
    >
      {iconLeading ? <span slot="icon-leading">{iconLeading}</span> : null}
      {children}
      {iconTrailing ? <span slot="icon-trailing">{iconTrailing}</span> : null}
    </cs-button>
  );
}
