<script lang="ts">
	import createRangeBarsChartState from './state.svelte';
	import type { RecipeRangeBarsChart } from '$stylist/chart/interface/recipe/range-bars-chart';

	let props: RecipeRangeBarsChart = $props();
	const state = createRangeBarsChartState(() => props);
</script>

<div
	class={state.className}
	style={`--range-bars-label-width: ${state.labelWidth}; --range-bars-value-width: ${state.valueWidth};`}
>
	<div class="range-bars-chart__axis">
		<span>{props.scaleMinLabel}</span>
		<span>{props.scaleMaxLabel}</span>
	</div>
	<div class="range-bars-chart__rows">
		{#each state.items as item (item.id)}
			<button
				type="button"
				class="range-bars-chart__row"
				onclick={() => state.selectItem(item.id)}
				aria-label={item.ariaLabel}
			>
				<span class="range-bars-chart__label" title={item.label}>{item.label}</span>
				<span class="range-bars-chart__track">
					<span
						class="range-bars-chart__span"
						style={`left: ${item.startPercent}%; width: ${item.endPercent - item.startPercent}%;`}
					></span>
					<span class="range-bars-chart__marker" style={`left: ${item.markerPercent}%;`}></span>
				</span>
				<span class="range-bars-chart__value">{item.valueLabel}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.range-bars-chart {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}
	.range-bars-chart__axis {
		display: flex;
		justify-content: space-between;
		padding-left: var(--range-bars-label-width);
		font-size: 0.6875rem;
		color: var(--color-text-tertiary, #64748b);
	}
	.range-bars-chart__rows {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.range-bars-chart__row {
		display: grid;
		grid-template-columns: var(--range-bars-label-width) 1fr var(--range-bars-value-width);
		align-items: center;
		gap: 0.75rem;
		padding: 0.25rem 0.375rem;
		border: none;
		border-radius: 0.375rem;
		background: transparent;
		text-align: left;
		cursor: pointer;
		font: inherit;
	}
	.range-bars-chart__row:hover {
		background: var(--color-background-secondary, #f1f5f9);
	}
	.range-bars-chart__label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.8125rem;
		color: var(--color-text-primary, #0f172a);
	}
	.range-bars-chart__track {
		position: relative;
		height: 0.5rem;
		border-radius: 9999px;
		background: var(--color-background-secondary, #f1f5f9);
	}
	.range-bars-chart__span {
		position: absolute;
		top: 0;
		height: 100%;
		border-radius: 9999px;
		background: var(--color-primary-200, #bfdbfe);
	}
	.range-bars-chart__marker {
		position: absolute;
		top: -0.1875rem;
		width: 0.25rem;
		height: 0.875rem;
		border-radius: 9999px;
		background: var(--color-primary-600, #2563eb);
		transform: translateX(-50%);
	}
	.range-bars-chart__value {
		font-size: 0.75rem;
		color: var(--color-text-tertiary, #64748b);
		text-align: right;
		white-space: nowrap;
	}
</style>
