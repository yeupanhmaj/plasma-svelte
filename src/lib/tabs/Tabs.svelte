<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export interface TabItem {
    id: string;
    label: string;
    badge?: string | number;
    disabled?: boolean;
    icon?: Snippet;
  }

  type TabsVariant = "line" | "pill";
  type TabsSize = "sm" | "md" | "lg";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onchange"> {
    items: TabItem[];
    activeId?: string;
    variant?: TabsVariant;
    size?: TabsSize;
    onchange?: (id: string) => void;
  }


  let {
    items,
    activeId = $bindable(items[0]?.id ?? ""),
    variant = "line",
    size = "md",
    onchange,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  function selectTab(id: string, disabled?: boolean) {
    if (disabled) return;
    activeId = id;
    onchange?.(id);
  }
</script>

<div
  class="plasma-tabs plasma-tabs--{variant} plasma-tabs--{size} {customClass}"
  role="tablist"
  {...restProps}
>
  {#each items as item}
    {@const isActive = activeId === item.id}
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={item.disabled}
      class="plasma-tab"
      class:plasma-tab--active={isActive}
      class:plasma-tab--disabled={item.disabled}
      onclick={() => selectTab(item.id, item.disabled)}
    >
      {#if item.icon}
        <span class="plasma-tab-icon">
          {@render item.icon()}
        </span>
      {/if}

      <span class="plasma-tab-label">{item.label}</span>

      {#if item.badge !== undefined}
        <span class="plasma-tab-badge">{item.badge}</span>
      {/if}

      {#if variant === "line" && isActive}
        <span class="plasma-tab-indicator"></span>
      {/if}
    </button>
  {/each}
</div>

<style>
  .plasma-tabs {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    font-family: var(--plasma-font-sans);
  }

  /* --------------------------------------------------------------------------
     Line Variant (Classic KDE Breeze Tab Bar)
     -------------------------------------------------------------------------- */
  .plasma-tabs--line {
    border-bottom: 1px solid var(--plasma-color-border-subtle);
    gap: var(--plasma-space-xs);
    width: 100%;
  }

  .plasma-tabs--line .plasma-tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--plasma-space-xs);
    background: transparent;
    border: none;
    color: var(--plasma-color-text-muted);
    font-weight: var(--plasma-font-weight-medium);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
    padding: 0 var(--plasma-space-md);
  }

  .plasma-tabs--line .plasma-tab:hover:not(.plasma-tab--disabled) {
    color: var(--plasma-color-text);
  }

  .plasma-tabs--line .plasma-tab--active {
    color: var(--plasma-color-highlight);
  }

  .plasma-tabs--line .plasma-tab-indicator {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--plasma-color-highlight);
    border-radius: 1px;
  }

  /* --------------------------------------------------------------------------
     Pill / Segmented Variant (Toolbar Switcher)
     -------------------------------------------------------------------------- */
  .plasma-tabs--pill {
    background-color: var(--plasma-color-surface-sunken);
    border: 1px solid var(--plasma-color-border-subtle);
    border-radius: var(--plasma-radius-md);
    padding: 2px;
    gap: 2px;
  }

  .plasma-tabs--pill .plasma-tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--plasma-space-xs);
    background: transparent;
    border: none;
    border-radius: calc(var(--plasma-radius-md) - 2px);
    color: var(--plasma-color-text-muted);
    font-weight: var(--plasma-font-weight-medium);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-tabs--pill .plasma-tab:hover:not(.plasma-tab--disabled) {
    color: var(--plasma-color-text);
    background-color: var(--plasma-color-surface-hover);
  }

  .plasma-tabs--pill .plasma-tab--active {
    background-color: var(--plasma-color-surface);
    color: var(--plasma-color-text);
    box-shadow: var(--plasma-shadow-xs);
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  .plasma-tabs--sm .plasma-tab {
    height: var(--plasma-control-height-sm);
    font-size: var(--plasma-font-size-xs);
    padding: 0 var(--plasma-space-sm);
  }

  .plasma-tabs--md .plasma-tab {
    height: var(--plasma-control-height-md);
    font-size: var(--plasma-font-size-base);
    padding: 0 var(--plasma-space-md);
  }

  .plasma-tabs--lg .plasma-tab {
    height: var(--plasma-control-height-lg);
    font-size: var(--plasma-font-size-md);
    padding: 0 var(--plasma-space-lg);
  }

  /* Disabled & Focus */
  .plasma-tab--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .plasma-tab:focus-visible {
    outline: 2px solid var(--plasma-color-highlight);
    outline-offset: 1px;
  }

  /* Badge */
  .plasma-tab-badge {
    font-size: 11px;
    line-height: 1;
    padding: 2px 6px;
    border-radius: var(--plasma-radius-full);
    background-color: var(--plasma-color-surface-sunken);
    color: var(--plasma-color-text-muted);
  }

  .plasma-tab--active .plasma-tab-badge {
    background-color: var(--plasma-color-highlight-soft);
    color: var(--plasma-color-highlight);
  }

  .plasma-tab-icon {
    display: inline-flex;
    align-items: center;
  }
</style>
