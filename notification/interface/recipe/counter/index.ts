import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenSize } from '$stylist/design-token/type/alias/size';
import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';
export interface RecipeCounter extends ComputeIntersectAll<
	[SlotTheme, HTMLAttributes<HTMLSpanElement>]
> {
	count?: number;
	max?: number;
	variant?: TokenColorTone;
	size?: TokenSize;
}
