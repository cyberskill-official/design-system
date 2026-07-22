import { ProgressBar } from '../components/feedback/ProgressBar.jsx';

export default {
  title: 'Components/Feedback/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "number"
  },
  "max": {
    "control": "number"
  },
  "variant": {
    "control": "select",
    "options": [
      "ochre",
      "umber",
      "success"
    ]
  },
  "label": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting ProgressBar. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { value: 0.45, label: 'Build progress' } };

export const AllVariants = {
  name: 'Matrix / All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <ProgressBar {...args} variant="ochre">ochre</ProgressBar>
      <ProgressBar {...args} variant="umber">umber</ProgressBar>
      <ProgressBar {...args} variant="success">success</ProgressBar>
    </div>
  ),
};
