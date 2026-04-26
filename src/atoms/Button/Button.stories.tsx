import type { Meta, StoryObj } from '@storybook/react';
import { Button, type ButtonVariant, type ButtonSize } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'accent', 'danger', 'ghost'] satisfies ButtonVariant[] },
    size:    { control: 'radio',  options: ['sm', 'md', 'lg'] satisfies ButtonSize[] },
    loading: { control: 'boolean' },
    disabled:{ control: 'boolean' },
    fullWidth: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { children: 'Save changes', variant: 'primary', size: 'md' },
};
export default meta;

type S = StoryObj<typeof Button>;

export const Primary:   S = { args: { variant: 'primary' } };
export const Secondary: S = { args: { variant: 'secondary' } };
export const Tertiary:  S = { args: { variant: 'tertiary' } };
export const Accent:    S = { args: { variant: 'accent', children: 'Upgrade plan' } };
export const Danger:    S = { args: { variant: 'danger', children: 'Delete workspace' } };
export const Ghost:     S = { args: { variant: 'ghost', children: 'Cancel' } };

export const Loading:   S = { args: { loading: true } };
export const Disabled:  S = { args: { disabled: true } };

export const VariantsMatrix: S = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-cs4">
      {(['primary','secondary','tertiary','accent','danger','ghost'] as ButtonVariant[]).map(v => (
        <div key={v} className="flex gap-cs2 items-center">
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted w-24">{v}</span>
          {(['sm','md','lg'] as ButtonSize[]).map(s => (
            <Button key={s} variant={v} size={s}>Button {s.toUpperCase()}</Button>
          ))}
          <Button variant={v} disabled>Disabled</Button>
        </div>
      ))}
    </div>
  ),
};
