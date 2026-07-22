import { Steps } from '../components/navigation/Steps.jsx';

export default {
  title: 'Components/Navigation/Steps',
  component: Steps,
  tags: ['autodocs'],
  argTypes: {
  "current": {
    "control": "number"
  },
  "steps": {
    "control": "object"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Steps. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { current: 1, items: [{ title: 'Capture' }, { title: 'Build' }, { title: 'Ship' }] } };

export const Matrix = {
  name: 'Matrix / Current',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Steps {...args} current={0} items={[{ title: 'Capture' }, { title: 'Build' }, { title: 'Ship' }]} />
      <Steps {...args} current={2} items={[{ title: 'Capture' }, { title: 'Build' }, { title: 'Ship' }]} />
    </div>
  ),
};
