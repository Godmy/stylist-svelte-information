import AudioVisualizer from './index.svelte';
import type { RecipeAudioVisualizer } from '$stylist/audio/interface/recipe/audio-visualizer';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Audio track row with artwork, metadata and a play toggle. */
export default {
	component: AudioVisualizer,
	title: 'Audio Visualizer',
	description: 'An audio visualizer component that shows audio tracks with play controls.',
	args: {
		title: 'Sample Track',
		author: 'Sample Artist',
		duration: '3:45',
		isPlaying: false,
		alt: 'Sample track artwork',
		src: 'https://placehold.co/64x64'
	},
	controls: {
		title: { type: 'text' },
		author: { type: 'text' },
		duration: { type: 'text' },
		isPlaying: { type: 'boolean' }
	},
	presets: {
		'Playing Track': {
			title: 'Summer Vibes',
			author: 'Beach Tunes',
			duration: '4:20',
			isPlaying: true,
			alt: 'Album artwork'
		},
		'Paused Track': {
			title: 'Chill Beats',
			author: 'Relaxing Sounds',
			duration: '5:15',
			isPlaying: false,
			alt: 'Album artwork'
		}
	}
} satisfies ContractStory<RecipeAudioVisualizer>;
