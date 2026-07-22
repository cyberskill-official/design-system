import { Stat } from '../components/data/Stat.jsx';

export default {
  title: 'Components/Data/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
  "trend": {
    "control": "select",
    "options": [
      "up",
      "down",
      "flat"
    ]
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

export const Default = { args: { label: 'Open wishes', value: '12', delta: '+2' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Stat {...args} />
      <Stat {...args} disabled={true} />
    </div>
  ),
};
