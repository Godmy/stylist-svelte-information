import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
/** AREA: STYLIST CODER MODEL -> AUTO-GENERATED */

export interface RecipeCellPill extends ComputeIntersectAll<[SlotTheme]> {
	value?: string | null;
	variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}
