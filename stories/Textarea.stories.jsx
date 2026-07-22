import { Textarea } from '../components/forms/Textarea.jsx';

export default {
  title: 'Components/Forms/Textarea',
  component: Textarea,
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

export const Default = { args: { label: 'Notes', placeholder: 'Context for the wish…', rows: 4 } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Textarea {...args}>Default</Textarea>
      <Textarea {...args} disabled>Disabled</Textarea>
      
    </div>
  ),
};
