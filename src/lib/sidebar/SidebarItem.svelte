<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
    id?: string;
    label?: string;
    active?: boolean;
    disabled?: boolean;
    href?: string;
    icon?: Snippet;
    badge?: string | number;
    children?: Snippet;
    onclick?: (e: MouseEvent) => void;
  }

  let {
    id = "",
    label = "",
    active = false,
    disabled = false,
    href,
    icon,
    badge,
    children,
    class: customClass = "",
    onclick,
    ...restProps
  }: Props = $props();

  function handleClick(e: MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onclick?.(e);
  }
</script>

{#if href}
  <a
    {href}
    class="plasma-sidebar-item {customClass}"
    class:plasma-sidebar-item--active={active}
    class:plasma-sidebar-item--disabled={disabled}
    aria-current={active ? "page" : undefined}
    aria-disabled={disabled}
    onclick={handleClick}
    {...restProps}
  >
    {#if icon}
      <span class="plasma-sidebar-item-icon">
        {@render icon()}
      </span>
    {/if}

    <span class="plasma-sidebar-item-label">
      {#if children}
        {@render children()}
      {:else}
        {label}
      {/if}
    </span>

    {#if badge !== undefined}
      <span class="plasma-sidebar-item-badge">{badge}</span>
    {/if}
  </a>
{:else}
  <button
    type="button"
    class="plasma-sidebar-item {customClass}"
    class:plasma-sidebar-item--active={active}
    class:plasma-sidebar-item--disabled={disabled}
    aria-pressed={active}
    {disabled}
    onclick={handleClick}
    {...restProps}
  >
    {#if icon}
      <span class="plasma-sidebar-item-icon">
        {@render icon()}
      </span>
    {/if}

    <span class="plasma-sidebar-item-label">
      {#if children}
        {@render children()}
      {:else}
        {label}
      {/if}
    </span>

    {#if badge !== undefined}
      <span class="plasma-sidebar-item-badge">{badge}</span>
    {/if}
  </button>
{/if}

<style>
  .plasma-sidebar-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--plasma-space-sm);
    width: 100%;
    padding: 7px var(--plasma-space-md);
    border: none;
    border-radius: var(--plasma-radius-md);
    background: transparent;
    font-family: var(--plasma-font-sans);
    font-size: var(--plasma-font-size-base);
    color: var(--plasma-color-text);
    text-decoration: none;
    text-align: left;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    transition: var(--plasma-transition-fast);
  }

  .plasma-sidebar-item:hover:not(.plasma-sidebar-item--disabled) {
    background-color: var(--plasma-color-surface-hover);
  }

  /* Active KDE Breeze Row Indicator */
  .plasma-sidebar-item--active {
    background-color: var(--plasma-color-highlight-soft);
    color: var(--plasma-color-highlight);
    font-weight: var(--plasma-font-weight-medium);
  }

  .plasma-sidebar-item--active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 3px;
    border-radius: var(--plasma-radius-full);
    background-color: var(--plasma-color-highlight);
  }

  .plasma-sidebar-item--active .plasma-sidebar-item-icon {
    color: var(--plasma-color-highlight);
  }

  .plasma-sidebar-item--disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .plasma-sidebar-item-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    color: var(--plasma-color-text-muted);
    flex-shrink: 0;
  }

  .plasma-sidebar-item-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .plasma-sidebar-item-badge {
    padding: 1px 6px;
    font-size: 11px;
    font-weight: var(--plasma-font-weight-bold);
    border-radius: var(--plasma-radius-full);
    background-color: var(--plasma-color-surface-sunken);
    color: var(--plasma-color-text-muted);
    border: 1px solid var(--plasma-color-border-subtle);
  }

  .plasma-sidebar-item--active .plasma-sidebar-item-badge {
    background-color: var(--plasma-color-highlight);
    color: #ffffff;
    border-color: transparent;
  }
</style>
