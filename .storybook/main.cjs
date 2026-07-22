const path = require('node:path');
const fs = require('node:fs');

const repoRoot = path.resolve(__dirname, '..');

/** Serve/copy root portable files so Live/* iframes resolve /styles.css etc. */
function dsRootFilesPlugin() {
  const map = {
    '/styles.css': 'styles.css',
    '/_ds_bundle.js': '_ds_bundle.js',
    '/_ds_manifest.json': '_ds_manifest.json',
    '/image-slot.js': 'image-slot.js',
    '/VERSION': 'VERSION',
  };
  const mime = (rel) => {
    if (rel.endsWith('.css')) return 'text/css; charset=utf-8';
    if (rel.endsWith('.js')) return 'application/javascript; charset=utf-8';
    if (rel.endsWith('.json')) return 'application/json; charset=utf-8';
    return 'text/plain; charset=utf-8';
  };
  const attach = (server) => {
    server.middlewares.use((req, res, next) => {
      const url = (req.url || '').split('?')[0];
      const rel = map[url];
      if (!rel) return next();
      try {
        const data = fs.readFileSync(path.join(repoRoot, rel));
        res.statusCode = 200;
        res.setHeader('Content-Type', mime(rel));
        res.end(data);
      } catch {
        next();
      }
    });
  };
  return {
    name: 'ds-root-files',
    configureServer: attach,
    configurePreviewServer: attach,
    writeBundle(options) {
      const out = options.dir;
      if (!out) return;
      for (const [urlPath, rel] of Object.entries(map)) {
        const dest = path.join(out, urlPath.replace(/^\//, ''));
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(path.join(repoRoot, rel), dest);
      }
    },
  };
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
module.exports = {
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
    { from: '../base', to: '/base' },
    { from: '../tokens', to: '/tokens' },
    { from: '../guidelines', to: '/guidelines' },
    { from: '../templates', to: '/templates' },
    { from: '../ui_kits', to: '/ui_kits' },
    { from: '../components', to: '/components' },
  ],
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const react = (await import('@vitejs/plugin-react')).default;
    config.plugins = config.plugins || [];
    if (!config.plugins.some((p) => p && p.name === 'vite:react-babel')) {
      config.plugins.push(react());
    }
    config.plugins.push(dsRootFilesPlugin());
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@cs': path.join(repoRoot, 'components'),
        },
      },
      server: { fs: { allow: [repoRoot] } },
    });
  },
};
