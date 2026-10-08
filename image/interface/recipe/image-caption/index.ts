import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotImage } from '$stylist/image/interface/slot/image';
export interface RecipeImageCaption
	extends ComputeIntersectAll<[SlotImage, Omit<HTMLAttributes<HTMLDivElement>, 'class'>]> {
	caption?: string;
	captionClass?: string;
	rounded?: boolean;
	bordered?: boolean;
	shadow?: boolean;
	class?: string;
}
