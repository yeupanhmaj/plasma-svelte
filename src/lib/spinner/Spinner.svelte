<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type SpinnerSize = "sm" | "md" | "lg" | "xl";
  type SpinnerVariant = "primary" | "current" | "white" | "muted";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    size?: SpinnerSize;
    variant?: SpinnerVariant;
    label?: string;
  }

  let {
    size = "md",
    variant = "primary",
    label = "Loading...",
    class: customClass = "",
    ...restProps
  }: Props = $props();
</script>

<div
  role="status"
  aria-label={label}
  class="plasma-spinner plasma-spinner--{size} plasma-spinner--{variant} {customClass}"
  {...restProps}
>
  <span class="plasma-spinner-circle"></span>
  <span class="sr-only">{label}</span>
</div>

<style>
  .plasma-spinner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    vertical-align: middle;
  }

  .plasma-spinner-circle {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: var(--plasma-radius-full);
    border-style: solid;
    animation: plasma-spin 0.8s linear infinite;
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  .plasma-spinner--sm {
    width: 14px;
    height: 14px;
  }
  .plasma-spinner--sm .plasma-spinner-circle {
    border-width: 2px;
  }

  .plasma-spinner--md {
    width: 20px;
    height: 20px;
  }
  .plasma-spinner--md .plasma-spinner-circle {
    border-width: 2.5px;
  }

  .plasma-spinner--lg {
    width: 32px;
    height: 32px;
  }
  .plasma-spinner--lg .plasma-spinner-circle {
    border-width: 3px;
  }

  .plasma-spinner--xl {
    width: 48px;
    height: 48px;
  }
  .plasma-spinner--xl .plasma-spinner-circle {
    border-width: 4px;
  }

  /* --------------------------------------------------------------------------
     Variants
     -------------------------------------------------------------------------- */
  .plasma-spinner--primary .plasma-spinner-circle {
    border-color: var(--plasma-color-border-subtle);
    border-top-color: var(--plasma-color-highlight);
  }

  .plasma-spinner--current .plasma-spinner-circle {
    border-color: transparent;
    border-top-color: currentColor;
    border-right-color: currentColor;
  }

  .plasma-spinner--white .plasma-spinner-circle {
    border-color: rgba(255, 255, 255, 0.25);
    border-top-color: #ffffff;
  }

  .plasma-spinner--muted .plasma-spinner-circle {
    border-color: var(--plasma-color-border-subtle);
    border-top-color: var(--plasma-color-text-muted);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @keyframes plasma-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
