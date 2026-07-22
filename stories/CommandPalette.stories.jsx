import React from 'react';
import { CommandPalette } from '../components/navigation/CommandPalette.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Navigation/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
};

export const Default = { render: function C() { const [open, setOpen] = React.useState(true); return (<><Button onClick={() => setOpen(true)}>Open palette</Button><CommandPalette open={open} onClose={() => setOpen(false)} items={[{ id: '1', label: 'Go to Live View', onSelect: () => setOpen(false) }]} /></>); } };
