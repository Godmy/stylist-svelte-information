import Chart from './index.svelte';
import type { RecipeChart } from '$stylist/chart/interface/recipe/chart';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Complete function-chart organism; the legacy min/max knobs became static scales plus a preset. */
export default {
	component: Chart,
	title: 'Chart',
	description: 'Complete function-chart organism with canvas and legend',
	args: {
		width: 720,
		height: 420,
		title: 'Function Comparison',
		xScale: [-6, 6],
		yScale: [-1.5, 1.5],
		xTickCount: 6,
		yTickCount: 6,
		zTickCount: 2,
		xAxisLabel: 'X',
		yAxisLabel: 'f(x)',
		zAxisLabel: 'Z',
		showLegend: true,
		showGrid: true,
		showZAxis: false,
		showAxisArrows: true,
		series: [
			{
				id: 'sin',
				name: 'sin(x)',
				color: '#2563eb',
				points: [
					{ x: -6, y: 0.28 },
					{ x: -4, y: 0.76 },
					{ x: -2, y: -0.91 },
					{ x: 0, y: 0 },
					{ x: 2, y: 0.91 },
					{ x: 4, y: -0.76 },
					{ x: 6, y: -0.28 }
				]
			},
			{
				id: 'cos',
				name: 'cos(x)',
				color: '#ea580c',
				points: [
					{ x: -6, y: 0.96 },
					{ x: -4, y: -0.65 },
					{ x: -2, y: -0.42 },
					{ x: 0, y: 1 },
					{ x: 2, y: -0.42 },
					{ x: 4, y: -0.65 },
					{ x: 6, y: 0.96 }
				]
			},
			{
				id: 'line',
				name: '0.1x',
				color: '#16a34a',
				points: [
					{ x: -6, y: -0.6 },
					{ x: -4, y: -0.4 },
					{ x: -2, y: -0.2 },
					{ x: 0, y: 0 },
					{ x: 2, y: 0.2 },
					{ x: 4, y: 0.4 },
					{ x: 6, y: 0.6 }
				]
			}
		]
	},
	controls: {
		width: { type: 'number', min: 380, max: 1020, step: 20 },
		height: { type: 'number', min: 260, max: 700, step: 20 },
		xTickCount: { type: 'number', min: 1, max: 20, step: 1 },
		yTickCount: { type: 'number', min: 1, max: 20, step: 1 },
		zTickCount: { type: 'number', min: 0, max: 12, step: 1 },
		showLegend: { type: 'boolean' },
		showGrid: { type: 'boolean' },
		showZAxis: { type: 'boolean' },
		showAxisArrows: { type: 'boolean' }
	},
	presets: {
		'Zoomed in': { xScale: [-3, 3], yScale: [-1, 1] }
	}
} satisfies ContractStory<RecipeChart>;
