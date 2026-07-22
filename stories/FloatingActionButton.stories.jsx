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
        component: 'Host Live CSF — Default plus honest control matrix mounting FloatingActionButton. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { 'aria-label': 'New wish', children: '+' } };

export const Matrix = {
  name: 'Matrix / Labels',
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <FloatingActionButton {...args} aria-label="Add">+</FloatingActionButton>
      <FloatingActionButton {...args} aria-label="Wish">✦</FloatingActionButton>
    </div>
  ),
};
