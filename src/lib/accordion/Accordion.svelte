<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let {
    children,
    class: customClass = "",
    ...restProps
  }: Props = $props();
</script>

<div class="plasma-accordion-group {customClass}" {...restProps}>
  {@render children?.()}
</div>

<style>
  .plasma-accordion-group {
    display: flex;
    flex-direction: column;
    gap: var(--plasma-space-sm);
    width: 100%;
    box-sizing: border-box;
  }
</style>
