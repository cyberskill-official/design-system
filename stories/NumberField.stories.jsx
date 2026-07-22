import { NumberField } from '../components/forms/NumberField.jsx';

export default {
  title: 'Components/Forms/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "number"
  },
  "onChange": {
    "control": "object"
  },
  "min": {
    "control": "number"
  },
  "max": {
    "control": "number"
  },
  "step": {
    "control": "number"
  },
  "disabled": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting NumberField. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Quantity', defaultValue: 1, min: 0 } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <NumberField {...args} />
      <NumberField {...args} disabled />
    </div>
  ),
};
