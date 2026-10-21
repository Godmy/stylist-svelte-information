import ScatterPlot from './index.svelte';
import type { RecipeScatterPlot } from '$stylist/chart/interface/recipe/scatter-plot';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Scatter plot of labeled data points with optional grid, axis, and labels. */
export default {
	component: ScatterPlot,
	title: 'ScatterPlot',
	description: 'Scatter plot of labeled data points with optional grid, axis, and labels.',
	args: {
		showGrid: true,
		showAxis: true,
		showLabels: false,
		data: [
			{ id: 'a', x: 12, y: 30, name: 'A', color: '#3b82f6' },
			{ id: 'b', x: 40, y: 70, name: 'B', color: '#10b981' },
			{ id: 'c', x: 70, y: 40, name: 'C', color: '#f59e0b' }
		]
	},
	controls: {
		showGrid: { type: 'boolean' },
		showAxis: { type: 'boolean' },
		showLabels: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeScatterPlot>;
