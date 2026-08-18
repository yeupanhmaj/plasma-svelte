<!-- biome-ignore-all lint/a11y/useFocusableInteractive: handled by menu -->
<!-- biome-ignore-all lint/a11y/useKeyWithClickEvents: handled by menu container -->
<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLLIElement> {
    label?: string;
    shortcut?: string;
    icon?: Snippet;
    disabled?: boolean;
    danger?: boolean;
    children?: Snippet;
  }

  let {
    label = "",
    shortcut = "",
    icon,
    disabled = false,
    danger = false,
    children,
    class: customClass = "",
    onclick,
    ...restProps
  }: Props = $props();

  function handleClick(e: MouseEvent) {
    if (disabled) {
      e.stopPropagation();
      return;
    }
    onclick?.(e as any);
  }
</script>

<li
  role="menuitem"
  aria-disabled={disabled}
  class="plasma-menu-item {customClass}"
  class:plasma-menu-item--disabled={disabled}
  class:plasma-menu-item--danger={danger}
  onclick={handleClick}
  {...restProps}
>
  {#if icon}
    <span class="plasma-menu-item-icon">
      {@render icon()}
    </span>
  {/if}

  <span class="plasma-menu-item-label">
    {#if children}
      {@render children()}
    {:else}
      {label}
    {/if}
  </span>

  {#if shortcut}
    <span class="plasma-menu-item-shortcut">{shortcut}</span>
  {/if}
</li>

<style>
  .plasma-menu-item {
    display: flex;
    align-items: center;
    gap: var(--plasma-space-sm);
    padding: 6px var(--plasma-space-sm);
    border-radius: var(--plasma-radius-sm);
    font-family: var(--plasma-font-sans);
    font-size: var(--plasma-font-size-base);
    color: var(--plasma-color-text);
    cursor: pointer;
    user-select: none;
    transition: var(--plasma-transition-fast);
  }

  .plasma-menu-item-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: var(--plasma-color-text-muted);
    flex-shrink: 0;
  }

  .plasma-menu-item-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .plasma-menu-item-shortcut {
    font-family: var(--plasma-font-mono);
    font-size: var(--plasma-font-size-xs);
    color: var(--plasma-color-text-muted);
    padding-left: var(--plasma-space-md);
  }

  /* Hover & Active States */
  .plasma-menu-item:hover:not(.plasma-menu-item--disabled) {
    background-color: var(--plasma-color-highlight);
    color: #ffffff;
  }

  .plasma-menu-item:hover:not(.plasma-menu-item--disabled) .plasma-menu-item-icon,
  .plasma-menu-item:hover:not(.plasma-menu-item--disabled) .plasma-menu-item-shortcut {
    color: rgba(255, 255, 255, 0.9);
  }

  /* Danger / Destructive Variant */
  .plasma-menu-item--danger:hover:not(.plasma-menu-item--disabled) {
    background-color: var(--plasma-color-negative);
    color: #ffffff;
  }

  /* Disabled */
  .plasma-menu-item--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
