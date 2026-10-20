import MediaThumbnail from './index.svelte';
import type { RecipeMediaThumbnail } from '$stylist/image/interface/recipe/media-thumbnail';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Generic image thumbnail with an optional remove action. */
export default {
	component: MediaThumbnail,
	title: 'MediaThumbnail',
	description:
		'Generic image thumbnail with an optional remove action. Domain-neutral: no product/gallery knowledge.',
	args: { src: 'https://placehold.co/400x300', alt: 'Сигирия.jpg', removable: true },
	controls: {
		alt: { type: 'text' },
		removable: { type: 'boolean' }
	},
	presets: { 'Without remove': { removable: false } }
	// `removable` is a story knob: the render passes `onRemove` only when it is on.
} satisfies ContractStory<RecipeMediaThumbnail & { removable?: boolean }>;
