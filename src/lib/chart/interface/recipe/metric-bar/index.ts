import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorMetricValue } from '$stylist/chart/interface/behavior/metric-value';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeMetricBar
	extends ComputeIntersectAll<
		[SlotTheme, SlotText, BehaviorMetricValue, HTMLAttributes<HTMLDivElement>]
	> {
	valueLabel?: string | number;
	color?: string;
	trackColor?: string;
}
