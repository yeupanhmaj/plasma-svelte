<script lang="ts">
	import { setContext } from 'svelte'
	import type { RowProps } from './types.js'
	import { resolveGutterStyles } from './utils.js'

	let {
		align,
		justify,
		gutter,
		wrap = true,
		children,
		class: customClass = '',
		style = '',
		...restProps
	}: RowProps = $props()

	setContext('plasma-row', {
		get gutter() {
			return gutter
		},
		get wrap() {
			return wrap
		},
	})

	const rowClasses = $derived.by(() => {
		const classes: string[] = ['plasma-row']

		if (!wrap) {
			classes.push('plasma-row-no-wrap')
		}

		if (align) {
			classes.push(`plasma-row-align-${align}`)
		}

		if (justify) {
			classes.push(`plasma-row-justify-${justify}`)
		}

		if (customClass) {
			classes.push(customClass)
		}

		return classes.join(' ')
	})

	const computedStyle = $derived.by(() => {
		const rules = resolveGutterStyles(gutter)
		if (style) {
			rules.push(style)
		}
		return rules.length > 0 ? rules.join(' ') : undefined
	})
</script>

<div class={rowClasses} style={computedStyle} {...restProps}>
	{@render children?.()}
</div>
