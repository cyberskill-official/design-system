import React from 'react';

/**
 * Host Live hub helper: iframe a portable HTML surface from the repo tree.
 * Paths are site-root absolute so they work under /playground/ packaging
 * and Storybook staticDirs during `npm run storybook`.
 */
export function IframeSurface({ src, title }) {
  return (
    <iframe
      src={src}
      title={title || src}
      style={{
        width: '100%',
        height: 'calc(100vh - 2rem)',
        minHeight: 640,
        border: 0,
        borderRadius: 8,
        background: 'var(--cs-color-surface-page, #fffdf8)',
      }}
    />
  );
}
