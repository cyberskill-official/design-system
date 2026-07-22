import { Anchor } from '../components/navigation/Anchor.jsx';

export default {
  title: 'Components/Navigation/Anchor',
  component: Anchor,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { items: [{ href: '#a', label: 'Intro' }, { href: '#b', label: 'Tokens' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Anchor {...args} />
      <Anchor {...args} disabled={true} />
    </div>
  ),
};
