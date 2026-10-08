import type { RecipeChartCanvas } from '$stylist/chart/interface/recipe/chart-canvas';
import type { ChartSeries } from '$stylist/chart/interface/slot/chart-series';

export class ManagerChartCanvas {
	static resolveSeries(series?: ChartSeries[]): ChartSeries[] {
		return series ?? [];
	}

	static resolveTickCount(value: number | undefined, minimum: number): number {
		return Math.max(minimum, value ?? minimum);
	}

	static resolveBounds(series: ChartSeries[]) {
		const points = series.flatMap((item) => item.points);
		if (points.length === 0) {
			return { minX: 0, maxX: 1, minY: 0, maxY: 1 };
		}

		const minX = Math.min(...points.map((point) => point.x));
		const maxX = Math.max(...points.map((point) => point.x));
		const minY = Math.min(...points.map((point) => point.y));
		const maxY = Math.max(...points.map((point) => point.y));

		return {
			minX,
			maxX: maxX === minX ? minX + 1 : maxX,
			minY,
			maxY: maxY === minY ? minY + 1 : maxY
		};
	}

	static resolveScale(
		providedScale: RecipeChartCanvas['xScale'] | RecipeChartCanvas['yScale'] | undefined,
		fallbackStart: number,
		fallbackEnd: number
	): [number, number] {
		return (providedScale ?? [fallbackStart, fallbackEnd]) as [number, number];
	}

	static resolveTickPositions(size: number, padding: number, tickCount: number): number[] {
		const values: number[] = [];
		for (let i = 0; i <= tickCount; i += 1) {
			values.push(padding + ((size - padding * 2) * i) / tickCount);
		}
		return values;
	}

	static resolveVerticalTickPositions(size: number, padding: number, tickCount: number): number[] {
		const values: number[] = [];
		for (let i = 0; i <= tickCount; i += 1) {
			values.push(size - padding - ((size - padding * 2) * i) / tickCount);
		}
		return values;
	}

	static resolveTickLabels(scale: [number, number], tickCount: number): Array<number | string> {
		return Array.from({ length: tickCount + 1 }, (_, i) => {
			const value = scale[0] + ((scale[1] - scale[0]) * i) / tickCount;
			return Number.isInteger(value) ? value : value.toFixed(2);
		});
	}

	static resolveVerticalTickLabels(
		scale: [number, number],
		tickCount: number
	): Array<number | string> {
		return Array.from({ length: tickCount + 1 }, (_, i) => {
			const value = scale[0] + ((scale[1] - scale[0]) * (tickCount - i)) / tickCount;
			return Number.isInteger(value) ? value : value.toFixed(2);
		});
	}
}
