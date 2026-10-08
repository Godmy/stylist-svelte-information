<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import Heatmap from './index.svelte';
	import type { IHeatmapCell } from '$stylist/chart/interface/slot/heatmap/cell';
	import { TOKEN_CONTROLLER_TYPE } from '$stylist/domain/const/object/controller-type';

	// Generate sample data for the heatmap
	const generateHeatmapData = () => {
		const rows = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		const columns = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
		const data = [];

		for (let i = 0; i < rows.length; i++) {
			for (let j = 0; j < columns.length; j++) {
				const value = Math.floor(Math.random() * 100);
				data.push({
					row: i,
					column: j,
					value: value,
					label: `${columns[j]} ${rows[i]}`
				} as IHeatmapCell);
			}
		}

		return data;
	};

	const data = generateHeatmapData();

	const controls = [
		{
			name: 'title',
			type: TOKEN_CONTROLLER_TYPE.TEXT,
			defaultValue: 'Sales Performance by Month and Product'
		},
		{
			name: 'width',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: [500, 600, 700, 800],
			defaultValue: 700
		},
		{
			name: 'height',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: [300, 400, 500, 600],
			defaultValue: 500
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
			name: 'colorScheme',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: ['minimal', 'ocean', 'forest', 'sunset'],
			defaultValue: 'minimal'
		}
	];

	let handleCellClick = (cell: IHeatmapCell) => {
		console.log('Cell clicked:', cell);
	};
</script>

<Story
	{controls}
	title="Heatmap"
	category="Organisms/Canvas"
	description="Interactive heatmap visualization with customizable color schemes."
	tags={['heatmap', 'data', 'visualization', 'analytics']}
>
	{#snippet children(values: any)}
		<Heatmap
			{data}
			title={values.title}
			width={values.width}
			height={values.height}
			showTooltip={values.showTooltip}
			showLegend={values.showLegend}
			colorScheme={values.colorScheme}
			showAxis={values.showAxis}
			cellPadding={2}
			onCellClick={handleCellClick}
		/>
	{/snippet}
</Story>
