import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotClass } from '$stylist/theme/interface/slot/class';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';

export interface RecipeErrorMessage
	extends ComputeIntersectAll<
		[
			{
				error: string | Error | null;
				onRetry?: () => void;
				showRetry?: boolean;
			},
			SlotText,
			SlotIcon,
			SlotClass
		]
	> {}
