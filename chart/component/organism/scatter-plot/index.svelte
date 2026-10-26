<script lang="ts">
	import type { RecipeScatterPlot } from '$stylist/chart/interface/recipe/scatter-plot';
	import createScatterPlotState from '$stylist/chart/component/organism/scatter-plot/state.svelte';
	import { CHART_SCATTER_PLOT_MESSAGE } from '$stylist/chart/const/record/scatter-plot-message';
	import { useMessage } from '$stylist/localization/function/hook/use-message';
	import { useFormat } from '$stylist/localization/function/hook/use-format';
	let {
		data = [],
		title,
		width = 700,
		height = 420,
		showLegend = true,
		showAxis = true,
		showGrid = true,
		pointSize = 6,
		showLabels = false,
		class: className = '',
		onPointClick,
		...restProps
	}: RecipeScatterPlot = $props();
	const state = createScatterPlotState(() => ({
		data,
		title,
		width,
		height,
		showLegend,
		showAxis,
		showGrid,
		pointSize,
		showLabels,
		class: className,
		onPointClick
	}));
	const t = useMessage('scatter-plot', CHART_SCATTER_PLOT_MESSAGE);
	const format = useFormat();
</script>

<div class={state.rootClass} style={`width:${width}px`} {...restProps}>
	<h3 class="sp-title">{title ?? t('title')}</h3>
	<div class="sp-chart-wrap">
		<svg {width} {height}>
			{#if showGrid}
				{#each Array(5).fill(0) as _, i (i)}
					<line
						x1="50"
						y1={10 + i * (state.chartHeight / 4)}
						x2={width - 20}
						y2={10 + i * (state.chartHeight / 4)}
						stroke="var(--color-border-primary)"
						stroke-width="1"
					/>
				{/each}
			{/if}
			{#if showAxis}
				<line
					x1="50"
					y1={height - 30}
					x2={width - 20}
					y2={height - 30}
					stroke="var(--color-text-secondary)"
				/> <line x1="50" y1="10" x2="50" y2={height - 30} stroke="var(--color-text-secondary)" />
			{/if}
			{#each data as d, index (index)}
				<g
					role="button"
					tabindex="0"
					onclick={() => onPointClick?.(d)}
					onkeydown={(event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault();
							onPointClick?.(d);
						}
					}}
				>
					<circle
						cx={state.getPointX(d.x)}
						cy={state.getPointY(d.y)}
						r={d.size || pointSize}
						fill={d.color || 'var(--color-primary-500)'}
					/>
					{#if showLabels && d.name}
						<text
							x={state.getPointX(d.x)}
							y={state.getPointY(d.y) - 8}
							text-anchor="middle"
							font-size="10">{d.name}</text
						>
					{/if}
				</g>
			{/each}
		</svg>
	</div>
	{#if showLegend}
		<div class="sp-legend">
			{t('extent', {
				x: format.number(Math.round(state.maxX)),
				y: format.number(Math.round(state.maxY))
			})}
		</div>
	{/if}
</div>

<style>
	.sp-title {
		margin-bottom: 0.75rem;
		font-size: 1.125rem;
		font-weight: 600;
	}
	.sp-chart-wrap {
		overflow-x: auto;
		border-radius: 0.5rem;
		border: 1px solid;
		padding: 0.75rem;
	}
	.sp-legend {
		margin-top: 0.5rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
</style>
