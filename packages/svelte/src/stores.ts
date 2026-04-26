/**
 * Svelte 5+ runes-style adapters for @cyberskill/primitives.
 */

import { createDisclosure } from '@cyberskill/primitives/disclosure';

export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * Returns a runes-friendly object. Consumers can wrap in $state in their
 * components to make Svelte aware of changes:
 *
 *   const d = useDisclosure();
 *   let isOpen = $state(d.state.isOpen);
 *   d.subscribe(() => { isOpen = d.state.isOpen; });
 */
export function useDisclosure(options: UseDisclosureOptions = {}) {
  return createDisclosure(options);
}
