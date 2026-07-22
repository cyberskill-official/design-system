import { InputGroup } from '../components/forms/InputGroup.jsx';
import { TextField } from '../components/textfield/TextField.jsx';

export default {
  title: 'Components/Forms/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
};

export const Default = { render: () => (<InputGroup><TextField label="Amount" defaultValue="100" /></InputGroup>) };
