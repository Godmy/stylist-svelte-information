import type { SlotThemeBorder } from '$stylist/theme/interface/slot/theme-border';
import type { SlotTypography } from '$stylist/theme/interface/slot/typography';

export interface RecipeAudioVisualizer extends SlotThemeBorder, SlotTypography {
	src?: string;
	alt?: string;
	title?: string;
	author?: string;
	type?: 'bars' | 'wave' | 'circular';
	duration?: number | string;
	isPlaying?: boolean;
	onPlayToggle?: (isPlaying: boolean) => void;
	class?: string;
}
