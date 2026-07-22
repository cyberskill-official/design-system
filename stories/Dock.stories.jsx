import { Dock } from '../components/navigation/Dock.jsx';

export default {
  title: 'Components/Navigation/Dock',
  component: Dock,
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

export const Default = { args: { items: [{ id: 'home', label: 'Home' }, { id: 'search', label: 'Search' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Dock {...args} />
      <Dock {...args} disabled={true} />
    </div>
  ),
};
