import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';

const meta: Meta<typeof Field> = {
  title: 'Molecules/Field',
  component: Field,
  tags: ['autodocs'],
  args: { label: 'Workspace name', placeholder: 'Acme Corp', helper: 'Lowercase letters, numbers, hyphens only.' },
};
export default meta;
type S = StoryObj<typeof Field>;

export const Default: S = {};
export const Required: S = { args: { required: true } };
export const WithError: S = { args: { error: 'Email must include an @.', defaultValue: 'invalid-email', type: 'email' } };
