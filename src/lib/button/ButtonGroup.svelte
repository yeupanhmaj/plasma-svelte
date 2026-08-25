<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  type ButtonGroupOrientation = "horizontal" | "vertical";
  type ButtonGroupSize = "sm" | "md" | "lg" | "small" | "medium" | "large";

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "size"> {
    orientation?: ButtonGroupOrientation;
    size?: ButtonGroupSize;
    children?: Snippet;
  }

  let {
    orientation = "horizontal",
    size = "md",
    children,
    class: customClass = "",
    ...restProps
  }: Props = $props();

  const resolvedSize = $derived(
    size === "small"
      ? "sm"
      : size === "large"
        ? "lg"
        : size === "medium"
          ? "md"
          : size
  );
</script>

<div
  role="group"
  class="plasma-button-group plasma-button-group--{orientation} plasma-button-group--{resolvedSize} {customClass}"
  {...restProps}
>
  {@render children?.()}
</div>

<style>
  .plasma-button-group {
    display: inline-flex;
    vertical-align: middle;
    box-sizing: border-box;
  }

  /* --------------------------------------------------------------------------
     Horizontal Grouping
     -------------------------------------------------------------------------- */
  .plasma-button-group--horizontal {
    flex-direction: row;
  }

  .plasma-button-group--horizontal > :global(.plasma-button:not(:first-child)),
  .plasma-button-group--horizontal > :global(button:not(:first-child)) {
    margin-left: -1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .plasma-button-group--horizontal > :global(.plasma-button:not(:last-child)),
  .plasma-button-group--horizontal > :global(button:not(:last-child)) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* --------------------------------------------------------------------------
     Vertical Grouping
     -------------------------------------------------------------------------- */
  .plasma-button-group--vertical {
    flex-direction: column;
  }

  .plasma-button-group--vertical > :global(.plasma-button:not(:first-child)),
  .plasma-button-group--vertical > :global(button:not(:first-child)) {
    margin-top: -1px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .plasma-button-group--vertical > :global(.plasma-button:not(:last-child)),
  .plasma-button-group--vertical > :global(button:not(:last-child)) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* --------------------------------------------------------------------------
     Hover & Focus Layering
     -------------------------------------------------------------------------- */
  .plasma-button-group > :global(.plasma-button:hover),
  .plasma-button-group > :global(button:hover),
  .plasma-button-group > :global(.plasma-button:focus-visible),
  .plasma-button-group > :global(button:focus-visible),
  .plasma-button-group > :global(.plasma-button--primary) {
    z-index: 1;
  }
</style>
