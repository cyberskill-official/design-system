import type { Meta, StoryObj } from '@storybook/react';
import { BulkActionsShowcase } from './BulkActions.showcase';

const meta: Meta = {
  title: 'Organisms/BulkActions',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <BulkActionsShowcase /> };
