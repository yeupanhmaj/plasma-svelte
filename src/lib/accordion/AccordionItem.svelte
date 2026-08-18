<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "ontoggle"> {
    title?: string;
    open?: boolean;
    disabled?: boolean;
    icon?: Snippet;
    header?: Snippet;
    children?: Snippet;
    ontoggle?: (isOpen: boolean) => void;
  }


  let {
    title = "",
    open = $bindable(false),
    disabled = false,
    icon,
    header,
    children,
    ontoggle,
    class: customClass = "",
    id,
    ...restProps
  }: Props = $props();

  function toggle() {
    if (disabled) return;
    open = !open;
    ontoggle?.(open);
  }
</script>

<div
  class="plasma-accordion-item {customClass}"
  class:plasma-accordion-item--open={open}
  class:plasma-accordion-item--disabled={disabled}
  {...restProps}
>
  <button
    {id}
    type="button"
    aria-expanded={open}
    {disabled}
    onclick={toggle}
    class="plasma-accordion-header"
  >
    {#if icon}
      <span class="plasma-accordion-icon">
        {@render icon()}
      </span>
    {/if}

    <span class="plasma-accordion-title">
      {#if header}
        {@render header()}
      {:else}
        {title}
      {/if}
    </span>

    <span class="plasma-accordion-chevron">
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </span>
  </button>

  <div class="plasma-accordion-collapse" class:plasma-accordion-collapse--open={open}>
    <div class="plasma-accordion-content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>

<style>
  .plasma-accordion-item {
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-lg);
    background-color: var(--plasma-color-surface);
    overflow: hidden;
    transition: var(--plasma-transition-fast);
  }

  .plasma-accordion-item:hover:not(.plasma-accordion-item--disabled) {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-accordion-item--open {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-accordion-item--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* --------------------------------------------------------------------------
     Header Trigger Button
     -------------------------------------------------------------------------- */
  .plasma-accordion-header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: var(--plasma-space-md) var(--plasma-space-lg);
    background: transparent;
    border: none;
    outline: none;
    font-family: var(--plasma-font-sans);
    font-size: var(--plasma-font-size-base);
    color: var(--plasma-color-text);
    cursor: pointer;
    user-select: none;
    text-align: left;
    gap: var(--plasma-space-sm);
    transition: var(--plasma-transition-fast);
  }

  .plasma-accordion-header:hover:not(:disabled) {
    background-color: var(--plasma-color-surface-hover);
  }

  .plasma-accordion-header:focus-visible {
    outline: 2px solid var(--plasma-color-highlight);
    outline-offset: -2px;
  }

  .plasma-accordion-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--plasma-color-highlight);
    flex-shrink: 0;
  }

  .plasma-accordion-title {
    flex: 1;
    font-weight: var(--plasma-font-weight-medium);
  }

  .plasma-accordion-chevron {
    display: inline-flex;
    align-items: center;
    color: var(--plasma-color-text-muted);
    transition: transform var(--plasma-duration-base) var(--plasma-ease-default);
    flex-shrink: 0;
  }

  .plasma-accordion-item--open .plasma-accordion-chevron {
    transform: rotate(90deg);
  }

  /* --------------------------------------------------------------------------
     Collapsible Content Area (CSS Grid Height Transition)
     -------------------------------------------------------------------------- */
  .plasma-accordion-collapse {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--plasma-duration-base) var(--plasma-ease-default);
  }

  .plasma-accordion-collapse--open {
    grid-template-rows: 1fr;
    border-top: 1px solid var(--plasma-color-border-subtle);
  }

  .plasma-accordion-content {
    overflow: hidden;
    padding: 0 var(--plasma-space-lg);
    font-size: var(--plasma-font-size-sm);
    color: var(--plasma-color-text-muted);
    line-height: var(--plasma-line-height-base);
    background-color: var(--plasma-color-surface-sunken);
    transition: padding var(--plasma-duration-base) var(--plasma-ease-default);
  }

  .plasma-accordion-collapse--open .plasma-accordion-content {
    padding: var(--plasma-space-md) var(--plasma-space-lg);
  }
</style>
