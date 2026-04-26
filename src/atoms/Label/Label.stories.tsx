import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  args: { children: 'Workspace name' },
};
export default meta;
type S = StoryObj<typeof Label>;

export const Default: S = {};
export const Required: S = { args: { required: true } };
