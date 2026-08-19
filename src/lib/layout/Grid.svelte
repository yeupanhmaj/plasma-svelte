<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { resolveSpacing, type PlasmaSpacing } from "./utils.js";

  type GridAlign = "start" | "end" | "center" | "stretch";
  type GridJustify = "start" | "end" | "center" | "stretch";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    cols?: number | string;
    rows?: number | string;
    gap?: PlasmaSpacing;
    rowGap?: PlasmaSpacing;
    colGap?: PlasmaSpacing;
    align?: GridAlign;
    justify?: GridJustify;
    inline?: boolean;
    children?: Snippet;
  }

  let {
    cols = 1,
    rows,
    gap = "md",
    rowGap,
    colGap,
    align,
    justify,
    inline = false,
    children,
    class: customClass = "",
    style = "",
    ...restProps
  }: Props = $props();

  const resolvedCols = $derived.by(() => {
    if (typeof cols === "number") return `repeat(${cols}, minmax(0, 1fr))`;
    return cols;
  });

  const resolvedRows = $derived.by(() => {
    if (rows === undefined) return undefined;
    if (typeof rows === "number") return `repeat(${rows}, minmax(0, 1fr))`;
    return rows;
  });

  const resolvedGap = $derived(resolveSpacing(gap));
  const resolvedRowGap = $derived(resolveSpacing(rowGap));
  const resolvedColGap = $derived(resolveSpacing(colGap));

  const computedStyle = $derived.by(() => {
    const rules: string[] = [];
    rules.push(`display: ${inline ? "inline-grid" : "grid"};`);
    if (resolvedCols) rules.push(`grid-template-columns: ${resolvedCols};`);
    if (resolvedRows) rules.push(`grid-template-rows: ${resolvedRows};`);
    if (resolvedRowGap) rules.push(`row-gap: ${resolvedRowGap};`);
    if (resolvedColGap) rules.push(`column-gap: ${resolvedColGap};`);
    if (!resolvedRowGap && !resolvedColGap && resolvedGap) rules.push(`gap: ${resolvedGap};`);
    if (align) rules.push(`align-items: ${align};`);
    if (justify) rules.push(`justify-items: ${justify};`);
    return `${rules.join(" ")} ${style}`;
  });
</script>

<div
  class="plasma-grid {customClass}"
  style={computedStyle}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
  .plasma-grid {
    box-sizing: border-box;
    width: 100%;
  }
</style>
