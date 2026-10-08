<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import RangeBarsChart from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'scaleMinLabel', type: 'text', defaultValue: '0d' },
		{ name: 'scaleMaxLabel', type: 'text', defaultValue: '100d' },
		{ name: 'labelWidth', type: 'text', defaultValue: '8rem' },
		{ name: 'valueWidth', type: 'text', defaultValue: '6rem' },
		{ name: 'integrationStart', type: 'range', defaultValue: 10, min: 0, max: 100, step: 1 },
		{ name: 'integrationMarker', type: 'range', defaultValue: 42, min: 0, max: 100, step: 1 },
		{ name: 'integrationEnd', type: 'range', defaultValue: 75, min: 0, max: 100, step: 1 },
		{ name: 'migrationStart', type: 'range', defaultValue: 25, min: 0, max: 100, step: 1 },
		{ name: 'migrationMarker', type: 'range', defaultValue: 54, min: 0, max: 100, step: 1 },
		{ name: 'migrationEnd', type: 'range', defaultValue: 90, min: 0, max: 100, step: 1 }
	];
</script>

<Story
	id="molecules-range-bars-chart"
	title="Molecules / Chart / RangeBarsChart"
	component={RangeBarsChart}
	category="Molecules/Chart"
	description="Generic range chart renderer with start, marker, and end positions."
	{controls}
>
	{#snippet children(values: any)}
		<RangeBarsChart
			items={[
				{
					id: 'a',
					label: 'Integration',
					startPercent: Math.min(Number(values.integrationStart) || 0, Number(values.integrationEnd) || 0),
					markerPercent: Number(values.integrationMarker) || 0,
					endPercent: Math.max(Number(values.integrationStart) || 0, Number(values.integrationEnd) || 0),
					valueLabel: `${values.integrationStart}-${values.integrationMarker}-${values.integrationEnd}d`
				},
				{
					id: 'b',
					label: 'Migration',
					startPercent: Math.min(Number(values.migrationStart) || 0, Number(values.migrationEnd) || 0),
					markerPercent: Number(values.migrationMarker) || 0,
					endPercent: Math.max(Number(values.migrationStart) || 0, Number(values.migrationEnd) || 0),
					valueLabel: `${values.migrationStart}-${values.migrationMarker}-${values.migrationEnd}d`
				}
			]}
			scaleMinLabel={String(values.scaleMinLabel || '0d')}
			scaleMaxLabel={String(values.scaleMaxLabel || '100d')}
			labelWidth={String(values.labelWidth || '8rem')}
			valueWidth={String(values.valueWidth || '6rem')}
		/>
	{/snippet}
</Story>
