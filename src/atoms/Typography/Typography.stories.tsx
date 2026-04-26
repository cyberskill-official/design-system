import type { Meta, StoryObj } from '@storybook/react';
import { TypographyShowcase } from './Typography.showcase';

const meta: Meta = {
  title: 'Atoms/Typography',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <TypographyShowcase /> };
