import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeVerticalBarsChart extends ComputeIntersectAll<[SlotText]> {
	items: {
		id: string;
		label: string;
		valueLabel?: string | number;
		heightPercent: number;
		color?: string;
		minHeightPercent?: number;
		ariaLabel?: string;
	}[];
	height?: number;
	barWidth?: string;
	gap?: string;
	color?: string;
	class?: string;
}
