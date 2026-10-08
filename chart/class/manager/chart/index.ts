import type { ChartFunctionPoint } from '$stylist/chart/interface/slot/chart-point';
import type { ChartSeries } from '$stylist/chart/interface/slot/chart-series';
import type { RecipeChartAxisY } from '$stylist/chart/interface/recipe/chart-axis-y';
import type { RecipeChartPolyline as ChartPolylineProps } from '$stylist/chart/interface/recipe/chart-polyline';
import type { ChartLegendItem } from '$stylist/chart/interface/slot/chart-legend-item';
export class ManagerChart {
	static resolveSeries(series?: ChartSeries[]): ChartSeries[] {
		return series ?? [];
	}

	static resolveLegendItems(series: ChartSeries[]): ChartLegendItem[] {
		return series.map((s, index) => ({
			id: s.id ?? `series-${index}`,
			name: s.name ?? `Series ${index + 1}`,
			color: s.color
		}));
	}

	static getAxisYMetrics(props: RecipeChartAxisY): {
		x: number;
		startY: number;
		endY: number;
		tickCount: number;
		tickSize: number;
		showArrow: boolean;
		ticks: number[];
	} {
		const x = props.x ?? 0;
		const startY = props.startY ?? 0;
		const endY = props.endY ?? 100;
		const tickCount = Math.max(0, props.tickCount ?? 5);

		if (props.ticks && props.ticks.length > 0) {
			return {
				x,
				startY,
				endY,
				tickCount,
				tickSize: 6,
				showArrow: props.showArrow ?? true,
				ticks: props.ticks
			};
		}

		const ticks =
			tickCount === 0
				? []
				: Array.from(
						{ length: tickCount + 1 },
						(_, index) => endY - ((endY - startY) * index) / tickCount
					);

		return {
			x,
			startY,
			endY,
			tickCount,
			tickSize: 6,
			showArrow: props.showArrow ?? true,
			ticks
		};
	}

	static getBounds(props: ChartPolylineProps): {
		minX: number;
		maxX: number;
		minY: number;
		maxY: number;
	} {
		if (props.xDomain && props.yDomain) {
			return {
				minX: props.xDomain[0],
				maxX: props.xDomain[1],
				minY: props.yDomain[0],
				maxY: props.yDomain[1]
			};
		}

		const points = props.points ?? [];
		if (points.length === 0) {
			return { minX: 0, maxX: 1, minY: 0, maxY: 1 };
		}

		const minX = Math.min(...points.map((point: ChartFunctionPoint) => point.x));
		const maxX = Math.max(...points.map((point: ChartFunctionPoint) => point.x));
		const minY = Math.min(...points.map((point: ChartFunctionPoint) => point.y));
		const maxY = Math.max(...points.map((point: ChartFunctionPoint) => point.y));

		return {
			minX,
			maxX: maxX === minX ? minX + 1 : maxX,
			minY,
			maxY: maxY === minY ? minY + 1 : maxY
		};
	}
}
