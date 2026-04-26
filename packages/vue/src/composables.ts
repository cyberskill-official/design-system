/**
 * Vue composables — Vue-idiomatic adapters for @cyberskill/primitives.
 */

import { ref, onUnmounted, computed } from 'vue';
import { createDisclosure } from '@cyberskill/primitives/disclosure';

export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  const d = createDisclosure(options);
  const isOpen = ref(d.state.isOpen);

  const unsubscribe = d.subscribe(() => {
    isOpen.value = d.state.isOpen;
  });

  onUnmounted(unsubscribe);

  return {
    isOpen,
    open: d.open,
    close: d.close,
    toggle: d.toggle,
    triggerProps: computed(() => d.props.trigger),
    contentProps: computed(() => d.props.content),
  };
}
