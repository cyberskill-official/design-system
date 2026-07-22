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

export const Matrix = {
  name: 'Matrix / Sizes',
  render: (args) => (
    <div style={{ display: 'grid', gap: 8 }}>
      <Skeleton {...args} width={120} height={12} />
      <Skeleton {...args} width={240} height={16} />
    </div>
  ),
};
