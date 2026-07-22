import { RadioGroup, Radio } from '../components/forms/RadioGroup.jsx';

export default {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
  "name": {
    "control": "text"
  },
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "label": {
    "control": "text"
  },
  "description": {
    "control": "text"
  },
  "disabled": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting RadioGroup. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<RadioGroup name="theme" legend="Theme" defaultValue="light"><Radio value="light" label="Light" /><Radio value="dark" label="Dark" /></RadioGroup>) };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <RadioGroup {...args} />
      <RadioGroup {...args} disabled />
    </div>
  ),
};
