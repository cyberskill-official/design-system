import type { StorybookConfig } from '@storybook/react-vite';

/**
 * Storybook 10 — addon-essentials and addon-interactions are now in the core package.
 * We only declare the genuinely separate addons.
 */
const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: { name: '@storybook/react-vite', options: {} },
  staticDirs: ['../public'],
  typescript: { reactDocgen: 'react-docgen-typescript' },
};

export default config;
