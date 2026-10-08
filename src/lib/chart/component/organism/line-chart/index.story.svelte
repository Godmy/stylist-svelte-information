<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import LineChart from './index.svelte';
	import type { LineChartData } from '$stylist/chart/interface/slot/line-chart-data';
	import { TOKEN_CONTROLLER_TYPE } from '$stylist/domain/const/object/controller-type';

	// Define sample data for the chart
	const data: LineChartData[] = [
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
	];

	const controls = [
		{
			name: 'title',
			type: TOKEN_CONTROLLER_TYPE.TEXT,
			defaultValue: 'Sales & Profit Chart'
		},
		{
			name: 'width',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: [400, 500, 600, 700, 800],
			defaultValue: 600
		},
		{
			name: 'height',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: [300, 400, 500, 600],
			defaultValue: 400
		},
		{
			name: 'showTooltip',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: true
		},
		{
			name: 'showLegend',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: true
		},
		{
			name: 'showAxis',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: true
		},
		{
			name: 'smooth',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: true
		},
		{
			name: 'colorScheme',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: ['default', 'warm', 'cool', 'neutral'],
			defaultValue: 'default'
		},
		{
			name: 'variant',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: ['default', 'minimal', 'elegant', 'bold'],
			defaultValue: 'default'
		},
		{
			name: 'size',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: ['sm', 'md', 'lg'],
			defaultValue: 'md'
		}
	];

	let handlePointClick = (point: any, series: any) => {
		console.log('Point clicked:', point, series);
	};
</script>

<Story
	{controls}
	title="LineChart"
	category="Organisms/Charts"
	description="Interactive line chart with customizable appearance and data."
	tags={['chart', 'line', 'data', 'visualization']}
>
	{#snippet children(values: any)}
		<LineChart
			{data}
			title={values.title}
			width={values.width}
			height={values.height}
			showTooltip={values.showTooltip}
			showLegend={values.showLegend}
			colorScheme={values.colorScheme}
			maxValue={100}
			showAxis={values.showAxis}
			smooth={values.smooth}
			strokeWidth={2}
			variant={values.variant}
			size={values.size}
			onPointClick={handlePointClick}
		/>
	{/snippet}
</Story>
