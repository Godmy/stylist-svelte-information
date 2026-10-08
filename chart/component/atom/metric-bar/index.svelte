<script lang="ts">
	import createMetricBarState from './state.svelte';
	import type { RecipeMetricBar } from '$stylist/chart/interface/recipe/metric-bar';

	let props: RecipeMetricBar = $props();
	const state = createMetricBarState(() => props);
</script>

<div
	class={state.containerClasses}
	style={state.combinedStyle}
	role="group"
	aria-label={`Metric row: ${state.text}`}
	{...state.restProps}
>
	<div class={state.headerClasses}>
		<span class={state.labelClasses}>{state.text}</span>
		<span class={state.valueClasses}>{state.valueLabel}</span>
	</div>

	<div
		class={state.trackClasses}
		role="progressbar"
		aria-valuenow={state.percentage}
		aria-valuemin="0"
		aria-valuemax="100"
		aria-label={`${state.text}: ${state.percentage}%`}
	>
		<div class={state.fillClasses} style={state.widthStyle} aria-hidden="true"></div>
	</div>
</div>

<style>
	.metric-bar {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 0;
	}

	.metric-bar__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		min-width: 0;
	}

	.metric-bar__label {
		min-width: 0;
		overflow-wrap: anywhere;
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.25rem;
		color: var(--color-text-primary);
	}

	.metric-bar__value {
		flex: 0 0 auto;
		max-width: 45%;
		overflow-wrap: anywhere;
		text-align: right;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
		font-variant-numeric: tabular-nums;
	}

	.metric-bar__track {
		height: 0.5rem;
		overflow: hidden;
		border-radius: 999px;
		background: var(--metric-bar-track-color, var(--color-neutral-200));
	}

	.metric-bar__fill {
		height: 100%;
		border-radius: inherit;
		background: var(--metric-bar-color, var(--color-primary-500));
		transition: width 180ms ease-out;
	}
</style>
