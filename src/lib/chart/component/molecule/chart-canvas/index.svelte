<script lang="ts">
	import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeChartCanvas as InformationChartCanvasRecipe } from '$stylist/chart/interface/recipe/chart-canvas';
	import type { RecipeAnalyticsChartCanvas } from '$stylist/chart/interface/recipe/analytics-chart-canvas';
	import createChartCanvasState from './state.svelte';
	import ChartAxisX from '$stylist/chart/component/atom/chart-axis-x/index.svelte';
	import ChartAxisY from '$stylist/chart/component/atom/chart-axis-y/index.svelte';
	import ChartAxisZ from '$stylist/chart/component/atom/chart-axis-z/index.svelte';
	import ChartBackground from '$stylist/chart/component/atom/chart-background/index.svelte';
	import ChartName from '$stylist/chart/component/atom/chart-name/index.svelte';
	import ChartPolyline from '$stylist/chart/component/atom/chart-polyline/index.svelte';
	import { ManagerChartCanvas } from '$stylist/chart/class/manager/chart-canvas';

	let props: RecipeAnalyticsChartCanvas & HTMLAttributes<HTMLDivElement> = $props();
	const state = createChartCanvasState({
		width: props.width,
		height: props.height,
		class: ClassNamesManager.merge(props.class)
	} as InformationChartCanvasRecipe & HTMLAttributes<HTMLDivElement>);

	const width = $derived(state.width);
	const height = $derived(state.height);
	const padding = $derived(state.padding);
	const series = $derived(ManagerChartCanvas.resolveSeries(props.series));
	const xTickCount = $derived(ManagerChartCanvas.resolveTickCount(props.xTickCount, 1));
	const yTickCount = $derived(ManagerChartCanvas.resolveTickCount(props.yTickCount, 1));
	const zTickCount = $derived(ManagerChartCanvas.resolveTickCount(props.zTickCount, 0));
	const showAxisArrows = $derived(props.showAxisArrows ?? true);

	const bounds = $derived(ManagerChartCanvas.resolveBounds(series));
	const xScale = $derived(ManagerChartCanvas.resolveScale(props.xScale, bounds.minX, bounds.maxX));
	const yScale = $derived(ManagerChartCanvas.resolveScale(props.yScale, bounds.minY, bounds.maxY));
	const xTicks = $derived(ManagerChartCanvas.resolveTickPositions(width, padding, xTickCount));
	const yTicks = $derived(
		ManagerChartCanvas.resolveVerticalTickPositions(height, padding, yTickCount)
	);
	const xTickLabels = $derived(ManagerChartCanvas.resolveTickLabels(xScale, xTickCount));
	const yTickLabels = $derived(ManagerChartCanvas.resolveVerticalTickLabels(yScale, yTickCount));
</script>

<div class={state.wrapperClasses}>
	<svg
		class={state.svgClasses}
		{width}
		{height}
		role="img"
		aria-label={props.title ?? 'Chart canvas'}
	>
		<ChartBackground {width} {height} />
		{#if props.title}
			<ChartName text={props.title} x={padding} y={24} />
		{/if}

		<ChartAxisX
			y={height - padding}
			startX={padding}
			endX={width - padding}
			ticks={xTicks}
			tickLabels={xTickLabels}
			tickCount={xTickCount}
			label={props.xAxisLabel}
			showGrid={props.showGrid}
			showArrow={showAxisArrows}
		/>
		<ChartAxisY
			x={padding}
			startY={padding}
			endY={height - padding}
			ticks={yTicks}
			tickLabels={yTickLabels}
			tickCount={yTickCount}
			label={props.yAxisLabel}
			showGrid={props.showGrid}
			gridEndX={width - padding}
			showArrow={showAxisArrows}
		/>
		{#if props.showZAxis}
			<ChartAxisZ
				startX={padding}
				startY={height - padding}
				endX={padding + 72}
				endY={height - padding - 72}
				tickCount={zTickCount}
				label={props.zAxisLabel}
				showArrow={showAxisArrows}
			/>
		{/if}

		{#each series as item (item.id)}
			<ChartPolyline
				points={item.points}
				{width}
				{height}
				xDomain={xScale}
				yDomain={yScale}
				color={item.color}
			/>
		{/each}
	</svg>
</div>

<style>
	.c-chart-canvas {
		position: relative;
		display: inline-flex;
		flex-direction: column;
		padding: 0.75rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.75rem;
		background: var(--color-background-primary);
	}

	.c-chart-canvas__svg {
		display: block;
		overflow: visible;
	}
</style>
