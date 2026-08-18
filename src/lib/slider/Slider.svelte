<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "size" | "type" | "value"> {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    showValue?: boolean;
    label?: string;
    children?: Snippet;
    style?: string;
  }

  let {
    value = $bindable(50),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    showValue = false,
    label,
    children,
    class: customClass = "",
    style: customStyle = "",
    id,
    ...restProps
  }: Props = $props();

  const percentage = $derived(
    Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  );

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = parseFloat(target.value);
  }
</script>

<div
  class="plasma-slider-wrapper {customClass}"
  class:plasma-slider--disabled={disabled}
  style={customStyle}
>

  {#if label || children || showValue}
    <div class="plasma-slider-header">
      {#if children}
        <span class="plasma-slider-label">
          {@render children()}
        </span>
      {:else if label}
        <label for={id} class="plasma-slider-label">
          {label}
        </label>
      {/if}

      {#if showValue}
        <span class="plasma-slider-value">
          {value}
        </span>
      {/if}
    </div>
  {/if}

  <div class="plasma-slider-track-container">
    <input
      {id}
      type="range"
      {min}
      {max}
      {step}
      {disabled}
      {value}
      oninput={handleInput}
      style="--slider-percent: {percentage}%;"
      class="plasma-slider-input"
      {...restProps}
    />
  </div>
</div>

<style>
  .plasma-slider-wrapper {
    display: inline-flex;
    flex-direction: column;
    gap: var(--plasma-space-xs);
    width: 100%;
    font-family: var(--plasma-font-sans);
    color: var(--plasma-color-text);
  }

  .plasma-slider--disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .plasma-slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--plasma-font-size-sm);
  }

  .plasma-slider-label {
    color: var(--plasma-color-text);
    font-weight: var(--plasma-font-weight-medium);
  }

  .plasma-slider-value {
    font-family: var(--plasma-font-mono);
    font-size: var(--plasma-font-size-xs);
    color: var(--plasma-color-text-muted);
    background-color: var(--plasma-color-surface-sunken);
    padding: 1px 6px;
    border-radius: var(--plasma-radius-sm);
  }

  .plasma-slider-track-container {
    position: relative;
    display: flex;
    align-items: center;
    height: 20px;
  }

  /* --------------------------------------------------------------------------
     Range Input Reset & Breeze Styling
     -------------------------------------------------------------------------- */
  .plasma-slider-input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: var(--plasma-radius-full);
    outline: none;
    background: linear-gradient(
      to right,
      var(--plasma-color-highlight) 0%,
      var(--plasma-color-highlight) var(--slider-percent),
      var(--plasma-color-border) var(--slider-percent),
      var(--plasma-color-border) 100%
    );
    margin: 0;
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-slider--disabled .plasma-slider-input {
    cursor: not-allowed;
  }

  /* WebKit Thumb */
  .plasma-slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: var(--plasma-radius-full);
    background-color: var(--plasma-color-surface);
    border: 1px solid var(--plasma-color-border);
    box-shadow: var(--plasma-shadow-xs);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-slider-input:hover:not(:disabled)::-webkit-slider-thumb {
    border-color: var(--plasma-color-border-hover);
    background-color: var(--plasma-color-surface-hover);
  }

  .plasma-slider-input:active:not(:disabled)::-webkit-slider-thumb {
    border-color: var(--plasma-color-highlight-hover);
    background-color: var(--plasma-color-surface-active);
  }

  /* Firefox Thumb */
  .plasma-slider-input::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: var(--plasma-radius-full);
    background-color: var(--plasma-color-surface);
    border: 1px solid var(--plasma-color-border);
    box-shadow: var(--plasma-shadow-xs);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-slider-input:hover:not(:disabled)::-moz-range-thumb {
    border-color: var(--plasma-color-border-hover);
    background-color: var(--plasma-color-surface-hover);
  }

  .plasma-slider-input:active:not(:disabled)::-moz-range-thumb {
    border-color: var(--plasma-color-highlight-hover);
    background-color: var(--plasma-color-surface-active);
  }

  /* Focus visible */
  .plasma-slider-input:focus-visible {
    box-shadow: var(--plasma-shadow-focus);
  }
</style>
