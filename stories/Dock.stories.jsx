import { Dock } from '../components/navigation/Dock.jsx';

export default {
  title: 'Components/Navigation/Dock',
  component: Dock,
  tags: ['autodocs'],
  argTypes: {
  "items": {
    "control": "object"
  },
  "label": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Dock. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { items: [{ id: 'home', label: 'Home' }, { id: 'search', label: 'Search' }] } };

export const Matrix = {
  name: 'Matrix / Items',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Dock {...args} items={[{ id: 'home', label: 'Home' }]} />
      <Dock {...args} items={[{ id: 'home', label: 'Home' }, { id: 'search', label: 'Search' }]} />
    </div>
  ),
};
