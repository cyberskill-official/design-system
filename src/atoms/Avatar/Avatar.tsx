import type { HTMLAttributes } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  /** Initials displayed when no src */
  initials?: string;
  src?: string;
  alt?: string;
}

const SIZE: Record<AvatarSize, string> = {
  sm: 'h-6 w-6 text-[10px]',
  md: 'h-9 w-9 text-xs',
  lg: 'h-12 w-12 text-sm',
  xl: 'h-16 w-16 text-md',
};

export function Avatar({ size = 'md', initials = '?', src, alt = '', className = '', ...rest }: AvatarProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-bold text-warm bg-umber overflow-hidden shrink-0 ${SIZE[size]} ${className}`}
      style={{ background: 'linear-gradient(135deg, var(--cs-umber), var(--cs-umber-light))' }}
      role="img"
      aria-label={alt || `Avatar — ${initials}`}
      {...rest}
    >
      {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : initials}
    </div>
  );
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  more?: number;
}
export function AvatarGroup({ children, max = 4, more }: AvatarGroupProps) {
  const arr = Array.isArray(children) ? children : [children];
  const visible = arr.slice(0, max);
  const overflow = more ?? Math.max(0, arr.length - max);
  return (
    <div className="inline-flex">
      {visible.map((child, i) => (
        <div key={i} className={i === 0 ? '' : '-ml-2'} style={{ boxShadow: '0 0 0 2px var(--cs-color-surface-default)' }}>
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div className="-ml-2 inline-flex items-center justify-center rounded-full h-9 w-9 text-xs font-bold bg-surface-subtle text-text-muted" style={{ boxShadow: '0 0 0 2px var(--cs-color-surface-default)' }}>
          +{overflow}
        </div>
      )}
    </div>
  );
}
