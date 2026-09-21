<script lang="ts">
  import type { HeaderProps } from "./types.js";

  let {
    height = "52px",
    sticky = true,
    bordered = true,
    blur = false,
    children,
    class: customClass = "",
    style = "",
    ...restProps
  }: HeaderProps = $props();
</script>

<header
  class="plasma-appshell-header {customClass}"
  class:plasma-appshell-header--sticky={sticky}
  class:plasma-appshell-header--bordered={bordered}
  class:plasma-appshell-header--blur={blur}
  style="--plasma-shell-header-h: {height}; {style}"
  {...restProps}
>
  {@render children?.()}
</header>

<style>
  .plasma-appshell-header {
    grid-area: header;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--plasma-shell-header-h, 52px);
    min-height: var(--plasma-shell-header-h, 52px);
    max-height: var(--plasma-shell-header-h, 52px);
    padding: 0 var(--plasma-space-md);
    background-color: var(--plasma-color-surface);
    color: var(--plasma-color-text);
    box-sizing: border-box;
    z-index: 100;
    flex-shrink: 0;
  }

  .plasma-appshell-header--sticky {
    position: sticky;
    top: 0;
  }

  .plasma-appshell-header--bordered {
    border-bottom: 1px solid var(--plasma-color-border-subtle);
  }

  .plasma-appshell-header--blur {
    background-color: color-mix(
      in srgb,
      var(--plasma-color-surface) 85%,
      transparent
    );
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
</style>
