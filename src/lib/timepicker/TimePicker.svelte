<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type TimePickerSize = "sm" | "md" | "lg" | "small" | "medium" | "large";
  type TimeFormat = "24h" | "12h";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "size" | "onchange"> {
    value?: string; // HH:mm or HH:mm:ss
    format?: TimeFormat;
    showSeconds?: boolean;
    minuteStep?: number;
    placeholder?: string;
    size?: TimePickerSize;
    disabled?: boolean;
    onchange?: (val: string) => void;
  }

  let {
    value = $bindable(""),
    format = "24h",
    showSeconds = false,
    minuteStep = 1,
    placeholder = "Select time...",
    size = "md",
    disabled = false,
    onchange,
    class: customClass = "",
    id,
    ...restProps
  }: Props = $props();

  let isOpen = $state(false);
  let triggerEl = $state<HTMLButtonElement | null>(null);
  let popupEl = $state<HTMLDivElement | null>(null);
  let popupStyle = $state("");

  // Parse hours, minutes, seconds from value
  const parsed = $derived.by(() => {
    if (!value) return { h: 12, m: 0, s: 0, period: "AM" as "AM" | "PM" };
    const parts = value.split(":");
    let h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    const s = parseInt(parts[2], 10) || 0;

    let period: "AM" | "PM" = "AM";
    if (format === "12h") {
      if (h >= 12) {
        period = "PM";
        if (h > 12) h -= 12;
      } else if (h === 0) {
        h = 12;
      }
    }
    return { h, m, s, period };
  });

  let selectedH = $state(12);
  let selectedM = $state(0);
  let selectedS = $state(0);
  let selectedPeriod = $state<"AM" | "PM">("AM");

  $effect(() => {
    selectedH = parsed.h;
    selectedM = parsed.m;
    selectedS = parsed.s;
    selectedPeriod = parsed.period;
  });

  const resolvedSize = $derived(
    size === "small"
      ? "sm"
      : size === "large"
        ? "lg"
        : size === "medium"
          ? "md"
          : size
  );

  const hoursList = $derived(
    format === "24h"
      ? Array.from({ length: 24 }, (_, i) => i)
      : Array.from({ length: 12 }, (_, i) => i + 1)
  );

  const minutesList = $derived(
    Array.from({ length: Math.floor(60 / minuteStep) }, (_, i) => i * minuteStep)
  );

  function emitTime(h: number, m: number, s: number, period: "AM" | "PM") {
    let finalH = h;
    if (format === "12h") {
      if (period === "PM" && h < 12) finalH += 12;
      if (period === "AM" && h === 12) finalH = 0;
    }

    const hh = String(finalH).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");

    const timeStr = showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
    value = timeStr;
    onchange?.(timeStr);
  }

  function selectHour(h: number) {
    selectedH = h;
    emitTime(selectedH, selectedM, selectedS, selectedPeriod);
  }

  function selectMinute(m: number) {
    selectedM = m;
    emitTime(selectedH, selectedM, selectedS, selectedPeriod);
  }

  function setNow() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    emitTime(h, m, s, h >= 12 ? "PM" : "AM");
    popupEl?.hidePopover();
  }

  function updatePosition() {
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    popupStyle = `top: ${rect.bottom + 4}px; left: ${rect.left}px;`;
  }

  function toggleOpen() {
    if (disabled) return;
    if (popupEl?.matches(":popover-open")) {
      popupEl.hidePopover();
    } else {
      updatePosition();
      popupEl?.showPopover();
    }
  }

  function handleToggle(e: Event) {
    const toggleEvent = e as Event & { newState?: string };
    isOpen = toggleEvent.newState === "open";
    if (isOpen) {
      updatePosition();
    }
  }
</script>

<div
  class="plasma-timepicker-container {customClass}"
  class:plasma-timepicker--disabled={disabled}
  {...restProps}
>
  <!-- Time Input Button -->
  <button
    {id}
    bind:this={triggerEl}
    type="button"
    class="plasma-timepicker-trigger plasma-timepicker--{resolvedSize}"
    class:plasma-timepicker-trigger--open={isOpen}
    {disabled}
    onclick={toggleOpen}
    aria-haspopup="dialog"
    aria-expanded={isOpen}
  >
    <span class="plasma-timepicker-icon">
      <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
      </svg>
    </span>

    <span class="plasma-timepicker-text" class:plasma-timepicker-placeholder={!value}>
      {value || placeholder}
    </span>

    <span class="plasma-timepicker-chevron" class:plasma-timepicker-chevron--open={isOpen}>
      <svg aria-hidden="true" viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
        <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
      </svg>
    </span>
  </button>

  <!-- KDE Breeze Time Picker Top-Layer Popover -->
  <div
    bind:this={popupEl}
    popover="auto"
    ontoggle={handleToggle}
    class="plasma-timepicker-popup"
    style={popupStyle}
    role="dialog"
    aria-label="Time Selector"
  >
    <div class="plasma-timepicker-columns">
      <!-- Hours Column -->
      <div class="plasma-time-column">
        <div class="plasma-time-column-header">Hours</div>
        <div class="plasma-time-column-list">
          {#each hoursList as h}
            <button
              type="button"
              class="plasma-time-cell"
              class:plasma-time-cell--selected={selectedH === h}
              onclick={() => selectHour(h)}
            >
              {String(h).padStart(2, "0")}
            </button>
          {/each}
        </div>
      </div>

      <!-- Minutes Column -->
      <div class="plasma-time-column">
        <div class="plasma-time-column-header">Min</div>
        <div class="plasma-time-column-list">
          {#each minutesList as m}
            <button
              type="button"
              class="plasma-time-cell"
              class:plasma-time-cell--selected={selectedM === m}
              onclick={() => selectMinute(m)}
            >
              {String(m).padStart(2, "0")}
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="plasma-timepicker-footer">
      <button
        type="button"
        class="plasma-time-now-btn"
        onclick={setNow}
      >
        Now
      </button>
      <button
        type="button"
        class="plasma-time-ok-btn"
        onclick={() => popupEl?.hidePopover()}
      >
        Done
      </button>
    </div>
  </div>
</div>

<style>
  .plasma-timepicker-container {
    position: relative;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--plasma-font-sans);
  }

  /* --------------------------------------------------------------------------
     Trigger Button
     -------------------------------------------------------------------------- */
  .plasma-timepicker-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 var(--plasma-space-md);
    background-color: var(--plasma-color-view-bg);
    color: var(--plasma-color-text);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-md);
    box-shadow: var(--plasma-shadow-xs);
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
    transition: var(--plasma-transition-fast);
  }

  .plasma-timepicker-trigger:hover:not(:disabled):not(.plasma-timepicker-trigger--open) {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-timepicker-trigger--open {
    border-color: var(--plasma-color-highlight);
    box-shadow: var(--plasma-shadow-focus);
  }

  .plasma-timepicker-icon {
    display: inline-flex;
    align-items: center;
    color: var(--plasma-color-text-muted);
    margin-right: var(--plasma-space-sm);
  }

  .plasma-timepicker-text {
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .plasma-timepicker-placeholder {
    color: var(--plasma-color-text-muted);
    opacity: 0.75;
  }

  .plasma-timepicker-chevron {
    display: inline-flex;
    align-items: center;
    color: var(--plasma-color-text-muted);
    transition: transform var(--plasma-duration-fast) var(--plasma-ease-default);
  }

  .plasma-timepicker-chevron--open {
    transform: rotate(180deg);
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  .plasma-timepicker--sm {
    height: var(--plasma-control-height-sm);
    font-size: var(--plasma-font-size-xs);
  }

  .plasma-timepicker--md {
    height: var(--plasma-control-height-md);
    font-size: var(--plasma-font-size-base);
  }

  .plasma-timepicker--lg {
    height: var(--plasma-control-height-lg);
    font-size: var(--plasma-font-size-md);
  }

  /* --------------------------------------------------------------------------
     Top-Layer Time Popover
     -------------------------------------------------------------------------- */
  .plasma-timepicker-popup {
    position: fixed;
    margin: 0;
    inset: unset;
    z-index: 99999;
    width: 200px;
    padding: var(--plasma-space-md);
    background-color: var(--plasma-color-surface);
    color: var(--plasma-color-text);
    font-family: var(--plasma-font-sans);
    border: 1px solid var(--plasma-color-border);
    border-radius: var(--plasma-radius-lg);
    box-shadow: var(--plasma-shadow-lg);
    box-sizing: border-box;
    animation: plasma-popup-fade var(--plasma-duration-fast) var(--plasma-ease-default);
  }

  @keyframes plasma-popup-fade {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .plasma-timepicker-columns {
    display: flex;
    gap: var(--plasma-space-sm);
  }

  .plasma-time-column {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .plasma-time-column-header {
    text-align: center;
    font-size: 11px;
    font-weight: var(--plasma-font-weight-bold);
    color: var(--plasma-color-text-muted);
    padding-bottom: 4px;
    border-bottom: 1px solid var(--plasma-color-border-subtle);
    margin-bottom: 4px;
  }

  .plasma-time-column-list {
    max-height: 160px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    scrollbar-width: thin;
    scrollbar-color: var(--plasma-color-border) transparent;
  }

  .plasma-time-cell {
    padding: 4px 0;
    text-align: center;
    border: none;
    border-radius: var(--plasma-radius-sm);
    background: transparent;
    color: var(--plasma-color-text);
    font-size: var(--plasma-font-size-sm);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-time-cell:hover {
    background-color: var(--plasma-color-surface-hover);
  }

  .plasma-time-cell--selected {
    background-color: var(--plasma-color-highlight) !important;
    color: #ffffff !important;
    font-weight: var(--plasma-font-weight-bold);
  }

  .plasma-timepicker-footer {
    display: flex;
    justify-content: space-between;
    margin-top: var(--plasma-space-sm);
    padding-top: var(--plasma-space-xs);
    border-top: 1px solid var(--plasma-color-border-subtle);
  }

  .plasma-time-now-btn,
  .plasma-time-ok-btn {
    padding: 3px 8px;
    font-size: 12px;
    font-weight: var(--plasma-font-weight-medium);
    border: none;
    border-radius: var(--plasma-radius-sm);
    background: transparent;
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-time-now-btn {
    color: var(--plasma-color-text-muted);
  }

  .plasma-time-now-btn:hover {
    color: var(--plasma-color-text);
    background-color: var(--plasma-color-surface-hover);
  }

  .plasma-time-ok-btn {
    color: var(--plasma-color-highlight);
    font-weight: var(--plasma-font-weight-bold);
  }

  .plasma-time-ok-btn:hover {
    background-color: var(--plasma-color-highlight-soft);
  }
</style>
