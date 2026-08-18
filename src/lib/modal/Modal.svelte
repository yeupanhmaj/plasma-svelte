<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type ModalSize = "sm" | "md" | "lg" | "fullscreen";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    title?: string;
    size?: ModalSize;
    inline?: boolean;
    closeOnEsc?: boolean;
    closeOnBackdrop?: boolean;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
    onclose?: () => void;
  }

  let {
    open = $bindable(false),
    title = "",
    size = "md",
    inline = false,
    closeOnEsc = true,
    closeOnBackdrop = true,
    header,
    footer,
    children,
    onclose,
    class: customClass = "",
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

{#if open}
  <!-- biome-ignore lint/a11y/noStaticElementInteractions: false positive -->
  <div
    class="plasma-modal-backdrop"
    class:plasma-modal-backdrop--inline={inline}
    onclick={handleBackdropClick}
    role="presentation"
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "plasma-modal-title" : undefined}
      class="plasma-modal plasma-modal--{size} {customClass}"
      {...restProps}
    >
      <!-- Title Bar -->
      <div class="plasma-modal-header">
        {#if header}
          {@render header()}
        {:else}
          <h2 id="plasma-modal-title" class="plasma-modal-title">{title}</h2>
        {/if}

        <button
          type="button"
          class="plasma-modal-close-btn"
          onclick={close}
          aria-label="Close dialog"
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
      </div>

      <!-- Body -->
      {#if children}
        <div class="plasma-modal-body">
          {@render children()}
        </div>
      {/if}

      <!-- Footer -->
      {#if footer}
        <div class="plasma-modal-footer">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* --------------------------------------------------------------------------
     Backdrop
     -------------------------------------------------------------------------- */
  .plasma-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--plasma-space-lg);
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    animation: plasma-fade-in var(--plasma-duration-base)
      var(--plasma-ease-default);
  }

  .plasma-modal-backdrop--inline {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    z-index: auto;
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: var(--plasma-space-md);
    background-color: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    animation: none;
  }

  /* --------------------------------------------------------------------------
     Modal Frame (KDE Breeze Floating Window)
     -------------------------------------------------------------------------- */
  .plasma-modal {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    max-height: calc(100vh - 4rem);
    background-color: var(--plasma-color-surface);
    color: var(--plasma-color-text);
    font-family: var(--plasma-font-sans);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-xl);
    box-shadow: var(--plasma-shadow-lg);
    overflow: hidden;
    animation: plasma-scale-in var(--plasma-duration-base)
      var(--plasma-ease-default);
  }

  /* Sizing */
  .plasma-modal--sm {
    max-width: 400px;
  }
  .plasma-modal--md {
    max-width: 540px;
  }
  .plasma-modal--lg {
    max-width: 760px;
  }
  .plasma-modal--fullscreen {
    max-width: calc(100vw - 2rem);
    height: calc(100vh - 2rem);
  }

  /* --------------------------------------------------------------------------
     Header / Title Bar
     -------------------------------------------------------------------------- */
  .plasma-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--plasma-space-md) var(--plasma-space-lg);
    border-bottom: 1px solid var(--plasma-color-border-subtle);
    background-color: var(--plasma-color-surface);
  }

  .plasma-modal-title {
    margin: 0;
    font-size: var(--plasma-font-size-md);
    font-weight: var(--plasma-font-weight-bold);
    color: var(--plasma-color-text);
  }

  .plasma-modal-close-btn {
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

  .plasma-modal-close-btn:hover {
    color: #ffffff;
    background-color: var(--plasma-color-negative);
  }

  .plasma-modal-close-btn:focus-visible {
    outline: 2px solid var(--plasma-color-highlight);
  }

  /* --------------------------------------------------------------------------
     Body & Footer
     -------------------------------------------------------------------------- */
  .plasma-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--plasma-space-lg);
    font-size: var(--plasma-font-size-base);
    line-height: var(--plasma-line-height-base);
  }

  .plasma-modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--plasma-space-sm);
    padding: var(--plasma-space-md) var(--plasma-space-lg);
    border-top: 1px solid var(--plasma-color-border-subtle);
    background-color: var(--plasma-color-surface-sunken);
  }

  /* --------------------------------------------------------------------------
     Animations
     -------------------------------------------------------------------------- */
  @keyframes plasma-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes plasma-scale-in {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
</style>
