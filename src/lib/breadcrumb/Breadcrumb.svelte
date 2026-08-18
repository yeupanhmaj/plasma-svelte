<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLElement> {
    separator?: string | Snippet;
    children?: Snippet;
  }

  let {
    separator,
    children,
    class: customClass = "",
    ...restProps
  }: Props = $props();
</script>

<nav
  aria-label="Breadcrumb"
  class="plasma-breadcrumb {customClass}"
  {...restProps}
>
  <ol class="plasma-breadcrumb-list">
    {@render children?.()}
  </ol>
</nav>

<style>
  .plasma-breadcrumb {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
  }

  .plasma-breadcrumb-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2px;
    margin: 0;
    padding: 2px 6px;
    list-style: none;
    background-color: var(--plasma-color-view-bg);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-md);
  }

  /* Default Dolphin Chevron Separator */
  :global(.plasma-breadcrumb-list > li + li::before) {
    content: "›";
    display: inline-block;
    padding: 0 4px;
    font-size: 14px;
    font-weight: bold;
    color: var(--plasma-color-text-muted);
    opacity: 0.7;
    user-select: none;
  }
</style>
