export interface SlotTranscriptionResult {
	text: string;
	model: string;
	language?: string;
	durationMs: number;
	fileName: string;
	createdAt: Date;
}
