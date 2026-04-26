import type { Meta, StoryObj } from '@storybook/react';
import { RecordTimelineShowcase } from './RecordTimeline.showcase';

const meta: Meta = {
  title: 'Organisms/RecordTimeline',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <RecordTimelineShowcase /> };
