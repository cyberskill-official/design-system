import { DataTable } from '../components/datatable/DataTable.jsx';

export default {
  title: 'Components/Data/DataTable',
  component: DataTable,
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

export const Default = { args: { columns: [{ key: 'name', header: 'Name' }, { key: 'role', header: 'Role' }], rows: [{ id: 1, name: 'Stephen', role: 'Founder' }, { id: 2, name: 'Lumi', role: 'Genie' }], caption: 'Team' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <DataTable {...args} />
      <DataTable {...args} disabled={true} />
    </div>
  ),
};
