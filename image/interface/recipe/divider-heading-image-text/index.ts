import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotImage } from '$stylist/image/interface/slot/image';
import type { SlotDivider } from '$stylist/layout/interface/slot/divider';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeDividerHeadingImageText
	extends ComputeIntersectAll<[SlotImage, SlotDivider, SlotText]> {
	id?: string;
	level?: 2 | 3;
	body: string;
	paragraphs?: string[];
	class?: string;
}
