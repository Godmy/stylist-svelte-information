import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeAnalyticsChart } from '$stylist/chart/interface/recipe/analytics-chart';

export function createAnalyticsChartState(getProps: () => RecipeAnalyticsChart) {
	const props = $derived(getProps());
	const classNameStr = $derived(typeof props.class === 'string' ? props.class : undefined);
	const chartClassStr = $derived(
		typeof props.chartClass === 'string' ? props.chartClass : undefined
	);
	const legendClassStr = $derived(
		typeof props.legendClass === 'string' ? props.legendClass : undefined
	);

	const containerClasses = $derived(ClassNamesManager.merge('c-analytics-chart', classNameStr));
	const headerClasses = $derived('c-analytics-chart__header');
	const titleContainerClasses = $derived('c-analytics-chart__title-row');
	const titleClasses = $derived('c-analytics-chart__title');
	const subtitleClasses = $derived('c-analytics-chart__subtitle');
	const trendContainerClasses = $derived(
		ClassNamesManager.merge(
			'c-analytics-chart__trend',
			(props.trendValue ?? 0) >= 0
				? 'c-analytics-chart__trend--positive'
				: 'c-analytics-chart__trend--negative'
		)
	);
	const chartContainerClasses = $derived(
		ClassNamesManager.merge('c-analytics-chart__chart', chartClassStr)
	);
	const legendContainerClasses = $derived(
		ClassNamesManager.merge('c-analytics-chart__legend', legendClassStr)
	);
	const legendItemClasses = $derived('c-analytics-chart__legend-item');
	const legendColorClasses = $derived('c-analytics-chart__legend-color');
	const legendLabelClasses = $derived('c-analytics-chart__legend-label');
	const legendValueClasses = $derived('c-analytics-chart__legend-value');

	return {
		get classNameStr() {
			return classNameStr;
		},
		get chartClassStr() {
			return chartClassStr;
		},
		get legendClassStr() {
			return legendClassStr;
		},
		get containerClasses() {
			return containerClasses;
		},
		get headerClasses() {
			return headerClasses;
		},
		get titleContainerClasses() {
			return titleContainerClasses;
		},
		get titleClasses() {
			return titleClasses;
		},
		get subtitleClasses() {
			return subtitleClasses;
		},
		get trendContainerClasses() {
			return trendContainerClasses;
		},
		get chartContainerClasses() {
			return chartContainerClasses;
		},
		get legendContainerClasses() {
			return legendContainerClasses;
		},
		get legendItemClasses() {
			return legendItemClasses;
		},
		get legendColorClasses() {
			return legendColorClasses;
		},
		get legendLabelClasses() {
			return legendLabelClasses;
		},
		get legendValueClasses() {
			return legendValueClasses;
		}
	};
}

export default createAnalyticsChartState;
