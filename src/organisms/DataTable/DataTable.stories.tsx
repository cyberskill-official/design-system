import type { Meta, StoryObj } from '@storybook/react';
import { DataTableShowcase } from './DataTable.showcase';

const meta: Meta = {
  title: 'Organisms/DataTable',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Showcase: StoryObj = { render: () => <DataTableShowcase /> };
