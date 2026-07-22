import { HotKeys } from '../components/navigation/HotKeys.jsx';

export default {
  title: 'Components/Navigation/HotKeys',
  component: HotKeys,
  tags: ['autodocs'],
  argTypes: {
  "bindings": {
    "control": "object"
  },
  "help": {
    "control": "boolean"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting HotKeys. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
  args: { keys: [{ combo: '⌘K', label: 'Command palette' }] },
};

export const Default = {};

export const Matrix = {
  name: 'Matrix / Keys',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <HotKeys {...args} keys={[{ combo: '⌘K', label: 'Palette' }]} />
      <HotKeys {...args} keys={[{ combo: '⌘K', label: 'Palette' }, { combo: '⌘/', label: 'Help' }]} />
    </div>
  ),
};
