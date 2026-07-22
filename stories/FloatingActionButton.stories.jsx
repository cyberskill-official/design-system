import { FloatingActionButton } from '../components/button/FloatingActionButton.jsx';

export default {
  title: 'Components/Button/FloatingActionButton',
  component: FloatingActionButton,
  tags: ['autodocs'],
  argTypes: {
  "label": {
    "control": "text"
  },
  "position": {
    "control": "select",
    "options": [
      "fixed",
      "static"
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

export const Default = { args: { 'aria-label': 'New wish', children: '+' } };

export const Matrix = {
  name: 'Matrix / States',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
      <FloatingActionButton {...args} />
      <FloatingActionButton {...args} disabled={true} />
    </div>
  ),
};
