import React from 'react';
import { tokens } from '../../tokens/tokens.js';
import {
  useLiveTokenValues,
  TokenTable,
  PageTitle,
  Lede,
  SectionTitle,
  LiveNote,
} from '../lib/live-tokens.jsx';

const SPACE_NAMES = Object.keys(tokens.root.space);
const RADIUS_NAMES = Object.keys(tokens.root.radius);
const BREAKPOINT_NAMES = Object.keys(tokens.root.breakpoint);
const CONTAINER_NAMES = Object.keys(tokens.root.container);

const ALL_NAMES = [...SPACE_NAMES, ...RADIUS_NAMES, ...BREAKPOINT_NAMES, ...CONTAINER_NAMES];

const px = (v) => parseFloat(String(v)) || 0;

function SpacingPage() {
  const [ref, values] = useLiveTokenValues(ALL_NAMES);
  return (
    <div ref={ref} style={{ maxWidth: 920 }}>
      <PageTitle>Spacing</PageTitle>
      <Lede>
        A 4px base grid. Section padding lives between 64 and 96px; content max-width is
        the container token. Generous, calm whitespace is part of the voice.
      </Lede>
      <LiveNote />

      <SectionTitle>Space scale (4px grid)</SectionTitle>
      <TokenTable
        previewHeader="Bar"
        rows={SPACE_NAMES.map((n) => ({
          name: n,
          value: values[n],
          note:
            n === '--cs-space-16' ? 'section padding floor' : n === '--cs-space-24' ? 'section padding ceiling' : undefined,
          preview: (
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: Math.max(2, px(values[n])),
                maxWidth: 96,
                height: 14,
                borderRadius: 3,
                background: 'var(--cs-accent)',
              }}
            />
          ),
        }))}
      />

      <SectionTitle>Radius</SectionTitle>
      <TokenTable
        previewHeader="Corner"
        rows={RADIUS_NAMES.map((n) => ({
          name: n,
          value: values[n],
          note:
            n === '--cs-radius-md' ? 'default' : n === '--cs-radius-lg' ? 'cards / panels' : n === '--cs-radius-full' ? 'pills, inputs, chips' : undefined,
          preview: (
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: 40,
                height: 28,
                background: 'var(--cs-color-surface-raised)',
                border: '2px solid var(--cs-accent-strong)',
                borderRadius: values[n] || 0,
              }}
            />
          ),
        }))}
      />

      <SectionTitle>Breakpoints (mobile-first)</SectionTitle>
      <div style={{ display: 'grid', gap: 6, padding: 16, background: 'var(--cs-color-surface-panel)', border: '1px solid var(--cs-color-border-default)', borderRadius: 'var(--cs-radius-lg)', marginBottom: 12 }}>
        {BREAKPOINT_NAMES.map((n) => {
          const w = px(values[n]);
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 200, flex: 'none', fontFamily: 'var(--cs-font-family-mono)', fontSize: 'var(--cs-font-size-xs)' }}>{n}</span>
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: `${Math.max(0.4, (w / 1536) * 100)}%`,
                  maxWidth: '60%',
                  height: 10,
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, var(--cs-accent-grad-a), var(--cs-accent-grad-b))',
                }}
              />
              <span className="cs-caption" style={{ fontFamily: 'var(--cs-font-family-mono)' }}>{values[n]}</span>
            </div>
          );
        })}
      </div>
      <TokenTable
        rows={[...BREAKPOINT_NAMES, ...CONTAINER_NAMES].map((n) => ({
          name: n,
          value: values[n],
          note: n === '--cs-container-max' ? 'content max-width' : undefined,
        }))}
      />
    </div>
  );
}

export default {
  title: 'Foundations/Spacing',
  parameters: {
    docs: {
      description: {
        component: '4px space scale, radius, breakpoints and container width — values read live from the cascade.',
      },
    },
  },
};

export const Scale = {
  render: () => <SpacingPage />,
};
