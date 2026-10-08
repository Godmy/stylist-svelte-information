<script lang="ts">
	import createChartLegendBarState from './state.svelte';
	import type { RecipeChartLegendBar } from '$stylist/chart/interface/recipe/chart-legend-bar';

	let props: RecipeChartLegendBar = $props();
	const state = createChartLegendBarState(() => props);
</script>

<g class={state.className} aria-label={`${state.labelText}: ${state.valueLabel}`}>
	<rect
		class="chart-legend-bar__bar"
		x={props.x}
		y={props.y}
		width={props.width}
		height={props.height}
		rx="4"
		fill={props.color}
	/>
	<text
		class="chart-legend-bar__value"
		x={props.x + props.width / 2}
		y={Math.max(12, props.y - 8)}
		text-anchor="middle"
	>
		{state.valueLabel}
	</text>
	{#if props.connectorVisible ?? true}
		<path
			class="chart-legend-bar__connector"
			d={`M ${props.connectorX} ${props.connectorY1} V ${props.connectorY2}`}
			stroke={props.color}
			stroke-width={props.connectorWidth}
		/>
	{/if}
	<rect
		class="chart-legend-bar__label-box"
		x={props.labelX}
		y={props.labelY}
		width={props.labelWidth}
		height={props.labelHeight}
		rx="6"
		stroke={props.color}
		stroke-width={props.connectorWidth}
	/>
	<rect
		class="chart-legend-bar__label-accent"
		x={props.labelX}
		y={props.labelY}
		width={Math.max(3, props.connectorWidth + 1)}
		height={props.labelHeight}
		rx="6"
	/>
	<text class="chart-legend-bar__label" x={props.textX} y={props.textY} text-anchor="middle">
		{state.labelText}
	</text>
</g>

<style>
	.chart-legend-bar__bar {
		filter: drop-shadow(0 8px 12px rgba(15, 23, 42, 0.12));
		transition:
			fill 0.16s ease,
			filter 0.16s ease;
	}

	.chart-legend-bar__value {
		fill: var(--color-text-secondary, #64748b);
		font-size: 0.68rem;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}

	.chart-legend-bar__connector {
		fill: none;
		stroke-linecap: round;
		transition:
			stroke 0.16s ease,
			stroke-width 0.16s ease;
	}

	.chart-legend-bar__label-box {
		fill: var(--color-background-primary, #ffffff);
		transition:
			stroke 0.16s ease,
			stroke-width 0.16s ease,
			fill 0.16s ease;
	}

	.chart-legend-bar__label-accent {
		fill: var(--legend-bar-hover-color, #f59e0b);
		opacity: 0;
		transition: opacity 0.16s ease;
	}

	.chart-legend-bar__label {
		fill: var(--color-text-primary, #0f172a);
		font-size: 0.68rem;
		font-weight: 750;
		transition: fill 0.16s ease;
	}

	:global(.legend-bar-diagram__item:hover) .chart-legend-bar__bar,
	:global(.legend-bar-diagram__item--active) .chart-legend-bar__bar {
		fill: var(--legend-bar-hover-color, #f59e0b);
		filter: drop-shadow(0 10px 15px rgba(245, 158, 11, 0.25));
	}

	:global(.legend-bar-diagram__item:hover) .chart-legend-bar__connector,
	:global(.legend-bar-diagram__item--active) .chart-legend-bar__connector {
		stroke: var(--legend-bar-hover-color, #f59e0b);
		stroke-width: 3;
	}

	:global(.legend-bar-diagram__item:hover) .chart-legend-bar__label-box,
	:global(.legend-bar-diagram__item--active) .chart-legend-bar__label-box {
		fill: color-mix(in srgb, var(--legend-bar-hover-color, #f59e0b) 10%, white 90%);
		stroke: var(--legend-bar-hover-color, #f59e0b);
		stroke-width: 3;
	}

	:global(.legend-bar-diagram__item:hover) .chart-legend-bar__label-accent,
	:global(.legend-bar-diagram__item--active) .chart-legend-bar__label-accent {
		opacity: 1;
	}

	:global(.legend-bar-diagram__item:hover) .chart-legend-bar__label,
	:global(.legend-bar-diagram__item--active) .chart-legend-bar__label {
		fill: #92400e;
	}
</style>
