<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type TooltipPosition = "top" | "bottom" | "left" | "right";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    text?: string;
    position?: TooltipPosition;
    content?: Snippet;
    children?: Snippet;
  }

  let {
    text = "",
    position = "top",
    content,
    children,
    class: customClass = "",
    ...restProps
  }: Props = $props();
</script>

<div class="plasma-tooltip-trigger {customClass}" {...restProps}>
  {@render children?.()}

  {#if text || content}
    <div
      role="tooltip"
      class="plasma-tooltip-bubble plasma-tooltip--{position}"
    >
      {#if content}
        {@render content()}
      {:else}
        {text}
      {/if}
    </div>
  {/if}
</div>

<style>
  .plasma-tooltip-trigger {
    position: relative;
    display: inline-flex;
  }

  /* --------------------------------------------------------------------------
     Tooltip Bubble
     -------------------------------------------------------------------------- */
  .plasma-tooltip-bubble {
    position: absolute;
    z-index: 1000;
    pointer-events: none;
    white-space: nowrap;
    padding: var(--plasma-space-xs) var(--plasma-space-sm);
    font-family: var(--plasma-font-sans);
    font-size: var(--plasma-font-size-xs);
    line-height: 1.2;
    color: var(--plasma-color-tooltip-text);
    background-color: var(--plasma-color-tooltip-bg);
    border: 1px solid var(--plasma-color-border-subtle);
    border-radius: var(--plasma-radius-sm);
    box-shadow: var(--plasma-shadow-md);
    opacity: 0;
    visibility: hidden;
    transform: scale(0.95);
    transition:
      opacity var(--plasma-duration-fast) var(--plasma-ease-default),
      transform var(--plasma-duration-fast) var(--plasma-ease-default),
      visibility var(--plasma-duration-fast);
  }

  .plasma-tooltip-trigger:hover .plasma-tooltip-bubble,
  .plasma-tooltip-trigger:focus-within .plasma-tooltip-bubble {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  /* --------------------------------------------------------------------------
     Positions
     -------------------------------------------------------------------------- */
  .plasma-tooltip--top {
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%) scale(0.95);
  }
  .plasma-tooltip-trigger:hover .plasma-tooltip--top,
  .plasma-tooltip-trigger:focus-within .plasma-tooltip--top {
    transform: translateX(-50%) scale(1);
  }

  .plasma-tooltip--bottom {
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%) scale(0.95);
  }
  .plasma-tooltip-trigger:hover .plasma-tooltip--bottom,
  .plasma-tooltip-trigger:focus-within .plasma-tooltip--bottom {
    transform: translateX(-50%) scale(1);
  }

  .plasma-tooltip--left {
    right: calc(100% + 6px);
    top: 50%;
    transform: translateY(-50%) scale(0.95);
  }
  .plasma-tooltip-trigger:hover .plasma-tooltip--left,
  .plasma-tooltip-trigger:focus-within .plasma-tooltip--left {
    transform: translateY(-50%) scale(1);
  }

  .plasma-tooltip--right {
    left: calc(100% + 6px);
    top: 50%;
    transform: translateY(-50%) scale(0.95);
  }
  .plasma-tooltip-trigger:hover .plasma-tooltip--right,
  .plasma-tooltip-trigger:focus-within .plasma-tooltip--right {
    transform: translateY(-50%) scale(1);
  }
</style>
