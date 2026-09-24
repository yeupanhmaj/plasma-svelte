<script lang="ts">
	import Col from './Col.svelte'
	import type { ColProps } from './types.js'

	let props: ColProps = $props()
</script>

<Col {...props} />
