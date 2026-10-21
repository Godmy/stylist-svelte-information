import ChartCanvas from './index.svelte';
import type { RecipeAnalyticsChartCanvas } from '$stylist/chart/interface/recipe/analytics-chart-canvas';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Composed chart surface with axes and two plotted functions. */
export default {
	component: ChartCanvas,
	title: 'ChartCanvas',
	description: 'Composed chart surface with axes and plotted functions',
	args: {
		width: 680,
		height: 380,
		xScale: [-4, 4],
		yScale: [-8, 12],
		xTickCount: 6,
		yTickCount: 5,
		zTickCount: 3,
		showGrid: true,
		showZAxis: false,
		showAxisArrows: true,
		title: 'Function Plot',
		xAxisLabel: 'X',
		yAxisLabel: 'Y',
		zAxisLabel: 'Z',
		series: [
			{
				id: 'parabola',
				name: 'f(x) = x^2',
				color: '#2563eb',
				points: [
					{ x: -3, y: 9 },
					{ x: -2, y: 4 },
					{ x: -1, y: 1 },
					{ x: 0, y: 0 },
					{ x: 1, y: 1 },
					{ x: 2, y: 4 },
					{ x: 3, y: 9 }
				]
			},
			{
				id: 'line',
				name: 'g(x) = 2x + 1',
				color: '#16a34a',
				points: [
					{ x: -3, y: -5 },
					{ x: -2, y: -3 },
					{ x: -1, y: -1 },
					{ x: 0, y: 1 },
					{ x: 1, y: 3 },
					{ x: 2, y: 5 },
					{ x: 3, y: 7 }
				]
			}
		]
	},
	controls: {
		width: { type: 'number', min: 360, max: 960, step: 20 },
		height: { type: 'number', min: 240, max: 620, step: 20 },
		xTickCount: { type: 'number', min: 1, max: 20, step: 1 },
		yTickCount: { type: 'number', min: 1, max: 20, step: 1 },
		zTickCount: { type: 'number', min: 0, max: 12, step: 1 },
		showGrid: { type: 'boolean' },
		showZAxis: { type: 'boolean' },
		showAxisArrows: { type: 'boolean' }
	},
	presets: {
		'Wide domain': { xScale: [-10, 10], yScale: [-20, 30] }
	}
} satisfies ContractStory<RecipeAnalyticsChartCanvas>;
