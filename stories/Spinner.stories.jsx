import { Spinner } from '../components/feedback/Spinner.jsx';

export default {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
  "size": {
    "control": "number"
  },
  "label": {
    "control": "text"
  },
  "loading": {
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

export const Default = { args: { size: 24 } };

export const States = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Spinner {...args}>Default</Spinner>
      
      <Spinner {...args} loading>Loading</Spinner>
    </div>
  ),
};
