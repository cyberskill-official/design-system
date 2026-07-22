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
        component: 'Host Live CSF — Default plus honest control matrix mounting CommandPalette. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: function C() { const [open, setOpen] = React.useState(true); return (<><Button onClick={() => setOpen(true)}>Open palette</Button><CommandPalette open={open} onClose={() => setOpen(false)} items={[{ id: '1', label: 'Go to Live', onSelect: () => setOpen(false) }]} /></>); } };

export const Matrix = {
  name: 'Matrix / open',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <CommandPalette {...args} open={false} />
      <CommandPalette {...args} open={true} />
    </div>
  ),
};
