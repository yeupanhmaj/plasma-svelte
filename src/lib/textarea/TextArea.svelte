<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  type TextAreaResize = "none" | "vertical" | "horizontal" | "both";

  interface Props extends HTMLTextareaAttributes {
    value?: string;
    placeholder?: string;
    rows?: number;
    resize?: TextAreaResize;
    disabled?: boolean;
    readonly?: boolean;
    invalid?: boolean;
  }

  let {
    value = $bindable(""),
    placeholder = "",
    rows = 4,
    resize = "vertical",
    disabled = false,
    readonly = false,
    invalid = false,
    class: customClass = "",
    id,
    ...restProps
  }: Props = $props();
</script>

<div
  class="plasma-textarea-container {customClass}"
  class:plasma-textarea--disabled={disabled}
  class:plasma-textarea--readonly={readonly}
  class:plasma-textarea--invalid={invalid}
>
  <textarea
    {id}
    bind:value
    {placeholder}
    {rows}
    {disabled}
    {readonly}
    style="resize: {resize};"
    class="plasma-textarea-field"
    {...restProps}
  ></textarea>
</div>

<style>
  .plasma-textarea-container {
    position: relative;
    display: inline-flex;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--plasma-font-sans);
    background-color: var(--plasma-color-view-bg);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-md);
    color: var(--plasma-color-text);
    transition: var(--plasma-transition-fast);
  }

  .plasma-textarea-container:hover:not(.plasma-textarea--disabled):not(:focus-within) {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-textarea-container:focus-within:not(.plasma-textarea--disabled) {
    border-color: var(--plasma-color-highlight);
    box-shadow: var(--plasma-shadow-focus);
  }

  .plasma-textarea--invalid {
    border-color: var(--plasma-color-negative);
  }

  .plasma-textarea--invalid:focus-within {
    box-shadow: 0 0 0 2px rgba(218, 68, 83, 0.35);
  }

  .plasma-textarea--disabled {
    opacity: 0.45;
    cursor: not-allowed;
    background-color: var(--plasma-color-surface-sunken);
  }

  .plasma-textarea--disabled .plasma-textarea-field {
    cursor: not-allowed;
  }

  .plasma-textarea--readonly {
    background-color: var(--plasma-color-surface-sunken);
  }

  .plasma-textarea-field {
    width: 100%;
    min-height: 80px;
    padding: var(--plasma-space-sm) var(--plasma-space-md);
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: var(--plasma-font-size-base);
    line-height: var(--plasma-line-height-base);
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--plasma-color-border) transparent;
  }

  .plasma-textarea-field::placeholder {
    color: var(--plasma-color-text-muted);
    opacity: 0.75;
  }
</style>
