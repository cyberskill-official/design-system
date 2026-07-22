import { Divider } from '../components/data/Divider.jsx';

export default {
  title: 'Components/Data/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
  "vertical": {
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

export const Default = { args: {} };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Divider {...args} />
      <Divider {...args} disabled={true} />
    </div>
  ),
};
