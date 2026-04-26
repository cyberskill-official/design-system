import type { Meta, StoryObj } from '@storybook/react';
import { FilterBarShowcase } from './FilterBar.showcase';

const meta: Meta = {
  title: 'Organisms/FilterBar',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <FilterBarShowcase /> };
