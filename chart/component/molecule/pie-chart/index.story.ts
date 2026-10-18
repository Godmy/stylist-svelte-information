import PieChart from './index.svelte';
import type { RecipePieChart } from '$stylist/chart/interface/recipe/pie-chart';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Simple pie chart with legend list. */
export default {
	component: PieChart,
	title: 'PieChart',
	description: 'Simple pie chart with legend list.',
	args: {
		width: 260,
		height: 260,
		data: [
			{ label: 'Desktop', value: 52 },
			{ label: 'Mobile', value: 34 },
			{ label: 'Tablet', value: 14 }
		]
	},
	controls: {
		width: { type: 'number', min: 180, max: 420, step: 10 },
		height: { type: 'number', min: 180, max: 420, step: 10 }
	}
} satisfies ContractStory<RecipePieChart>;
