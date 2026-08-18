<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLInputAttributes, "size" | "type"> {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    label?: string;
    children?: Snippet;
  }

  let {
    checked = $bindable(false),
    indeterminate = $bindable(false),
    disabled = false,
    label,
    children,
    class: customClass = "",
    id,
    ...restProps
  }: Props = $props();

  let inputEl = $state<HTMLInputElement | null>(null);

  $effect(() => {
    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  });

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    checked = target.checked;
    if (indeterminate) {
      indeterminate = false;
    }
  }
</script>

<label
  class="plasma-checkbox-container {customClass}"
  class:plasma-checkbox--disabled={disabled}
  for={id}
>
  <input
    {id}
    type="checkbox"
    bind:this={inputEl}
    {checked}
    {disabled}
    onchange={handleChange}
    class="plasma-checkbox-input"
    {...restProps}
  />

  <span
    class="plasma-checkbox-box"
    class:plasma-checkbox-box--checked={checked}
    class:plasma-checkbox-box--indeterminate={indeterminate}
  >
    <!-- Always rendered in DOM to eliminate any layout reflow/shift and enable smooth scaling -->
    <svg
      role="img"
      aria-label="indeterminate-icon"
      viewBox="0 0 16 16"
      width="10"
      height="10"
      fill="currentColor"
      class="plasma-checkbox-icon plasma-checkbox-icon--indeterminate"
    >
      <rect x="2" y="6.5" width="12" height="3" rx="1" />
    </svg>

    <svg
      role="img"
      aria-label="checked-icon"
      viewBox="0 0 16 16"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="plasma-checkbox-icon plasma-checkbox-icon--check"
    >
      <path d="M3.5 8.5l3 3 6-6" />
    </svg>
  </span>

  {#if children}
    <span class="plasma-checkbox-label">
      {@render children()}
    </span>
  {:else if label}
    <span class="plasma-checkbox-label">
      {label}
    </span>
  {/if}
</label>

<style>
  .plasma-checkbox-container {
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

  .plasma-checkbox--disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* Visually hide native input while keeping it accessible */
  .plasma-checkbox-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Custom Breeze Checkbox Box */
  .plasma-checkbox-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: var(--plasma-radius-sm);
    border: 1px solid var(--plasma-color-border);
    background-color: var(--plasma-color-view-bg);
    color: #ffffff;
    flex-shrink: 0;
    overflow: hidden;
    transition: var(--plasma-transition-fast);
  }

  .plasma-checkbox-container:hover:not(.plasma-checkbox--disabled)
    .plasma-checkbox-box {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-checkbox-input:focus-visible + .plasma-checkbox-box {
    outline: 2px solid var(--plasma-color-highlight);
    outline-offset: 2px;
    box-shadow: var(--plasma-shadow-focus);
  }

  /* Checked & Indeterminate box styling */
  .plasma-checkbox-box--checked,
  .plasma-checkbox-box--indeterminate {
    background-color: var(--plasma-color-highlight);
    border-color: var(--plasma-color-highlight-hover);
  }

  .plasma-checkbox-container:hover:not(.plasma-checkbox--disabled)
    .plasma-checkbox-box--checked,
  .plasma-checkbox-container:hover:not(.plasma-checkbox--disabled)
    .plasma-checkbox-box--indeterminate {
    background-color: var(--plasma-color-highlight-hover);
    border-color: var(--plasma-color-highlight-active);
  }

  /* Icons: zero layout shift, smooth transform and opacity transitions */
  .plasma-checkbox-icon {
    position: absolute;
    pointer-events: none;
    transform: scale(0);
    opacity: 0;
    transition:
      transform var(--plasma-duration-fast) var(--plasma-ease-default),
      opacity var(--plasma-duration-fast) var(--plasma-ease-default);
  }

  .plasma-checkbox-box--checked:not(.plasma-checkbox-box--indeterminate)
    .plasma-checkbox-icon--check {
    transform: scale(1);
    opacity: 1;
  }

  .plasma-checkbox-box--indeterminate .plasma-checkbox-icon--indeterminate {
    transform: scale(1);
    opacity: 1;
  }

  .plasma-checkbox-label {
    display: inline-block;
  }
</style>
