<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

  type ButtonVariant = "default" | "secondary" | "primary" | "flat" | "tool" | "danger";
  type ButtonSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

  interface Props extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
    variant?: ButtonVariant;
    primary?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    type?: HTMLButtonAttributes["type"];
    href?: string;
    target?: string;
    rel?: string;
    label?: string;
    children?: Snippet;
  }

  let {
    variant = "default",
    primary = false,
    size = "md",
    disabled = false,
    loading = false,
    type = "button",
    href,
    target,
    rel,
    label,
    children,
    class: customClass = "",
    onclick,
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

  const isInteractiveDisabled = $derived(disabled || loading);

  function handleClick(e: MouseEvent) {
    if (isInteractiveDisabled) {
      e.preventDefault();
      return;
    }
    (onclick as ((e: MouseEvent) => void) | undefined)?.(e);
  }
</script>

{#if href}
  <a
    {href}
    {target}
    rel={target === "_blank" && !rel ? "noopener noreferrer" : rel}
    class="plasma-btn plasma-btn--{resolvedVariant} plasma-btn--{resolvedSize} {customClass}"
    class:plasma-btn--loading={loading}
    class:plasma-btn--disabled={isInteractiveDisabled}
    aria-disabled={isInteractiveDisabled ? "true" : undefined}
    aria-busy={loading ? "true" : undefined}
    onclick={handleClick}
    {...restProps}
  >
    {#if loading}
      <span class="plasma-btn-spinner" aria-hidden="true"></span>
    {/if}
    {#if children}
      {@render children()}
    {:else if label}
      {label}
    {/if}
  </a>
{:else}
  <button
    {type}
    class="plasma-btn plasma-btn--{resolvedVariant} plasma-btn--{resolvedSize} {customClass}"
    class:plasma-btn--loading={loading}
    disabled={isInteractiveDisabled}
    aria-busy={loading ? "true" : undefined}
    onclick={handleClick}
    {...restProps}
  >
    {#if loading}
      <span class="plasma-btn-spinner" aria-hidden="true"></span>
    {/if}
    {#if children}
      {@render children()}
    {:else if label}
      {label}
    {/if}
  </button>
{/if}


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

  .plasma-btn:disabled,
  .plasma-btn--disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
    pointer-events: none;
  }

  /* --------------------------------------------------------------------------
     Spinner for loading button
     -------------------------------------------------------------------------- */
  .plasma-btn-spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--plasma-radius-full);
    animation: plasma-btn-spin 0.75s linear infinite;
    display: inline-block;
    flex-shrink: 0;
  }

  @keyframes plasma-btn-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
