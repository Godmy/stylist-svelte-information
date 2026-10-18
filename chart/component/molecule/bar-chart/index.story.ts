import BarChart from './index.svelte';
import type { RecipeBarChart } from '$stylist/chart/interface/recipe/bar-chart';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_THEME_SCHEME } from '$stylist/theme/const/array/theme-scheme';

/** Categorical bar chart with legend and axis options. */
export default {
	component: BarChart,
	title: 'BarChart',
	description: 'Categorical bar chart with legend and axis options.',
	args: {
		title: 'Quarterly revenue',
		width: 520,
		height: 300,
		showLegend: true,
		showAxis: true,
		colorScheme: 'minimal',
		data: [
			{ id: 'q1', name: 'Q1', value: 120 },
			{ id: 'q2', name: 'Q2', value: 180 },
			{ id: 'q3', name: 'Q3', value: 145 },
			{ id: 'q4', name: 'Q4', value: 210 }
		]
	},
	controls: {
		title: { type: 'text' },
		width: { type: 'number', min: 320, max: 900, step: 20 },
		height: { type: 'number', min: 220, max: 600, step: 20 },
		showLegend: { type: 'boolean' },
		showAxis: { type: 'boolean' },
		// The bar palettes cover the first four theme schemes.
		colorScheme: { type: 'select', options: TOKEN_THEME_SCHEME.slice(0, 4) }
	}
} satisfies ContractStory<RecipeBarChart>;
