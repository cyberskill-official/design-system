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
  "onChange": {
    "control": "text"
  },
  "users": {
    "control": "text"
  },
  "placeholder": {
    "control": "text"
  },
  "rows": {
    "control": "number"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Mentions. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { options: [{ id: 'lumi', label: 'Lumi' }], label: 'Mention' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Options',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Mentions {...args} label="One" options={[{ id: 'lumi', label: 'Lumi' }]} />
      <Mentions {...args} label="Two" options={[{ id: 'lumi', label: 'Lumi' }, { id: 'stephen', label: 'Stephen' }]} />
    </div>
  ),
};
