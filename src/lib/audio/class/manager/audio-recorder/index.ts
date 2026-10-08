import type { SlotAudioRecording } from '$stylist/audio/interface/slot/audio-recording';

export class AudioRecorderManager {
	private mediaRecorder: MediaRecorder | null = null;
	private stream: MediaStream | null = null;
	private chunks: BlobPart[] = [];
	private startedAt = 0;

	static isSupported(): boolean {
		return (
			typeof navigator !== 'undefined' &&
			Boolean(navigator.mediaDevices?.getUserMedia) &&
			typeof MediaRecorder !== 'undefined'
		);
	}

	get isRecording(): boolean {
		return this.mediaRecorder?.state === 'recording';
	}

	async start(options: {
		mimeType: string;
		fileName: string;
		audioConstraints?: MediaTrackConstraints | boolean;
		onStart?: () => void | Promise<void>;
		onRecorded?: (recording: SlotAudioRecording) => void | Promise<void>;
		onError?: (error: Error) => void;
	}): Promise<void> {
		if (this.isRecording) return;
		try {
			this.chunks = [];
			this.stream = await navigator.mediaDevices.getUserMedia({
				audio: options.audioConstraints ?? true
			});
			const mediaRecorderOptions =
				options.mimeType && MediaRecorder.isTypeSupported(options.mimeType)
					? { mimeType: options.mimeType }
					: undefined;
			this.mediaRecorder = new MediaRecorder(this.stream, mediaRecorderOptions);
			this.mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					this.chunks = [...this.chunks, event.data];
				}
			};
			this.mediaRecorder.onstop = () => {
				void this.finish(options).catch((error: unknown) => {
					options.onError?.(error instanceof Error ? error : new Error(String(error)));
				});
			};
			this.startedAt = Date.now();
			this.mediaRecorder.start();
			await options.onStart?.();
		} catch (error) {
			this.dispose();
			options.onError?.(error instanceof Error ? error : new Error(String(error)));
		}
	}

	stop(): void {
		if (!this.mediaRecorder || !this.isRecording) return;
		this.mediaRecorder.stop();
	}

	toggle(options: {
		mimeType: string;
		fileName: string;
		audioConstraints?: MediaTrackConstraints | boolean;
		onStart?: () => void | Promise<void>;
		onRecorded?: (recording: SlotAudioRecording) => void | Promise<void>;
		onError?: (error: Error) => void;
	}): void {
		if (this.isRecording) {
			this.stop();
			return;
		}
		void this.start(options);
	}

	dispose(): void {
		this.stream?.getTracks().forEach((track) => track.stop());
		this.stream = null;
		this.mediaRecorder = null;
		this.chunks = [];
	}

	private async finish(options: {
		mimeType: string;
		fileName: string;
		onRecorded?: (recording: SlotAudioRecording) => void | Promise<void>;
	}): Promise<void> {
		try {
			const blob = new Blob(this.chunks, {
				type: this.mediaRecorder?.mimeType || options.mimeType
			});
			const recording = {
				blob,
				file: new File([blob], options.fileName, { type: blob.type }),
				url: URL.createObjectURL(blob),
				mimeType: blob.type,
				durationMs: Date.now() - this.startedAt,
				fileName: options.fileName,
				createdAt: new Date()
			};
			await options.onRecorded?.(recording);
		} finally {
			this.dispose();
		}
	}
}
