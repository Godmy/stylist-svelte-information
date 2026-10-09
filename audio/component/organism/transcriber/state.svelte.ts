import type { RecipeTranscriber } from '$stylist/audio/interface/recipe/transcriber';
import type { SlotAudioRecording } from '$stylist/audio/interface/slot/audio-recording';
import type { TypeTranscriberStatus } from '$stylist/audio/type/alias/transcriber-status';
import type { SlotTranscriptionResult } from '$stylist/audio/interface/slot/transcription-result';
import { AudioRecorderManager } from '$stylist/audio/class/manager/audio-recorder';

export function createTranscriberState(props: RecipeTranscriber) {
	const recorder = new AudioRecorderManager();
	let recording = $state<SlotAudioRecording | null>(null);
	let transcription = $state<SlotTranscriptionResult | null>(null);
	let status = $state<TypeTranscriberStatus>('idle');
	let progress = $state(0);
	let errorMessage = $state('');
	let copied = $state(false);
	let startedAt = $state(0);

	const isSupported = $derived(AudioRecorderManager.isSupported());
	const endpoint = $derived(props.endpoint ?? '/api/transcription');
	const model = $derived(props.model ?? 'faster-whisper-base');
	const mimeType = $derived(props.mimeType ?? 'audio/webm');
	const fileName = $derived(props.fileName ?? `transcriber-${Date.now()}.webm`);
	const isRecording = $derived(status === 'recording');
	const isBusy = $derived(
		status === 'processing' || status === 'uploading' || status === 'transcribing'
	);
	const canRecord = $derived(Boolean(isSupported && !props.disabled && !isBusy));
	const canCopy = $derived(Boolean(transcription?.text && status === 'done'));
	const className = $derived(props.class ?? '');
	const actionLabel = $derived(
		isRecording ? (props.stopLabel ?? 'Stop') : (props.recordLabel ?? 'Record')
	);
	const copyLabel = $derived(
		copied ? (props.copiedLabel ?? 'Copied') : (props.copyLabel ?? 'Copy')
	);
	const statusLabel = $derived.by(() => {
		if (!isSupported) return 'Recording is not supported in this browser';
		if (status === 'recording') return 'Recording audio';
		if (status === 'processing') return 'Preparing audio';
		if (status === 'uploading') return 'Uploading audio';
		if (status === 'transcribing') return 'Transcribing audio';
		if (status === 'done') return 'Transcription ready';
		if (status === 'error') return 'Transcription failed';
		return 'Ready';
	});

	const restProps = $derived.by(() => {
		const {
			class: _class,
			endpoint: _endpoint,
			model: _model,
			language: _language,
			prompt: _prompt,
			mimeType: _mimeType,
			fileName: _fileName,
			audioConstraints: _audioConstraints,
			disabled: _disabled,
			autoTranscribe: _autoTranscribe,
			recordLabel: _recordLabel,
			stopLabel: _stopLabel,
			copyLabel: _copyLabel,
			copiedLabel: _copiedLabel,
			onRecordingReady: _onRecordingReady,
			onTranscribed: _onTranscribed,
			onError: _onError,
			...rest
		} = props;
		return rest;
	});

	function reportError(error: unknown) {
		const nextError = error instanceof Error ? error : new Error(String(error));
		status = 'error';
		progress = 0;
		errorMessage = nextError.message;
		props.onError?.(nextError);
	}

	async function handleRecordingReady(nextRecording: SlotAudioRecording) {
		status = 'processing';
		progress = 25;
		recording = nextRecording;
		await props.onRecordingReady?.(nextRecording);
		if (props.autoTranscribe ?? true) {
			await transcribeRecording(nextRecording);
		} else {
			status = 'done';
			progress = 100;
		}
	}

	async function transcribeRecording(nextRecording: SlotAudioRecording) {
		status = 'uploading';
		progress = 45;
		const body = new FormData();
		body.set('file', nextRecording.file);
		body.set('model', model);
		if (props.language) body.set('language', props.language);
		if (props.prompt) body.set('prompt', props.prompt);

		const response = await fetch(endpoint, {
			method: 'POST',
			body
		});
		progress = 75;
		status = 'transcribing';
		const payload = await response.json();
		if (!response.ok) {
			throw new Error(payload.error ?? 'Transcription failed');
		}

		const result = {
			text: String(payload.text ?? ''),
			model: String(payload.model ?? model),
			language: typeof payload.language === 'string' ? payload.language : props.language,
			durationMs: Date.now() - startedAt,
			fileName: nextRecording.fileName,
			createdAt: new Date()
		};
		transcription = result;
		status = 'done';
		progress = 100;
		await props.onTranscribed?.(result);
	}

	async function startRecording() {
		if (!canRecord || isRecording) return;
		errorMessage = '';
		copied = false;
		recording = null;
		transcription = null;
		await recorder.start({
			mimeType,
			fileName,
			audioConstraints: props.audioConstraints,
			onStart: () => {
				status = 'recording';
				progress = 10;
				startedAt = Date.now();
			},
			onRecorded: handleRecordingReady,
			onError: reportError
		});
	}

	function stopRecording() {
		if (!isRecording) return;
		recorder.stop();
	}

	function toggleRecording() {
		if (isRecording) {
			stopRecording();
		} else {
			void startRecording();
		}
	}

	async function copyTranscript() {
		if (!transcription?.text) return;
		await navigator.clipboard.writeText(transcription.text);
		copied = true;
		window.setTimeout(() => {
			copied = false;
		}, 1600);
	}

	return {
		get isSupported() {
			return isSupported;
		},
		get isRecording() {
			return isRecording;
		},
		get isBusy() {
			return isBusy;
		},
		get canRecord() {
			return canRecord;
		},
		get canCopy() {
			return canCopy;
		},
		get status() {
			return status;
		},
		get statusLabel() {
			return statusLabel;
		},
		get progress() {
			return progress;
		},
		get errorMessage() {
			return errorMessage;
		},
		get recording() {
			return recording;
		},
		get transcription() {
			return transcription;
		},
		get actionLabel() {
			return actionLabel;
		},
		get copyLabel() {
			return copyLabel;
		},
		get className() {
			return className;
		},
		get restProps() {
			return restProps;
		},
		toggleRecording,
		copyTranscript
	};
}
