import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'warm',
      values: [
        { name: 'warm',  value: '#FAF6F1' },
        { name: 'umber', value: '#1C0E04' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
    viewport: {
      viewports: {
        mobile:    { name: 'Mobile (375)',  styles: { width: '375px',  height: '812px' } },
        tablet:    { name: 'Tablet (768)',  styles: { width: '768px',  height: '1024px' } },
        laptop:    { name: 'Laptop (1280)', styles: { width: '1280px', height: '800px' } },
        desktop:   { name: 'Desktop (1440)',styles: { width: '1440px', height: '900px' } },
        wide:      { name: 'Wide (1920)',   styles: { width: '1920px', height: '1080px' } },
      },
    },
    options: {
      storySort: {
        order: ['Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark', hc: 'hc', sepia: 'sepia' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
  tags: ['autodocs'],
};

export default preview;
