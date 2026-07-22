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

export const Default = { render: () => (<RadioGroup name="theme" legend="Theme" defaultValue="light"><Radio value="light" label="Light" /><Radio value="dark" label="Dark" /></RadioGroup>) };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <RadioGroup {...args}>Default</RadioGroup>
      <RadioGroup {...args} disabled>Disabled</RadioGroup>
      
    </div>
  ),
};
