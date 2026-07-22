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
        component: 'Host Live CSF — Default plus honest control matrix mounting Link. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { href: '#', children: 'Read the doctrine' } };

export const Matrix = {
  name: 'Matrix / Labels',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Link {...args} href="#">Doctrine</Link>
      <Link {...args} href="#tokens">Tokens</Link>
    </div>
  ),
};
