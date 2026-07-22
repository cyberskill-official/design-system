import React from 'react';
import { Drawer } from '../components/overlays/Drawer.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
  "open": {
    "control": "boolean"
  },
  "side": {
    "control": "select",
    "options": [
      "right",
      "left"
    ]
  },
  "title": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Drawer. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: function D() { const [open, setOpen] = React.useState(true); return (<><Button onClick={() => setOpen(true)}>Open drawer</Button><Drawer open={open} onClose={() => setOpen(false)} title="Filters"><p>Drawer body</p></Drawer></>); } };

export const Matrix = {
  name: 'Matrix / open',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Drawer {...args} open={false} />
      <Drawer {...args} open={true} />
    </div>
  ),
};
