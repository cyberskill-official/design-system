import type { Meta, StoryObj } from '@storybook/react';
import { ColourShowcase } from './Colour.showcase';

const meta: Meta = {
  title: 'Atoms/Colour',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <ColourShowcase /> };
