import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup, type AvatarSize } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: { size: { control: 'radio', options: ['sm','md','lg','xl'] satisfies AvatarSize[] } },
  args: { initials: 'SC', size: 'md' },
};
export default meta;
type S = StoryObj<typeof Avatar>;

export const Initials: S = {};
export const AllSizes: S = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-cs3">
      {(['sm','md','lg','xl'] as AvatarSize[]).map(s => <Avatar key={s} size={s} initials="SC" />)}
    </div>
  ),
};
export const Group: S = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AvatarGroup max={3}>
      <Avatar initials="LN" />
      <Avatar initials="TT" />
      <Avatar initials="HV" />
      <Avatar initials="MA" />
      <Avatar initials="QN" />
    </AvatarGroup>
  ),
};
