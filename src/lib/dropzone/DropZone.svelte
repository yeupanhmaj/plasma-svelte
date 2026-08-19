<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onerror"> {
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    loading?: boolean;
    title?: string;
    subtitle?: string;
    icon?: Snippet;
    children?: Snippet;
    onfiles?: (files: File[]) => void;
    onerror?: (message: string) => void;
  }

  let {
    accept = "*",
    multiple = false,
    disabled = false,
    loading = false,
    title = "Drop files here, or browse",
    subtitle = "Supports file uploads",
    icon,
    children,
    onfiles,
    onerror,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  let isDragOver = $state(false);
  let fileInput = $state<HTMLInputElement | null>(null);

  function isAccepted(file: File): boolean {
    if (!accept || accept === "*") return true;
    const acceptedTypes = accept.split(",").map((t) => t.trim().toLowerCase());
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    return acceptedTypes.some((pattern) => {
      if (pattern.startsWith(".")) {
        return fileName.endsWith(pattern);
      }
      if (pattern.endsWith("/*")) {
        const baseType = pattern.replace("/*", "");
        return fileType.startsWith(baseType);
      }
      return fileType === pattern;
    });
  }

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0 || disabled || loading) return;

    const filesArray = Array.from(fileList);
    const validFiles: File[] = [];
    const invalidFiles: File[] = [];

    for (const f of filesArray) {
      if (isAccepted(f)) {
        validFiles.push(f);
      } else {
        invalidFiles.push(f);
      }
    }

    if (invalidFiles.length > 0) {
      const msg = `Unsupported file type: ${invalidFiles.map((f) => f.name).join(", ")}. Accepted: ${accept}`;
      onerror?.(msg);
    }

    if (validFiles.length > 0) {
      onfiles?.(multiple ? validFiles : [validFiles[0]]);
    }

    if (fileInput) {
      fileInput.value = "";
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (disabled || loading) return;
    isDragOver = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragOver = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragOver = false;
    if (disabled || loading) return;
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function handleClick() {
    if (!disabled && !loading) {
      fileInput?.click();
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if ((e.key === "Enter" || e.key === " ") && !disabled && !loading) {
      e.preventDefault();
      fileInput?.click();
    }
  }
</script>

<div
  role="button"
  tabindex={disabled || loading ? -1 : 0}
  class="plasma-dropzone {customClass}"
  class:plasma-dropzone--dragover={isDragOver}
  class:plasma-dropzone--disabled={disabled}
  class:plasma-dropzone--loading={loading}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  onclick={handleClick}
  onkeydown={handleKeyDown}
  {...restProps}
>
  <input
    bind:this={fileInput}
    type="file"
    {accept}
    {multiple}
    {disabled}
    onchange={(e) => handleFiles((e.target as HTMLInputElement).files)}
    class="plasma-dropzone-input"
    tabindex="-1"
  />

  {#if loading}
    <div class="plasma-dropzone-loading">
      <span class="plasma-dropzone-spinner"></span>
      <span class="plasma-dropzone-title">Uploading...</span>
    </div>
  {:else if children}
    {@render children()}
  {:else}
    <div class="plasma-dropzone-icon">
      {#if icon}
        {@render icon()}
      {:else}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      {/if}
    </div>

    <div class="plasma-dropzone-text">
      <span class="plasma-dropzone-title">{title}</span>
      {#if subtitle}
        <span class="plasma-dropzone-subtitle">{subtitle}</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .plasma-dropzone {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--plasma-space-xl) var(--plasma-space-lg);
    border: 2px dashed var(--plasma-color-border);
    border-radius: var(--plasma-radius-lg);
    background-color: var(--plasma-color-surface-sunken);
    color: var(--plasma-color-text);
    font-family: var(--plasma-font-sans);
    text-align: center;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    transition: var(--plasma-transition-fast);
    width: 100%;
    min-height: 160px;
    gap: var(--plasma-space-sm);
  }

  .plasma-dropzone:hover:not(.plasma-dropzone--disabled):not(.plasma-dropzone--loading) {
    border-color: var(--plasma-color-highlight);
    background-color: var(--plasma-color-highlight-soft);
  }

  .plasma-dropzone--dragover {
    border-color: var(--plasma-color-highlight) !important;
    background-color: var(--plasma-color-highlight-soft) !important;
    transform: scale(1.008);
  }

  .plasma-dropzone--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .plasma-dropzone--loading {
    cursor: wait;
  }

  .plasma-dropzone:focus-visible {
    outline: 2px solid var(--plasma-color-highlight);
    outline-offset: 2px;
  }

  .plasma-dropzone-input {
    display: none;
  }

  .plasma-dropzone-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--plasma-color-highlight);
    transition: transform var(--plasma-transition-fast);
  }

  .plasma-dropzone:hover:not(.plasma-dropzone--disabled) .plasma-dropzone-icon {
    transform: translateY(-2px);
  }

  .plasma-dropzone-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .plasma-dropzone-title {
    font-weight: var(--plasma-font-weight-bold);
    font-size: var(--plasma-font-size-base);
    color: var(--plasma-color-text);
  }

  .plasma-dropzone-subtitle {
    font-size: var(--plasma-font-size-xs);
    color: var(--plasma-color-text-muted);
  }

  .plasma-dropzone-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--plasma-space-sm);
  }

  .plasma-dropzone-spinner {
    width: 28px;
    height: 28px;
    border: 3px solid var(--plasma-color-border-subtle);
    border-top-color: var(--plasma-color-highlight);
    border-radius: var(--plasma-radius-full);
    animation: plasma-spin 0.8s linear infinite;
  }

  @keyframes plasma-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
