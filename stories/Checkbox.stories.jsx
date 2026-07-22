import { Checkbox } from '../components/forms/Checkbox.jsx';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Remember this wish',
    defaultChecked: true,
  },
};

export const WithDescription = {
  args: {
    label: 'Email me status',
    description: 'Weekly digest only — no marketing.',
  },
};
