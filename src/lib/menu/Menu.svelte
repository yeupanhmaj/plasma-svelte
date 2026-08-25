<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type MenuPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    inline?: boolean;
    placement?: MenuPlacement;
    trigger?: Snippet;
    children?: Snippet;
    onclose?: () => void;
  }

  let {
    open = $bindable(false),
    inline = false,
    placement = "bottom-start",
    trigger,
    children,
    onclose,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  let containerEl = $state<HTMLDivElement | null>(null);

  function toggle() {
    open = !open;
    if (!open) onclose?.();
  }

  function handleWindowClick(e: MouseEvent) {
    if (
      !inline &&
      open &&
      containerEl &&
      !containerEl.contains(e.target as Node)
    ) {
      open = false;
      onclose?.();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!inline && open && e.key === "Escape") {
      e.stopPropagation();
      open = false;
      onclose?.();
    }
  }
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleKeydown} />

<div
  bind:this={containerEl}
  class="plasma-menu-wrapper {customClass}"
  class:plasma-menu-wrapper--inline={inline}
  {...restProps}
>
  {#if trigger}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- biome-ignore lint/a11y/noStaticElementInteractions: trigger slot wrapper -->
    <div class="plasma-menu-trigger" onclick={toggle} onkeydown={() => {}}>
      {@render trigger()}
    </div>
  {/if}

  {#if open || inline}
    <ul
      role="menu"
      class="plasma-menu plasma-menu--{placement}"
      class:plasma-menu--static={inline}
    >
      {@render children?.()}
    </ul>
  {/if}
</div>

<style>
  .plasma-menu-wrapper {
    position: relative;
    display: inline-flex;
    box-sizing: border-box;
  }

  .plasma-menu-wrapper--inline {
    width: auto;
  }

  .plasma-menu-trigger {
    display: inline-flex;
  }

  /* --------------------------------------------------------------------------
     Floating Menu Panel (KDE Breeze QMenu)
     -------------------------------------------------------------------------- */
  .plasma-menu {
    position: absolute;
    z-index: 1000;
    min-width: 180px;
    max-width: 320px;
    margin: 0;
    padding: 4px;
    list-style: none;
    background-color: var(--plasma-color-surface);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-md);
    box-shadow: var(--plasma-shadow-md);
    animation: plasma-menu-pop var(--plasma-duration-fast)
      var(--plasma-ease-default);
    box-sizing: border-box;
  }

  .plasma-menu--static {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    z-index: auto;
    animation: none;
  }

  /* Placements */
  .plasma-menu--bottom-start {
    top: calc(100% + 4px);
    left: 0;
  }
  .plasma-menu--bottom-end {
    top: calc(100% + 4px);
    right: 0;
  }
  .plasma-menu--top-start {
    bottom: calc(100% + 4px);
    left: 0;
  }
  .plasma-menu--top-end {
    bottom: calc(100% + 4px);
    right: 0;
  }

  @keyframes plasma-menu-pop {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-4px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
</style>
