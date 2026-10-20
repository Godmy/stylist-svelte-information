import LineChart from './index.svelte';
import type { RecipeLineChart } from '$stylist/chart/interface/recipe/line-chart';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_LINE_TYPE } from '$stylist/chart/const/array/line-type';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Interactive line chart with customizable appearance and data. */
export default {
	component: LineChart,
	title: 'LineChart',
	description: 'Interactive line chart with customizable appearance and data.',
	args: {
		title: 'Sales & Profit Chart',
		width: 600,
		height: 400,
		showTooltip: true,
		showLegend: true,
		showAxis: true,
		smooth: true,
		colorScheme: 'default',
		variant: 'default',
		size: 'md',
		maxValue: 100,
		strokeWidth: 2,
		data: [
			{
				id: 'series1',
				label: 'Sales',
				color: '#3B82F6',
				data: [
					{ id: 'd1', name: 'Jan', value: 30 },
					{ id: 'd2', name: 'Feb', value: 45 },
					{ id: 'd3', name: 'Mar', value: 35 },
					{ id: 'd4', name: 'Apr', value: 55 },
					{ id: 'd5', name: 'May', value: 75 },
					{ id: 'd6', name: 'Jun', value: 65 }
				]
			},
			{
				id: 'series2',
				label: 'Profit',
				color: '#10B981',
				data: [
					{ id: 'd1', name: 'Jan', value: 20 },
					{ id: 'd2', name: 'Feb', value: 25 },
					{ id: 'd3', name: 'Mar', value: 30 },
					{ id: 'd4', name: 'Apr', value: 40 },
					{ id: 'd5', name: 'May', value: 50 },
					{ id: 'd6', name: 'Jun', value: 55 }
				]
			}
		]
	},
	controls: {
		title: { type: 'text' },
		width: { type: 'select', options: [400, 500, 600, 700, 800] },
		height: { type: 'select', options: [300, 400, 500, 600] },
		showTooltip: { type: 'boolean' },
		showLegend: { type: 'boolean' },
		showAxis: { type: 'boolean' },
		smooth: { type: 'boolean' },
		// The line chart palettes; no shared token lists them.
		colorScheme: { type: 'select', options: ['default', 'warm', 'cool', 'neutral'] },
		variant: { type: 'select', options: TOKEN_LINE_TYPE },
		// The line chart styles only the sm, md and lg sizes.
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 4) }
	}
} satisfies ContractStory<RecipeLineChart>;
