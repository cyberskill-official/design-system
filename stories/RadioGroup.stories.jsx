import { RadioGroup, Radio } from '../components/forms/RadioGroup.jsx';

export default {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};

export const Default = { render: () => (<RadioGroup name="theme" legend="Theme" defaultValue="light"><Radio value="light" label="Light" /><Radio value="dark" label="Dark" /></RadioGroup>) };
