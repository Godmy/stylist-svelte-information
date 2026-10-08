<script lang="ts">
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import ChartPolyline from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'strokeWidth', type: 'number', defaultValue: 2, min: 1, max: 8, step: 1 },
		{ name: 'color', type: 'color', defaultValue: '#2563eb' }
	];

	const points = [
		{ x: -4, y: 8 },
		{ x: -2, y: 3 },
		{ x: 0, y: 1 },
		{ x: 2, y: 5 },
		{ x: 4, y: 9 }
	];
</script>

<Story
	{controls}
	component={ChartPolyline}
	title="ChartPolyline Component"
	description="Polyline for plotting function points"
	tags={['chart', 'polyline', 'function']}
>
	{#snippet children(values: any)}
		<svg width="420" height="240" class="_c1">
			<ChartPolyline
				{points}
				width={420}
				height={240}
				color={values.color}
				strokeWidth={values.strokeWidth}
			/>
		</svg>
	{/snippet}
</Story>

<style>
	._c1 {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
	}
</style>
