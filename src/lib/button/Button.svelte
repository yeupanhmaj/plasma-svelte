<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";

  type ButtonVariant = "default" | "secondary" | "primary" | "flat" | "tool" | "danger";
  type ButtonSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

  interface Props extends HTMLButtonAttributes {
    variant?: ButtonVariant;
    primary?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    label?: string;
    children?: Snippet;
  }

  let {
    variant = "default",
    primary = false,
    size = "md",
    disabled = false,
    type = "button",
    label,
    children,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  // Normalize size strings
  const resolvedSize = $derived(
    size === "small" ? "sm" : size === "large" ? "lg" : size === "medium" ? "md" : size
  );

  // Normalize variant strings (primary prop overrides, secondary maps to default, tool maps to flat)
  const resolvedVariant = $derived(
    primary
      ? "primary"
      : variant === "secondary"
        ? "default"
        : variant === "tool"
          ? "flat"
          : variant
  );
</script>

<button
  {type}
  class="plasma-btn plasma-btn--{resolvedVariant} plasma-btn--{resolvedSize} {customClass}"
  {disabled}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else if label}
    {label}
  {/if}
</button>


<style>
  .plasma-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--plasma-space-xs);
    font-family: var(--plasma-font-sans);
    font-weight: var(--plasma-font-weight-medium);
    line-height: 1;
    white-space: nowrap;
    border-radius: var(--plasma-radius-md);
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    transition: var(--plasma-transition-fast);
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  .plasma-btn--sm {
    height: var(--plasma-control-height-sm);
    padding: 0 var(--plasma-space-sm);
    font-size: var(--plasma-font-size-xs);
  }

  .plasma-btn--md {
    height: var(--plasma-control-height-md);
    padding: 0 var(--plasma-space-md);
    font-size: var(--plasma-font-size-base);
  }

  .plasma-btn--lg {
    height: var(--plasma-control-height-lg);
    padding: 0 var(--plasma-space-lg);
    font-size: var(--plasma-font-size-md);
  }

  /* --------------------------------------------------------------------------
     Variant: Default (Breeze Standard PushButton)
     -------------------------------------------------------------------------- */
  .plasma-btn--default {
    background-color: var(--plasma-color-surface);
    border-color: var(--plasma-color-border);
    color: var(--plasma-color-text);
    box-shadow: var(--plasma-shadow-xs);
  }

  .plasma-btn--default:hover:not(:disabled) {
    background-color: var(--plasma-color-surface-hover);
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-btn--default:active:not(:disabled) {
    background-color: var(--plasma-color-surface-active);
    border-color: var(--plasma-color-border-focus);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  /* --------------------------------------------------------------------------
     Variant: Primary (Breeze Default/Highlight Action)
     -------------------------------------------------------------------------- */
  .plasma-btn--primary {
    background-color: var(--plasma-color-highlight);
    border-color: var(--plasma-color-highlight-hover);
    color: var(--plasma-color-highlight-text);
    box-shadow: var(--plasma-shadow-xs);
  }

  .plasma-btn--primary:hover:not(:disabled) {
    background-color: var(--plasma-color-highlight-hover);
    border-color: var(--plasma-color-highlight-active);
  }

  .plasma-btn--primary:active:not(:disabled) {
    background-color: var(--plasma-color-highlight-active);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25);
  }

  /* --------------------------------------------------------------------------
     Variant: Flat / ToolButton (KDE Toolbar style)
     -------------------------------------------------------------------------- */
  .plasma-btn--flat {
    background-color: transparent;
    border-color: transparent;
    color: var(--plasma-color-text);
  }

  .plasma-btn--flat:hover:not(:disabled) {
    background-color: var(--plasma-color-surface-hover);
    border-color: var(--plasma-color-border-subtle);
  }

  .plasma-btn--flat:active:not(:disabled) {
    background-color: var(--plasma-color-surface-active);
    border-color: var(--plasma-color-border);
  }

  /* --------------------------------------------------------------------------
     Variant: Danger (Destructive Action)
     -------------------------------------------------------------------------- */
  .plasma-btn--danger {
    background-color: var(--plasma-color-negative);
    border-color: var(--plasma-color-negative-hover);
    color: #ffffff;
    box-shadow: var(--plasma-shadow-xs);
  }

  .plasma-btn--danger:hover:not(:disabled) {
    background-color: var(--plasma-color-negative-hover);
    border-color: var(--plasma-color-negative-hover);
  }

  .plasma-btn--danger:active:not(:disabled) {
    background-color: #ba2837;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  /* --------------------------------------------------------------------------
     Focus & Disabled States
     -------------------------------------------------------------------------- */
  .plasma-btn:focus-visible {
    outline: 2px solid var(--plasma-color-highlight);
    outline-offset: 1px;
    box-shadow: var(--plasma-shadow-focus);
  }

  .plasma-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }
</style>
