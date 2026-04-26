import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '@atoms/Button';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: ['default','accent','inset','elevated'] } },
  args: {
    variant: 'default',
    children: (
      <>
        <h3 className="mt-0 font-bold text-md mb-1">Card heading</h3>
        <p className="text-text-muted text-sm">Standard surface for grouped content.</p>
        <div className="mt-cs3"><Button size="sm">Action</Button></div>
      </>
    ),
  },
};
export default meta;
type S = StoryObj<typeof Card>;

export const Default: S = {};
export const Accent: S = { args: { variant: 'accent' } };
export const Inset: S = { args: { variant: 'inset' } };
export const Elevated: S = { args: { variant: 'elevated' } };
