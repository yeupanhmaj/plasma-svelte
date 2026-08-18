<!-- biome-ignore-all lint/a11y/noNoninteractiveElementToInteractiveRole: experimental only -->
<!-- biome-ignore-all lint/a11y/useFocusableInteractive: experimental only   -->
<!-- biome-ignore-all lint/a11y/useKeyWithClickEvents: experimental only -->
<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
  }

  type SelectSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

  interface Props
    extends Omit<HTMLAttributes<HTMLDivElement>, "size" | "onchange"> {
    options: (SelectOption | string)[];
    value?: string | number;
    placeholder?: string;
    size?: SelectSize;
    disabled?: boolean;
    invalid?: boolean;
    name?: string;
    onchange?: (val: string | number) => void;
  }

  let {
    options,
    value = $bindable(""),
    placeholder = "Select an option...",
    size = "md",
    disabled = false,
    invalid = false,
    name,
    onchange,
    class: customClass = "",
    id,
    ...restProps
  }: Props = $props();

  let isOpen = $state(false);
  let triggerEl = $state<HTMLButtonElement | null>(null);
  let highlightedIndex = $state(-1);

  // Normalize options into { value, label, disabled } objects
  const normalizedOptions: SelectOption[] = $derived(
    options.map((opt) =>
      typeof opt === "string" ? { value: opt, label: opt } : opt,
    ),
  );

  const selectedOption = $derived(
    normalizedOptions.find((opt) => opt.value === value),
  );

  const resolvedSize = $derived(
    size === "small"
      ? "sm"
      : size === "large"
        ? "lg"
        : size === "medium"
          ? "md"
          : size,
  );

  function toggleDropdown() {
    if (disabled) return;
    isOpen = !isOpen;
    if (isOpen) {
      highlightedIndex = normalizedOptions.findIndex(
        (opt) => opt.value === value,
      );
      if (highlightedIndex === -1) highlightedIndex = 0;
    }
  }

  function selectOption(opt: SelectOption) {
    if (opt.disabled) return;
    value = opt.value;
    isOpen = false;
    onchange?.(opt.value);
    triggerEl?.focus();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (disabled) return;

    if (!isOpen) {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Enter" ||
        e.key === " "
      ) {
        e.preventDefault();
        isOpen = true;
        highlightedIndex = normalizedOptions.findIndex(
          (opt) => opt.value === value,
        );
        if (highlightedIndex === -1) highlightedIndex = 0;
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      isOpen = false;
      triggerEl?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      highlightedIndex = (highlightedIndex + 1) % normalizedOptions.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlightedIndex =
        (highlightedIndex - 1 + normalizedOptions.length) %
        normalizedOptions.length;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (
        highlightedIndex >= 0 &&
        highlightedIndex < normalizedOptions.length
      ) {
        selectOption(normalizedOptions[highlightedIndex]);
      }
    } else if (e.key === "Tab") {
      isOpen = false;
    }
  }

  function handleWindowClick(e: MouseEvent) {
    if (
      isOpen &&
      triggerEl &&
      !triggerEl.parentElement?.contains(e.target as Node)
    ) {
      isOpen = false;
    }
  }
</script>

<svelte:window onclick={handleWindowClick} />

<div
  class="plasma-select-container plasma-select--{resolvedSize} {customClass}"
  class:plasma-select--disabled={disabled}
  class:plasma-select--invalid={invalid}
  class:plasma-select--open={isOpen}
  {...restProps}
>
  {#if name}
    <input type="hidden" {name} {value} />
  {/if}

  <button
    {id}
    type="button"
    bind:this={triggerEl}
    {disabled}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    class="plasma-select-trigger"
    onclick={toggleDropdown}
    onkeydown={handleKeydown}
  >
    <span
      class="plasma-select-label"
      class:plasma-select-label--placeholder={!selectedOption}
    >
      {selectedOption ? selectedOption.label : placeholder}
    </span>

    <span class="plasma-select-chevron">
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </span>
  </button>

  {#if isOpen}
    <ul tabindex="-1" class="plasma-select-popup">
      {#each normalizedOptions as opt, i}
        {@const isSelected = opt.value === value}
        {@const isHighlighted = i === highlightedIndex}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <li
          role="option"
          aria-selected={isSelected}
          aria-disabled={opt.disabled}
          class="plasma-select-option"
          class:plasma-select-option--selected={isSelected}
          class:plasma-select-option--highlighted={isHighlighted}
          class:plasma-select-option--disabled={opt.disabled}
          onclick={() => selectOption(opt)}
          onmouseenter={() => {
            if (!opt.disabled) highlightedIndex = i;
          }}
        >
          <span>{opt.label}</span>
          {#if isSelected}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              width="12"
              height="12"
              fill="currentColor"
              class="plasma-select-option-check"
            >
              <path
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
              />
            </svg>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .plasma-select-container {
    position: relative;
    display: inline-flex;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--plasma-font-sans);
  }

  .plasma-select--disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* --------------------------------------------------------------------------
     Trigger Button
     -------------------------------------------------------------------------- */
  .plasma-select-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    color: var(--plasma-color-text);
    background-color: var(--plasma-color-surface);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-md);
    cursor: pointer;
    user-select: none;
    box-shadow: var(--plasma-shadow-xs);
    transition: var(--plasma-transition-fast);
  }

  .plasma-select-trigger:hover:not(:disabled) {
    border-color: var(--plasma-color-border-hover);
    background-color: var(--plasma-color-surface-hover);
  }

  .plasma-select-trigger:focus-visible,
  .plasma-select--open .plasma-select-trigger {
    outline: none;
    border-color: var(--plasma-color-highlight);
    box-shadow: var(--plasma-shadow-focus);
  }

  .plasma-select--invalid .plasma-select-trigger {
    border-color: var(--plasma-color-negative);
  }

  .plasma-select-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  .plasma-select-label--placeholder {
    color: var(--plasma-color-text-muted);
  }

  .plasma-select-chevron {
    display: inline-flex;
    align-items: center;
    color: var(--plasma-color-text-muted);
    transition: transform var(--plasma-duration-base) var(--plasma-ease-default);
    flex-shrink: 0;
  }

  .plasma-select--open .plasma-select-chevron {
    transform: rotate(180deg);
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  .plasma-select--sm .plasma-select-trigger {
    height: var(--plasma-control-height-sm);
    padding: 0 var(--plasma-space-sm);
    font-size: var(--plasma-font-size-xs);
  }

  .plasma-select--md .plasma-select-trigger {
    height: var(--plasma-control-height-md);
    padding: 0 var(--plasma-space-md);
    font-size: var(--plasma-font-size-base);
  }

  .plasma-select--lg .plasma-select-trigger {
    height: var(--plasma-control-height-lg);
    padding: 0 var(--plasma-space-lg);
    font-size: var(--plasma-font-size-md);
  }

  /* --------------------------------------------------------------------------
     Popup Menu
     -------------------------------------------------------------------------- */
  .plasma-select-popup {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 1000;
    max-height: 240px;
    overflow-y: auto;
    margin: 0;
    padding: 4px;
    list-style: none;
    background-color: var(--plasma-color-surface);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-md);
    box-shadow: var(--plasma-shadow-md);
    animation: plasma-select-in var(--plasma-duration-fast)
      var(--plasma-ease-default);
  }

  .plasma-select-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--plasma-space-xs) var(--plasma-space-sm);
    border-radius: var(--plasma-radius-sm);
    font-size: var(--plasma-font-size-base);
    color: var(--plasma-color-text);
    cursor: pointer;
    user-select: none;
    transition: var(--plasma-transition-fast);
  }

  .plasma-select-option--highlighted {
    background-color: var(--plasma-color-surface-hover);
    color: var(--plasma-color-text);
  }

  .plasma-select-option--selected {
    background-color: var(--plasma-color-highlight-soft);
    color: var(--plasma-color-highlight);
    font-weight: var(--plasma-font-weight-medium);
  }

  .plasma-select-option--selected.plasma-select-option--highlighted {
    background-color: var(--plasma-color-highlight);
    color: #ffffff;
  }

  .plasma-select-option--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .plasma-select-option-check {
    flex-shrink: 0;
  }

  @keyframes plasma-select-in {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
