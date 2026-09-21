<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import { getAppShellContext } from '../appshell/context.svelte.js'

	interface Props extends HTMLAttributes<HTMLElement> {
		width?: string
		collapsed?: boolean
		collapsedWidth?: string
		header?: Snippet
		footer?: Snippet
		children?: Snippet
	}

	let {
		width = '240px',
		collapsed,
		collapsedWidth = '64px',
		header,
		footer,
		children,
		class: customClass = '',
		style = '',
		...restProps
	}: Props = $props()

	const appShellCtx = getAppShellContext()
	let isCollapsed = $derived(
		collapsed !== undefined ? collapsed : (appShellCtx?.navbarCollapsed ?? false)
	)
	let effectiveWidth = $derived(isCollapsed ? collapsedWidth : width)
</script>

<aside
	class="plasma-sidebar {customClass}"
	class:plasma-sidebar--collapsed={isCollapsed}
	style="width: {effectiveWidth}; {style}"
	{...restProps}
>
	{#if header && !isCollapsed}
		<div class="plasma-sidebar-header">
			{@render header()}
		</div>
	{/if}

	<nav class="plasma-sidebar-content">
		{@render children?.()}
	</nav>

	{#if footer && !isCollapsed}
		<div class="plasma-sidebar-footer">
			{@render footer()}
		</div>
	{/if}
</aside>

<style>
	.plasma-sidebar {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 320px;
		background-color: var(--plasma-color-surface);
		border-right: 1px solid var(--plasma-color-border-subtle);
		font-family: var(--plasma-font-sans);
		box-sizing: border-box;
		flex-shrink: 0;
		transition: width var(--plasma-duration-base) cubic-bezier(0.4, 0, 0.2, 1);
	}

	.plasma-sidebar--collapsed .plasma-sidebar-content {
		padding: var(--plasma-space-md) var(--plasma-space-xs);
		align-items: center;
	}

	.plasma-sidebar--collapsed :global(.plasma-sidebar-group-title) {
		display: none;
	}

	.plasma-sidebar--collapsed :global(.plasma-sidebar-item-label) {
		display: none;
	}

	.plasma-sidebar--collapsed :global(.plasma-sidebar-item-badge) {
		display: none;
	}

	.plasma-sidebar--collapsed :global(.plasma-sidebar-item) {
		justify-content: center;
		padding-left: 0;
		padding-right: 0;
	}

	.plasma-sidebar-header {
		padding: var(--plasma-space-md);
		border-bottom: 1px solid var(--plasma-color-border-subtle);
	}

	.plasma-sidebar-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--plasma-space-md) var(--plasma-space-sm);
		display: flex;
		flex-direction: column;
		scrollbar-width: thin;
		scrollbar-color: var(--plasma-color-border) transparent;
	}

	.plasma-sidebar-footer {
		padding: var(--plasma-space-md);
		border-top: 1px solid var(--plasma-color-border-subtle);
		background-color: var(--plasma-color-surface-sunken);
	}
</style>
