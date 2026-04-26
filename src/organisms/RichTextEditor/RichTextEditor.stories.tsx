import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditorShowcase } from './RichTextEditor.showcase';

const meta: Meta = {
  title: 'Organisms/RichTextEditor',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <RichTextEditorShowcase /> };
