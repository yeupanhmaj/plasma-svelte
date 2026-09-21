<script lang="ts">
	import type { Snippet } from 'svelte'

	type AccentColor =
		| 'emerald'
		| 'green'
		| 'blue'
		| 'ocean'
		| 'purple'
		| 'violet'
		| 'orange'
		| 'amber'
		| 'rose'
		| 'red'
		| 'teal'

	let { children, accent = 'green' } = $props<{
		children: Snippet
		accent?: AccentColor
	}>()
</script>

<div data-accent={accent}>
	{@render children?.()}
</div>
