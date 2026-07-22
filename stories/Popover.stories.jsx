import { Popover } from '../components/overlays/Popover.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export const Default = { render: () => (<Popover content="Popover body"><Button variant="secondary">Open</Button></Popover>) };
