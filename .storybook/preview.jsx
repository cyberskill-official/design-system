import '../styles.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: {
      storySort: {
        order: [
          'Intro',
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Elevation', 'Motion', 'Elements'],
          'Guidelines',
          ['Voice & Language', 'The Three Axes', 'Consuming'],
          'Components',
          'A11y',
          ['Focus ring', 'Touch targets', 'Reduced motion', 'Contrast (APCA)'],
          'I18n',
          'Live',
          ['Intro', 'Surfaces'],
          'Status',
          '*',
        ],
      },
    },
    docs: {
      description: {
        component:
          'Host Live hub only (single interactive site). Portable consumers still use styles.css + _ds_bundle.js / ESM — never Storybook.',
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'data-theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    element: {
      name: 'Element',
      description: 'Ngũ Hành product identity (data-cs-element + optional variant)',
      defaultValue: 'tho|',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'tho|', title: 'Thổ · studio' },
          { value: 'tho|clay', title: 'Thổ · clay' },
          { value: 'hoa|', title: 'Hỏa · ember' },
          { value: 'thuy|', title: 'Thủy · river' },
          { value: 'moc|', title: 'Mộc · leaf' },
          { value: 'kim|', title: 'Kim · champagne' },
        ],
        dynamicTitle: true,
      },
    },
    language: {
      name: 'Language',
      description: 'lang attribute (bilingual components)',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'vi', title: 'Tiếng Việt' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      const [element, variant] = String(context.globals.element || 'tho|').split('|');
      const language = context.globals.language || 'en';
      // Mirror production axes used across Atomic View / templates
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (theme === 'dark') root.setAttribute('data-theme', 'dark');
        else root.removeAttribute('data-theme');
      }
      return (
        <div
          data-theme={theme === 'dark' ? 'dark' : undefined}
          data-cs-element={element || undefined}
          data-cs-variant={variant || undefined}
          lang={language}
          style={{
            minHeight: '100%',
            padding: 16,
            background: 'var(--cs-color-surface-page)',
            color: 'var(--cs-color-text-primary)',
            fontFamily: 'var(--cs-font-family-ui)',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
