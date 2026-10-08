<script lang="ts">
	import { ManagerAnalyticsChart } from '$stylist/chart/class/manager/analytics-chart';
	import type { RecipeAnalyticsChart } from '$stylist/chart/interface/recipe/analytics-chart';
	import createAnalyticsChartState from './state.svelte';
	import BarChart from '$stylist/chart/component/molecule/bar-chart/index.svelte';
	import LineChart from '$stylist/chart/component/organism/line-chart/index.svelte';
	import PieChart from '$stylist/chart/component/molecule/pie-chart/index.svelte';

	let props: RecipeAnalyticsChart = $props();
	const state = createAnalyticsChartState(() => props);

	const maxValue = $derived(ManagerAnalyticsChart.resolveMaxValue(props.data ?? []));
	const chartPoints = $derived(ManagerAnalyticsChart.buildBarChartPoints(props.data ?? []));
	const pieChartPoints = $derived(ManagerAnalyticsChart.buildPieChartPoints(props.data ?? []));
	const lineSeries = $derived(
		ManagerAnalyticsChart.buildLineSeries(props.data ?? [], props.title ?? '')
	);
</script>

<div class={state.containerClasses} {...props}>
	<div class={state.headerClasses}>
		<div class={state.titleContainerClasses}>
			<div>
				<h3 class={state.titleClasses}>{props.title ?? 'Analytics Chart'}</h3>
				{#if props.subtitle}
					<p class={state.subtitleClasses}>{props.subtitle}</p>
				{/if}
			</div>
			{#if props.showTrend && props.trendValue !== 0}
				<div class="ac-trend-row">
					<span class={state.trendContainerClasses}>
						<span class="ac-trend-value">{Math.abs(props.trendValue ?? 0)}%</span>
					</span>
				</div>
			{/if}
		</div>
	</div>

	<div class={state.chartContainerClasses}>
		<div
			class="ac-chart-wrap"
			style={`height: ${props.height ?? 300}px; width: ${props.width ?? 600}px;`}
		>
			{#if props.type === 'bar'}
				<BarChart
					data={chartPoints}
					width={props.width ?? 600}
					height={props.height ?? 300}
					{maxValue}
				/>
			{:else if props.type === 'line'}
				<LineChart
					data={lineSeries}
					width={props.width ?? 600}
					height={props.height ?? 300}
					{maxValue}
				/>
			{:else if props.type === 'pie' && (props.data?.length ?? 0) > 0}
				<PieChart data={pieChartPoints} />
			{/if}
		</div>

		{#if props.showLegend}
			<div class={state.legendContainerClasses}>
				{#each props.data ?? [] as item}
					<div class={state.legendItemClasses}>
						<div
							class={state.legendColorClasses}
							style={`background-color: ${ManagerAnalyticsChart.resolveLegendColor(item.color)};`}
						></div>
						<span class={state.legendLabelClasses}>{item.label}</span>
						<span class={state.legendValueClasses}>({item.value})</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.c-analytics-chart {
		overflow: hidden;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		box-shadow: var(--shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
	}

	.c-analytics-chart__header {
		padding: 1rem;
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-analytics-chart__title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.c-analytics-chart__title {
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.c-analytics-chart__subtitle {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.c-analytics-chart__trend {
		display: inline-flex;
		align-items: center;
	}

	.c-analytics-chart__trend--positive {
		color: var(--color-success-500);
	}

	.c-analytics-chart__trend--negative {
		color: var(--color-danger-500);
	}

	.c-analytics-chart__chart {
		padding: 1rem;
	}

	.c-analytics-chart__legend {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.5rem 1rem;
		margin-top: 1rem;
	}

	.c-analytics-chart__legend-item {
		display: flex;
		align-items: center;
	}

	.c-analytics-chart__legend-color {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 0.125rem;
		margin-right: 0.5rem;
	}

	.c-analytics-chart__legend-label {
		font-size: 0.875rem;
		color: var(--color-text-primary);
	}

	.c-analytics-chart__legend-value {
		margin-left: 0.25rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.ac-trend-row {
		display: flex;
		align-items: center;
	}
	.ac-trend-value {
		margin-left: 0.25rem;
	}
	.ac-chart-wrap {
		position: relative;
	}
</style>
