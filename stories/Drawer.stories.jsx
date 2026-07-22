import React from 'react';
import { Drawer } from '../components/overlays/Drawer.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export const Default = { render: function D() { const [open, setOpen] = React.useState(true); return (<><Button onClick={() => setOpen(true)}>Open drawer</Button><Drawer open={open} onClose={() => setOpen(false)} title="Filters"><p>Drawer body</p></Drawer></>); } };
