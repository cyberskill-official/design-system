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

export const Default = { render: function D() { const [open, setOpen] = React.useState(true); return (<><Button onClick={() => setOpen(true)}>Open drawer</Button><Drawer open={open} onClose={() => setOpen(false)} title="Filters"><p>Drawer body</p></Drawer></>); } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Drawer {...args}>Default</Drawer>
      <Drawer {...args} disabled>Disabled</Drawer>
      
    </div>
  ),
};
