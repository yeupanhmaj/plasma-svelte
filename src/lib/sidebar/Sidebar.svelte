<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLElement> {
    width?: string;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
  }

  let {
    width = "240px",
    header,
    footer,
    children,
    class: customClass = "",
    style = "",
    ...restProps
  }: Props = $props();
</script>

<aside
  class="plasma-sidebar {customClass}"
  style="width: {width}; {style}"
  {...restProps}
>
  {#if header}
    <div class="plasma-sidebar-header">
      {@render header()}
    </div>
  {/if}

  <nav class="plasma-sidebar-content">
    {@render children?.()}
  </nav>

  {#if footer}
    <div class="plasma-sidebar-footer">
      {@render footer()}
    </div>
  {/if}
</aside>

<style>
  .plasma-sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 320px;
    background-color: var(--plasma-color-surface);
    border-right: 1px solid var(--plasma-color-border-subtle);
    font-family: var(--plasma-font-sans);
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .plasma-sidebar-header {
    padding: var(--plasma-space-md);
    border-bottom: 1px solid var(--plasma-color-border-subtle);
  }

  .plasma-sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: var(--plasma-space-md) var(--plasma-space-sm);
    display: flex;
    flex-direction: column;
    scrollbar-width: thin;
    scrollbar-color: var(--plasma-color-border) transparent;
  }

  .plasma-sidebar-footer {
    padding: var(--plasma-space-md);
    border-top: 1px solid var(--plasma-color-border-subtle);
    background-color: var(--plasma-color-surface-sunken);
  }
</style>
