<script lang="ts">
	import { type Snippet, tick } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'
	import Popover from '../popover/Popover.svelte'

	type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

	interface Props extends HTMLAttributes<HTMLDivElement> {
		open?: boolean
		inline?: boolean
		placement?: MenuPlacement
		/** Close the menu after an enabled item is activated (click, Enter or Space). */
		closeOnSelect?: boolean
		trigger?: Snippet
		children?: Snippet
		onclose?: () => void
	}

	let {
		open = $bindable(false),
		inline = false,
		placement = 'bottom-start',
		closeOnSelect = true,
		trigger,
		children,
		onclose,
		class: customClass = '',
		...restProps
	}: Props = $props()

	let wrapperEl = $state<HTMLDivElement | null>(null)

	let triggerWrapEl = $state<HTMLDivElement | null>(null)
	let menuEl = $state<HTMLUListElement | null>(null)
	let focusTarget: 'first' | 'last' = 'first'
	let typeahead = ''
	let typeaheadTimer: ReturnType<typeof setTimeout> | undefined

	function toggle() {
		open = !open
		if (!open) onclose?.()
	}

	function close() {
		if (!open) return
		open = false
		onclose?.()
	}

	function enabledItems(): HTMLElement[] {
		return menuEl
			? [...menuEl.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')]
			: []
	}

	function focusTrigger() {
		triggerWrapEl
			?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
			?.focus()
	}

	// Move focus into the menu when it opens.
	$effect(() => {
		if (!open || inline) return
		const which = focusTarget
		focusTarget = 'first'
		tick().then(() => {
			const items = enabledItems()
			;(which === 'last' ? items.at(-1) : items[0])?.focus()
		})
	})

	function onTriggerKeydown(e: KeyboardEvent) {
		if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
		e.preventDefault()
		focusTarget = e.key === 'ArrowUp' ? 'last' : 'first'
		if (open) {
			const items = enabledItems()
			;(focusTarget === 'last' ? items.at(-1) : items[0])?.focus()
		} else {
			open = true
		}
	}

	function onMenuKeydown(e: KeyboardEvent) {
		const items = enabledItems()
		if (!items.length) return
		const current = items.indexOf(document.activeElement as HTMLElement)
		let next = -1

		switch (e.key) {
			case 'ArrowDown':
				next = (current + 1) % items.length
				break
			case 'ArrowUp':
				next = current <= 0 ? items.length - 1 : current - 1
				break
			case 'Home':
				next = 0
				break
			case 'End':
				next = items.length - 1
				break
			case 'Enter':
			case ' ':
				if (current >= 0) {
					e.preventDefault()
					items[current].click()
				}
				return
			case 'Tab':
				if (!inline) {
					e.preventDefault()
					close()
					focusTrigger()
				}
				return
			default: {
				if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return
				// Typeahead: jump to the next item whose label starts with the typed text.
				clearTimeout(typeaheadTimer)
				typeahead += e.key.toLowerCase()
				typeaheadTimer = setTimeout(() => {
					typeahead = ''
				}, 500)
				const ordered = [...items.slice(current + 1), ...items.slice(0, current + 1)]
				const match = ordered.find((el) =>
					el.textContent?.trim().toLowerCase().startsWith(typeahead),
				)
				if (match) {
					e.preventDefault()
					match.focus()
				}
				return
			}
		}

		e.preventDefault()
		items[next].focus()
	}

	function onMenuClick(e: MouseEvent) {
		if (inline || !closeOnSelect) return
		const item = (e.target as HTMLElement).closest('[role="menuitem"]')
		if (!item || item.getAttribute('aria-disabled') === 'true') return
		close()
		focusTrigger()
	}

	$effect(() => () => clearTimeout(typeaheadTimer))
</script>

<div
	bind:this={wrapperEl}
	class="plasma-menu-wrapper {customClass}"
	class:plasma-menu-wrapper--inline={inline}
	{...restProps}
>
	{#if trigger}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- biome-ignore lint/a11y/noStaticElementInteractions: trigger slot wrapper; the focusable element inside is the real control -->
		<div
			bind:this={triggerWrapEl}
			class="plasma-menu-trigger"
			onclick={toggle}
			onkeydown={onTriggerKeydown}
		>
			{@render trigger()}
		</div>
	{/if}

	{#if inline}
		<ul
			bind:this={menuEl}
			role="menu"
			tabindex="0"
			class="plasma-menu plasma-menu--static"
			onkeydown={onMenuKeydown}
		>
			{@render children?.()}
		</ul>
	{:else}
		<Popover
			bind:open
			anchor={wrapperEl}
			{placement}
			surface={false}
			{onclose}
			class="plasma-menu-popover"
		>
			<ul
				bind:this={menuEl}
				role="menu"
				class="plasma-menu"
				onclick={onMenuClick}
				onkeydown={onMenuKeydown}
			>
				{@render children?.()}
			</ul>
		</Popover>
	{/if}
</div>

<style>
	.plasma-menu-wrapper {
		position: relative;
		display: inline-flex;
		box-sizing: border-box;
	}

	.plasma-menu-wrapper--inline {
		width: auto;
	}

	.plasma-menu-trigger {
		display: inline-flex;
	}

	/* --------------------------------------------------------------------------
     Menu Panel (KDE Breeze QMenu)
     -------------------------------------------------------------------------- */
	.plasma-menu {
		min-width: 180px;
		max-width: 320px;
		margin: 0;
		padding: 4px;
		list-style: none;
		background-color: var(--plasma-color-surface);
		border: 1px solid var(--plasma-color-border);
		border-radius: var(--plasma-radius-md);
		box-shadow: var(--plasma-shadow-md);
		box-sizing: border-box;
	}

	.plasma-menu--static {
		box-shadow: var(--plasma-shadow-md);
	}

	:global(.plasma-menu-popover) {
		overflow: auto;
		border-radius: var(--plasma-radius-md);
	}
</style>
