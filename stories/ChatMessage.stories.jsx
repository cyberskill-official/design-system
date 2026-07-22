import { ChatMessage } from '../components/ai/ChatMessage.jsx';

export default {
  title: 'Components/AI/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
  argTypes: {
  "role": {
    "control": "select",
    "options": [
      "lumi",
      "user"
    ]
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

export const Default = { args: { role: 'lumi', children: 'Turn your will into real.' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <ChatMessage {...args} />
      <ChatMessage {...args} disabled={true} />
    </div>
  ),
};
