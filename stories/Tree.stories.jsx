import { Tree } from '../components/data/Tree.jsx';

export default {
  title: 'Components/Data/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
  "selected": {
    "control": "text"
  },
  "defaultOpen": {
    "control": "boolean"
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

export const Default = { args: { nodes: [{ id: '1', label: 'Design system', children: [{ id: '1a', label: 'Tokens' }] }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Tree {...args} />
      <Tree {...args} disabled={true} />
    </div>
  ),
};
