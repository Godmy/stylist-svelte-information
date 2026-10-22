import Counter from '$stylist/notification/component/atom/counter/index.svelte';
import type { RecipeCounter } from '$stylist/notification/interface/recipe/counter';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** A small badge to display numerical counts. */
export default {
	component: Counter,
	title: 'Counter',
	description: 'A small badge to display numerical counts, often used for notifications.',
	args: { count: 5, max: 99, variant: 'primary', size: 'md' },
	controls: {
		count: { type: 'select', options: [0, 1, 5, 10, 15, 25, 50, 99, 100, 150] },
		max: { type: 'select', options: [10, 50, 99, 100, 200] },
		// Every tone except tertiary, which the counter does not style.
		variant: { type: 'select', options: TOKEN_COLOR_TONE.filter((tone) => tone !== 'tertiary') },
		// xs … 2xl: the fraction sizes only alias these.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 6) }
	},
	presets: {
		Overflow: { count: 150, max: 99, variant: 'danger' },
		Large: { size: 'lg', variant: 'success' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeCounter>;
