import type { Meta, StoryObj } from '@storybook/react';
import { DangerConfirmShowcase } from './DangerConfirm.showcase';

const meta: Meta = {
  title: 'Organisms/DangerConfirm',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <DangerConfirmShowcase /> };
