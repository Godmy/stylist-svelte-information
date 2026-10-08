import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { SlotContent } from '$stylist/theme/interface/slot/content';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */

export interface RecipeTable
	extends ComputeIntersectAll<[SlotTheme, HTMLAttributes<HTMLTableElement>, SlotContent]> {
	caption?: string;
	striped?: boolean;
	hoverable?: boolean;
	bordered?: boolean;
	stickyHeader?: boolean;
}
