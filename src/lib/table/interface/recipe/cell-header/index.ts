import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenSortDirection } from '$stylist/table/type/record/sort-direction';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */

export interface RecipeCellHeader
	extends ComputeIntersectAll<[BehaviorClickable, BehaviorFocusable]> {
	title: string;
	sortKey?: string;
	currentSortKey?: string;
	currentSortDirection?: TokenSortDirection;
	onValueInput?: (key: string) => void;
	onValueChange?: (key: string) => void;
}
