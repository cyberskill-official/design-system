import { DataTable } from '../components/datatable/DataTable.jsx';

export default {
  title: 'Components/Data/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export const Default = { args: { columns: [{ key: 'name', header: 'Name' }, { key: 'role', header: 'Role' }], rows: [{ id: 1, name: 'Stephen', role: 'Founder' }, { id: 2, name: 'Lumi', role: 'Genie' }], caption: 'Team' } };
