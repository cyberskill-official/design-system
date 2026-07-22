import React from 'react';
import { Dialog } from '../components/dialog/Dialog.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export const Default = { render: function OpenDialog() { const [open, setOpen] = React.useState(true); return (<><Button onClick={() => setOpen(true)}>Open</Button><Dialog open={open} title="Confirm" onClose={() => setOpen(false)} actions={<Button onClick={() => setOpen(false)}>OK</Button>}><p style={{ margin: 0 }}>Host Storybook default.</p></Dialog></>); } };
