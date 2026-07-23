import React from 'react';

/**
 * Host helper: iframe a portable HTML surface from the repo tree.
 * Paths are site-root absolute so they work when Storybook is served at `/`
 * (production + `build:site`) and via staticDirs during `npm run storybook`.
 */
export function IframeSurface({ src, title, fullBleed }) {
  const height = fullBleed ? '100vh' : 'calc(100vh - 2rem)';
  return (
    <iframe
      src={src}
      title={title || src}
      style={{
        width: '100%',
        height,
        minHeight: fullBleed ? '100vh' : 640,
        border: 0,
        borderRadius: fullBleed ? 0 : 8,
        display: 'block',
        background: 'var(--cs-color-surface-page, #fffdf8)',
      }}
    />
  );
}
