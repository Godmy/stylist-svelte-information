import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';

export interface RecipeLegendBandDiagram
	extends ComputeIntersectAll<[SlotText, SlotDimensionable]> {
	items: {
		text: NonNullable<SlotText['text']>;
		value?: number;
		atom?: number;
		molecule?: number;
		organism?: number;
		template?: number;
		page?: number;
		atoms?: number;
		molecules?: number;
		organisms?: number;
		templates?: number;
		pages?: number;
		color?: string;
	}[];
	plotHeight?: number;
	labelAreaHeight?: number;
	bandWidth?: number;
	minValue?: number;
	maxValue?: number;
	tickCount?: number;
	color?: string;
	class?: string;
}
