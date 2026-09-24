<script lang="ts">
	import type { Breakpoint, ColBreakpointProp, ColProps } from './types.js'

	let {
		span,
		offset,
		order,
		pull,
		push,
		flex,
		xs,
		sm,
		md,
		lg,
		xl,
		xxl,
		children,
		class: customClass = '',
		style = '',
		...restProps
	}: ColProps = $props()

	const colClasses = $derived.by(() => {
		const classes: string[] = ['plasma-col']

		if (span !== undefined) {
			classes.push(`plasma-col-${span}`)
		}

		if (offset !== undefined) {
			classes.push(`plasma-col-offset-${offset}`)
		}

		if (order !== undefined) {
			classes.push(`plasma-col-order-${order}`)
		}

		if (pull !== undefined) {
			classes.push(`plasma-col-pull-${pull}`)
		}

		if (push !== undefined) {
			classes.push(`plasma-col-push-${push}`)
		}

		const breakpoints: Array<[Breakpoint, ColBreakpointProp | undefined]> = [
			['xs', xs],
			['sm', sm],
			['md', md],
			['lg', lg],
			['xl', xl],
			['xxl', xxl],
		]

		for (const [bp, config] of breakpoints) {
			if (config === undefined) continue
			if (typeof config === 'number') {
				classes.push(`plasma-col-${bp}-${config}`)
			} else if (typeof config === 'object' && config !== null) {
				if (config.span !== undefined) {
					classes.push(`plasma-col-${bp}-${config.span}`)
				}
				if (config.offset !== undefined) {
					classes.push(`plasma-col-${bp}-offset-${config.offset}`)
				}
				if (config.order !== undefined) {
					classes.push(`plasma-col-${bp}-order-${config.order}`)
				}
				if (config.pull !== undefined) {
					classes.push(`plasma-col-${bp}-pull-${config.pull}`)
				}
				if (config.push !== undefined) {
					classes.push(`plasma-col-${bp}-push-${config.push}`)
				}
			}
		}

		if (customClass) {
			classes.push(customClass)
		}

		return classes.join(' ')
	})

	const resolvedFlex = $derived.by(() => {
		if (flex === undefined) return undefined
		if (typeof flex === 'number') return `${flex} ${flex} auto`
		if (flex === 'auto') return '1 1 auto'
		if (flex === 'none') return '0 0 auto'
		if (/^\d+(\.\d+)?(px|rem|em|%|vw|vh)$/.test(flex)) return `0 0 ${flex}`
		return flex
	})

	const computedStyle = $derived.by(() => {
		const rules: string[] = []

		if (resolvedFlex) {
			rules.push(`flex: ${resolvedFlex};`)
			if (flex === 'auto') {
				rules.push('min-width: 0;')
			} else if (/^\d+(\.\d+)?(px|rem|em|%|vw|vh)$/.test(String(flex))) {
				rules.push(`max-width: ${flex};`)
			}
		}

		if (style) {
			rules.push(style)
		}

		return rules.length > 0 ? rules.join(' ') : undefined
	})
</script>

<div class={colClasses} style={computedStyle} {...restProps}>
	{@render children?.()}
</div>
