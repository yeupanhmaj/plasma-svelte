<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type DividerOrientation = "horizontal" | "vertical";
  type DividerAlign = "left" | "center" | "right";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    orientation?: DividerOrientation;
    align?: DividerAlign;
    label?: string;
    children?: Snippet;
  }

  let {
    orientation = "horizontal",
    align = "center",
    label = "",
    children,
    class: customClass = "",
    ...restProps
  }: Props = $props();
</script>

{#if orientation === "vertical"}
  <div
    role="separator"
    aria-orientation="vertical"
    class="plasma-divider plasma-divider--vertical {customClass}"
    {...restProps}
  ></div>
{:else if label || children}
  <div
    role="separator"
    aria-orientation="horizontal"
    class="plasma-divider-with-label plasma-divider-with-label--{align} {customClass}"
    {...restProps}
  >
    <span class="plasma-divider-line"></span>
    <span class="plasma-divider-text">
      {#if children}
        {@render children()}
      {:else}
        {label}
      {/if}
    </span>
    <span class="plasma-divider-line"></span>
  </div>
{:else}
  <hr
    class="plasma-divider plasma-divider--horizontal {customClass}"
    {...restProps}
  />
{/if}

<style>
  /* Horizontal Hairline */
  .plasma-divider--horizontal {
    width: 100%;
    height: 1px;
    margin: var(--plasma-space-md) 0;
    padding: 0;
    border: none;
    background-color: var(--plasma-color-border-subtle);
    box-sizing: border-box;
  }

  /* Vertical Hairline */
  .plasma-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 100%;
    min-height: 1.25em;
    margin: 0 var(--plasma-space-md);
    padding: 0;
    background-color: var(--plasma-color-border-subtle);
    vertical-align: middle;
    box-sizing: border-box;
  }

  /* Labeled Divider */
  .plasma-divider-with-label {
    display: flex;
    align-items: center;
    width: 100%;
    margin: var(--plasma-space-md) 0;
    font-family: var(--plasma-font-sans);
    font-size: var(--plasma-font-size-xs);
    color: var(--plasma-color-text-muted);
    user-select: none;
  }

  .plasma-divider-line {
    flex: 1;
    height: 1px;
    background-color: var(--plasma-color-border-subtle);
  }

  .plasma-divider-text {
    padding: 0 var(--plasma-space-md);
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .plasma-divider-with-label--left .plasma-divider-line:first-child {
    max-width: 24px;
  }
  .plasma-divider-with-label--right .plasma-divider-line:last-child {
    max-width: 24px;
  }
</style>
