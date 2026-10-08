import type { Snippet } from 'svelte';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { SlotBadge } from '$stylist/layout/interface/slot/badge';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotImage } from '$stylist/image/interface/slot/image';
export interface RecipeBaseCard
	extends ComputeIntersectAll<
		[
			SlotTheme,
			ComputeIntersectAll<
				[SlotText, SlotText, SlotImage, SlotBadge, HTMLAttributes<HTMLDivElement>]
			>,
			SlotChildren
		]
	> {
	title?: string;
	description?: string;
	variant?: string;
	size?: TokenSize;
	disabled?: boolean;
	footer?: Snippet;
	headerClass?: string;
	bodyClass?: string;
	footerClass?: string;
}
