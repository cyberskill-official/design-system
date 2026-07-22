import { Logo } from '../components/logo/Logo.jsx';

export default {
  title: 'Components/Brand/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
  "size": {
    "control": "number"
  },
  "title": {
    "control": "text"
  },
  "decorative": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Logo. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { size: 40 },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Sizes',
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Logo {...args} size={24} />
      <Logo {...args} size={40} />
      <Logo {...args} size={56} />
    </div>
  ),
};
