<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import MetricBarsCard from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'Sprint Health' },
		{
			name: 'description',
			type: 'text',
			defaultValue: 'Distribution across current delivery lanes.'
		},
		{ name: 'total', type: 'text', defaultValue: '42 issues' },
		{ name: 'color', type: 'color', defaultValue: '#2563eb' },
		{ name: 'trackColor', type: 'color', defaultValue: '#e5e7eb' }
	];

	const bars = [
		{ label: 'Ready', value: 18, valueLabel: '18', percentage: 43 },
		{ label: 'In Progress', value: 14, valueLabel: '14', percentage: 33 },
		{ label: 'Blocked', value: 4, valueLabel: '4', percentage: 10 },
		{ label: 'Review', value: 6, valueLabel: '6', percentage: 14 }
	];
</script>

<Story
	id="molecules-metric-bars-card"
	title="MetricBarsCard"
	component={MetricBarsCard}
	category="Molecules"
	description="Grouped metric bars with a card header and optional total."
	tags={['metric', 'progress', 'summary']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<MetricBarsCard
				text={String(values.text || 'Sprint Health')}
				description={String(values.description || '')}
				total={String(values.total || '')}
				{bars}
				color={String(values.color || '#2563eb')}
				trackColor={String(values.trackColor || '#e5e7eb')}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		max-width: 38rem;
		min-width: 0;
	}
</style>
