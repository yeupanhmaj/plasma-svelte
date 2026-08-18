<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  type SearchFieldSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

  interface Props extends Omit<HTMLInputAttributes, "size"> {
    value?: string;
    placeholder?: string;
    loading?: boolean;
    clearable?: boolean;
    size?: SearchFieldSize;
    disabled?: boolean;
    onsearch?: (query: string) => void;
    onclear?: () => void;
  }

  let {
    value = $bindable(""),
    placeholder = "Search...",
    loading = false,
    clearable = true,
    size = "md",
    disabled = false,
    onsearch,
    onclear,
    class: customClass = "",
    id,
    ...restProps
  }: Props = $props();

  let inputEl = $state<HTMLInputElement | null>(null);

  const resolvedSize = $derived(
    size === "small"
      ? "sm"
      : size === "large"
        ? "lg"
        : size === "medium"
          ? "md"
          : size
  );

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
    onsearch?.(value);
  }

  function handleClear() {
    value = "";
    onclear?.();
    onsearch?.("");
    inputEl?.focus();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && value) {
      e.stopPropagation();
      handleClear();
    } else if (e.key === "Enter") {
      onsearch?.(value);
    }
  }
</script>

<div
  class="plasma-searchfield plasma-searchfield--{resolvedSize} {customClass}"
  class:plasma-searchfield--disabled={disabled}
>
  <span class="plasma-searchfield-icon">
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  </span>

  <input
    {id}
    type="search"
    bind:this={inputEl}
    {disabled}
    {placeholder}
    value={value}
    oninput={handleInput}
    onkeydown={handleKeydown}
    class="plasma-searchfield-input"
    {...restProps}
  />

  {#if loading}
    <span class="plasma-searchfield-spinner" aria-label="Loading..."></span>
  {:else if clearable && value && !disabled}
    <button
      type="button"
      class="plasma-searchfield-clear"
      onclick={handleClear}
      aria-label="Clear search"
      tabindex="-1"
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </button>
  {/if}
</div>

<style>
  .plasma-searchfield {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--plasma-font-sans);
    background-color: var(--plasma-color-view-bg);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-full);
    color: var(--plasma-color-text);
    box-shadow: var(--plasma-shadow-xs);
    transition: var(--plasma-transition-fast);
  }

  .plasma-searchfield:hover:not(.plasma-searchfield--disabled):not(:focus-within) {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-searchfield:focus-within:not(.plasma-searchfield--disabled) {
    border-color: var(--plasma-color-highlight);
    box-shadow: var(--plasma-shadow-focus);
  }

  .plasma-searchfield--disabled {
    opacity: 0.45;
    cursor: not-allowed;
    background-color: var(--plasma-color-surface-sunken);
  }

  /* --------------------------------------------------------------------------
     Icons & Input
     -------------------------------------------------------------------------- */
  .plasma-searchfield-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-left: var(--plasma-space-md);
    color: var(--plasma-color-text-muted);
    flex-shrink: 0;
  }

  .plasma-searchfield-input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 var(--plasma-space-sm);
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  .plasma-searchfield-input::-webkit-search-decoration,
  .plasma-searchfield-input::-webkit-search-cancel-button {
    display: none;
  }

  .plasma-searchfield-input::placeholder {
    color: var(--plasma-color-text-muted);
    opacity: 0.75;
  }

  .plasma-searchfield-clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: var(--plasma-space-sm);
    border: none;
    border-radius: var(--plasma-radius-full);
    background: transparent;
    color: var(--plasma-color-text-muted);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
    flex-shrink: 0;
  }

  .plasma-searchfield-clear:hover {
    background-color: rgba(0, 0, 0, 0.15);
    color: var(--plasma-color-text);
  }

  /* Loading Spinner */
  .plasma-searchfield-spinner {
    width: 14px;
    height: 14px;
    margin-right: var(--plasma-space-md);
    border: 2px solid var(--plasma-color-border-subtle);
    border-top-color: var(--plasma-color-highlight);
    border-radius: var(--plasma-radius-full);
    animation: plasma-spin 0.8s linear infinite;
    flex-shrink: 0;
  }

  @keyframes plasma-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  .plasma-searchfield--sm {
    height: var(--plasma-control-height-sm);
    font-size: var(--plasma-font-size-xs);
  }

  .plasma-searchfield--md {
    height: var(--plasma-control-height-md);
    font-size: var(--plasma-font-size-base);
  }

  .plasma-searchfield--lg {
    height: var(--plasma-control-height-lg);
    font-size: var(--plasma-font-size-md);
  }
</style>
