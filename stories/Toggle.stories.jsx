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
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { label: 'Notifications', defaultPressed: true } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Toggle {...args}>Default</Toggle>
      <Toggle {...args} disabled>Disabled</Toggle>
      
    </div>
  ),
};
