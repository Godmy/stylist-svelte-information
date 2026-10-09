import type { HTMLAttributes } from 'svelte/elements';
import type { SlotAudioRecording } from '$stylist/audio/interface/slot/audio-recording';
import type { SlotTranscriptionResult } from '$stylist/audio/interface/slot/transcription-result';

export interface RecipeTranscriber extends Omit<HTMLAttributes<HTMLElement>, 'class'> {
	class?: string;
	endpoint?: string;
	model?: string;
	language?: string;
	prompt?: string;
	mimeType?: string;
	fileName?: string;
	audioConstraints?: MediaTrackConstraints | boolean;
	disabled?: boolean;
	autoTranscribe?: boolean;
	recordLabel?: string;
	stopLabel?: string;
	copyLabel?: string;
	copiedLabel?: string;
	onRecordingReady?: (recording: SlotAudioRecording) => void | Promise<void>;
	onTranscribed?: (result: SlotTranscriptionResult) => void | Promise<void>;
	onError?: (error: Error) => void;
}
