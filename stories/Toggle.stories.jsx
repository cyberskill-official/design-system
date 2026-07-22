import { Toggle } from '../components/forms/Toggle.jsx';

export default {
  title: 'Components/Forms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
  "pressed": {
    "control": "boolean"
  },
  "defaultPressed": {
    "control": "boolean"
  },
  "icon": {
    "control": "object"
  },
  "disabled": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Toggle. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Notifications', defaultPressed: true } };

export const Matrix = {
  name: 'Matrix / Pressed',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Toggle {...args} label="Off" defaultPressed={false} />
      <Toggle {...args} label="On" defaultPressed />
    </div>
  ),
};
