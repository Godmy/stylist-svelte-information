import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotImage } from '$stylist/image/interface/slot/image';
export interface RecipeImageGallery
	extends ComputeIntersectAll<[Omit<HTMLAttributes<HTMLDivElement>, 'class'>]> {
	images: ComputeIntersectAll<[SlotImage, { id: string; caption?: string }]>[];
	showThumbnails?: boolean;
	autoPlay?: boolean;
	autoPlayInterval?: number;
	showCaptions?: boolean;
	class?: string;
	thumbnailClass?: string;
	navigationClass?: string;
	captionClass?: string;
}
