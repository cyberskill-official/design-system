import type { Meta, StoryObj } from '@storybook/react';
import { EmptyStateShowcase } from './EmptyState.showcase';

const meta: Meta = {
  title: 'Organisms/EmptyState',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <EmptyStateShowcase /> };
