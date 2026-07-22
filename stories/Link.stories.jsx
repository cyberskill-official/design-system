import { Link } from '../components/navigation/Link.jsx';

export default {
  title: 'Components/Navigation/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
  "href": {
    "control": "text"
  },
  "variant": {
    "control": "select",
    "options": [
      "default",
      "muted",
      "standalone"
    ]
  },
  "external": {
    "control": "boolean"
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

export const Default = { args: { href: '#', children: 'Read the doctrine' } };

export const AllVariants = {
  name: 'Matrix / All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Link {...args} variant="default">default</Link>
      <Link {...args} variant="muted">muted</Link>
      <Link {...args} variant="standalone">standalone</Link>
    </div>
  ),
};
