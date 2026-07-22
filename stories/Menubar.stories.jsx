import { Menubar } from '../components/navigation/Menubar.jsx';

export default {
  title: 'Components/Navigation/Menubar',
  component: Menubar,
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

export const Default = { args: { items: [{ label: 'File', items: [{ label: 'New' }] }, { label: 'Edit', items: [{ label: 'Undo' }] }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Menubar {...args} />
      <Menubar {...args} disabled={true} />
    </div>
  ),
};
