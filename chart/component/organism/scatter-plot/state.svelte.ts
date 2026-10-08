import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeScatterPlot } from '$stylist/chart/interface/recipe/scatter-plot';
import type { ScatterPlotDataPoint } from '$stylist/chart/interface/slot/scatter-plot-point';

export function createScatterPlotState(props: RecipeScatterPlot) {
	const maxX = $derived(Math.max(...props.data.map((point: ScatterPlotDataPoint) => point.x), 100));
	const maxY = $derived(Math.max(...props.data.map((point: ScatterPlotDataPoint) => point.y), 100));
	const chartWidth = $derived((props.width ?? 700) - 70);
	const chartHeight = $derived((props.height ?? 420) - 40);
	const rootClass = $derived(ClassNamesManager.merge('c-scatter-plot', String(props.class ?? '')));

	return {
		get maxX() {
			return maxX;
		},
		get maxY() {
			return maxY;
		},
		get chartWidth() {
			return chartWidth;
		},
		get chartHeight() {
			return chartHeight;
		},
		get rootClass() {
			return rootClass;
		},
		getPointX(x: number): number {
			return 50 + (x / (maxX || 1)) * chartWidth;
		},
		getPointY(y: number): number {
			return 10 + chartHeight - (y / (maxY || 1)) * chartHeight;
		}
	};
}

export default createScatterPlotState;
