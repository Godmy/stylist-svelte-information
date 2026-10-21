import ChartAxisX from './index.svelte';
import type { RecipeChartAxisX } from '$stylist/chart/interface/recipe/chart-axis-x';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Horizontal SVG axis; the story context supplies the `<svg>` parent. */
export default {
	component: ChartAxisX,
	title: 'ChartAxisX',
	description: 'Horizontal axis for chart layouts',
	args: {
		y: 48,
		startX: 20,
		endX: 380,
		ticks: [40, 120, 200, 280, 360],
		label: 'X Axis',
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
	presets: { 'Generated ticks': { ticks: [], tickLabels: ['0', '20', '40', '60', '80', '100'] } },
	context: {
		kind: 'element',
		tag: 'svg',
		attrs: { width: 400, height: 90 },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeChartAxisX>;
