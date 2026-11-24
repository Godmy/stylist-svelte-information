import type { HTMLAttributes } from 'svelte/elements';
import type { SlotThemeBorder } from '$stylist/theme/interface/slot/theme-border';
import type { SlotTypography } from '$stylist/typography/interface/slot/typography';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeAudioSlider extends ComputeIntersectAll<
	[
		Omit<HTMLAttributes<HTMLDivElement>, 'class'>,
		SlotThemeBorder,
		SlotTypography,
		{
			value?: number;
			min?: number;
			max?: number;
			step?: number;
			label?: string;
			showValue?: boolean;
			class?: string;
		},
		{
			volume?: number;
			muted?: boolean;
			onVolumeChange?: (volume: number) => void;
		}
	]
> {}
