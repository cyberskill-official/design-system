import React from 'react';
import { Dialog } from '../components/dialog/Dialog.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
  "open": {
    "control": "boolean"
  },
  "closeLabel": {
    "control": "text"
  },
  "disabled": {
    "control": "boolean"
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

export const Default = { render: function OpenDialog() { const [open, setOpen] = React.useState(true); return (<><Button onClick={() => setOpen(true)}>Open</Button><Dialog open={open} title="Confirm" onClose={() => setOpen(false)} actions={<Button onClick={() => setOpen(false)}>OK</Button>}><p style={{ margin: 0 }}>Host Live matrix.</p></Dialog></>); } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Dialog {...args}>Default</Dialog>
      <Dialog {...args} disabled>Disabled</Dialog>
      
    </div>
  ),
};
