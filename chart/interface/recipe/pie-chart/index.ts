import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { PieChartDataPoint } from '$stylist/chart/interface/slot/pie-chart';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';
export interface RecipePieChart
	extends ComputeIntersectAll<[SlotTheme, HTMLAttributes<SVGSVGElement>, SlotDimensionable]> {
	label?: string;
	badge?: string | number;
	data?: readonly PieChartDataPoint[];
	colors?: readonly string[];
}
