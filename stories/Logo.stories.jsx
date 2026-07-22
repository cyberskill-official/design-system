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
};

export const Default = { args: { size: 40 } };

export const Matrix = {
  name: 'Matrix / decorative',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Logo {...args} decorative={false} />
      <Logo {...args} decorative={true} />
    </div>
  ),
};
