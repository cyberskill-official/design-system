import { NavigationMenu } from '../components/navigation/NavigationMenu.jsx';

export default {
  title: 'Components/Navigation/NavigationMenu',
  component: NavigationMenu,
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

export const Default = { args: { items: [{ label: 'Product', href: '#' }, { label: 'Docs', href: '#' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <NavigationMenu {...args} />
      <NavigationMenu {...args} disabled={true} />
    </div>
  ),
};
