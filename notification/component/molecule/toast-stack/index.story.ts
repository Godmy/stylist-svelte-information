import ToastStack from './index.svelte';
import type { RecipeToastStack } from '$stylist/notification/interface/recipe/toast-stack';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Stacked toasts; index.story.svelte owns the toast list and its dismiss callbacks. */
export default {
	component: ToastStack,
	title: 'ToastStack',
	description: 'Stacked toast notifications with individual and bulk dismiss actions.',
	args: { position: 'top-right', maxToasts: 4, dismissAllLabel: 'Dismiss all' },
	controls: {
		// The positions the stack styles; no shared token lists these corners and centers.
		position: {
			type: 'select',
			options: [
				'top-left',
				'top-right',
				'bottom-left',
				'bottom-right',
				'top-center',
				'bottom-center'
			]
		},
		maxToasts: { type: 'range', min: 1, max: 6, step: 1 },
		dismissAllLabel: { type: 'text' }
	},
	presets: {
		'Bottom center': { position: 'bottom-center' },
		'Single toast': { maxToasts: 1 }
	}
} satisfies ContractStory<RecipeToastStack>;
