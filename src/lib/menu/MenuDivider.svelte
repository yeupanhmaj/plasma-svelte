<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLHRElement> {}

  let { class: customClass = "", ...restProps }: Props = $props();
</script>

<hr class="plasma-menu-divider {customClass}" {...restProps} />

<style>
  .plasma-menu-divider {
    height: 1px;
    margin: 4px 0;
    padding: 0;
    border: none;
    background-color: var(--plasma-color-border-subtle);
  }
</style>
