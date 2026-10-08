import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeLineChart } from '$stylist/chart/interface/recipe/line-chart';
import { ManagerLineChart } from '$stylist/chart/class/manager/line-chart';

export function createLineChartState(getProps: () => RecipeLineChart) {
	const props = $derived(getProps());
	const hostClass = $derived(typeof props.class === 'string' ? props.class : undefined);
	const chartClass = $derived(typeof props.chartClass === 'string' ? props.chartClass : undefined);
	const resolvedColorScheme = $derived(
		(props.colorScheme ?? 'default') as 'default' | 'neutral' | 'warm' | 'cool'
	);
	let hoveredPoint = $state<{ seriesIndex: number; pointIndex: number } | null>(null);

	const baseClasses = $derived(ClassNamesManager.merge('c-line-chart', hostClass));
	const titleContainerClasses = $derived('c-line-chart__title-row');
	const titleClasses = $derived('c-line-chart__title');
	const chartContainerClasses = $derived(
		ClassNamesManager.merge('c-line-chart__chart-container', chartClass)
	);
	const infoIconClasses = $derived('c-line-chart__info-icon');
	const legendContainerClasses = $derived('c-line-chart__legend');
	const legendItemClasses = $derived('c-line-chart__legend-item');
	const legendLabelClasses = $derived('c-line-chart__legend-label');

	const calculatedMaxValue = $derived(
		ManagerLineChart.resolveMaxValue(props.data ?? [], props.maxValue)
	);
	const chartWidth = $derived(
		ManagerLineChart.resolveChartWidth(props.width ?? 600, props.showAxis ?? true)
	);
	const chartHeight = $derived(
		ManagerLineChart.resolveChartHeight(props.height ?? 400, props.showAxis ?? true)
	);
	const yAxisValues = $derived(ManagerLineChart.resolveYAxisValues(calculatedMaxValue));
	const linePaths = $derived(
		ManagerLineChart.resolveLinePaths({
			data: props.data ?? [],
			chartWidth,
			chartHeight,
			showAxis: props.showAxis ?? true,
			calculatedMaxValue,
			smooth: props.smooth ?? true
		})
	);

	function focusPoint(seriesIndex: number, pointIndex: number) {
		hoveredPoint = { seriesIndex, pointIndex };
	}

	function clearFocusedPoint() {
		hoveredPoint = null;
	}

	function isPointHovered(seriesIndex: number, pointIndex: number) {
		return hoveredPoint?.seriesIndex === seriesIndex && hoveredPoint?.pointIndex === pointIndex;
	}

	return {
		get hostClass() {
			return hostClass;
		},
		get chartClass() {
			return chartClass;
		},
		get resolvedColorScheme() {
			return resolvedColorScheme;
		},
		get baseClasses() {
			return baseClasses;
		},
		get titleContainerClasses() {
			return titleContainerClasses;
		},
		get titleClasses() {
			return titleClasses;
		},
		get chartContainerClasses() {
			return chartContainerClasses;
		},
		get infoIconClasses() {
			return infoIconClasses;
		},
		get legendContainerClasses() {
			return legendContainerClasses;
		},
		get legendItemClasses() {
			return legendItemClasses;
		},
		get legendLabelClasses() {
			return legendLabelClasses;
		},
		get calculatedMaxValue() {
			return calculatedMaxValue;
		},
		get chartWidth() {
			return chartWidth;
		},
		get chartHeight() {
			return chartHeight;
		},
		get yAxisValues() {
			return yAxisValues;
		},
		get linePaths() {
			return linePaths;
		},
		get hoveredPoint() {
			return hoveredPoint;
		},
		focusPoint,
		clearFocusedPoint,
		isPointHovered
	};
}

export default createLineChartState;
