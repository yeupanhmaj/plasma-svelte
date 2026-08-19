<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { resolveSpacing, type PlasmaSpacing } from "./utils.js";

  type SpaceDirection = "horizontal" | "vertical";
  type SpaceAlign = "start" | "end" | "center" | "baseline";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    direction?: SpaceDirection;
    size?: PlasmaSpacing;
    align?: SpaceAlign;
    wrap?: boolean;
    inline?: boolean;
    children?: Snippet;
  }

  let {
    direction = "horizontal",
    size = "sm",
    align,
    wrap = false,
    inline = true,
    children,
    class: customClass = "",
    style = "",
    ...restProps
  }: Props = $props();

  const resolvedAlign = $derived.by(() => {
    if (align) {
      if (align === "start") return "flex-start";
      if (align === "end") return "flex-end";
      return align;
    }
    return direction === "horizontal" ? "center" : "stretch";
  });

  const resolvedSize = $derived(resolveSpacing(size));

  const computedStyle = $derived.by(() => {
    const rules: string[] = [];
    rules.push(`display: ${inline ? "inline-flex" : "flex"};`);
    rules.push(`flex-direction: ${direction === "vertical" ? "column" : "row"};`);
    rules.push(`align-items: ${resolvedAlign};`);
    if (wrap) rules.push("flex-wrap: wrap;");
    if (resolvedSize) rules.push(`gap: ${resolvedSize};`);
    return `${rules.join(" ")} ${style}`;
  });
</script>

<div
  class="plasma-space {customClass}"
  style={computedStyle}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
  .plasma-space {
    box-sizing: border-box;
  }
</style>
