import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeChartName extends ComputeIntersectAll<[SlotTheme]> {
	label?: string;
	text?: string;
	x?: number;
	y?: number;
	color?: string;
	fill?: string;
	stroke?: string;
	strokeWidth?: number;
}
