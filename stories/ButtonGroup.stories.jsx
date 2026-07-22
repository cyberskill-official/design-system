import { ButtonGroup } from '../components/button/ButtonGroup.jsx';
import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
};

export const Default = { render: () => (<ButtonGroup><Button variant="secondary">Cancel</Button><Button>Confirm</Button></ButtonGroup>) };
