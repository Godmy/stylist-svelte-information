import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotImage } from '$stylist/image/interface/slot/image';
export interface RecipeCanvasImageEditor
	extends ComputeIntersectAll<
		[SlotImage, Omit<HTMLAttributes<HTMLCanvasElement>, 'class' | 'width' | 'height'>]
	> {
	cropEnabled?: boolean;
	filter?:
		| 'none'
		| 'grayscale'
		| 'sepia'
		| 'invert'
		| 'blur'
		| 'brightness'
		| 'contrast'
		| 'saturate'
		| 'hue-rotate';
	brightness?: number;
	contrast?: number;
	saturation?: number;
	hue?: number;
	class?: string;
}
