/**
 * createFocusTrap — restricts keyboard focus to a container while active.
 * Used by: <Modal>, <Drawer>, <Popover> when modal=true.
 *
 * Phase 2 Wave 1 skeleton — full implementation in Wave 2.
 */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function createFocusTrap(container, options = {}) {
  if (!container || typeof container.querySelectorAll !== 'function') {
    throw new Error('createFocusTrap: container must be an Element');
  }

  let active = false;
  let previouslyFocused = null;

  function getFocusable() {
    return Array.from(container.querySelectorAll(FOCUSABLE));
  }

  function onKeyDown(e) {
    if (!active) return;
    if (e.key === 'Escape' && options.closeOnEscape !== false) {
      options.onEscape?.();
      return;
    }
    if (e.key !== 'Tab') return;
    const f = getFocusable();
    if (f.length === 0) return;
    const first = f[0];
    const last = f[f.length - 1];
    const current = container.ownerDocument?.activeElement;
    if (e.shiftKey && current === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && current === last) {
      first.focus();
      e.preventDefault();
    }
  }

  function activate() {
    if (active) return;
    active = true;
    previouslyFocused = container.ownerDocument?.activeElement ?? null;
    container.ownerDocument?.addEventListener('keydown', onKeyDown);
    const f = getFocusable();
    if (f.length > 0) f[0].focus();
  }

  function deactivate() {
    if (!active) return;
    active = false;
    container.ownerDocument?.removeEventListener('keydown', onKeyDown);
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus();
    }
  }

  return { activate, deactivate, get isActive() { return active; } };
}
