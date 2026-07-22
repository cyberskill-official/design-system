import { Terminal } from '../components/data/Terminal.jsx';

export default {
  title: 'Components/Data/Terminal',
  component: Terminal,
  tags: ['autodocs'],
  argTypes: {
  "title": {
    "control": "text"
  },
  "welcome": {
    "control": "object"
  },
  "onCommand": {
    "control": "text"
  },
  "prompt": {
    "control": "text"
  },
  "lang": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Terminal. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { lines: ['$ npm run storybook'] } };

export const Matrix = {
  name: 'Matrix / Lines',
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Terminal {...args} lines={['$ one']} />
      <Terminal {...args} lines={['$ one', '$ two', 'ok']} />
    </div>
  ),
};
