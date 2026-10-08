import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { ChartSeries } from '$stylist/chart/interface/slot/chart-series';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';
export interface RecipeChart
	extends ComputeIntersectAll<[SlotTheme, HTMLAttributes<SVGSVGElement>, SlotDimensionable]> {
	label?: string;
	caption?: string;
	badge?: string | number;
	series?: ChartSeries[];
	showLegend?: boolean;
	showGrid?: boolean;
	showZAxis?: boolean;
	xScale?: [number, number];
	yScale?: [number, number];
	xTickCount?: number;
	yTickCount?: number;
	zTickCount?: number;
	showAxisArrows?: boolean;
	xAxisLabel?: string;
	yAxisLabel?: string;
	zAxisLabel?: string;
	title?: string;
}
