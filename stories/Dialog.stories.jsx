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
  "title": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Dialog. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: function OpenDialog() { const [open, setOpen] = React.useState(true); return (<><Button onClick={() => setOpen(true)}>Open</Button><Dialog open={open} title="Confirm" onClose={() => setOpen(false)} actions={<Button onClick={() => setOpen(false)}>OK</Button>}><p style={{ margin: 0 }}>Host Live matrix.</p></Dialog></>); } };

export const Matrix = {
  name: 'Matrix / open',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Dialog {...args} open={false} />
      <Dialog {...args} open={true} />
    </div>
  ),
};
