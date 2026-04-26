<!--
  Button.vue — Vue 3.5+ wrapper around <cs-button>.
  Auto-registers the custom element on first import.
  Translates the underlying cs-click event into Vue's @click.
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

defineOptions({ name: 'CSButton' });

interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'danger-ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const el = ref<HTMLElement | null>(null);

const handler = () => emit('click');

onMounted(() => {
  el.value?.addEventListener('cs-click', handler);
});

onUnmounted(() => {
  el.value?.removeEventListener('cs-click', handler);
});
</script>

<template>
  <cs-button
    ref="el"
    :variant="variant"
    :size="size"
    :disabled="disabled || undefined"
    :loading="loading || undefined"
  >
    <slot name="icon-leading" />
    <slot />
    <slot name="icon-trailing" />
  </cs-button>
</template>
