import type { Meta, StoryObj } from '@storybook/react';
import { TokensShowcase } from './Tokens.showcase';

const meta: Meta = {
  title: 'Atoms/Tokens',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <TokensShowcase /> };
