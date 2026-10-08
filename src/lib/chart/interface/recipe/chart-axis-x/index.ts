import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotChartAxis } from '$stylist/chart/interface/slot/chart-axis';
export interface RecipeChartAxisX
	extends ComputeIntersectAll<[SlotTheme, SlotChartAxis, HTMLAttributes<SVGGElement>]> {
	y?: number;
	ticks?: number[];
	showGrid?: boolean;
	tickLabels?: Array<string | number>;
}
