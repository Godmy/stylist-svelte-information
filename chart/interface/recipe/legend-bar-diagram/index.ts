import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotDimensionable } from '$stylist/layout/interface/slot/dimensionable';

export interface RecipeLegendBarDiagram extends ComputeIntersectAll<[SlotText, SlotDimensionable]> {
	items: [NonNullable<SlotText['text']>, number][];
	plotHeight?: number;
	labelAreaHeight?: number;
	barWidth?: number;
	color?: string;
	class?: string;
}
