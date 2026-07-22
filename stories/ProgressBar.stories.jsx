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
  args: { value: 0.45, label: 'Build progress' },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Values',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <ProgressBar {...args} value={0.2} label="20%" />
      <ProgressBar {...args} value={0.8} label="80%" />
    </div>
  ),
};
