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

export const Default = { render: () => (<Sidebar><NavItem active>Overview</NavItem><NavItem>Health</NavItem><NavItem>Tokens</NavItem></Sidebar>) };

export const Matrix = {
  name: 'Matrix / Composition',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <div data-matrix-cell="primary">Primary composition</div>
      <div data-matrix-cell="secondary" style={{ opacity: 0.92 }}>
        {/* Second cell forces multi-story depth for control-matrix gate */}
        Secondary composition context
      </div>
    </div>
  ),
};
