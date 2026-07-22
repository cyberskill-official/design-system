import { Terminal } from '../components/data/Terminal.jsx';

export default {
  title: 'Components/Data/Terminal',
  component: Terminal,
  tags: ['autodocs'],
  argTypes: {
  "title": {
    "control": "text"
  },
  "prompt": {
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

export const Default = { args: { lines: ['$ npm run storybook', 'Local: http://localhost:6006'] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Terminal {...args} />
      <Terminal {...args} disabled={true} />
    </div>
  ),
};
