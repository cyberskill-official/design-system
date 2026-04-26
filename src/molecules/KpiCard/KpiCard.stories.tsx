import type { Meta, StoryObj } from '@storybook/react';
import { KpiCard } from './KpiCard';

const meta: Meta<typeof KpiCard> = {
  title: 'Molecules/KpiCard',
  component: KpiCard,
  tags: ['autodocs'],
  args: {
    label: 'MRR',
    value: '$48,200',
    trend: { direction: 'up', label: '12.4% vs last month', tone: 'success' },
    accent: true,
  },
};
export default meta;
type S = StoryObj<typeof KpiCard>;

export const Default: S = {};
export const NoAccent: S = { args: { accent: false } };
export const Negative: S = { args: { label: 'Churn', value: '3.4%', trend: { direction: 'up', label: '0.6%', tone: 'danger' }, accent: false } };
export const Flat: S = { args: { label: 'NPS', value: '62', trend: { direction: 'flat', label: 'no change', tone: 'muted' }, accent: false } };
