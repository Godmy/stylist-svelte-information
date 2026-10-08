<script lang="ts">
	import createVerticalBarsChartState from './state.svelte';
	import type { RecipeVerticalBarsChart } from '$stylist/chart/interface/recipe/vertical-bars-chart';

	let props: RecipeVerticalBarsChart = $props();
	const state = createVerticalBarsChartState(() => props);
</script>

<section class={state.className}>
	{#if state.text}
		<strong>{state.text}</strong>
	{/if}
	<div class="vertical-bars-chart__plot" style={`height: ${state.height}; gap: ${state.gap};`}>
		{#each state.items as item (item.id)}
			<article aria-label={item.ariaLabel ?? `${item.label}: ${item.valueLabel ?? ''}`}>
				<span
					class="vertical-bars-chart__bar"
					style={`height: ${Math.max(item.minHeightPercent ?? 4, item.heightPercent)}%; width: ${state.barWidth}; background: ${item.color ?? state.color};`}
					aria-hidden="true"
				></span>
				{#if item.valueLabel !== undefined}
					<small>{item.valueLabel}</small>
				{/if}
				<span class="vertical-bars-chart__label">{item.label}</span>
			</article>
		{/each}
	</div>
</section>

<style>
	.vertical-bars-chart {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.vertical-bars-chart > strong {
		color: var(--color-text-primary, #0f172a);
		font-size: 0.875rem;
	}
	.vertical-bars-chart__plot {
		display: flex;
		align-items: end;
	}
	.vertical-bars-chart article {
		display: grid;
		grid-template-rows: minmax(0, 1fr) auto auto;
		justify-items: center;
		align-items: end;
		gap: 0.25rem;
		height: 100%;
		min-width: 0;
	}
	.vertical-bars-chart__bar {
		border-radius: 0.25rem 0.25rem 0 0;
		transition: height var(--duration-300, 300ms) var(--animation-ease, ease);
	}
	.vertical-bars-chart small,
	.vertical-bars-chart__label {
		color: var(--color-text-tertiary, #64748b);
		font-size: 0.6875rem;
	}
</style>
