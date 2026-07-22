import { HotKeys } from '../components/navigation/HotKeys.jsx';

export default {
  title: 'Components/Navigation/HotKeys',
  component: HotKeys,
  tags: ['autodocs'],
  argTypes: {
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
};

export const Default = { args: { keys: [{ combo: '⌘K', label: 'Command palette' }] } };

export const Matrix = {
  name: 'Matrix / help',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
      <HotKeys {...args} help={false} />
      <HotKeys {...args} help={true} />
    </div>
  ),
};
