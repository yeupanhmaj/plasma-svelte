<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { resolveSpacing, type PlasmaSpacing } from "./utils.js";

  type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
  type FlexJustify =
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  type FlexAlign =
    | "start"
    | "end"
    | "center"
    | "baseline"
    | "stretch"
    | "flex-start"
    | "flex-end";
  type FlexWrap = boolean | "wrap" | "nowrap" | "wrap-reverse";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    vertical?: boolean;
    direction?: FlexDirection;
    justify?: FlexJustify;
    align?: FlexAlign;
    wrap?: FlexWrap;
    gap?: PlasmaSpacing;
    inline?: boolean;
    children?: Snippet;
  }

  let {
    vertical = false,
    direction,
    justify,
    align,
    wrap = false,
    gap = "sm",
    inline = false,
    children,
    class: customClass = "",
    style = "",
    ...restProps
  }: Props = $props();

  const resolvedDirection = $derived(
    direction || (vertical ? "column" : "row")
  );

  const resolvedJustify = $derived.by(() => {
    if (!justify) return undefined;
    switch (justify) {
      case "start": return "flex-start";
      case "end": return "flex-end";
      case "between": return "space-between";
      case "around": return "space-around";
      case "evenly": return "space-evenly";
      default: return justify;
    }
  });

  const resolvedAlign = $derived.by(() => {
    if (!align) return undefined;
    switch (align) {
      case "start": return "flex-start";
      case "end": return "flex-end";
      default: return align;
    }
  });

  const resolvedWrap = $derived.by(() => {
    if (typeof wrap === "boolean") return wrap ? "wrap" : "nowrap";
    return wrap;
  });

  const resolvedGap = $derived(resolveSpacing(gap));

  const computedStyle = $derived.by(() => {
    const rules: string[] = [];
    rules.push(`display: ${inline ? "inline-flex" : "flex"};`);
    rules.push(`flex-direction: ${resolvedDirection};`);
    if (resolvedJustify) rules.push(`justify-content: ${resolvedJustify};`);
    if (resolvedAlign) rules.push(`align-items: ${resolvedAlign};`);
    if (resolvedWrap) rules.push(`flex-wrap: ${resolvedWrap};`);
    if (resolvedGap) rules.push(`gap: ${resolvedGap};`);
    return `${rules.join(" ")} ${style}`;
  });
</script>

<div
  class="plasma-flex {customClass}"
  style={computedStyle}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
  .plasma-flex {
    box-sizing: border-box;
  }
</style>
