import { List, ListItem } from '../components/data/List.jsx';

export default {
  title: 'Components/Data/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
  "lead": {
    "control": "object"
  },
  "title": {
    "control": "object"
  },
  "subtitle": {
    "control": "object"
  },
  "trail": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting List. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<List><ListItem>First wish</ListItem><ListItem>Second wish</ListItem></List>) };

export const Matrix = {
  name: 'Matrix / Density',
  render: () => (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
      <List><ListItem>One</ListItem><ListItem>Two</ListItem></List>
      <List><ListItem>Alpha</ListItem><ListItem>Beta</ListItem><ListItem>Gamma</ListItem></List>
    </div>
  ),
};
