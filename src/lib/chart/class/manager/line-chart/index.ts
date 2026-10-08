import type { LineChartData } from '$stylist/chart/interface/slot/line-chart-data';
import type { LineChartPoint } from '$stylist/chart/interface/slot/line-chart';
import { LINE_CHART_COLOR_SCHEME } from '$stylist/chart/const/preset/line-chart-color-scheme';

export class ManagerLineChart {
	static resolveMaxValue(data: LineChartData[], maxValue?: number): number {
		if (typeof maxValue === 'number') {
			return maxValue;
		}

		const allValues = data.flatMap((series) => series.data.map((point) => point.value));
		return allValues.length > 0 ? Math.max(...allValues) : 100;
	}

	static resolveChartWidth(width: number, showAxis: boolean): number {
		return width - (showAxis ? 60 : 10);
	}

	static resolveChartHeight(height: number, showAxis: boolean): number {
		return height - (showAxis ? 40 : 10);
	}

	static resolveYAxisValues(maxValue: number): number[] {
		return [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue];
	}

	static resolveDefaultColor(
		index: number,
		scheme: 'default' | 'warm' | 'cool' | 'neutral' = 'default'
	): string {
		const colorList = LINE_CHART_COLOR_SCHEME[scheme] ?? LINE_CHART_COLOR_SCHEME.default;
		return colorList[index % colorList.length];
	}

	static resolvePointPosition(params: {
		pointIndex: number;
		seriesLength: number;
		chartWidth: number;
		chartHeight: number;
		showAxis: boolean;
		calculatedMaxValue: number;
		pointValue: number;
	}) {
		const {
			pointIndex,
			seriesLength,
			chartWidth,
			chartHeight,
			showAxis,
			calculatedMaxValue,
			pointValue
		} = params;
		const segmentWidth = chartWidth / (seriesLength - 1 || 1);
		const x = (showAxis ? 50 : 5) + pointIndex * segmentWidth;
		const y =
			chartHeight + (showAxis ? 10 : 5) - (pointValue / (calculatedMaxValue || 1)) * chartHeight;

		return { x, y };
	}

	static resolveLinePaths(params: {
		data: LineChartData[];
		chartWidth: number;
		chartHeight: number;
		showAxis: boolean;
		calculatedMaxValue: number;
		smooth: boolean;
	}): string[] {
		const { data, chartWidth, chartHeight, showAxis, calculatedMaxValue, smooth } = params;

		return data.map((series) => {
			const points = series.data.map((point, index) =>
				this.resolvePointPosition({
					pointIndex: index,
					seriesLength: series.data.length,
					chartWidth,
					chartHeight,
					showAxis,
					calculatedMaxValue,
					pointValue: point.value
				})
			);

			return points.reduce((path, point, index) => {
				if (index === 0) {
					return `M ${point.x} ${point.y} `;
				}

				if (!smooth) {
					return `${path}L ${point.x} ${point.y} `;
				}

				const previousPoint = points[index - 1];
				const controlPointX = previousPoint.x + (point.x - previousPoint.x) / 2;
				return `${path}C ${controlPointX} ${previousPoint.y}, ${controlPointX} ${point.y}, ${point.x} ${point.y} `;
			}, '');
		});
	}

	static resolveAriaLabel(point: LineChartPoint): string {
		return `Data point: ${point.name}, Value: ${point.value}`;
	}
}
