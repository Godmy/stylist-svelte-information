import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeExpertSpreadMatrix extends ComputeIntersectAll<[SlotText]> {
	experts: string[];
	periods: string[];
	values: {
		expert: string;
		period: string;
		value: number;
		outlier?: boolean;
	}[];
	width?: number;
	cellSize?: number;
	minValue?: number;
	maxValue?: number;
	class?: string;
}
