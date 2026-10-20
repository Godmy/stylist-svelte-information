import VideoScene from './index.svelte';
import type { RecipeVideoScene } from '$stylist/video/interface/recipe/video-scene';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Full-bleed, muted, looping video layer. */
export default {
	component: VideoScene,
	title: 'VideoScene',
	description: 'Full-bleed video layer with autoplay toggle.',
	args: {
		src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
		active: true,
		label: 'Video scene'
	},
	controls: {
		src: { type: 'text' },
		active: { type: 'boolean', description: 'Autoplay the video' },
		label: { type: 'text', description: 'Accessible label' }
	},
	presets: { Paused: { active: false } }
} satisfies ContractStory<RecipeVideoScene>;
