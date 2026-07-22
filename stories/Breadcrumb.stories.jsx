import { Breadcrumb } from '../components/navigation/Breadcrumb.jsx';

export default {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
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

export const Default = { args: { items: [{ href: '#', label: 'Home' }, { label: 'Button' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Breadcrumb {...args} />
      <Breadcrumb {...args} disabled={true} />
    </div>
  ),
};
