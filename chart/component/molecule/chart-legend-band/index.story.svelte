<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ChartLegendBand from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'Pipeline' },
		{ name: 'value', type: 'number', defaultValue: 84 },
		{ name: 'color', type: 'color', defaultValue: '#2563eb' },
		{ name: 'connectorVisible', type: 'boolean', defaultValue: true },
		{ name: 'connectorWidth', type: 'range', defaultValue: 2, min: 1, max: 6, step: 1 }
	];
</script>

<Story
	id="molecules-chart-legend-band"
	title="Molecules / Chart / ChartLegendBand"
	component={ChartLegendBand}
	category="Molecules/Chart"
	description="SVG legend band with stacked segments, connector, and label."
	{controls}
>
	{#snippet children(values: any)}
		<svg class="_c1" viewBox="0 0 320 220" role="img" aria-label="Chart legend band preview">
			<ChartLegendBand
				text={String(values.text || 'Pipeline')}
				value={Number(values.value) || 0}
				valueLabel={`${Number(values.value) || 0}%`}
				color={String(values.color || '#2563eb')}
				x={122}
				y={42}
				width={76}
				height={112}
				connectorX={160}
				connectorY1={154}
				connectorY2={172}
				connectorWidth={Number(values.connectorWidth) || 2}
				labelX={104}
				labelY={172}
				labelWidth={112}
				labelHeight={30}
				textX={160}
				textY={191}
				connectorVisible={Boolean(values.connectorVisible)}
				segments={[
					{ id: 's1', text: 'Ready', value: 24, color: '#22c55e', x: 122, y: 42, width: 76, height: 28 },
					{ id: 's2', text: 'Active', value: 36, color: String(values.color || '#2563eb'), x: 122, y: 70, width: 76, height: 42 },
					{ id: 's3', text: 'Blocked', value: 14, color: '#ef4444', x: 122, y: 112, width: 76, height: 18 },
					{ id: 's4', text: 'Review', value: 10, color: '#f59e0b', x: 122, y: 130, width: 76, height: 24 }
				]}
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
