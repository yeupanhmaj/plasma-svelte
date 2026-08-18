<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "size" | "type" | "value"> {
    value?: any;
    group?: any;
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    children?: Snippet;
  }

  let {
    value,
    group = $bindable(),
    checked = $bindable(false),
    disabled = false,
    label,
    children,
    class: customClass = "",
    id,
    name,
    ...restProps
  }: Props = $props();

  // If group is provided, derive checked from whether group === value
  const isChecked = $derived(group !== undefined ? group === value : checked);

  function handleChange() {
    if (disabled) return;
    if (group !== undefined) {
      group = value;
    } else {
      checked = true;
    }
  }
</script>

<!-- biome-ignore lint/a11y/noLabelWithoutControl: id is passed as an attr -->
<label
  class="plasma-radio-container {customClass}"
  class:plasma-radio--disabled={disabled}
  for={id}
>
  <input
    {id}
    type="radio"
    {name}
    {value}
    {disabled}
    checked={isChecked}
    onchange={handleChange}
    class="plasma-radio-input"
    {...restProps}
  />

  <span
    class="plasma-radio-circle"
    class:plasma-radio-circle--checked={isChecked}
  >
    <span class="plasma-radio-dot"></span>
  </span>

  {#if children}
    <span class="plasma-radio-label">
      {@render children()}
    </span>
  {:else if label}
    <span class="plasma-radio-label">
      {label}
    </span>
  {/if}
</label>

<style>
  .plasma-radio-container {
    display: inline-flex;
    align-items: center;
    gap: var(--plasma-space-sm);
    cursor: pointer;
    font-family: var(--plasma-font-sans);
    font-size: var(--plasma-font-size-base);
    color: var(--plasma-color-text);
    user-select: none;
    line-height: 1.2;
  }

  .plasma-radio--disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* Visually hide native radio */
  .plasma-radio-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Breeze Radio Circle */
  .plasma-radio-circle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: var(--plasma-radius-full);
    border: 1px solid var(--plasma-color-border);
    background-color: var(--plasma-color-view-bg);
    flex-shrink: 0;
    transition: var(--plasma-transition-fast);
  }

  .plasma-radio-container:hover:not(.plasma-radio--disabled)
    .plasma-radio-circle {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-radio-input:focus-visible + .plasma-radio-circle {
    outline: 2px solid var(--plasma-color-highlight);
    outline-offset: 2px;
    box-shadow: var(--plasma-shadow-focus);
  }

  /* Checked Outer Ring */
  .plasma-radio-circle--checked {
    border-color: var(--plasma-color-highlight);
  }

  .plasma-radio-container:hover:not(.plasma-radio--disabled)
    .plasma-radio-circle--checked {
    border-color: var(--plasma-color-highlight-hover);
  }

  /* Inner Dot */
  .plasma-radio-dot {
    width: 8px;
    height: 8px;
    border-radius: var(--plasma-radius-full);
    background-color: var(--plasma-color-highlight);
    transform: scale(0);
    opacity: 0;
    transition:
      transform var(--plasma-duration-fast) var(--plasma-ease-default),
      opacity var(--plasma-duration-fast) var(--plasma-ease-default);
  }

  .plasma-radio-circle--checked .plasma-radio-dot {
    transform: scale(1);
    opacity: 1;
  }

  .plasma-radio-label {
    display: inline-block;
  }
</style>
