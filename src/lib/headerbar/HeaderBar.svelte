<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLElement> {
    title?: string;
    subtitle?: string;
    windowControls?: boolean;
    icon?: Snippet;
    left?: Snippet;
    center?: Snippet;
    right?: Snippet;
    onminimize?: () => void;
    onmaximize?: () => void;
    onclose?: () => void;
  }

  let {
    title = "",
    subtitle = "",
    windowControls = false,
    icon,
    left,
    center,
    right,
    onminimize,
    onmaximize,
    onclose,
    class: customClass = "",
    ...restProps
  }: Props = $props();
</script>

<header class="plasma-headerbar {customClass}" {...restProps}>
  <!-- Left section -->
  <div class="plasma-headerbar-section plasma-headerbar-left">
    {#if left}
      {@render left()}
    {:else}
      {#if icon}
        <span class="plasma-headerbar-icon">
          {@render icon()}
        </span>
      {/if}
      {#if title || subtitle}
        <div class="plasma-headerbar-titles">
          {#if title}
            <span class="plasma-headerbar-title">{title}</span>
          {/if}
          {#if subtitle}
            <span class="plasma-headerbar-subtitle">{subtitle}</span>
          {/if}
        </div>
      {/if}
    {/if}
  </div>

  <!-- Center section -->
  {#if center}
    <div class="plasma-headerbar-section plasma-headerbar-center">
      {@render center()}
    </div>
  {/if}

  <!-- Right section -->
  <div class="plasma-headerbar-section plasma-headerbar-right">
    {#if right}
      {@render right()}
    {/if}

    {#if windowControls}
      <div class="plasma-headerbar-controls">
        <button
          type="button"
          aria-label="Minimize"
          onclick={onminimize}
          class="plasma-win-btn plasma-win-btn--minimize"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
            <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Maximize"
          onclick={onmaximize}
          class="plasma-win-btn plasma-win-btn--maximize"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v7A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 3h-11zm0 1h11a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Close window"
          onclick={onclose}
          class="plasma-win-btn plasma-win-btn--close"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
    {/if}
  </div>
</header>

<style>
  .plasma-headerbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;
    padding: 0 var(--plasma-space-md);
    background-color: var(--plasma-color-surface);
    border-bottom: 1px solid var(--plasma-color-border-subtle);
    font-family: var(--plasma-font-sans);
    box-sizing: border-box;
    user-select: none;
  }

  .plasma-headerbar-section {
    display: flex;
    align-items: center;
    gap: var(--plasma-space-sm);
  }

  .plasma-headerbar-left {
    flex: 1;
    justify-content: flex-start;
  }

  .plasma-headerbar-center {
    flex: 2;
    justify-content: center;
  }

  .plasma-headerbar-right {
    flex: 1;
    justify-content: flex-end;
  }

  .plasma-headerbar-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--plasma-color-highlight);
    flex-shrink: 0;
  }

  .plasma-headerbar-titles {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .plasma-headerbar-title {
    font-size: var(--plasma-font-size-base);
    font-weight: var(--plasma-font-weight-bold);
    color: var(--plasma-color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .plasma-headerbar-subtitle {
    font-size: 11px;
    color: var(--plasma-color-text-muted);
  }

  /* --------------------------------------------------------------------------
     KDE Breeze Window Controls (─, □, ✕)
     -------------------------------------------------------------------------- */
  .plasma-headerbar-controls {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: var(--plasma-space-md);
    padding-left: var(--plasma-space-sm);
    border-left: 1px solid var(--plasma-color-border-subtle);
  }

  .plasma-win-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: none;
    border-radius: var(--plasma-radius-full);
    background: transparent;
    color: var(--plasma-color-text-muted);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-win-btn:hover {
    background-color: var(--plasma-color-surface-hover);
    color: var(--plasma-color-text);
  }

  .plasma-win-btn--close:hover {
    background-color: var(--plasma-color-negative);
    color: #ffffff;
  }

  .plasma-win-btn:focus-visible {
    outline: 2px solid var(--plasma-color-highlight);
  }
</style>
