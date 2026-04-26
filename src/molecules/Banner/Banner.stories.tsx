import type { Meta, StoryObj } from '@storybook/react';
import { Banner, type BannerTone } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Molecules/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: { tone: { control: 'select', options: ['info','success','warning','danger'] satisfies BannerTone[] } },
  args: { tone: 'info', title: 'Heads up', children: 'Your trial ends in 5 days.' },
};
export default meta;
type S = StoryObj<typeof Banner>;

export const Info: S = { args: { tone: 'info' } };
export const Success: S = { args: { tone: 'success', title: 'Saved.', children: 'Changes saved 2 minutes ago.' } };
export const Warning: S = { args: { tone: 'warning', title: 'Quota at 87%.', children: 'Consider upgrading before you hit the limit.' } };
export const Danger: S = { args: { tone: 'danger', title: 'Couldn\'t reach our servers.', children: 'Retrying… req-9k2m.' } };
export const Dismissable: S = { args: { onDismiss: () => alert('dismissed') } };
