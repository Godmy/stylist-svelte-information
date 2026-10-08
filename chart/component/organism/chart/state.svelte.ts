import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { ChartSeries } from '$stylist/chart/interface/slot/chart-series';
import type { RecipeChart } from '$stylist/chart/interface/recipe/chart';
import { ManagerChart } from '$stylist/chart/class/manager/chart';

function resolveClassName(className: unknown): string | undefined {
	return typeof className === 'string' ? className : undefined;
}

function getChartBounds(series: ChartSeries[]): {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
} {
	const points = series.flatMap((item) => item.points);
	const minX = points.length > 0 ? Math.min(...points.map((point) => point.x)) : 0;
	const maxX = points.length > 0 ? Math.max(...points.map((point) => point.x)) : 1;
	const minY = points.length > 0 ? Math.min(...points.map((point) => point.y)) : 0;
	const maxY = points.length > 0 ? Math.max(...points.map((point) => point.y)) : 1;

	return {
		minX,
		maxX: maxX === minX ? minX + 1 : maxX,
		minY,
		maxY: maxY === minY ? minY + 1 : maxY
	};
}

export function createChartState(getProps: () => RecipeChart) {
	const props = $derived(getProps());
	const width = $derived(props.width ?? 640);
	const height = $derived(props.height ?? 380);
	const showLegend = $derived(props.showLegend ?? true);
	const showGrid = $derived(props.showGrid ?? true);
	const showZAxis = $derived(props.showZAxis ?? false);
	const containerClasses = $derived(
		ClassNamesManager.merge('c-chart', resolveClassName(props.class))
	);
	const series = $derived(ManagerChart.resolveSeries(props.series));
	const legendItems = $derived(ManagerChart.resolveLegendItems(series));
	const bounds = $derived(getChartBounds(series));

	return {
		get width() {
			return width;
		},
		get height() {
			return height;
		},
		get showLegend() {
			return showLegend;
		},
		get showGrid() {
			return showGrid;
		},
		get showZAxis() {
			return showZAxis;
		},
		get series() {
			return series;
		},
		get legendItems() {
			return legendItems;
		},
		get containerClasses() {
			return containerClasses;
		},
		get bounds() {
			return bounds;
		}
	};
}

export default createChartState;
