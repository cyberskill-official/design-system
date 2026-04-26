import type { Meta, StoryObj } from '@storybook/react';
import { AppHeaderShowcase } from './AppHeader.showcase';

const meta: Meta = {
  title: 'Organisms/AppHeader',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <AppHeaderShowcase /> };
