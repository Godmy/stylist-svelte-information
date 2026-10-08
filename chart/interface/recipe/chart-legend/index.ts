import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { ChartLegendItem } from '$stylist/chart/interface/slot/chart-legend-item';
export interface RecipeChartLegend extends ComputeIntersectAll<[SlotTheme]> {
	items?: ChartLegendItem[];
}
