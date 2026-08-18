<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLLIElement> {
    href?: string;
    active?: boolean;
    disabled?: boolean;
    icon?: Snippet;
    children?: Snippet;
    label?: string;
    onclick?: (e: MouseEvent) => void;
  }

  let {
    href,
    active = false,
    disabled = false,
    icon,
    children,
    label = "",
    class: customClass = "",
    onclick,
    ...restProps
  }: Props = $props();

  function handleClick(e: MouseEvent) {
    if (disabled || active) {
      e.preventDefault();
      return;
    }
    onclick?.(e);
  }
</script>

<li
  class="plasma-breadcrumb-item {customClass}"
  class:plasma-breadcrumb-item--active={active}
  class:plasma-breadcrumb-item--disabled={disabled}
  aria-current={active ? "page" : undefined}
  {...restProps}
>
  {#if href && !active}
    <a
      {href}
      class="plasma-breadcrumb-link"
      onclick={handleClick}
    >
      {#if icon}
        <span class="plasma-breadcrumb-icon">
          {@render icon()}
        </span>
      {/if}
      <span>
        {#if children}
          {@render children()}
        {:else}
          {label}
        {/if}
      </span>
    </a>
  {:else if !active}
    <button
      type="button"
      {disabled}
      class="plasma-breadcrumb-btn"
      onclick={handleClick}
    >
      {#if icon}
        <span class="plasma-breadcrumb-icon">
          {@render icon()}
        </span>
      {/if}
      <span>
        {#if children}
          {@render children()}
        {:else}
          {label}
        {/if}
      </span>
    </button>
  {:else}
    <span class="plasma-breadcrumb-current">
      {#if icon}
        <span class="plasma-breadcrumb-icon">
          {@render icon()}
        </span>
      {/if}
      <span>
        {#if children}
          {@render children()}
        {:else}
          {label}
        {/if}
      </span>
    </span>
  {/if}
</li>

<style>
  .plasma-breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--plasma-font-sans);
    font-size: var(--plasma-font-size-sm);
  }

  .plasma-breadcrumb-link,
  .plasma-breadcrumb-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    border: none;
    border-radius: var(--plasma-radius-sm);
    background: transparent;
    color: var(--plasma-color-text-muted);
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    transition: var(--plasma-transition-fast);
  }

  .plasma-breadcrumb-link:hover,
  .plasma-breadcrumb-btn:hover:not(:disabled) {
    background-color: var(--plasma-color-surface-hover);
    color: var(--plasma-color-highlight);
  }

  .plasma-breadcrumb-current {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px;
    color: var(--plasma-color-text);
    font-weight: var(--plasma-font-weight-bold);
  }

  .plasma-breadcrumb-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    flex-shrink: 0;
  }

  .plasma-breadcrumb-item--disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
</style>
