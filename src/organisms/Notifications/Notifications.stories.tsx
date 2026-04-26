import type { Meta, StoryObj } from '@storybook/react';
import { NotificationsShowcase } from './Notifications.showcase';

const meta: Meta = {
  title: 'Organisms/Notifications',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <NotificationsShowcase /> };
