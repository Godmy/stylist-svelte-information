import type { HTMLAttributes } from 'svelte/elements';
import type { SlotClass } from '$stylist/theme/interface/slot/class';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { TokenAlignment } from '$stylist/layout/type/alias/alignment';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenMarker } from '$stylist/notification/type/alias/marker';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeNotificationBadge
	extends ComputeIntersectAll<
		[
			{
				count?: number;
				maxCount?: number;
				marker?: TokenMarker;
				appearance?: TokenColorTone;
				position?: TokenAlignment;
				showZero?: boolean;
				badgeClass?: string;
			},
			SlotClass,
			SlotChildren,
			Omit<HTMLAttributes<HTMLDivElement>, 'children'>
		]
	> {}
