import MetricBarsCard from './index.svelte';
import type { RecipeMetricBarsCard } from '$stylist/chart/interface/recipe/metric-bars-card';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Grouped metric bars with a card header and optional total. */
export default {
	component: MetricBarsCard,
	title: 'MetricBarsCard',
	description: 'Grouped metric bars with a card header and optional total.',
	args: {
		text: 'Sprint Health',
		description: 'Distribution across current delivery lanes.',
		total: '42 issues',
		color: '#2563eb',
		trackColor: '#e5e7eb',
		bars: [
			{ label: 'Ready', value: 18, valueLabel: '18', percentage: 43 },
			{ label: 'In Progress', value: 14, valueLabel: '14', percentage: 33 },
			{ label: 'Blocked', value: 4, valueLabel: '4', percentage: 10 },
			{ label: 'Review', value: 6, valueLabel: '6', percentage: 14 }
		]
	},
	controls: {
		text: { type: 'text' },
		description: { type: 'text' },
		total: { type: 'text' },
		color: { type: 'color' },
		trackColor: { type: 'color' }
	}
} satisfies ContractStory<RecipeMetricBarsCard>;
