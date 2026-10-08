import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeMetricBarsCard
	extends ComputeIntersectAll<[SlotTheme, SlotText, HTMLAttributes<HTMLElement>]> {
	bars: Array<{
		label: string;
		value: number;
		valueLabel?: string | number;
		percentage?: number;
		color?: string;
	}>;
	total?: string | number;
	color?: string;
	trackColor?: string;
}
