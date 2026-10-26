/** Messages of Transcriber; the label props override the button texts. */
export const AUDIO_TRANSCRIBER_MESSAGE = {
	en: {
		record: 'Record',
		stop: 'Stop',
		copy: 'Copy',
		copied: 'Copied',
		unsupported: 'Recording is not supported in this browser',
		recording: 'Recording audio',
		processing: 'Preparing audio',
		uploading: 'Uploading audio',
		transcribing: 'Transcribing audio',
		done: 'Transcription ready',
		error: 'Transcription failed',
		idle: 'Ready',
		progress: 'Transcription progress',
		empty: 'Transcript will appear here.'
	},
	ru: {
		record: 'Записать',
		stop: 'Остановить',
		copy: 'Копировать',
		copied: 'Скопировано',
		unsupported: 'Этот браузер не поддерживает запись',
		recording: 'Идёт запись',
		processing: 'Подготовка аудио',
		uploading: 'Загрузка аудио',
		transcribing: 'Распознавание речи',
		done: 'Расшифровка готова',
		error: 'Не удалось расшифровать',
		idle: 'Готово к записи',
		progress: 'Ход расшифровки',
		empty: 'Здесь появится расшифровка.'
	}
} as const;
