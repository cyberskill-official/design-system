import { ConfidenceMeter } from '../components/ai/ConfidenceMeter.jsx';

export default {
  title: 'Components/AI/ConfidenceMeter',
  component: ConfidenceMeter,
  tags: ['autodocs'],
  argTypes: {
  "value": {
    "control": "number"
  },
  "level": {
    "control": "select",
    "options": [
      "low",
      "medium",
      "high"
    ]
  },
  "segments": {
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

export const Default = { args: { value: 0.82, label: 'Confidence' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <ConfidenceMeter {...args} />
      <ConfidenceMeter {...args} disabled={true} />
    </div>
  ),
};
