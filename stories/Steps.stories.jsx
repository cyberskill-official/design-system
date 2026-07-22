import { Steps } from '../components/navigation/Steps.jsx';

export default {
  title: 'Components/Navigation/Steps',
  component: Steps,
  tags: ['autodocs'],
  argTypes: {
  "current": {
    "control": "number"
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

export const Default = { args: { current: 1, items: [{ title: 'Capture' }, { title: 'Build' }, { title: 'Ship' }] } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <Steps {...args} />
      <Steps {...args} disabled={true} />
    </div>
  ),
};
