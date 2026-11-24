import type { LayoutHTMLAttributes } from '$stylist/layout/interface/behavior/layout-html-attributes';
import type { SlotRowExpandable } from '$stylist/table/interface/slot/row-expandable';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeRowExpandable extends ComputeIntersectAll<
	[Omit<LayoutHTMLAttributes<HTMLTableRowElement>, 'class'>, SlotRowExpandable]
> {}
