import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';

export interface RecipeRiskImpactMap extends ComputeIntersectAll<[SlotText, SlotDimensionable]> {
	risks: {
		id: string;
		text: string;
		probability: number;
		impact: number;
		exposure: number;
		critical?: boolean;
	}[];
	class?: string;
}
