import { TreeTable } from '../components/datatable/TreeTable.jsx';

export default {
  title: 'Components/Data/TreeTable',
  component: TreeTable,
  tags: ['autodocs'],
};

export const Default = { args: { columns: [{ key: 'name', header: 'Name' }, { key: 'kind', header: 'Kind' }], rows: [{ id: '1', name: 'Root', kind: 'folder', children: [{ id: '1a', name: 'Child', kind: 'file' }] }] } };
