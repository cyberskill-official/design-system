import { Sidebar, NavItem } from '../components/navigation/Sidebar.jsx';

export default {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Sidebar. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { render: () => (<Sidebar label="App"><NavItem active>Overview</NavItem><NavItem>Health</NavItem><NavItem>Tokens</NavItem></Sidebar>) };

export const Matrix = {
  name: 'Matrix / Active item',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Sidebar label="App">
        <NavItem active>Overview</NavItem>
        <NavItem>Health</NavItem>
      </Sidebar>
      <Sidebar label="App">
        <NavItem>Overview</NavItem>
        <NavItem active>Tokens</NavItem>
      </Sidebar>
    </div>
  ),
};
