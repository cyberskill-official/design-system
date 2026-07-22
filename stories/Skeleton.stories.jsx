import { Skeleton } from '../components/feedback/Skeleton.jsx';

export default {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
  "variant": {
    "control": "select",
    "options": [
      "block",
      "circle"
    ]
  },
  "width": {
    "control": "number"
  },
  "height": {
    "control": "number"
  },
  "lines": {
    "control": "number"
  },
  "radius": {
    "control": "number"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Skeleton. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { width: 200, height: 16 } };

export const AllVariants = {
  name: 'Matrix / All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Skeleton {...args} variant="block">block</Skeleton>
      <Skeleton {...args} variant="circle">circle</Skeleton>
    </div>
  ),
};
