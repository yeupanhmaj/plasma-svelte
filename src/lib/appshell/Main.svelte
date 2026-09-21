<script lang="ts">
	import type { MainProps } from './types.js'
	import { getAppShellContext } from './context.svelte.js'

	let {
		padding = 'md',
		container = 'fluid',
		children,
		class: customClass = '',
		style = '',
		...restProps
	}: MainProps = $props()

	const ctx = getAppShellContext()
	let isViewport = $derived(ctx ? ctx.layout === 'viewport' : true)

	const paddingMap: Record<string, string> = {
		none: '0',
		xs: 'var(--plasma-space-xs)',
		sm: 'var(--plasma-space-sm)',
		md: 'var(--plasma-space-md)',
		lg: 'var(--plasma-space-lg)',
		xl: 'var(--plasma-space-xl)'
	}

	let resolvedPadding = $derived(paddingMap[padding] ?? padding)
</script>

<main
	class="plasma-appshell-main {customClass}"
	class:plasma-appshell-main--viewport={isViewport}
	style="--plasma-shell-main-padding: {resolvedPadding}; {style}"
	{...restProps}
>
	<div
		class="plasma-appshell-main-container"
		class:plasma-appshell-main-container--fluid={container === 'fluid'}
		class:plasma-appshell-main-container--sm={container === 'sm'}
		class:plasma-appshell-main-container--md={container === 'md'}
		class:plasma-appshell-main-container--lg={container === 'lg'}
		class:plasma-appshell-main-container--xl={container === 'xl'}
	>
		{@render children?.()}
	</div>
</main>

<style>
	.plasma-appshell-main {
		grid-area: main;
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
		min-height: 0;
		box-sizing: border-box;
		background-color: var(--plasma-color-window-bg);
		color: var(--plasma-color-text);
	}

	.plasma-appshell-main--viewport {
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: thin;
		scrollbar-color: var(--plasma-color-border) transparent;
	}

	.plasma-appshell-main-container {
		width: 100%;
		box-sizing: border-box;
		padding: var(--plasma-shell-main-padding);
		margin: 0 auto;
		flex: 1;
	}

	.plasma-appshell-main-container--fluid {
		max-width: 100%;
	}

	.plasma-appshell-main-container--sm {
		max-width: 640px;
	}

	.plasma-appshell-main-container--md {
		max-width: 768px;
	}

	.plasma-appshell-main-container--lg {
		max-width: 1024px;
	}

	.plasma-appshell-main-container--xl {
		max-width: 1280px;
	}
</style>
