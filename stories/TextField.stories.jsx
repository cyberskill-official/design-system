import { TextField } from '../components/textfield/TextField.jsx';

export default {
  title: 'Components/Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
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

export const Default = { args: { label: 'Work email', placeholder: 'you@cyberskill.world' } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <TextField {...args}>Default</TextField>
      <TextField {...args} disabled>Disabled</TextField>
      
    </div>
  ),
};
