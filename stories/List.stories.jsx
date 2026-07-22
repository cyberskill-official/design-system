import { List, ListItem } from '../components/data/List.jsx';

export default {
  title: 'Components/Data/List',
  component: List,
  tags: ['autodocs'],
};

export const Default = { render: () => (<List><ListItem>First wish</ListItem><ListItem>Second wish</ListItem></List>) };
