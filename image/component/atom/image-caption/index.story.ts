import ImageCaption from '$stylist/image/component/atom/image-caption/index.svelte';
import type { RecipeImageCaption } from '$stylist/image/interface/recipe/image-caption';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import hero from '$stylist/image/data/png/1-hero-consensus-decision-room.png';
import about from '$stylist/image/data/png/2-section-about.png';
import delphi from '$stylist/image/data/png/3-section-wideband-delphi.png';
import history from '$stylist/image/data/png/4-section-history.png';

/** Image with a caption and rounded/bordered/shadow framing. */
export default {
	component: ImageCaption,
	title: 'Image Caption',
	description:
		'Изображение с подписью. Переключайте пресеты, чтобы увидеть готовые сочетания rounded/bordered/shadow на реальных ассетах домена.',
	args: {
		imageSrc: hero,
		imageAlt: 'Facilitators aligning the room before a consensus vote',
		caption: 'Consensus decision room - rounded, bordered, with shadow',
		rounded: true,
		bordered: true,
		shadow: true
	},
	controls: {
		imageSrc: { type: 'select', label: 'Image', options: [hero, about, delphi, history] },
		imageAlt: { type: 'text' },
		caption: { type: 'text' },
		rounded: { type: 'boolean' },
		bordered: { type: 'boolean' },
		shadow: { type: 'boolean' }
	},
	presets: {
		'About - flush': {
			imageSrc: about,
			imageAlt: 'About section illustration',
			caption: 'About section - flush edges, no border, no shadow',
			rounded: false,
			bordered: false,
			shadow: false
		},
		'Wideband Delphi - bordered': {
			imageSrc: delphi,
			imageAlt: 'Wideband Delphi estimation session',
			caption: 'Wideband Delphi - square corners, bordered, no shadow',
			rounded: false,
			bordered: true,
			shadow: false
		},
		'History - shadow': {
			imageSrc: history,
			imageAlt: 'History section illustration',
			caption: 'History section - rounded, no border, with shadow',
			rounded: true,
			bordered: false,
			shadow: true
		}
	}
} satisfies ContractStory<RecipeImageCaption>;
