import { Sortable } from '../components/data/Sortable.jsx';

export default {
  title: 'Components/Data/Sortable',
  component: Sortable,
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

export const Default = { args: { items: [{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Sortable {...args} />
      <Sortable {...args} disabled={true} />
    </div>
  ),
};
