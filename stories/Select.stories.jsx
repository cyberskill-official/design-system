import { Select } from '../components/forms/Select.jsx';

export default {
  title: 'Components/Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "text"
  },
  "description": {
    "control": "text"
  },
  "error": {
    "control": "text"
  },
  "options": {
    "control": "object"
  },
  "disabled": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Select. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Element', options: [{ value: 'tho', label: 'Thổ' }, { value: 'hoa', label: 'Hỏa' }], defaultValue: 'tho' } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Select {...args} />
      <Select {...args} disabled />
    </div>
  ),
};
