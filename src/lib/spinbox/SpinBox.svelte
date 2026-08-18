<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type SpinBoxSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "size" | "onchange" | "prefix"> {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    size?: SpinBoxSize;
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
    prefix?: string | Snippet;
    suffix?: string | Snippet;
    placeholder?: string;
    onchange?: (val: number) => void;
  }


  let {
    value = $bindable(0),
    min = -Infinity,
    max = Infinity,
    step = 1,
    size = "md",
    disabled = false,
    readonly = false,
    invalid = false,
    prefix,
    suffix,
    placeholder = "",
    onchange,
    class: customClass = "",
    id,
    ...restProps
  }: Props = $props();

  const resolvedSize = $derived(
    size === "small"
      ? "sm"
      : size === "large"
        ? "lg"
        : size === "medium"
          ? "md"
          : size
  );

  function clamp(val: number): number {
    return Math.min(max, Math.max(min, val));
  }

  function increment() {
    if (disabled || readonly) return;
    const next = clamp((value ?? 0) + step);
    value = next;
    onchange?.(next);
  }

  function decrement() {
    if (disabled || readonly) return;
    const next = clamp((value ?? 0) - step);
    value = next;
    onchange?.(next);
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const num = parseFloat(target.value);
    if (!isNaN(num)) {
      value = clamp(num);
      onchange?.(value);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (disabled || readonly) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      increment();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrement();
    }
  }
</script>

<div
  class="plasma-spinbox plasma-spinbox--{resolvedSize} {customClass}"
  class:plasma-spinbox--disabled={disabled}
  class:plasma-spinbox--readonly={readonly}
  class:plasma-spinbox--invalid={invalid}
  {...restProps}
>
  {#if prefix}
    <span class="plasma-spinbox-affix plasma-spinbox-prefix">
      {#if typeof prefix === "string"}
        {prefix}
      {:else}
        {@render prefix()}
      {/if}
    </span>
  {/if}

  <input
    {id}
    type="number"
    {min}
    {max}
    {step}
    {disabled}
    {readonly}
    {placeholder}
    value={value}
    oninput={handleInput}
    onkeydown={handleKeydown}
    class="plasma-spinbox-input"
  />

  {#if suffix}
    <span class="plasma-spinbox-affix plasma-spinbox-suffix">
      {#if typeof suffix === "string"}
        {suffix}
      {:else}
        {@render suffix()}
      {/if}
    </span>
  {/if}

  <div class="plasma-spinbox-steppers">
    <button
      type="button"
      tabindex="-1"
      aria-label="Increment"
      {disabled}
      onclick={increment}
      class="plasma-spinbox-btn plasma-spinbox-btn--up"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
        <path d="M3.146 10.354a.5.5 0 0 1 0-.708l4.5-4.5a.5.5 0 0 1 .708 0l4.5 4.5a.5.5 0 0 1-.708.708L8 6.207l-4.146 4.147a.5.5 0 0 1-.708 0z" />
      </svg>
    </button>
    <button
      type="button"
      tabindex="-1"
      aria-label="Decrement"
      {disabled}
      onclick={decrement}
      class="plasma-spinbox-btn plasma-spinbox-btn--down"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
        <path d="M3.146 5.646a.5.5 0 0 0 0 .708l4.5 4.5a.5.5 0 0 0 .708 0l4.5-4.5a.5.5 0 0 0-.708-.708L8 9.793 3.854 5.646a.5.5 0 0 0-.708 0z" />
      </svg>
    </button>
  </div>
</div>

<style>
  .plasma-spinbox {
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
    box-shadow: var(--plasma-shadow-xs);
    transition: var(--plasma-transition-fast);
    overflow: hidden;
  }

  .plasma-spinbox:hover:not(.plasma-spinbox--disabled):not(:focus-within) {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-spinbox:focus-within:not(.plasma-spinbox--disabled) {
    border-color: var(--plasma-color-highlight);
    box-shadow: var(--plasma-shadow-focus);
  }

  .plasma-spinbox--invalid {
    border-color: var(--plasma-color-negative);
  }

  .plasma-spinbox--disabled {
    opacity: 0.45;
    cursor: not-allowed;
    background-color: var(--plasma-color-surface-sunken);
  }

  /* --------------------------------------------------------------------------
     Input Field
     -------------------------------------------------------------------------- */
  .plasma-spinbox-input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    font-family: var(--plasma-font-mono);
    font-size: inherit;
    padding: 0 var(--plasma-space-sm);
    appearance: textfield;
    -moz-appearance: textfield;
  }


  .plasma-spinbox-input::-webkit-outer-spin-button,
  .plasma-spinbox-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .plasma-spinbox-affix {
    display: inline-flex;
    align-items: center;
    color: var(--plasma-color-text-muted);
    font-size: var(--plasma-font-size-xs);
    user-select: none;
  }

  .plasma-spinbox-prefix {
    padding-left: var(--plasma-space-sm);
  }

  .plasma-spinbox-suffix {
    padding-right: var(--plasma-space-xs);
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  .plasma-spinbox--sm {
    height: var(--plasma-control-height-sm);
    font-size: var(--plasma-font-size-xs);
  }

  .plasma-spinbox--md {
    height: var(--plasma-control-height-md);
    font-size: var(--plasma-font-size-base);
  }

  .plasma-spinbox--lg {
    height: var(--plasma-control-height-lg);
    font-size: var(--plasma-font-size-md);
  }

  /* --------------------------------------------------------------------------
     Stepper Buttons
     -------------------------------------------------------------------------- */
  .plasma-spinbox-steppers {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 24px;
    border-left: 1px solid var(--plasma-color-border-subtle);
    background-color: var(--plasma-color-surface);
    flex-shrink: 0;
  }

  .plasma-spinbox-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    border: none;
    background: transparent;
    color: var(--plasma-color-text-muted);
    cursor: pointer;
    padding: 0;
    transition: var(--plasma-transition-fast);
  }

  .plasma-spinbox-btn--up {
    border-bottom: 1px solid var(--plasma-color-border-subtle);
  }

  .plasma-spinbox-btn:hover:not(:disabled) {
    background-color: var(--plasma-color-highlight-soft);
    color: var(--plasma-color-highlight);
  }

  .plasma-spinbox-btn:active:not(:disabled) {
    background-color: var(--plasma-color-highlight);
    color: #ffffff;
  }

  .plasma-spinbox-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
