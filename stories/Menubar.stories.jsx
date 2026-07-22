import { Menubar } from '../components/navigation/Menubar.jsx';

export default {
  title: 'Components/Navigation/Menubar',
  component: Menubar,
  tags: ['autodocs'],
};

export const Default = { args: { items: [{ label: 'File', items: [{ label: 'New' }] }, { label: 'Edit', items: [{ label: 'Undo' }] }] } };
