import type { Snippet } from 'svelte';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TOKEN_SIZE } from '$stylist/theme/const/array/size';
import type { SlotImage } from '$stylist/image/interface/slot/image';
export interface RecipeImage extends ComputeIntersectAll<[SlotImage]> {
	content?: Snippet;
	onLoad?: () => void;
	onError?: () => void;
	variant?: 'default';
	size?: (typeof TOKEN_SIZE)[number];
	class?: string;
}
