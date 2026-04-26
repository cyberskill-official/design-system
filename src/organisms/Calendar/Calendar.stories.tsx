import type { Meta, StoryObj } from '@storybook/react';
import { CalendarShowcase } from './Calendar.showcase';

const meta: Meta = {
  title: 'Organisms/Calendar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <CalendarShowcase /> };
