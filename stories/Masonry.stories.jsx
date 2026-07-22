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
        component: 'Host Live CSF — Default plus control matrix. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { items: [{ id: 1, content: 'A' }, { id: 2, content: 'B taller' }, { id: 3, content: 'C' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Masonry {...args} />
      <Masonry {...args} disabled={true} />
    </div>
  ),
};
