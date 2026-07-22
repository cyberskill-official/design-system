import { Rating } from '../components/forms/Rating.jsx';

export default {
  title: 'Components/Forms/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "number"
  },
  "defaultValue": {
    "control": "number"
  },
  "max": {
    "control": "number"
  },
  "readOnly": {
    "control": "boolean"
  },
  "label": {
    "control": "text"
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

export const Default = { args: { value: 4, max: 5, label: 'Satisfaction' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Rating {...args} />
      <Rating {...args} disabled={true} />
    </div>
  ),
};
