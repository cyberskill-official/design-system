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
  "sortValue": {
    "control": "object"
  },
  "rowKey": {
    "control": "text"
  },
  "selectable": {
    "control": "boolean"
  },
  "selected": {
    "control": "object"
  },
  "onSelect": {
    "control": "object"
  },
  "height": {
    "control": "number"
  },
  "filterText": {
    "control": "text"
  },
  "filterKeys": {
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
  },
  "lang": {
    "control": "text"
  },
  "columns": {
    "control": "object"
  },
  "rows": {
    "control": "number"
  },
  "caption": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting DataGrid. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { columns: [{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }], rows: [{ id: 1, name: 'Alpha wish', status: 'Open' }, { id: 2, name: 'Beta wish', status: 'Done' }], caption: 'Wishes' } };

export const Matrix = {
  name: 'Matrix / sortable',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <DataGrid {...args} sortable={false} />
      <DataGrid {...args} sortable={true} />
    </div>
  ),
};
