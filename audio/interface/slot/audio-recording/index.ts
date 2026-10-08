export interface SlotAudioRecording {
	blob: Blob;
	file: File;
	url: string;
	mimeType: string;
	durationMs: number;
	fileName: string;
	createdAt: Date;
}
