import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputSize: { control: 'radio', options: ['sm', 'md', 'lg'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { placeholder: 'Workspace name', inputSize: 'md' },
};
export default meta;
type S = StoryObj<typeof Input>;

export const Default: S = {};
export const Filled: S = { args: { defaultValue: 'Acme Corp' } };
export const Invalid: S = { args: { defaultValue: 'invalid-email', invalid: true, type: 'email' } };
export const Disabled: S = { args: { disabled: true } };
export const Sizes: S = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-cs2 max-w-sm">
      <Input inputSize="sm" placeholder="Small" />
      <Input inputSize="md" placeholder="Medium (default)" />
      <Input inputSize="lg" placeholder="Large" />
    </div>
  ),
};
