import Transcriber from '$stylist/audio/component/organism/transcriber/index.svelte';
import type { RecipeTranscriber } from '$stylist/audio/interface/recipe/transcriber';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Audio recorder with transcription and copyable text. */
export default {
	component: Transcriber,
	title: 'Transcriber',
	description: 'Records audio, sends it to the transcription endpoint, and renders copyable text.',
	args: {
		recordLabel: 'Record',
		stopLabel: 'Stop',
		copyLabel: 'Copy',
		model: 'faster-whisper-base'
	},
	controls: {
		recordLabel: { type: 'text' },
		stopLabel: { type: 'text' },
		copyLabel: { type: 'text' },
		model: { type: 'text' },
		// Unset or empty: the endpoint detects the language.
		language: { type: 'text' }
	}
} satisfies ContractStory<RecipeTranscriber>;
