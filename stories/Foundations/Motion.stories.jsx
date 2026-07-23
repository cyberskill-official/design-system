import React from 'react';
import { tokens } from '../../tokens/tokens.js';
import {
  useLiveTokenValues,
  useReducedMotionPref,
  prettyDuration,
  TokenTable,
  PageTitle,
  Lede,
  SectionTitle,
  LiveNote,
  Mono,
} from '../lib/live-tokens.jsx';

const DURATION_NAMES = Object.keys(tokens.root.duration);
const EASE_NAMES = Object.keys(tokens.root.ease);
const ALL_NAMES = [...DURATION_NAMES, ...EASE_NAMES];

function MotionPage() {
  const [ref, values] = useLiveTokenValues(ALL_NAMES);
  const reduced = useReducedMotionPref();
  const [away, setAway] = React.useState(false);
  return (
    <div ref={ref} style={{ maxWidth: 920 }}>
      <PageTitle>Motion</PageTitle>
      <Lede>
        Calm and purposeful: short durations, a soft decelerate, small translate/scale and
        fades. No bounce, no flash. Everything collapses to 0 under prefers-reduced-motion.
      </Lede>
      <LiveNote />

      <SectionTitle>Live demo</SectionTitle>
      <p className="cs-caption" style={{ margin: '0 0 10px' }}>
        Each dot transitions with its duration token and the standard easing. The demo
        consumes the tokens directly, so under an OS “reduce motion” setting the durations
        resolve to 0ms and the dots simply jump — the demo respects the preference by
        construction, not by simulation.
      </p>
      <div style={{ padding: 16, background: 'var(--cs-color-surface-panel)', border: '1px solid var(--cs-color-border-default)', borderRadius: 'var(--cs-radius-lg)', display: 'grid', gap: 12 }}>
        <div>
          <button type="button" className="cs-button cs-button--secondary cs-button--sm" onClick={() => setAway((v) => !v)}>
            {away ? 'Return' : 'Play'}
          </button>
          <span className="cs-caption" style={{ marginLeft: 12 }}>
            Your OS setting right now: {reduced ? 'reduce motion (durations resolve to 0ms)' : 'full motion'}
          </span>
        </div>
        {DURATION_NAMES.map((n) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 210, flex: 'none' }}>
              <Mono>{n}</Mono>
              <span className="cs-caption" style={{ display: 'block' }}>{prettyDuration(values[n])}</span>
            </span>
            <span style={{ position: 'relative', flex: 1, height: 20, borderRadius: 10, background: 'var(--cs-color-surface-raised)', overflow: 'hidden' }}>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 2,
                  left: away ? 'calc(100% - 18px)' : '2px',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'var(--cs-accent-strong)',
                  transition: `left var(${n}) var(--cs-ease-standard)`,
                }}
              />
            </span>
          </div>
        ))}
      </div>

      <SectionTitle>Duration tokens</SectionTitle>
      <TokenTable
        rows={DURATION_NAMES.map((n) => ({
          name: n,
          value: prettyDuration(values[n]),
          note: prettyDuration(values[n]) !== values[n] ? `cascade serialization: ${values[n]}` : undefined,
        }))}
      />

      <SectionTitle>Easing tokens</SectionTitle>
      <TokenTable
        rows={EASE_NAMES.map((n) => ({
          name: n,
          value: values[n],
          note: n.includes('standard') ? 'decelerate — most transitions' : n.includes('entrance') ? 'enter' : n.includes('exit') ? 'exit' : undefined,
        }))}
      />

      <SectionTitle>Reduced motion</SectionTitle>
      <ul className="cs-body" style={{ maxWidth: '72ch', paddingLeft: 20, display: 'grid', gap: 6 }}>
        <li>
          tokens/motion.css zeroes all four duration tokens inside
          {' '}<Mono>@media (prefers-reduced-motion: reduce)</Mono>.
        </li>
        <li>
          base/a11y.css additionally collapses every animation/transition globally as a
          safety net, so even hand-written CSS calms down at once.
        </li>
        <li>See A11y/Reduced motion for a side-by-side behaviour story.</li>
      </ul>
    </div>
  );
}

export default {
  title: 'Foundations/Motion',
  parameters: {
    docs: {
      description: {
        component: 'Duration and easing tokens with a live demo that inherits prefers-reduced-motion through the tokens themselves.',
      },
    },
  },
};

export const DurationsAndEasing = {
  name: 'Durations & easing',
  render: () => <MotionPage />,
};
