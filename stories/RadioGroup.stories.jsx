import { RadioGroup, Radio } from '../components/forms/RadioGroup.jsx';

export default {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
  "legend": {
    "control": "object"
  },
  "name": {
    "control": "text"
  },
  "value": {
    "control": "text"
  },
  "onChange": {
    "control": "text"
  },
  "options": {
    "control": "object"
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

export const Matrix = {
  name: 'Matrix / Options',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <RadioGroup name="t1" legend="Theme" defaultValue="light"><Radio value="light" label="Light" /><Radio value="dark" label="Dark" /></RadioGroup>
      <RadioGroup name="t2" legend="Density" defaultValue="comfy"><Radio value="comfy" label="Comfy" /><Radio value="compact" label="Compact" /></RadioGroup>
    </div>
  ),
};
