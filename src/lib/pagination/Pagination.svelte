<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type PaginationSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

  interface Props extends Omit<HTMLAttributes<HTMLElement>, "size" | "onchange"> {

    current?: number;
    total?: number;
    pageSize?: number;
    showTotal?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: number[];
    size?: PaginationSize;
    disabled?: boolean;
    onchange?: (page: number, pageSize: number) => void;
  }

  let {
    current = $bindable(1),
    total = 0,
    pageSize = $bindable(10),
    showTotal = true,
    showSizeChanger = false,
    pageSizeOptions = [10, 20, 50, 100],
    size = "md",
    disabled = false,
    onchange,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  const totalPages = $derived(Math.max(1, Math.ceil(total / pageSize)));

  const resolvedSize = $derived(
    size === "small"
      ? "sm"
      : size === "large"
        ? "lg"
        : size === "medium"
          ? "md"
          : size
  );

  // Generate page numbers with ellipses
  const pageItems = $derived.by(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("...");
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (current < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  });

  function setPage(p: number) {
    if (disabled || p < 1 || p > totalPages || p === current) return;
    current = p;
    onchange?.(current, pageSize);
  }

  function handleSizeChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    pageSize = Number(select.value);
    current = 1;
    onchange?.(current, pageSize);
  }

  const startItem = $derived(total === 0 ? 0 : (current - 1) * pageSize + 1);
  const endItem = $derived(Math.min(total, current * pageSize));
</script>

<nav
  aria-label="Pagination"
  class="plasma-pagination plasma-pagination--{resolvedSize} {customClass}"
  class:plasma-pagination--disabled={disabled}
  {...restProps}
>
  {#if showTotal}
    <span class="plasma-pagination-total">
      Showing {startItem}–{endItem} of {total}
    </span>
  {/if}

  <ul class="plasma-pagination-list">
    <!-- Prev Button -->
    <li>
      <button
        type="button"
        class="plasma-page-btn plasma-page-nav"
        disabled={disabled || current <= 1}
        onclick={() => setPage(current - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>
    </li>

    <!-- Page Numbers -->
    {#each pageItems as item, idx}
      <li>
        {#if item === "..."}
          <span class="plasma-page-ellipsis">…</span>
        {:else}
          <button
            type="button"
            class="plasma-page-btn"
            class:plasma-page-btn--active={current === item}
            {disabled}
            onclick={() => setPage(Number(item))}
            aria-current={current === item ? "page" : undefined}
          >
            {item}
          </button>
        {/if}
      </li>
    {/each}

    <!-- Next Button -->
    <li>
      <button
        type="button"
        class="plasma-page-btn plasma-page-nav"
        disabled={disabled || current >= totalPages}
        onclick={() => setPage(current + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </li>
  </ul>

  {#if showSizeChanger}
    <div class="plasma-pagination-size-changer">
      <select
        value={pageSize}
        onchange={handleSizeChange}
        {disabled}
        class="plasma-page-size-select"
        aria-label="Items per page"
      >
        {#each pageSizeOptions as opt}
          <option value={opt}>{opt} / page</option>
        {/each}
      </select>
    </div>
  {/if}
</nav>

<style>
  .plasma-pagination {
    display: inline-flex;
    align-items: center;
    gap: var(--plasma-space-md);
    font-family: var(--plasma-font-sans);
    color: var(--plasma-color-text);
    user-select: none;
    box-sizing: border-box;
  }

  .plasma-pagination-total {
    font-size: var(--plasma-font-size-sm);
    color: var(--plasma-color-text-muted);
  }

  .plasma-pagination-list {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .plasma-page-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    padding: 0 6px;
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-sm);
    background-color: var(--plasma-color-surface);
    color: var(--plasma-color-text);
    font-size: var(--plasma-font-size-sm);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-page-btn:hover:not(:disabled):not(.plasma-page-btn--active) {
    background-color: var(--plasma-color-surface-hover);
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-page-btn--active {
    background-color: var(--plasma-color-highlight) !important;
    border-color: var(--plasma-color-highlight) !important;
    color: #ffffff !important;
    font-weight: var(--plasma-font-weight-bold);
  }

  .plasma-page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .plasma-page-nav {
    font-size: 16px;
    line-height: 1;
  }

  .plasma-page-ellipsis {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 28px;
    color: var(--plasma-color-text-muted);
  }

  .plasma-page-size-select {
    padding: 2px 6px;
    background-color: var(--plasma-color-surface);
    color: var(--plasma-color-text);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-sm);
    font-family: inherit;
    font-size: var(--plasma-font-size-xs);
    cursor: pointer;
  }

  /* Sizing */
  .plasma-pagination--sm .plasma-page-btn {
    min-width: 22px;
    height: 22px;
    font-size: var(--plasma-font-size-xs);
  }

  .plasma-pagination--lg .plasma-page-btn {
    min-width: 36px;
    height: 36px;
    font-size: var(--plasma-font-size-md);
  }

  .plasma-pagination--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
