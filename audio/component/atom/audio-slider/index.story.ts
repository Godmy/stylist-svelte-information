import AudioSlider from './index.svelte';
import type { RecipeAudioSlider } from '$stylist/audio/interface/recipe/audio-slider';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Range slider for controlling audio levels. */
export default {
	component: AudioSlider,
	title: 'Audio Slider',
	description: 'An audio slider component for controlling audio levels.',
	args: { value: 50, min: 0, max: 100, step: 1, label: 'Volume', showValue: true },
	controls: {
		value: { type: 'number' },
		min: { type: 'number' },
		max: { type: 'number' },
		step: { type: 'number' },
		label: { type: 'text' },
		showValue: { type: 'boolean' }
	},
	presets: {
		'Low Volume': { value: 10, label: 'Low Volume' },
		'High Volume': { value: 90, label: 'High Volume' }
	}
} satisfies ContractStory<RecipeAudioSlider>;
