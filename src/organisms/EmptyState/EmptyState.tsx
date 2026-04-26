import type { ReactNode } from 'react';
import { Button } from '@atoms/Button';

export interface EmptyStateProps {
  illustration?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  primaryCta?: { label: string; onClick?: () => void };
  secondaryCta?: { label: string; onClick?: () => void };
}

export function EmptyState({ illustration, title, description, primaryCta, secondaryCta }: EmptyStateProps) {
  return (
    <div className="text-center p-cs12">
      {illustration && <div className="mx-auto mb-cs4 max-w-32">{illustration}</div>}
      <h2 className="mb-cs2 font-bold text-h2">{title}</h2>
      {description && <p className="text-text-muted max-w-sm mx-auto mb-cs4">{description}</p>}
      {(primaryCta || secondaryCta) && (
        <div className="flex justify-center gap-cs2">
          {primaryCta && <Button variant="accent" size="lg" onClick={primaryCta.onClick}>{primaryCta.label}</Button>}
          {secondaryCta && <Button variant="secondary" size="lg" onClick={secondaryCta.onClick}>{secondaryCta.label}</Button>}
        </div>
      )}
    </div>
  );
}
