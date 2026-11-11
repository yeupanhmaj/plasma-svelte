<script lang="ts" module>
	// Open popovers, innermost last. Escape only closes the innermost one.
	const openStack: symbol[] = []

	export interface PopoverTriggerProps {
		'aria-haspopup': 'true' | 'menu' | 'listbox' | 'dialog' | 'tree' | 'grid'
		'aria-expanded': boolean
		'aria-controls': string
		onclick: (e: MouseEvent) => void
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import { type AnchorLike, computePosition, type Placement } from './position.js'

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		open?: boolean
		/** Element or virtual anchor to position against. Defaults to the wrapper around `trigger`. */
		anchor?: AnchorLike | null
		placement?: Placement
		/** Gap between anchor and popover, px. */
		offset?: number
		/** Minimum distance kept from the viewport edge, px. */
		viewportPadding?: number
		/** Flip to the opposite side when there is no room. */
		flip?: boolean
		/** Make the popover at least as wide as the anchor (sets min-width). */
		matchWidth?: boolean
		/** Upper bound for the popover height, px. The available space is still respected. */
		maxHeight?: number
		closeOnOutside?: boolean
		closeOnEsc?: boolean
		/** Return focus to the trigger after Escape. */
		restoreFocus?: boolean
		/** Render children while closed (e.g. so `aria-describedby` targets keep their content). */
		keepMounted?: boolean
		/** Breeze surface styling (background, border, radius, shadow). */
		surface?: boolean
		/** ARIA role of the popover, e.g. `menu`, `listbox`, `dialog`, `tooltip`. */
		role?: HTMLAttributes<HTMLDivElement>['role']
		/** Receives props to spread on the interactive element: `{#snippet trigger(props)}<button {...props}>`. */
		trigger?: Snippet<[PopoverTriggerProps]>
		children?: Snippet
		onclose?: () => void
	}

	const uid = $props.id()

	let {
		open = $bindable(false),
		anchor = null,
		placement = 'bottom-start',
		offset = 4,
		viewportPadding = 8,
		flip = true,
		matchWidth = false,
		maxHeight,
		closeOnOutside = true,
		closeOnEsc = true,
		restoreFocus = true,
		keepMounted = false,
		surface = true,
		role,
		trigger,
		children,
		onclose,
		id,
		class: customClass = '',
		...restProps
	}: Props = $props()

	const popoverId = $derived(id ?? `plasma-popover-${uid}`)

	let anchorEl = $state<HTMLElement | null>(null)
	let floatingEl = $state<HTMLDivElement | null>(null)

	const ariaHasPopup = $derived.by((): PopoverTriggerProps['aria-haspopup'] => {
		switch (role) {
			case 'menu':
				return 'menu'
			case 'listbox':
				return 'listbox'
			case 'dialog':
				return 'dialog'
			case 'tree':
				return 'tree'
			case 'grid':
				return 'grid'
			default:
				return 'true'
		}
	})

	function close() {
		if (!open) return
		open = false
		onclose?.()
	}

	function toggle() {
		if (open) close()
		else open = true
	}

	const triggerProps: PopoverTriggerProps = $derived({
		'aria-haspopup': ariaHasPopup,
		'aria-expanded': open,
		'aria-controls': popoverId,
		onclick: toggle,
	})

	function update() {
		const ref = anchor ?? anchorEl
		if (!ref || !floatingEl) return

		const a = ref.getBoundingClientRect()
		// Apply the width first so the measurement below already includes it.
		floatingEl.style.setProperty('--plasma-popover-anchor-width', `${a.width}px`)

		// Layout size, not getBoundingClientRect(): the entry animation scales the element,
		// and a scaled rect would misplace end/center-aligned popovers.
		const result = computePosition(
			a,
			{ width: floatingEl.offsetWidth, height: floatingEl.offsetHeight },
			{
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight,
			},
			{ placement, offset, padding: viewportPadding, flip },
		)

		floatingEl.style.left = `${Math.round(result.x)}px`
		floatingEl.style.top = `${Math.round(result.y)}px`
		floatingEl.style.setProperty('--plasma-popover-max-height', `${Math.floor(maxHeight ? Math.min(result.maxHeight, maxHeight) : result.maxHeight)}px`)
		floatingEl.dataset.side = result.side
	}

	// Show / hide in the top layer.
	$effect(() => {
		const el = floatingEl
		if (!el) return
		const shown = el.matches(':popover-open')
		if (open && !shown) {
			el.showPopover()
		} else if (!open && shown) {
			el.hidePopover()
		}
	})

	// While open: position, track scroll/resize, handle dismissal.
	$effect(() => {
		if (!open || !floatingEl) return

		const floating = floatingEl
		const token = Symbol('plasma-popover')
		openStack.push(token)

		const previouslyFocused = document.activeElement as HTMLElement | null

		update()

		const ro = new ResizeObserver(update)
		ro.observe(floating)
		const ref = anchor ?? anchorEl
		if (ref instanceof Element) ro.observe(ref)

		window.addEventListener('scroll', update, true)
		window.addEventListener('resize', update)

		function onPointerDown(e: PointerEvent) {
			if (!closeOnOutside) return
			const path = e.composedPath()
			// Pressing the anchor/trigger isn't "outside": its own click handler toggles.
			if (path.includes(floating)) return
			if (anchorEl && path.includes(anchorEl)) return
			if (anchor instanceof Node && path.includes(anchor)) return
			close()
		}

		function onKeydown(e: KeyboardEvent) {
			if (!closeOnEsc || e.key !== 'Escape' || openStack.at(-1) !== token) return
			e.stopPropagation()
			const focusWasInside = floating.contains(document.activeElement)
			close()
			if (restoreFocus && focusWasInside) {
				const target =
					previouslyFocused?.isConnected && !floating.contains(previouslyFocused)
						? previouslyFocused
						: anchorEl?.querySelector<HTMLElement>(
								'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
							)
				queueMicrotask(() => target?.focus())
			}
		}

		document.addEventListener('pointerdown', onPointerDown, true)
		document.addEventListener('keydown', onKeydown)

		return () => {
			ro.disconnect()
			window.removeEventListener('scroll', update, true)
			window.removeEventListener('resize', update)
			document.removeEventListener('pointerdown', onPointerDown, true)
			document.removeEventListener('keydown', onKeydown)
			const i = openStack.indexOf(token)
			if (i !== -1) openStack.splice(i, 1)
		}
	})

	// Re-position when placement-related props change while open.
	$effect(() => {
		void [placement, offset, viewportPadding, flip, anchor, maxHeight]
		if (open) update()
	})
</script>

{#if trigger}
	<span class="plasma-popover-anchor" bind:this={anchorEl}>
		{@render trigger(triggerProps)}
	</span>
{/if}

<div
	bind:this={floatingEl}
	id={popoverId}
	popover="manual"
	{role}
	class="plasma-popover {customClass}"
	class:plasma-popover--surface={surface}
	class:plasma-popover--match-width={matchWidth}
	{...restProps}
>
	{#if open || keepMounted}
		{@render children?.()}
	{/if}
</div>

<style>
	.plasma-popover-anchor {
		display: inline-flex;
	}

	/* Reset the UA [popover] styles; position is set from script. */
	.plasma-popover {
		position: fixed;
		inset: auto;
		left: 0;
		top: 0;
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
		color: inherit;
		overflow: visible;
		box-sizing: border-box;
		max-height: var(--plasma-popover-max-height, none);
		animation: plasma-popover-in var(--plasma-duration-fast) var(--plasma-ease-default);
	}

	.plasma-popover--match-width {
		min-width: var(--plasma-popover-anchor-width, 0);
	}

	.plasma-popover--surface {
		overflow: auto;
		background-color: var(--plasma-color-surface);
		color: var(--plasma-color-text);
		border: 1px solid var(--plasma-color-border);
		border-radius: var(--plasma-popover-radius, var(--plasma-radius-md));
		box-shadow: var(--plasma-popover-shadow, var(--plasma-shadow-md));
	}

	.plasma-popover[data-side='bottom'] {
		transform-origin: top center;
	}
	.plasma-popover[data-side='top'] {
		transform-origin: bottom center;
	}
	.plasma-popover[data-side='left'] {
		transform-origin: center right;
	}
	.plasma-popover[data-side='right'] {
		transform-origin: center left;
	}

	@keyframes plasma-popover-in {
		from {
			opacity: 0;
			transform: scale(0.96);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.plasma-popover {
			animation: none;
		}
	}
</style>
