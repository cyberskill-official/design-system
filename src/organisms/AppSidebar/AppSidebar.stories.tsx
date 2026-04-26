import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebarShowcase } from './AppSidebar.showcase';

const meta: Meta = {
  title: 'Organisms/AppSidebar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <AppSidebarShowcase /> };
