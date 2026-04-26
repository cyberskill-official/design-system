/**
 * AppSidebar — left or right rail of the wiki SPA.
 *
 * Extracted from App.tsx in Phase 4 Wave 2 (component substitution per
 * first-product-migration-plan.md sub-phase A3). Left rail = Wiki nav;
 * right rail = Showcases nav (with active-showcase callout).
 */

import { useHashRoute, navigate } from '@lib/router';
import { ATOMIC, CLUSTERS, SHOWCASES, WIKI, type ShowcaseEntry } from '@lib/registry';

export interface AppSidebarProps {
  side: 'left' | 'right';
  activeShowcase?: ShowcaseEntry | null;
  className?: string;
}

export function AppSidebar({ side, activeShowcase = null, className = '' }: AppSidebarProps) {
  return (
    <nav
      className={`bg-surface-subtle overflow-y-auto pt-cs3 px-cs2 pb-cs6 ${
        side === 'left' ? 'border-r' : 'border-l'
      } border-border-subtle ${className}`}
      aria-label={side === 'left' ? 'Wiki navigation' : 'Showcases navigation'}
    >
      {side === 'left' ? <WikiNav /> : <ShowcasesNav active={activeShowcase} />}
    </nav>
  );
}

// ─── Internal — wiki navigation ────────────────────────────────────────

function WikiNav() {
  return (
    <>
      <SbHead title="Wiki" glyph="W" count={WIKI.length} />
      <NavCluster letter="★" name="Pinned" />
      {WIKI.filter((w) => w.cluster === '★').map((w) => (
        <NavLink key={w.route} route={w.route} title={w.title} num="00" />
      ))}
      {CLUSTERS.map((c) => {
        const items = WIKI.filter((w) => w.cluster === c.letter);
        if (!items.length) return null;
        return (
          <div key={c.letter}>
            <NavCluster letter={c.letter} name={c.name} />
            {items.map((w) => (
              <NavLink
                key={w.route}
                route={w.route}
                title={w.title.replace(/^Part\s+\w+\s*—\s*/, '')}
                num={w.refs.replace('Part ', '')}
              />
            ))}
          </div>
        );
      })}
    </>
  );
}

// ─── Internal — showcases navigation ───────────────────────────────────

function ShowcasesNav({ active }: { active: ShowcaseEntry | null }) {
  const wikiCite = active ? WIKI.find((w) => w.route === active.cite.route) : null;
  return (
    <>
      <SbHead title="Showcases" glyph="S" count={SHOWCASES.length} />
      {active && (
        <div className="bg-surface-raised border border-accent rounded-md p-cs3 mb-cs3 mx-cs2">
          <div className="font-mono text-micro uppercase tracking-wider text-accent mb-1">Now viewing</div>
          <div className="font-bold text-sm mb-1">{active.title}</div>
          <div className="text-text-muted text-xs leading-snug">{active.desc}</div>
          <a
            href={`#${active.cite.route}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(active.cite.route);
            }}
            className="block mt-cs2 bg-accent-subtle text-center font-mono text-small font-bold py-1 px-2 rounded no-underline"
            style={{ color: 'var(--cs-umber)' }}
          >
            📘 {wikiCite ? 'Read: ' + wikiCite.title : active.cite.label}
          </a>
        </div>
      )}
      {ATOMIC.map((level) => {
        const items = SHOWCASES.filter((s) => s.level === level.id);
        if (!items.length) return null;
        return (
          <div key={level.id}>
            <SbLevel glyph={level.glyph} name={level.name} count={items.length} />
            {items.map((s) => (
              <NavLinkSub key={s.route} route={s.route} title={s.title} />
            ))}
          </div>
        );
      })}
    </>
  );
}

// ─── Internal — primitive nav rows ─────────────────────────────────────

function SbHead({ title, glyph, count }: { title: string; glyph: string; count: number }) {
  return (
    <div className="flex justify-between items-center py-cs2 px-cs3 mb-cs2 border-b border-border">
      <span className="font-mono text-small font-bold tracking-wider uppercase" style={{ color: 'var(--cs-umber)' }}>
        <span
          className="inline-block w-[18px] h-[18px] mr-1 align-[-3px] bg-accent rounded-sm text-center text-micro leading-[18px] font-extrabold"
          style={{ color: 'var(--cs-umber)' }}
        >
          {glyph}
        </span>
        {title}
      </span>
      <span
        className="bg-accent-subtle font-mono text-micro font-bold px-1.5 py-px rounded-full"
        style={{ color: 'var(--cs-umber)' }}
      >
        {count}
      </span>
    </div>
  );
}

function SbLevel({ glyph, name, count }: { glyph: string; name: string; count: number }) {
  return (
    <div
      className="flex items-center gap-1.5 px-cs3 pt-cs3 pb-1 mt-cs2 font-mono text-small font-extrabold uppercase tracking-wider border-t border-border-subtle first:border-0 first:mt-0"
      style={{ color: 'var(--cs-umber)' }}
    >
      <span
        className="inline-flex items-center justify-center w-5 h-5 bg-accent rounded-sm text-small font-extrabold"
        style={{ color: 'var(--cs-umber)' }}
      >
        {glyph}
      </span>
      {name}
      <span className="ml-auto bg-accent-subtle px-1.5 py-px rounded-full text-micro" style={{ color: 'var(--cs-umber)' }}>
        {count}
      </span>
    </div>
  );
}

function NavCluster({ letter, name }: { letter: string; name: string }) {
  return (
    <div className="flex items-center gap-1.5 px-cs3 pt-cs3 pb-1 font-mono text-micro font-bold uppercase tracking-wider text-text-muted">
      <span
        className="inline-block w-4 h-4 bg-accent rounded-sm text-center text-micro leading-4 font-extrabold"
        style={{ color: 'var(--cs-umber)' }}
      >
        {letter}
      </span>
      {name}
    </div>
  );
}

function NavLink({ route, title, num }: { route: string; title: string; num?: string }) {
  const active = useHashRoute() === route;
  return (
    <a
      href={`#${route}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(route);
      }}
      className={`flex items-center gap-cs2 px-cs3 py-[5px] my-px text-sm rounded-sm border-l-2 leading-snug
        ${active ? 'bg-accent-subtle font-semibold border-accent' : 'border-transparent hover:bg-surface-raised'}`}
      style={active ? { color: 'var(--cs-umber)' } : undefined}
    >
      <span
        className={`font-mono text-micro min-w-[32px] shrink-0 ${
          active ? 'font-bold text-accent' : 'text-text-muted'
        }`}
      >
        {num}
      </span>
      <span className="flex-1">{title}</span>
    </a>
  );
}

function NavLinkSub({ route, title }: { route: string; title: string }) {
  const active = useHashRoute() === route;
  return (
    <a
      href={`#${route}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(route);
      }}
      className={`flex items-center gap-cs2 pl-cs5 pr-cs3 py-[5px] my-px text-xs rounded-sm border-l-2 leading-snug
        ${active ? 'bg-accent-subtle font-semibold border-accent' : 'border-transparent hover:bg-surface-raised'}`}
      style={active ? { color: 'var(--cs-umber)' } : undefined}
    >
      <span className={`shrink-0 ${active ? 'text-accent' : 'text-text-muted'}`}>{active ? '▸' : '·'}</span>
      <span className="flex-1">{title}</span>
    </a>
  );
}
