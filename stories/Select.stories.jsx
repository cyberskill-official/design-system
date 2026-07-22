import { Select } from '../components/forms/Select.jsx';

export default {
  title: 'Components/Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
  "disabled": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Element', options: [{ value: 'tho', label: 'Thổ' }, { value: 'hoa', label: 'Hỏa' }], defaultValue: 'tho' } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Select {...args}>Default</Select>
      <Select {...args} disabled>Disabled</Select>
      
    </div>
  ),
};
