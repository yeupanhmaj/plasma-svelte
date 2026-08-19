<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  type DatePickerSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "size" | "onchange"> {
    value?: string; // YYYY-MM-DD format
    placeholder?: string;
    min?: string;
    max?: string;
    size?: DatePickerSize;
    disabled?: boolean;
    onchange?: (val: string) => void;
  }

  let {
    value = $bindable(""),
    placeholder = "Select date...",
    min,
    max,
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

  // Parse current selected or initial viewing date
  function parseDate(val: string) {
    if (!val) return new Date();
    const parts = val.split("-").map(Number);
    if (parts.length === 3 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1]) && !Number.isNaN(parts[2])) {
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    return new Date();
  }

  let viewDate = $state(parseDate(value));

  const resolvedSize = $derived(
    size === "small"
      ? "sm"
      : size === "large"
        ? "lg"
        : size === "medium"
          ? "md"
          : size
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const currentYear = $derived(viewDate.getFullYear());
  const currentMonth = $derived(viewDate.getMonth());

  // Generate 42 calendar grid cells (Monday-first)
  const calendarCells = $derived.by(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6; // Sunday -> 6

    const daysInMonth = lastDayOfMonth.getDate();
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();

    const cells: { dateStr: string; dayNum: number; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean; isDisabled: boolean }[] = [];

    const todayStr = new Date().toISOString().split("T")[0];

    // Previous month filler days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const m = currentMonth === 0 ? 12 : currentMonth;
      const y = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({
        dateStr,
        dayNum: d,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        isSelected: dateStr === value,
        isDisabled: !!((min && dateStr < min) || (max && dateStr > max))
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({
        dateStr,
        dayNum: d,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        isSelected: dateStr === value,
        isDisabled: !!((min && dateStr < min) || (max && dateStr > max))
      });
    }

    // Next month filler days
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const m = currentMonth === 11 ? 1 : currentMonth + 2;
      const y = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({
        dateStr,
        dayNum: d,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        isSelected: dateStr === value,
        isDisabled: !!((min && dateStr < min) || (max && dateStr > max))
      });
    }

    return cells;
  });

  function prevMonth() {
    viewDate = new Date(currentYear, currentMonth - 1, 1);
  }

  function nextMonth() {
    viewDate = new Date(currentYear, currentMonth + 1, 1);
  }

  function goToToday() {
    const today = new Date();
    viewDate = today;
    selectDate(today.toISOString().split("T")[0]);
  }

  function selectDate(dateStr: string) {
    value = dateStr;
    onchange?.(dateStr);
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
      if (value) {
        viewDate = parseDate(value);
      }
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
  class="plasma-datepicker-container {customClass}"
  class:plasma-datepicker--disabled={disabled}
  {...restProps}
>
  <!-- Date Input Button -->
  <button
    {id}
    bind:this={triggerEl}
    type="button"
    class="plasma-datepicker-trigger plasma-datepicker--{resolvedSize}"
    class:plasma-datepicker-trigger--open={isOpen}
    {disabled}
    onclick={toggleOpen}
    aria-haspopup="dialog"
    aria-expanded={isOpen}
  >
    <span class="plasma-datepicker-icon">
      <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
      </svg>
    </span>

    <span class="plasma-datepicker-text" class:plasma-datepicker-placeholder={!value}>
      {value || placeholder}
    </span>

    <span class="plasma-datepicker-chevron" class:plasma-datepicker-chevron--open={isOpen}>
      <svg aria-hidden="true" viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
        <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
      </svg>
    </span>
  </button>

  <!-- KDE Breeze Calendar Top-Layer Popover -->
  <div
    bind:this={popupEl}
    popover="auto"
    ontoggle={handleToggle}
    class="plasma-calendar-popup"
    style={popupStyle}
    role="dialog"
    aria-label="Calendar"
  >
    <!-- Calendar Header -->
    <div class="plasma-calendar-header">
      <button
        type="button"
        class="plasma-calendar-nav-btn"
        onclick={prevMonth}
        aria-label="Previous month"
      >
        ‹
      </button>

      <span class="plasma-calendar-month-label">
        {months[currentMonth]} {currentYear}
      </span>

      <button
        type="button"
        class="plasma-calendar-nav-btn"
        onclick={nextMonth}
        aria-label="Next month"
      >
        ›
      </button>
    </div>

    <!-- Days of Week Header -->
    <div class="plasma-calendar-weekdays">
      {#each dayNames as day}
        <span class="plasma-calendar-weekday">{day}</span>
      {/each}
    </div>

    <!-- Calendar Grid -->
    <div class="plasma-calendar-grid">
      {#each calendarCells as cell}
        <button
          type="button"
          class="plasma-calendar-day"
          class:plasma-calendar-day--other={!cell.isCurrentMonth}
          class:plasma-calendar-day--today={cell.isToday}
          class:plasma-calendar-day--selected={cell.isSelected}
          disabled={cell.isDisabled}
          onclick={() => selectDate(cell.dateStr)}
        >
          {cell.dayNum}
        </button>
      {/each}
    </div>

    <!-- Calendar Footer -->
    <div class="plasma-calendar-footer">
      <button
        type="button"
        class="plasma-calendar-today-btn"
        onclick={goToToday}
      >
        Today
      </button>
    </div>
  </div>
</div>

<style>
  .plasma-datepicker-container {
    position: relative;
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--plasma-font-sans);
  }

  /* --------------------------------------------------------------------------
     Trigger Button
     -------------------------------------------------------------------------- */
  .plasma-datepicker-trigger {
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

  .plasma-datepicker-trigger:hover:not(:disabled):not(.plasma-datepicker-trigger--open) {
    border-color: var(--plasma-color-border-hover);
  }

  .plasma-datepicker-trigger--open {
    border-color: var(--plasma-color-highlight);
    box-shadow: var(--plasma-shadow-focus);
  }

  .plasma-datepicker-icon {
    display: inline-flex;
    align-items: center;
    color: var(--plasma-color-text-muted);
    margin-right: var(--plasma-space-sm);
  }

  .plasma-datepicker-text {
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .plasma-datepicker-placeholder {
    color: var(--plasma-color-text-muted);
    opacity: 0.75;
  }

  .plasma-datepicker-chevron {
    display: inline-flex;
    align-items: center;
    color: var(--plasma-color-text-muted);
    transition: transform var(--plasma-duration-fast) var(--plasma-ease-default);
  }

  .plasma-datepicker-chevron--open {
    transform: rotate(180deg);
  }

  /* --------------------------------------------------------------------------
     Sizing
     -------------------------------------------------------------------------- */
  .plasma-datepicker--sm {
    height: var(--plasma-control-height-sm);
    font-size: var(--plasma-font-size-xs);
  }

  .plasma-datepicker--md {
    height: var(--plasma-control-height-md);
    font-size: var(--plasma-font-size-base);
  }

  .plasma-datepicker--lg {
    height: var(--plasma-control-height-lg);
    font-size: var(--plasma-font-size-md);
  }

  /* --------------------------------------------------------------------------
     Top-Layer Calendar Popover
     -------------------------------------------------------------------------- */
  .plasma-calendar-popup {
    position: fixed;
    margin: 0;
    inset: unset;
    z-index: 99999;
    width: 280px;
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

  .plasma-calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--plasma-space-sm);
  }

  .plasma-calendar-month-label {
    font-size: var(--plasma-font-size-base);
    font-weight: var(--plasma-font-weight-bold);
    color: var(--plasma-color-text);
  }

  .plasma-calendar-nav-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: var(--plasma-radius-sm);
    background: transparent;
    color: var(--plasma-color-text);
    font-size: 16px;
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-calendar-nav-btn:hover {
    background-color: var(--plasma-color-surface-hover);
    color: var(--plasma-color-highlight);
  }

  .plasma-calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 4px;
  }

  .plasma-calendar-weekday {
    font-size: 11px;
    font-weight: var(--plasma-font-weight-bold);
    color: var(--plasma-color-text-muted);
    padding: 2px 0;
  }

  .plasma-calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .plasma-calendar-day {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border: none;
    border-radius: var(--plasma-radius-sm);
    background: transparent;
    color: var(--plasma-color-text);
    font-size: var(--plasma-font-size-sm);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-calendar-day:hover:not(:disabled) {
    background-color: var(--plasma-color-surface-hover);
  }

  .plasma-calendar-day--other {
    color: var(--plasma-color-text-disabled);
    opacity: 0.5;
  }

  .plasma-calendar-day--today {
    border: 1px solid var(--plasma-color-highlight);
    font-weight: var(--plasma-font-weight-bold);
  }

  .plasma-calendar-day--selected {
    background-color: var(--plasma-color-highlight) !important;
    color: #ffffff !important;
    font-weight: var(--plasma-font-weight-bold);
  }

  .plasma-calendar-day:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .plasma-calendar-footer {
    display: flex;
    justify-content: center;
    margin-top: var(--plasma-space-sm);
    padding-top: var(--plasma-space-xs);
    border-top: 1px solid var(--plasma-color-border-subtle);
  }

  .plasma-calendar-today-btn {
    padding: 3px 12px;
    font-size: 12px;
    font-weight: var(--plasma-font-weight-medium);
    border: none;
    border-radius: var(--plasma-radius-sm);
    background: transparent;
    color: var(--plasma-color-highlight);
    cursor: pointer;
    transition: var(--plasma-transition-fast);
  }

  .plasma-calendar-today-btn:hover {
    background-color: var(--plasma-color-highlight-soft);
  }
</style>
