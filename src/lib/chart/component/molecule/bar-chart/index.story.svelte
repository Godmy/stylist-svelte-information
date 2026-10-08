<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import BarChart from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'title', type: 'text', defaultValue: 'Quarterly revenue' },
		{ name: 'width', type: 'number', defaultValue: 520, min: 320, max: 900, step: 20 },
		{ name: 'height', type: 'number', defaultValue: 300, min: 220, max: 600, step: 20 },
		{ name: 'showLegend', type: 'boolean', defaultValue: true },
		{ name: 'showAxis', type: 'boolean', defaultValue: true },
		{
			name: 'colorScheme',
			type: 'select',
			defaultValue: 'minimal',
			options: ['minimal', 'ocean', 'forest', 'sunset']
		}
	];

	const data = [
		{ id: 'q1', name: 'Q1', value: 120 },
		{ id: 'q2', name: 'Q2', value: 180 },
		{ id: 'q3', name: 'Q3', value: 145 },
		{ id: 'q4', name: 'Q4', value: 210 }
	];
</script>

<Story
	component={BarChart}
	title="BarChart"
	description="Categorical bar chart with legend and axis options."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<BarChart
				{data}
				title={values.title}
				width={Number(values.width) || 520}
				height={Number(values.height) || 300}
				showLegend={values.showLegend}
				showAxis={values.showAxis}
				colorScheme={values.colorScheme}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		width: 100%;
		max-width: 100%;
		min-width: 0;
	}
</style>
