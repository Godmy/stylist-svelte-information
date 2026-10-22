import CanvasImageEditor from '$stylist/image/component/organism/canvas-image-editor/index.svelte';
import type { RecipeCanvasImageEditor } from '$stylist/image/interface/recipe/canvas-image-editor';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_IMAGE_FILTER } from '$stylist/layout/const/array/image-filter';

/** Canvas-based image editor for cropping, filtering, and manipulating images. */
export default {
	component: CanvasImageEditor,
	title: 'CanvasImageEditor',
	description:
		'Canvas-based image editor component for cropping, filtering, and manipulating images.',
	args: {
		imageWidth: 800,
		imageHeight: 600,
		cropEnabled: false,
		filter: 'none',
		imageSrc: 'https://placehold.co/600x400',
		imageAlt: 'Canvas image editor preview'
	},
	controls: {
		imageWidth: { type: 'select', options: [600, 700, 800, 900] },
		imageHeight: { type: 'select', options: [400, 500, 600, 700] },
		cropEnabled: { type: 'boolean' },
		filter: { type: 'select', options: TOKEN_IMAGE_FILTER }
	},
	presets: { Grayscale: { filter: 'grayscale' }, Crop: { cropEnabled: true } }
} satisfies ContractStory<RecipeCanvasImageEditor>;
