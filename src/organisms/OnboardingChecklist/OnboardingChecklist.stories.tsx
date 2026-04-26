import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingChecklistShowcase } from './OnboardingChecklist.showcase';

const meta: Meta = {
  title: 'Organisms/OnboardingChecklist',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <OnboardingChecklistShowcase /> };
