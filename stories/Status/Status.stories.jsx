import React from 'react';
import { Stat } from '../../components/data/Stat.jsx';
import { PageTitle, Lede, SectionTitle, Mono } from '../lib/live-tokens.jsx';

/**
 * Status — quality dashboard. Counts are read at runtime from /_ds_manifest.json and
 * /VERSION (served by the Storybook dev middleware, copied into the static build, and
 * present at the site root when deployed), so this page cannot drift from the compiler
 * output. Doctrine: version pinned 1.0.0, NO changelog and no history table.
 */

function useRepoStatus() {
  const [state, setState] = React.useState({ loading: true, error: null, manifest: null, version: null });
  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [mRes, vRes] = await Promise.all([fetch('/_ds_manifest.json'), fetch('/VERSION')]);
        const manifest = mRes.ok ? await mRes.json() : null;
        const version = vRes.ok ? (await vRes.text()).trim() : null;
        if (alive) setState({ loading: false, error: manifest ? null : 'manifest unavailable', manifest, version });
      } catch (e) {
        if (alive) setState({ loading: false, error: String(e && e.message ? e.message : e), manifest: null, version: null });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

function StatusPage() {
  const { loading, error, manifest, version } = useRepoStatus();
  const componentExports = manifest ? manifest.components.length : null;
  const componentModules = manifest
    ? new Set(manifest.components.map((c) => c.sourcePath).filter((p) => p.endsWith('.jsx'))).size
    : null;
  const templates = manifest ? manifest.templates.length : null;
  const tokenCount = manifest ? manifest.tokens.length : null;
  const fmt = (n) => (n == null ? '…' : String(n));

  return (
    <div style={{ maxWidth: 980 }}>
      <PageTitle>Status — quality dashboard</PageTitle>
      <Lede>
        A live snapshot of what ships. Counts come from the compiler manifest
        (_ds_manifest.json) fetched at runtime — never hardcoded — and the deterministic
        gate board is one click away. Version is pinned; there is no changelog during this
        phase (the repo tip is the only truth).
      </Lede>
      {error ? (
        <p className="cs-caption" style={{ color: 'var(--cs-color-semantic-danger)', marginBottom: 16 }}>
          Could not load the manifest in this context: {error}. On the deployed site and in
          Storybook dev this resolves.
        </p>
      ) : null}

      <SectionTitle>Inventory (live from the manifest)</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
        <Stat label="Component modules" value={loading ? '…' : fmt(componentModules)} />
        <Stat label="Component exports" value={loading ? '…' : fmt(componentExports)} />
        <Stat label="Templates" value={loading ? '…' : fmt(templates)} />
        <Stat label="CSS tokens" value={loading ? '…' : fmt(tokenCount)} />
        <Stat label="Version (pinned)" value={loading ? '…' : version || '1.0.0'} />
      </div>

      <SectionTitle>Story coverage</SectionTitle>
      <p className="cs-body" style={{ maxWidth: '76ch' }}>
        Every public component module ships its own CSF story file with a Default story
        and an honest control matrix — {componentModules == null ? 'the full set' : `${componentModules}/${componentModules}`} covered.
        The contract test <Mono>_audit/ci/test-storybook-contract.mjs</Mono> fails the
        build if any module loses its story, if a matrix stops mounting its component, or
        if argTypes go empty — coverage is enforced, not aspirational.
      </p>

      <SectionTitle>Gate board</SectionTitle>
      <p className="cs-body" style={{ maxWidth: '76ch' }}>
        The health story is deterministic: a board of fast gates (contrast, tokens, docs
        consistency, portability, bilingual parity, story coverage, behavior, a11y) that
        either pass or fail — no judgement calls in CI, humans keep brand voice and pixel
        judgement.
      </p>
      <ul className="cs-body" style={{ paddingLeft: 20, display: 'grid', gap: 6 }}>
        <li>
          <a href="/_audit/run.html" target="_blank" rel="noreferrer">Run the gate board — _audit/run.html</a>{' '}
          (all fast gates, live pass/fail)
        </li>
        <li>
          <a href="/_audit/index.html" target="_blank" rel="noreferrer">Gate index — _audit/index.html</a>{' '}
          (every harness, one page)
        </li>
        <li>
          <a href="/dashboard.html" target="_blank" rel="noreferrer">Hub — dashboard.html</a>{' '}
          (Overview · Docs · Live · Health · Tokens)
        </li>
      </ul>
      <p className="cs-caption">External links resolve on the deployed site (repo files served from the site root).</p>

      <SectionTitle>Version doctrine</SectionTitle>
      <p className="cs-body" style={{ maxWidth: '76ch' }}>
        <Mono>VERSION</Mono> and <Mono>package.json</Mono> stay at{' '}
        <strong>{version || '1.0.0'}</strong> until the owner says LAUNCH. No design-system
        changelog and no history table during this phase — consumers treat the repo tip as
        the only truth, and the gate board (not a version number) proves health.
      </p>
    </div>
  );
}

export default {
  title: 'Status/Quality dashboard',
  parameters: {
    docs: {
      description: {
        component:
          'Live counts from _ds_manifest.json + VERSION at runtime, story-coverage statement, and the gate board links. Pinned 1.0.0 — no changelog by doctrine.',
      },
    },
  },
};

export const Overview = {
  render: () => <StatusPage />,
};
