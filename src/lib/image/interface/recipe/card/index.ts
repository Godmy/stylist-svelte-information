import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotImage } from '$stylist/image/interface/slot/image';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorShapeable } from '$stylist/layout/interface/behavior/shapeable';
import type { BehaviorSpaced } from '$stylist/layout/interface/behavior/spaced';
import type { BehaviorSized } from '$stylist/layout/interface/behavior/sized';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { LayoutShape } from '$stylist/layout/type/alias/item-layout-shape';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { TokenOpacity } from '$stylist/theme/type/alias/opacity';
export interface RecipeCard
	extends ComputeIntersectAll<
		[
			SlotText,
			SlotImage,
			BehaviorClickable,
			BehaviorSized,
			BehaviorShapeable,
			BehaviorSpaced,
			SlotTheme,
			HTMLAttributes<HTMLDivElement>
		]
	> {
	/** Уровень поднятия над поверхностью (0–13) */
	layoutElevation?: number;
	/** Прозрачность по токену */
	opacity?: TokenOpacity;

	class?: string;
	children?: Snippet;
	media?: Snippet;
	header?: Snippet;
	footer?: Snippet;
	shape?: LayoutShape;
	size?: TokenSize;
	elevation?: number;
	clickable?: boolean;
	fullWidth?: boolean;
}
