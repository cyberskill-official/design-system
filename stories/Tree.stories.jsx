import { Tree } from '../components/data/Tree.jsx';

export default {
  title: 'Components/Data/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
  "selected": {
    "control": "text"
  },
  "onSelect": {
    "control": "text"
  },
  "defaultOpen": {
    "control": "boolean"
  },
  "nodes": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Tree. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { nodes: [{ id: '1', label: 'Design system', children: [{ id: '1a', label: 'Tokens' }] }] } };

export const Matrix = {
  name: 'Matrix / defaultOpen',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Tree {...args} defaultOpen={false} />
      <Tree {...args} defaultOpen={true} />
    </div>
  ),
};
