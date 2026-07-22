/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: [
    { from: '../fonts', to: '/fonts' },
    { from: '../assets', to: '/assets' },
  ],
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const react = (await import('@vitejs/plugin-react')).default;
    config.plugins = config.plugins || [];
    // Ensure React plugin is present for JSX in components/
    if (!config.plugins.some((p) => p && p.name === 'vite:react-babel')) {
      config.plugins.push(react());
    }
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@cs': new URL('../components', import.meta.url).pathname,
        },
      },
      // Storybook is a host-only playground — never required by portable consumers.
      server: { fs: { allow: ['..'] } },
    });
  },
};
export default config;
