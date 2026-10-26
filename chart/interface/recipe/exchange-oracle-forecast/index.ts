import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';

export interface RecipeExchangeOracleForecast extends ComputeIntersectAll<
	[SlotText, SlotDimensionable]
> {
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
	/** Zone and legend texts over the catalog defaults. */
	labels?: {
		quoteZone?: string;
		oracleZone?: string;
		quote?: string;
		corridor?: string;
		core?: string;
		consensus?: string;
	};
	class?: string;
}
