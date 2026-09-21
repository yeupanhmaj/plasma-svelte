<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import { getAppShellContext } from '../appshell/context.svelte.js'

	interface Props extends HTMLAttributes<HTMLDivElement> {
		title?: string
		collapsed?: boolean
		children?: Snippet
	}

	let {
		title = '',
		collapsed,
		children,
		class: customClass = '',
		...restProps
	}: Props = $props()

	const appShellCtx = getAppShellContext()
	let isCollapsed = $derived(
		collapsed !== undefined ? collapsed : (appShellCtx?.navbarCollapsed ?? false)
	)
</script>

<div
	class="plasma-sidebar-group {customClass}"
	class:plasma-sidebar-group--collapsed={isCollapsed}
	{...restProps}
>
	{#if title && !isCollapsed}
		<div class="plasma-sidebar-group-title">{title}</div>
	{/if}
	<div class="plasma-sidebar-group-items">
		{@render children?.()}
	</div>
</div>

<style>
	.plasma-sidebar-group {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-bottom: var(--plasma-space-md);
	}

	.plasma-sidebar-group--collapsed {
		margin-bottom: var(--plasma-space-sm);
	}

	.plasma-sidebar-group-title {
		padding: var(--plasma-space-xs) var(--plasma-space-md);
		font-family: var(--plasma-font-sans);
		font-size: 11px;
		font-weight: var(--plasma-font-weight-bold);
		color: var(--plasma-color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		user-select: none;
	}

	.plasma-sidebar-group-items {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
</style>
