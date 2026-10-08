<script lang="ts">
	import type { RecipePieChart } from '$stylist/chart/interface/recipe/pie-chart';
	import createPieChartState from './state.svelte';

	let props: RecipePieChart = $props();
	const state = createPieChartState(() => props);
</script>

<div class={state.containerClasses}>
	<svg width={state.width} height={state.height} viewBox={`0 0 ${state.width} ${state.height}`}>
		{#each state.segments as segment, i}
			<path
				d={`
          M ${state.width / 2} ${state.height / 2}
          L ${state.width / 2 + (state.width / 3) * Math.cos(((segment.startAngle - 90) * Math.PI) / 180)}
            ${state.height / 2 + (state.height / 3) * Math.sin(((segment.startAngle - 90) * Math.PI) / 180)}
          A ${state.width / 3} ${state.height / 3} 0 ${segment.endAngle - segment.startAngle > 180 ? 1 : 0} 1
            ${state.width / 2 + (state.width / 3) * Math.cos(((segment.endAngle - 90) * Math.PI) / 180)}
            ${state.height / 2 + (state.height / 3) * Math.sin(((segment.endAngle - 90) * Math.PI) / 180)}
          Z
        `}
				fill={segment.color}
			/>
		{/each}
	</svg>
	<div class={state.legendClasses}>
		{#each state.segments as segment, i}
			<div class={state.legendItemClasses}>
				<div class={state.legendSwatchClasses} style={`background-color: ${segment.color}`}></div>
				<span class={state.legendTextClasses}>{segment.label}: {segment.value}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.c-pie-chart {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.c-pie-chart__legend {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem 1rem;
		width: 100%;
	}

	.c-pie-chart__legend-item {
		display: inline-flex;
		align-items: center;
	}

	.c-pie-chart__legend-swatch {
		width: 1rem;
		height: 1rem;
		margin-right: 0.5rem;
		border-radius: 0.25rem;
		flex-shrink: 0;
	}

	.c-pie-chart__legend-text {
		font-size: 0.875rem;
		color: var(--color-text-primary);
	}
</style>
