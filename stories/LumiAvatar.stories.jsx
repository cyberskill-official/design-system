import { LumiAvatar } from '../components/brand/LumiAvatar.jsx';

export default {
  title: 'Components/Brand/LumiAvatar',
  component: LumiAvatar,
  tags: ['autodocs'],
  argTypes: {
  "src": {
    "control": "text"
  },
  "size": {
    "control": "select",
    "options": [
      "sm",
      "md",
      "lg"
    ]
  },
  "ring": {
    "control": "boolean"
  },
  "alt": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting LumiAvatar. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { size: 40 },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Sizes',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <LumiAvatar {...args} size={28} />
      <LumiAvatar {...args} size={48} />
    </div>
  ),
};
