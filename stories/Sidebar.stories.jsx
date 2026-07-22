import { Sidebar, NavItem } from '../components/navigation/Sidebar.jsx';

export default {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
  "active": {
    "control": "boolean"
  },
  "href": {
    "control": "text"
  },
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

export const Default = { render: () => (<Sidebar><NavItem active>Overview</NavItem><NavItem>Health</NavItem><NavItem>Tokens</NavItem></Sidebar>) };

export const Matrix = {
  name: 'Matrix / active',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <Sidebar {...args} active={false} />
      <Sidebar {...args} active={true} />
    </div>
  ),
};
