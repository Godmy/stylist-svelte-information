import AnalyticsChart from '$stylist/chart/component/organism/analytics-chart/index.svelte';
import type { RecipeAnalyticsChart } from '$stylist/chart/interface/recipe/analytics-chart';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_CANVAS_CHART_TYPE } from '$stylist/chart/const/array/canvas-chart-type';

/** Reusable analytics chart wrapper with bar/line/pie modes. */
export default {
	component: AnalyticsChart,
	title: 'AnalyticsChart',
	description: 'Reusable analytics chart wrapper with bar/line/pie modes.',
	args: {
		title: 'Monthly traffic',
		subtitle: 'Last 4 months',
		type: 'bar',
		showLegend: true,
		showTrend: true,
		trendValue: 12,
		width: 680,
		height: 320,
		data: [
			{ label: 'Jan', value: 400, color: '#3B82F6' },
			{ label: 'Feb', value: 320, color: '#10B981' },
			{ label: 'Mar', value: 250, color: '#F59E0B' },
			{ label: 'Apr', value: 370, color: '#EF4444' }
		]
	},
	controls: {
		// The component renders only the line, bar and pie modes.
		type: { type: 'select', options: TOKEN_CANVAS_CHART_TYPE.slice(0, 3) },
		showLegend: { type: 'boolean' },
		showTrend: { type: 'boolean' },
		trendValue: { type: 'number', min: -100, max: 100 }
	}
} satisfies ContractStory<RecipeAnalyticsChart>;
