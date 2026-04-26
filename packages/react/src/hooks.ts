/**
 * React hook wrappers around @cyberskill/primitives.
 *
 * Each hook adapts a primitive's `create*` factory to React's reactivity.
 * The underlying behaviour is identical — these add React-idiomatic state.
 */

import { useState, useEffect, useMemo } from 'react';
import { createDisclosure } from '@cyberskill/primitives/disclosure';

export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  // Memoise the primitive — created once per component instance
  const d = useMemo(() => createDisclosure(options), []);
  const [, force] = useState({});

  useEffect(() => {
    return d.subscribe(() => force({}));
  }, [d]);

  return {
    isOpen: d.state.isOpen,
    open: d.open,
    close: d.close,
    toggle: d.toggle,
    triggerProps: d.props.trigger,
    contentProps: d.props.content,
  };
}
