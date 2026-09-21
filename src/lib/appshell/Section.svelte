<script lang="ts">
	import type { SectionProps } from './types.js'
	import { getAppShellContext } from './context.svelte.js'

	let {
		grow = false,
		scrollable = false,
		hideOnCollapse = false,
		children,
		class: customClass = '',
		style = '',
		...restProps
	}: SectionProps = $props()

	const ctx = getAppShellContext()
	let isCollapsed = $derived(ctx ? ctx.navbarCollapsed : false)
</script>

{#if !(hideOnCollapse && isCollapsed)}
	<div
		class="plasma-appshell-section {customClass}"
		class:plasma-appshell-section--grow={grow}
		class:plasma-appshell-section--scrollable={scrollable}
		style="{style}"
		{...restProps}
	>
		{@render children?.()}
	</div>
{/if}

<style>
	.plasma-appshell-section {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		min-width: 0;
	}

	.plasma-appshell-section--grow {
		flex: 1 1 0%;
	}

	.plasma-appshell-section--scrollable {
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: thin;
		scrollbar-color: var(--plasma-color-border) transparent;
	}
</style>
