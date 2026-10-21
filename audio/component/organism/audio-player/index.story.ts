import AudioPlayer from './index.svelte';
import type { RecipeAudioPlayer } from '$stylist/audio/interface/recipe/audio-player';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Interactive audio player with customizable options. */
export default {
	component: AudioPlayer,
	title: 'Audio Player',
	description: 'Interactive audio player with customizable options.',
	args: { title: 'Sample Audio Track', showControls: true },
	controls: {
		title: { type: 'text' },
		showControls: { type: 'boolean' }
	},
	presets: {
		'With Controls': { title: 'Track with Controls', showControls: true },
		'Without Controls': { title: 'Track without Controls', showControls: false }
	}
} satisfies ContractStory<RecipeAudioPlayer>;
