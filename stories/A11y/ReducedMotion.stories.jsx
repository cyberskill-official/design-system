import React from 'react';
import { Button } from '../../components/button/Button.jsx';
import {
  useLiveTokenValues,
  useReducedMotionPref,
  prettyDuration,
  PageTitle,
  Lede,
  SectionTitle,
  Mono,
} from '../lib/live-tokens.jsx';

function DemoTile({ title, note, duration, children }) {
  return (
    <div style={{ background: 'var(--cs-color-surface-panel)', border: '1px solid var(--cs-color-border-default)', borderRadius: 'var(--cs-radius-lg)', padding: 16, display: 'grid', gap: 10, alignContent: 'start' }}>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div className="cs-caption">{note}</div>
      <div className="cs-caption" style={{ fontFamily: 'var(--cs-font-family-mono)' }}>duration in effect: {duration}</div>
      {children}
    </div>
  );
}

function Track({ on, transition }) {
  return (
    <div style={{ position: 'relative', height: 24, borderRadius: 12, background: 'var(--cs-color-surface-raised)' }}>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 3,
          left: on ? 'calc(100% - 21px)' : '3px',
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: 'var(--cs-accent-strong)',
          transition,
        }}
      />
    </div>
  );
}

function ReducedMotionPage() {
  const reduced = useReducedMotionPref();
  const [ref, values] = useLiveTokenValues(['--cs-duration-base', '--cs-ease-standard']);
  const [on, setOn] = React.useState(false);
  const liveDuration = prettyDuration(values['--cs-duration-base'] || '');
  return (
    <div ref={ref} style={{ maxWidth: 920 }}>
      <PageTitle>Reduced motion</PageTitle>
      <Lede>
        Motion is opt-out by construction: durations are tokens, and the tokens themselves
        collapse to 0ms under prefers-reduced-motion — plus a global safety net kills any
        stray animation. Nothing needs to check the preference in JavaScript.
      </Lede>
      <p className="cs-caption" style={{ margin: '0 0 16px' }}>
        Your OS setting right now: {reduced ? 'reduce motion — the token side below is frozen for you, exactly as shipped' : 'full motion — flip “reduce motion” in OS accessibility settings and the left tile freezes with no code change'}.
      </p>

      <SectionTitle>Side by side</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
        <DemoTile
          title="Token-driven (what ships)"
          note="transition uses var(--cs-duration-base) var(--cs-ease-standard); the media query zeroes the duration for reduce-motion users."
          duration={liveDuration + (reduced ? ' (reduced)' : '')}
        >
          <Track on={on} transition="left var(--cs-duration-base) var(--cs-ease-standard)" />
        </DemoTile>
        <DemoTile
          title="Simulated reduce-motion"
          note="the same movement with the duration hard-forced to 0ms — this is what reduce-motion users always experience: state changes land instantly."
          duration="0ms (forced)"
        >
          <Track on={on} transition="left 0ms linear" />
        </DemoTile>
      </div>
      <Button variant="secondary" size="sm" onClick={() => setOn((v) => !v)}>
        {on ? 'Return' : 'Play both'}
      </Button>

      <SectionTitle>How it is enforced</SectionTitle>
      <ul className="cs-body" style={{ maxWidth: '72ch', paddingLeft: 20, display: 'grid', gap: 6 }}>
        <li>
          <Mono>tokens/motion.css</Mono> — all four <Mono>--cs-duration-*</Mono> tokens
          become 0ms inside <Mono>@media (prefers-reduced-motion: reduce)</Mono>.
        </li>
        <li>
          <Mono>base/a11y.css</Mono> — global safety net: every animation/transition is
          collapsed under the same media query, covering hand-written CSS too.
        </li>
        <li>
          Content is never motion-dependent: a transition landing instantly must leave the
          UI fully usable (this page included).
        </li>
      </ul>
    </div>
  );
}

export default {
  title: 'A11y/Reduced motion',
  parameters: {
    docs: {
      description: {
        component:
          'Side-by-side token-driven motion vs the 0ms experience, with the live OS preference read out.',
      },
    },
  },
};

export const SideBySide = {
  name: 'Side by side',
  render: () => <ReducedMotionPage />,
};
