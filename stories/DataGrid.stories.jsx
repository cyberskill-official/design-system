import { DataGrid } from '../components/datatable/DataGrid.jsx';

export default {
  title: 'Components/Data/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
};

export const Default = { args: { columns: [{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }], rows: [{ id: 1, name: 'Alpha wish', status: 'Open' }, { id: 2, name: 'Beta wish', status: 'Done' }], caption: 'Wishes' } };
