import { Mentions } from '../components/forms/Mentions.jsx';

export default {
  title: 'Components/Forms/Mentions',
  component: Mentions,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "text"
  },
  "defaultValue": {
    "control": "text"
  },
  "placeholder": {
    "control": "text"
  },
  "rows": {
    "control": "number"
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

export const Default = { args: { options: [{ id: 'lumi', label: 'Lumi' }], label: 'Mention' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Mentions {...args} />
      <Mentions {...args} disabled={true} />
    </div>
  ),
};
