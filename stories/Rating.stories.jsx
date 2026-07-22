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
  "onChange": {
    "control": "object"
  },
  "max": {
    "control": "number"
  },
  "readOnly": {
    "control": "boolean"
  },
  "label": {
    "control": "text"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Rating. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { value: 4, max: 5, label: 'Satisfaction' } };

export const Matrix = {
  name: 'Matrix / readOnly',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Rating {...args} readOnly={false} />
      <Rating {...args} readOnly={true} />
    </div>
  ),
};
