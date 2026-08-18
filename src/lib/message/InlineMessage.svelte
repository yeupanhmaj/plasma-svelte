<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type MessageType =
    | "information"
    | "info"
    | "positive"
    | "success"
    | "warning"
    | "neutral"
    | "negative"
    | "error";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    type?: MessageType;
    title?: string;
    text?: string;
    closable?: boolean;
    actions?: Snippet;
    children?: Snippet;
    onclose?: () => void;
  }

  let {
    type = "information",
    title = "",
    text = "",
    closable = false,
    actions,
    children,
    onclose,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  let isVisible = $state(true);

  const resolvedType = $derived(
    type === "info"
      ? "information"
      : type === "success"
        ? "positive"
        : type === "warning"
          ? "neutral"
          : type === "error"
            ? "negative"
            : type
  );

  function handleClose() {
    isVisible = false;
    onclose?.();
  }
</script>

{#if isVisible}
  <div
    role="status"
    class="plasma-message plasma-message--{resolvedType} {customClass}"
    {...restProps}
  >
    <div class="plasma-message-icon">
      {#if resolvedType === "positive"}
        <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
      {:else if resolvedType === "neutral"}
        <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
      {:else if resolvedType === "negative"}
        <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
      {:else}
        <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
      {/if}
    </div>

    <div class="plasma-message-content">
      {#if title}
        <span class="plasma-message-title">{title}</span>
      {/if}

      {#if children}
        <div class="plasma-message-body">
          {@render children()}
        </div>
      {:else if text}
        <div class="plasma-message-body">
          {text}
        </div>
      {/if}
    </div>

    {#if actions}
      <div class="plasma-message-actions">
        {@render actions()}
      </div>
    {/if}

    {#if closable}
      <button
        type="button"
        class="plasma-message-close"
        onclick={handleClose}
        aria-label="Dismiss message"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    {/if}
  </div>
{/if}

<style>
  .plasma-message {
    display: flex;
    align-items: flex-start;
    gap: var(--plasma-space-md);
    padding: var(--plasma-space-md);
    border-radius: var(--plasma-radius-md);
    font-family: var(--plasma-font-sans);
    font-size: var(--plasma-font-size-base);
    box-sizing: border-box;
    width: 100%;
    border: 1px solid transparent;
    transition: var(--plasma-transition-fast);
  }

  .plasma-message-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .plasma-message-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    line-height: 1.4;
  }

  .plasma-message-title {
    font-weight: var(--plasma-font-weight-bold);
    font-size: var(--plasma-font-size-base);
  }

  .plasma-message-body {
    font-size: var(--plasma-font-size-sm);
  }

  .plasma-message-actions {
    display: flex;
    align-items: center;
    gap: var(--plasma-space-xs);
    flex-shrink: 0;
  }

  .plasma-message-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: var(--plasma-radius-full);
    border: none;
    background: transparent;
    color: inherit;
    opacity: 0.7;
    cursor: pointer;
    transition: var(--plasma-transition-fast);
    flex-shrink: 0;
  }

  .plasma-message-close:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.15);
  }

  /* --------------------------------------------------------------------------
     Theme & Role Variants
     -------------------------------------------------------------------------- */
  .plasma-message--information {
    background-color: var(--plasma-color-highlight-soft);
    border-color: rgba(61, 174, 233, 0.4);
    color: var(--plasma-color-text);
  }
  .plasma-message--information .plasma-message-icon {
    color: var(--plasma-color-highlight);
  }

  .plasma-message--positive {
    background-color: var(--plasma-color-positive-soft);
    border-color: rgba(39, 174, 96, 0.4);
    color: var(--plasma-color-text);
  }
  .plasma-message--positive .plasma-message-icon {
    color: var(--plasma-color-positive);
  }

  .plasma-message--neutral {
    background-color: var(--plasma-color-neutral-soft);
    border-color: rgba(246, 116, 0, 0.4);
    color: var(--plasma-color-text);
  }
  .plasma-message--neutral .plasma-message-icon {
    color: var(--plasma-color-neutral);
  }

  .plasma-message--negative {
    background-color: var(--plasma-color-negative-soft);
    border-color: rgba(218, 68, 83, 0.4);
    color: var(--plasma-color-text);
  }
  .plasma-message--negative .plasma-message-icon {
    color: var(--plasma-color-negative);
  }
</style>
