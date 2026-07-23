import React from 'react';
import { Button } from '../../components/button/Button.jsx';
import { TextField } from '../../components/textfield/TextField.jsx';
import { Switch } from '../../components/forms/Switch.jsx';
import { Checkbox } from '../../components/forms/Checkbox.jsx';
import { Link } from '../../components/navigation/Link.jsx';
import {
  useLiveTokenValues,
  PageTitle,
  Lede,
  SectionTitle,
  Mono,
} from '../lib/live-tokens.jsx';

function FocusRingPage() {
  const [ref, values] = useLiveTokenValues(['--cs-color-accent-ochre']);
  return (
    <div ref={ref} style={{ maxWidth: 920 }}>
      <PageTitle>Focus ring</PageTitle>
      <Lede>
        The 3px Ochre focus ring (2px offset) is the studio's accessibility signature on
        every product. It is always visible, never removed, and never remapped by element
        packs or dark theme — Ochre in every scope.
      </Lede>
      <p className="cs-caption" style={{ margin: '0 0 16px' }}>
        Ring colour, live from the cascade: <Mono>--cs-color-accent-ochre</Mono> ={' '}
        <Mono muted>{values['--cs-color-accent-ochre']}</Mono>. Interactive components set a
        3px outline; the global fallback in base/reset.css guarantees at least a 2px ring
        on anything focusable.
      </p>

      <SectionTitle>Keyboard walkthrough</SectionTitle>
      <ol className="cs-body" style={{ maxWidth: '72ch', paddingLeft: 20, display: 'grid', gap: 6 }}>
        <li>Click once in this preview area (or press Tab from the address bar) to move focus into the story.</li>
        <li>Press <kbd className="cs-kbd">Tab</kbd> to walk forward through the samples below — every stop must show the Ochre ring.</li>
        <li>Press <kbd className="cs-kbd">Shift</kbd>+<kbd className="cs-kbd">Tab</kbd> to walk backwards.</li>
        <li>On buttons, <kbd className="cs-kbd">Enter</kbd> or <kbd className="cs-kbd">Space</kbd> activates; on the switch and checkbox, <kbd className="cs-kbd">Space</kbd> toggles.</li>
        <li>The ring appears on keyboard focus (focus-visible) — mouse clicks intentionally do not paint it.</li>
      </ol>

      <SectionTitle>Real components — Tab through them</SectionTitle>
      <div style={{ display: 'grid', gap: 20, padding: 20, background: 'var(--cs-color-surface-panel)', border: '1px solid var(--cs-color-border-default)', borderRadius: 'var(--cs-radius-lg)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Button variant="primary">Make a wish</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div style={{ maxWidth: 360 }}>
          <TextField label="Your name" placeholder="Nguyễn Hoàng Vũ" />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
          <Switch label="Notifications" defaultChecked />
          <Checkbox label="I agree" />
          <Link href="#focus-ring-demo" onClick={(e) => e.preventDefault()}>
            A focusable link
          </Link>
        </div>
      </div>

      <SectionTitle>Rules</SectionTitle>
      <ul className="cs-body" style={{ maxWidth: '72ch', paddingLeft: 20, display: 'grid', gap: 6 }}>
        <li>Never remove or restyle the ring — <Mono>outline: none</Mono> without a replacement is a defect.</li>
        <li>The ring is never elemental: inside any <Mono>data-cs-element</Mono> scope it stays Ochre (flip the Element toolbar and Tab again to verify).</li>
        <li>The interaction layer adds a soft ochre glow on top of the ring for key controls — additive, never a replacement.</li>
      </ul>
    </div>
  );
}

export default {
  title: 'A11y/Focus ring',
  parameters: {
    docs: {
      description: {
        component:
          'The immutable 3px Ochre focus ring on real components, with a keyboard walkthrough. Never removed, never elemental.',
      },
    },
  },
};

export const KeyboardWalkthrough = {
  name: 'Keyboard walkthrough',
  render: () => <FocusRingPage />,
};
