import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';
export interface RecipeChartBackground
	extends ComputeIntersectAll<[SlotTheme, HTMLAttributes<SVGRectElement>, SlotDimensionable]> {
	fill?: string;
	stroke?: string;
}
