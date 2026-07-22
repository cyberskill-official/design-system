import { Masonry } from '../components/data/Masonry.jsx';

export default {
  title: 'Components/Data/Masonry',
  component: Masonry,
  tags: ['autodocs'],
  argTypes: {
  "columns": {
    "control": "number"
  },
  "gap": {
    "control": "number"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Masonry. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { items: [{ id: 1, content: 'A' }, { id: 2, content: 'B' }] } };

export const Matrix = {
  name: 'Matrix / Items',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Masonry {...args} items={[{ id: 1, content: 'A' }]} />
      <Masonry {...args} items={[{ id: 1, content: 'A' }, { id: 2, content: 'B taller block' }, { id: 3, content: 'C' }]} />
    </div>
  ),
};
