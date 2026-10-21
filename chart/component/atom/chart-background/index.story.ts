import ChartBackground from './index.svelte';
import type { RecipeChartBackground } from '$stylist/chart/interface/recipe/chart-background';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** SVG background panel; the context `<svg>` fits the largest width/height controls. */
export default {
	component: ChartBackground,
	title: 'ChartBackground',
	description: 'Background panel for SVG chart surfaces',
	args: { width: 420, height: 220, fill: '#f8fafc', stroke: '#cbd5e1' },
	controls: {
		width: { type: 'number', min: 240, max: 800, step: 20 },
		height: { type: 'number', min: 120, max: 500, step: 20 },
		fill: { type: 'text' },
		stroke: { type: 'text' }
	},
	context: {
		kind: 'element',
		tag: 'svg',
		// The 5px viewBox offset keeps the stroke of the panel visible at the origin.
		attrs: { width: 810, height: 510, viewBox: '-5 -5 810 510' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeChartBackground>;
