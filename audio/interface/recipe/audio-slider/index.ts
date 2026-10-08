import type { HTMLAttributes } from 'svelte/elements';
import type { SlotThemeBorder } from '$stylist/theme/interface/slot/theme-border';
import type { SlotTypography } from '$stylist/theme/interface/slot/typography';
import type { SlotAudioSlider } from '$stylist/audio/interface/slot/audio-slider';

export interface RecipeAudioSlider
	extends Omit<HTMLAttributes<HTMLDivElement>, 'class'>,
		SlotThemeBorder,
		SlotTypography,
		SlotAudioSlider {
	volume?: number;
	muted?: boolean;
	onVolumeChange?: (volume: number) => void;
}
