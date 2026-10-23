import ImageCaptionEditorCard from '$stylist/image/component/organism/image-caption-editor-card/index.svelte';
import type { RecipeImageCaptionEditorCard } from '$stylist/image/interface/recipe/image-caption-editor-card';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Caption of one slider photo, edited on a phone: preview over the photo, save/cancel/restore. */
export default {
	component: ImageCaptionEditorCard,
	title: 'ImageCaptionEditorCard',
	description: 'Photo with an editable caption, a character counter and restore of the original',
	args: {
		src: 'https://images.unsplash.com/photo-1586613835341-6b5e3e5b6e51?w=800',
		alt: 'Photo 1',
		number: 1,
		caption: 'Sigiriya at dawn',
		maxLength: 120,
		fields: { src: '/images/sigiriya.jpg' },
		saveAction: '?/save',
		resetAction: '?/reset',
		edited: false
	},
	controls: {
		caption: { type: 'text', description: 'Saved caption' },
		maxLength: { type: 'number', description: 'Character limit' },
		edited: { type: 'boolean', description: 'Caption differs from the original' },
		note: { type: 'text', description: 'Small print under the form' }
	},
	presets: {
		Edited: {
			edited: true,
			note: 'Changed 23.10.2026 by the manager. Original: «Sigiriya»',
			message: { ok: 'Saved' }
		},
		Empty: { caption: '' }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeImageCaptionEditorCard>;
