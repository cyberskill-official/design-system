import { Kbd } from '../components/data/Kbd.jsx';

export default {
  title: 'Components/Data/Kbd',
  component: Kbd,
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

export const Default = { args: { children: '⌘K' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Kbd {...args} />
      <Kbd {...args} disabled={true} />
    </div>
  ),
};
