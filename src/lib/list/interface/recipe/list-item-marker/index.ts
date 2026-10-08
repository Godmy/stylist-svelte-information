import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { ListItemMarkerType } from '$stylist/list/type/alias/list-item-marker-type';
export interface RecipeListItemMarker
	extends ComputeIntersectAll<[SlotTheme, HTMLAttributes<HTMLSpanElement>]> {
	type?: ListItemMarkerType;
	value?: string | number;
	color?: TokenColorTone;
	size?: TokenSize;
}
