<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import Popover from '../popover/Popover.svelte'

	type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

	interface Props extends HTMLAttributes<HTMLDivElement> {
		text?: string
		position?: TooltipPosition
		/** Delay before showing on hover, ms. Focus shows immediately. */
		delay?: number
		content?: Snippet
		children?: Snippet
	}

	const uid = $props.id()

	let {
		text = '',
		position = 'top',
		delay = 0,
		content,
		children,
		class: customClass = '',
		...restProps
	}: Props = $props()

	const tooltipId = `plasma-tooltip-${uid}`

	let open = $state(false)
	let wrapperEl = $state<HTMLDivElement | null>(null)
	let timer: ReturnType<typeof setTimeout> | undefined

	const hasContent = $derived(Boolean(text || content))

	function show(immediate = false) {
		clearTimeout(timer)
		if (immediate || delay <= 0) {
			open = true
		} else {
			timer = setTimeout(() => {
				open = true
			}, delay)
		}
	}

	function hide() {
		clearTimeout(timer)
		open = false
	}

	$effect(() => () => clearTimeout(timer))
</script>

<!-- Wrapper only forwards hover/focus; the focusable child inside is what users interact with. -->
<div
	bind:this={wrapperEl}
	class="plasma-tooltip-trigger {customClass}"
	aria-describedby={hasContent ? tooltipId : undefined}
	onpointerenter={() => hasContent && show()}
	onpointerleave={hide}
	onfocusin={() => hasContent && show(true)}
	onfocusout={hide}
	{...restProps}
>
	{@render children?.()}
</div>

{#if hasContent}
	<Popover
		id={tooltipId}
		role="tooltip"
		{open}
		anchor={wrapperEl}
		placement={position}
		offset={6}
		surface={false}
		closeOnOutside={false}
		restoreFocus={false}
		keepMounted
		onclose={hide}
		class="plasma-tooltip-bubble"
	>
		{#if content}
			{@render content()}
		{:else}
			{text}
		{/if}
	</Popover>
{/if}

<style>
	.plasma-tooltip-trigger {
		display: inline-flex;
	}

	:global(.plasma-tooltip-bubble) {
		pointer-events: none;
		white-space: nowrap;
		padding: var(--plasma-space-xs) var(--plasma-space-sm);
		font-family: var(--plasma-font-sans);
		font-size: var(--plasma-font-size-xs);
		line-height: 1.2;
		color: var(--plasma-color-tooltip-text);
		background-color: var(--plasma-color-tooltip-bg);
		border: 1px solid var(--plasma-color-border-subtle);
		border-radius: var(--plasma-radius-sm);
		box-shadow: var(--plasma-shadow-md);
	}
</style>
