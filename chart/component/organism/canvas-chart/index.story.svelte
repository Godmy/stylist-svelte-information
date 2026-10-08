<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import CanvasChart from './index.svelte';
	import { TOKEN_CONTROLLER_TYPE } from '$stylist/domain/const/object/controller-type';

	// Sample data for different chart types
	const lineData = [
		{ x: 'Jan', y: 30, label: 'January' },
		{ x: 'Feb', y: 45, label: 'February' },
		{ x: 'Mar', y: 60, label: 'March' },
		{ x: 'Apr', y: 40, label: 'April' },
		{ x: 'May', y: 70, label: 'May' },
		{ x: 'Jun', y: 85, label: 'June' }
	];

	const barData = [
		{ x: 'Product A', y: 120, label: 'Product A' },
		{ x: 'Product B', y: 200, label: 'Product B' },
		{ x: 'Product C', y: 150, label: 'Product C' },
		{ x: 'Product D', y: 180, label: 'Product D' }
	];

	const pieData = [
		{ x: 'Desktop', y: 45, label: 'Desktop' },
		{ x: 'Mobile', y: 35, label: 'Mobile' },
		{ x: 'Tablet', y: 15, label: 'Tablet' },
		{ x: 'Other', y: 5, label: 'Other' }
	];

	const controls = [
		{
			name: 'type',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: ['line', 'bar', 'pie'],
			defaultValue: 'line'
		},
		{
			name: 'showGrid',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: true
		}
	];
</script>

<Story
	{controls}
	title="CanvasChart"
	category="Organisms/Canvas"
	description="Interactive canvas chart with customizable types."
	tags={['canvas', 'chart', 'visualization', 'data']}
>
	{#snippet children(values: any)}
		<CanvasChart
			type={values.type}
			data={values.type === 'line' ? lineData : values.type === 'bar' ? barData : pieData}
			title={`Sample ${values.type.charAt(0).toUpperCase() + values.type.slice(1)} Chart`}
			xAxisLabel={values.type !== 'pie' ? 'Month' : undefined}
			yAxisLabel={values.type !== 'pie' ? 'Value' : undefined}
			showGrid={values.showGrid}
			width={600}
			height={400}
		/>
	{/snippet}
</Story>
