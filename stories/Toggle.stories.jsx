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
  name: 'Matrix / pressed',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Toggle {...args} pressed={false} />
      <Toggle {...args} pressed={true} />
    </div>
  ),
};
