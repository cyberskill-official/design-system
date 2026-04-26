/**
 * App — wiki SPA shell.
 *
 * Phase 4 Wave 2 refactor (2026-04-27): Header + Sidebar inline JSX extracted
 * into @organisms/AppHeader + @organisms/AppSidebar. Closes A.7 component
 * coverage gap; verified via scripts/check-coverage.mjs.
 */

import { lazy, Suspense, useMemo } from 'react';
import { useHashRoute, navigate } from '@lib/router';
import { SHOWCASES, WIKI } from '@lib/registry';
import { AppHeader } from '@organisms/AppHeader';
import { AppSidebar } from '@organisms/AppSidebar';

const HomeView = lazy(() => import('./views/HomeView'));
const WikiView = lazy(() => import('./views/WikiView'));
const ShowcaseView = lazy(() => import('./views/ShowcaseView'));

export function App() {
  const route = useHashRoute();
  const wiki = useMemo(() => WIKI.find((w) => w.route === route), [route]);
  const show = useMemo(() => SHOWCASES.find((s) => s.route === route), [route]);

  return (
    <div
      className="grid h-screen"
      style={{
        gridTemplateRows: 'var(--cs-shell-header-height) 1fr',
        gridTemplateColumns: 'var(--cs-shell-sidebar-left) 1fr var(--cs-shell-sidebar-right)',
      }}
    >
      <AppHeader />
      <AppSidebar side="left" />
      <main className="overflow-y-auto bg-surface text-text">
        <Suspense fallback={<div className="p-cs10 font-mono text-text-muted">Loading…</div>}>
          {route === 'home' || route === '' ? <HomeView /> : null}
          {wiki ? <WikiView wiki={wiki} /> : null}
          {show ? <ShowcaseView show={show} /> : null}
          {!wiki && !show && route !== 'home' && route !== '' ? <NotFound route={route} /> : null}
        </Suspense>
      </main>
      <AppSidebar side="right" activeShowcase={show ?? null} />
    </div>
  );
}

function NotFound({ route }: { route: string }) {
  return (
    <div className="p-cs6 max-w-3xl mx-auto">
      <h1 className="text-h1 font-extrabold">
        Route not found: <code className="font-mono text-h2 bg-surface-subtle px-2 rounded">{route}</code>
      </h1>
      <p>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            navigate('home');
          }}
          className="underline"
        >
          ← Back to dashboard
        </a>
      </p>
    </div>
  );
}
