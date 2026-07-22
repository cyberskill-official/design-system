import { Toolbar } from '../components/navigation/Toolbar.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Navigation/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
};

export const Default = { render: () => (<Toolbar><Button size="sm" variant="ghost">Bold</Button><Button size="sm" variant="ghost">Italic</Button></Toolbar>) };
