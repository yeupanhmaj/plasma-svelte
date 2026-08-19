<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type DrawerPlacement = "left" | "right" | "top" | "bottom";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    inline?: boolean;
    placement?: DrawerPlacement;
    title?: string;
    subtitle?: string;
    width?: string;
    height?: string;
    closeOnEsc?: boolean;
    closeOnBackdrop?: boolean;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
    onclose?: () => void;
  }

  let {
    open = $bindable(false),
    inline = false,
    placement = "right",
    title = "",
    subtitle = "",
    width = "360px",
    height = "320px",
    closeOnEsc = true,
    closeOnBackdrop = true,
    header,
    footer,
    children,
    onclose,
    class: customClass = "",
    style = "",
    ...restProps
  }: Props = $props();

  function close() {
    open = false;
    onclose?.();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (!inline && closeOnBackdrop && e.target === e.currentTarget) {
      close();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (open && !inline && closeOnEsc && e.key === "Escape") {
      e.stopPropagation();
      close();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open || inline}
  <div
    class="plasma-drawer-backdrop"
    class:plasma-drawer-backdrop--inline={inline}
    onclick={handleBackdropClick}
    role="presentation"
  >
    <div
      role="dialog"
      aria-modal={!inline}
      aria-labelledby={title ? "plasma-drawer-title" : undefined}
      class="plasma-drawer plasma-drawer--{placement} {customClass}"
      class:plasma-drawer--inline={inline}
      style="{placement === 'left' || placement === 'right' ? `width: ${width};` : `height: ${height};`} {style}"
      {...restProps}
    >
      <!-- Header -->
      <div class="plasma-drawer-header">
        {#if header}
          {@render header()}
        {:else}
          <div class="plasma-drawer-titles">
            {#if title}
              <h2 id="plasma-drawer-title" class="plasma-drawer-title">{title}</h2>
            {/if}
            {#if subtitle}
              <span class="plasma-drawer-subtitle">{subtitle}</span>
            {/if}
          </div>
        {/if}

        {#if !inline}
          <button
            type="button"
            class="plasma-drawer-close-btn"
            onclick={close}
            aria-label="Close drawer"
          >
            <svg
              aria-hidden="true"
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
      </div>

      <!-- Body -->
      {#if children}
        <div class="plasma-drawer-body">
          {@render children()}
        </div>
      {/if}

      <!-- Footer -->
      {#if footer}
        <div class="plasma-drawer-footer">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* --------------------------------------------------------------------------
     Backdrop Overlay
     -------------------------------------------------------------------------- */
  .plasma-drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    animation: plasma-drawer-fade var(--plasma-duration-base) var(--plasma-ease-default);
  }

  .plasma-drawer-backdrop--inline {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    z-index: auto;
    width: 100%;
    min-height: 100%;
    background-color: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    animation: none;
    display: flex;
    justify-content: center;
  }

  /* --------------------------------------------------------------------------
     Drawer Sheet Panel (Kirigami.OverlaySheet)
     -------------------------------------------------------------------------- */
  .plasma-drawer {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    background-color: var(--plasma-color-surface);
    color: var(--plasma-color-text);
    font-family: var(--plasma-font-sans);
    box-shadow: var(--plasma-shadow-lg);
    box-sizing: border-box;
    overflow: hidden;
  }

  .plasma-drawer--inline {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    z-index: auto;
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-lg);
    max-height: 480px;
    animation: none !important;
  }

  /* Placements */
  .plasma-drawer--right:not(.plasma-drawer--inline) {
    top: 0;
    right: 0;
    bottom: 0;
    border-left: 1px solid var(--plasma-color-border);
    animation: plasma-slide-left var(--plasma-duration-base) var(--plasma-ease-default);
  }

  .plasma-drawer--left:not(.plasma-drawer--inline) {
    top: 0;
    left: 0;
    bottom: 0;
    border-right: 1px solid var(--plasma-color-border);
    animation: plasma-slide-right var(--plasma-duration-base) var(--plasma-ease-default);
  }

  .plasma-drawer--bottom:not(.plasma-drawer--inline) {
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid var(--plasma-color-border);
    border-top-left-radius: var(--plasma-radius-xl);
    border-top-right-radius: var(--plasma-radius-xl);
    animation: plasma-slide-up var(--plasma-duration-base) var(--plasma-ease-default);
  }

  .plasma-drawer--top:not(.plasma-drawer--inline) {
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid var(--plasma-color-border);
    border-bottom-left-radius: var(--plasma-radius-xl);
    border-bottom-right-radius: var(--plasma-radius-xl);
    animation: plasma-slide-down var(--plasma-duration-base) var(--plasma-ease-default);
  }

  /* --------------------------------------------------------------------------
     Header, Body, Footer
     -------------------------------------------------------------------------- */
  .plasma-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--plasma-space-md) var(--plasma-space-lg);
    border-bottom: 1px solid var(--plasma-color-border-subtle);
    background-color: var(--plasma-color-surface);
    flex-shrink: 0;
  }

  .plasma-drawer-titles {
    display: flex;
    flex-direction: column;
  }

  .plasma-drawer-title {
    margin: 0;
    font-size: var(--plasma-font-size-md);
    font-weight: var(--plasma-font-weight-bold);
    color: var(--plasma-color-text);
  }

  .plasma-drawer-subtitle {
    font-size: 11px;
    color: var(--plasma-color-text-muted);
  }

  .plasma-drawer-close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: var(--plasma-radius-full);
    border: none;
    background: transparent;
    color: var(--plasma-color-text-muted);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-drawer-close-btn:hover {
    color: #ffffff;
    background-color: var(--plasma-color-negative);
  }

  .plasma-drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--plasma-space-lg);
    font-size: var(--plasma-font-size-base);
    line-height: var(--plasma-line-height-base);
    scrollbar-width: thin;
    scrollbar-color: var(--plasma-color-border) transparent;
  }

  .plasma-drawer-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--plasma-space-sm);
    padding: var(--plasma-space-md) var(--plasma-space-lg);
    border-top: 1px solid var(--plasma-color-border-subtle);
    background-color: var(--plasma-color-surface-sunken);
    flex-shrink: 0;
  }

  /* --------------------------------------------------------------------------
     Slide Animations
     -------------------------------------------------------------------------- */
  @keyframes plasma-drawer-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes plasma-slide-left {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @keyframes plasma-slide-right {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @keyframes plasma-slide-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  @keyframes plasma-slide-down {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
</style>
