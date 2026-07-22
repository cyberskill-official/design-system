import { Sidebar, NavItem } from '../components/navigation/Sidebar.jsx';

export default {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};

export const Default = { render: () => (<Sidebar><NavItem active>Overview</NavItem><NavItem>Health</NavItem><NavItem>Tokens</NavItem></Sidebar>) };
