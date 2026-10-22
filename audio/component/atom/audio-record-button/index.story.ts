import AudioRecordButton from '$stylist/audio/component/atom/audio-record-button/index.svelte';
import type { RecipeAudioRecordButton } from '$stylist/audio/interface/recipe/audio-record-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Button that records an audio message and exposes the created file to the host. */
export default {
	component: AudioRecordButton,
	title: 'Audio Record Button',
	description: 'A button that records an audio message and exposes the created file to the host.',
	args: {
		startLabel: 'Record',
		stopLabel: 'Stop',
		saveLabel: 'Audio ready',
		fileName: 'audio-message.webm',
		disabled: false
	},
	controls: {
		startLabel: { type: 'text' },
		stopLabel: { type: 'text' },
		saveLabel: { type: 'text' },
		fileName: { type: 'text' },
		disabled: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeAudioRecordButton>;
