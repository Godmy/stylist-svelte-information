<script lang="ts">
	import type { ChartSeries } from '$stylist/chart/interface/slot/chart-series';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import ChartCanvas from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'width', type: 'number', defaultValue: 680, min: 360, max: 960, step: 20 },
		{ name: 'height', type: 'number', defaultValue: 380, min: 240, max: 620, step: 20 },
		{ name: 'xMin', type: 'number', defaultValue: -4, min: -20, max: 20, step: 1 },
		{ name: 'xMax', type: 'number', defaultValue: 4, min: -20, max: 20, step: 1 },
		{ name: 'yMin', type: 'number', defaultValue: -8, min: -30, max: 30, step: 1 },
		{ name: 'yMax', type: 'number', defaultValue: 12, min: -30, max: 30, step: 1 },
		{ name: 'xTickCount', type: 'number', defaultValue: 6, min: 1, max: 20, step: 1 },
		{ name: 'yTickCount', type: 'number', defaultValue: 5, min: 1, max: 20, step: 1 },
		{ name: 'zTickCount', type: 'number', defaultValue: 3, min: 0, max: 12, step: 1 },
		{ name: 'showGrid', type: 'boolean', defaultValue: true },
		{ name: 'showZAxis', type: 'boolean', defaultValue: false },
		{ name: 'showAxisArrows', type: 'boolean', defaultValue: true }
	];

	const series: ChartSeries[] = [
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
	];
</script>

<Story
	{controls}
	component={ChartCanvas}
	title="ChartCanvas Component"
	description="Composed chart surface with axes and plotted functions"
	tags={['chart', 'canvas', 'function']}
>
	{#snippet children(values: any)}
		<ChartCanvas
			width={values.width}
			height={values.height}
			title="Function Plot"
			{series}
			xScale={[Math.min(values.xMin, values.xMax), Math.max(values.xMin, values.xMax)]}
			yScale={[Math.min(values.yMin, values.yMax), Math.max(values.yMin, values.yMax)]}
			xTickCount={values.xTickCount}
			yTickCount={values.yTickCount}
			zTickCount={values.zTickCount}
			xAxisLabel="X"
			yAxisLabel="Y"
			zAxisLabel="Z"
			showGrid={values.showGrid}
			showZAxis={values.showZAxis}
			showAxisArrows={values.showAxisArrows}
		/>
	{/snippet}
</Story>
