import VideoPlayer from './index.svelte';
import type { RecipeVideoPlayer } from '$stylist/video/interface/recipe/video-player';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Video player with custom play/mute/volume/seek controls. */
export default {
	component: VideoPlayer,
	title: 'VideoPlayer',
	description: 'Interactive video player with customizable options.',
	args: {
		src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		autoPlay: false,
		showControls: true,
		muted: false,
		width: 640,
		height: 400
	},
	controls: {
		src: { type: 'text' },
		autoPlay: { type: 'boolean' },
		showControls: { type: 'boolean' },
		muted: { type: 'boolean' },
		loop: { type: 'boolean' },
		width: { type: 'number' },
		height: { type: 'number' }
	},
	presets: {
		'Autoplay Enabled': {
			src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
			autoPlay: true,
			muted: true,
			height: 200
		},
		'No Controls': {
			src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
			showControls: false,
			height: 200
		}
	}
} satisfies ContractStory<RecipeVideoPlayer>;
