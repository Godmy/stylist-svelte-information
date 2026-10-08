import type { HTMLButtonAttributes } from 'svelte/elements';
import type { SlotAudioRecording } from '$stylist/audio/interface/slot/audio-recording';

export interface RecipeAudioRecordButton extends Omit<HTMLButtonAttributes, 'class'> {
	class?: string;
	mimeType?: string;
	fileName?: string;
	audioConstraints?: MediaTrackConstraints | boolean;
	disabled?: boolean;
	startLabel?: string;
	stopLabel?: string;
	saveLabel?: string;
	onRecordingStart?: () => void;
	onRecorded?: (recording: SlotAudioRecording) => void | Promise<void>;
	onError?: (error: Error) => void;
}
