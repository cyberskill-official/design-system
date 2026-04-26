<!--
  Button.svelte — Svelte 5+ runes wrapper around <cs-button>.
  Translates the underlying cs-click event into Svelte's onclick.
-->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface Props {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'danger-ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    onclick?: () => void;
    children?: import('svelte').Snippet;
    iconLeading?: import('svelte').Snippet;
    iconTrailing?: import('svelte').Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onclick,
    children,
    iconLeading,
    iconTrailing,
  }: Props = $props();

  let el: HTMLElement | undefined = $state();

  const handler = () => onclick?.();

  onMount(() => {
    el?.addEventListener('cs-click', handler);
  });

  onDestroy(() => {
    el?.removeEventListener('cs-click', handler);
  });
</script>

<cs-button
  bind:this={el}
  variant={variant}
  size={size}
  disabled={disabled || undefined}
  loading={loading || undefined}
>
  {#if iconLeading}<span slot="icon-leading">{@render iconLeading()}</span>{/if}
  {@render children?.()}
  {#if iconTrailing}<span slot="icon-trailing">{@render iconTrailing()}</span>{/if}
</cs-button>
