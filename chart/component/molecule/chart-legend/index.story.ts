import ChartLegend from './index.svelte';
import type { RecipeChartLegend } from '$stylist/chart/interface/recipe/chart-legend';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Legend for chart function series; the legacy single/multi knob became presets. */
export default {
	component: ChartLegend,
	title: 'ChartLegend',
	description: 'Legend for chart function series',
	args: {
		items: [
			{ id: 'f1', name: 'f(x) = x^2', color: '#2563eb' },
			{ id: 'f2', name: 'g(x) = sin(x)', color: '#16a34a' },
			{ id: 'f3', name: 'h(x) = 0.5x + 2', color: '#ea580c' }
		]
	},
	presets: {
		Single: { items: [{ id: 'f1', name: 'f(x) = x^2', color: '#2563eb' }] }
	}
} satisfies ContractStory<RecipeChartLegend>;
