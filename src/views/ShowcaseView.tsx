import { lazy, Suspense, useMemo, type ComponentType } from 'react';
import { ATOMIC, type ShowcaseEntry } from '@lib/registry';
import { navigate } from '@lib/router';

export default function ShowcaseView({ show }: { show: ShowcaseEntry }) {
  const level = ATOMIC.find(l => l.id === show.level);

  // Lazy-load the component module. Each showcase exports either { default }
  // or a named { Showcase } component.
  const LazyComp = useMemo(
    () =>
      lazy(async () => {
        const mod = (await show.load()) as any;
        const C: ComponentType<any> = mod.default ?? mod.Showcase;
        return { default: C };
      }),
    [show.route],
  );

  return (
    <div className="flex flex-col h-full bg-surface-subtle">
      <div className="flex items-center gap-cs3 py-cs2 px-cs4 bg-surface-raised border-b border-border text-xs flex-wrap">
        <span className="inline-flex items-center gap-1 bg-accent rounded-full py-0.5 px-2.5 font-mono font-bold text-small tracking-wider uppercase" style={{ color: 'var(--cs-umber)' }}>
          {level ? `${level.glyph} ${level.name}` : show.level} / <strong className="ml-1">{show.title}</strong>
        </span>
        <span className="font-mono text-text-muted">
          <code>src/{show.level === 'atom' ? 'atoms' : show.level + 's'}/…</code>
        </span>
        <a href={`#${show.cite.route}`} onClick={e => { e.preventDefault(); navigate(show.cite.route); }}
          className="ml-auto bg-accent-subtle py-0.5 px-3 rounded-sm no-underline font-bold text-xs font-mono" style={{ color: 'var(--cs-umber)' }}>
          📘 {show.cite.label} →
        </a>
      </div>

      <div className="flex-1 overflow-y-auto p-cs6 bg-white">
        <Suspense fallback={<div className="font-mono text-text-muted p-cs6">Loading {show.title}…</div>}>
          <LazyComp />
        </Suspense>
      </div>
    </div>
  );
}
