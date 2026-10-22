import CountBadge from '$stylist/notification/component/atom/count-badge/index.svelte';
import type { RecipeCountBadge } from '$stylist/notification/interface/recipe/count-badge';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Compact counter for unread states. */
export default {
	component: CountBadge,
	title: 'CountBadge',
	description: 'Compact counter for unread states with support for maximum display values.',
	args: { count: 12, max: 99, showZero: false },
	controls: {
		count: { type: 'select', options: [0, 1, 3, 5, 10, 12, 25, 50, 99, 100, 152, 200] },
		max: { type: 'select', options: [10, 50, 99, 100, 200, 500, 999] },
		showZero: { type: 'boolean' }
	},
	presets: {
		Zero: { count: 0, showZero: true },
		Overflow: { count: 152, max: 99 }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeCountBadge>;
