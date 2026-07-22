import { DataGrid } from '../components/datatable/DataGrid.jsx';

export default {
  title: 'Components/Data/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  argTypes: {
  "columns": {
    "control": "object"
  },
  "rows": {
    "control": "object"
  },
  "rowKey": {
    "control": "text"
  },
  "selectable": {
    "control": "boolean"
  },
  "selected": {
    "control": "text"
  },
  "onSelect": {
    "control": "text"
  },
  "height": {
    "control": "number"
  },
  "caption": {
    "control": "object"
  },
  "empty": {
    "control": "object"
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
  name: 'Matrix / Selectable',
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <DataGrid {...args} />
      <DataGrid {...args} selectable selected={[1]} />
    </div>
  ),
};
