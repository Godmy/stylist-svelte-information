import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';

export interface RecipeOutlierConstellation
	extends ComputeIntersectAll<[SlotText, SlotDimensionable]> {
	points: {
		id: string;
		text: string;
		x: number;
		y: number;
		confidence: number;
		outlier?: boolean;
	}[];
	class?: string;
}
