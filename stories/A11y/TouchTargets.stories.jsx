import React from 'react';
import { Button } from '../../components/button/Button.jsx';
import { TextField } from '../../components/textfield/TextField.jsx';
import { Switch } from '../../components/forms/Switch.jsx';
import {
  PageTitle,
  Lede,
  SectionTitle,
  Mono,
} from '../lib/live-tokens.jsx';

const RULER = 44;

/** Wraps a sample and reports its real rendered height against the 44px floor. */
function Measured({ label, children }) {
  const boxRef = React.useRef(null);
  const [h, setH] = React.useState(null);
  React.useEffect(() => {
    if (!boxRef.current) return;
    const target = boxRef.current.firstElementChild;
    if (!target) return;
    const read = () => setH(Math.round(target.getBoundingClientRect().height * 10) / 10);
    read();
    const ro = new ResizeObserver(read);
    ro.observe(target);
    return () => ro.disconnect();
  }, []);
  const meets = h != null && h >= RULER;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--cs-color-border-default)' }}>
      <div style={{ position: 'relative', paddingBlock: 4 }}>
        {/* 44px ruler band behind the sample */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            insetInlineStart: 0,
            insetInlineEnd: 0,
            top: '50%',
            height: RULER,
            transform: 'translateY(-50%)',
            background: 'color-mix(in oklab, var(--cs-color-brand-ochre) 14%, transparent)',
            borderBlock: '1px dashed var(--cs-accent-strong)',
            pointerEvents: 'none',
          }}
        />
        <div ref={boxRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', minHeight: RULER }}>
          {children}
        </div>
      </div>
      <div style={{ textAlign: 'right', minWidth: 190 }}>
        <div className="cs-caption">{label}</div>
        <div style={{ fontFamily: 'var(--cs-font-family-mono)', fontSize: 'var(--cs-font-size-sm)' }}>
          {h == null ? 'measuring…' : `${h}px — ${meets ? 'meets 44px here' : 'below 44px here'}`}
        </div>
      </div>
    </div>
  );
}

function TouchTargetsPage() {
  const [coarse, setCoarse] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  );
  React.useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const on = () => setCoarse(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return (
    <div style={{ maxWidth: 920 }}>
      <PageTitle>Touch targets</PageTitle>
      <Lede>
        The floor is 44px minimum on coarse pointers (finger). base/a11y.css keys the
        guarantee to pointer type, not viewport width — a 1280px touch laptop still gets
        44px targets — while desktop mouse density is preserved for the compact sizes.
      </Lede>
      <p className="cs-caption" style={{ margin: '0 0 16px' }}>
        Your pointer right now: {coarse ? 'coarse — every measured target below must clear 44px' : 'fine (mouse/trackpad) — md and lg clear 44px; xs and sm keep desktop density and grow to the floor only on touch hardware'}.
        The dashed band is exactly 44px tall; measurements are live from getBoundingClientRect.
      </p>

      <SectionTitle>Buttons across sizes</SectionTitle>
      <div style={{ padding: '4px 20px 12px', background: 'var(--cs-color-surface-panel)', border: '1px solid var(--cs-color-border-default)', borderRadius: 'var(--cs-radius-lg)' }}>
        <Measured label="Button size=xs">
          <Button size="xs">Wish xs</Button>
        </Measured>
        <Measured label="Button size=sm">
          <Button size="sm">Wish sm</Button>
        </Measured>
        <Measured label="Button size=md (44px by token)">
          <Button size="md">Make a wish</Button>
        </Measured>
        <Measured label="Button size=lg">
          <Button size="lg">Make a wish</Button>
        </Measured>
      </div>

      <SectionTitle>Fields and toggles</SectionTitle>
      <div style={{ padding: '4px 20px 12px', background: 'var(--cs-color-surface-panel)', border: '1px solid var(--cs-color-border-default)', borderRadius: 'var(--cs-radius-lg)' }}>
        <Measured label="TextField control (min-height token)">
          <div style={{ width: 320 }}>
            <TextField label="Email" placeholder="you@cyberskill.world" />
          </div>
        </Measured>
        <Measured label="Switch row (44px row on coarse)">
          <Switch label="Notifications" defaultChecked />
        </Measured>
      </div>

      <SectionTitle>Where the guarantee lives</SectionTitle>
      <ul className="cs-body" style={{ maxWidth: '72ch', paddingLeft: 20, display: 'grid', gap: 6 }}>
        <li><Mono>--cs-component-button-md-minHeight</Mono> is 44px in every expression — md is the 44px default everywhere, not only on touch.</li>
        <li><Mono>base/a11y.css</Mono> raises tabs, pagination, menu items, steppers, selection controls and more to the 44px floor under <Mono>@media (pointer: coarse)</Mono>.</li>
        <li>TextField controls carry <Mono>--cs-component-textfield-minHeight</Mono> (44px) on every pointer.</li>
      </ul>
    </div>
  );
}

export default {
  title: 'A11y/Touch targets',
  parameters: {
    docs: {
      description: {
        component:
          'The 44px coarse-pointer floor with a live 44px ruler and real measured heights per component size.',
      },
    },
  },
};

export const Measure = {
  name: '44px measure',
  render: () => <TouchTargetsPage />,
};
