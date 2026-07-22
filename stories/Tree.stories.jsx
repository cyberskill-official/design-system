import { Tree } from '../components/data/Tree.jsx';

export default {
  title: 'Components/Data/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
  "nodes": {
    "control": "object"
  },
  "selected": {
    "control": "text"
  },
  "onSelect": {
    "control": "text"
  },
  "defaultOpen": {
    "control": "boolean"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Tree. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { nodes: [{ id: '1', label: 'Design system', children: [{ id: '1a', label: 'Tokens' }] }] },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Depth',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Tree {...args} nodes={[{ id: '1', label: 'Root' }]} />
      <Tree {...args} nodes={[{ id: '1', label: 'Root', children: [{ id: '1a', label: 'Child' }] }]} />
    </div>
  ),
};
