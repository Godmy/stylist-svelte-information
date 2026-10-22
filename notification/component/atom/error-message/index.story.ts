import ErrorMessage from '$stylist/notification/component/atom/error-message/index.svelte';
import type { RecipeErrorMessage } from '$stylist/notification/interface/recipe/error-message';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Focused error feedback block; index.story.svelte supplies the onRetry callback. */
export default {
	component: ErrorMessage,
	title: 'ErrorMessage',
	description: 'Focused error feedback block with optional retry action.',
	args: {
		text: 'Could not load invoices',
		error: 'The request timed out after 30 seconds.',
		showRetry: true
	},
	controls: {
		text: { type: 'text' },
		error: { type: 'text' },
		showRetry: { type: 'boolean' }
	},
	presets: {
		'Malformed response': { error: 'The server returned a malformed response.' },
		'Without retry': { showRetry: false }
	}
} satisfies ContractStory<RecipeErrorMessage>;
