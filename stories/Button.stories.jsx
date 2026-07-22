import { Button } from '../components/button/Button.jsx';

export default {
  title: 'Components/Button/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
  "variant": {
    "control": "select",
    "options": [
      "primary",
      "secondary",
      "tertiary",
      "ghost",
      "danger",
      "danger-ghost"
    ]
  },
  "size": {
    "control": "select",
    "options": [
      "xs",
      "sm",
      "md",
      "lg"
    ]
  },
  "loading": {
    "control": "boolean"
  },
  "disabled": {
    "control": "boolean"
  },
  "fullWidth": {
    "control": "boolean"
  },
  "icon": {
    "control": "object"
  },
  "type": {
    "control": "text"
  }
},
  parameters: {
    docs: {
      description: {
        component: 'Host Live CSF — Default plus honest control matrix mounting Button. Portable consumers use styles.css + bundle, not Storybook.',
      },
    },
  },
};

export const Default = { args: { children: 'Make a wish', variant: 'primary', size: 'md' } };

export const AllVariants = {
  name: 'Matrix / All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button {...args} variant="primary">primary</Button>
      <Button {...args} variant="secondary">secondary</Button>
      <Button {...args} variant="tertiary">tertiary</Button>
      <Button {...args} variant="ghost">ghost</Button>
      <Button {...args} variant="danger">danger</Button>
      <Button {...args} variant="danger-ghost">danger-ghost</Button>
      <Button {...args} loading>loading</Button>
      <Button {...args} disabled>disabled</Button>
    </div>
  ),
};
