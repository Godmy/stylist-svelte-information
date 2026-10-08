import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */

export interface RecipeCellText extends ComputeIntersectAll<[SlotTheme]> {
	value?: string | number | null;
	truncate?: boolean;
	align?: 'left' | 'center' | 'right';
}
