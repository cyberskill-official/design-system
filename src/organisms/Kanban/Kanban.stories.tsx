import type { Meta, StoryObj } from '@storybook/react';
import { KanbanShowcase } from './Kanban.showcase';

const meta: Meta = {
  title: 'Organisms/Kanban',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <KanbanShowcase /> };
