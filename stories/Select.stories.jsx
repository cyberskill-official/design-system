import { Select } from '../components/forms/Select.jsx';

export default {
  title: 'Components/Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "object"
  },
  "description": {
    "control": "object"
  },
  "error": {
    "control": "object"
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
  args: { label: 'Element', options: [{ value: 'tho', label: 'Thổ' }, { value: 'hoa', label: 'Hỏa' }], defaultValue: 'tho' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
      <Select {...args} label="Default" options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} />
      <Select {...args} label="Disabled" disabled options={[{ value: 'a', label: 'A' }]} />
    </div>
  ),
};

export const States = {
  name: 'States',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <Select {...args} />
      <Select {...args} label="Error" error="Required" />
    </div>
  ),
};
