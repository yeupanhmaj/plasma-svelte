<script lang="ts">
  import type { Snippet } from "svelte";
  import Modal from "./Modal.svelte";
  import Button from "../button/Button.svelte";

  type ConfirmVariant = "primary" | "danger" | "default";

  interface Props {
    open?: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: ConfirmVariant;
    loading?: boolean;
    icon?: Snippet;
    children?: Snippet;
    onconfirm?: () => void | Promise<void>;
    oncancel?: () => void;
    onclose?: () => void;
  }

  let {
    open = $bindable(false),
    title = "Confirm Action",
    message = "",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmVariant = "primary",
    loading = false,
    icon,
    children,
    onconfirm,
    oncancel,
    onclose,
  }: Props = $props();

  async function handleConfirm() {
    if (loading) return;
    await onconfirm?.();
  }

  function handleCancel() {
    if (loading) return;
    open = false;
    oncancel?.();
  }
</script>

<Modal
  bind:open
  {title}
  size="sm"
  closeOnEsc={!loading}
  closeOnBackdrop={!loading}
  {onclose}
>
  <div class="plasma-confirm-body">
    {#if icon}
      <div class="plasma-confirm-icon plasma-confirm-icon--{confirmVariant}">
        {@render icon()}
      </div>
    {:else if confirmVariant === "danger"}
      <div class="plasma-confirm-icon plasma-confirm-icon--danger">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
    {/if}

    <div class="plasma-confirm-text">
      {#if message}
        <p class="plasma-confirm-message">{message}</p>
      {/if}
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>

  {#snippet footer()}
    <Button
      variant="flat"
      disabled={loading}
      onclick={handleCancel}
    >
      {cancelText}
    </Button>
    <Button
      variant={confirmVariant === "danger" ? "danger" : "primary"}
      {loading}
      onclick={handleConfirm}
    >
      {confirmText}
    </Button>
  {/snippet}
</Modal>

<style>
  .plasma-confirm-body {
    display: flex;
    align-items: flex-start;
    gap: var(--plasma-space-md);
  }

  .plasma-confirm-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .plasma-confirm-icon--danger {
    color: var(--plasma-color-negative);
  }

  .plasma-confirm-icon--primary {
    color: var(--plasma-color-highlight);
  }

  .plasma-confirm-icon--default {
    color: var(--plasma-color-text-muted);
  }

  .plasma-confirm-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--plasma-space-xs);
  }

  .plasma-confirm-message {
    margin: 0;
    font-size: var(--plasma-font-size-base);
    line-height: var(--plasma-line-height-base);
    color: var(--plasma-color-text);
  }
</style>
