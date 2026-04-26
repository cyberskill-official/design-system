import type { Meta, StoryObj } from '@storybook/react';
import { Tag, type TagTone } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: { tone: { control: 'select', options: ['default','accent','success','warning','danger','info'] satisfies TagTone[] } },
  args: { children: 'Active', tone: 'default' },
};
export default meta;
type S = StoryObj<typeof Tag>;

export const Default: S = {};
export const Accent:  S = { args: { tone: 'accent', children: 'Featured' } };
export const Success: S = { args: { tone: 'success', children: 'Paid' } };
export const Warning: S = { args: { tone: 'warning', children: 'Pending' } };
export const Danger:  S = { args: { tone: 'danger', children: 'Overdue' } };
export const Info:    S = { args: { tone: 'info', children: 'Beta' } };

export const AllTones: S = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-cs2 flex-wrap">
      {(['default','accent','success','warning','danger','info'] as TagTone[]).map(t => (
        <Tag key={t} tone={t}>{t}</Tag>
      ))}
    </div>
  ),
};
