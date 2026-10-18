import CanvasChart from './index.svelte';
import type { RecipeCanvasChart } from '$stylist/chart/interface/recipe/canvas-chart';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_CANVAS_CHART_TYPE } from '$stylist/chart/const/array/canvas-chart-type';

/** Interactive canvas chart; the legacy per-type data switch became a Bar preset. */
export default {
	component: CanvasChart,
	title: 'CanvasChart',
	description: 'Interactive canvas chart with customizable types.',
	args: {
		type: 'line',
		showGrid: true,
		width: 600,
		height: 400,
		title: 'Sample Line Chart',
		xAxisLabel: 'Month',
		yAxisLabel: 'Value',
		data: [
			{ x: 'Jan', y: 30, label: 'January' },
			{ x: 'Feb', y: 45, label: 'February' },
			{ x: 'Mar', y: 60, label: 'March' },
			{ x: 'Apr', y: 40, label: 'April' },
			{ x: 'May', y: 70, label: 'May' },
			{ x: 'Jun', y: 85, label: 'June' }
		]
	},
	controls: {
		// The canvas chart has no pie mode.
		type: {
			type: 'select',
			options: TOKEN_CANVAS_CHART_TYPE.filter((chartType) => chartType !== 'pie')
		},
		showGrid: { type: 'boolean' }
	},
	presets: {
		Bar: {
			type: 'bar',
			title: 'Sample Bar Chart',
			data: [
				{ x: 'Product A', y: 120, label: 'Product A' },
				{ x: 'Product B', y: 200, label: 'Product B' },
				{ x: 'Product C', y: 150, label: 'Product C' },
				{ x: 'Product D', y: 180, label: 'Product D' }
			]
		}
	}
} satisfies ContractStory<RecipeCanvasChart>;
