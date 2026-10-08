<script lang="ts">
	import type { RecipeChart } from '$stylist/chart/interface/recipe/chart';
	import createChartState from './state.svelte';
	import ChartCanvas from '$stylist/chart/component/molecule/chart-canvas/index.svelte';
	import ChartLegend from '$stylist/chart/component/molecule/chart-legend/index.svelte';

	let props: RecipeChart = $props();
	const state = createChartState(() => props);
</script>

<section class={state.containerClasses}>
	<ChartCanvas
		width={state.width}
		height={state.height}
		title={props.title}
		series={state.series}
		xScale={props.xScale}
		yScale={props.yScale}
		xTickCount={props.xTickCount}
		yTickCount={props.yTickCount}
		zTickCount={props.zTickCount}
		xAxisLabel={props.xAxisLabel}
		yAxisLabel={props.yAxisLabel}
		zAxisLabel={props.zAxisLabel}
		showGrid={state.showGrid}
		showZAxis={state.showZAxis}
		showAxisArrows={props.showAxisArrows}
	/>
	{#if state.showLegend}
		<ChartLegend items={state.legendItems} />
	{/if}
</section>

<style>
	.c-chart {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
