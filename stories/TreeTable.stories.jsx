import { TreeTable } from '../components/datatable/TreeTable.jsx';

export default {
  title: 'Components/Data/TreeTable',
  component: TreeTable,
  tags: ['autodocs'],
  argTypes: {
  "columns": {
    "control": "object"
  },
  "nodes": {
    "control": "object"
  },
  "caption": {
    "control": "object"
  },
  "defaultExpanded": {
    "control": "text"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting TreeTable. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { columns: [{ key: 'name', header: 'Name' }, { key: 'kind', header: 'Kind' }], rows: [{ id: '1', name: 'Root', kind: 'folder', children: [{ id: '1a', name: 'Child', kind: 'file' }] }] },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Rows',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <TreeTable {...args} columns={[{ key: 'name', header: 'Name' }]} rows={[{ id: '1', name: 'Root' }]} />
      <TreeTable {...args} columns={[{ key: 'name', header: 'Name' }, { key: 'kind', header: 'Kind' }]} rows={[{ id: '1', name: 'Root', kind: 'folder', children: [{ id: '1a', name: 'Child', kind: 'file' }] }]} />
    </div>
  ),
};
