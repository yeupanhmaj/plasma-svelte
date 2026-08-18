<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  type InputSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

  interface Props extends Omit<HTMLInputAttributes, "size" | "prefix"> {
    value?: string | number;
    size?: InputSize;
    invalid?: boolean;
    clearable?: boolean;
    prefix?: Snippet;
    suffix?: Snippet;
  }

  let {
    value = $bindable(""),
    size = "md",
    type = "text",
    placeholder = "",
    disabled = false,
    readonly = false,
    invalid = false,
    clearable = false,
    prefix,
    suffix,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  // Normalize size strings
  const resolvedSize = $derived(
    size === "small"
      ? "sm"
      : size === "large"
        ? "lg"
        : size === "medium"
          ? "md"
          : size,
  );

  function handleClear() {
    value = "";
  }
</script>

<div
  class="plasma-input-container plasma-input--{resolvedSize} {customClass}"
  class:plasma-input--disabled={disabled}
  class:plasma-input--invalid={invalid}
  class:plasma-input--readonly={readonly}
>
  {#if prefix}
    <div class="plasma-input-prefix">
      {@render prefix()}
    </div>
  {/if}

  <input
    {type}
    {placeholder}
    {disabled}
    {readonly}
    bind:value
    class="plasma-input-field"
    {...restProps}
  />

  {#if clearable && value && !disabled && !readonly}
    <button
      type="button"
      class="plasma-input-clear-btn"
      onclick={handleClear}
      tabindex="-1"
      aria-label="Clear input"
    >
      <svg
        role="img"
        aria-label="prefix-icon"
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="currentColor"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </button>
  {/if}

  {#if suffix}
    <div class="plasma-input-suffix">
      {@render suffix()}
    </div>
  {/if}
</div>

<style>
  .plasma-input-container {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--plasma-font-sans);
    background-color: var(--plasma-color-view-bg);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-md);
    color: var(--plasma-color-text);
    transition: var(--plasma-transition-fast);
  }

  .plasma-input-container:hover:not(.plasma-input--disabled):not(
      :focus-within
    ) {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-input-container:focus-within:not(.plasma-input--disabled) {
    border-color: var(--plasma-color-highlight);
    box-shadow: var(--plasma-shadow-focus);
  }

  /* --------------------------------------------------------------------------
     Invalid State
     -------------------------------------------------------------------------- */
  .plasma-input-container.plasma-input--invalid {
    border-color: var(--plasma-color-negative);
  }

  .plasma-input-container.plasma-input--invalid:focus-within {
    box-shadow: 0 0 0 2px rgba(218, 68, 83, 0.35);
  }

  /* --------------------------------------------------------------------------
     Inner Input Field
     -------------------------------------------------------------------------- */
  .plasma-input-field {
    width: 100%;
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: 1.5;
    padding: 0;
  }
  /* --------------------------------------------------------------------------
     Disabled & Readonly
     -------------------------------------------------------------------------- */
  .plasma-input-container.plasma-input--disabled {
    opacity: 0.45;
    cursor: not-allowed;
    background-color: var(--plasma-color-surface-sunken);
  }

  .plasma-input-container.plasma-input--disabled .plasma-input-field {
    cursor: not-allowed;
  }

  .plasma-input-container.plasma-input--readonly {
    background-color: var(--plasma-color-surface-sunken);
  }

  .plasma-input-field::placeholder {
    color: var(--plasma-color-text-muted);
    opacity: 0.75;
  }

  /* --------------------------------------------------------------------------
     Prefix, Suffix & Clear Button
     -------------------------------------------------------------------------- */
  .plasma-input-prefix,
  .plasma-input-suffix {
    display: inline-flex;
    align-items: center;
    color: var(--plasma-color-text-muted);
    flex-shrink: 0;
  }

  .plasma-input-clear-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--plasma-color-text-muted);
    cursor: pointer;
    padding: 2px;
    border-radius: var(--plasma-radius-full);
    transition: var(--plasma-transition-fast);
    flex-shrink: 0;
  }

  .plasma-input-clear-btn:hover {
    color: var(--plasma-color-text);
    background-color: var(--plasma-color-surface-hover);
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  .plasma-input--sm {
    height: var(--plasma-control-height-sm);
    padding: 0 var(--plasma-space-sm);
    font-size: var(--plasma-font-size-xs);
    gap: var(--plasma-space-2xs);
  }

  .plasma-input--md {
    height: var(--plasma-control-height-md);
    padding: 0 var(--plasma-space-md);
    font-size: var(--plasma-font-size-base);
    gap: var(--plasma-space-xs);
  }

  .plasma-input--lg {
    height: var(--plasma-control-height-lg);
    padding: 0 var(--plasma-space-lg);
    font-size: var(--plasma-font-size-md);
    gap: var(--plasma-space-sm);
  }
</style>
