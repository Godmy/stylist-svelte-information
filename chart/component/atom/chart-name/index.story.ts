import ChartName from '$stylist/chart/component/atom/chart-name/index.svelte';
import type { RecipeChartName } from '$stylist/chart/interface/recipe/chart-name';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** SVG text node for a chart title or series name; the context supplies the `<svg>`. */
export default {
	component: ChartName,
	title: 'ChartName',
	description: 'Chart title/series name text node',
	args: {
		text: 'f(x) = x^2 + 2x + 1',
		x: 16,
		y: 30,
		fill: '#2563eb',
		stroke: '#ffffff',
		strokeWidth: 0
	},
	controls: {
		text: { type: 'text' },
		fill: { type: 'color' },
		stroke: { type: 'color' },
		strokeWidth: { type: 'range', min: 0, max: 4, step: 0.25 }
	},
	context: {
		kind: 'element',
		tag: 'svg',
		attrs: { width: 460, height: 70 },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeChartName>;
