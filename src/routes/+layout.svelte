<script lang="ts">
  import "$lib/style/index.css";

  let { children } = $props();
</script>

{@render children()}

<style>
  :global(body) {
    margin: 0;
    font-family: var(--plasma-font-sans);
    background-color: var(--plasma-color-window-bg);
    color: var(--plasma-color-text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
