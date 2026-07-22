import { NavigationMenu } from '../components/navigation/NavigationMenu.jsx';

export default {
  title: 'Components/Navigation/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
  argTypes: {
  "items": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting NavigationMenu. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { items: [{ label: 'Product', href: '#' }, { label: 'Docs', href: '#' }] },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Items',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <NavigationMenu {...args} items={[{ label: 'Product', href: '#' }]} />
      <NavigationMenu {...args} items={[{ label: 'Product', href: '#' }, { label: 'Docs', href: '#' }]} />
    </div>
  ),
};
