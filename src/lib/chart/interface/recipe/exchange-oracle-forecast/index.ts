import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';

export interface RecipeExchangeOracleForecast
	extends ComputeIntersectAll<[SlotText, SlotDimensionable]> {
	history: {
		time: string;
		value: number;
	}[];
	forecast: {
		time: string;
		min: number;
		low: number;
		consensus: number;
		high: number;
		max: number;
	}[];
	currency?: string;
	timeLabelStep?: number;
	class?: string;
}
