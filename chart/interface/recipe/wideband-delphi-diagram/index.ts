import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';

export interface RecipeWidebandDelphiDiagram
	extends ComputeIntersectAll<[SlotText, SlotDimensionable]> {
	points: {
		time: string;
		min: number;
		low: number;
		consensus: number;
		high: number;
		max: number;
		market?: number;
		procurement?: number;
	}[];
	minValue?: number;
	maxValue?: number;
	timeLabelStep?: number;
	currency?: string;
	class?: string;
}
