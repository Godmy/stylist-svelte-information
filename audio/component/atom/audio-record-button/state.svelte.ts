import { AUDIO_AUDIO_RECORD_BUTTON_MESSAGE } from '$stylist/audio/const/record/audio-record-button-message';
import { useMessage } from '$stylist/localization/function/hook/use-message';
import type { RecipeAudioRecordButton } from '$stylist/audio/interface/recipe/audio-record-button';
import type { SlotAudioRecording } from '$stylist/audio/interface/slot/audio-recording';
import { TOKEN_AUDIO_ICON } from '$stylist/audio/const/record/audio-icon';
import { AudioRecorderManager } from '$stylist/audio/class/manager/audio-recorder';

export function createAudioRecordButtonState(getProps: () => RecipeAudioRecordButton) {
	const props = $derived(getProps());
	const t = useMessage('audio-record-button', AUDIO_AUDIO_RECORD_BUTTON_MESSAGE);
	const recorder = new AudioRecorderManager();
	let recording = $state<SlotAudioRecording | null>(null);
	let isRecording = $state(false);
	let isProcessing = $state(false);
	let errorMessage = $state('');

	const isSupported = $derived(AudioRecorderManager.isSupported());
	const mimeType = $derived(props.mimeType ?? 'audio/webm');
	const fileName = $derived(props.fileName ?? `audio-message-${Date.now()}.webm`);
	const isDisabled = $derived(Boolean(props.disabled || isProcessing || !isSupported));
	const buttonLabel = $derived(
		isRecording ? (props.stopLabel ?? t('stop')) : (props.startLabel ?? t('record'))
	);
	const statusLabel = $derived(
		isRecording
			? (props.saveLabel ?? t('recording'))
			: recording
				? (props.saveLabel ?? t('ready'))
				: ''
	);
	const iconName = $derived(isRecording ? TOKEN_AUDIO_ICON.SQUARE : TOKEN_AUDIO_ICON.MIC);
	const className = $derived(props.class ?? '');

	const restProps = $derived.by(() => {
		const {
			class: _class,
			mimeType: _mimeType,
			fileName: _fileName,
			audioConstraints: _audioConstraints,
			disabled: _disabled,
			startLabel: _startLabel,
			stopLabel: _stopLabel,
			saveLabel: _saveLabel,
			onRecordingStart: _onRecordingStart,
			onRecorded: _onRecorded,
			onError: _onError,
			...rest
		} = props;
		return rest;
	});

	function reportError(error: unknown) {
		const nextError = error instanceof Error ? error : new Error(String(error));
		isRecording = false;
		isProcessing = false;
		errorMessage = nextError.message;
		props.onError?.(nextError);
	}

	async function handleRecorded(nextRecording: SlotAudioRecording) {
		isProcessing = true;
		try {
			recording = nextRecording;
			await props.onRecorded?.(nextRecording);
		} catch (error) {
			reportError(error);
		} finally {
			isProcessing = false;
		}
	}

	async function startRecording() {
		if (isDisabled || isRecording) return;
		errorMessage = '';
		recording = null;
		await recorder.start({
			mimeType,
			fileName,
			audioConstraints: props.audioConstraints,
			onStart: () => {
				isRecording = true;
				props.onRecordingStart?.();
			},
			onRecorded: handleRecorded,
			onError: reportError
		});
	}

	function stopRecording() {
		isRecording = false;
		recorder.stop();
	}

	function toggleRecording() {
		if (isRecording) {
			stopRecording();
		} else {
			void startRecording();
		}
	}

	return {
		get isSupported() {
			return isSupported;
		},
		get isRecording() {
			return isRecording;
		},
		get isProcessing() {
			return isProcessing;
		},
		get isDisabled() {
			return isDisabled;
		},
		get recording() {
			return recording;
		},
		get errorMessage() {
			return errorMessage;
		},
		get buttonLabel() {
			return buttonLabel;
		},
		get statusLabel() {
			return statusLabel;
		},
		get iconName() {
			return iconName;
		},
		get className() {
			return className;
		},
		get restProps() {
			return restProps;
		},
		toggleRecording
	};
}
