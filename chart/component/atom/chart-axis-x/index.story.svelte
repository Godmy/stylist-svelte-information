<script lang="ts">
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import ChartAxisX from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'X Axis' },
		{ name: 'showGrid', type: 'boolean', defaultValue: true },
		{ name: 'tickCount', type: 'number', defaultValue: 5, min: 1, max: 20, step: 1 },
		{ name: 'showArrow', type: 'boolean', defaultValue: true },
		{ name: 'color', type: 'color', defaultValue: '#64748b' }
	];

	const ticks = [40, 120, 200, 280, 360];
</script>

<Story
	{controls}
	component={ChartAxisX}
	title="ChartAxisX Component"
	description="Horizontal axis for chart layouts"
	tags={['chart', 'axis', 'x']}
>
	{#snippet children(values: any)}
		<svg width="400" height="90" class="_c1">
			<ChartAxisX
				y={48}
				startX={20}
				endX={380}
				{ticks}
				tickCount={values.tickCount}
				label={values.label}
				showGrid={values.showGrid}
				showArrow={values.showArrow}
				color={values.color}
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
