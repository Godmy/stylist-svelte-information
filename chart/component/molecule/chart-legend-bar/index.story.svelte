<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ChartLegendBar from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'Revenue' },
		{ name: 'value', type: 'number', defaultValue: 72 },
		{ name: 'color', type: 'color', defaultValue: '#2563eb' },
		{ name: 'connectorVisible', type: 'boolean', defaultValue: true },
		{ name: 'connectorWidth', type: 'range', defaultValue: 2, min: 1, max: 6, step: 1 }
	];
</script>

<Story
	id="molecules-chart-legend-bar"
	title="Molecules / Chart / ChartLegendBar"
	component={ChartLegendBar}
	category="Molecules/Chart"
	description="SVG legend bar with connector and label."
	{controls}
>
	{#snippet children(values: any)}
		<svg class="_c1" viewBox="0 0 320 220" role="img" aria-label="Chart legend bar preview">
			<ChartLegendBar
				text={String(values.text || 'Revenue')}
				value={Number(values.value) || 0}
				valueLabel={`${Number(values.value) || 0}%`}
				color={String(values.color || '#2563eb')}
				x={130}
				y={48}
				width={60}
				height={106}
				connectorX={160}
				connectorY1={154}
				connectorY2={172}
				connectorTargetX={160}
				connectorWidth={Number(values.connectorWidth) || 2}
				labelX={104}
				labelY={172}
				labelWidth={112}
				labelHeight={30}
				textX={160}
				textY={191}
				connectorVisible={Boolean(values.connectorVisible)}
			/>
		</svg>
	{/snippet}
</Story>

<style>
	._c1 {
		display: block;
		width: min(100%, 22rem);
		height: auto;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
	}
</style>
