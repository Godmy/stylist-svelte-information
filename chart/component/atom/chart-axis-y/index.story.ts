import ChartAxisY from './index.svelte';
import type { RecipeChartAxisY } from '$stylist/chart/interface/recipe/chart-axis-y';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Vertical SVG axis; the story context supplies the `<svg>` parent. */
export default {
	component: ChartAxisY,
	title: 'ChartAxisY',
	description: 'Vertical axis for chart layouts',
	args: {
		x: 50,
		startY: 20,
		endY: 200,
		gridEndX: 390,
		ticks: [20, 60, 100, 140, 180],
		label: 'Y Axis',
		showGrid: true,
		tickCount: 5,
		showArrow: true,
		color: '#64748b'
	},
	controls: {
		label: { type: 'text' },
		showGrid: { type: 'boolean' },
		tickCount: { type: 'number', min: 1, max: 20, step: 1 },
		showArrow: { type: 'boolean' },
		color: { type: 'color' }
	},
	context: {
		kind: 'element',
		tag: 'svg',
		attrs: { width: 420, height: 220 },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeChartAxisY>;
