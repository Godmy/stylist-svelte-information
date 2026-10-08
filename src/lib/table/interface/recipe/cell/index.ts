import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { SlotContent } from '$stylist/theme/interface/slot/content';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */

export interface RecipeCell extends ComputeIntersectAll<[SlotTheme, SlotContent]> {
	variant?: 'data' | 'header';
	align?: 'left' | 'center' | 'right';
}
