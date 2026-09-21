<script lang="ts">
  import { getAppShellContext } from "./context.svelte.js";
  import type { AsideProps } from "./types.js";

  let {
    width = "280px",
    collapsedWidth = "0px",
    collapsible = true,
    bordered = true,
    children,
    class: customClass = "",
    style = "",
    ...restProps
  }: AsideProps = $props();

  const ctx = getAppShellContext();

  let isCollapsed = $derived(ctx ? ctx.asideCollapsed : false);
  let isOpen = $derived(ctx ? ctx.asideOpen : true);
  let isMobile = $derived(ctx ? ctx.isMobile : false);
  let effectiveWidth = $derived(isCollapsed ? collapsedWidth : width);
</script>

<aside
  class="plasma-appshell-aside {customClass}"
  class:plasma-appshell-aside--bordered={bordered}
  class:plasma-appshell-aside--collapsed={isCollapsed}
  class:plasma-appshell-aside--mobile={isMobile}
  class:plasma-appshell-aside--open={isOpen}
  class:plasma-appshell-aside--collapsible={collapsible}
  style="--plasma-shell-aside-width: {effectiveWidth}; {style}"
  aria-label="Complementary Panel"
  {...restProps}
>
  <div class="plasma-appshell-aside-inner">
    {@render children?.()}
  </div>
</aside>

<style>
  .plasma-appshell-aside {
    grid-area: aside;
    width: var(--plasma-shell-aside-width, 280px);
    min-width: var(--plasma-shell-aside-width, 280px);
    max-width: var(--plasma-shell-aside-width, 280px);
    height: 100%;
    min-height: 0;
    background-color: var(--plasma-color-surface);
    color: var(--plasma-color-text);
    box-sizing: border-box;
    flex-shrink: 0;
    z-index: 85;
    display: flex;
    flex-direction: column;
  }

  .plasma-appshell-aside--collapsible {
    transition:
      width var(--plasma-duration-base) cubic-bezier(0.4, 0, 0.2, 1),
      min-width var(--plasma-duration-base) cubic-bezier(0.4, 0, 0.2, 1),
      max-width var(--plasma-duration-base) cubic-bezier(0.4, 0, 0.2, 1),
      transform var(--plasma-duration-base) cubic-bezier(0.4, 0, 0.2, 1);
  }

  .plasma-appshell-aside--bordered {
    border-left: 1px solid var(--plasma-color-border-subtle);
  }

  .plasma-appshell-aside-inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  /* Mobile drawer mode */
  .plasma-appshell-aside--mobile {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100dvh;
    z-index: 250;
    transform: translateX(100%);
    box-shadow: none;
  }

  .plasma-appshell-aside--mobile.plasma-appshell-aside--open {
    transform: translateX(0);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.25);
  }
</style>
