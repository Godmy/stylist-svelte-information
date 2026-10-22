import ImageGallery from '$stylist/image/component/organism/image-gallery/index.svelte';
import type { RecipeImageGallery } from '$stylist/image/interface/recipe/image-gallery';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Interactive image gallery with thumbnails, captions and autoplay. */
export default {
	component: ImageGallery,
	title: 'Image Gallery',
	description: 'Interactive image gallery with customizable options.',
	args: {
		images: [
			{
				id: '1',
				imageSrc: 'https://placehold.co/800x600/3b82f6/white?text=Image+1',
				imageAlt: 'First image',
				caption: 'Beautiful landscape image'
			},
			{
				id: '2',
				imageSrc: 'https://placehold.co/800x600/ef4444/white?text=Image+2',
				imageAlt: 'Second image',
				caption: 'Colorful sunset'
			},
			{
				id: '3',
				imageSrc: 'https://placehold.co/800x600/10b981/white?text=Image+3',
				imageAlt: 'Third image',
				caption: 'Mountain view'
			},
			{
				id: '4',
				imageSrc: 'https://placehold.co/800x600/f59e0b/white?text=Image+4',
				imageAlt: 'Fourth image',
				caption: 'Ocean waves'
			},
			{
				id: '5',
				imageSrc: 'https://placehold.co/800x600/8b5cf6/white?text=Image+5',
				imageAlt: 'Fifth image',
				caption: 'Forest trail'
			}
		],
		showThumbnails: true,
		autoPlay: false,
		showCaptions: true
	},
	controls: {
		showThumbnails: { type: 'boolean' },
		autoPlay: { type: 'boolean' },
		showCaptions: { type: 'boolean' }
	},
	presets: {
		'Without Thumbnails': { showThumbnails: false, showCaptions: true },
		'Without Captions': { showThumbnails: true, showCaptions: false }
	}
} satisfies ContractStory<RecipeImageGallery>;
