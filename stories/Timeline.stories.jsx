import { Timeline } from '../components/data/Timeline.jsx';

export default {
  title: 'Components/Data/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
  "state": {
    "control": "select",
    "options": [
      "done",
      "now",
      "todo"
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

export const Default = { args: { items: [{ title: 'Wish captured', time: '09:00' }, { title: 'Shipped', time: '16:00' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Timeline {...args} />
      <Timeline {...args} disabled={true} />
    </div>
  ),
};
