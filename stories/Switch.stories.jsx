import { Switch } from '../components/forms/Switch.jsx';

export default {
  title: 'Components/Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "object"
  },
  "disabled": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Switch. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { label: 'Dark mode', defaultChecked: false },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'grid', gap: 8 }}>
      <Switch {...args} label="Off" />
      <Switch {...args} label="On" defaultChecked />
    </div>
  ),
};

export const States = {
  name: 'States',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <Switch {...args} />
      <Switch {...args} disabled />
    </div>
  ),
};
