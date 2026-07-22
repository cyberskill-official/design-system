import { Switch } from '../components/forms/Switch.jsx';

export default {
  title: 'Components/Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "text"
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
};

export const Default = { args: { label: 'Dark mode', defaultChecked: false } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Switch {...args} />
      <Switch {...args} disabled />
    </div>
  ),
};
