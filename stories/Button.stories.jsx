import { Button } from '../components/button/Button.jsx';
import { Icon } from '../components/icon/Icon.jsx';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger', 'danger-ghost'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export const Primary = {
  args: {
    children: 'Make a wish',
    variant: 'primary',
    size: 'md',
  },
};

export const WithIcon = {
  render: (args) => (
    <Button {...args} icon={<Icon name="sparkle" size="sm" />}>
      {args.children}
    </Button>
  ),
  args: {
    children: 'Make a wish',
    variant: 'primary',
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
