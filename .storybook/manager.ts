import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'CyberSkill Design System',
    brandUrl: '/',
    brandImage: '/logo-primary-umber.svg',
    brandTarget: '_self',
    colorPrimary: '#45210E',
    colorSecondary: '#F4BA17',
    appBg: '#FAF6F1',
    appContentBg: '#FFFFFF',
    textColor: '#2A1505',
    fontBase: '"Be Vietnam Pro", sans-serif',
    fontCode: '"JetBrains Mono", monospace',
  }),
});
