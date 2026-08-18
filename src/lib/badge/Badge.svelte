<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type BadgeVariant =
    | "default"
    | "primary"
    | "highlight"
    | "positive"
    | "success"
    | "neutral"
    | "warning"
    | "negative"
    | "danger";

  type BadgeShape = "rounded" | "pill";
  type BadgeSize = "sm" | "md";

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    shape?: BadgeShape;
    size?: BadgeSize;
    dot?: boolean;
    label?: string;
    children?: Snippet;
  }

  let {
    variant = "default",
    shape = "rounded",
    size = "md",
    dot = false,
    label,
    children,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  const resolvedVariant = $derived(
    variant === "highlight"
      ? "primary"
      : variant === "success"
        ? "positive"
        : variant === "warning"
          ? "neutral"
          : variant === "danger"
            ? "negative"
            : variant
  );
</script>

<span
  class="plasma-badge plasma-badge--{resolvedVariant} plasma-badge--{shape} plasma-badge--{size} {customClass}"
  {...restProps}
>
  {#if dot}
    <span class="plasma-badge-dot"></span>
  {/if}

  {#if children}
    {@render children()}
  {:else if label}
    {label}
  {/if}
</span>

<style>
  .plasma-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-family: var(--plasma-font-sans);
    font-weight: var(--plasma-font-weight-medium);
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    box-sizing: border-box;
  }

  /* --------------------------------------------------------------------------
     Shapes
     -------------------------------------------------------------------------- */
  .plasma-badge--rounded {
    border-radius: var(--plasma-radius-sm);
  }

  .plasma-badge--pill {
    border-radius: var(--plasma-radius-full);
  }

  /* --------------------------------------------------------------------------
     Sizes
     -------------------------------------------------------------------------- */
  .plasma-badge--sm {
    height: 18px;
    padding: 0 6px;
    font-size: 11px;
  }

  .plasma-badge--md {
    height: 22px;
    padding: 0 8px;
    font-size: var(--plasma-font-size-xs);
  }

  /* --------------------------------------------------------------------------
     Variants
     -------------------------------------------------------------------------- */
  .plasma-badge--default {
    background-color: var(--plasma-color-surface-sunken);
    color: var(--plasma-color-text);
    border: 1px solid var(--plasma-color-border);
  }
  .plasma-badge--default .plasma-badge-dot {
    background-color: var(--plasma-color-text-muted);
  }

  .plasma-badge--primary {
    background-color: var(--plasma-color-highlight-soft);
    color: var(--plasma-color-highlight);
    border: 1px solid rgba(61, 174, 233, 0.35);
  }
  .plasma-badge--primary .plasma-badge-dot {
    background-color: var(--plasma-color-highlight);
  }

  .plasma-badge--positive {
    background-color: var(--plasma-color-positive-soft);
    color: var(--plasma-color-positive);
    border: 1px solid rgba(39, 174, 96, 0.35);
  }
  .plasma-badge--positive .plasma-badge-dot {
    background-color: var(--plasma-color-positive);
  }

  .plasma-badge--neutral {
    background-color: var(--plasma-color-neutral-soft);
    color: var(--plasma-color-neutral);
    border: 1px solid rgba(246, 116, 0, 0.35);
  }
  .plasma-badge--neutral .plasma-badge-dot {
    background-color: var(--plasma-color-neutral);
  }

  .plasma-badge--negative {
    background-color: var(--plasma-color-negative-soft);
    color: var(--plasma-color-negative);
    border: 1px solid rgba(218, 68, 83, 0.35);
  }
  .plasma-badge--negative .plasma-badge-dot {
    background-color: var(--plasma-color-negative);
  }

  /* Dot */
  .plasma-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--plasma-radius-full);
    flex-shrink: 0;
  }
</style>
