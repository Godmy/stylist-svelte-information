import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { SlotClass } from '$stylist/theme/interface/slot/class';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { SlotContent } from '$stylist/theme/interface/slot/content';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { BehaviorMotionPreset } from '$stylist/animation/interface/behavior/motion-preset';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorShapeable } from '$stylist/layout/interface/behavior/shapeable';
import type { BehaviorSized } from '$stylist/layout/interface/behavior/sized';
import type { BehaviorSpaced } from '$stylist/layout/interface/behavior/spaced';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeAlert
	extends ComputeIntersectAll<
		[
			{
				variant?: TokenColorTone;
				size?: TokenSize;
				disabled?: boolean;
				showIcon?: boolean;
				closable?: boolean;
			},
			SlotText,
			SlotIcon,
			BehaviorClickable,
			BehaviorMotionPreset,
			BehaviorSized,
			BehaviorShapeable,
			BehaviorSpaced,
			SlotClass,
			SlotChildren,
			SlotContent,
			SlotTheme,
			HTMLAttributes<HTMLDivElement>
		]
	> {}
