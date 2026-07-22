import { HotKeys } from '../components/navigation/HotKeys.jsx';

export default {
  title: 'Components/Navigation/HotKeys',
  component: HotKeys,
  tags: ['autodocs'],
  argTypes: {
  "help": {
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

export const Default = { args: { keys: [{ combo: '⌘K', label: 'Command palette' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <HotKeys {...args} />
      <HotKeys {...args} disabled={true} />
    </div>
  ),
};
