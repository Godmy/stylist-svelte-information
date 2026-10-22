import BaseCard from '$stylist/list/component/molecule/base-card/index.svelte';
import type { RecipeBaseCard } from '$stylist/list/interface/recipe/base-card';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Generic information card with a title/description header and a body slot. */
export default {
	component: BaseCard,
	title: 'BaseCard',
	description: 'Generic information card with header and body slots.',
	args: {
		title: 'Workspace Summary',
		description: 'All systems operational for the current release.',
		variant: 'default',
		size: 'md',
		disabled: false
	},
	controls: {
		title: { type: 'text' },
		description: { type: 'text' },
		// The color tones plus the card-only 'elevated' (shadow) variant.
		variant: { type: 'select', options: [...TOKEN_COLOR_TONE, 'elevated'] },
		// xs … 2xl: the sizes the card styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 6) },
		disabled: { type: 'boolean' }
	},
	presets: { Elevated: { variant: 'elevated' }, Success: { variant: 'success' } },
	content: [{ kind: 'text', value: 'Body content can contain any custom UI.' }]
} satisfies ContractStory<RecipeBaseCard>;
