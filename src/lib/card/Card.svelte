<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type CardPadding = "none" | "sm" | "md" | "lg";
  type CardVariant = "default" | "flat" | "sunken" | "floating";
  type CardOrientation = "vertical" | "horizontal";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    padding?: CardPadding;
    orientation?: CardOrientation;
    hoverable?: boolean;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
    bodyClass?: string;
  }

  let {
    variant = "default",
    padding = "md",
    orientation = "vertical",
    hoverable = false,
    header,
    footer,
    children,
    class: customClass = "",
    bodyClass = "",
    ...restProps
  }: Props = $props();
</script>

<div
  class="plasma-card plasma-card--{variant} plasma-card--{orientation} plasma-card--padding-{padding} {customClass}"
  class:plasma-card--hoverable={hoverable}
  {...restProps}
>
  {#if header}
    <div class="plasma-card-header">
      {@render header()}
    </div>
  {/if}

  {#if children}
    <div class="plasma-card-body {bodyClass}">
      {@render children()}
    </div>
  {/if}

  {#if footer}
    <div class="plasma-card-footer">
      {@render footer()}
    </div>
  {/if}
</div>

<style>
  .plasma-card {
    position: relative;
    display: flex;
    box-sizing: border-box;
    font-family: var(--plasma-font-sans);
    color: var(--plasma-color-text);
    border-radius: var(--plasma-radius-lg);
    border: 1px solid var(--plasma-color-border);
    background-color: var(--plasma-color-surface);
    transition: var(--plasma-transition-fast);
    overflow: hidden;
  }

  .plasma-card--vertical {
    flex-direction: column;
  }

  .plasma-card--horizontal {
    flex-direction: row;
  }

  /* --------------------------------------------------------------------------
     Variants
     -------------------------------------------------------------------------- */
  .plasma-card--default {
    background-color: var(--plasma-color-surface);
    box-shadow: var(--plasma-shadow-xs);
  }

  .plasma-card--flat {
    background-color: transparent;
    border-color: var(--plasma-color-border-subtle);
    box-shadow: none;
  }

  .plasma-card--sunken {
    background-color: var(--plasma-color-surface-sunken);
    border-color: var(--plasma-color-border-subtle);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);
  }

  .plasma-card--floating {
    background-color: var(--plasma-color-surface);
    border-color: var(--plasma-color-border);
    box-shadow: var(--plasma-shadow-lg);
    border-radius: var(--plasma-radius-xl);
  }

  /* Hoverable */
  .plasma-card--hoverable {
    cursor: pointer;
  }

  .plasma-card--hoverable:hover {
    border-color: var(--plasma-color-border-hover);
    box-shadow: var(--plasma-shadow-md);
    transform: translateY(-1px);
  }

  /* --------------------------------------------------------------------------
     Padding Modes
     -------------------------------------------------------------------------- */
  .plasma-card--padding-none .plasma-card-body,
  .plasma-card--padding-none .plasma-card-header,
  .plasma-card--padding-none .plasma-card-footer {
    padding: 0;
  }

  .plasma-card--padding-sm .plasma-card-body {
    padding: var(--plasma-space-sm);
  }
  .plasma-card--padding-sm .plasma-card-header {
    padding: var(--plasma-space-sm) var(--plasma-space-sm) 0 var(--plasma-space-sm);
  }
  .plasma-card--padding-sm .plasma-card-footer {
    padding: 0 var(--plasma-space-sm) var(--plasma-space-sm) var(--plasma-space-sm);
  }

  .plasma-card--padding-md .plasma-card-body {
    padding: var(--plasma-space-lg);
  }
  .plasma-card--padding-md .plasma-card-header {
    padding: var(--plasma-space-lg) var(--plasma-space-lg) 0 var(--plasma-space-lg);
  }
  .plasma-card--padding-md .plasma-card-footer {
    padding: 0 var(--plasma-space-lg) var(--plasma-space-lg) var(--plasma-space-lg);
  }

  .plasma-card--padding-lg .plasma-card-body {
    padding: var(--plasma-space-xl);
  }
  .plasma-card--padding-lg .plasma-card-header {
    padding: var(--plasma-space-xl) var(--plasma-space-xl) 0 var(--plasma-space-xl);
  }
  .plasma-card--padding-lg .plasma-card-footer {
    padding: 0 var(--plasma-space-xl) var(--plasma-space-xl) var(--plasma-space-xl);
  }

  /* --------------------------------------------------------------------------
     Sections
     -------------------------------------------------------------------------- */
  .plasma-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: var(--plasma-font-weight-bold);
    font-size: var(--plasma-font-size-md);
  }

  .plasma-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    font-size: var(--plasma-font-size-base);
    line-height: var(--plasma-line-height-base);
  }

  .plasma-card--horizontal > .plasma-card-body {
    flex-direction: row;
    align-items: stretch;
  }

  .plasma-card-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--plasma-space-sm);
  }
</style>
