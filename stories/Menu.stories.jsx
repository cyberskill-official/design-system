import { Menu, MenuItem } from '../components/navigation/Menu.jsx';

export default {
  title: 'Components/Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
};

export const Default = { render: () => (<Menu><MenuItem onSelect={() => {}}>Edit</MenuItem><MenuItem onSelect={() => {}}>Duplicate</MenuItem></Menu>) };
