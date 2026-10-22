import ChartAxisZ from '$stylist/chart/component/atom/chart-axis-z/index.svelte';
import type { RecipeChartAxisZ } from '$stylist/chart/interface/recipe/chart-axis-z';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Diagonal SVG Z-axis; the story context supplies the `<svg>` parent. */
export default {
	component: ChartAxisZ,
	title: 'ChartAxisZ',
	description: 'Diagonal Z-axis projection for pseudo 3D charts',
	args: {
		startX: 40,
		startY: 180,
		endX: 150,
		endY: 60,
		label: 'Z Axis',
		color: '#64748b',
		tickCount: 3,
		showArrow: true
	},
	controls: {
		label: { type: 'text' },
		color: { type: 'color' },
		tickCount: { type: 'number', min: 0, max: 12, step: 1 },
		showArrow: { type: 'boolean' }
	},
	context: {
		kind: 'element',
		tag: 'svg',
		attrs: { width: 220, height: 220 },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeChartAxisZ>;
