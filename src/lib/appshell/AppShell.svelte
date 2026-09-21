<script lang="ts">
  import Aside from "./Aside.svelte";
  import { AppShellState, setAppShellContext } from "./context.svelte.js";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import Navbar from "./Navbar.svelte";
  import type { AppShellProps } from "./types.js";

  let {
    layout = "viewport",
    breakpoint = 768,
    navbarOpen = $bindable(false),
    navbarCollapsed = $bindable(false),
    asideOpen = $bindable(false),
    asideCollapsed = $bindable(false),
    header,
    navbar,
    aside,
    footer,
    children,
    class: customClass = "",
    style = "",
    ...restProps
  }: AppShellProps = $props();

  const state = new AppShellState({
    getLayout: () => layout,
    getBreakpoint: () => breakpoint,
    getNavbarOpen: () => navbarOpen,
    setNavbarOpen: (v) => {
      navbarOpen = v;
    },
    getNavbarCollapsed: () => navbarCollapsed,
    setNavbarCollapsed: (v) => {
      navbarCollapsed = v;
    },
    getAsideOpen: () => asideOpen,
    setAsideOpen: (v) => {
      asideOpen = v;
    },
    getAsideCollapsed: () => asideCollapsed,
    setAsideCollapsed: (v) => {
      asideCollapsed = v;
    },
  });

  setAppShellContext(state);

  $effect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    state.isMobile = mql.matches;

    const handler = (e: MediaQueryListEvent) => {
      state.isMobile = e.matches;
      if (!e.matches) {
        state.closeMobile();
      }
    };

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  });
</script>

<div
  class="plasma-appshell plasma-appshell--{state.layout} {customClass}"
  class:plasma-appshell--mobile={state.isMobile}
  {style}
  {...restProps}
>
  {#if header}
    <Header>{@render header()}</Header>
  {/if}

  {#if navbar}
    <Navbar>{@render navbar()}</Navbar>
  {/if}

  {@render children?.()}

  {#if aside}
    <Aside>{@render aside()}</Aside>
  {/if}

  {#if footer}
    <Footer>{@render footer()}</Footer>
  {/if}

  {#if state.isMobile && (state.navbarOpen || state.asideOpen)}
    <button
      type="button"
      class="plasma-appshell-backdrop"
      aria-label="Close menu overlay"
      onclick={() => state.closeMobile()}
    ></button>
  {/if}
</div>

<style>
  .plasma-appshell {
    width: 100%;
    font-family: var(--plasma-font-sans);
    background-color: var(--plasma-color-window-bg);
    color: var(--plasma-color-text);
    box-sizing: border-box;
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      "header header header"
      "navbar main aside"
      "footer footer footer";
  }

  .plasma-appshell--viewport {
    height: 100dvh;
    max-height: 100dvh;
    overflow: hidden;
  }

  .plasma-appshell--page {
    min-height: 100vh;
  }

  /* Mobile backdrop */
  .plasma-appshell-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 240;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    animation: plasma-appshell-fade-in 150ms ease-out forwards;
  }

  @keyframes plasma-appshell-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
