<script lang="ts">
  import { getAppShellContext } from "./context.svelte.js";
  import type { BurgerProps } from "./types.js";

  let {
    opened,
    size = "md",
    target = "navbar",
    transitionDuration = "200ms",
    onclick,
    class: customClass = "",
    style = "",
    ...restProps
  }: BurgerProps = $props();

  const ctx = getAppShellContext();

  let isOpen = $derived(
    opened !== undefined
      ? opened
      : ctx
        ? target === "aside"
          ? ctx.asideOpen
          : ctx.isMobile
            ? ctx.navbarOpen
            : ctx.navbarCollapsed
        : false,
  );

  function handleClick(e: MouseEvent) {
    if (onclick) {
      onclick(e);
    }
    if (ctx && !e.defaultPrevented && opened === undefined) {
      if (target === "aside") {
        ctx.toggleAside();
      } else {
        if (ctx.isMobile) {
          ctx.toggleNavbar();
        } else {
          ctx.toggleNavbarCollapse();
        }
      }
    }
  }
</script>

<button
  type="button"
  class="plasma-appshell-burger plasma-appshell-burger--{size} {customClass}"
  class:plasma-appshell-burger--open={isOpen}
  style="--plasma-burger-transition: {transitionDuration}; {style}"
  aria-label={isOpen ? "Close navigation" : "Open navigation"}
  aria-expanded={isOpen}
  onclick={handleClick}
  {...restProps}
>
  <span class="plasma-appshell-burger-box">
    <span class="plasma-appshell-burger-line plasma-appshell-burger-line--top"
    ></span>
    <span
      class="plasma-appshell-burger-line plasma-appshell-burger-line--middle"
    ></span>
    <span
      class="plasma-appshell-burger-line plasma-appshell-burger-line--bottom"
    ></span>
  </span>
</button>

<style>
  .plasma-appshell-burger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--plasma-radius-md, 5px);
    color: var(--plasma-color-text);
    cursor: pointer;
    padding: 0;
    box-sizing: border-box;
    transition: var(--plasma-transition-fast);
    user-select: none;
  }

  .plasma-appshell-burger:hover {
    background-color: var(--plasma-color-surface-hover);
    border-color: var(--plasma-color-border-subtle);
  }

  .plasma-appshell-burger:focus-visible {
    outline: 2px solid var(--plasma-color-highlight);
    outline-offset: 1px;
  }

  /* Sizes */
  .plasma-appshell-burger--sm {
    width: 28px;
    height: 28px;
  }
  .plasma-appshell-burger--sm .plasma-appshell-burger-box {
    width: 14px;
    height: 12px;
  }

  .plasma-appshell-burger--md {
    width: 32px;
    height: 32px;
  }
  .plasma-appshell-burger--md .plasma-appshell-burger-box {
    width: 18px;
    height: 14px;
  }

  .plasma-appshell-burger--lg {
    width: 38px;
    height: 38px;
  }
  .plasma-appshell-burger--lg .plasma-appshell-burger-box {
    width: 22px;
    height: 16px;
  }

  .plasma-appshell-burger-box {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .plasma-appshell-burger-line {
    display: block;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    border-radius: 1px;
    transition:
      transform var(--plasma-burger-transition, 200ms) ease,
      opacity var(--plasma-burger-transition, 200ms) ease;
    transform-origin: center;
  }

  /* Open animation: transform to X */
  .plasma-appshell-burger--open .plasma-appshell-burger-line--top {
    transform: translateY(6px) rotate(45deg);
  }

  .plasma-appshell-burger--open.plasma-appshell-burger--sm
    .plasma-appshell-burger-line--top {
    transform: translateY(5px) rotate(45deg);
  }

  .plasma-appshell-burger--open.plasma-appshell-burger--lg
    .plasma-appshell-burger-line--top {
    transform: translateY(7px) rotate(45deg);
  }

  .plasma-appshell-burger--open .plasma-appshell-burger-line--middle {
    opacity: 0;
    transform: scaleX(0);
  }

  .plasma-appshell-burger--open .plasma-appshell-burger-line--bottom {
    transform: translateY(-6px) rotate(-45deg);
  }

  .plasma-appshell-burger--open.plasma-appshell-burger--sm
    .plasma-appshell-burger-line--bottom {
    transform: translateY(-5px) rotate(-45deg);
  }

  .plasma-appshell-burger--open.plasma-appshell-burger--lg
    .plasma-appshell-burger-line--bottom {
    transform: translateY(-7px) rotate(-45deg);
  }
</style>
