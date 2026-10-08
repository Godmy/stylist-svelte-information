<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import VerticalBarsChart from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'Distribution' },
		{ name: 'height', type: 'range', defaultValue: 128, min: 72, max: 260, step: 4 },
		{ name: 'barWidth', type: 'text', defaultValue: '1.75rem' },
		{ name: 'gap', type: 'text', defaultValue: '0.75rem' },
		{ name: 'color', type: 'color', defaultValue: '#3b82f6' },
		{ name: 'r1', type: 'range', defaultValue: 100, min: 4, max: 100, step: 1 },
		{ name: 'r2', type: 'range', defaultValue: 67, min: 4, max: 100, step: 1 },
		{ name: 'r3', type: 'range', defaultValue: 42, min: 4, max: 100, step: 1 }
	];
</script>

<Story
	id="molecules-vertical-bars-chart"
	title="Molecules / Chart / VerticalBarsChart"
	component={VerticalBarsChart}
	category="Molecules/Chart"
	description="Generic compact vertical bars renderer for domain-specific chart wrappers."
	{controls}
>
	{#snippet children(values: any)}
		<VerticalBarsChart
			text={String(values.text || 'Distribution')}
			height={Number(values.height) || 128}
			barWidth={String(values.barWidth || '1.75rem')}
			gap={String(values.gap || '0.75rem')}
			color={String(values.color || '#3b82f6')}
			items={[
				{ id: 'r1', label: 'R1', valueLabel: values.r1, heightPercent: Number(values.r1) || 4 },
				{ id: 'r2', label: 'R2', valueLabel: values.r2, heightPercent: Number(values.r2) || 4 },
				{ id: 'r3', label: 'R3', valueLabel: values.r3, heightPercent: Number(values.r3) || 4 }
			]}
		/>
	{/snippet}
</Story>
