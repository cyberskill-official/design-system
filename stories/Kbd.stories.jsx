import { Kbd } from '../components/data/Kbd.jsx';

export default {
  title: 'Components/Data/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
  "className": {
    "control": "text",
    "description": "Optional className on root"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Kbd. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { children: '⌘K' } };

export const Matrix = {
  name: 'Matrix / Keys',
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Kbd {...args}>⌘K</Kbd>
      <Kbd {...args}>Esc</Kbd>
      <Kbd {...args}>Enter</Kbd>
    </div>
  ),
};
