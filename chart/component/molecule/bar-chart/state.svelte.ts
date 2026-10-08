import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeBarChart } from '$stylist/chart/interface/recipe/bar-chart';
import { ManagerBarChart } from '$stylist/chart/class/manager/bar-chart';

export function createBarChartState(getProps: () => RecipeBarChart) {
	const props = $derived(getProps());
	let hoveredBar = $state<number | null>(null);
	const containerHostClass = $derived(typeof props.class === 'string' ? props.class : undefined);
	const resolvedColorScheme = $derived(
		(props.colorScheme ?? 'minimal') as 'minimal' | 'ocean' | 'forest' | 'sunset'
	);
	const calculatedMaxValue = $derived(
		ManagerBarChart.resolveMaxValue(props.data ?? [], props.maxValue)
	);
	const chartWidth = $derived(
		ManagerBarChart.resolveChartWidth(props.width ?? 600, props.showAxis ?? true)
	);
	const chartHeight = $derived(
		ManagerBarChart.resolveChartHeight(props.height ?? 400, props.showAxis ?? true)
	);
	const barPositions = $derived(
		ManagerBarChart.resolveBarPositions({
			data: props.data ?? [],
			barWidth: props.barWidth ?? 30,
			barGap: props.barGap ?? 10,
			chartHeight,
			showAxis: props.showAxis ?? true,
			calculatedMaxValue,
			colorScheme: resolvedColorScheme
		})
	);
	const yAxisValues = $derived(ManagerBarChart.resolveYAxisValues(calculatedMaxValue));

	const containerClasses = $derived(ClassNamesManager.merge('bar-chart', containerHostClass));
	const titleContainerClasses = $derived('bar-chart__title-row');
	const titleClasses = $derived('bar-chart__title');
	const infoIconClasses = $derived('bar-chart__info-icon');
	const chartContainerClasses = $derived(
		ClassNamesManager.merge('bar-chart__chart-container', props.chartClass)
	);
	const svgClasses = $derived('bar-chart__svg');
	const barClasses = $derived((isHovered: boolean) =>
		ClassNamesManager.merge(
			'bar-chart__bar',
			isHovered ? 'bar-chart__bar--hovered' : 'bar-chart__bar--idle'
		)
	);
	const legendClasses = $derived('bar-chart__legend');
	const legendItemClasses = $derived('bar-chart__legend-item');
	const legendTextClasses = $derived('bar-chart__legend-text');
	const legendValueClasses = $derived('bar-chart__legend-value');

	function handleBarFocus(index: number) {
		hoveredBar = index;
	}

	function handleBarBlur() {
		hoveredBar = null;
	}

	return {
		get hoveredBar() {
			return hoveredBar;
		},
		get containerHostClass() {
			return containerHostClass;
		},
		get resolvedColorScheme() {
			return resolvedColorScheme;
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
		get barPositions() {
			return barPositions;
		},
		get yAxisValues() {
			return yAxisValues;
		},
		get containerClasses() {
			return containerClasses;
		},
		get titleContainerClasses() {
			return titleContainerClasses;
		},
		get titleClasses() {
			return titleClasses;
		},
		get infoIconClasses() {
			return infoIconClasses;
		},
		get chartContainerClasses() {
			return chartContainerClasses;
		},
		get svgClasses() {
			return svgClasses;
		},
		get barClasses() {
			return barClasses;
		},
		get legendClasses() {
			return legendClasses;
		},
		get legendItemClasses() {
			return legendItemClasses;
		},
		get legendTextClasses() {
			return legendTextClasses;
		},
		get legendValueClasses() {
			return legendValueClasses;
		},
		handleBarFocus,
		handleBarBlur
	};
}

export default createBarChartState;
