import { Sortable } from '../components/data/Sortable.jsx';

export default {
  title: 'Components/Data/Sortable',
  component: Sortable,
  tags: ['autodocs'],
  argTypes: {
  "items": {
    "control": "object"
  },
  "onChange": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Sortable. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { items: [{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }] },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Items',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Sortable {...args} items={[{ id: 'a', label: 'Alpha' }]} />
      <Sortable {...args} items={[{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta' }, { id: 'c', label: 'Gamma' }]} />
    </div>
  ),
};
