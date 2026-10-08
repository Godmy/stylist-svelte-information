<script lang="ts">
	import type { ChartSeries } from '$stylist/chart/interface/slot/chart-series';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import Chart from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'width', type: 'number', defaultValue: 720, min: 380, max: 1020, step: 20 },
		{ name: 'height', type: 'number', defaultValue: 420, min: 260, max: 700, step: 20 },
		{ name: 'xMin', type: 'number', defaultValue: -6, min: -20, max: 20, step: 1 },
		{ name: 'xMax', type: 'number', defaultValue: 6, min: -20, max: 20, step: 1 },
		{ name: 'yMin', type: 'number', defaultValue: -1.5, min: -5, max: 5, step: 0.1 },
		{ name: 'yMax', type: 'number', defaultValue: 1.5, min: -5, max: 5, step: 0.1 },
		{ name: 'xTickCount', type: 'number', defaultValue: 6, min: 1, max: 20, step: 1 },
		{ name: 'yTickCount', type: 'number', defaultValue: 6, min: 1, max: 20, step: 1 },
		{ name: 'zTickCount', type: 'number', defaultValue: 2, min: 0, max: 12, step: 1 },
		{ name: 'showLegend', type: 'boolean', defaultValue: true },
		{ name: 'showGrid', type: 'boolean', defaultValue: true },
		{ name: 'showZAxis', type: 'boolean', defaultValue: false },
		{ name: 'showAxisArrows', type: 'boolean', defaultValue: true }
	];

	const series: ChartSeries[] = [
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
	];
</script>

<Story
	{controls}
	component={Chart}
	title="Chart Component"
	description="Complete function-chart organism with canvas and legend"
	tags={['chart', 'organism', 'function-plot']}
>
	{#snippet children(values: any)}
		<Chart
			width={values.width}
			height={values.height}
			title="Function Comparison"
			{series}
			xScale={[Math.min(values.xMin, values.xMax), Math.max(values.xMin, values.xMax)]}
			yScale={[Math.min(values.yMin, values.yMax), Math.max(values.yMin, values.yMax)]}
			xTickCount={values.xTickCount}
			yTickCount={values.yTickCount}
			zTickCount={values.zTickCount}
			xAxisLabel="X"
			yAxisLabel="f(x)"
			zAxisLabel="Z"
			showLegend={values.showLegend}
			showGrid={values.showGrid}
			showZAxis={values.showZAxis}
			showAxisArrows={values.showAxisArrows}
		/>
	{/snippet}
</Story>
