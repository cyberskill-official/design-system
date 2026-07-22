import { Divider } from '../components/data/Divider.jsx';

export default {
  title: 'Components/Data/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
  "vertical": {
    "control": "boolean"
  },
  "label": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Divider. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: {} };

export const Matrix = {
  name: 'Matrix / vertical',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Divider {...args} vertical={false} />
      <Divider {...args} vertical={true} />
    </div>
  ),
};
