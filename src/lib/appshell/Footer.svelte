<script lang="ts">
  import type { FooterProps } from "./types.js";

  let {
    height = "auto",
    bordered = true,
    sticky = false,
    children,
    class: customClass = "",
    style = "",
    ...restProps
  }: FooterProps = $props();
</script>

<footer
  class="plasma-appshell-footer {customClass}"
  class:plasma-appshell-footer--bordered={bordered}
  class:plasma-appshell-footer--sticky={sticky}
  style="--plasma-shell-footer-h: {height}; {style}"
  {...restProps}
>
  {@render children?.()}
</footer>

<style>
  .plasma-appshell-footer {
    grid-area: footer;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--plasma-shell-footer-h, auto);
    padding: var(--plasma-space-xs) var(--plasma-space-md);
    background-color: var(--plasma-color-surface);
    color: var(--plasma-color-text-muted);
    box-sizing: border-box;
    z-index: 70;
    flex-shrink: 0;
  }

  .plasma-appshell-footer--sticky {
    position: sticky;
    bottom: 0;
  }

  .plasma-appshell-footer--bordered {
    border-top: 1px solid var(--plasma-color-border-subtle);
  }
</style>
