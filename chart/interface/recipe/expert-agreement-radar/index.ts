import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';

export interface RecipeExpertAgreementRadar
	extends ComputeIntersectAll<[SlotText, SlotDimensionable]> {
	axes: {
		text: string;
		value: number;
		target?: number;
	}[];
	maxValue?: number;
	class?: string;
}
