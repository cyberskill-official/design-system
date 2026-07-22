import { DataGrid } from '../components/datatable/DataGrid.jsx';

export default {
  title: 'Components/Data/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  argTypes: {
  "sortable": {
    "control": "boolean"
  },
  "pinned": {
    "control": "boolean"
  },
  "rowKey": {
    "control": "text"
  },
  "selectable": {
    "control": "boolean"
  },
  "height": {
    "control": "number"
  },
  "filterText": {
    "control": "text"
  },
  "virtual": {
    "control": "boolean"
  },
  "virtualThreshold": {
    "control": "number"
  },
  "rowHeight": {
    "control": "number"
  },
  "persistKey": {
    "control": "text"
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

export const Default = { args: { columns: [{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }], rows: [{ id: 1, name: 'Alpha wish', status: 'Open' }, { id: 2, name: 'Beta wish', status: 'Done' }], caption: 'Wishes' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <DataGrid {...args} />
      <DataGrid {...args} disabled={true} />
    </div>
  ),
};
