import ChartPolyline from '$stylist/chart/component/atom/chart-polyline/index.svelte';
import type { RecipeChartPolyline } from '$stylist/chart/interface/recipe/chart-polyline';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** SVG polyline of function points; the context supplies the `<svg>` of the same size. */
export default {
	component: ChartPolyline,
	title: 'ChartPolyline',
	description: 'Polyline for plotting function points',
	args: {
		points: [
			{ x: -4, y: 8 },
			{ x: -2, y: 3 },
			{ x: 0, y: 1 },
			{ x: 2, y: 5 },
			{ x: 4, y: 9 }
		],
		width: 420,
		height: 240,
		strokeWidth: 2,
		color: '#2563eb'
	},
	controls: {
		strokeWidth: { type: 'number', min: 1, max: 8, step: 1 },
		color: { type: 'color' }
	},
	context: {
		kind: 'element',
		tag: 'svg',
		attrs: { width: 420, height: 240 },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeChartPolyline>;
