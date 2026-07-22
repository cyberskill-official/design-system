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
  },
  "name": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting ChatMessage. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { role: 'lumi', children: 'Turn your will into real.' } };

export const AllVariants = {
  name: 'Matrix / Roles',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ChatMessage {...args} role="lumi">lumi</ChatMessage>
      <ChatMessage {...args} role="user">user</ChatMessage>
    </div>
  ),
};
