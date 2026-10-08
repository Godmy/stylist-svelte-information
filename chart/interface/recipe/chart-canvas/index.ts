import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { ChartSeries } from '$stylist/chart/interface/slot/chart-series';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';
export interface RecipeChartCanvas extends ComputeIntersectAll<[SlotTheme, SlotDimensionable]> {
	padding?: number;
	series?: ChartSeries[];
	xScale?: [number, number];
	yScale?: [number, number];
	xTickCount?: number;
	yTickCount?: number;
	zTickCount?: number;
	showAxisArrows?: boolean;
	showGrid?: boolean;
	showZAxis?: boolean;
	xAxisLabel?: string;
	yAxisLabel?: string;
	zAxisLabel?: string;
	title?: string;
}
