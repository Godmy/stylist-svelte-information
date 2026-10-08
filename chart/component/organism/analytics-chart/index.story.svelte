<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import AnalyticsChart from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'type', type: 'select', options: ['bar', 'line', 'pie'], defaultValue: 'bar' },
		{ name: 'showLegend', type: 'boolean', defaultValue: true },
		{ name: 'showTrend', type: 'boolean', defaultValue: true },
		{ name: 'trendValue', type: 'number', defaultValue: 12, min: -100, max: 100 }
	];

	const data = [
		{ label: 'Jan', value: 400, color: '#3B82F6' },
		{ label: 'Feb', value: 320, color: '#10B981' },
		{ label: 'Mar', value: 250, color: '#F59E0B' },
		{ label: 'Apr', value: 370, color: '#EF4444' }
	];
</script>

<Story
	id="organisms-analytics-chart"
	title="Organisms / Information / Marketing / AnalyticsChart"
	component={AnalyticsChart}
	category="Organisms/Information/Marketing"
	description="Reusable analytics chart wrapper with bar/line/pie modes."
	{controls}
>
	{#snippet children(args: any)}
		<div class="_c1">
			<AnalyticsChart
				title="Monthly traffic"
				subtitle="Last 4 months"
				{data}
				type={args.type}
				showLegend={args.showLegend}
				showTrend={args.showTrend}
				trendValue={args.trendValue}
				width={680}
				height={320}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		border-radius: 0.75rem;
		background-color: var(--color-background-secondary);
		padding: 1rem;
	}
</style>
