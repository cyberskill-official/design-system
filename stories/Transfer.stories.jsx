import { Transfer } from '../components/forms/Transfer.jsx';

export default {
  title: 'Components/Forms/Transfer',
  component: Transfer,
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

export const Default = { args: { source: [{ id: '1', label: 'Alpha' }], target: [{ id: '2', label: 'Beta' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Transfer {...args} />
      <Transfer {...args} disabled={true} />
    </div>
  ),
};
