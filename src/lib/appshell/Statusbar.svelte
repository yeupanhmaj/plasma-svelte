<script lang="ts">
	import type { StatusbarProps } from './types.js'

	let {
		status = 'ready',
		statusText = '',
		bordered = false,
		left,
		center,
		right,
		children,
		class: customClass = '',
		style = '',
		...restProps
	}: StatusbarProps = $props()
</script>

<div
	class="plasma-appshell-statusbar {customClass}"
	class:plasma-appshell-statusbar--bordered={bordered}
	style="{style}"
	role="status"
	{...restProps}
>
	<div class="plasma-appshell-statusbar-left">
		{#if left}
			{@render left()}
		{:else}
			{#if status !== 'none'}
				<span
					class="plasma-appshell-status-dot plasma-appshell-status-dot--{status}"
					aria-hidden="true"
				></span>
			{/if}
			{#if statusText}
				<span class="plasma-appshell-status-text">{statusText}</span>
			{/if}
		{/if}
		{@render children?.()}
	</div>

	{#if center}
		<div class="plasma-appshell-statusbar-center">
			{@render center()}
		</div>
	{/if}

	{#if right}
		<div class="plasma-appshell-statusbar-right">
			{@render right()}
		</div>
	{/if}
</div>

<style>
	.plasma-appshell-statusbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		min-height: 26px;
		font-size: var(--plasma-font-size-xs, 12px);
		color: var(--plasma-color-text-muted);
		background-color: var(--plasma-color-surface);
		user-select: none;
		box-sizing: border-box;
		gap: var(--plasma-space-sm);
	}

	.plasma-appshell-statusbar--bordered {
		border-top: 1px solid var(--plasma-color-border-subtle);
		padding-top: 2px;
	}

	.plasma-appshell-statusbar-left {
		display: flex;
		align-items: center;
		gap: var(--plasma-space-xs);
		flex: 1;
		min-width: 0;
	}

	.plasma-appshell-statusbar-center {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--plasma-space-sm);
	}

	.plasma-appshell-statusbar-right {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--plasma-space-sm);
		flex: 1;
		min-width: 0;
	}

	.plasma-appshell-status-dot {
		width: 7px;
		height: 7px;
		border-radius: var(--plasma-radius-full);
		flex-shrink: 0;
	}

	.plasma-appshell-status-dot--ready {
		background-color: var(--plasma-color-highlight);
	}

	.plasma-appshell-status-dot--working {
		background-color: var(--plasma-color-neutral);
		animation: plasma-pulse 1.2s infinite ease-in-out;
	}

	.plasma-appshell-status-dot--success {
		background-color: var(--plasma-color-positive);
	}

	.plasma-appshell-status-dot--warning {
		background-color: var(--plasma-color-neutral);
	}

	.plasma-appshell-status-dot--error {
		background-color: var(--plasma-color-negative);
	}

	.plasma-appshell-status-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@keyframes plasma-pulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.4;
			transform: scale(0.85);
		}
	}
</style>
