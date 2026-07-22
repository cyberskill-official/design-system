import { Tooltip } from '../components/data/Tooltip.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Data/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export const Default = { render: () => (<Tooltip content="Helpful hint"><Button variant="ghost">Hover me</Button></Tooltip>) };
