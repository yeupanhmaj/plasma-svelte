<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLTableAttributes } from "svelte/elements";

  export interface TableColumn<T = any> {
    key: string;
    title: string;
    width?: string;
    align?: "left" | "center" | "right";
    sortable?: boolean;
    render?: Snippet<[T, number]>;
  }

  type TableDensity = "compact" | "default" | "spacious";

  interface Props<T = any> extends HTMLTableAttributes {
    columns?: TableColumn<T>[];
    data?: T[];
    striped?: boolean;
    bordered?: boolean;
    hoverable?: boolean;
    density?: TableDensity;
    selectedKey?: string;
    selectedId?: string | number;
    sortKey?: string;
    sortOrder?: "asc" | "desc";
    children?: Snippet;
    headerSnippet?: Snippet;
    rowSnippet?: Snippet<[T, number]>;
    emptySnippet?: Snippet;
    onrowclick?: (row: T, index: number) => void;
    onsort?: (key: string, order: "asc" | "desc") => void;
  }

  let {
    columns = [],
    data = [],
    striped = true,
    bordered = false,
    hoverable = true,
    density = "default",
    selectedKey = "id",
    selectedId = $bindable(undefined),
    sortKey = $bindable(""),
    sortOrder = $bindable("asc"),
    children,
    headerSnippet,
    rowSnippet,
    emptySnippet,
    onrowclick,
    onsort,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  function handleSort(key: string, sortable?: boolean) {
    if (!sortable) return;
    if (sortKey === key) {
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      sortKey = key;
      sortOrder = "asc";
    }
    onsort?.(sortKey, sortOrder);
  }

  function handleRowClick(row: any, index: number) {
    if (selectedKey && row && row[selectedKey] !== undefined) {
      selectedId = row[selectedKey];
    }
    onrowclick?.(row, index);
  }
</script>

<div
  class="plasma-table-container"
  class:plasma-table-container--bordered={bordered}
>
  <table
    class="plasma-table plasma-table--{density} {customClass}"
    class:plasma-table--striped={striped}
    class:plasma-table--hoverable={hoverable}
    class:plasma-table--bordered={bordered}
    {...restProps}
  >
    {#if headerSnippet}
      <thead>
        {@render headerSnippet()}
      </thead>
    {:else if columns.length > 0}
      <thead>
        <tr>
          {#each columns as col}
            <th
              style="{col.width
                ? `width: ${col.width};`
                : ''} text-align: {col.align || 'left'};"
              class:plasma-th--sortable={col.sortable}
              class:plasma-th--sorted={sortKey === col.key}
              onclick={() => handleSort(col.key, col.sortable)}
            >
              <div
                class="plasma-th-content"
                style="justify-content: {col.align === 'right'
                  ? 'flex-end'
                  : col.align === 'center'
                    ? 'center'
                    : 'flex-start'};"
              >
                <span>{col.title}</span>
                {#if col.sortable}
                  <span class="plasma-sort-indicator">
                    {#if sortKey === col.key}
                      {sortOrder === "asc" ? "▲" : "▼"}
                    {:else}
                      <span class="plasma-sort-indicator--idle">▲</span>
                    {/if}
                  </span>
                {/if}
              </div>
            </th>
          {/each}
        </tr>
      </thead>
    {/if}

    <tbody>
      {#if children}
        {@render children()}
      {:else if data.length > 0}
        {#each data as row, idx}
          {@const isSelected =
            selectedId !== undefined && row[selectedKey] === selectedId}
          <tr
            class:plasma-tr--selected={isSelected}
            onclick={() => handleRowClick(row, idx)}
          >
            {#if rowSnippet}
              {@render rowSnippet(row, idx)}
            {:else}
              {#each columns as col}
                <td style="text-align: {col.align || 'left'};">
                  {#if col.render}
                    {@render col.render(row, idx)}
                  {:else}
                    {row[col.key] ?? ""}
                  {/if}
                </td>
              {/each}
            {/if}
          </tr>
        {/each}
      {:else}
        <tr>
          <td colspan={columns.length || 1} class="plasma-table-empty">
            {#if emptySnippet}
              {@render emptySnippet()}
            {:else}
              No data available
            {/if}
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>

<style>
  .plasma-table-container {
    width: 100%;
    overflow-x: auto;
    background-color: var(--plasma-color-view-bg);
    border: 1px solid var(--plasma-color-border-subtle);
    border-radius: var(--plasma-radius-md);
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: var(--plasma-color-border) transparent;
  }

  .plasma-table-container--bordered {
    border-color: var(--plasma-color-border);
  }

  .plasma-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--plasma-font-sans);
    font-size: var(--plasma-font-size-base);
    color: var(--plasma-color-text);
    text-align: left;
    box-sizing: border-box;
  }

  /* --------------------------------------------------------------------------
     Header Styling (QHeaderView)
     -------------------------------------------------------------------------- */
  .plasma-table thead {
    background-color: var(--plasma-color-surface);
    border-bottom: 1px solid var(--plasma-color-border);
    position: sticky;
    top: 0;
    z-index: 2;
  }

  .plasma-table th {
    padding: var(--plasma-space-sm) var(--plasma-space-md);
    font-size: var(--plasma-font-size-sm);
    font-weight: var(--plasma-font-weight-bold);
    color: var(--plasma-color-text);
    user-select: none;
    border-bottom: 1px solid var(--plasma-color-border);
    transition: var(--plasma-transition-fast);
  }

  .plasma-th--sortable {
    cursor: pointer;
  }

  .plasma-th--sortable:hover {
    background-color: var(--plasma-color-surface-hover);
    color: var(--plasma-color-highlight);
  }

  .plasma-th-content {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    width: 100%;
  }

  .plasma-sort-indicator {
    font-size: 10px;
    color: var(--plasma-color-highlight);
  }

  .plasma-sort-indicator--idle {
    color: var(--plasma-color-text-muted);
    opacity: 0.3;
  }

  /* --------------------------------------------------------------------------
     Body & Cell Rows
     -------------------------------------------------------------------------- */
  .plasma-table td {
    padding: var(--plasma-space-sm) var(--plasma-space-md);
    border-bottom: 1px solid var(--plasma-color-border-subtle);
    transition: var(--plasma-transition-fast);
  }

  /* Density */
  .plasma-table--compact td,
  .plasma-table--compact th {
    padding: 4px var(--plasma-space-sm);
    font-size: var(--plasma-font-size-xs);
  }

  .plasma-table--default td,
  .plasma-table--default th {
    padding: 8px var(--plasma-space-md);
  }

  .plasma-table--spacious td,
  .plasma-table--spacious th {
    padding: 12px var(--plasma-space-lg);
  }

  /* Zebra Striping */
  .plasma-table--striped tbody tr:nth-child(even):not(.plasma-tr--selected) {
    background-color: var(--plasma-color-surface-sunken);
  }

  /* Hover */
  .plasma-table--hoverable tbody tr:hover:not(.plasma-tr--selected) {
    background-color: var(--plasma-color-surface-hover);
  }

  /* KDE Active Row Selection */
  .plasma-tr--selected {
    position: relative;
    background-color: var(--plasma-color-highlight-soft) !important;
    color: var(--plasma-color-highlight);
    font-weight: var(--plasma-font-weight-medium);
  }

  .plasma-tr--selected td:first-child {
    box-shadow: inset 2px 0 0 var(--plasma-color-highlight);
  }

  /* Bordered table lines */
  .plasma-table--bordered th,
  .plasma-table--bordered td {
    border-right: 1px solid var(--plasma-color-border-subtle);
  }

  .plasma-table--bordered th:last-child,
  .plasma-table--bordered td:last-child {
    border-right: none;
  }

  .plasma-table-empty {
    text-align: center;
    padding: var(--plasma-space-xl) !important;
    color: var(--plasma-color-text-muted);
  }
</style>
