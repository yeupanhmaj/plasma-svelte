<script lang="ts">
	import type { NavbarProps } from './types.js'
	import { getAppShellContext } from './context.svelte.js'

	let {
		width = '260px',
		collapsedWidth = '64px',
		collapsible = true,
		bordered = true,
		children,
		class: customClass = '',
		style = '',
		...restProps
	}: NavbarProps = $props()

	const ctx = getAppShellContext()

	let isCollapsed = $derived(ctx ? ctx.navbarCollapsed : false)
	let isOpen = $derived(ctx ? ctx.navbarOpen : true)
	let isMobile = $derived(ctx ? ctx.isMobile : false)
	let effectiveWidth = $derived(isCollapsed ? collapsedWidth : width)
</script>

<aside
	class="plasma-appshell-navbar {customClass}"
	class:plasma-appshell-navbar--bordered={bordered}
	class:plasma-appshell-navbar--collapsed={isCollapsed}
	class:plasma-appshell-navbar--mobile={isMobile}
	class:plasma-appshell-navbar--open={isOpen}
	class:plasma-appshell-navbar--collapsible={collapsible}
	style="--plasma-shell-nav-width: {effectiveWidth}; {style}"
	aria-label="Navigation"
	{...restProps}
>
	<div class="plasma-appshell-navbar-inner">
		{@render children?.()}
	</div>
</aside>

<style>
	.plasma-appshell-navbar {
		grid-area: navbar;
		width: var(--plasma-shell-nav-width, 260px);
		min-width: var(--plasma-shell-nav-width, 260px);
		max-width: var(--plasma-shell-nav-width, 260px);
		height: 100%;
		min-height: 0;
		background-color: var(--plasma-color-surface);
		color: var(--plasma-color-text);
		box-sizing: border-box;
		flex-shrink: 0;
		z-index: 90;
		display: flex;
		flex-direction: column;
	}

	.plasma-appshell-navbar--collapsible {
		transition: width var(--plasma-duration-base) cubic-bezier(0.4, 0, 0.2, 1),
			min-width var(--plasma-duration-base) cubic-bezier(0.4, 0, 0.2, 1),
			max-width var(--plasma-duration-base) cubic-bezier(0.4, 0, 0.2, 1),
			transform var(--plasma-duration-base) cubic-bezier(0.4, 0, 0.2, 1);
	}

	.plasma-appshell-navbar--bordered {
		border-right: 1px solid var(--plasma-color-border-subtle);
	}

	.plasma-appshell-navbar-inner {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
	}

	/* Mobile drawer mode */
	.plasma-appshell-navbar--mobile {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		height: 100dvh;
		z-index: 250;
		transform: translateX(-100%);
		box-shadow: none;
	}

	.plasma-appshell-navbar--mobile.plasma-appshell-navbar--open {
		transform: translateX(0);
		box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
	}

	/* Collapsed mode child adaptations */
	.plasma-appshell-navbar--collapsed :global(.plasma-sidebar-group-title) {
		display: none;
	}

	.plasma-appshell-navbar--collapsed :global(.plasma-sidebar-item-label) {
		display: none;
	}

	.plasma-appshell-navbar--collapsed :global(.plasma-sidebar-item-badge) {
		display: none;
	}

	.plasma-appshell-navbar--collapsed :global(.plasma-sidebar-item) {
		justify-content: center;
		padding-left: 0;
		padding-right: 0;
	}

	.plasma-appshell-navbar--collapsed :global(.plasma-appshell-hide-on-collapse) {
		display: none;
	}
</style>
