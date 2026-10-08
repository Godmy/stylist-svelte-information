import type { SlotAudioPlayer } from '$stylist/audio/interface/slot/audio-player';

export interface RecipeAudioPlayer extends SlotAudioPlayer {
	title?: string;
	showControls?: boolean;
	autoPlay?: boolean;
	loop?: boolean;
	muted?: boolean;
	controlsClass?: string;
}
