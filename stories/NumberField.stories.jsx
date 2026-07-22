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
    "control": "text"
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

export const Matrix = {
  name: 'Matrix / Bounds',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 240 }}>
      <NumberField {...args} label="Min0" min={0} defaultValue={0} />
      <NumberField {...args} label="Max10" min={0} max={10} defaultValue={10} />
    </div>
  ),
};
