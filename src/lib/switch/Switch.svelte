<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  type SwitchSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

  interface Props extends Omit<HTMLInputAttributes, "size" | "type"> {
    checked?: boolean;
    size?: SwitchSize;
    disabled?: boolean;
    label?: string;
    children?: Snippet;
  }

  let {
    checked = $bindable(false),
    size = "md",
    disabled = false,
    label,
    children,
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
          : size,
  );

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    checked = target.checked;
  }
</script>

<!-- biome-ignore lint/a11y/noLabelWithoutControl: id is passed as an attr -->
<label
  class="plasma-switch-container plasma-switch--{resolvedSize} {customClass}"
  class:plasma-switch--disabled={disabled}
  for={id}
>
  <input
    {id}
    type="checkbox"
    role="switch"
    aria-checked={checked}
    {checked}
    {disabled}
    onchange={handleChange}
    class="plasma-switch-input"
    {...restProps}
  />

  <span class="plasma-switch-track" class:plasma-switch-track--checked={checked}>
    <span class="plasma-switch-thumb"></span>
  </span>

  {#if children}
    <span class="plasma-switch-label">
      {@render children()}
    </span>
  {:else if label}
    <span class="plasma-switch-label">
      {label}
    </span>
  {/if}
</label>

<style>
  .plasma-switch-container {
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

  .plasma-switch--disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* Visually hide native input */
  .plasma-switch-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    pointer-events: none;
  }

  /* --------------------------------------------------------------------------
     Track (Pill)
     -------------------------------------------------------------------------- */
  .plasma-switch-track {
    position: relative;
    display: inline-flex;
    align-items: center;
    border-radius: var(--plasma-radius-full);
    background-color: var(--plasma-color-surface-sunken);
    border: 1px solid var(--plasma-color-border);
    flex-shrink: 0;
    transition:
      background-color var(--plasma-duration-base) var(--plasma-ease-default),
      border-color var(--plasma-duration-base) var(--plasma-ease-default);
  }

  .plasma-switch-container:hover:not(.plasma-switch--disabled) .plasma-switch-track {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-switch-input:focus-visible + .plasma-switch-track {
    outline: 2px solid var(--plasma-color-highlight);
    outline-offset: 2px;
    box-shadow: var(--plasma-shadow-focus);
  }

  .plasma-switch-track--checked {
    background-color: var(--plasma-color-highlight);
    border-color: var(--plasma-color-highlight-hover);
  }

  .plasma-switch-container:hover:not(.plasma-switch--disabled) .plasma-switch-track--checked {
    background-color: var(--plasma-color-highlight-hover);
    border-color: var(--plasma-color-highlight-active);
  }

  /* --------------------------------------------------------------------------
     Thumb (Circular slider)
     -------------------------------------------------------------------------- */
  .plasma-switch-thumb {
    position: absolute;
    border-radius: var(--plasma-radius-full);
    background-color: #ffffff;
    box-shadow: var(--plasma-shadow-xs);
    transition: transform var(--plasma-duration-base) var(--plasma-ease-default);
  }

  /* --------------------------------------------------------------------------
     Sizes
     -------------------------------------------------------------------------- */
  /* SM */
  .plasma-switch--sm .plasma-switch-track {
    width: 28px;
    height: 16px;
  }
  .plasma-switch--sm .plasma-switch-thumb {
    width: 12px;
    height: 12px;
    left: 1px;
  }
  .plasma-switch--sm .plasma-switch-track--checked .plasma-switch-thumb {
    transform: translateX(12px);
  }

  /* MD (Standard Breeze) */
  .plasma-switch--md .plasma-switch-track {
    width: 36px;
    height: 20px;
  }
  .plasma-switch--md .plasma-switch-thumb {
    width: 14px;
    height: 14px;
    left: 2px;
  }
  .plasma-switch--md .plasma-switch-track--checked .plasma-switch-thumb {
    transform: translateX(16px);
  }

  /* LG */
  .plasma-switch--lg .plasma-switch-track {
    width: 44px;
    height: 24px;
  }
  .plasma-switch--lg .plasma-switch-thumb {
    width: 18px;
    height: 18px;
    left: 2px;
  }
  .plasma-switch--lg .plasma-switch-track--checked .plasma-switch-thumb {
    transform: translateX(20px);
  }

  .plasma-switch-label {
    display: inline-block;
  }
</style>
