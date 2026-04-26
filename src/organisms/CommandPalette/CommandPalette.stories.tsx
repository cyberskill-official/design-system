import type { Meta, StoryObj } from '@storybook/react';
import { CommandPaletteShowcase } from './CommandPalette.showcase';

const meta: Meta = {
  title: 'Organisms/CommandPalette',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <CommandPaletteShowcase /> };
