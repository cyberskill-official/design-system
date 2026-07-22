import { TreeTable } from '../components/datatable/TreeTable.jsx';

export default {
  title: 'Components/Data/TreeTable',
  component: TreeTable,
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

export const Default = { args: { columns: [{ key: 'name', header: 'Name' }, { key: 'kind', header: 'Kind' }], rows: [{ id: '1', name: 'Root', kind: 'folder', children: [{ id: '1a', name: 'Child', kind: 'file' }] }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <TreeTable {...args} />
      <TreeTable {...args} disabled={true} />
    </div>
  ),
};
