<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type EmptyStateVariant = "default" | "card" | "dashed" | "subtle";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    variant?: EmptyStateVariant;
    compact?: boolean;
    icon?: Snippet;
    actions?: Snippet;
    children?: Snippet;
  }

  let {
    title = "No items found",
    description = "",
    variant = "default",
    compact = false,
    icon,
    actions,
    children,
    class: customClass = "",
    ...restProps
  }: Props = $props();
</script>

<div
  class="plasma-empty-state plasma-empty-state--{variant} {customClass}"
  class:plasma-empty-state--compact={compact}
  {...restProps}
>
  <div class="plasma-empty-state-icon">
    {#if icon}
      {@render icon()}
    {:else}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    {/if}
  </div>

  {#if title}
    <h3 class="plasma-empty-state-title">{title}</h3>
  {/if}

  {#if description}
    <p class="plasma-empty-state-desc">{description}</p>
  {/if}

  {#if children}
    <div class="plasma-empty-state-content">
      {@render children()}
    </div>
  {/if}

  {#if actions}
    <div class="plasma-empty-state-actions">
      {@render actions()}
    </div>
  {/if}
</div>

<style>
  .plasma-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--plasma-space-xl) var(--plasma-space-lg);
    box-sizing: border-box;
    font-family: var(--plasma-font-sans);
    color: var(--plasma-color-text);
    width: 100%;
  }

  .plasma-empty-state--compact {
    padding: var(--plasma-space-lg) var(--plasma-space-md);
  }

  /* --------------------------------------------------------------------------
     Variants
     -------------------------------------------------------------------------- */
  .plasma-empty-state--card {
    background-color: var(--plasma-color-surface);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-xl);
    box-shadow: var(--plasma-shadow-xs);
  }

  .plasma-empty-state--dashed {
    background-color: var(--plasma-color-surface-sunken);
    border: 2px dashed var(--plasma-color-border);
    border-radius: var(--plasma-radius-xl);
  }

  .plasma-empty-state--subtle {
    background-color: transparent;
  }

  /* --------------------------------------------------------------------------
     Sections
     -------------------------------------------------------------------------- */
  .plasma-empty-state-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--plasma-space-md);
    color: var(--plasma-color-text-muted);
    opacity: 0.75;
  }

  .plasma-empty-state--compact .plasma-empty-state-icon {
    margin-bottom: var(--plasma-space-sm);
  }

  .plasma-empty-state-title {
    margin: 0 0 var(--plasma-space-xs) 0;
    font-size: var(--plasma-font-size-lg);
    font-weight: var(--plasma-font-weight-bold);
    color: var(--plasma-color-text);
  }

  .plasma-empty-state--compact .plasma-empty-state-title {
    font-size: var(--plasma-font-size-base);
  }

  .plasma-empty-state-desc {
    margin: 0;
    max-width: 440px;
    font-size: var(--plasma-font-size-sm);
    color: var(--plasma-color-text-muted);
    line-height: var(--plasma-line-height-base);
  }

  .plasma-empty-state-content {
    margin-top: var(--plasma-space-md);
    width: 100%;
  }

  .plasma-empty-state-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--plasma-space-sm);
    margin-top: var(--plasma-space-lg);
    flex-wrap: wrap;
  }

  .plasma-empty-state--compact .plasma-empty-state-actions {
    margin-top: var(--plasma-space-md);
  }
</style>
