import type { Meta, StoryObj } from '@storybook/react';
import { LogoShowcase } from './Logo.showcase';

const meta: Meta = {
  title: 'Atoms/Logo',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <LogoShowcase /> };
