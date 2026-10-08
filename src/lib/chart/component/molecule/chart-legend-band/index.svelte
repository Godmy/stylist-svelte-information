<script lang="ts">
	import createChartLegendBandState from './state.svelte';
	import type { RecipeChartLegendBand } from '$stylist/chart/interface/recipe/chart-legend-band';

	let props: RecipeChartLegendBand = $props();
	const state = createChartLegendBandState(() => props);
</script>

<g class={state.className} aria-label={`${state.labelText}: ${state.valueLabel}`}>
	<text
		class="chart-legend-band__value"
		x={props.x + props.width / 2}
		y={Math.max(12, props.y - 8)}
		text-anchor="middle"
	>
		{state.valueLabel}
	</text>
	{#each props.segments as segment (segment.id)}
		{#if segment.height > 0}
			<rect
				class="chart-legend-band__segment"
				x={segment.x}
				y={segment.y}
				width={segment.width}
				height={segment.height}
				fill={segment.color}
			>
				<title>{segment.text}: {segment.value}</title>
			</rect>
		{/if}
	{/each}
	{#if props.connectorVisible ?? true}
		<path
			class="chart-legend-band__connector"
			d={`M ${props.connectorX} ${props.connectorY1} V ${props.connectorY2}`}
			stroke={props.color}
			stroke-width={props.connectorWidth}
		/>
	{/if}
	<rect
		class="chart-legend-band__label-box"
		x={props.labelX}
		y={props.labelY}
		width={props.labelWidth}
		height={props.labelHeight}
		rx="6"
		stroke={props.color}
		stroke-width={props.connectorWidth}
	/>
	<text class="chart-legend-band__label" x={props.textX} y={props.textY} text-anchor="middle">
		{state.labelText}
	</text>
</g>

<style>
	.chart-legend-band__value {
		fill: var(--color-text-secondary, #64748b);
		font-size: 0.68rem;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}

	.chart-legend-band__segment {
		shape-rendering: crispEdges;
		transition: opacity 0.16s ease;
	}

	.chart-legend-band__connector {
		fill: none;
		stroke-linecap: round;
		transition:
			stroke 0.16s ease,
			stroke-width 0.16s ease;
	}

	.chart-legend-band__label-box {
		fill: var(--color-background-primary, #ffffff);
		transition:
			fill 0.16s ease,
			stroke 0.16s ease,
			stroke-width 0.16s ease;
	}

	.chart-legend-band__label {
		fill: var(--color-text-primary, #0f172a);
		font-size: 0.68rem;
		font-weight: 750;
		transition: fill 0.16s ease;
	}

	:global(.legend-band-diagram__item:hover) .chart-legend-band__segment,
	:global(.legend-band-diagram__item--active) .chart-legend-band__segment {
		opacity: 0.88;
	}

	:global(.legend-band-diagram__item:hover) .chart-legend-band__segment:nth-of-type(1),
	:global(.legend-band-diagram__item--active) .chart-legend-band__segment:nth-of-type(1) {
		fill: #f59e0b;
	}

	:global(.legend-band-diagram__item:hover) .chart-legend-band__segment:nth-of-type(2),
	:global(.legend-band-diagram__item--active) .chart-legend-band__segment:nth-of-type(2) {
		fill: #fef3c7;
	}

	:global(.legend-band-diagram__item:hover) .chart-legend-band__segment:nth-of-type(3),
	:global(.legend-band-diagram__item--active) .chart-legend-band__segment:nth-of-type(3) {
		fill: #b45309;
	}

	:global(.legend-band-diagram__item:hover) .chart-legend-band__segment:nth-of-type(4),
	:global(.legend-band-diagram__item--active) .chart-legend-band__segment:nth-of-type(4) {
		fill: #fef3c7;
	}

	:global(.legend-band-diagram__item:hover) .chart-legend-band__segment:nth-of-type(5),
	:global(.legend-band-diagram__item--active) .chart-legend-band__segment:nth-of-type(5) {
		fill: #f59e0b;
	}

	:global(.legend-band-diagram__item:hover) .chart-legend-band__label-box,
	:global(.legend-band-diagram__item--active) .chart-legend-band__label-box {
		fill: color-mix(in srgb, var(--legend-band-hover-color, #f59e0b) 10%, white 90%);
		stroke: var(--legend-band-hover-color, #f59e0b);
		stroke-width: 3;
	}

	:global(.legend-band-diagram__item:hover) .chart-legend-band__label {
		fill: #92400e;
	}
</style>
