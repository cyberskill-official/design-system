import React from 'react';
import { CommandPalette } from '../components/navigation/CommandPalette.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Navigation/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  argTypes: {
  "open": {
    "control": "boolean"
  },
  "placeholder": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: function C() { const [open, setOpen] = React.useState(true); return (<><Button onClick={() => setOpen(true)}>Open palette</Button><CommandPalette open={open} onClose={() => setOpen(false)} items={[{ id: '1', label: 'Go to Live', onSelect: () => setOpen(false) }]} /></>); } };

export const Matrix = {
  name: 'Matrix / Composition',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <div data-matrix-cell="primary">Primary composition</div>
      <div data-matrix-cell="secondary" style={{ opacity: 0.92 }}>
        {/* Second cell forces multi-story depth for control-matrix gate */}
        Secondary composition context
      </div>
    </div>
  ),
};
