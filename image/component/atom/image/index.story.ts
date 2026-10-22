import Image from '$stylist/image/component/atom/image/index.svelte';
import type { RecipeImage } from '$stylist/image/interface/recipe/image';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';
import hero from '$stylist/image/data/png/1-hero-consensus-decision-room.png';
import about from '$stylist/image/data/png/2-section-about.png';
import delphi from '$stylist/image/data/png/3-section-wideband-delphi.png';
import history from '$stylist/image/data/png/4-section-history.png';

/** Image with a fade-in loading state, an automatic fallback on error and size tokens. */
export default {
	component: Image,
	title: 'Image',
	description:
		'Изображение с состоянием загрузки (fade-in), автоматическим fallback при ошибке и токенами размера.',
	args: {
		imageSrc: about,
		imageFallback: about,
		imageAlt: 'Landing section preview',
		size: 'lg',
		imageLoading: 'lazy'
	},
	controls: {
		imageSrc: { type: 'select', label: 'Image', options: [hero, about, delphi, history] },
		imageAlt: { type: 'text' },
		// sm … xl: the size tokens the image styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 5) },
		imageLoading: { type: 'select', options: ['lazy', 'eager'] }
	},
	presets: {
		// An unreachable src demonstrates the automatic fallback swap.
		'Broken src': { imageSrc: 'https://invalid-url-for-testing.local/broken.png' },
		Small: { size: 'sm' },
		'Extra large': { size: 'xl' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeImage>;
