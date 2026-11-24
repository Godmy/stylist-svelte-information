import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotImage } from '$stylist/image/interface/slot/image';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { TokenOrientation } from '$stylist/layout/type/alias/orientation';

export interface RecipeDividerHeadingImageText extends ComputeIntersectAll<
	[
		SlotImage,
		{
			dividerClass?: string;
			dividerOrientation?: TokenOrientation;
			dividerAlign?: string;
			dividerDashed?: boolean;
			dividerLabel?: string;
		},
		SlotText
	]
> {
	id?: string;
	level?: 2 | 3;
	body: string;
	paragraphs?: string[];
	class?: string;
}
