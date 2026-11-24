import type { HTMLAttributes } from 'svelte/elements';
import type { SlotThemeBorder } from '$stylist/theme/interface/slot/theme-border';
import type { SlotTypography } from '$stylist/typography/interface/slot/typography';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeAudioPlayer extends ComputeIntersectAll<
	[
		Omit<HTMLAttributes<HTMLDivElement>, 'class'>,
		SlotThemeBorder,
		SlotTypography,
		{
			src?: string;
			showVolume?: boolean;
			showSpeed?: boolean;
			class?: string;
		},
		{
			title?: string;
			showControls?: boolean;
			autoPlay?: boolean;
			loop?: boolean;
			muted?: boolean;
			controlsClass?: string;
		}
	]
> {}
