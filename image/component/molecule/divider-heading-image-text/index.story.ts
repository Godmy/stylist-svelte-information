import DividerHeadingImageText from './index.svelte';
import type { RecipeDividerHeadingImageText } from '$stylist/image/interface/recipe/divider-heading-image-text';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import hero from '../../../data/png/1-hero-consensus-decision-room.png';
import about from '../../../data/png/2-section-about.png';
import delphi from '../../../data/png/3-section-wideband-delphi.png';
import history from '../../../data/png/4-section-history.png';

/** Labelled divider, a 1:1 heading/image block and a full-width text block. */
export default {
	component: DividerHeadingImageText,
	title: 'Divider Heading Image Text',
	description:
		'Three text slots only: a labelled divider, a 1:1 heading/image block, and one full-width text block below.',
	args: {
		ariaLabel: 'Expert consensus without pretending uncertainty disappeared',
		dividerLabel: 'Definition',
		dividerAlign: 'left',
		text: 'Expert consensus without pretending uncertainty disappeared',
		body: 'The section explains the concept in direct language, with enough detail to make the offer concrete.',
		imageSrc: about,
		imageAlt: 'About'
	},
	controls: {
		dividerLabel: { type: 'text', label: 'Divider label' },
		dividerAlign: {
			type: 'select',
			label: 'Divider text align',
			options: ['left', 'center', 'right']
		},
		text: { type: 'text' },
		body: { type: 'text' },
		imageSrc: { type: 'select', label: 'Image', options: [hero, about, delphi, history] },
		imageAlt: { type: 'text' }
	}
} satisfies ContractStory<RecipeDividerHeadingImageText>;
