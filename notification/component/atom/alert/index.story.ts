import Alert from './index.svelte';
import type { RecipeAlert } from '$stylist/notification/interface/recipe/alert';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';

/** Inline feedback for important user-visible status. */
export default {
	component: Alert,
	title: 'Alert',
	description: 'Inline feedback for important user-visible status.',
	args: { variant: 'info', title: 'Workspace synced', showIcon: true, closable: false },
	controls: {
		// primary, secondary, success, info, warning, danger, error: the tones the alert styles.
		variant: {
			type: 'select',
			options: [...TOKEN_COLOR_TONE.slice(2, 4), ...TOKEN_COLOR_TONE.slice(5)]
		},
		title: { type: 'text' },
		showIcon: { type: 'boolean' },
		closable: { type: 'boolean' }
	},
	presets: {
		Success: { variant: 'success', title: 'Deployment complete' },
		Warning: { variant: 'warning', title: 'Usage approaching limit' },
		Error: { variant: 'error', title: 'Sync failed' }
	},
	content: [
		{
			kind: 'element',
			tag: 'p',
			children: [
				{
					kind: 'text',
					value: 'Changes are saved automatically. The alert keeps enough text to test wrapping.'
				}
			]
		}
	]
} satisfies ContractStory<RecipeAlert>;
