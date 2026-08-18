<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type ProgressVariant =
    | "default"
    | "primary"
    | "positive"
    | "neutral"
    | "negative";

  type ProgressSize = "sm" | "md" | "lg";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    indeterminate?: boolean;
    variant?: ProgressVariant;
    size?: ProgressSize;
    showValue?: boolean;
    label?: string;
  }

  let {
    value = 0,
    max = 100,
    indeterminate = false,
    variant = "primary",
    size = "md",
    showValue = false,
    label,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  const percentage = $derived(
    Math.min(100, Math.max(0, (value / max) * 100))
  );

  const resolvedVariant = $derived(
    variant === "default" ? "primary" : variant
  );
</script>

<div
  class="plasma-progress plasma-progress--{size} {customClass}"
  {...restProps}
>
  {#if label || showValue}
    <div class="plasma-progress-header">
      {#if label}
        <span class="plasma-progress-label">{label}</span>
      {/if}
      {#if showValue && !indeterminate}
        <span class="plasma-progress-value">{Math.round(percentage)}%</span>
      {/if}
    </div>
  {/if}

  <div
    role="progressbar"
    aria-valuenow={indeterminate ? undefined : value}
    aria-valuemin={0}
    aria-valuemax={max}
    class="plasma-progress-track"
    class:plasma-progress-track--indeterminate={indeterminate}
  >
    {#if !indeterminate}
      <div
        class="plasma-progress-fill plasma-progress-fill--{resolvedVariant}"
        style="width: {percentage}%;"
      ></div>
    {:else}
      <div
        class="plasma-progress-indeterminate plasma-progress-fill--{resolvedVariant}"
      ></div>
    {/if}
  </div>
</div>

<style>
  .plasma-progress {
    display: flex;
    flex-direction: column;
    gap: var(--plasma-space-xs);
    width: 100%;
    font-family: var(--plasma-font-sans);
    box-sizing: border-box;
  }

  .plasma-progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--plasma-font-size-sm);
  }

  .plasma-progress-label {
    color: var(--plasma-color-text);
    font-weight: var(--plasma-font-weight-medium);
  }

  .plasma-progress-value {
    font-family: var(--plasma-font-mono);
    font-size: var(--plasma-font-size-xs);
    color: var(--plasma-color-text-muted);
  }

  /* --------------------------------------------------------------------------
     Track
     -------------------------------------------------------------------------- */
  .plasma-progress-track {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: var(--plasma-color-surface-sunken);
    border: 1px solid var(--plasma-color-border-subtle);
    border-radius: var(--plasma-radius-full);
    box-sizing: border-box;
  }

  /* Sizes */
  .plasma-progress--sm .plasma-progress-track {
    height: 4px;
  }
  .plasma-progress--md .plasma-progress-track {
    height: 6px;
  }
  .plasma-progress--lg .plasma-progress-track {
    height: 10px;
  }

  /* --------------------------------------------------------------------------
     Fill (Determinate)
     -------------------------------------------------------------------------- */
  .plasma-progress-fill {
    height: 100%;
    border-radius: var(--plasma-radius-full);
    transition: width var(--plasma-duration-base) var(--plasma-ease-default);
  }

  .plasma-progress-fill--primary {
    background-color: var(--plasma-color-highlight);
  }
  .plasma-progress-fill--positive {
    background-color: var(--plasma-color-positive);
  }
  .plasma-progress-fill--neutral {
    background-color: var(--plasma-color-neutral);
  }
  .plasma-progress-fill--negative {
    background-color: var(--plasma-color-negative);
  }

  /* --------------------------------------------------------------------------
     Indeterminate (KDE Breeze Shimmer Animation)
     -------------------------------------------------------------------------- */
  .plasma-progress-indeterminate {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: var(--plasma-radius-full);
    animation: plasma-progress-shimmer 1.5s infinite ease-in-out;
  }

  @keyframes plasma-progress-shimmer {
    0% {
      left: -35%;
      width: 35%;
    }
    50% {
      left: 30%;
      width: 50%;
    }
    100% {
      left: 100%;
      width: 35%;
    }
  }
</style>
